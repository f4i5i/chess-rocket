import React from 'react';

const Timer = ({ time, isRunning }) => {
  // Format time as MM:SS
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-3 card-shadow">
      <svg
        className={`w-6 h-6 transition-colors duration-200 ${isRunning ? 'text-primary-purple' : 'text-gray-400'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
      </svg>
      <span className="text-2xl font-mono font-bold text-text-primary tracking-wider">
        {timeString}
      </span>
    </div>
  );
};

export default Timer;
