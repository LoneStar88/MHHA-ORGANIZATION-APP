import React, { useState, useEffect } from 'react';
import { JourneyType, DailyContent, JournalEntry } from '../types';
import { generateDailyContent, generateSpeech, playAudio } from '../services/geminiService';
import { BookOpen, CheckCircle, Mic, Play, Edit3, Loader2, Volume2, Save } from 'lucide-react';

interface JourneyViewProps {
  currentJourney: JourneyType;
  setJourney: (j: JourneyType) => void;
  onCompleteLesson: (points: number, reflection: JournalEntry) => void;
}

const JourneyView: React.FC<JourneyViewProps> = ({ currentJourney, setJourney, onCompleteLesson }) => {
  const [content, setContent] = useState<DailyContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [reflection, setReflection] = useState('');
  const [step, setStep] = useState<'SELECT' | 'LEARN' | 'QUIZ' | 'REFLECT' | 'COMPLETE'>('SELECT');
  const [showConfetti, setShowConfetti] = useState(false);

  // Load content if journey is already active (persisted state handled by parent actually, but for simplicity we fetch fresh if not provided)
  // For this demo, we assume selecting a journey triggers a fresh fetch or load from cache.

  const handleStartJourney = async (journey: JourneyType) => {
    setJourney(journey);
    setStep('LEARN');
    setLoading(true);
    
    // Check local storage for today's content to save API calls
    const today = new Date().toDateString();
    const cached = localStorage.getItem(`daily_${journey}_${today}`);
    
    if (cached) {
      setContent(JSON.parse(cached));
      setLoading(false);
    } else {
      const newContent = await generateDailyContent(journey);
      if (newContent) {
        const contentWithId = { ...newContent, id: today, journey };
        setContent(contentWithId);
        localStorage.setItem(`daily_${journey}_${today}`, JSON.stringify(contentWithId));
      }
      setLoading(false);
    }
  };

  const handlePlayAudio = async () => {
    if (!content) return;
    
    if (content.audioBase64) {
      playAudio(content.audioBase64);
      return;
    }

    setAudioLoading(true);
    const audio = await generateSpeech(`${content.fact}. ${content.lesson}`);
    if (audio) {
      playAudio(audio);
      // Update state and cache
      const updatedContent = { ...content, audioBase64: audio };
      setContent(updatedContent);
      const today = new Date().toDateString();
      localStorage.setItem(`daily_${currentJourney}_${today}`, JSON.stringify(updatedContent));
    }
    setAudioLoading(false);
  };

  const handleQuizSubmit = (index: number) => {
    setQuizAnswer(index);
    // Simple logic: wait 1s then move to reflect regardless of right/wrong for flow, 
    // but in real app would block.
    setTimeout(() => {
        setStep('REFLECT');
    }, 1500);
  };

  const handleFinish = () => {
    if (!content) return;
    
    const entry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        journey: currentJourney,
        content: reflection
    };

    onCompleteLesson(500, entry); // Award 500 points
    setStep('COMPLETE');
    setShowConfetti(true);
  };

  if (step === 'SELECT') {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Choose Your Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.values(JourneyType).map((j) => (
            <button
              key={j}
              onClick={() => handleStartJourney(j)}
              className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200 hover:border-teal-500 hover:ring-1 hover:ring-teal-500 transition-all text-left group"
            >
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors">{j}</h3>
              <p className="text-gray-500 mt-2">Daily lessons tailored to improve your {j.toLowerCase()}.</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Loader2 className="animate-spin text-teal-600 mb-4" size={48} />
        <p className="text-gray-600 text-lg">Curating your daily wisdom...</p>
      </div>
    );
  }

  if (step === 'LEARN' && content) {
    return (
      <div className="max-w-2xl mx-auto space-y-8 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center">
             <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-semibold">{currentJourney}</span>
             <span className="text-gray-400 text-sm">{new Date().toLocaleDateString()}</span>
        </div>

        <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 leading-tight">{content.fact}</h2>
            
            <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-video flex items-center justify-center group">
                 <img 
                    src={`https://picsum.photos/800/400?random=${content.id}`} 
                    alt="Topic visualization" 
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                 />
                 <button 
                    onClick={handlePlayAudio}
                    disabled={audioLoading}
                    className="relative z-10 w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform backdrop-blur-sm"
                 >
                    {audioLoading ? <Loader2 className="animate-spin" /> : <Play className="ml-1 text-teal-600" fill="currentColor" />}
                 </button>
            </div>

            <div className="prose prose-teal max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed">{content.lesson}</p>
            </div>
        </div>

        <button 
            onClick={() => setStep('QUIZ')}
            className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
        >
            Take Quick Quiz <BookOpen size={20} />
        </button>
      </div>
    );
  }

  if (step === 'QUIZ' && content) {
    return (
        <div className="max-w-xl mx-auto space-y-8 bg-white p-8 rounded-3xl shadow-sm">
            <h3 className="text-xl font-bold text-center">Knowledge Check</h3>
            <p className="text-lg font-medium text-gray-800">{content.quiz.question}</p>
            
            <div className="space-y-3">
                {content.quiz.options.map((opt, idx) => {
                    let btnClass = "w-full p-4 rounded-xl border-2 text-left transition-all font-medium ";
                    if (quizAnswer === null) {
                        btnClass += "border-gray-100 hover:border-teal-200 hover:bg-teal-50";
                    } else if (idx === content.quiz.correctIndex) {
                        btnClass += "border-green-500 bg-green-50 text-green-700";
                    } else if (quizAnswer === idx) {
                        btnClass += "border-red-500 bg-red-50 text-red-700";
                    } else {
                        btnClass += "border-gray-100 opacity-50";
                    }

                    return (
                        <button
                            key={idx}
                            disabled={quizAnswer !== null}
                            onClick={() => handleQuizSubmit(idx)}
                            className={btnClass}
                        >
                            {opt}
                            {quizAnswer === idx && idx === content.quiz.correctIndex && <CheckCircle className="inline ml-2 text-green-600" size={16}/>}
                        </button>
                    )
                })}
            </div>
        </div>
    )
  }

  if (step === 'REFLECT') {
    return (
        <div className="max-w-xl mx-auto space-y-6 bg-white p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-3 text-teal-600 mb-2">
                <Edit3 size={24} />
                <h3 className="text-xl font-bold">Daily Reflection</h3>
            </div>
            <p className="text-gray-600">How can you apply today's lesson to your life immediately?</p>
            
            <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="I will try to..."
                className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
            />

            <button
                onClick={handleFinish}
                disabled={reflection.length < 5}
                className="w-full bg-teal-600 disabled:bg-gray-300 text-white py-3 rounded-xl font-bold transition-all flex justify-center items-center gap-2"
            >
                <Save size={18} /> Save & Complete
            </button>
        </div>
    )
  }

  if (step === 'COMPLETE') {
    return (
        <div className="max-w-md mx-auto text-center space-y-6 py-12">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={48} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Lesson Complete!</h2>
            <p className="text-gray-500">You earned <span className="font-bold text-amber-500">500 Points</span> and grew your streak.</p>
            
            <button
                onClick={() => setStep('SELECT')} 
                className="bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
                Back to Journey Selection
            </button>
        </div>
    )
  }

  return null;
};

export default JourneyView;