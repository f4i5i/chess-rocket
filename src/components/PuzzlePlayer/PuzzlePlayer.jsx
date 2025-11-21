import React, { useState, useEffect, useCallback } from 'react';
import ChessBoard from './ChessBoard';
import MoveHistory from './MoveHistory';
import SessionStats from './SessionStats';
import Timer from './Timer';
import Modal from '../common/Modal';
import Button from '../common/Button';
import TopNavBar from '../common/TopNavBar';
import { useChessGame } from '../../hooks/useChessGame';
import { usePuzzleManager } from '../../hooks/usePuzzleManager';
import { useTimer } from '../../hooks/useTimer';
import { movesMatch, parseMove } from '../../utils/chessHelper';

const PuzzlePlayer = () => {
  const {
    currentPuzzle,
    currentPuzzleIndex,
    totalPuzzles,
    sessionStats,
    nextPuzzle,
    previousPuzzle,
    completePuzzle,
    updateSessionStats
  } = usePuzzleManager();

  const {
    chess,
    fen,
    moveHistory,
    currentTurn,
    lastMove,
    move,
    resetGame,
    getLegalMoves
  } = useChessGame(currentPuzzle?.fen || 'start');

  const { time, isRunning, start, stop, reset, restart } = useTimer();

  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0);
  const [puzzleStatus, setPuzzleStatus] = useState('playing'); // playing, completed, failed
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: '' }
  const [highlightSquares, setHighlightSquares] = useState({});
  const [showHint, setShowHint] = useState(false);
  const [hintSquare, setHintSquare] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });
  const [boardDisabled, setBoardDisabled] = useState(false);
  const [isValidatingMove, setIsValidatingMove] = useState(false);
  const [puzzleInitialized, setPuzzleInitialized] = useState(false);
  const [canAcceptMoves, setCanAcceptMoves] = useState(false);
  const [shouldAutoPlayOpponent, setShouldAutoPlayOpponent] = useState(false);

  // Initialize puzzle
  useEffect(() => {
    if (currentPuzzle) {
      console.log('🔄 Initializing puzzle...');
      setPuzzleInitialized(false);
      setCanAcceptMoves(false);
      resetGame(currentPuzzle.fen);
      setCurrentSolutionIndex(0);
      setPuzzleStatus('playing');
      setFeedback(null);
      setHighlightSquares({});
      setShowHint(false);
      setHintSquare(null);
      setBoardDisabled(true); // Disable board initially
      setIsValidatingMove(false);
      setShouldAutoPlayOpponent(false);
      restart();
      // Mark as initialized and enable moves after delays
      setTimeout(() => {
        console.log('✓ Puzzle initialized');
        setPuzzleInitialized(true);
      }, 100);
      setTimeout(() => {
        console.log('🔓 Board enabled - ready for moves');
        setBoardDisabled(false);
        setCanAcceptMoves(true);
      }, 1000); // Wait 1 second before accepting moves to prevent phantom moves
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPuzzle]);

  // Auto-play opponent moves ONLY after player makes correct move
  useEffect(() => {
    if (!shouldAutoPlayOpponent || !currentPuzzle || !puzzleInitialized || currentSolutionIndex >= currentPuzzle.solution.length || puzzleStatus !== 'playing') {
      return;
    }

    // Auto-play opponent's move after player's correct move
    setBoardDisabled(true);
    const timeoutId = setTimeout(() => {
      const expectedMove = currentPuzzle.solution[currentSolutionIndex];
      const result = move(expectedMove);
      if (result) {
        setCurrentSolutionIndex(prev => prev + 1);
        setHighlightSquares({});
        setShouldAutoPlayOpponent(false); // Reset flag after auto-play
        setBoardDisabled(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [shouldAutoPlayOpponent, currentSolutionIndex, currentPuzzle, puzzleStatus, move, puzzleInitialized]);

  // Check if puzzle is complete
  useEffect(() => {
    if (currentPuzzle && currentSolutionIndex >= currentPuzzle.solution.length && puzzleStatus === 'playing') {
      handlePuzzleComplete(true);
    }
  }, [currentSolutionIndex, currentPuzzle, puzzleStatus]);

  // Handle piece drop
  const handlePieceDrop = (sourceSquare, targetSquare, piece) => {
    console.log('🎮 Piece drop:', sourceSquare, '→', targetSquare, '| canAccept:', canAcceptMoves, '| disabled:', boardDisabled);

    if (boardDisabled || puzzleStatus !== 'playing' || !canAcceptMoves) {
      console.log('❌ Rejected');
      return false;
    }

    console.log('✅ Accepted - processing move');

    // Set flag to prevent auto-play during validation
    setIsValidatingMove(true);

    const playerMove = {
      from: sourceSquare,
      to: targetSquare,
      promotion: piece && piece[1] && piece[1].toLowerCase() === 'p' && (targetSquare[1] === '8' || targetSquare[1] === '1')
        ? 'q'
        : undefined
    };

    // Check if it's the player's turn
    const isPlayerTurn = (currentTurn === 'w' && currentPuzzle.playerColor === 'white') ||
                         (currentTurn === 'b' && currentPuzzle.playerColor === 'black');

    if (!isPlayerTurn) {
      setFeedback({ type: 'error', message: "It's not your turn!" });
      setIsValidatingMove(false);
      return false;
    }

    // Get the expected move from solution
    const expectedMove = currentPuzzle.solution[currentSolutionIndex];

    // Try to make the move
    const result = move(playerMove);
    if (!result) {
      setFeedback({ type: 'error', message: 'Illegal move!' });
      setIsValidatingMove(false);
      return false;
    }

    // Check if it matches the solution
    if (movesMatch(result, expectedMove)) {
      // Correct move!
      setHighlightSquares({
        [sourceSquare]: { backgroundColor: 'rgba(16, 185, 129, 0.4)' },
        [targetSquare]: { backgroundColor: 'rgba(16, 185, 129, 0.4)' }
      });
      setFeedback({ type: 'success', message: 'Correct move!' });
      setShowHint(false);
      setCurrentSolutionIndex(prev => prev + 1);
      setIsValidatingMove(false);

      // Trigger opponent's auto-play response after correct move
      setShouldAutoPlayOpponent(true);

      return true;
    } else {
      // Incorrect move - undo it
      chess.undo();
      setHighlightSquares({
        [sourceSquare]: { backgroundColor: 'rgba(239, 68, 68, 0.4)' },
        [targetSquare]: { backgroundColor: 'rgba(239, 68, 68, 0.4)' }
      });
      setFeedback({ type: 'error', message: 'Incorrect move! Try again.' });
      setIsValidatingMove(false);

      // Clear highlight after a delay
      setTimeout(() => {
        setHighlightSquares({});
        setFeedback(null);
      }, 1500);

      return false;
    }
  };

  // Handle puzzle completion
  const handlePuzzleComplete = (success) => {
    stop();
    setPuzzleStatus(success ? 'completed' : 'failed');
    completePuzzle(success, time);
    updateSessionStats();

    setModalContent({
      title: success ? '🎉 Puzzle Solved!' : '😞 Puzzle Failed',
      message: success
        ? `Great job! You solved the puzzle in ${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`
        : 'Better luck next time! Try the next puzzle.'
    });
    setShowModal(true);
  };

  // Handle hint
  const handleHint = () => {
    if (currentSolutionIndex >= currentPuzzle.solution.length) return;

    const expectedMove = currentPuzzle.solution[currentSolutionIndex];
    const parsedMove = parseMove(expectedMove);

    if (parsedMove) {
      // Move is in long notation like 'e2e4'
      setHintSquare(parsedMove.from);
      setShowHint(true);
      setFeedback({ type: 'info', message: `Hint: Move the piece from ${parsedMove.from}` });

      setTimeout(() => {
        setShowHint(false);
        setHintSquare(null);
        setFeedback(null);
      }, 3000);
    } else {
      // If move is in algebraic notation (like 'Nf3'), find it in legal moves
      const legalMoves = getLegalMoves(); // Get all legal moves
      const matchingMove = legalMoves.find(m => movesMatch(m, expectedMove));

      if (matchingMove) {
        setHintSquare(matchingMove.from);
        setShowHint(true);
        setFeedback({ type: 'info', message: `Hint: Move the piece from ${matchingMove.from} to ${matchingMove.to}` });

        setTimeout(() => {
          setShowHint(false);
          setHintSquare(null);
          setFeedback(null);
        }, 3000);
      } else {
        setFeedback({ type: 'error', message: 'Could not determine hint for this move' });
        setTimeout(() => {
          setFeedback(null);
        }, 2000);
      }
    }
  };

  // Handle show solution
  const handleShowSolution = () => {
    const remainingSolution = currentPuzzle.solution.slice(currentSolutionIndex);
    setModalContent({
      title: '📖 Solution',
      message: `The solution is: ${remainingSolution.join(', ')}`
    });
    setShowModal(true);
  };

  // Handle give up
  const handleGiveUp = () => {
    handlePuzzleComplete(false);
  };

  // Handle next puzzle
  const handleNext = () => {
    setShowModal(false);
    nextPuzzle();
  };

  // Handle previous puzzle
  const handlePrevious = () => {
    setShowModal(false);
    previousPuzzle();
  };

  if (!currentPuzzle) {
    return (
      <div className="flex items-center justify-center w-full h-full overflow-hidden">
        <p className="text-xl text-gray-500">No puzzles available. Add some in the Admin panel!</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ backgroundColor: '#F7F8FA' }}>
      {/* Top Navigation Bar */}
      <TopNavBar puzzleRating={1204} />

      <div className="flex-1 px-[2vw] py-[2vh] overflow-hidden">
        {/* Feedback message */}
        {feedback && (
          <div className={`mb-4 p-4 rounded-lg fade-in ${
            feedback.type === 'success' ? 'bg-green-100 text-green-800' :
            feedback.type === 'error' ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {feedback.message}
          </div>
        )}

        {/* Main content */}
        <div className="flex h-full gap-4">
          {/* Chess board container */}
          <div
            className="bg-white rounded-[28px] flex flex-col p-4 flex-shrink-0"
            style={{
              border: '1.5px solid rgba(123, 123, 123, 0.1)',
              width: '55%',
              maxWidth: '680px'
            }}
          >
            <div className="relative flex-1 flex flex-col">
              {/* Chess board - square aspect ratio */}
              <div className="aspect-square w-full max-w-[638px]">
                <ChessBoard
                  position={fen}
                  onPieceDrop={handlePieceDrop}
                  playerColor={currentPuzzle.playerColor}
                  disabled={boardDisabled || puzzleStatus !== 'playing'}
                  highlightSquares={highlightSquares}
                  lastMove={lastMove}
                  showHint={showHint}
                  hintSquare={hintSquare}
                />
              </div>

              {/* Bottom section below board */}
              <div className="mt-[29px]">
                {/* White/Black to Move + Controls Row */}
                <div
                  className="flex items-center justify-between"
                  style={{ marginBottom: 'clamp(18px, 2vh, 28px)' }}
                >
                  {/* Left: White/Black to Move */}
                  <div
                    className="flex items-center"
                    style={{ gap: 'clamp(8px, 1vw, 14px)' }}
                  >
                    <svg className="w-[29px] h-[29px]" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="29" height="29" rx="6" fill="url(#paint0_linear_70_5077)"/>
                      <g clipPath="url(#clip0_70_5077)">
                        <path d="M11.6654 10.6679C11.6654 10.4911 11.7356 10.3216 11.8606 10.1965C11.9857 10.0715 12.1552 10.0013 12.332 10.0013H12.69C12.4557 9.59591 12.3322 9.13599 12.332 8.66777C12.3318 8.19955 12.4549 7.73953 12.6889 7.33397C12.9229 6.92841 13.2596 6.59162 13.665 6.35745C14.0705 6.12328 14.5305 6 14.9987 6C15.4669 6 15.9269 6.12328 16.3323 6.35745C16.7378 6.59162 17.0745 6.92841 17.3085 7.33397C17.5425 7.73953 17.6656 8.19955 17.6654 8.66777C17.6652 9.13599 17.5417 9.59591 17.3074 10.0013H17.6654C17.8422 10.0013 18.0117 10.0715 18.1368 10.1965C18.2618 10.3216 18.332 10.4911 18.332 10.6679C18.332 10.8447 18.2618 11.0143 18.1368 11.1393C18.0117 11.2644 17.8422 11.3346 17.6654 11.3346H12.332C12.1552 11.3346 11.9857 11.2644 11.8606 11.1393C11.7356 11.0143 11.6654 10.8447 11.6654 10.6679ZM20.332 19.3346H9.66536C9.31174 19.3346 8.9726 19.4751 8.72256 19.7251C8.47251 19.9752 8.33203 20.3143 8.33203 20.6679C8.33203 21.0216 8.47251 21.3607 8.72256 21.6107C8.9726 21.8608 9.31174 22.0013 9.66536 22.0013H20.332C20.6857 22.0013 21.0248 21.8608 21.2748 21.6107C21.5249 21.3607 21.6654 21.0216 21.6654 20.6679C21.6654 20.3143 21.5249 19.9752 21.2748 19.7251C21.0248 19.4751 20.6857 19.3346 20.332 19.3346ZM17.0434 12.6679H12.954C12.7114 16.1753 11.5154 18.0013 10.332 18.0013H19.6654C18.482 18.0013 17.286 16.1753 17.0434 12.6679Z" fill="white"/>
                      </g>
                      <defs>
                        <linearGradient id="paint0_linear_70_5077" x1="49.5417" y1="-29" x2="-3.10963" y2="10.338" gradientUnits="userSpaceOnUse">
                          <stop offset="0.336261" stopColor="#0167FF"/>
                          <stop offset="0.856031" stopColor="#B0D0FF"/>
                        </linearGradient>
                        <clipPath id="clip0_70_5077">
                          <rect width="16" height="16" fill="white" transform="translate(7 6)"/>
                        </clipPath>
                      </defs>
                    </svg>
                    <span
                      className="font-semibold tracking-[-0.01em] text-[#1A1D1F]"
                      style={{ fontFamily: 'Inter', fontSize: 'clamp(16px, 1.4vw, 22px)' }}
                    >
                      {currentTurn === 'w' ? 'White to Move' : 'Black to Move'}
                    </span>
                  </div>

                  {/* Right: Settings, Timer, Navigation */}
                  <div
                    className="flex items-center"
                    style={{ gap: 'clamp(10px, 1.2vw, 20px)' }}
                  >
                    {/* Settings */}
                    <button
                      className="w-10 h-10 flex items-center justify-center rounded-xl transition-colors"
                      style={{ border: '2px solid #EFEFEF' }}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.9987 9.33203C8.73508 9.33203 9.33203 8.73508 9.33203 7.9987C9.33203 7.26232 8.73508 6.66536 7.9987 6.66536C7.26232 6.66536 6.66536 7.26232 6.66536 7.9987C6.66536 8.73508 7.26232 9.33203 7.9987 9.33203ZM10.6654 7.9987C10.6654 9.47146 9.47146 10.6654 7.9987 10.6654C6.52594 10.6654 5.33203 9.47146 5.33203 7.9987C5.33203 6.52594 6.52594 5.33203 7.9987 5.33203C9.47146 5.33203 10.6654 6.52594 10.6654 7.9987Z" fill="#6F767E"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.5862 2.0013L7.32783 2.77641C7.07785 3.52634 6.53288 4.04813 5.97707 4.35762C5.93754 4.37963 5.89839 4.40227 5.85965 4.42553C5.313 4.7537 4.58757 4.96538 3.81219 4.80671L3.01101 4.64276L3.27832 3.33649L4.0795 3.50044C4.45635 3.57756 4.84359 3.48035 5.17339 3.28237C5.22453 3.25166 5.27622 3.22176 5.32843 3.19269C5.6641 3.00579 5.94142 2.71926 6.06292 2.35477L6.32129 1.57967C6.50277 1.03521 7.01229 0.667969 7.5862 0.667969H8.41417C8.98808 0.667969 9.4976 1.03521 9.67908 1.57966L9.93745 2.35477C10.0589 2.71926 10.3363 3.00579 10.6719 3.19269C10.7241 3.22176 10.7758 3.25166 10.827 3.28236C11.1568 3.48035 11.544 3.57755 11.9209 3.50044L12.722 3.33649C13.2843 3.22144 13.8571 3.47907 14.144 3.97609L14.558 4.69314C14.845 5.19016 14.7817 5.81503 14.4009 6.24443L13.8576 6.85714C13.603 7.14427 13.493 7.52718 13.499 7.91089C13.5 7.97114 13.5 8.03144 13.499 8.09168C13.493 8.47539 13.603 8.8583 13.8576 9.14542L14.4009 9.75813C14.7817 10.1875 14.845 10.8124 14.558 11.3094L14.144 12.0265C13.8571 12.5235 13.2843 12.7811 12.722 12.6661L11.9209 12.5021C11.5441 12.425 11.1568 12.5222 10.827 12.7202C10.7759 12.7509 10.7242 12.7808 10.6719 12.8099C10.3363 12.9968 10.0589 13.2833 9.93745 13.6478L9.67908 14.4229C9.4976 14.9674 8.98808 15.3346 8.41417 15.3346H7.5862C7.01229 15.3346 6.50277 14.9674 6.32129 14.4229L6.06292 13.6478C5.94142 13.2833 5.6641 12.9968 5.32843 12.8099C5.2762 12.7808 5.2245 12.7509 5.17334 12.7202C4.84354 12.5222 4.4563 12.425 4.07945 12.5021L3.27832 12.6661C2.71606 12.7811 2.14326 12.5235 1.85631 12.0265L1.44232 11.3094C1.15537 10.8124 1.21865 10.1875 1.59942 9.75813L2.59702 10.6428L3.01101 11.3598L3.81214 11.1959C4.58753 11.0372 5.31296 11.2489 5.85962 11.5771C5.89837 11.6003 5.93753 11.623 5.97707 11.645C6.53288 11.9545 7.07785 12.4763 7.32783 13.2262L7.5862 14.0013L8.41417 14.0013L8.67254 13.2262C8.92252 12.4763 9.46749 11.9545 10.0233 11.645C10.0628 11.623 10.102 11.6003 10.1407 11.5771C10.6874 11.2489 11.4128 11.0372 12.1882 11.1959L12.9893 11.3598L13.4033 10.6428L12.86 10.0301C12.3368 9.44006 12.1558 8.70836 12.1659 8.07056C12.1666 8.0244 12.1666 7.97818 12.1659 7.93202C12.1558 7.29421 12.3368 6.5625 12.86 5.97251L13.4033 5.3598L12.9893 4.64276L12.1882 4.8067C11.4128 4.96537 10.6874 4.75369 10.1407 4.42552C10.102 4.40227 10.0628 4.37963 10.0233 4.35762C9.46749 4.04813 8.92252 3.52634 8.67254 2.77641L8.41417 2.0013L7.5862 2.0013ZM1.59942 9.75813L2.59702 10.6428L3.14037 10.03C3.66354 9.44003 3.8446 8.70834 3.8345 8.07054C3.83377 8.02439 3.83377 7.97819 3.8345 7.93204C3.84461 7.29424 3.66355 6.56254 3.14037 5.97255L2.59702 5.3598L3.01101 4.64276L3.27832 3.33649C2.71606 3.22144 2.14326 3.47907 1.85631 3.97609L1.44232 4.69314C1.15537 5.19016 1.21865 5.81503 1.59942 6.24443L2.14277 6.85717C2.39738 7.1443 2.50742 7.52721 2.50134 7.91092C2.50038 7.97115 2.50038 8.03143 2.50133 8.09165C2.50741 8.47536 2.39738 8.85826 2.14277 9.14539L1.59942 9.75813Z" fill="#6F767E"/>
                      </svg>
                    </button>

                    {/* Timer */}
                    <div
                      className="flex items-center gap-2 px-4 py-2 w-[98px] h-10 rounded-xl"
                      style={{ border: '2px solid #EFEFEF' }}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_70_5102)">
                          <path d="M8 16C3.58867 16 0 12.4113 0 8C0 3.58867 3.58867 0 8 0C12.4113 0 16 3.58867 16 8C16 12.4113 12.4113 16 8 16ZM8 2C4.692 2 2 4.69133 2 8C2 11.3087 4.692 14 8 14C11.308 14 14 11.3087 14 8C14 4.69133 11.3087 2 8 2ZM11.3333 8.33333C11.3333 7.78133 10.8853 7.33333 10.3333 7.33333H8.66667V4.33333C8.66667 3.78133 8.21933 3.33333 7.66667 3.33333C7.114 3.33333 6.66667 3.78133 6.66667 4.33333V8.33333C6.66667 8.88533 7.114 9.33333 7.66667 9.33333H10.3333C10.8853 9.33333 11.3333 8.88533 11.3333 8.33333Z" fill="#6F767E"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_70_5102">
                            <rect width="16" height="16" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                      <span
                        className="font-semibold tracking-[-0.01em] text-[#6F767E]"
                        style={{ fontFamily: 'Inter', fontSize: 'clamp(12px, 1vw, 15px)' }}
                      >
                        {Math.floor(time / 60).toString().padStart(2, '0')}:{(time % 60).toString().padStart(2, '0')}
                      </span>
                    </div>

                    {/* Navigation arrows */}
                    <button
                      onClick={handlePrevious}
                      disabled={currentPuzzleIndex === 0}
                      className="w-10 h-10 flex items-center justify-center rounded-xl p-3 transition-colors"
                      style={{ border: '2px solid #EFEFEF' }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="#6F767E" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={currentPuzzleIndex >= totalPuzzles - 1}
                      className="w-10 h-10 flex items-center justify-center rounded-xl p-3 transition-colors"
                      style={{ border: '2px solid #EFEFEF' }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="#6F767E" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Three buttons in row */}
                  <div
                    className="flex justify-center items-center w-full h-12"
                    style={{ gap: 'clamp(8px, 1vw, 16px)' }}
                  >
                    {/* Get a Hint Button */}
                    <button
                      onClick={handleHint}
                      disabled={puzzleStatus !== 'playing'}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 h-12 bg-[#EFEFEF] rounded-[48px] transition-all"
                    >
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_70_5088)">
                        <path d="M3.91163 10.3887C3.20852 9.73924 2.67222 8.92995 2.34811 8.02933C2.02399 7.12871 1.92161 6.16327 2.04963 5.2147C2.1762 4.25288 2.53412 3.33609 3.09269 2.54291C3.65126 1.74973 4.39382 1.10383 5.25675 0.660548C6.11967 0.21727 7.07721 -0.0101573 8.04729 -0.00224163C9.01738 0.00567404 9.97108 0.248697 10.8267 0.705997C11.6822 1.1633 12.4142 1.82124 12.9597 2.62342C13.5053 3.42561 13.8482 4.34812 13.959 5.31188C14.0699 6.27564 13.9454 7.25191 13.5963 8.15702C13.2471 9.06213 12.6837 9.86908 11.9543 10.5087C11.4846 10.9125 11.12 11.4243 10.8916 12H8.66629V7.2107C9.0549 7.07331 9.39157 6.81921 9.63024 6.48317C9.8689 6.14712 9.99792 5.74554 9.99963 5.33337C9.99963 5.15656 9.92939 4.98699 9.80436 4.86196C9.67934 4.73694 9.50977 4.6667 9.33296 4.6667C9.15615 4.6667 8.98658 4.73694 8.86156 4.86196C8.73653 4.98699 8.66629 5.15656 8.66629 5.33337C8.66629 5.51018 8.59606 5.67975 8.47103 5.80477C8.34601 5.9298 8.17644 6.00003 7.99963 6.00003C7.82282 6.00003 7.65325 5.9298 7.52822 5.80477C7.4032 5.67975 7.33296 5.51018 7.33296 5.33337C7.33296 5.15656 7.26272 4.98699 7.1377 4.86196C7.01267 4.73694 6.8431 4.6667 6.66629 4.6667C6.48948 4.6667 6.31991 4.73694 6.19489 4.86196C6.06986 4.98699 5.99963 5.15656 5.99963 5.33337C6.00134 5.74554 6.13035 6.14712 6.36902 6.48317C6.60769 6.81921 6.94435 7.07331 7.33296 7.2107V12H5.04163C4.78676 11.3871 4.40111 10.8371 3.91163 10.3887ZM5.33296 13.3334V13.54C5.33367 14.1923 5.59307 14.8176 6.05426 15.2787C6.51544 15.7399 7.14074 15.9993 7.79296 16H8.20629C8.85851 15.9993 9.48381 15.7399 9.945 15.2787C10.4062 14.8176 10.6656 14.1923 10.6663 13.54V13.3334H5.33296Z" fill="#6F767E"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_70_5088">
                          <rect width="16" height="16" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                    <span
                      className="font-bold tracking-[-0.01em] text-[#6F767E]"
                      style={{ fontFamily: 'Inter', fontSize: 'clamp(13px, 1.1vw, 16px)' }}
                    >
                      Get a Hint
                    </span>
                    </button>

                  {/* Solution Button */}
                  <button
                    onClick={handleShowSolution}
                    disabled={puzzleStatus !== 'playing'}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 h-12 bg-[#EFEFEF] rounded-[48px] transition-all"
                    >
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_70_5092)">
                        <path d="M15.8667 7.65294C15.78 7.42027 13.6667 1.96094 8 1.96094C2.33333 1.96094 0.217333 7.42027 0.133333 7.65294L0 8.00094L0.133333 8.34894C0.22 8.5816 2.33333 14.0409 8 14.0409C13.6667 14.0409 15.7827 8.5816 15.8667 8.34894L16 8.00094L15.8667 7.65294ZM8 12.0576C4.388 12.0576 2.63933 9.04827 2.14 8.00094C2.64067 6.95094 4.39 3.94427 8 3.94427C11.61 3.94427 13.3587 6.95027 13.86 8.00094C13.3587 9.0516 11.61 12.0576 8 12.0576Z" fill="#6F767E"/>
                        <path d="M8.0026 10.6654C9.47536 10.6654 10.6693 9.47146 10.6693 7.9987C10.6693 6.52594 9.47536 5.33203 8.0026 5.33203C6.52984 5.33203 5.33594 6.52594 5.33594 7.9987C5.33594 9.47146 6.52984 10.6654 8.0026 10.6654Z" fill="#6F767E"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_70_5092">
                          <rect width="16" height="16" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                    <span
                      className="font-bold tracking-[-0.01em] text-[#6F767E]"
                      style={{ fontFamily: 'Inter', fontSize: 'clamp(13px, 1.1vw, 16px)' }}
                    >
                      Solution
                    </span>
                    </button>

                  {/* Analysis Button */}
                  <button
                    onClick={() => {/* TODO: Add analysis functionality */}}
                    disabled={puzzleStatus !== 'playing'}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 h-12 bg-[#EFEFEF] rounded-[48px] transition-all"
                    >
                    <svg className="w-[13px] h-4" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.7 0H1.95C1.43283 0 0.936838 0.210714 0.571142 0.585786C0.205446 0.960859 0 1.46957 0 2V13C0.000860227 13.7954 0.309305 14.5579 0.857663 15.1203C1.40602 15.6828 2.14951 15.9991 2.925 16H13V1.33333C13 0.979711 12.863 0.640573 12.6192 0.390524C12.3754 0.140476 12.0448 0 11.7 0ZM3.9 2V10H2.925C2.59209 10.0033 2.26224 10.0655 1.95 10.184V2H3.9ZM11.05 14H2.925C2.66641 14 2.41842 13.8946 2.23557 13.7071C2.05272 13.5196 1.95 13.2652 1.95 13C1.95 12.7348 2.05272 12.4804 2.23557 12.2929C2.41842 12.1054 2.66641 12 2.925 12H11.05V14ZM5.85 10V2H11.05V10H5.85Z" fill="#727272"/>
                    </svg>
                    <span
                      className="font-bold tracking-[-0.01em] text-[#6F767E]"
                      style={{ fontFamily: 'Inter', fontSize: 'clamp(13px, 1.1vw, 16px)' }}
                    >
                      Analysis
                    </span>
                    </button>
                  </div>
              </div>
            </div>
          </div>

          {/* Right column - Sidebar */}
          <div
            className="flex flex-col flex-1 gap-4 overflow-hidden"
            style={{ maxWidth: '420px' }}
          >
            {/* Current Session Stats */}
            <SessionStats stats={sessionStats} averageTime={sessionStats.averageTime} />

            {/* Move History */}
            <MoveHistory moves={moveHistory} currentMoveIndex={moveHistory.length - 1} />
          </div>
        </div>
      </div>

      {/* Completion Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalContent.title}
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleNext}>
              Next Puzzle
            </Button>
          </>
        }
      >
        <p className="text-lg text-gray-700">{modalContent.message}</p>
      </Modal>
    </div>
  );
};

export default PuzzlePlayer;
