import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import type { ClanEvent } from '../types';
import EventFormModal from './EventFormModal';

const EventCard: React.FC<{ event: ClanEvent }> = ({ event }) => {
    const { currentUser, toggleEventSignup, setEventReminder } = useContext(AppContext);
    const isSignedUp = event.attendees.includes(currentUser);

    const handleReminderToggle = () => {
        if (event.reminderMinutes) {
            // Cancel the existing reminder
            setEventReminder(event.id, undefined);
        } else {
            // Set a default 15-minute reminder
            setEventReminder(event.id, 15);
        }
    };

    return (
        <div className="bg-[var(--bg-card)] card-bevel p-5 flex flex-col">
            <div className="flex-grow">
                <h3 className="text-xl font-header font-bold text-[color:var(--color-gold)] mb-2">{event.name}</h3>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed font-sans">{event.description}</p>
            </div>
            <div className="text-sm text-gray-200 border-t border-gray-700 pt-3 mt-3 space-y-2 font-sans">
                <div className="flex justify-between items-center">
                    <p className="flex items-center">
                        <i className="fa-solid fa-clock w-5 mr-2 text-gray-500"></i>{event.time}
                    </p>
                    <div className="tooltip-container">
                        <button 
                            onClick={handleReminderToggle}
                            className={`px-2 py-1 rounded-md transition-colors ${event.reminderMinutes ? 'hover:bg-yellow-500/20' : 'hover:bg-gray-600/50'}`}
                            aria-label={event.reminderMinutes ? 'Cancel Reminder' : 'Set Reminder'}
                        >
                            <i className={`fa-solid fa-bell text-lg ${event.reminderMinutes ? 'text-[color:var(--color-gold)] animate-shimmer' : 'text-gray-600'}`}></i>
                        </button>
                         <div className="tooltip-content absolute bottom-full mb-2 -ml-28 w-56 bg-gray-900 text-white text-xs rounded py-1 px-2 text-center transform -translate-x-1/2 left-1/2">
                            {event.reminderMinutes ? `Reminder set for ${event.reminderMinutes} min before. Click to cancel.` : 'Click to set a 15 min reminder.'}
                        </div>
                    </div>
                </div>
                <p className="flex items-center"><i className="fa-solid fa-user-shield w-5 mr-2 text-gray-500"></i>Host: <span className="font-semibold ml-1">{event.host}</span></p>
                <div className="flex items-start">
                    <i className="fa-solid fa-users w-5 mr-2 mt-1 text-gray-500"></i>
                    <div>
                        <p className="font-semibold">{event.attendees.length} members attending</p>
                        <p className="text-xs text-gray-400 break-words">{event.attendees.slice(0, 5).join(', ')}{event.attendees.length > 5 ? '...' : ''}</p>
                    </div>
                </div>
            </div>
            <button 
                onClick={() => toggleEventSignup(event.id)}
                className={`mt-4 font-bold py-2 px-4 rounded-lg w-full transition-colors text-sm uppercase tracking-wider font-sans ${
                    isSignedUp
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-[color:var(--color-green)] hover:bg-green-600 text-white'
                }`}
            >
                {isSignedUp ? 'Leave Event' : 'Sign Up'}
            </button>
        </div>
    );
};


const Events: React.FC = () => {
  const { events } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-header font-bold text-white">Clan Events</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[color:var(--color-gold)] hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2 text-sm font-sans"
        >
          <i className="fa-solid fa-plus-circle"></i> Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
        {events.length === 0 && (
            <div className="col-span-full text-center text-gray-400 py-10 font-sans">
                <p className="text-lg">No events scheduled yet.</p>
                <p>Why not create one?</p>
            </div>
        )}
      </div>
      
      <EventFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Events;