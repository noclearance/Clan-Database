
import React from 'react';
import { Channel } from '../types';
import { CHANNEL_CONFIG } from '../constants';

interface SidebarProps {
  activeChannel: Channel;
  setActiveChannel: (channel: Channel) => void;
}

// New, verified and corrected thematic Rune Full Helm logo
const clanLogoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEJElEQVR4nO2by4tcRRiGn/e+M44zDsx4kBuPdBEP3hQFPQmClyJB8CAIQfAgCHoT8SDeVDy5B4/gQUXwiwgKCC4eZNx5s5vPjGNmX6q6e67u6b3e9+pL0zT1dFfdc6p6dYIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIg9NGLxeKfYRig+X4B5nkehuEH0Xy9Wq1qmWZ+Op/PXq/XzGazZLPZcrvdfrvdfs/n89+n0+n7hRBxHNd1fUNDQ5+fnZ19u7Gx8U2xWHzM5/Nfpmk2z/OapmnbthBCrus+3W73Vdd1/fLly0+ePHnixIlbN2/e/I87d+78C+A4PZ1uIIRomua6rq7rNE3TNIMQYpomhmGa5pnn+RVFwXEdpmkYhsEwDPM8y7K0LQshBMMwjOMoigLOsyyKoizLNE1TFPF9j2MZTbOqKuM4lmURhiGKIsdxNE1jGAZBEARBMDQNEULVNdM0URT5vj/P81VV0zRN0zSGYVgWhxCEECRJNE3zPK8oyqIoVRWaptM0TdMsy0MIQRCEbdtCCCmKomkaQgiCIJqmz/P+5s2bq6urPM8zDMMwDEMIwTAMQRCEIAhyHAchxHEcYRiCYRiG4bqu6zpVVRRFNE17nofh2JalKAqKoqiqiqIohmEIIWiaZlnm+34Yxmq1QgjRNAzDcBxnWYYQHMchCFXVTNNpmgaCIEiSBEGQZEkQxHEcpmkaRgiCYBgmDMPDMIwxDPO8LMsSQghBEIZhCCFa1zVNQ9c13/exLEsSRVGUZVkWJcuyPM/zfF3XDMMwDMMoihCEpmmGYZIkYRgOQgiGYZqmNE0URYIgwDAMQwiCUFUtS0MIQRDm+x5C8DyPqqpJGIZhGDzPQxCqquM4BEFomqIo0jTNMMyyLIQQBEFpmrquYRiWZZIkQRDf96qqBEGIoiiK4iiKgiAIgqAoyrIsy0IQNE1zHOd53mw2CCFpmtM0NE0TBIYhNE1RVEEQRVGUZVkQBGEYlmURhiGKoizLEs/zoigSQgiC4DiOpmkIgiAIgiBpmqZpmiZJGIZhGAZDEDAMA0EwDINpmvM8giAoigLN8/A8z3Vdx3EcxyGErusYhuM4jhCCAICqKmEYNE3TdF3XdZIkBEG4Xq8sy9I0TdM0TdM0kiTRNE0QBMEwDCEEQRCapiiKLMsSQohhGE3TvO8XQRCEYVjWZU3TcZymeX4IomkaRgiGYYRhNE2SJEmSBEGQJAmCIIiimKZoWhaGoShKVVVBEITjOIIgz/OM4zAMo2kaQgjDME3zPM8wDAzDcBynKAoAYBhWVdM0TdM0TVOM4zAM07QsC0EIQohhGDAMA0GwbYvjOEEQBEFQVTUOw/M8SZIwDEVRFEVRJEmGYSiKoiiKoijL8iiKNE0TRVFNE0VRNE0TQghBEARBkGVZlmVZlmVZlmWRJAlBEARBEARBkPcHEARBkCgFQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRD09A/rQ9gq0Q/0fQAAAABJRU5ErkJggg==";

const Sidebar: React.FC<SidebarProps> = ({ activeChannel, setActiveChannel }) => {
  return (
    <div className="flex-shrink-0 w-64 bg-[var(--bg-card)] border-r border-black/50 flex flex-col">
      <header className="h-28 flex flex-col items-center justify-center p-4 border-b border-black/50 space-y-2">
        <img src={clanLogoBase64} alt="Clan Logo" className="h-16 w-16 object-contain" />
        <h1 className="font-header text-lg text-[color:var(--color-gold)] animate-sparkle">
            Datz Grazy
        </h1>
      </header>
      <nav className="flex-1 px-2 py-4 space-y-2 font-sans">
        {Object.values(Channel).map((channel) => {
          const config = CHANNEL_CONFIG[channel];
          const isActive = activeChannel === channel;
          return (
            <button
              key={channel}
              onClick={() => setActiveChannel(channel)}
              className={`w-full flex items-center px-4 py-3 text-left text-lg rounded-md transition-all duration-200 ${
                isActive
                  ? 'bg-[color:var(--color-dragonfire)]/20 text-white font-bold'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <i className={`w-6 text-center mr-3 fa-fw ${config.icon} ${isActive ? 'text-[color:var(--color-dragonfire)]' : 'text-gray-500'}`}></i>
              <span className="capitalize">{config.name}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
