import React, { useState, useEffect, useMemo } from 'react';
import { getGroupDetails } from '../services/womService';
import { WOM_CLAN_ID } from '../constants';
import { WOMMembership } from '../types';
import Spinner from './Spinner';

type SortKey = 'displayName' | 'role' | 'ehp' | 'ehb';
type SortOrder = 'asc' | 'desc';

const roleOrder: { [key: string]: number } = {
    owner: 1, leader: 2, captain: 3, lieutenant: 4, sergeant: 5, corporal: 6,
    recruit: 7, 'member': 8
};

const SortableHeader: React.FC<{
    title: string;
    sortKey: SortKey;
    currentSort: SortKey;
    sortOrder: SortOrder;
    setSort: (key: SortKey) => void;
}> = ({ title, sortKey, currentSort, sortOrder, setSort }) => {
    const isActive = currentSort === sortKey;
    const icon = isActive ? (sortOrder === 'asc' ? 'fa-sort-up' : 'fa-sort-down') : 'fa-sort';

    return (
        <th 
            className="p-4 font-bold uppercase text-gray-400 text-xs tracking-wider cursor-pointer hover:text-white"
            onClick={() => setSort(sortKey)}
        >
            {title} <i className={`fa-solid ${icon} ml-1`}></i>
        </th>
    );
};


const Members: React.FC = () => {
    const [members, setMembers] = useState<WOMMembership[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sortKey, setSortKey] = useState<SortKey>('role');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const data = await getGroupDetails(WOM_CLAN_ID);
                setMembers(data.memberships);
            } catch (err: any) {
                setError(err.message || "Failed to fetch clan members.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchMembers();
    }, []);
    
    const handleSort = (key: SortKey) => {
        if (key === sortKey) {
            setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    const sortedMembers = useMemo(() => {
        return [...members].sort((a, b) => {
            let comparison = 0;
            
            switch (sortKey) {
                case 'displayName':
                    comparison = a.player.displayName.localeCompare(b.player.displayName);
                    break;
                case 'role':
                    comparison = (roleOrder[a.role.toLowerCase()] || 99) - (roleOrder[b.role.toLowerCase()] || 99);
                    break;
                case 'ehp':
                    comparison = a.player.ehp - b.player.ehp;
                    break;
                case 'ehb':
                    comparison = a.player.ehb - b.player.ehb;
                    break;
            }
    
            return sortOrder === 'asc' ? comparison : -comparison;
        });
    }, [members, sortKey, sortOrder]);


    if (isLoading) return <div className="flex justify-center items-center h-full"><Spinner size="lg" /></div>;
    if (error) return <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center">{error}</div>;

    return (
        <div className="card-bevel overflow-hidden">
            <table className="w-full text-left text-sm font-sans">
                <thead className="bg-black/40">
                    <tr>
                        <SortableHeader title="Name" sortKey="displayName" currentSort={sortKey} sortOrder={sortOrder} setSort={handleSort} />
                        <SortableHeader title="Role" sortKey="role" currentSort={sortKey} sortOrder={sortOrder} setSort={handleSort} />
                        <SortableHeader title="EHP" sortKey="ehp" currentSort={sortKey} sortOrder={sortOrder} setSort={handleSort} />
                        <SortableHeader title="EHB" sortKey="ehb" currentSort={sortKey} sortOrder={sortOrder} setSort={handleSort} />
                    </tr>
                </thead>
                <tbody>
                    {sortedMembers.map(({ player, role }) => (
                        <tr key={player.id} className="border-t border-gray-700 hover:bg-gray-700/50">
                            <td className="p-3 font-medium text-white">{player.displayName}</td>
                            <td className="p-3 capitalize text-gray-300">{role}</td>
                            <td className="p-3 text-[color:var(--color-gold)] font-bold">{player.ehp.toFixed(2)}</td>
                            <td className="p-3 text-[color:var(--color-dragonfire)] font-bold">{player.ehb.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Members;