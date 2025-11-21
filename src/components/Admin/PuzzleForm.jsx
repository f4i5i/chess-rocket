import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import { isValidFen } from '../../utils/chessHelper';

const PuzzleForm = ({ puzzle, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    fen: '',
    solution: '',
    playerColor: 'white',
    difficulty: 1200,
    category: 'tactics',
    description: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (puzzle) {
      setFormData({
        ...puzzle,
        solution: Array.isArray(puzzle.solution) ? puzzle.solution.join(', ') : puzzle.solution
      });
    }
  }, [puzzle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fen.trim()) {
      newErrors.fen = 'FEN is required';
    } else if (!isValidFen(formData.fen)) {
      newErrors.fen = 'Invalid FEN notation';
    }

    if (!formData.solution.trim()) {
      newErrors.solution = 'Solution is required';
    }

    if (!formData.difficulty || formData.difficulty < 0) {
      newErrors.difficulty = 'Difficulty must be a positive number';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const puzzleData = {
      ...formData,
      solution: formData.solution.split(',').map(s => s.trim()).filter(s => s),
      difficulty: parseInt(formData.difficulty),
      id: formData.id || `puzzle-${Date.now()}`
    };

    onSave(puzzleData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          FEN Position *
        </label>
        <textarea
          name="fen"
          value={formData.fen}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.fen ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-accent'
          }`}
          rows="2"
          placeholder="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        />
        {errors.fen && <p className="text-red-500 text-sm mt-1">{errors.fen}</p>}
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          Solution (comma-separated moves) *
        </label>
        <input
          type="text"
          name="solution"
          value={formData.solution}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.solution ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-accent'
          }`}
          placeholder="e2e4, e7e5, Nf3"
        />
        {errors.solution && <p className="text-red-500 text-sm mt-1">{errors.solution}</p>}
        <p className="text-xs text-gray-500 mt-1">
          Enter moves in algebraic notation or UCI format, separated by commas
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Player Color *
          </label>
          <select
            name="playerColor"
            value={formData.playerColor}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="white">White</option>
            <option value="black">Black</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Difficulty *
          </label>
          <input
            type="number"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.difficulty ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-accent'
            }`}
            placeholder="1200"
          />
          {errors.difficulty && <p className="text-red-500 text-sm mt-1">{errors.difficulty}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="tactics">Tactics</option>
          <option value="endgame">Endgame</option>
          <option value="opening">Opening</option>
          <option value="middlegame">Middlegame</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          Description
        </label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Find the best move"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" variant="primary" size="medium" className="flex-1">
          {puzzle ? 'Update Puzzle' : 'Add Puzzle'}
        </Button>
        <Button type="button" variant="secondary" size="medium" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default PuzzleForm;
