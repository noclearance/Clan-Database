import React, { useState, useContext, FormEvent } from 'react';
import { AppContext } from '../contexts/AppContext';
import Spinner from './Spinner';

interface EventFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const EventFormModal: React.FC<EventFormModalProps> = ({ isOpen, onClose }) => {
    const { addEvent } = useContext(AppContext);
    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [host, setHost] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isReminderEnabled, setIsReminderEnabled] = useState(false);
    const [reminderMinutes, setReminderMinutes] = useState(15);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!eventName || !description || !eventDate || !host) return;

        setIsLoading(true);
        // Simulate network delay
        await new Promise(res => setTimeout(res, 300));

        addEvent({
            name: eventName,
            description,
            eventDate,
            host,
            reminderMinutes: isReminderEnabled ? reminderMinutes : undefined,
        });
        
        setIsLoading(false);
        onClose();
        // Reset form state
        setEventName('');
        setDescription('');
        setEventDate('');
        setHost('');
        setIsReminderEnabled(false);
        setReminderMinutes(15);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 font-sans" onClick={onClose}>
            <div className="bg-[var(--bg-card)] border border-gray-700 rounded-lg shadow-2xl p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-header font-bold mb-4 text-white">Create New Event</h2>
                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Event Name (e.g., Chambers of Xeric)" value={eventName} onChange={e => setEventName(e.target.value)} required className="w-full bg-gray-800 text-gray-200 p-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-gold)]" />
                        <input type="text" placeholder="Hosted by" value={host} onChange={e => setHost(e.target.value)} required className="w-full bg-gray-800 text-gray-200 p-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-gold)]" />
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 mb-1 block">Event Date & Time</label>
                        <input type="datetime-local" value={eventDate} onChange={e => setEventDate(e.target.value)} required className="w-full bg-gray-800 text-gray-200 p-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-gold)]" />
                    </div>
                    <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required className="w-full bg-gray-800 text-gray-200 p-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-gold)] h-24" />
                    
                    <div className="bg-black/30 p-3 rounded-md border border-gray-700">
                        <div className="flex items-center justify-between">
                            <label htmlFor="reminder" className="flex items-center cursor-pointer">
                                <i className="fa-solid fa-bell text-yellow-400 mr-3"></i>
                                <span className="font-semibold text-white">Set Reminder</span>
                            </label>
                            <input type="checkbox" id="reminder" checked={isReminderEnabled} onChange={e => setIsReminderEnabled(e.target.checked)} className="form-checkbox h-5 w-5 text-yellow-500 bg-gray-800 border-gray-600 rounded focus:ring-yellow-600" />
                        </div>
                        {isReminderEnabled && (
                            <div className="mt-3">
                                 <label className="text-xs text-gray-400 mb-1 block">Notify me...</label>
                                <select value={reminderMinutes} onChange={e => setReminderMinutes(parseInt(e.target.value))} className="w-full bg-gray-800 text-gray-200 p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-gold)]">
                                    <option value={5}>5 minutes before</option>
                                    <option value={15}>15 minutes before</option>
                                    <option value={30}>30 minutes before</option>
                                    <option value={60}>60 minutes before</option>
                                </select>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition-colors">Cancel</button>
                        <button type="submit" disabled={isLoading} className="bg-[color:var(--color-gold)] hover:bg-yellow-500 disabled:bg-yellow-800 text-black font-bold py-2 px-4 rounded-md transition-colors w-28 flex items-center justify-center">
                            {isLoading ? <Spinner size="sm" /> : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventFormModal;