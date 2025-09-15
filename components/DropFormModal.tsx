import React, { useState, useContext, FormEvent } from 'react';
import { AppContext } from '../contexts/AppContext';
import { getDropImage } from '../services/geminiService';
import Spinner from './Spinner';

interface DropFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DropFormModal: React.FC<DropFormModalProps> = ({ isOpen, onClose }) => {
    const { addDrop } = useContext(AppContext);
    const [playerName, setPlayerName] = useState('');
    const [itemName, setItemName] = useState('');
    const [boss, setBoss] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!playerName || !itemName || !boss) return;

        setIsLoading(true);
        setError('');
        
        try {
            const imageUrl = await getDropImage(itemName);
            addDrop({ playerName, itemName, boss }, imageUrl);
            
            onClose();
            setPlayerName('');
            setItemName('');
            setBoss('');
        } catch (err: any) {
            setError('Failed to log drop. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 font-sans" onClick={onClose}>
            <div className="bg-[var(--bg-card)] border border-gray-700 rounded-lg shadow-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-header font-bold mb-4 text-white">Log a New Drop</h2>
                {error && <p className="text-red-400 bg-red-900/50 p-3 rounded-md mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    <input type="text" placeholder="Player Name" value={playerName} onChange={e => setPlayerName(e.target.value)} required className="w-full bg-gray-800 text-gray-200 p-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-gold)]" />
                    <input type="text" placeholder="Item Name (e.g., Twisted Bow)" value={itemName} onChange={e => setItemName(e.target.value)} required className="w-full bg-gray-800 text-gray-200 p-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-gold)]" />
                    <input type="text" placeholder="Boss/Source (e.g., Chambers of Xeric)" value={boss} onChange={e => setBoss(e.target.value)} required className="w-full bg-gray-800 text-gray-200 p-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-gold)]" />
                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition-colors">Cancel</button>
                        <button type="submit" disabled={isLoading} className="bg-[color:var(--color-gold)] hover:bg-yellow-500 disabled:bg-yellow-800 text-black font-bold py-2 px-4 rounded-md transition-colors w-32 flex items-center justify-center">
                            {isLoading ? <Spinner size="sm" /> : 'Log Drop'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DropFormModal;