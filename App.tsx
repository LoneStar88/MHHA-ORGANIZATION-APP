import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import JourneyView from './components/JourneyView';
import Challenges from './components/Challenges';
import MiniQuests from './components/MiniQuests';
import Journal from './components/Journal';
import Community from './components/Community';
import Analytics from './components/Analytics';
import Donations from './components/Donations';
import { ViewState, UserStats, JourneyType, Challenge, JournalEntry, Quest } from './types';
import { INITIAL_BADGES, MOCK_CHALLENGES, MOCK_QUESTS } from './constants';

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewState>(ViewState.DASHBOARD);
  
  // App State
  const [stats, setStats] = useState<UserStats>({
    level: 1,
    points: 0,
    streak: 3,
    badges: INITIAL_BADGES,
    donatedAmount: 0
  });

  const [currentJourney, setCurrentJourney] = useState<JourneyType>(JourneyType.SLEEP);
  const [challenges, setChallenges] = useState<Challenge[]>(MOCK_CHALLENGES);
  const [quests, setQuests] = useState<Quest[]>(MOCK_QUESTS);
  const [journal, setJournal] = useState<JournalEntry[]>([]);

  // Calculate Level based on points (simple logic for now)
  useEffect(() => {
    let newLevel = 1;
    if (stats.points >= 10000) newLevel = 5;
    else if (stats.points >= 6000) newLevel = 4;
    else if (stats.points >= 3000) newLevel = 3;
    else if (stats.points >= 1000) newLevel = 2;
    
    if (newLevel !== stats.level) {
      setStats(prev => ({ ...prev, level: newLevel }));
      // In a real app, trigger a "Level Up" modal here
    }
  }, [stats.points, stats.level]);

  const toggleChallenge = (id: string) => {
    setChallenges(prev => prev.map(c => {
      if (c.id === id && !c.completed) {
        // Mock progress increment
        const newProgress = c.progress + 1;
        const isCompleted = newProgress >= c.target;
        
        if (isCompleted) {
           setStats(s => ({ ...s, points: s.points + c.reward }));
        }

        return { ...c, progress: newProgress, completed: isCompleted };
      }
      return c;
    }));
  };

  const toggleQuest = (id: string) => {
    setQuests(prev => prev.map(q => {
        if (q.id === id && !q.completed) {
            setStats(s => ({ 
                ...s, 
                points: s.points + 150,
                badges: [...s.badges, {
                    id: `badge-${q.id}`,
                    name: q.badgeName,
                    icon: q.badgeIcon,
                    description: `Completed ${q.title}`,
                    earnedDate: new Date().toISOString()
                }]
            }));
            return { ...q, completed: true };
        }
        return q;
    }));
  };

  const handleCompleteLesson = (earnedPoints: number, entry: JournalEntry) => {
    setStats(s => ({ 
        ...s, 
        points: s.points + earnedPoints,
        streak: s.streak + 1 // Simply increment streak for demo
    }));
    // We don't add to main journal here for simplicity of the prompt separation, but we could.
    // setJournal(prev => [entry, ...prev]); 
  };

  const handleAddJournalEntry = (entry: JournalEntry) => {
      setJournal(prev => [entry, ...prev]);
      setStats(s => ({ ...s, points: s.points + 50 })); // Small reward for journaling
  };

  const renderView = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard stats={stats} currentJourney={currentJourney} setView={setView} />;
      case ViewState.JOURNEY:
        return (
          <JourneyView 
            currentJourney={currentJourney} 
            setJourney={setCurrentJourney}
            onCompleteLesson={handleCompleteLesson}
          />
        );
      case ViewState.CHALLENGES:
        return <Challenges challenges={challenges} toggleChallenge={toggleChallenge} />;
      case ViewState.QUESTS:
        return <MiniQuests quests={quests} onToggleQuest={toggleQuest} />;
      case ViewState.JOURNAL:
        return <Journal history={journal} onAddEntry={handleAddJournalEntry} />;
      case ViewState.COMMUNITY:
        return <Community />;
      case ViewState.ANALYTICS:
        return <Analytics />;
      case ViewState.DONATIONS:
        return <Donations />;
      default:
        return <Dashboard stats={stats} currentJourney={currentJourney} setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Navigation currentView={currentView} setView={setView} />
      
      <main className="md:ml-64 p-4 md:p-8 pb-24 md:pb-8 max-w-7xl mx-auto">
        {renderView()}
      </main>
    </div>
  );
};

export default App;