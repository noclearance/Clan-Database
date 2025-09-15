import React from 'react';
import { CLAN_SPOTLIGHT_DATA } from '../../constants';

const ClanSpotlight: React.FC = () => {
    return (
        <div className="flex flex-col items-center text-center">
            <img 
                src={CLAN_SPOTLIGHT_DATA.imageUrl} 
                alt={CLAN_SPOTLIGHT_DATA.achievement}
                className="w-24 h-24 object-contain mb-3"
            />
            <h4 className="text-lg font-bold text-white mb-1">{CLAN_SPOTLIGHT_DATA.title}</h4>
            <p className="text-sm text-gray-300">
                <span className="font-bold text-[color:var(--color-gold)]">{CLAN_SPOTLIGHT_DATA.playerName}</span>
            </p>
             <p className="text-xs text-gray-400 mt-1 leading-relaxed">{CLAN_SPOTLIGHT_DATA.achievement}</p>
        </div>
    );
};

export default ClanSpotlight;
