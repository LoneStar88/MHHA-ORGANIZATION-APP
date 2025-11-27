import React from 'react';
import { Challenge } from '../types';
import { Circle, CheckCircle2, Trophy } from 'lucide-react';

interface ChallengesProps {
  challenges: Challenge[];
  toggleChallenge: (id: string) => void;
}

const Challenges: React.FC<ChallengesProps> = ({ challenges, toggleChallenge }) => {
  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Weekly Challenges</h2>
            <p className="text-gray-500">Push your limits and earn bonus rewards.</p>
          </div>
      </header>

      <div className="grid gap-4">
        {challenges.map((challenge) => (
          <div 
            key={challenge.id} 
            className={`bg-white p-5 rounded-2xl border transition-all ${
                challenge.completed 
                ? 'border-green-200 bg-green-50/50' 
                : 'border-gray-100 hover:border-teal-200 shadow-sm'
            }`}
          >
            <div className="flex items-start gap-4">
                <button 
                    onClick={() => toggleChallenge(challenge.id)}
                    className={`mt-1 flex-shrink-0 transition-colors ${challenge.completed ? 'text-green-500' : 'text-gray-300 hover:text-teal-500'}`}
                >
                    {challenge.completed ? <CheckCircle2 size={28} fill="currentColor" className="text-green-100" /> : <Circle size={28} />}
                </button>
                
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h3 className={`font-bold text-lg ${challenge.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                            {challenge.title}
                        </h3>
                        <div className="flex items-center gap-1 text-amber-500 text-sm font-semibold bg-amber-50 px-2 py-1 rounded-md">
                            <Trophy size={14} /> +{challenge.reward}
                        </div>
                    </div>
                    <p className={`text-sm mt-1 ${challenge.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                        {challenge.description}
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="mt-4 flex items-center gap-3">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full ${challenge.completed ? 'bg-green-500' : 'bg-teal-500'}`} 
                                style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                            ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-500">
                            {challenge.progress}/{challenge.target}
                        </span>
                    </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challenges;