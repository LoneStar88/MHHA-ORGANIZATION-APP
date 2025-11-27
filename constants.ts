import { Badge, Challenge, CommunityPost, Quest } from "./types";

export const INITIAL_BADGES: Badge[] = [
  {
    id: '1',
    name: 'Newcomer',
    icon: '🌱',
    description: 'Joined VitalPath',
    earnedDate: new Date().toISOString()
  }
];

export const MOCK_CHALLENGES: Challenge[] = [
  {
    id: 'c1',
    title: 'Hydration Hero',
    description: 'Drink 8 glasses of water daily for 7 days.',
    target: 7,
    progress: 3,
    reward: 500,
    completed: false
  },
  {
    id: 'c2',
    title: 'Zen Master',
    description: 'Meditate for 10 minutes for 3 days.',
    target: 3,
    progress: 1,
    reward: 300,
    completed: false
  },
  {
    id: 'c3',
    title: 'Step Up',
    description: 'Walk 10,000 steps today.',
    target: 1,
    progress: 0,
    reward: 100,
    completed: false
  }
];

export const MOCK_QUESTS: Quest[] = [
  // Mind & Body
  { id: 'q1', category: 'Mind & Body', title: 'Mindfulness Minute', description: 'Practice 1 minute of mindful breathing.', badgeName: 'Calm Mind', badgeIcon: '🧘', completed: false },
  { id: 'q2', category: 'Mind & Body', title: 'Gratitude Journal', description: 'Write down one thing you are grateful for.', badgeName: 'Grateful Heart', badgeIcon: '🙏', completed: false },
  
  // Nutrition
  { id: 'q3', category: 'Nutrition', title: 'Colorful Plate', description: 'Eat at least 3 different colors of food today.', badgeName: 'Rainbow Eater', badgeIcon: '🥗', completed: false },
  { id: 'q4', category: 'Nutrition', title: 'Sugar Swap', description: 'Replace one sugary snack with fruit.', badgeName: 'Sweet Nature', badgeIcon: '🍎', completed: false },

  // Sleep
  { id: 'q5', category: 'Sleep', title: 'Digital Detox', description: 'No screens 30 minutes before bed.', badgeName: 'Unplugged', badgeIcon: '📵', completed: false },
  { id: 'q6', category: 'Sleep', title: 'Dream Recall', description: 'Write down a dream immediately upon waking.', badgeName: 'Dream Catcher', badgeIcon: '🌙', completed: false },

  // Fitness
  { id: 'q7', category: 'Fitness', title: 'Stretch Break', description: 'Do 5 minutes of stretching.', badgeName: 'Flexible', badgeIcon: '🤸', completed: false },
  { id: 'q8', category: 'Fitness', title: 'Micro-Workout', description: 'Complete 20 squats.', badgeName: 'Power Up', badgeIcon: '⚡', completed: false },

  // Learning
  { id: 'q9', category: 'Learning', title: 'Skill Sampler', description: 'Try a tongue twister or juggle for 5 mins.', badgeName: 'Curious Cat', badgeIcon: '🧠', completed: false },

  // Community
  { id: 'q10', category: 'Community', title: 'Kindness Act', description: 'Send a nice message to a friend.', badgeName: 'Kind Soul', badgeIcon: '💌', completed: false },
];

export const MOCK_POSTS: CommunityPost[] = [
  {
    id: 'p1',
    author: 'Sarah Jenkins',
    avatar: 'https://picsum.photos/seed/sarah/50/50',
    content: 'Just finished my 7-day sleep challenge! I feel so much more rested.',
    likes: 24,
    timeAgo: '2h ago',
    tag: 'Sleep Squad'
  },
  {
    id: 'p2',
    author: 'Mike Ross',
    avatar: 'https://picsum.photos/seed/mike/50/50',
    content: 'Did you know almonds are great for reducing stress? Learned that in today\'s journey.',
    likes: 15,
    timeAgo: '5h ago',
    tag: 'Nutrition'
  }
];

export const LEVELS = [
  { level: 1, minPoints: 0, title: 'Novice' },
  { level: 2, minPoints: 1000, title: 'Apprentice' },
  { level: 3, minPoints: 3000, title: 'Seeker' },
  { level: 4, minPoints: 6000, title: 'Guide' },
  { level: 5, minPoints: 10000, title: 'Master' },
];

export const MOODS = [
  { label: 'Happy', emoji: '😊' },
  { label: 'Calm', emoji: '😌' },
  { label: 'Energetic', emoji: '⚡' },
  { label: 'Tired', emoji: '😴' },
  { label: 'Stressed', emoji: '😫' },
  { label: 'Focused', emoji: '🧐' }
];

export const ACTIVITIES = [
  'Work', 'Exercise', 'Socializing', 'Rest', 'Hobbies', 'Chores', 'Nature'
];