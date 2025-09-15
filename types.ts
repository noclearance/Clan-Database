export enum Channel {
  Dashboard = 'dashboard',
  Members = 'members',
  Events = 'events',
  Hiscores = 'hiscores',
  DropsLog = 'drops-log',
  GearSetups = 'gear-setups',
}

export interface ClanEvent {
  id: number;
  name: string;
  description: string;
  time: string; // User-friendly display time
  eventDate: string; // ISO string for machine use
  host: string;
  attendees: string[];
  reminderMinutes?: number; // Minutes before event to notify
}

export interface Drop {
  id: number;
  itemName: string;
  playerName:string;
  boss: string;
  imageUrl: string;
}

export interface Skill {
  skill: string;
  rank: number;
  level: number;
  xp: number;
}

export type HiscoresData = Skill[];

export type GearSlot = 'head' | 'cape' | 'neck' | 'ammo' | 'weapon' | 'body' | 'shield' | 'legs' | 'hands' | 'feet' | 'ring' | 'special';

export type GearSetup = {
  [key in GearSlot]?: string;
};

export interface BossSetups {
  budget: GearSetup;
  midTier: GearSetup;
  max: GearSetup;
}

export interface ChannelConfig {
  name: string;
  icon: string;
  description: string;
}

// Types for the old Clan Feed
export interface FeedEventItem {
  type: 'event';
  id: string;
  timestamp: Date;
  event: ClanEvent;
}

export interface FeedDropItem {
  type: 'drop';
  id: string;
  timestamp: Date;
  drop: Drop;
}

export type FeedItem = FeedEventItem | FeedDropItem;


// Types for the new Dashboard Widgets

export interface BingoTile {
    id: number;
    task: string;
    completedBy?: string;
    imageUrl: string;
}

export interface Raffle {
    itemName: string;
    itemImageUrl: string;
    entries: string[];
    totalEntries: number;
}

export interface ShopItem {
    name: string;
    cost: number;
    imageUrl: string;
}

export interface ClanSpotlight {
    title: string;
    playerName: string;
    achievement: string;
    imageUrl: string;
}

// --- Wise Old Man API Types ---
export interface WOMPlayer {
    id: number;
    username: string;
    displayName: string;
    type: string;
    build: string;
    country: string | null;
    flagged: boolean;
    ehp: number;
    ehb: number;
    ttm: number;
    tt200m: number;
    lastChangedAt: string;
    lastUpdatedAt: string;
    registeredAt: string;
}

export interface WOMMembership {
    playerId: number;
    groupId: number;
    role: string;
    createdAt: string;
    updatedAt: string;
    player: WOMPlayer;
}

export interface WOMGroupDetails {
    id: number;
    name: string;
    clanChat: string;
    description: string | null;
    homeworld: number;
    verified: boolean;
    score: number;
    createdAt: string;
    updatedAt: string;
    memberCount: number;
    memberships: WOMMembership[];
}

export interface WOMCompetition {
    id: number;
    title: string;
    metric: string;
    score: number;
    startsAt: string;
    endsAt: string;
    groupId: number;
    createdAt: string;
    updatedAt: string;
    participantCount: number;
    duration: string;
}

export interface WOMParticipant {
    playerId: number;
    competitionId: number;
    teamName: string | null;
    rank: number;
    score: number;
    createdAt: string;
    updatedAt: string;
    progress: {
        start: number;
        end: number;
        gained: number;
    };
    player: WOMPlayer;
}

export interface WOMCompetitionDetails extends WOMCompetition {
    participants: WOMParticipant[];
    participations: WOMParticipant[]; // API can return either
}