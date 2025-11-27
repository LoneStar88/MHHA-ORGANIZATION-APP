export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  JOURNEY = 'JOURNEY',
  CHALLENGES = 'CHALLENGES', // Weekly Challenges
  QUESTS = 'QUESTS',         // Mini Quests
  JOURNAL = 'JOURNAL',       // Daily Journal & Spirit Zoo
  COMMUNITY = 'COMMUNITY',
  ANALYTICS = 'ANALYTICS',
  DONATIONS = 'DONATIONS',
}

export enum JourneyType {
  SLEEP = 'Better Sleep',
  STRESS = 'Stress Reduction',
  NUTRITION = 'Healthy Eating',
  FITNESS = 'Active Living'
}

export interface UserStats {
  level: number;
  points: number;
  streak: number;
  badges: Badge[];
  donatedAmount: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedDate: string;
}

export interface DailyContent {
  id: string; // date string
  journey: JourneyType;
  fact: string;
  lesson: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
  };
  audioBase64?: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  mood?: string;
  activities?: string[];
  content: string;
  spiritAnimal?: SpiritAnimal;
  journey?: JourneyType;
}

export interface SpiritAnimal {
  name: string;
  symbolism: string;
  traits: string[];
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Legendary';
  imageUrl?: string; // We can use a placeholder or generic image service
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  target: number; // e.g., 7 days
  progress: number;
  reward: number;
  completed: boolean;
}

export interface Quest {
  id: string;
  category: 'Mind & Body' | 'Nutrition' | 'Sleep' | 'Fitness' | 'Learning' | 'Community';
  title: string;
  description: string;
  badgeName: string;
  badgeIcon: string;
  completed: boolean;
}

export interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  timeAgo: string;
  tag: string;
}