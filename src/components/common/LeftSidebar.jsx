import React from 'react';
import ChessRocketLogo from '../../assets/ChessRocket.png';
import avatarImage from '../../assets/avator.png';

const LeftSidebar = () => {
  const menuItems = [
    {
      name: 'Home',
      icon: <svg className="w-6 h-6" fill="none" stroke="#6F767E" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
      active: false,
      hasSubmenu: false
    },
    {
      name: 'Training',
      icon: <svg className="w-6 h-6" fill="none" stroke="#1A1D1F" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
      active: true,
      hasSubmenu: true
    },
    {
      name: 'Puzzles',
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none"><path d="M15.3908 4.39009C15.5165 4.51592 15.6735 4.60594 15.8456 4.65089C16.0177 4.69583 16.1987 4.69406 16.3698 4.64577C16.541 4.59747 16.6962 4.50439 16.8194 4.37613C16.9427 4.24787 17.0294 4.08906 17.0708 3.91609C17.1746 3.48399 17.3918 3.08736 17.6998 2.76707C18.0079 2.44677 18.3957 2.21437 18.8235 2.09381C19.2512 1.97325 19.7033 1.96888 20.1333 2.08116C20.5633 2.19343 20.9556 2.41829 21.2697 2.73258C21.5839 3.04687 21.8087 3.43922 21.9208 3.86924C22.0329 4.29926 22.0284 4.75139 21.9077 5.17908C21.787 5.60677 21.5545 5.99456 21.2341 6.3025C20.9137 6.61045 20.517 6.82743 20.0848 6.93109C19.9119 6.97249 19.7531 7.05927 19.6248 7.18249C19.4965 7.30571 19.4035 7.46091 19.3552 7.63208C19.3069 7.80326 19.3051 7.98422 19.35 8.15631C19.395 8.3284 19.485 8.48539 19.6108 8.61109L21.2938 10.2931C21.518 10.5173 21.6958 10.7834 21.8172 11.0763C21.9385 11.3691 22.0009 11.6831 22.0009 12.0001C22.0009 12.3171 21.9385 12.631 21.8172 12.9239C21.6958 13.2168 21.518 13.4829 21.2938 13.7071L19.6108 15.3901C19.4851 15.5159 19.3281 15.6059 19.1561 15.6509C18.984 15.6958 18.803 15.6941 18.6318 15.6458C18.4607 15.5975 18.3055 15.5044 18.1822 15.3761C18.059 15.2479 17.9722 15.0891 17.9308 14.9161C17.827 14.484 17.6099 14.0874 17.3019 13.7671C16.9938 13.4468 16.606 13.2144 16.1782 13.0938C15.7505 12.9733 15.2984 12.9689 14.8684 13.0812C14.4384 13.1934 14.0461 13.4183 13.7319 13.7326C13.4178 14.0469 13.193 14.4392 13.0809 14.8692C12.9688 15.2993 12.9733 15.7514 13.094 16.1791C13.2147 16.6068 13.4472 16.9946 13.7676 17.3025C14.088 17.6104 14.4847 17.8274 14.9168 17.9311C15.0898 17.9725 15.2486 18.0593 15.3769 18.1825C15.5051 18.3057 15.5982 18.4609 15.6465 18.6321C15.6948 18.8033 15.6966 18.9842 15.6516 19.1563C15.6067 19.3284 15.5167 19.4854 15.3908 19.6111L13.7078 21.2931C13.4837 21.5173 13.2176 21.6951 12.9247 21.8164C12.6318 21.9377 12.3179 22.0002 12.0008 22.0002C11.6838 22.0002 11.3699 21.9377 11.077 21.8164C10.7841 21.6951 10.518 21.5173 10.2938 21.2931L8.61084 19.6101C8.48514 19.4843 8.32815 19.3942 8.15606 19.3493C7.98397 19.3043 7.80301 19.3061 7.63183 19.3544C7.46066 19.4027 7.30546 19.4958 7.18224 19.624C7.05902 19.7523 6.97224 19.9111 6.93084 20.0841C6.82704 20.5162 6.60993 20.9128 6.30187 21.2331C5.99382 21.5534 5.60596 21.7858 5.17823 21.9064C4.7505 22.0269 4.29836 22.0313 3.86838 21.919C3.4384 21.8067 3.04612 21.5819 2.73194 21.2676C2.41776 20.9533 2.19303 20.561 2.08089 20.1309C1.96876 19.7009 1.97328 19.2488 2.09398 18.8211C2.21468 18.3934 2.44721 18.0056 2.76761 17.6977C3.08801 17.3897 3.4847 17.1728 3.91684 17.0691C4.08982 17.0277 4.24862 16.9409 4.37688 16.8177C4.50514 16.6945 4.59822 16.5393 4.64652 16.3681C4.69481 16.1969 4.69658 16.016 4.65164 15.8439C4.6067 15.6718 4.51667 15.5148 4.39084 15.3891L2.70784 13.7071C2.48367 13.4829 2.30584 13.2168 2.18452 12.9239C2.0632 12.631 2.00075 12.3171 2.00075 12.0001C2.00075 11.6831 2.0632 11.3691 2.18452 11.0763C2.30584 10.7834 2.48367 10.5173 2.70784 10.2931L4.39084 8.61009C4.51654 8.48426 4.67353 8.39423 4.84562 8.34929C5.01771 8.30435 5.19867 8.30612 5.36985 8.35441C5.54102 8.40271 5.69622 8.49579 5.81944 8.62405C5.94266 8.75231 6.02944 8.91111 6.07084 9.08409C6.17465 9.51619 6.39175 9.91281 6.69981 10.2331C7.00786 10.5534 7.39572 10.7858 7.82345 10.9064C8.25118 11.0269 8.70332 11.0313 9.1333 10.919C9.56328 10.8067 9.95556 10.5819 10.2697 10.2676C10.5839 9.95331 10.8087 9.56095 10.9208 9.13094C11.0329 8.70092 11.0284 8.24879 10.9077 7.8211C10.787 7.39341 10.5545 7.00562 10.2341 6.69767C9.91367 6.38973 9.51698 6.17275 9.08484 6.06909C8.91186 6.02769 8.75306 5.94091 8.6248 5.81769C8.49654 5.69447 8.40346 5.53927 8.35516 5.36809C8.30687 5.19692 8.3051 5.01596 8.35004 4.84387C8.39498 4.67178 8.48501 4.51479 8.61084 4.38909L10.2938 2.70709C10.518 2.48291 10.7841 2.30509 11.077 2.18377C11.3699 2.06244 11.6838 2 12.0008 2C12.3179 2 12.6318 2.06244 12.9247 2.18377C13.2176 2.30509 13.4837 2.48291 13.7078 2.70709L15.3908 4.39009Z" stroke="#6F767E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      active: false,
      hasSubmenu: false
    },
    {
      name: 'Community',
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21" stroke="#6F767E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#6F767E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 21.0009V19.0009C21.9993 18.1146 21.7044 17.2536 21.1614 16.5532C20.6184 15.8527 19.8581 15.3524 19 15.1309" stroke="#6F767E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 3.13086C16.8604 3.35116 17.623 3.85156 18.1676 4.55317C18.7122 5.25478 19.0078 6.11769 19.0078 7.00586C19.0078 7.89403 18.7122 8.75694 18.1676 9.45855C17.623 10.1602 16.8604 10.6606 16 10.8809" stroke="#6F767E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
      active: false,
      hasSubmenu: false
    },
    {
      name: 'Openings',
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2V10L13 7L16 10V2" stroke="#6F767E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5ZM4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="#6F767E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
      active: false,
      hasSubmenu: false
    },
    {
      name: 'Coaching',
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.4208 10.9224C21.5998 10.8434 21.7517 10.7136 21.8577 10.5492C21.9637 10.3847 22.0191 10.1927 22.0171 9.99709C22.0151 9.80144 21.9557 9.61068 21.8463 9.44844C21.737 9.2862 21.5824 9.15961 21.4018 9.08436L12.8308 5.18036C12.5702 5.06151 12.2872 5 12.0008 5C11.7144 5 11.4313 5.06151 11.1708 5.18036L2.60077 9.08036C2.42274 9.15833 2.27129 9.28649 2.16494 9.44917C2.05859 9.61185 2.00195 9.802 2.00195 9.99636C2.00195 10.1907 2.05859 10.3809 2.16494 10.5435C2.27129 10.7062 2.42274 10.8344 2.60077 10.9124L11.1708 14.8204C11.4313 14.9392 11.7144 15.0007 12.0008 15.0007C12.2872 15.0007 12.5702 14.9392 12.8308 14.8204L21.4208 10.9224Z" stroke="#6F767E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 10V16" stroke="#6F767E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 12.5V16C6 16.7956 6.63214 17.5587 7.75736 18.1213C8.88258 18.6839 10.4087 19 12 19C13.5913 19 15.1174 18.6839 16.2426 18.1213C17.3679 17.5587 18 16.7956 18 16V12.5" stroke="#6F767E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
      active: false,
      hasSubmenu: false
    },
  ];

  return (
    <div className="w-[284px] bg-[#FCFCFC] border-r border-[#EAECF0] flex flex-col h-screen fixed left-0 top-0 z-50">
      {/* Chess Rocket Logo */}
      <div className="px-[31px] py-6 border-b border-[#E8ECEF] relative">
        <div className="flex items-center gap-2">
          <img src={ChessRocketLogo} alt="Chess Rocket Logo" className="w-[196px] h-6" />
          {/* Collapse button */}
          <svg
            className="w-6 h-6 absolute cursor-pointer"
            style={{ left: '238px', top: '24px' }}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 6.56V17.44C20 18.8538 18.8539 20 17.44 20H6.56C5.14615 20 4 18.8538 4 17.44L4 6.56C4 5.14611 5.14615 4 6.56 4L17.44 4C18.8539 4 20 5.14611 20 6.56Z" stroke="#7B7B7B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 16L8 8" stroke="#7B7B7B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 15L12 12L15 9" stroke="#7B7B7B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="px-6 pt-6 pb-4 border-b border-[#E8ECEF]">
        <div className="flex items-center gap-[14.77px] mb-4 h-[59.23px]">
          <div className="relative">
            <div className="relative w-[59.23px] h-[59.23px]">
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: 'linear-gradient(180deg, #CBDED5 0%, #A5D0BB 100%)' }}
              />
              <img
                src={avatarImage}
                alt="User Avatar"
                className="relative w-[59.23px] h-[59.23px] rounded-full object-cover"
              />
            </div>
            {/* Online status dot */}
            <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full border-[3px] border-white" style={{ backgroundColor: '#3FDD78' }}></div>
          </div>
          <div className="flex flex-col gap-[8.62px]">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[#0F0E11] text-[20.9231px] leading-5" style={{ fontFamily: 'Inter' }}>Kenny</span>
              <span className="text-base">🇺🇸</span>
            </div>
            <button className="flex items-center gap-1 transition-colors duration-200 text-[#000000] font-medium text-sm leading-[22px]" style={{ fontFamily: 'Manrope' }}>
              Edit Profile
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.66212 14.4563C7.90076 14.2702 8.11722 14.0537 8.55008 13.6209L14.097 8.07399C13.342 7.75978 12.4479 7.24365 11.6022 6.39801C10.7565 5.55224 10.2403 4.65794 9.92612 3.90293L4.37912 9.44992L4.37907 9.44997C3.94624 9.8828 3.7298 10.0992 3.54367 10.3379C3.3241 10.6194 3.13585 10.924 2.98226 11.2463C2.85205 11.5195 2.75526 11.8099 2.56167 12.3906L1.54084 15.4531C1.44557 15.7389 1.51995 16.054 1.73297 16.267C1.94599 16.48 2.26108 16.5544 2.54688 16.4592L5.60938 15.4383C6.19014 15.2447 6.48052 15.1479 6.75373 15.0177C7.07602 14.8641 7.38061 14.6759 7.66212 14.4563Z" fill="black"/>
                <path d="M15.6362 6.53479C16.7879 5.38301 16.7879 3.51561 15.6362 2.36383C14.4844 1.21206 12.617 1.21206 11.4652 2.36383L10.7999 3.02911C10.809 3.05662 10.8185 3.08451 10.8283 3.11277C11.0721 3.81562 11.5322 4.737 12.3977 5.60252C13.2632 6.46803 14.1846 6.92811 14.8875 7.17196C14.9156 7.18172 14.9434 7.19113 14.9708 7.2002L15.6362 6.53479Z" fill="black"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-3">
          {/* Current Level */}
          <div className="w-[228px] h-[45px] bg-[#FCFCFC] rounded-[14px] flex items-center justify-between px-[14px]" style={{ border: '1.5px solid rgba(123, 123, 123, 0.1)' }}>
            <span className="font-medium leading-[21px] text-[#727272]" style={{ fontFamily: 'Inter', fontSize: '14px' }}>
              Current Level
            </span>
            <div className="flex items-center gap-[2px]">
              <span className="font-semibold tracking-[0.0125em] text-[#101010]" style={{ fontFamily: 'Inter', fontSize: '14px', lineHeight: '100%', fontFeatureSettings: "'ss01' on" }}>
                12
              </span>
              <span className="text-base">🏆</span>
            </div>
          </div>

          {/* Total Puzzles */}
          <div className="w-[228px] h-[45px] bg-[#FCFCFC] rounded-[14px] flex items-center justify-between px-[14px]" style={{ border: '1.5px solid rgba(123, 123, 123, 0.1)' }}>
            <span className="font-medium leading-[21px] text-[#727272]" style={{ fontFamily: 'Inter', fontSize: '14px' }}>
              Total Puzzles
            </span>
            <div className="flex items-center gap-[2px]">
              <span className="font-semibold tracking-[0.0125em] text-[#101010] text-right" style={{ fontFamily: 'Inter', fontSize: '14px', lineHeight: '100%', fontFeatureSettings: "'ss01' on" }}>
                569
              </span>
              <span className="text-base">🧩</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col py-4 px-6 gap-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`w-[228px] h-[45px] flex items-center justify-between px-[14px] py-3 text-sm transition-all duration-200 ${
              item.active
                ? 'bg-[#EFEFEF] text-[#1A1D1F] font-semibold shadow-sm rounded-[48px]'
                : 'text-[#727272] hover:bg-gray-50 hover:text-[#101010] rounded-[14px]'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 flex items-center justify-center">
                {item.icon}
              </div>
              <span className="font-semibold text-sm leading-[21px]" style={{ fontFamily: 'Inter' }}>{item.name}</span>
            </div>
            {item.active ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_70_5031)">
                  <path d="M9 18L15 12L9 6" stroke="#1A1D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_70_5031">
                    <rect width="8" height="14" fill="white" transform="translate(8 5)"/>
                  </clipPath>
                </defs>
              </svg>
            ) : item.hasSubmenu && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#E8ECEF]">
        <p className="text-xs text-[#727272] text-center font-medium">
          Chess Puzzle Trainer
        </p>
        <p className="text-xs text-[#727272] text-center mt-1">
          v1.0.0
        </p>
      </div>
    </div>
  );
};

export default LeftSidebar;
