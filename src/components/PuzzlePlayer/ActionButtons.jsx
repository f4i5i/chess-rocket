import React from 'react';

const ActionButtons = ({
  onHint,
  onShowSolution,
  onGiveUp,
  disabled = false
}) => {
  return (
    <div className="bg-white rounded-lg p-4 card-shadow space-y-3">
      <h3 className="text-lg font-bold text-text-primary mb-4 pb-3 border-b border-gray-200">
        Quick Actions
      </h3>

      {/* Get Hint Button */}
      <button
        onClick={onHint}
        disabled={disabled}
        className={`w-full h-11 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md font-medium text-sm transition-all duration-200 ${
          disabled
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
            : 'bg-white text-primary-purple border-2 border-primary-purple hover:bg-purple-50 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]'
        }`}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
        </svg>
        Get Hint
      </button>

      {/* Show Solution Button */}
      <button
        onClick={onShowSolution}
        disabled={disabled}
        className={`w-full h-11 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md font-medium text-sm transition-all duration-200 ${
          disabled
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
            : 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]'
        }`}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
        </svg>
        Show Solution
      </button>

      {/* Give Up Button */}
      <button
        onClick={onGiveUp}
        disabled={disabled}
        className={`w-full h-11 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md font-medium text-sm transition-all duration-200 ${
          disabled
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
            : 'bg-red-500 text-white hover:bg-red-600 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        Give Up
      </button>
    </div>
  );
};

export default ActionButtons;
