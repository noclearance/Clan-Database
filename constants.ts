import { Channel, ClanEvent, Drop, ChannelConfig, BingoTile, Raffle, ShopItem, ClanSpotlight } from './types';

export const WOM_CLAN_ID = 11353;

export const CHANNEL_CONFIG: Record<Channel, ChannelConfig> = {
  [Channel.Dashboard]: { name: 'dashboard', icon: 'fa-solid fa-dragon', description: 'Welcome to the Datz Grazy clan hub.' },
  [Channel.Members]: { name: 'members', icon: 'fa-solid fa-users', description: 'View the full clan roster.' },
  [Channel.Events]: { name: 'events', icon: 'fa-solid fa-calendar-days', description: 'View and sign up for upcoming clan events.' },
  [Channel.Hiscores]: { name: 'hiscores', icon: 'fa-solid fa-star', description: 'Look up OSRS player stats and skill levels.' },
  [Channel.DropsLog]: { name: 'drops-log', icon: 'fa-solid fa-gem', description: 'A log of all the recent rare drops from clan members.' },
  [Channel.GearSetups]: { name: 'gear-setups', icon: 'fa-solid fa-shield-halved', description: 'Find recommended gear setups for various bosses.' },
};

// Helper to generate future dates for event examples
const getFutureDate = (days: number, hours: number, minutes: number): Date => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    date.setHours(hours, minutes, 0, 0);
    return date;
};

const formatDisplayTime = (date: Date): string => {
    return date.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
};

const event1Date = getFutureDate(0, 20, 0); // Today at 8:00 PM
const event2Date = getFutureDate(1, 19, 30); // Tomorrow at 7:30 PM
const event3Date = getFutureDate(3, 21, 0); // 3 days from now at 9:00 PM

export const INITIAL_EVENTS: ClanEvent[] = [
  { id: 1, name: 'Chambers of Xeric', description: 'Learner-friendly raid. All are welcome!', time: formatDisplayTime(event1Date), eventDate: event1Date.toISOString(), host: 'Godslayer', attendees: ['Godslayer', 'Zezima', 'Woox', 'A Friend', 'IronmanBTW'], reminderMinutes: 15 },
  { id: 2, name: 'Corporeal Beast', description: 'Let\'s hunt for that sigil!', time: formatDisplayTime(event2Date), eventDate: event2Date.toISOString(), host: 'IronmanBTW', attendees: ['IronmanBTW', 'B0aty', 'Pker'], reminderMinutes: 30 },
  { id: 3, name: 'Wilderness Bossing', description: 'Group bossing for voidwaker pieces.', time: formatDisplayTime(event3Date), eventDate: event3Date.toISOString(), host: 'Pker', attendees: ['Pker', 'Godslayer', 'Zezima', 'Woox', 'A Friend', 'IronmanBTW', 'B0aty', 'RuneScaper99'] },
];

export const INITIAL_DROPS: Drop[] = [
  { id: 1, itemName: 'Twisted Bow', playerName: 'Zezima', boss: 'Chambers of Xeric', imageUrl: 'https://oldschool.runescape.wiki/images/Twisted_bow_detail.png?224c0' },
  { id: 2, itemName: 'Scythe of Vitur', playerName: 'Woox', boss: 'Theatre of Blood', imageUrl: 'https://oldschool.runescape.wiki/images/Scythe_of_vitur_%28uncharged%29_detail.png?015ea' },
  { id: 3, itemName: 'Tumeken\'s Shadow', playerName: 'B0aty', boss: 'Tombs of Amascut', imageUrl: 'https://oldschool.runescape.wiki/images/Tumeken%27s_shadow_%28uncharged%29_detail.png?e05f6' },
  { id: 4, itemName: 'Elysian Spirit Shield', playerName: 'A Friend', boss: 'Corporeal Beast', imageUrl: 'https://oldschool.runescape.wiki/images/Elysian_spirit_shield_detail.png?a8449' },
];

export const BOSS_LIST = [
    'General Graardor',
    'K\'ril Tsutsaroth',
    'Commander Zilyana',
    'Kree\'arra',
    'Vorkath',
    'Zulrah',
    'Corporeal Beast',
    'The Nightmare',
    'Tombs of Amascut (Expert)',
    'Theatre of Blood (Hard)',
    'Chambers of Xeric'
];

export const SKILL_CATEGORIES: Record<string, string> = {
    'Attack': 'Combat',
    'Strength': 'Combat',
    'Defence': 'Combat',
    'Ranged': 'Combat',
    'Prayer': 'Combat',
    'Magic': 'Combat',
    'Hitpoints': 'Combat',
    'Slayer': 'Combat',
    'Mining': 'Gathering',
    'Fishing': 'Gathering',
    'Woodcutting': 'Gathering',
    'Farming': 'Gathering',
    'Hunter': 'Gathering',
    'Herblore': 'Artisan',
    'Crafting': 'Artisan',
    'Fletching': 'Artisan',
    'Smithing': 'Artisan',
    'Cooking': 'Artisan',
    'Firemaking': 'Artisan',
    'Runecraft': 'Artisan',
    'Construction': 'Artisan',
    'Agility': 'Support',
    'Thieving': 'Support',
};

export const CATEGORY_ORDER = ['Combat', 'Gathering', 'Artisan', 'Support'];


// MOCK DATA FOR NEW WIDGETS
export const BINGO_BOARD_DATA: BingoTile[] = [
    { id: 1, task: 'Get a Vorkath Head', imageUrl: 'https://oldschool.runescape.wiki/images/Vorkath%27s_head_detail.png', completedBy: 'Zezima' },
    { id: 2, task: 'Receive a Barrows unique', imageUrl: 'https://oldschool.runescape.wiki/images/Ahrim%27s_hood_detail.png' },
    { id: 3, task: 'Complete a Master Clue', imageUrl: 'https://oldschool.runescape.wiki/images/Reward_casket_%28master%29_detail.png', completedBy: 'Woox' },
    { id: 4, task: 'Kill 50 Revenant Knights', imageUrl: 'https://oldschool.runescape.wiki/images/Revenant_knight.png' },
    { id: 5, task: 'Obtain a piece of the Voidwaker', imageUrl: 'https://oldschool.runescape.wiki/images/Voidwaker_detail.png' },
    //... add 20 more for a 5x5 grid
    { id: 6, task: 'Complete the Fight Caves', imageUrl: 'https://oldschool.runescape.wiki/images/Fire_cape_detail.png', completedBy: 'A Friend' },
    { id: 7, task: 'Get a God Wars unique', imageUrl: 'https://oldschool.runescape.wiki/images/Bandos_chestplate_detail.png' },
    { id: 8, task: 'Defeat the Mimic', imageUrl: 'https://oldschool.runescape.wiki/images/The_Mimic.png' },
    { id: 9, task: 'Sacrifice a Fire Cape', imageUrl: 'https://oldschool.runescape.wiki/images/Infernal_cape_detail.png' },
    { id: 10, task: 'Get a Zulrah unique', imageUrl: 'https://oldschool.runescape.wiki/images/Tanzanite_fang_detail.png' },
    { id: 11, task: 'Complete a full TOA raid', imageUrl: 'https://oldschool.runescape.wiki/images/Tumeken%27s_shadow_%28uncharged%29_detail.png', completedBy: 'B0aty' },
    { id: 12, task: 'Obtain a Dragon pickaxe', imageUrl: 'https://oldschool.runescape.wiki/images/Dragon_pickaxe_detail.png' },
    { id: 13, task: 'Catch 100 eclectic implings', imageUrl: 'https://oldschool.runescape.wiki/images/Eclectic_impling_jar_detail.png' },
    { id: 14, task: 'Smith 100 rune platebodies', imageUrl: 'https://oldschool.runescape.wiki/images/Rune_platebody_detail.png' },
    { id: 15, task: 'Defeat a Wilderness boss', imageUrl: 'https://oldschool.runescape.wiki/images/Vet%27ion.png', completedBy: 'Pker' },
    { id: 16, task: 'Get a Skilling pet', imageUrl: 'https://oldschool.runescape.wiki/images/Heron.png' },
    { id: 17, task: 'Equip a Dragon full helm', imageUrl: 'https://oldschool.runescape.wiki/images/Dragon_full_helm_detail.png' },
    { id: 18, task: 'Complete a TOB raid', imageUrl: 'https://oldschool.runescape.wiki/images/Scythe_of_vitur_%28uncharged%29_detail.png' },
    { id: 19, task: 'Obtain a Dark Bow', imageUrl: 'https://oldschool.runescape.wiki/images/Dark_bow_detail.png' },
    { id: 20, task: 'Fletch 1000 magic longbows', imageUrl: 'https://oldschool.runescape.wiki/images/Magic_longbow_detail.png' },
    { id: 21, task: 'Kill 100 demonic gorillas', imageUrl: 'https://oldschool.runescape.wiki/images/Demonic_gorilla.png', completedBy: 'Godslayer' },
    { id: 22, task: 'Get a COX unique', imageUrl: 'https://oldschool.runescape.wiki/images/Twisted_bow_detail.png' },
    { id: 23, task: 'Complete 10 laps of the Ardougne agility course', imageUrl: 'https://oldschool.runescape.wiki/images/Agility-icon.png' },
    { id: 24, task: 'Alch 500 items', imageUrl: 'https://oldschool.runescape.wiki/images/High_Level_Alchemy_detail.png' },
    { id: 25, task: 'Receive any boss pet', imageUrl: 'https://oldschool.runescape.wiki/images/Pet_dark_core.png' },
];

export const ACTIVE_RAFFLE_DATA: Raffle = {
    itemName: 'Twisted Bow',
    itemImageUrl: 'https://oldschool.runescape.wiki/images/Twisted_bow_detail.png?224c0',
    entries: ['Zezima', 'Woox', 'A Friend', 'IronmanBTW', 'B0aty', 'Pker', 'Godslayer'],
    totalEntries: 25
};

export const CLAN_POINT_SHOP_DATA: ShopItem[] = [
    { name: 'Clan Discord Rank', cost: 100, imageUrl: 'https://oldschool.runescape.wiki/images/Discord_icon.png' },
    { name: '1m GP', cost: 250, imageUrl: 'https://oldschool.runescape.wiki/images/Coins_detail.png' },
    { name: 'Bond', cost: 1000, imageUrl: 'https://oldschool.runescape.wiki/images/Old_school_bond_%28untradeable%29_detail.png' },
    { name: 'Event Host Pass', cost: 500, imageUrl: 'https://oldschool.runescape.wiki/images/Slayer-icon.png' },
];

export const CLAN_SPOTLIGHT_DATA: ClanSpotlight = {
    title: 'Purple Panic!',
    playerName: 'B0aty',
    achievement: 'Received a Tumeken\'s Shadow from a TOA raid!',
    imageUrl: 'https://oldschool.runescape.wiki/images/Tumeken%27s_shadow_%28uncharged%29_detail.png?e05f6',
};