import React, { createContext, useState, ReactNode, useEffect, useRef } from 'react';
import { ClanEvent, Drop, FeedItem } from '../types';
import { INITIAL_EVENTS, INITIAL_DROPS } from '../constants';

// Our simulated logged-in user
const currentUser = 'RuneScaper99';

interface AppContextType {
  events: ClanEvent[];
  drops: Drop[];
  feedItems: FeedItem[];
  currentUser: string;
  addEvent: (event: Omit<ClanEvent, 'id' | 'attendees' | 'time'>) => void;
  addDrop: (drop: Omit<Drop, 'id' | 'imageUrl'>, imageUrl: string) => void;
  toggleEventSignup: (eventId: number) => void;
  setEventReminder: (eventId: number, minutes: number | undefined) => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

// Helper to create initial feed items from constants
const createInitialFeed = (): FeedItem[] => {
    const eventItems: FeedItem[] = INITIAL_EVENTS.map(event => ({
        type: 'event',
        id: `event-${event.id}`,
        timestamp: new Date(Date.now() - Math.random() * 100000000), // simulate past events
        event,
    }));
    const dropItems: FeedItem[] = INITIAL_DROPS.map(drop => ({
        type: 'drop',
        id: `drop-${drop.id}`,
        timestamp: new Date(Date.now() - Math.random() * 100000000), // simulate past drops
        drop,
    }));

    return [...eventItems, ...dropItems].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<ClanEvent[]>(INITIAL_EVENTS);
  const [drops, setDrops] = useState<Drop[]>(INITIAL_DROPS);
  const [feedItems, setFeedItems] = useState<FeedItem[]>(createInitialFeed());
  // Fix: In a browser environment, setTimeout returns a number, not a NodeJS.Timeout object.
  const notificationTimers = useRef<Map<number, number>>(new Map());

  const scheduleNotification = (event: ClanEvent) => {
    if (!event.reminderMinutes) return;

    const reminderTime = new Date(event.eventDate).getTime() - (event.reminderMinutes * 60 * 1000);
    const delay = reminderTime - Date.now();

    if (delay <= 0) return; // Don't schedule for past events

    const existingTimer = notificationTimers.current.get(event.id);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }
    
    const timerId = setTimeout(() => {
      new Notification('OSRS Clan Event Reminder', {
        body: `${event.name} is starting in ${event.reminderMinutes} minutes!`,
        icon: 'https://oldschool.runescape.wiki/images/Fire_cape_detail.png', // A cool icon
      });
      notificationTimers.current.delete(event.id);
    }, delay);

    notificationTimers.current.set(event.id, timerId);
  };

  const cancelNotification = (eventId: number) => {
      const timerId = notificationTimers.current.get(eventId);
      if (timerId) {
          clearTimeout(timerId);
          notificationTimers.current.delete(eventId);
      }
  };

  const setEventReminder = async (eventId: number, minutes: number | undefined) => {
      const eventToUpdate = events.find(e => e.id === eventId);
      if (!eventToUpdate) return;
      
      if (minutes && Notification.permission !== 'granted') {
          const permission = await Notification.requestPermission();
          if (permission !== 'granted') {
              alert("You've disabled notifications. Please enable them in your browser settings to receive reminders.");
              return;
          }
      }

      setEvents(prevEvents =>
          prevEvents.map(event =>
              event.id === eventId ? { ...event, reminderMinutes: minutes } : event
          )
      );

      // Update scheduling
      cancelNotification(eventId);
      if (minutes) {
          scheduleNotification({ ...eventToUpdate, reminderMinutes: minutes });
      }
  };
  
  // Schedule initial reminders on component mount
  useEffect(() => {
    if (Notification.permission === 'granted') {
        events.forEach(scheduleNotification);
    }
    // Cleanup timers on unmount
    return () => {
        notificationTimers.current.forEach(clearTimeout);
    };
  }, []); // Run only once

  const addEvent = (eventData: Omit<ClanEvent, 'id' | 'attendees' | 'time'>) => {
    const date = new Date(eventData.eventDate);
    const displayTime = date.toLocaleString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric',
        hour: 'numeric', minute: '2-digit', hour12: true,
    });

    const newEvent: ClanEvent = {
      ...eventData,
      id: Date.now(),
      attendees: [eventData.host], // The host is the first attendee
      time: displayTime,
    };
    setEvents(prev => [newEvent, ...prev].sort((a,b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()));

    if (newEvent.reminderMinutes) {
        setEventReminder(newEvent.id, newEvent.reminderMinutes);
    }

    const newFeedItem: FeedItem = {
        type: 'event',
        id: `event-${newEvent.id}`,
        timestamp: new Date(),
        event: newEvent,
    };
    setFeedItems(prev => [newFeedItem, ...prev]);
  };

  const addDrop = (dropData: Omit<Drop, 'id' | 'imageUrl'>, imageUrl: string) => {
    const newDrop: Drop = {
        ...dropData,
        id: Date.now(),
        imageUrl: imageUrl,
    };
    setDrops(prev => [newDrop, ...prev]);
    
    const newFeedItem: FeedItem = {
        type: 'drop',
        id: `drop-${newDrop.id}`,
        timestamp: new Date(),
        drop: newDrop,
    };
    setFeedItems(prev => [newFeedItem, ...prev]);
  };

  const toggleEventSignup = (eventId: number) => {
    setEvents(prevEvents =>
      prevEvents.map(event => {
        if (event.id === eventId) {
          const isSignedUp = event.attendees.includes(currentUser);
          const newAttendees = isSignedUp
            ? event.attendees.filter(name => name !== currentUser)
            : [...event.attendees, currentUser];
          return { ...event, attendees: newAttendees };
        }
        return event;
      })
    );
  };

  return (
    <AppContext.Provider value={{ events, drops, feedItems, currentUser, addEvent, addDrop, toggleEventSignup, setEventReminder }}>
      {children}
    </AppContext.Provider>
  );
};