export type StationStatus = 'available' | 'in-use' | 'reserved' | 'maintenance';
export type TournamentStatus = 'upcoming' | 'ongoing' | 'completed';
export type RegistrationStatus = 'open' | 'closed';
export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'confirmed';
export type GameGenre = 'FPS' | 'MOBA' | 'SPORTS' | 'RACING' | 'FIGHTING' | 'CO-OP' | 'BATTLE ROYALE';

export interface Station {
  id: string;
  name: string;
  status: StationStatus;
  currentUser?: string;
  reservedAt?: string;
}

export interface Zone {
  id: string;
  name: string;
  type: 'PC' | 'PS5' | 'VIP' | 'BOOTCAMP';
  description: string;
  hardware: string[];
  features: string[];
  pricePerHour: number;
  stations: Station[];
  image: string;
  badge?: string;
}

export interface Game {
  id: string;
  name: string;
  genre: GameGenre;
  platform: ('PC' | 'PS5' | 'Both')[];
  description: string;
  available: boolean;
  image: string;
  rating?: number;
}

export interface Tournament {
  id: string;
  name: string;
  game: string;
  gameGenre: GameGenre;
  description: string;
  date: string;
  time: string;
  entryFee: number;
  prizePool: number;
  playersPerTeam: number;
  maxTeams: number;
  registeredTeams: number;
  format: string;
  rules: string[];
  registrationStatus: RegistrationStatus;
  status: TournamentStatus;
  image: string;
  createdAt: string;
}

export interface Winner {
  id: string;
  tournamentId: string;
  tournamentName: string;
  game: string;
  position: 1 | 2 | 3;
  teamName: string;
  players: string[];
  prize: number;
  description: string;
  image?: string;
  publishedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  handle: string;
  text: string;
  rating: number;
  date: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'drink' | 'snack' | 'combo' | 'meal';
  price: number;
  description: string;
  popular?: boolean;
}

export interface Registration {
  id: string;
  tournamentId: string;
  teamName: string;
  captainName: string;
  phone: string;
  email: string;
  discord?: string;
  instagram?: string;
  notes?: string;
  players: string[];
  status: BookingStatus;
  paymentStatus: 'pending' | 'paid' | 'waived';
  createdAt: string;
}

// ── ZONES ────────────────────────────────────────────────────────────────────

export const zones: Zone[] = [
  {
    id: 'pc',
    name: 'PC Zone',
    type: 'PC',
    description: 'High-performance PC stations built for competitive play. RTX 4070 Super GPUs, 144Hz+ monitors, and premium peripherals.',
    hardware: ['RTX 4070 Super', 'Intel i9-14900K', '32GB DDR5 RAM', '27" 165Hz QHD Monitor'],
    features: ['Mechanical Keyboards', 'SteelSeries Headsets', 'Adjustable RGB Lighting', 'High-Speed Internet'],
    pricePerHour: 80,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop&auto=format',
    stations: [
      { id: 'pc-01', name: 'PC-01', status: 'available' },
      { id: 'pc-02', name: 'PC-02', status: 'in-use', currentUser: 'Arjun K.' },
      { id: 'pc-03', name: 'PC-03', status: 'available' },
      { id: 'pc-04', name: 'PC-04', status: 'reserved', reservedAt: '7:30 PM' },
      { id: 'pc-05', name: 'PC-05', status: 'in-use', currentUser: 'Rahul M.' },
      { id: 'pc-06', name: 'PC-06', status: 'available' },
      { id: 'pc-07', name: 'PC-07', status: 'available' },
      { id: 'pc-08', name: 'PC-08', status: 'maintenance' },
      { id: 'pc-09', name: 'PC-09', status: 'in-use', currentUser: 'Sneha P.' },
      { id: 'pc-10', name: 'PC-10', status: 'available' },
      { id: 'pc-11', name: 'PC-11', status: 'reserved', reservedAt: '8:00 PM' },
      { id: 'pc-12', name: 'PC-12', status: 'in-use', currentUser: 'Dev S.' },
    ],
  },
  {
    id: 'ps5',
    name: 'PS5 Arena',
    type: 'PS5',
    description: 'Full console experience on 55" 4K OLED screens. Perfect for FIFA, God of War, and multiplayer sessions.',
    hardware: ['PlayStation 5', '55" Sony OLED 4K TV', 'DualSense Controllers', 'Surround Sound System'],
    features: ['4K HDR Gaming', 'PlayStation Plus Access', 'Game Library of 80+ Titles', 'Co-op Ready'],
    pricePerHour: 60,
    image: 'https://images.unsplash.com/photo-1558008258-ec20a83db196?w=800&h=500&fit=crop&auto=format',
    stations: [
      { id: 'ps5-01', name: 'PS5-01', status: 'available' },
      { id: 'ps5-02', name: 'PS5-02', status: 'in-use', currentUser: 'Vikram N.' },
      { id: 'ps5-03', name: 'PS5-03', status: 'available' },
      { id: 'ps5-04', name: 'PS5-04', status: 'reserved', reservedAt: '9:00 PM' },
    ],
  },
  {
    id: 'vip',
    name: 'VIP Room',
    type: 'VIP',
    description: 'Private gaming suite for up to 4 players. Premium seating, dedicated server, and personal concierge service.',
    hardware: ['RTX 4090', '32" 4K 240Hz Monitor', 'Herman Miller Chairs', 'Bose Soundbar'],
    features: ['Private Lounge', 'Dedicated Fiber Internet', 'Personal Concierge', 'Mini-Bar Access', 'Stream-Ready Setup'],
    pricePerHour: 200,
    image: 'https://images.unsplash.com/photo-1548003693-b55d51032288?w=800&h=500&fit=crop&auto=format',
    badge: 'PREMIUM',
    stations: [
      { id: 'vip-01', name: 'VIP-01', status: 'available' },
      { id: 'vip-02', name: 'VIP-02', status: 'reserved', reservedAt: '8:30 PM' },
    ],
  },
  {
    id: 'bootcamp',
    name: 'Bootcamp Room',
    type: 'BOOTCAMP',
    description: '10-seat team room built for scrims, bootcamps, and organized team practice. LAN-ready with team management tools.',
    hardware: ['RTX 4070', '24" 240Hz Monitor (×10)', 'Razer Team Headsets', 'LAN Switch'],
    features: ['LAN Party Ready', 'Team Voice Setup', 'Strategy Whiteboard', 'Match Recording'],
    pricePerHour: 120,
    image: 'https://images.unsplash.com/photo-1558008258-7ff8888b42b0?w=800&h=500&fit=crop&auto=format',
    stations: [
      { id: 'bc-01', name: 'BC-01', status: 'available' },
      { id: 'bc-02', name: 'BC-02', status: 'available' },
    ],
  },
];

// ── GAMES ────────────────────────────────────────────────────────────────────

export const games: Game[] = [
  { id: 'val', name: 'VALORANT', genre: 'FPS', platform: ['PC'], description: 'Tactical 5v5 character-based shooter. Precision is everything.', available: true, image: 'https://images.unsplash.com/photo-1632603093711-0d93a0bcc6cc?w=400&h=250&fit=crop&auto=format', rating: 4.9 },
  { id: 'cs2', name: 'CS2', genre: 'FPS', platform: ['PC'], description: 'The world\'s most iconic tactical shooter, rebuilt in Source 2.', available: true, image: 'https://images.unsplash.com/photo-1572314493295-09c6d5ec3cdf?w=400&h=250&fit=crop&auto=format', rating: 4.8 },
  { id: 'dota2', name: 'DOTA 2', genre: 'MOBA', platform: ['PC'], description: '100+ heroes, infinite strategies. The deepest MOBA ever made.', available: true, image: 'https://images.unsplash.com/photo-1725272334053-cc3ac867255d?w=400&h=250&fit=crop&auto=format', rating: 4.7 },
  { id: 'lol', name: 'LEAGUE OF LEGENDS', genre: 'MOBA', platform: ['PC'], description: 'The most played PC game on the planet. Lead your team to victory.', available: true, image: 'https://images.unsplash.com/photo-1725272532764-183d164c722b?w=400&h=250&fit=crop&auto=format', rating: 4.7 },
  { id: 'fc25', name: 'EA SPORTS FC 25', genre: 'SPORTS', platform: ['PS5'], description: 'The most authentic football simulation with HyperMotion V.', available: true, image: 'https://images.unsplash.com/photo-1558008258-ec20a83db196?w=400&h=250&fit=crop&auto=format', rating: 4.5 },
  { id: 'mk1', name: 'MORTAL KOMBAT 1', genre: 'FIGHTING', platform: ['PS5'], description: 'Brutal, cinematic, and visceral. The rebirth of the franchise.', available: true, image: 'https://images.unsplash.com/photo-1787418306022-1b637925f39f?w=400&h=250&fit=crop&auto=format', rating: 4.4 },
  { id: 'forza', name: 'FORZA HORIZON 5', genre: 'RACING', platform: ['PC'], description: 'Open-world racing at its absolute finest. Mexico never looked better.', available: true, image: 'https://images.unsplash.com/photo-1707312900236-12d6fefd2bbb?w=400&h=250&fit=crop&auto=format', rating: 4.8 },
  { id: 'ow2', name: 'OVERWATCH 2', genre: 'FPS', platform: ['PC'], description: 'Hero-based team shooter with constant meta evolution.', available: true, image: 'https://images.unsplash.com/photo-1548003693-b55d51032288?w=400&h=250&fit=crop&auto=format', rating: 4.2 },
  { id: 'apex', name: 'APEX LEGENDS', genre: 'BATTLE ROYALE', platform: ['PC'], description: '60-player battle royale with the best movement mechanics in the genre.', available: true, image: 'https://images.unsplash.com/photo-1726442112857-4f951bafe4f5?w=400&h=250&fit=crop&auto=format', rating: 4.6 },
  { id: 'rl', name: 'ROCKET LEAGUE', genre: 'SPORTS', platform: ['PC', 'PS5'], description: 'Soccer with rocket-powered cars. Mechanical mastery required.', available: true, image: 'https://images.unsplash.com/photo-1632603093711-0d93a0bcc6cc?w=400&h=250&fit=crop&auto=format', rating: 4.8 },
  { id: 'tekken8', name: 'TEKKEN 8', genre: 'FIGHTING', platform: ['PS5'], description: 'The King of Iron Fist Tournament. Unreal Engine 5 power.', available: true, image: 'https://images.unsplash.com/photo-1558008258-7ff8888b42b0?w=400&h=250&fit=crop&auto=format', rating: 4.7 },
  { id: 'lostark', name: 'LOST ARK', genre: 'CO-OP', platform: ['PC'], description: 'Massive isometric action-RPG with deep endgame content.', available: true, image: 'https://images.unsplash.com/photo-1725272333988-5f35b9ceae38?w=400&h=250&fit=crop&auto=format', rating: 4.3 },
];

// ── TOURNAMENTS ───────────────────────────────────────────────────────────────

export const tournaments: Tournament[] = [
  {
    id: 't1',
    name: 'VALORANT NIGHT',
    game: 'VALORANT',
    gameGenre: 'FPS',
    description: 'The flagship 5v5 VALORANT tournament at Nexus. Prove your team is the best in the city.',
    date: '2026-09-27',
    time: '7:00 PM',
    entryFee: 299,
    prizePool: 10000,
    playersPerTeam: 5,
    maxTeams: 16,
    registeredTeams: 12,
    format: 'Double Elimination',
    rules: [
      'Standard Valorant competitive rules apply.',
      'All agents are allowed.',
      'Cheating or exploiting results in immediate disqualification.',
      'Teams must arrive 30 minutes before start time.',
      'The Nexus admin has final say in all disputes.',
      'Prize distribution: 1st ₹6,000 / 2nd ₹2,500 / 3rd ₹1,500',
    ],
    registrationStatus: 'open',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop&auto=format',
    createdAt: '2026-09-10T00:00:00Z',
  },
  {
    id: 't2',
    name: 'CS2 OPEN',
    game: 'CS2',
    gameGenre: 'FPS',
    description: 'Classic 5v5 CS2 showdown. 128-tick servers, best skins on the line, and serious competition.',
    date: '2026-10-04',
    time: '6:00 PM',
    entryFee: 399,
    prizePool: 15000,
    playersPerTeam: 5,
    maxTeams: 8,
    registeredTeams: 5,
    format: 'Single Elimination, Best of 2',
    rules: [
      'Default competitive settings. No cheats, mods, or third-party software.',
      'Map pool: Inferno, Mirage, Nuke, Anubis.',
      'Check-in deadline: 30 minutes before start.',
      'No-show after 10 minutes results in forfeit.',
      'Prize: 1st ₹9,000 / 2nd ₹4,000 / 3rd ₹2,000',
    ],
    registrationStatus: 'open',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1572314493295-09c6d5ec3cdf?w=800&h=450&fit=crop&auto=format',
    createdAt: '2026-09-12T00:00:00Z',
  },
  {
    id: 't3',
    name: 'FC 25 CUP',
    game: 'EA SPORTS FC 25',
    gameGenre: 'SPORTS',
    description: '1v1 football showdown on the big screen. Bring your squad, embarrass your rivals.',
    date: '2026-10-11',
    time: '5:00 PM',
    entryFee: 149,
    prizePool: 3000,
    playersPerTeam: 1,
    maxTeams: 16,
    registeredTeams: 9,
    format: 'Round Robin + Finals',
    rules: [
      'EA SPORTS FC 25 — PS5 version.',
      'Legend / FUT squads not allowed. Use in-game squad builder.',
      'Lag issues will not result in replays.',
      'Prize: 1st ₹2,000 / 2nd ₹700 / 3rd ₹300',
    ],
    registrationStatus: 'open',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1558008258-ec20a83db196?w=800&h=450&fit=crop&auto=format',
    createdAt: '2026-09-14T00:00:00Z',
  },
  {
    id: 't4',
    name: 'TEKKEN 8 INVITATIONAL',
    game: 'TEKKEN 8',
    gameGenre: 'FIGHTING',
    description: 'The most intense 1v1 fighting bracket in the city. All characters allowed. Only skill survives.',
    date: '2026-10-18',
    time: '4:00 PM',
    entryFee: 199,
    prizePool: 5000,
    playersPerTeam: 1,
    maxTeams: 32,
    registeredTeams: 20,
    format: 'Double Elimination',
    rules: [
      'PS5, Tekken 8 standard competitive settings.',
      'All DLC characters allowed.',
      'Matches are Best of 3, Grand Finals Best of 5.',
      'No stalling tactics or deliberate timer manipulation.',
      'Prize: 1st ₹3,000 / 2nd ₹1,200 / 3rd ₹800',
    ],
    registrationStatus: 'open',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1787418306022-1b637925f39f?w=800&h=450&fit=crop&auto=format',
    createdAt: '2026-09-15T00:00:00Z',
  },
];

// ── WINNERS ───────────────────────────────────────────────────────────────────

export const winners: Winner[] = [
  {
    id: 'w1',
    tournamentId: 'prev-t1',
    tournamentName: 'VALORANT NIGHT — AUG 2026',
    game: 'VALORANT',
    position: 1,
    teamName: 'SHADOWX',
    players: ['Arjun K.', 'Rahul M.', 'Dev S.', 'Sneha P.', 'Karan R.'],
    prize: 6000,
    description: 'Dominant performance across all matches. Undefeated run.',
    publishedAt: '2026-08-25T00:00:00Z',
  },
  {
    id: 'w2',
    tournamentId: 'prev-t1',
    tournamentName: 'VALORANT NIGHT — AUG 2026',
    game: 'VALORANT',
    position: 2,
    teamName: 'GHOST UNIT',
    players: ['Vikram N.', 'Aditya L.', 'Priya S.', 'Ravi T.', 'Meera K.'],
    prize: 2500,
    description: 'Runner-up after a close Grand Finals series.',
    publishedAt: '2026-08-25T00:00:00Z',
  },
  {
    id: 'w3',
    tournamentId: 'prev-t2',
    tournamentName: 'CS2 OPEN — JUL 2026',
    game: 'CS2',
    position: 1,
    teamName: 'HAZE FIVE',
    players: ['Ankit B.', 'Suraj M.', 'Nikhil V.', 'Rohit G.', 'Tarun P.'],
    prize: 9000,
    description: '16-0 round differential in the final map. Clinical.',
    publishedAt: '2026-07-20T00:00:00Z',
  },
  {
    id: 'w4',
    tournamentId: 'prev-t3',
    tournamentName: 'TEKKEN 7 — JUN 2026',
    game: 'TEKKEN 7',
    position: 1,
    teamName: 'IRON FIST (Solo)',
    players: ['Siddharth A.'],
    prize: 3000,
    description: 'Perfect bracket run. Not a single loss.',
    publishedAt: '2026-06-15T00:00:00Z',
  },
];

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────

export const testimonials: Testimonial[] = [
  { id: 'r1', name: 'Arjun Mehta', handle: '@arjun_fps', text: 'Nexus is the only place I trust for serious practice sessions. The hardware is top-tier and the environment is actually focused, not chaotic.', rating: 5, date: 'September 2026' },
  { id: 'r2', name: 'Priya Sharma', handle: '@priya_plays', text: 'Came in for the VALORANT tournament and stayed for three more hours after. The VIP room is insane — best gaming setup I\'ve ever used.', rating: 5, date: 'August 2026' },
  { id: 'r3', name: 'Dev Rajan', handle: '@devrajan_', text: 'The bootcamp room is perfect for team practice. Reliable LAN, great monitors, and the staff actually know gaming. Rare.', rating: 5, date: 'August 2026' },
  { id: 'r4', name: 'Sneha Pillai', handle: '@snehagames', text: 'Finally a gaming cafe that doesn\'t look like a basement rave. Premium feel, professional service, and the PS5 setup with OLED screens is unreal.', rating: 5, date: 'July 2026' },
];

// ── MENU ──────────────────────────────────────────────────────────────────────

export const menuItems: MenuItem[] = [
  { id: 'm1', name: 'Nexus Cold Brew', category: 'drink', price: 120, description: 'House cold brew with oat milk. Fuel for long sessions.', popular: true },
  { id: 'm2', name: 'Energy Blend', category: 'drink', price: 90, description: 'Custom energy mix — controlled caffeine, no crash.' },
  { id: 'm3', name: 'Matcha Latte', category: 'drink', price: 140, description: 'Ceremonial grade matcha with steamed milk.' },
  { id: 'm4', name: 'Classic Americano', category: 'drink', price: 80, description: 'Double shot espresso, hot or iced.' },
  { id: 'm5', name: 'Gaming Combo I', category: 'combo', price: 280, description: '1 Cold Brew + Loaded Nachos + 2 hours PC.', popular: true },
  { id: 'm6', name: 'Gaming Combo II', category: 'combo', price: 350, description: '1 Energy Blend + Chicken Wrap + 3 hours PC.' },
  { id: 'm7', name: 'Loaded Nachos', category: 'snack', price: 180, description: 'Crispy tortilla chips, cheese sauce, jalapeño, sour cream.', popular: true },
  { id: 'm8', name: 'Chicken Wings (6pc)', category: 'snack', price: 220, description: 'Crispy wings with your choice of sauce.' },
  { id: 'm9', name: 'Smash Burger', category: 'meal', price: 260, description: 'Double smash patties, cheddar, house sauce, brioche bun.' },
  { id: 'm10', name: 'Chicken Wrap', category: 'meal', price: 200, description: 'Grilled chicken, lettuce, tomato, chipotle mayo.' },
];

// ── PRICING ───────────────────────────────────────────────────────────────────

export const pricingData = {
  pc: [
    { duration: '1 Hour', price: 80 },
    { duration: '2 Hours', price: 150 },
    { duration: '3 Hours', price: 210 },
    { duration: '5 Hours', price: 320 },
    { duration: '7 Hours', price: 420 },
    { duration: '10 Hours', price: 560 },
    { duration: 'Night (11PM–6AM)', price: 480 },
    { duration: 'Day (10AM–10PM)', price: 700 },
  ],
  ps5: [
    { duration: '1 Hour', price: 60 },
    { duration: '2 Hours', price: 110 },
    { duration: '3 Hours', price: 150 },
    { duration: '5 Hours', price: 240 },
    { duration: '7 Hours', price: 320 },
    { duration: '10 Hours', price: 420 },
    { duration: 'Night (11PM–6AM)', price: 380 },
    { duration: 'Day (10AM–10PM)', price: 520 },
  ],
  vip: [
    { duration: '1 Hour', price: 200 },
    { duration: '2 Hours', price: 380 },
    { duration: '3 Hours', price: 540 },
    { duration: '5 Hours', price: 860 },
    { duration: '7 Hours', price: 1120 },
    { duration: '10 Hours', price: 1500 },
    { duration: 'Night (11PM–6AM)', price: 1200 },
    { duration: 'Day (10AM–10PM)', price: 1800 },
  ],
  bootcamp: [
    { duration: '1 Hour', price: 120 },
    { duration: '2 Hours', price: 220 },
    { duration: '3 Hours', price: 300 },
    { duration: '5 Hours', price: 480 },
    { duration: '7 Hours', price: 630 },
    { duration: '10 Hours', price: 840 },
    { duration: 'Night (11PM–6AM)', price: 720 },
    { duration: 'Day (10AM–10PM)', price: 1050 },
  ],
};

// ── GALLERY ───────────────────────────────────────────────────────────────────

export const galleryImages = [
  { id: 'g1', src: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop&auto=format', alt: 'PC gaming stations at Nexus', category: 'PC Zone' },
  { id: 'g2', src: 'https://images.unsplash.com/photo-1725272334053-cc3ac867255d?w=800&h=600&fit=crop&auto=format', alt: 'Player focused at monitor', category: 'Players' },
  { id: 'g3', src: 'https://images.unsplash.com/photo-1725272532764-183d164c722b?w=800&h=600&fit=crop&auto=format', alt: 'Team gaming session', category: 'Teams' },
  { id: 'g4', src: 'https://images.unsplash.com/photo-1548003693-b55d51032288?w=800&h=600&fit=crop&auto=format', alt: 'Two players competing', category: 'Competition' },
  { id: 'g5', src: 'https://images.unsplash.com/photo-1572314493295-09c6d5ec3cdf?w=800&h=600&fit=crop&auto=format', alt: 'Dual monitor setup', category: 'Setup' },
  { id: 'g6', src: 'https://images.unsplash.com/photo-1558008258-7ff8888b42b0?w=800&h=600&fit=crop&auto=format', alt: 'Group online gaming', category: 'Teams' },
  { id: 'g7', src: 'https://images.unsplash.com/photo-1558008258-ec20a83db196?w=800&h=600&fit=crop&auto=format', alt: 'Console gaming zone', category: 'PS5 Zone' },
  { id: 'g8', src: 'https://images.unsplash.com/photo-1787418306022-1b637925f39f?w=800&h=600&fit=crop&auto=format', alt: 'RGB mechanical keyboard', category: 'Setup' },
  { id: 'g9', src: 'https://images.unsplash.com/photo-1725272333988-5f35b9ceae38?w=800&h=600&fit=crop&auto=format', alt: 'Player with headset', category: 'Players' },
];

// ── ADMIN MOCK DATA ───────────────────────────────────────────────────────────

export const adminRegistrations: Registration[] = [
  { id: 'REG-0041', tournamentId: 't1', teamName: 'SHADOWX', captainName: 'Arjun K.', phone: '9876543210', email: 'arjun@example.com', players: ['Arjun K.', 'Rahul M.', 'Dev S.', 'Sneha P.', 'Karan R.'], status: 'confirmed', paymentStatus: 'paid', createdAt: '2026-09-16T10:00:00Z' },
  { id: 'REG-0042', tournamentId: 't1', teamName: 'GHOST UNIT', captainName: 'Vikram N.', phone: '9876543211', email: 'vikram@example.com', players: ['Vikram N.', 'Aditya L.', 'Priya S.', 'Ravi T.', 'Meera K.'], status: 'approved', paymentStatus: 'paid', createdAt: '2026-09-16T11:00:00Z' },
  { id: 'REG-0043', tournamentId: 't1', teamName: 'ALPHA FIVE', captainName: 'Suresh B.', phone: '9876543212', email: 'suresh@example.com', players: ['Suresh B.', 'Kavya T.', 'Rajan P.', 'Ankit G.', 'Pooja M.'], status: 'pending', paymentStatus: 'pending', createdAt: '2026-09-17T09:00:00Z' },
  { id: 'REG-0044', tournamentId: 't2', teamName: 'HAZE FIVE', captainName: 'Ankit B.', phone: '9876543213', email: 'ankit@example.com', players: ['Ankit B.', 'Suraj M.', 'Nikhil V.', 'Rohit G.', 'Tarun P.'], status: 'confirmed', paymentStatus: 'paid', createdAt: '2026-09-15T14:00:00Z' },
  { id: 'REG-0045', tournamentId: 't3', teamName: 'SIDDHARTH A.', captainName: 'Siddharth A.', phone: '9876543214', email: 'siddharth@example.com', players: ['Siddharth A.'], status: 'approved', paymentStatus: 'paid', createdAt: '2026-09-14T16:00:00Z' },
];
