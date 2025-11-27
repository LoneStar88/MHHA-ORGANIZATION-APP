import React from 'react';
import { UserStats, ViewState, JourneyType } from '../types';
import { LEVELS } from '../constants';
import { Award, Flame, Star, ArrowRight } from 'lucide-react';

interface DashboardProps {
  stats: UserStats;
  currentJourney: JourneyType;
  setView: (view: ViewState) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, currentJourney, setView }) => {
  const currentLevelData = LEVELS.find(l => l.level === stats.level) || LEVELS[0];
  const nextLevelData = LEVELS.find(l => l.level === stats.level + 1);
  const progressToNext = nextLevelData 
    ? ((stats.points - currentLevelData.minPoints) / (nextLevelData.minPoints - currentLevelData.minPoints)) * 100 
    : 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Hello, Traveler 👋</h2>
          <p className="text-gray-500">Ready to continue your {currentJourney} journey?</p>
        </div>
        <div className="flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full font-bold shadow-sm border border-orange-100">
          <Flame size={20} />
          <span>{stats.streak} Day Streak</span>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <div className="bg-teal-100 p-3 rounded-full text-teal-600 mb-2">
            <Star size={24} />
          </div>
          <span className="text-2xl font-bold text-gray-800">{stats.points}</span>
          <span className="text-xs text-gray-500 uppercase tracking-wide">Total Points</span>
        </div>
        
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <div className="bg-purple-100 p-3 rounded-full text-purple-600 mb-2">
            <Award size={24} />
          </div>
          <span className="text-2xl font-bold text-gray-800">{currentLevelData.title}</span>
          <span className="text-xs text-gray-500 uppercase tracking-wide">Level {stats.level}</span>
        </div>

        <div className="col-span-2 bg-gradient-to-r from-teal-500 to-emerald-500 p-4 rounded-2xl shadow-lg text-white flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold text-lg">Next Milestone</h3>
                    <p className="text-teal-100 text-sm">{nextLevelData ? `${nextLevelData.minPoints - stats.points} pts to Level ${stats.level + 1}` : 'Max Level Reached'}</p>
                </div>
                <TrophyIcon className="text-teal-200 opacity-50" />
            </div>
            <div className="mt-4">
                <div className="w-full bg-black/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full transition-all duration-1000" style={{ width: `${progressToNext}%` }}></div>
                </div>
            </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <button 
          onClick={() => setView(ViewState.JOURNEY)}
          className="group relative overflow-hidden bg-white p-6 rounded-2xl shadow-sm border border-teal-100 hover:shadow-md transition-all text-left"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
          <h3 className="text-xl font-bold text-gray-800 mb-2 relative z-10">Daily Lesson</h3>
          <p className="text-gray-500 mb-4 relative z-10">Continue your path in {currentJourney}. Today's content is ready.</p>
          <div className="flex items-center text-teal-600 font-semibold relative z-10 group-hover:gap-2 transition-all">
            Start Learning <ArrowRight size={18} className="ml-1" />
          </div>
        </button>

        <button 
          onClick={() => setView(ViewState.CHALLENGES)}
          className="group relative overflow-hidden bg-white p-6 rounded-2xl shadow-sm border border-purple-100 hover:shadow-md transition-all text-left"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
          <h3 className="text-xl font-bold text-gray-800 mb-2 relative z-10">Active Challenges</h3>
          <p className="text-gray-500 mb-4 relative z-10">Check your progress on weekly goals and earn badges.</p>
          <div className="flex items-center text-purple-600 font-semibold relative z-10 group-hover:gap-2 transition-all">
            View Challenges <ArrowRight size={18} className="ml-1" />
          </div>
        </button>
      </div>

      {/* Recent Badges */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Your Trophy Case</h3>
        <div className="flex gap-4 overflow-x-auto pb-2">
            {stats.badges.map((badge) => (
                <div key={badge.id} className="flex-shrink-0 flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl w-24 border border-gray-100">
                    <div className="text-3xl">{badge.icon}</div>
                    <span className="text-xs text-center font-medium text-gray-600 truncate w-full">{badge.name}</span>
                </div>
            ))}
            {stats.badges.length === 0 && <p className="text-gray-400 italic">No badges earned yet. Keep going!</p>}
        </div>
      </div>
    </div>
  );
};

const TrophyIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
)

export default Dashboard;