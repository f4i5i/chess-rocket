import React, { useMemo } from 'react';
import { Chessboard } from 'react-chessboard';

const ChessBoard = ({
  position,
  onPieceDrop,
  playerColor = 'white',
  disabled = false,
  highlightSquares = {},
  lastMove = null,
  showHint = false,
  hintSquare = null
}) => {
  const customSquareStyles = useMemo(() => {
    const styles = { ...highlightSquares };

    // Add last move highlight
    if (lastMove && !disabled) {
      styles[lastMove.from] = {
        backgroundColor: 'rgba(139, 92, 246, 0.3)'
      };
      styles[lastMove.to] = {
        backgroundColor: 'rgba(139, 92, 246, 0.3)'
      };
    }

    // Add hint highlight (bright yellow/gold to make it very obvious)
    if (showHint && hintSquare) {
      styles[hintSquare] = {
        backgroundColor: 'rgba(251, 191, 36, 0.8)',
        boxShadow: '0 0 20px rgba(251, 191, 36, 0.9) inset, 0 0 10px rgba(251, 191, 36, 0.6)'
      };
    }

    return styles;
  }, [JSON.stringify(highlightSquares), lastMove?.from, lastMove?.to, disabled, showHint, hintSquare]);

  const boardOrientation = playerColor === 'black' ? 'black' : 'white';

  return (
    <div className="chess-board-wrapper w-full h-full">
      <div
        className="rounded-lg overflow-hidden w-full h-full"
        style={{
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Chessboard
          id="BasicBoard"
          position={position}
          onPieceDrop={onPieceDrop}
          boardOrientation={boardOrientation}
          customSquareStyles={customSquareStyles}
          customBoardStyle={{
            borderRadius: '8px',
            boxShadow: 'none'
          }}
          customLightSquareStyle={{
            backgroundColor: '#B8D4E8'
          }}
          customDarkSquareStyle={{
            backgroundColor: '#7FA6C3'
          }}
          arePiecesDraggable={!disabled}
          showBoardNotation={true}
        />
      </div>
    </div>
  );
};

export default ChessBoard;
