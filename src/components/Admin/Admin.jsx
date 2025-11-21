import React, { useState, useEffect } from 'react';
import PuzzleForm from './PuzzleForm';
import PuzzleList from './PuzzleList';
import Modal from '../common/Modal';
import Button from '../common/Button';
import {
  getAllPuzzles,
  addPuzzle,
  updatePuzzle,
  deletePuzzle,
  exportPuzzles,
  importPuzzles
} from '../../utils/puzzleStorage';

const Admin = ({ onTestPuzzle, onBackToPlayer }) => {
  const [puzzles, setPuzzles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPuzzle, setEditingPuzzle] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [puzzleToDelete, setPuzzleToDelete] = useState(null);

  useEffect(() => {
    loadPuzzles();
  }, []);

  const loadPuzzles = () => {
    const loaded = getAllPuzzles();
    setPuzzles(loaded);
  };

  const handleSavePuzzle = (puzzleData) => {
    if (editingPuzzle) {
      updatePuzzle(editingPuzzle.id, puzzleData);
    } else {
      addPuzzle(puzzleData);
    }
    loadPuzzles();
    setShowForm(false);
    setEditingPuzzle(null);
  };

  const handleEditPuzzle = (puzzle) => {
    setEditingPuzzle(puzzle);
    setShowForm(true);
  };

  const handleDeletePuzzle = (id) => {
    setPuzzleToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (puzzleToDelete) {
      deletePuzzle(puzzleToDelete);
      loadPuzzles();
    }
    setShowDeleteConfirm(false);
    setPuzzleToDelete(null);
  };

  const handleAddNew = () => {
    setEditingPuzzle(null);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingPuzzle(null);
  };

  const handleExport = () => {
    const jsonData = exportPuzzles();
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chess-puzzles-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = importPuzzles(event.target.result);
        if (result.success) {
          loadPuzzles();
          alert(`Successfully imported ${result.count} puzzles!`);
        } else {
          alert(`Import failed: ${result.error}`);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Puzzle Admin</h1>
            <p className="text-gray-600">Manage your chess puzzle collection</p>
          </div>
          <Button variant="secondary" onClick={onBackToPlayer}>
            ← Back to Player
          </Button>
        </div>

        {/* Action buttons */}
        <div className="mb-6 flex gap-3">
          <Button variant="primary" onClick={handleAddNew}>
            + Add New Puzzle
          </Button>
          <Button variant="outline" onClick={handleExport}>
            📥 Export Puzzles
          </Button>
          <label className="cursor-pointer">
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
            <span className="inline-block px-4 py-2 bg-white border-2 border-accent text-accent hover:bg-accent hover:text-white rounded-lg transition-all duration-200 font-medium">
              📤 Import Puzzles
            </span>
          </label>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-600">Total Puzzles</p>
            <p className="text-3xl font-bold text-gray-800">{puzzles.length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-600">Tactics</p>
            <p className="text-3xl font-bold text-red-600">
              {puzzles.filter(p => p.category === 'tactics').length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-600">Endgames</p>
            <p className="text-3xl font-bold text-blue-600">
              {puzzles.filter(p => p.category === 'endgame').length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-600">Openings</p>
            <p className="text-3xl font-bold text-green-600">
              {puzzles.filter(p => p.category === 'opening').length}
            </p>
          </div>
        </div>

        {/* Puzzle List */}
        <PuzzleList
          puzzles={puzzles}
          onEdit={handleEditPuzzle}
          onDelete={handleDeletePuzzle}
          onTest={onTestPuzzle}
        />

        {/* Add/Edit Form Modal */}
        <Modal
          isOpen={showForm}
          onClose={handleCancelForm}
          title={editingPuzzle ? 'Edit Puzzle' : 'Add New Puzzle'}
          size="large"
        >
          <PuzzleForm
            puzzle={editingPuzzle}
            onSave={handleSavePuzzle}
            onCancel={handleCancelForm}
          />
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          title="Confirm Delete"
          footer={
            <>
              <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </Button>
              <Button variant="error" onClick={confirmDelete}>
                Delete
              </Button>
            </>
          }
        >
          <p className="text-gray-700">
            Are you sure you want to delete this puzzle? This action cannot be undone.
          </p>
        </Modal>
      </div>
    </div>
  );
};

export default Admin;
