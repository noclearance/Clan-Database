import React from 'react';

interface HeaderProps {
  channelName: string;
  description: string;
}

const Header: React.FC<HeaderProps> = ({ channelName, description }) => {
  return (
    <header className="flex-shrink-0 flex items-center h-16 px-6 bg-black/60 border-b border-black/50 shadow-lg backdrop-blur-sm">
      <i className="fa-solid fa-hashtag text-2xl text-gray-600"></i>
      <div className="ml-3">
        <h2 className="text-xl font-header font-bold text-white capitalize">{channelName}</h2>
        <p className="text-sm text-gray-400 -mt-1 font-sans">{description}</p>
      </div>
    </header>
  );
};

export default Header;
