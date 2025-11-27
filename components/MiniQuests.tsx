import React, { useState } from 'react';
import { Quest } from '../types';
import { CheckCircle2, Circle, Lock, Star } from 'lucide-react';

interface MiniQuestsProps {
  quests: Quest[];
  onToggleQuest: (id: string) => void;
}

const CATEGORIES = ['Mind & Body', 'Nutrition', 'Sleep', 'Fitness', 'Learning', 'Community'];

const MiniQuests: React.FC<MiniQuestsProps> = ({ quests, onToggleQuest }) => {
  const [activeCategory, setActiveCategory] = useState('Mind & Body');

  const filteredQuests = quests.filter(q => q.category === activeCategory);

  return (
    <div className="space-y-6 animate-fade-in">
      <header>
        <h2 className="text-2xl font-bold text-gray-800">Mini Quests</h2>
        <p className="text-gray-500">Bite-sized challenges to level up your life.</p>
      </header>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map(cat => (
            <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
                    activeCategory === cat 
                    ? 'bg-teal-600 text-white shadow-md' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
            >
                {cat}
            </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredQuests.map((quest) => (
            <div 
                key={quest.id} 
                className={`relative group bg-white p-6 rounded-2xl border-2 transition-all ${
                    quest.completed ? 'border-green-400 bg-green-50' : 'border-gray-100 hover:border-teal-200'
                }`}
            >
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">{quest.badgeIcon}</span>
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{quest.category}</span>
                        </div>
                        <h3 className="font-bold text-lg text-gray-900">{quest.title}</h3>
                        <p className="text-sm text-gray-500 mt-1 mb-4">{quest.description}</p>
                        
                        {quest.completed && (
                            <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">
                                Badge Earned: {quest.badgeName}
                            </div>
                        )}
                    </div>

                    <button 
                        onClick={() => onToggleQuest(quest.id)}
                        className={`p-2 rounded-full transition-all ${
                            quest.completed ? 'text-green-500' : 'text-gray-300 hover:bg-gray-100'
                        }`}
                    >
                        {quest.completed ? <CheckCircle2 size={32} fill="currentColor" className="text-white" /> : <Circle size={32} />}
                    </button>
                </div>
            </div>
        ))}
        {filteredQuests.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-400 bg-gray-50 rounded-2xl border-dashed border-2 border-gray-200">
                <Lock className="mx-auto mb-2 opacity-50" size={32} />
                <p>More quests coming soon for {activeCategory}!</p>
            </div>
        )}
      </div>

      <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-6 text-white flex items-center justify-between">
            <div>
                <h3 className="font-bold text-lg flex items-center gap-2"><Star className="text-yellow-300 fill-current" /> Mystery Reward</h3>
                <p className="text-indigo-100 text-sm">Complete 5 quests in a week to unlock a secret mini-game!</p>
            </div>
            <div className="h-12 w-12 rounded-full border-4 border-indigo-300 flex items-center justify-center font-bold">
                2/5
            </div>
      </div>
    </div>
  );
};

export default MiniQuests;