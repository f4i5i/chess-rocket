import { useState, useCallback, useEffect } from 'react';
import {
  getAllPuzzles,
  initializePuzzles,
  recordPuzzleCompletion,
  getSessionStats
} from '../utils/puzzleStorage';

export const usePuzzleManager = () => {
  const [puzzles, setPuzzles] = useState([]);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [sessionStats, setSessionStats] = useState({
    solved: 0,
    accuracy: 0,
    streak: 0,
    rating: 1200
  });

  // Initialize puzzles and stats
  useEffect(() => {
    initializePuzzles();
    const loadedPuzzles = getAllPuzzles();
    setPuzzles(loadedPuzzles);
    if (loadedPuzzles.length > 0) {
      setCurrentPuzzle(loadedPuzzles[0]);
    }
    updateSessionStats();
  }, []);

  // Update session stats
  const updateSessionStats = useCallback(() => {
    const stats = getSessionStats();
    setSessionStats(stats);
  }, []);

  // Load a specific puzzle by index
  const loadPuzzle = useCallback((index) => {
    if (index >= 0 && index < puzzles.length) {
      setCurrentPuzzleIndex(index);
      setCurrentPuzzle(puzzles[index]);
      return puzzles[index];
    }
    return null;
  }, [puzzles]);

  // Load next puzzle
  const nextPuzzle = useCallback(() => {
    const nextIndex = (currentPuzzleIndex + 1) % puzzles.length;
    return loadPuzzle(nextIndex);
  }, [currentPuzzleIndex, puzzles.length, loadPuzzle]);

  // Load previous puzzle
  const previousPuzzle = useCallback(() => {
    const prevIndex = currentPuzzleIndex === 0
      ? puzzles.length - 1
      : currentPuzzleIndex - 1;
    return loadPuzzle(prevIndex);
  }, [currentPuzzleIndex, puzzles.length, loadPuzzle]);

  // Record puzzle completion
  const completePuzzle = useCallback((success, timeSpent) => {
    if (currentPuzzle) {
      recordPuzzleCompletion(currentPuzzle.id, success, timeSpent);
      updateSessionStats();
    }
  }, [currentPuzzle, updateSessionStats]);

  // Reload all puzzles (useful after admin changes)
  const reloadPuzzles = useCallback(() => {
    const loadedPuzzles = getAllPuzzles();
    setPuzzles(loadedPuzzles);
    if (loadedPuzzles.length > 0 && currentPuzzleIndex < loadedPuzzles.length) {
      setCurrentPuzzle(loadedPuzzles[currentPuzzleIndex]);
    } else if (loadedPuzzles.length > 0) {
      setCurrentPuzzleIndex(0);
      setCurrentPuzzle(loadedPuzzles[0]);
    }
  }, [currentPuzzleIndex]);

  return {
    puzzles,
    currentPuzzle,
    currentPuzzleIndex,
    totalPuzzles: puzzles.length,
    sessionStats,
    nextPuzzle,
    previousPuzzle,
    loadPuzzle,
    completePuzzle,
    reloadPuzzles,
    updateSessionStats
  };
};

export default usePuzzleManager;
