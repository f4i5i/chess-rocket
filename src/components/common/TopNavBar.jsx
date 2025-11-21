import React from 'react';
import avatarImage from '../../assets/avator.png';

const TopNavBar = ({ puzzleRating = 1204 }) => {
  return (
    <div
      className="w-full z-40 flex items-center justify-between flex-shrink-0"
      style={{
        backgroundColor: '#F7F8FA',
        height: 'clamp(60px, 8vh, 72px)',
        padding: 'clamp(12px, 1.5vh, 20px) clamp(24px, 3vw, 60px)'
      }}
    >
      {/* Back Arrow */}
      <svg className="w-6 h-6 cursor-pointer flex-none" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#1A1D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

      {/* Title */}
      <h1
        className="ml-4 font-bold text-[#1A1D1F] flex-none"
        style={{
          fontFamily: 'Inter',
          textShadow: '0px 3px 4px rgba(0, 0, 0, 0.25)',
          fontSize: 'clamp(20px, 2vw, 28px)',
          lineHeight: 'clamp(28px, 2.8vw, 36px)'
        }}
      >
        Puzzle - Rating Climb
      </h1>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Right Section */}
      <div
        className="flex items-center"
        style={{ gap: 'clamp(8px, 1vw, 18px)' }}
      >
        {/* Give Up Button */}
        <button
          className="flex items-center justify-center gap-2 h-12 px-6 bg-[#EFEFEF] rounded-[48px]"
          style={{ boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.25)' }}
        >
          <svg className="w-[17px] h-[17px]" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_70_4954)">
              <path d="M2.83398 10.625C2.83398 10.625 3.54232 9.91669 5.66732 9.91669C7.79232 9.91669 9.20898 11.3334 11.334 11.3334C13.459 11.3334 14.1673 10.625 14.1673 10.625V2.12502C14.1673 2.12502 13.459 2.83335 11.334 2.83335C9.20898 2.83335 7.79232 1.41669 5.66732 1.41669C3.54232 1.41669 2.83398 2.12502 2.83398 2.12502V10.625Z" stroke="#6F767E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2.83398 15.5833V10.625" stroke="#6F767E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_70_4954">
                <rect width="17" height="17" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <span
            className="font-bold tracking-[-0.01em] text-[#6F767E] whitespace-nowrap"
            style={{ fontFamily: 'Inter', fontSize: 'clamp(13px, 1.1vw, 16px)' }}
          >
            Give Up
          </span>
        </button>

        {/* Puzzle Rating Button */}
        <button
          className="flex items-center justify-center gap-2 h-12 px-6 bg-white rounded-[48px]"
          style={{ boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.25)' }}
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_70_4959)">
              <path d="M3.99775 5.99786H2.99811C2.55624 5.99786 2.13246 5.82233 1.82001 5.50988C1.50756 5.19743 1.33203 4.77366 1.33203 4.33179C1.33203 3.88991 1.50756 3.46614 1.82001 3.15369C2.13246 2.84124 2.55624 2.66571 2.99811 2.66571H3.99775" stroke="#4F39F6" strokeWidth="1.33286" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.9961 5.99786H12.9957C13.4376 5.99786 13.8614 5.82233 14.1738 5.50988C14.4863 5.19743 14.6618 4.77366 14.6618 4.33179C14.6618 3.88991 14.4863 3.46614 14.1738 3.15369C13.8614 2.84124 13.4376 2.66571 12.9957 2.66571H11.9961" stroke="#4F39F6" strokeWidth="1.33286" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2.66602 14.6614H13.3289" stroke="#4F39F6" strokeWidth="1.33286" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.66335 9.76984V11.3293C6.66335 11.6958 6.35013 11.9824 6.01692 12.1357C5.23053 12.4955 4.66406 13.4885 4.66406 14.6614" stroke="#4F39F6" strokeWidth="1.33286" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.33008 9.76984V11.3293C9.33008 11.6958 9.6433 11.9824 9.97652 12.1357C10.7629 12.4955 11.3294 13.4885 11.3294 14.6614" stroke="#4F39F6" strokeWidth="1.33286" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.9952 1.33289H3.99805V5.99789C3.99805 7.05838 4.41932 8.07544 5.1692 8.82532C5.91908 9.5752 6.93614 9.99647 7.99663 9.99647C9.05712 9.99647 10.0742 9.5752 10.824 8.82532C11.5739 8.07544 11.9952 7.05838 11.9952 5.99789V1.33289Z" stroke="#4F39F6" strokeWidth="1.33286" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_70_4959">
                <rect width="15.9943" height="15.9943" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <span
            className="font-bold tracking-[-0.01em] text-[#4F39F6]"
            style={{ fontFamily: 'Inter', fontSize: 'clamp(13px, 1.1vw, 16px)' }}
          >
            Puzzle Rating: {puzzleRating}
          </span>
        </button>

        {/* Avatar */}
        <div className="relative w-12 h-12">
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: 'linear-gradient(180deg, #CBDED5 0%, #A5D0BB 100%)' }}
          />
          <img
            src={avatarImage}
            alt="User Avatar"
            className="relative w-12 h-12 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
