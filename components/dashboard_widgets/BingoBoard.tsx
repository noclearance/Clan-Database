import React from 'react';
import { BINGO_BOARD_DATA } from '../../constants';
import type { BingoTile } from '../../types';

const Tile: React.FC<{ tile: BingoTile }> = ({ tile }) => {
    const isCompleted = !!tile.completedBy;
    return (
        <div 
            className="relative aspect-square stone-tile rounded-md flex items-center justify-center p-2 group cursor-pointer"
            title={isCompleted ? `${tile.task} (Completed by ${tile.completedBy})` : tile.task}
        >
            <img src={tile.imageUrl} alt={tile.task} className="w-10 h-10 object-contain group-hover:scale-110 transition-transform" />
            
            {isCompleted && (
                <>
                    <div className="absolute inset-0 rounded-md bingo-completed-glow"></div>
                     <div className="absolute inset-0 flex items-center justify-center text-5xl">
                        <i className="fa-solid fa-check bingo-completed-check"></i>
                    </div>
                </>
            )}
        </div>
    );
};


const BingoBoard: React.FC = () => {
    return (
        <div className="bg-[var(--bg-card)] card-bevel p-4 sm:p-6">
            <header className="mb-4 text-center sm:text-left">
                 <h2 className="font-header text-lg sm:text-xl text-white">Clan Bingo</h2>
            </header>
            <div className="grid grid-cols-5 gap-2">
                {BINGO_BOARD_DATA.map(tile => <Tile key={tile.id} tile={tile} />)}
            </div>
        </div>
    );
};

export default BingoBoard;
