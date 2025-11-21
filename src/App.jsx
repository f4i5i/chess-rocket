import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import PuzzlePlayer from './components/PuzzlePlayer/PuzzlePlayer';
import Admin from './components/Admin/Admin';
import LeftSidebar from './components/common/LeftSidebar';
import Button from './components/common/Button';
import { initializePuzzles, initializeUserStats } from './utils/puzzleStorage';

function PlayerView({ testPuzzle }) {
  return (
    <>
      <LeftSidebar />
      <main>
        <PuzzlePlayer testPuzzle={testPuzzle} />
      </main>
    </>
  );
}

function AdminView({ onTestPuzzle }) {
  const navigate = useNavigate();

  const handleBackToPlayer = () => {
    navigate('/');
  };

  return (
    <main className="ml-0">
      <div className="min-h-screen bg-gray-100">
        {/* Admin Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg
                  className="w-8 h-8 text-primary-purple"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 22H5c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2zM5 4v16h14V4H5zm7 14c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm0-4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0-7c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 4c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z"/>
                </svg>
                <h1 className="text-2xl font-bold text-text-primary">Chess Puzzle Trainer - Admin</h1>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="primary"
                  onClick={handleBackToPlayer}
                  size="medium"
                >
                  ← Back to Puzzles
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <Admin
          onTestPuzzle={onTestPuzzle}
          onBackToPlayer={handleBackToPlayer}
        />
      </div>
    </main>
  );
}

function AppContent() {
  const [testPuzzle, setTestPuzzle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize data on app load
    initializePuzzles();
    initializeUserStats();
  }, []);

  const handleTestPuzzle = (puzzle) => {
    setTestPuzzle(puzzle);
    navigate('/');
  };

  return (
    <div className="app min-h-screen flex justify-center" style={{ backgroundColor: '#F7F8FA' }}>
      <div className="w-full max-w-[2000px] relative">
        <Routes>
          <Route path="/" element={<PlayerView testPuzzle={testPuzzle} />} />
          <Route path="/admin" element={<AdminView onTestPuzzle={handleTestPuzzle} />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
