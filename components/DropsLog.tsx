import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import type { Drop } from '../types';
import DropFormModal from './DropFormModal';

const DropCard: React.FC<{ drop: Drop }> = ({ drop }) => (
    <div className="bg-[var(--bg-card)] card-bevel p-4 flex flex-col items-center text-center">
        <div className="w-24 h-24 mb-4 flex items-center justify-center">
            <img src={drop.imageUrl} alt={drop.itemName} className="max-w-full max-h-full object-contain" />
        </div>
        <h3 className="text-base font-bold text-[color:var(--color-gold)] leading-tight font-sans" style={{textShadow: '1px 1px 2px #000'}}>{drop.itemName}</h3>
        <p className="text-gray-300 text-sm mt-2 font-sans">by <span className="font-semibold">{drop.playerName}</span></p>
        <p className="text-xs text-gray-500 mt-1 font-sans">From: {drop.boss}</p>
    </div>
);

const DropsLog: React.FC = () => {
  const { drops } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-header font-bold text-white">Rare Drop Log</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[color:var(--color-gold)] hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2 text-sm font-sans"
        >
          <i className="fa-solid fa-gem"></i> Log a Drop
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {drops.map((drop) => (
          <DropCard key={drop.id} drop={drop} />
        ))}
        {drops.length === 0 && (
             <div className="col-span-full text-center text-gray-400 py-10 font-sans">
                <p className="text-lg">No drops have been logged yet.</p>
                <p>Be the first to show off your loot!</p>
            </div>
        )}
      </div>

      <DropFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default DropsLog;