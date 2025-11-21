import React from 'react';
import Button from '../common/Button';

const PuzzleList = ({ puzzles, onEdit, onDelete, onTest }) => {
  if (puzzles.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg">
        <p className="text-gray-500 text-lg">No puzzles yet. Add your first puzzle!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Difficulty</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Category</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Color</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Moves</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Description</th>
              <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {puzzles.map((puzzle) => (
              <tr key={puzzle.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-600 font-mono">{puzzle.id}</td>
                <td className="px-4 py-3 text-sm text-gray-800 font-semibold">{puzzle.difficulty}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    puzzle.category === 'tactics' ? 'bg-red-100 text-red-800' :
                    puzzle.category === 'endgame' ? 'bg-blue-100 text-blue-800' :
                    puzzle.category === 'opening' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {puzzle.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className={`w-4 h-4 rounded-full ${
                      puzzle.playerColor === 'white' ? 'bg-white border-2 border-gray-300' : 'bg-gray-800'
                    }`}></span>
                    <span className="capitalize">{puzzle.playerColor}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 font-mono">
                  {puzzle.solution?.length || 0}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                  {puzzle.description || '-'}
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    onClick={() => onTest(puzzle)}
                    className="text-accent hover:text-purple-700 text-sm font-semibold"
                    title="Test puzzle"
                  >
                    Test
                  </button>
                  <button
                    onClick={() => onEdit(puzzle)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                    title="Edit puzzle"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(puzzle.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-semibold"
                    title="Delete puzzle"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PuzzleList;
