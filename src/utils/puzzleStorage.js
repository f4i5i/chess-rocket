import { samplePuzzles } from '../data/samplePuzzles';

const PUZZLES_KEY = 'chess_puzzles';
const USER_STATS_KEY = 'user_stats';

// Initialize puzzles in localStorage if not present
export const initializePuzzles = () => {
  const existingPuzzles = localStorage.getItem(PUZZLES_KEY);
  if (!existingPuzzles) {
    localStorage.setItem(PUZZLES_KEY, JSON.stringify(samplePuzzles));
  }
};

// Get all puzzles
export const getAllPuzzles = () => {
  const puzzles = localStorage.getItem(PUZZLES_KEY);
  return puzzles ? JSON.parse(puzzles) : samplePuzzles;
};

// Get puzzle by ID
export const getPuzzleById = (id) => {
  const puzzles = getAllPuzzles();
  return puzzles.find(p => p.id === id);
};

// Add new puzzle
export const addPuzzle = (puzzle) => {
  const puzzles = getAllPuzzles();
  const newPuzzle = {
    ...puzzle,
    id: puzzle.id || `puzzle-${Date.now()}`,
  };
  puzzles.push(newPuzzle);
  localStorage.setItem(PUZZLES_KEY, JSON.stringify(puzzles));
  return newPuzzle;
};

// Update puzzle
export const updatePuzzle = (id, updatedPuzzle) => {
  const puzzles = getAllPuzzles();
  const index = puzzles.findIndex(p => p.id === id);
  if (index !== -1) {
    puzzles[index] = { ...puzzles[index], ...updatedPuzzle };
    localStorage.setItem(PUZZLES_KEY, JSON.stringify(puzzles));
    return puzzles[index];
  }
  return null;
};

// Delete puzzle
export const deletePuzzle = (id) => {
  const puzzles = getAllPuzzles();
  const filtered = puzzles.filter(p => p.id !== id);
  localStorage.setItem(PUZZLES_KEY, JSON.stringify(filtered));
  return filtered;
};

// Import puzzles (replaces existing)
export const importPuzzles = (puzzlesJson) => {
  try {
    const puzzles = JSON.parse(puzzlesJson);
    if (Array.isArray(puzzles)) {
      localStorage.setItem(PUZZLES_KEY, JSON.stringify(puzzles));
      return { success: true, count: puzzles.length };
    }
    return { success: false, error: 'Invalid JSON format' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Export puzzles
export const exportPuzzles = () => {
  const puzzles = getAllPuzzles();
  return JSON.stringify(puzzles, null, 2);
};

// Initialize user stats
export const initializeUserStats = () => {
  const existingStats = localStorage.getItem(USER_STATS_KEY);
  if (!existingStats) {
    const defaultStats = {
      rating: 1200,
      solved: 0,
      streak: 0,
      accuracy: 0,
      averageTime: 0,
      history: []
    };
    localStorage.setItem(USER_STATS_KEY, JSON.stringify(defaultStats));
    return defaultStats;
  }
  return JSON.parse(existingStats);
};

// Get user stats
export const getUserStats = () => {
  const stats = localStorage.getItem(USER_STATS_KEY);
  return stats ? JSON.parse(stats) : initializeUserStats();
};

// Update user stats
export const updateUserStats = (updates) => {
  const currentStats = getUserStats();
  const newStats = { ...currentStats, ...updates };
  localStorage.setItem(USER_STATS_KEY, JSON.stringify(newStats));
  return newStats;
};

// Record puzzle completion
export const recordPuzzleCompletion = (puzzleId, success, timeSpent) => {
  const stats = getUserStats();

  // Update history
  stats.history.push({
    puzzleId,
    success,
    timeSpent,
    timestamp: new Date().toISOString()
  });

  // Update stats
  if (success) {
    stats.solved += 1;
    stats.streak += 1;
  } else {
    stats.streak = 0;
  }

  // Calculate accuracy
  const totalAttempts = stats.history.length;
  const successfulAttempts = stats.history.filter(h => h.success).length;
  stats.accuracy = Math.round((successfulAttempts / totalAttempts) * 100);

  // Calculate average time
  const totalTime = stats.history.reduce((sum, h) => sum + h.timeSpent, 0);
  stats.averageTime = Math.round(totalTime / totalAttempts);

  // Update rating (simple ELO-like system)
  if (success) {
    stats.rating += 10;
  } else {
    stats.rating = Math.max(800, stats.rating - 5);
  }

  localStorage.setItem(USER_STATS_KEY, JSON.stringify(stats));
  return stats;
};

// Reset user stats
export const resetUserStats = () => {
  const defaultStats = {
    rating: 1200,
    solved: 0,
    streak: 0,
    accuracy: 0,
    averageTime: 0,
    history: []
  };
  localStorage.setItem(USER_STATS_KEY, JSON.stringify(defaultStats));
  return defaultStats;
};

// Get session stats (current session only)
export const getSessionStats = () => {
  const stats = getUserStats();
  const sessionStartTime = new Date();
  sessionStartTime.setHours(0, 0, 0, 0);

  const sessionHistory = stats.history.filter(h =>
    new Date(h.timestamp) >= sessionStartTime
  );

  const sessionSolved = sessionHistory.filter(h => h.success).length;
  const sessionAccuracy = sessionHistory.length > 0
    ? Math.round((sessionSolved / sessionHistory.length) * 100)
    : 0;

  return {
    solved: sessionSolved,
    accuracy: sessionAccuracy,
    streak: stats.streak,
    rating: stats.rating
  };
};
