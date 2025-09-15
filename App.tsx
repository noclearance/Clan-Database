import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Events from './components/Events';
import Hiscores from './components/Hiscores';
import DropsLog from './components/DropsLog';
import GearSetups from './components/GearSetups';
import Members from './components/Members';
import { Channel } from './types';
import { CHANNEL_CONFIG } from './constants';
import { AppProvider } from './contexts/AppContext';

const FloatingSparks: React.FC = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
    {Array.from({ length: 25 }).map((_, i) => {
      const size = Math.random() * 3 + 1;
      return (
        <div 
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${100 + Math.random() * 20}%`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundImage: `radial-gradient(circle, var(--color-gold) 20%, #FFD70000 80%)`,
            boxShadow: `0 0 ${size * 2}px var(--color-gold), 0 0 ${size * 4}px #ffb70033`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${Math.random() * 15 + 10}s`,
            opacity: Math.random() * 0.6 + 0.3
          }}
        />
      );
    })}
  </div>
);


const App: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState<Channel>(Channel.Dashboard);

  const renderContent = () => {
    switch (activeChannel) {
      case Channel.Dashboard:
        return <Dashboard />;
      case Channel.Members:
        return <Members />;
      case Channel.Events:
        return <Events />;
      case Channel.Hiscores:
        return <Hiscores />;
      case Channel.DropsLog:
        return <DropsLog />;
      case Channel.GearSetups:
        return <GearSetups />;
      default:
        return <Dashboard />;
    }
  };

  const currentChannelConfig = CHANNEL_CONFIG[activeChannel];

  return (
    <AppProvider>
      <div className="relative flex h-screen font-sans text-gray-200">
        <FloatingSparks />
        <div className="relative z-10 flex h-screen w-full">
            <Sidebar activeChannel={activeChannel} setActiveChannel={setActiveChannel} />
            <div className="flex-1 flex flex-col bg-transparent">
              <Header 
                channelName={currentChannelConfig.name} 
                description={currentChannelConfig.description}
              />
              <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                {renderContent()}
              </main>
            </div>
        </div>
      </div>
    </AppProvider>
  );
};

export default App;