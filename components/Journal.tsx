import React, { useState } from 'react';
import { JournalEntry, SpiritAnimal } from '../types';
import { MOODS, ACTIVITIES } from '../constants';
import { analyzeJournalEntry } from '../services/geminiService';
import { Book, Send, Loader2, Sparkles, Calendar, Wind } from 'lucide-react';

interface JournalProps {
  history: JournalEntry[];
  onAddEntry: (entry: JournalEntry) => void;
}

const Journal: React.FC<JournalProps> = ({ history, onAddEntry }) => {
  const [step, setStep] = useState<'INPUT' | 'ANALYZING' | 'RESULT'>('INPUT');
  const [mood, setMood] = useState<string>('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [reflection, setReflection] = useState('');
  const [currentAnimal, setCurrentAnimal] = useState<SpiritAnimal | null>(null);

  const toggleActivity = (act: string) => {
    if (selectedActivities.includes(act)) {
      setSelectedActivities(prev => prev.filter(a => a !== act));
    } else {
      setSelectedActivities(prev => [...prev, act]);
    }
  };

  const handleAnalyze = async () => {
    if (!mood || !reflection) return;
    setStep('ANALYZING');
    
    const animal = await analyzeJournalEntry(mood, selectedActivities, reflection);
    setCurrentAnimal(animal);
    
    const newEntry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        mood,
        activities: selectedActivities,
        content: reflection,
        spiritAnimal: animal
    };
    
    onAddEntry(newEntry);
    setStep('RESULT');
  };

  const resetForm = () => {
      setMood('');
      setSelectedActivities([]);
      setReflection('');
      setStep('INPUT');
  };

  if (step === 'INPUT') {
    return (
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
        <header>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Book className="text-teal-600" /> Daily Reflection
            </h2>
            <p className="text-gray-500">Log your day and discover your spirit animal.</p>
        </header>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            {/* Moods */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">How did you feel today?</label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {MOODS.map(m => (
                        <button
                            key={m.label}
                            onClick={() => setMood(m.label)}
                            className={`flex flex-col items-center p-3 rounded-2xl min-w-[70px] border transition-all ${
                                mood === m.label 
                                ? 'bg-teal-50 border-teal-500 ring-1 ring-teal-500' 
                                : 'bg-gray-50 border-transparent hover:bg-gray-100'
                            }`}
                        >
                            <span className="text-2xl mb-1">{m.emoji}</span>
                            <span className="text-xs font-medium text-gray-600">{m.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Activities */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">What did you do?</label>
                <div className="flex flex-wrap gap-2">
                    {ACTIVITIES.map(act => (
                        <button
                            key={act}
                            onClick={() => toggleActivity(act)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                selectedActivities.includes(act)
                                ? 'bg-indigo-100 text-indigo-700'
                                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                            }`}
                        >
                            {act}
                        </button>
                    ))}
                </div>
            </div>

            {/* Reflection */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Thoughts & Feelings</label>
                <textarea
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    placeholder="Today I felt..."
                    className="w-full h-32 p-4 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-teal-500 resize-none"
                />
            </div>

            <button
                onClick={handleAnalyze}
                disabled={!mood || reflection.length < 5}
                className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-gray-800 transition-all"
            >
                <Sparkles size={18} /> Analyze Day & Reveal Animal
            </button>
        </div>
        
        {/* History Teaser */}
        {history.length > 0 && (
            <div className="pt-8 border-t">
                <h3 className="font-bold text-gray-700 mb-4">Recent Spirit Animals</h3>
                <div className="flex gap-4 overflow-x-auto">
                    {history.slice(0, 5).map(entry => (
                        <div key={entry.id} className="flex-shrink-0 w-24 text-center">
                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center text-3xl shadow-sm mb-2">
                                {entry.spiritAnimal?.name === 'Dolphin' ? '🐬' : entry.spiritAnimal?.name === 'Owl' ? '🦉' : '🐾'}
                            </div>
                            <span className="text-xs font-bold text-gray-600 block">{entry.spiritAnimal?.name}</span>
                            <span className="text-[10px] text-gray-400">{new Date(entry.date).toLocaleDateString(undefined, {weekday: 'short'})}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    );
  }

  if (step === 'ANALYZING') {
      return (
          <div className="h-96 flex flex-col items-center justify-center text-center px-6">
              <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                  <Wind className="text-teal-500 animate-spin-slow" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Consulting the Spirits...</h3>
              <p className="text-gray-500">Connecting your mood "{mood}" with nature's wisdom.</p>
          </div>
      )
  }

  return (
    <div className="max-w-md mx-auto animate-fade-in text-center py-8">
        <h2 className="text-xl font-medium text-gray-500 mb-6">Your Spirit Animal for Today</h2>
        
        <div className="relative group perspective-1000 mb-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-teal-100 relative overflow-hidden">
                <div className={`absolute top-0 right-0 px-4 py-2 rounded-bl-2xl text-xs font-bold uppercase tracking-wider text-white
                    ${currentAnimal?.rarity === 'Legendary' ? 'bg-yellow-500' : currentAnimal?.rarity === 'Rare' ? 'bg-purple-500' : 'bg-teal-500'}
                `}>
                    {currentAnimal?.rarity}
                </div>
                
                <div className="w-40 h-40 mx-auto bg-gradient-to-tr from-teal-200 to-blue-200 rounded-full flex items-center justify-center text-8xl mb-6 shadow-inner">
                   {/* Fallback emojis based on name for demo, real app would use images */}
                   {currentAnimal?.name.includes('Dolphin') ? '🐬' : 
                    currentAnimal?.name.includes('Owl') ? '🦉' : 
                    currentAnimal?.name.includes('Lion') ? '🦁' : 
                    currentAnimal?.name.includes('Bear') ? '🐻' : '🦊'}
                </div>

                <h1 className="text-3xl font-extrabold text-gray-800 mb-2">{currentAnimal?.name}</h1>
                <div className="flex justify-center gap-2 mb-6">
                    {currentAnimal?.traits.map(t => (
                        <span key={t} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">{t}</span>
                    ))}
                </div>

                <p className="text-gray-600 leading-relaxed italic">
                    "{currentAnimal?.symbolism}"
                </p>
            </div>
        </div>

        <button 
            onClick={resetForm}
            className="text-teal-600 font-bold hover:underline"
        >
            Write another entry
        </button>
    </div>
  );
};

export default Journal;