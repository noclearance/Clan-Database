import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { FeedItem, FeedEventItem, FeedDropItem } from '../types';

const timeSince = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
}

const EventFeedCard: React.FC<{ item: FeedEventItem }> = ({ item }) => (
    <div className="flex gap-4 items-start">
        <div className="mt-1">
            <i className="fa-solid fa-calendar-days text-indigo-400 text-xl"></i>
        </div>
        <div>
            <p className="text-gray-300">
                <span className="font-bold text-white">{item.event.host}</span> created a new event: <span className="font-bold text-indigo-400">{item.event.name}</span>
            </p>
            <p className="text-gray-500 text-sm">{timeSince(item.timestamp)}</p>
        </div>
    </div>
);

const DropFeedCard: React.FC<{ item: FeedDropItem }> = ({ item }) => (
    <div className="flex gap-4 items-start">
         <div className="mt-1">
            <img src={item.drop.imageUrl} alt={item.drop.itemName} className="w-8 h-8 object-contain" />
        </div>
        <div>
            <p className="text-gray-300">
                <span className="font-bold text-white">{item.drop.playerName}</span> received a <span className="font-bold text-yellow-400">{item.drop.itemName}</span> drop from {item.drop.boss}!
            </p>
            <p className="text-gray-500 text-sm">{timeSince(item.timestamp)}</p>
        </div>
    </div>
);


const ClanFeed: React.FC = () => {
    const { feedItems } = useContext(AppContext);

    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6 border-b-2 border-gray-700 pb-3">Clan Activity Feed</h2>
            <div className="space-y-6">
                {feedItems.map(item => {
                    if (item.type === 'event') {
                        return <EventFeedCard key={item.id} item={item} />;
                    }
                    if (item.type === 'drop') {
                        return <DropFeedCard key={item.id} item={item} />;
                    }
                    return null;
                })}
                {feedItems.length === 0 && (
                    <div className="text-center text-gray-400 py-10">
                        <p className="text-lg">The feed is quiet...</p>
                        <p>Create an event or log a drop to get things started!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClanFeed;