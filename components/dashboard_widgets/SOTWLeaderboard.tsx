import React, { useState, useEffect } from 'react';
import { getGroupCompetitions, getCompetitionDetails } from '../../services/womService';
import { WOM_CLAN_ID } from '../../constants';
import { WOMCompetitionDetails, WOMParticipant } from '../../types';
import Spinner from '../Spinner';

const formatMetric = (metric: string): string => {
    return metric.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

const getMetricIcon = (metric: string): string => {
    if (metric === 'ehp') return 'https://oldschool.runescape.wiki/images/Ehp_icon.png';
    if (metric === 'ehb') return 'https://oldschool.runescape.wiki/images/Ehb_icon.png';
    // Fallback for skills/bosses
    const formattedMetric = formatMetric(metric).replace(' ','_');
    return `https://oldschool.runescape.wiki/images/skill_icons/${formatMetric(metric)}-icon.png`;
}

const timeRemaining = (endDate: string): string => {
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();
    const distance = end - now;

    if (distance < 0) {
        return "Competition ended";
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${days}d ${hours}h ${minutes}m remaining`;
};


// --- Player Card Row ---
const PlayerCard: React.FC<{ participant: WOMParticipant; maxGained: number; metricIcon: string }> = ({ participant, maxGained, metricIcon }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setProgress((participant.progress.gained / maxGained) * 100);
        }, 150);
        return () => clearTimeout(timer);
    }, [participant.progress.gained, maxGained]);

    const rankClasses: { [key: number]: string } = {
        1: 'rank-1', 2: 'rank-2', 3: 'rank-3'
    };
    const rankColors: { [key: number]: string } = {
        1: 'text-[var(--color-gold)]', 2: 'text-[var(--color-silver)]', 3: 'text-[var(--color-bronze)]'
    };

    return (
        <li className={`player-card p-3 ${rankClasses[participant.rank] || ''}`}>
            <div className="flex items-center gap-4">
                {/* Player Info */}
                <div className="flex-shrink-0 w-48 flex items-center">
                    <span className={`font-header w-8 text-center text-lg ${rankColors[participant.rank] || 'text-gray-400'}`}>
                        {participant.rank}
                    </span>
                    <span className="font-semibold text-white">{participant.player.displayName}</span>
                    {participant.rank === 1 && (
                        <span title="1st Place" className="ml-2 text-yellow-400 text-lg animate-sparkle">👑</span>
                    )}
                </div>

                {/* Progress Bar */}
                <div className="relative flex-grow h-8 progress-bar-glossy">
                    <div
                        className="h-full flex items-center justify-end rounded-sm transition-all duration-1000 ease-out"
                        style={{ width: `${progress}%` }}
                    >
                        <span className="text-white font-bold text-xs px-2 whitespace-nowrap" style={{ textShadow: '1px 1px 2px #000' }}>
                            {participant.progress.gained.toLocaleString()}
                        </span>
                    </div>
                    {/* Floating XP Icon */}
                    <img
                        src={metricIcon}
                        alt="Metric Icon"
                        className="xp-icon"
                        style={{
                            left: `${progress}%`,
                            opacity: progress > 1 ? 1 : 0,
                        }}
                    />
                </div>
            </div>
        </li>
    );
};


// --- Main Leaderboard Component ---
const SOTWLeaderboard: React.FC = () => {
    const [competition, setCompetition] = useState<WOMCompetitionDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCompetition = async () => {
            try {
                const competitions = await getGroupCompetitions(WOM_CLAN_ID);
                if (!competitions || competitions.length === 0) {
                    throw new Error("No competitions found for this clan.");
                }

                const now = new Date();
                const sortedCompetitions = competitions.sort((a, b) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime());
                const currentCompetition = sortedCompetitions.find(c => new Date(c.startsAt) <= now) || sortedCompetitions[0];

                if (!currentCompetition) {
                     throw new Error("Could not determine the current competition.");
                }

                const details = await getCompetitionDetails(currentCompetition.id);
                setCompetition(details);

            } catch (err: any) {
                setError(err.message || 'Failed to load competition data.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCompetition();
    }, []);

    if (isLoading) {
        return (
             <div className="bg-[var(--bg-card)] card-bevel p-6 flex justify-center items-center h-64">
                <Spinner size="lg" />
            </div>
        )
    }

    if (error) {
         return (
             <div className="bg-red-900/50 border-2 border-red-700 card-bevel p-6 flex flex-col justify-center items-center text-center h-64">
                <i className="fa-solid fa-triangle-exclamation text-3xl text-red-400 mb-3"></i>
                <h3 className="font-header text-lg text-white mb-1">Error Loading Competition</h3>
                <p className="text-red-300 text-sm">{error}</p>
            </div>
        )
    }

    if (!competition) {
        return null; // Should be handled by error state, but as a fallback
    }
    
    // The API sometimes returns participants in `participations`
    const participants = (competition.participants || competition.participations || []).filter(p => p.progress.gained > 0);
    const maxGained = Math.max(...participants.map(p => p.progress.gained), 1);
    const metricIcon = getMetricIcon(competition.metric);

    return (
        <div className="bg-[var(--bg-card)] card-bevel p-4 sm:p-6">
            <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-3">
                    <img src={metricIcon} alt={competition.metric} className="w-8 h-8" onError={(e) => { e.currentTarget.src = 'https://oldschool.runescape.wiki/images/Skills_icon.png'; }}/>
                    <div>
                        <h2 className="font-header text-lg sm:text-xl text-white">{competition.title}</h2>
                        <p className="text-sm text-gray-400 -mt-1">{formatMetric(competition.metric)}</p>
                    </div>
                </div>
                <div className="text-sm text-gray-400 bg-black/40 px-3 py-1 rounded-md">
                    {timeRemaining(competition.endsAt)}
                </div>
            </header>
            
            {participants.length > 0 ? (
                <ul className="space-y-3 font-sans">
                    {participants.slice(0, 10).map((participant) => (
                        <PlayerCard key={participant.player.id} participant={participant} maxGained={maxGained} metricIcon={metricIcon} />
                    ))}
                </ul>
            ) : (
                <div className="text-center py-8 text-gray-500">
                    <p>No participants have made progress yet.</p>
                </div>
            )}
        </div>
    );
};

export default SOTWLeaderboard;