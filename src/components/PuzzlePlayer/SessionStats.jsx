import React from 'react';
import { formatTime } from '../../utils/chessHelper';

const SessionStats = ({ stats, averageTime }) => {
  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden flex-shrink-0" style={{ border: '1.5px solid rgba(123, 123, 123, 0.1)' }}>
      {/* Title */}
      <div className="px-4 pt-4 pb-2">
        <h3 className="font-semibold text-base leading-6 text-[#1A1D1F]" style={{ fontFamily: 'Inter' }}>
          Current Session
        </h3>
      </div>

      {/* Solved Row */}
      <div className="w-full h-12 flex items-center justify-between px-4" style={{ borderBottom: '1px solid #EFEFEF' }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#32AE60] flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M13.5 4.5L6 12L2.5 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-semibold text-sm text-[#000000]" style={{ fontFamily: 'Inter' }}>
            Solved
          </span>
        </div>
        <span className="font-bold text-base text-[#101010]" style={{ fontFamily: 'Manrope' }}>
          {stats.solved}
        </span>
      </div>

      {/* Streak Row */}
      <div className="w-full h-12 flex items-center justify-between px-4" style={{ borderBottom: '1px solid #EFEFEF' }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#1A1D1F] flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M9 2L5 9H8L7 14L11 7H8L9 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-semibold text-sm text-[#000000]" style={{ fontFamily: 'Inter' }}>
            Streak
          </span>
        </div>
        <span className="font-bold text-base text-[#101010]" style={{ fontFamily: 'Manrope' }}>
          {stats.streak}
        </span>
      </div>

      {/* Rating Row */}
      <div className="w-full h-12 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#F04D1A] flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L10 5H14L11 8L12 13L8 10L4 13L5 8L2 5H6L8 1Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-semibold text-sm text-[#000000]" style={{ fontFamily: 'Inter' }}>
            Rating
          </span>
        </div>
        <span className="font-bold text-base text-[#101010]" style={{ fontFamily: 'Manrope' }}>
          {stats.rating.toLocaleString()}
        </span>
      </div>

      {/* Progress Bar Section */}
      <div className="px-4 py-3">
        {/* Progress Bar */}
        <div className="w-full h-1.5 rounded-full mb-2" style={{ backgroundColor: '#F0F0F0' }}>
          <div
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              width: `${stats.accuracy}%`,
              backgroundColor: '#6366F1'
            }}
          />
        </div>

        {/* Labels */}
        <div className="w-full flex justify-between">
          <span className="font-semibold text-xs" style={{ fontFamily: 'Inter', color: '#6366F1' }}>
            {stats.accuracy}%
          </span>
          <span className="font-semibold text-xs" style={{ fontFamily: 'Inter', color: '#A7ACB0' }}>
            {formatTime(averageTime || 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SessionStats;
