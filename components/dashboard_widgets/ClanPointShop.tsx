import React from 'react';
import { CLAN_POINT_SHOP_DATA } from '../../constants';

const ClanPointShop: React.FC = () => {
    return (
        <ul className="space-y-2">
            {CLAN_POINT_SHOP_DATA.map(item => (
                <li key={item.name} className="flex items-center justify-between bg-black/30 p-3 rounded-md border-2 border-gray-800">
                    <div className="flex items-center gap-3">
                        <img src={item.imageUrl} alt={item.name} className="w-8 h-8 object-contain" />
                        <span className="text-gray-300 text-sm">{item.name}</span>
                    </div>
                    <div className="text-sm font-bold text-[color:var(--color-gold)]">
                        {item.cost} pts
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default ClanPointShop;
