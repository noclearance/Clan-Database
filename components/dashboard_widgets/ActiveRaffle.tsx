import React from 'react';
import { ACTIVE_RAFFLE_DATA } from '../../constants';

const ActiveRaffle: React.FC = () => {
    const { itemName, itemImageUrl, entries, totalEntries } = ACTIVE_RAFFLE_DATA;
    const progress = (entries.length / totalEntries) * 100;

    return (
        <div className="flex flex-col items-center text-center">
            <img 
                src={itemImageUrl} 
                alt={itemName}
                className="w-20 h-20 object-contain mb-3"
            />
            <h4 className="text-base font-bold text-white mb-2">{itemName}</h4>
            
            <div className="w-full bg-black/40 rounded-full h-4 border-2 border-gray-800 my-1">
                <div 
                    className="bg-gradient-to-r from-yellow-600 to-[var(--color-gold)] h-full rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            
            <p className="text-sm font-bold text-[color:var(--color-gold)]">
                {entries.length} / {totalEntries} entries
            </p>
            <p className="text-xs text-gray-400 mt-2">
                Last entry by: <span className="font-semibold">{entries[entries.length - 1]}</span>
            </p>
        </div>
    );
};

export default ActiveRaffle;
