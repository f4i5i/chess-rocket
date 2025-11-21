import { Chess } from 'chess.js';

// Create a new chess instance from FEN
export const createChessInstance = (fen) => {
  try {
    const chess = new Chess(fen);
    return chess;
  } catch (error) {
    console.error('Invalid FEN:', error);
    return null;
  }
};

// Validate if a move is legal
export const isLegalMove = (chess, move) => {
  try {
    const result = chess.move(move);
    if (result) {
      chess.undo();
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

// Make a move and return the result
export const makeMove = (chess, move) => {
  try {
    const result = chess.move(move);
    return result;
  } catch (error) {
    console.error('Invalid move:', error);
    return null;
  }
};

// Convert move object to algebraic notation
export const moveToAlgebraic = (move) => {
  if (typeof move === 'string') return move;
  if (move && move.san) return move.san;
  if (move && move.from && move.to) {
    return `${move.from}${move.to}${move.promotion || ''}`;
  }
  return '';
};

// Compare two moves (handles different formats)
export const movesMatch = (move1, move2) => {
  const normalize = (move) => {
    if (typeof move === 'string') {
      // Remove check/checkmate symbols for comparison
      return move.replace(/[+#]/g, '');
    }
    if (move.san) {
      return move.san.replace(/[+#]/g, '');
    }
    if (move.from && move.to) {
      return `${move.from}${move.to}${move.promotion || ''}`;
    }
    return '';
  };

  const normalized1 = normalize(move1);
  const normalized2 = normalize(move2);

  return normalized1 === normalized2;
};

// Get all legal moves for current position
export const getLegalMoves = (chess) => {
  return chess.moves({ verbose: true });
};

// Get legal moves for a specific square
export const getLegalMovesForSquare = (chess, square) => {
  return chess.moves({ square, verbose: true });
};

// Check if the game is over
export const isGameOver = (chess) => {
  return chess.game_over();
};

// Check if it's checkmate
export const isCheckmate = (chess) => {
  return chess.in_checkmate();
};

// Check if it's stalemate
export const isStalemate = (chess) => {
  return chess.in_stalemate();
};

// Check if the king is in check
export const isInCheck = (chess) => {
  return chess.in_check();
};

// Get the current turn
export const getCurrentTurn = (chess) => {
  return chess.turn(); // 'w' for white, 'b' for black
};

// Get move history
export const getMoveHistory = (chess) => {
  return chess.history({ verbose: true });
};

// Get FEN string
export const getFen = (chess) => {
  return chess.fen();
};

// Get PGN string
export const getPgn = (chess) => {
  return chess.pgn();
};

// Convert square notation (e.g., 'e2e4' to {from: 'e2', to: 'e4'})
export const parseMove = (moveString) => {
  if (moveString.length === 4) {
    return {
      from: moveString.slice(0, 2),
      to: moveString.slice(2, 4)
    };
  } else if (moveString.length === 5) {
    return {
      from: moveString.slice(0, 2),
      to: moveString.slice(2, 4),
      promotion: moveString[4]
    };
  }
  return null;
};

// Get piece at square
export const getPieceAt = (chess, square) => {
  return chess.get(square);
};

// Validate FEN string
export const isValidFen = (fen) => {
  try {
    new Chess(fen);
    return true;
  } catch (error) {
    return false;
  }
};

// Get square color
export const getSquareColor = (square) => {
  const file = square.charCodeAt(0) - 97; // 'a' = 0, 'b' = 1, etc.
  const rank = parseInt(square[1]) - 1;
  return (file + rank) % 2 === 0 ? 'dark' : 'light';
};

// Format time in mm:ss
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Get piece symbol
export const getPieceSymbol = (piece) => {
  if (!piece) return '';
  const symbols = {
    'p': '♟',
    'n': '♞',
    'b': '♝',
    'r': '♜',
    'q': '♛',
    'k': '♚',
    'P': '♙',
    'N': '♘',
    'B': '♗',
    'R': '♖',
    'Q': '♕',
    'K': '♔'
  };
  return symbols[piece] || piece;
};
