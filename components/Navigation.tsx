import React from 'react';
import { ViewState } from '../types';
import { Home, Map, Trophy, Users, BarChart2, Heart, ScrollText, Target } from 'lucide-react';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const MhhaLogo = () => (
    <svg width="32" height="32" viewBox="0 0 100 100" className="flex-shrink-0" aria-label="MHHA Logo">
        <path d="M50 90 C10 60 0 35 0 20 C0 10 10 0 25 0 C35 0 45 10 50 20 C55 10 65 0 75 0 C90 0 100 10 100 20 C100 35 90 60 50 90 Z" fill="#EF4444" />
        <circle cx="50" cy="40" r="20" fill="#0EA5E9" />
        <path d="M50 20 Q65 20 68 35 M50 60 Q35 60 32 45 M30 40 L70 40 M40 25 L60 55" stroke="white" strokeWidth="2" fill="none" opacity="0.8" />
    </svg>
);

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { view: ViewState.DASHBOARD, label: 'Home', icon: Home },
    { view: ViewState.JOURNEY, label: 'Journey', icon: Map },
    { view: ViewState.QUESTS, label: 'Mini Quests', icon: Target },
    { view: ViewState.JOURNAL, label: 'Journal & Zoo', icon: ScrollText },
    { view: ViewState.CHALLENGES, label: 'Challenges', icon: Trophy },
    { view: ViewState.COMMUNITY, label: 'Community', icon: Users },
    { view: ViewState.ANALYTICS, label: 'Analytics', icon: BarChart2 },
    { view: ViewState.DONATIONS, label: 'Donate', icon: Heart },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-teal-100 h-screen fixed left-0 top-0 z-20 shadow-sm overflow-y-auto">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-teal-600 flex items-center gap-2">
            <MhhaLogo />
            VitalPath
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-2 pb-6">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => setView(item.view)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                currentView === item.view
                  ? 'bg-teal-50 text-teal-700 font-semibold shadow-sm ring-1 ring-teal-200'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-teal-100 bg-gray-50">
           <div className="flex items-center gap-2 mb-2">
               <MhhaLogo />
               <span className="text-xs font-bold text-gray-500">MHHA Certified</span>
           </div>
          <p className="text-[10px] text-gray-400">VitalPath v2.0</p>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 flex justify-around p-2 pb-safe overflow-x-auto">
        {navItems.slice(0, 5).map((item) => (
          <button
            key={item.view}
            onClick={() => setView(item.view)}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg min-w-[60px] ${
              currentView === item.view ? 'text-teal-600' : 'text-gray-400'
            }`}
          >
            <item.icon size={20} />
            <span className="text-[10px] font-medium truncate w-full text-center">{item.label}</span>
          </button>
        ))}
         <button
            onClick={() => setView(ViewState.ANALYTICS)}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg min-w-[60px] ${
              currentView === ViewState.ANALYTICS ? 'text-teal-600' : 'text-gray-400'
            }`}
          >
            <BarChart2 size={20} />
            <span className="text-[10px] font-medium truncate w-full text-center">Stats</span>
          </button>
      </div>
    </>
  );
};

export default Navigation;