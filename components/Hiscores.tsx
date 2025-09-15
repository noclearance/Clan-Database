import React, { useState, useCallback, useMemo } from 'react';
import { getHiscores } from '../services/geminiService';
import { HiscoresData, Skill } from '../types';
import Spinner from './Spinner';
import { SKILL_CATEGORIES, CATEGORY_ORDER } from '../constants';

const SkillRow: React.FC<{ skill: Skill }> = ({ skill }) => (
    <tr className="border-t border-gray-700 hover:bg-gray-700/50">
        <td className="p-3 font-medium flex items-center">
            <img 
                src={`https://oldschool.runescape.wiki/images/${skill.skill}_icon.png`} 
                alt={skill.skill} 
                className="w-5 h-5 mr-3"
                onError={(e) => { e.currentTarget.src = 'https://oldschool.runescape.wiki/images/Skills_icon.png'; }}
            />
            {skill.skill}
        </td>
        <td className="p-3 text-right text-gray-400">{skill.rank > 0 ? skill.rank.toLocaleString() : 'Unranked'}</td>
        <td className="p-3 text-right font-bold text-lg text-[color:var(--color-gold)]">{skill.level}</td>
        <td className="p-3 text-right text-gray-300">{skill.xp > 0 ? skill.xp.toLocaleString() : 'Unranked'}</td>
    </tr>
);

const Hiscores: React.FC = () => {
  const [rsn, setRsn] = useState<string>('');
  const [skillFilter, setSkillFilter] = useState<string>('');
  const [stats, setStats] = useState<HiscoresData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!rsn.trim()) return;

    setIsLoading(true);
    setError(null);
    setStats(null);
    setSkillFilter('');

    try {
      const data = await getHiscores(rsn);
      if (data.length === 0) {
        setError(`Player "${rsn}" not found or has no stats.`);
      } else {
        setStats(data);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [rsn]);
  
  const { overallStat, groupedSkills, filteredCount } = useMemo(() => {
    if (!stats) {
      return { overallStat: null, groupedSkills: {}, filteredCount: 0 };
    }

    const filtered = stats.filter(skill =>
      skill.skill.toLowerCase().includes(skillFilter.toLowerCase())
    );

    const overall = filtered.find(s => s.skill === 'Overall');

    const grouped = filtered
      .filter(skill => skill.skill !== 'Overall')
      .reduce((acc, skill) => {
        const category = SKILL_CATEGORIES[skill.skill] || 'Other';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(skill);
        return acc;
      }, {} as Record<string, Skill[]>);

    return { overallStat: overall, groupedSkills: grouped, filteredCount: filtered.length };
  }, [stats, skillFilter]);


  return (
    <div className="max-w-4xl mx-auto font-sans">
      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <input
          type="text"
          value={rsn}
          onChange={(e) => setRsn(e.target.value)}
          placeholder="Enter RuneScape Name (RSN)"
          className="flex-grow bg-gray-800 text-gray-200 placeholder-gray-500 border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-gold)] focus:border-[color:var(--color-gold)] transition-all text-sm"
          aria-label="RuneScape Name Input"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[color:var(--color-gold)] hover:bg-yellow-500 disabled:bg-yellow-800 disabled:cursor-not-allowed text-black font-bold py-2 px-6 rounded-lg transition-colors flex items-center justify-center text-sm"
        >
          {isLoading ? <Spinner /> : <><i className="fa-solid fa-magnifying-glass mr-2"></i> Search</>}
        </button>
      </form>

      {error && <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center">{error}</div>}
      
      {stats && (
        <>
            <div className="my-4">
                <input
                  type="text"
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                  placeholder="Filter skills..."
                  className="w-full bg-gray-800 text-gray-200 placeholder-gray-500 border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-gold)] focus:border-[color:var(--color-gold)] transition-all text-sm"
                  aria-label="Filter skills input"
                />
            </div>
            <div className="card-bevel overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-black/40">
                    <tr>
                        <th className="p-4 font-bold uppercase text-gray-400 text-xs tracking-wider">Skill</th>
                        <th className="p-4 font-bold uppercase text-gray-400 text-xs tracking-wider text-right">Rank</th>
                        <th className="p-4 font-bold uppercase text-gray-400 text-xs tracking-wider text-right">Level</th>
                        <th className="p-4 font-bold uppercase text-gray-400 text-xs tracking-wider text-right">XP</th>
                    </tr>
                    </thead>
                    {overallStat && (
                        <tbody>
                            <SkillRow skill={overallStat} />
                        </tbody>
                    )}
                     {CATEGORY_ORDER.map(category =>
                        groupedSkills[category]?.length > 0 && (
                            <tbody key={category}>
                            <tr className="bg-black/30 sticky top-0">
                                <th colSpan={4} className="p-3 font-header text-sm text-[color:var(--color-gold)] tracking-wider">
                                {category}
                                </th>
                            </tr>
                            {groupedSkills[category].map(skill => (
                                <SkillRow key={skill.skill} skill={skill} />
                            ))}
                            </tbody>
                        )
                    )}
                </table>
                 {filteredCount === 0 && (
                    <div className="text-center text-gray-400 p-6">
                        No skills match your filter.
                    </div>
                )}
            </div>
        </>
      )}
    </div>
  );
};

export default Hiscores;