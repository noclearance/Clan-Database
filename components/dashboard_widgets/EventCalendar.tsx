import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';

const EventCalendar: React.FC = () => {
    const { events } = useContext(AppContext);

    return (
        <div className="space-y-3">
            {events.slice(0, 3).map(event => (
                <div key={event.id} className="bg-black/30 p-3 rounded-md border-l-4 border-[var(--color-blood-red)] hover:bg-black/50 transition-colors">
                    <p className="font-bold text-base text-[color:var(--color-gold)]">{event.name}</p>
                    <p className="text-xs text-gray-400">{event.time}</p>
                    <p className="text-xs text-gray-500 mt-1">Host: {event.host} | Attendees: {event.attendees.length}</p>
                </div>
            ))}
             {events.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No events scheduled.</p>
            )}
        </div>
    );
};

export default EventCalendar;
