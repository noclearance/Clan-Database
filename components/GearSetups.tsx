import React, { useState, useCallback } from 'react';
import { getGearSetups } from '../services/geminiService';
import { BossSetups, GearSetup, GearSlot } from '../types';
import { BOSS_LIST } from '../constants';
import Spinner from './Spinner';

const GEAR_SLOT_ORDER: GearSlot[] = ['head', 'cape', 'neck', 'ammo', 'weapon', 'body', 'shield', 'legs', 'hands', 'feet', 'ring', 'special'];

const GearTable: React.FC<{ title: string; setup: GearSetup }> = ({ title, setup }) => (
    <div className="bg-[var(--bg-card)] card-bevel p-4">
      <h3 className="text-xl font-header font-bold mb-4 text-center text-[color:var(--color-gold)]">{title}</h3>
      <ul className="space-y-2 text-sm font-sans">
        {GEAR_SLOT_ORDER.map(slot => (
          <li key={slot} className="flex justify-between items-center bg-black/30 p-2 rounded-md">
            <span className="capitalize font-semibold text-gray-300">{slot}</span>
            <span className="text-right text-gray-200">{setup[slot] || 'N/A'}</span>
          </li>
        ))}
      </ul>
    </div>
);

const GearSetups: React.FC = () => {
  const [selectedBoss, setSelectedBoss] = useState<string>('');
  const [setups, setSetups] = useState<BossSetups | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchSetups = useCallback(async () => {
    if (!selectedBoss) return;

    setIsLoading(true);
    setError(null);
    setSetups(null);

    try {
      const data = await getGearSetups(selectedBoss);
      setSetups(data);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedBoss]);

  return (
    <div className="max-w-6xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <select
          value={selectedBoss}
          onChange={(e) => setSelectedBoss(e.target.value)}
          className="flex-grow bg-gray-800 text-gray-200 border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-gold)] focus:border-[color:var(--color-gold)] transition-all text-sm"
        >
          <option value="">-- Select a Boss --</option>
          {BOSS_LIST.map(boss => (
            <option key={boss} value={boss}>{boss}</option>
          ))}
        </select>
        <button
          onClick={handleFetchSetups}
          disabled={isLoading || !selectedBoss}
          className="bg-[color:var(--color-gold)] hover:bg-yellow-500 disabled:bg-yellow-800 disabled:cursor-not-allowed text-black font-bold py-2 px-6 rounded-lg transition-colors flex items-center justify-center text-sm"
        >
          {isLoading ? <Spinner /> : <><i className="fa-solid fa-shield-halved mr-2"></i> Get Setups</>}
        </button>
      </div>

      {error && <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center mb-6">{error}</div>}
      
      {isLoading && <div className="text-center p-8"><Spinner size="lg" /></div>}

      {setups && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GearTable title="Budget Setup" setup={setups.budget} />
          <GearTable title="Mid-Tier Setup" setup={setups.midTier} />
          <GearTable title="Max Gear" setup={setups.max} />
        </div>
      )}
    </div>
  );
};

export default GearSetups;