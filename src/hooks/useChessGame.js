import { useState, useCallback, useEffect } from 'react';
import { Chess } from 'chess.js';
import {
  makeMove,
  movesMatch,
  getFen,
  getMoveHistory,
  getCurrentTurn,
  isGameOver
} from '../utils/chessHelper';

export const useChessGame = (initialFen) => {
  const [chess] = useState(() => {
    // If no FEN or invalid FEN, use default starting position
    if (!initialFen || initialFen === 'start') {
      return new Chess();
    }
    return new Chess(initialFen);
  });
  const [fen, setFen] = useState(() => {
    if (!initialFen || initialFen === 'start') {
      return 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    }
    return initialFen;
  });
  const [moveHistory, setMoveHistory] = useState([]);
  const [currentTurn, setCurrentTurn] = useState('w');
  const [gameOver, setGameOver] = useState(false);
  const [lastMove, setLastMove] = useState(null);

  // Update state from chess instance
  const updateState = useCallback(() => {
    setFen(getFen(chess));
    setMoveHistory(getMoveHistory(chess));
    setCurrentTurn(getCurrentTurn(chess));
    setGameOver(isGameOver(chess));
  }, [chess]);

  // Reset game to initial FEN
  const resetGame = useCallback((newFen) => {
    try {
      const fenToLoad = newFen || initialFen;
      chess.load(fenToLoad);
      setLastMove(null);
      updateState();
    } catch (error) {
      console.error('Error loading FEN:', error);
    }
  }, [chess, initialFen, updateState]);

  // Make a move
  const move = useCallback((moveNotation) => {
    try {
      const result = makeMove(chess, moveNotation);
      if (result) {
        setLastMove({ from: result.from, to: result.to });
        updateState();
        return result;
      }
      return null;
    } catch (error) {
      console.error('Move error:', error);
      return null;
    }
  }, [chess, updateState]);

  // Undo last move
  const undoMove = useCallback(() => {
    const undone = chess.undo();
    if (undone) {
      setLastMove(null);
      updateState();
      return true;
    }
    return false;
  }, [chess, updateState]);

  // Check if a move is in the solution
  const checkMove = useCallback((moveNotation, expectedMove) => {
    return movesMatch(moveNotation, expectedMove);
  }, []);

  // Get legal moves for a square (or all moves if no square specified)
  const getLegalMoves = useCallback((square) => {
    if (square) {
      return chess.moves({ square, verbose: true });
    }
    return chess.moves({ verbose: true });
  }, [chess]);

  // Initialize state on mount - run only once
  useEffect(() => {
    updateState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    chess,
    fen,
    moveHistory,
    currentTurn,
    gameOver,
    lastMove,
    move,
    undoMove,
    resetGame,
    checkMove,
    getLegalMoves,
    updateState
  };
};

export default useChessGame;
