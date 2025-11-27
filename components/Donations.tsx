import React, { useState, useEffect } from 'react';
import { generateImpactReport } from '../services/geminiService';
import { Heart, CreditCard, Sparkles, Loader2 } from 'lucide-react';

const Donations: React.FC = () => {
  const [amount, setAmount] = useState<number>(25);
  const [impactText, setImpactText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [donated, setDonated] = useState(false);

  useEffect(() => {
    const fetchImpact = async () => {
        setLoading(true);
        const text = await generateImpactReport(amount);
        setImpactText(text);
        setLoading(false);
    };

    // Debounce the API call
    const timer = setTimeout(() => {
        fetchImpact();
    }, 800);

    return () => clearTimeout(timer);
  }, [amount]);

  const handleDonate = () => {
      setDonated(true);
      setTimeout(() => setDonated(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <header className="text-center">
        <div className="inline-block p-3 bg-red-100 rounded-full text-red-500 mb-4">
            <Heart size={32} fill="currentColor" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Make an Impact</h2>
        <p className="text-gray-500 mt-2">Your contribution directly supports health education workshops.</p>
      </header>

      <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-4">Select Donation Amount</label>
          <div className="grid grid-cols-3 gap-4 mb-8">
              {[10, 25, 50, 100].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className={`py-3 rounded-xl font-bold transition-all ${
                        amount === val 
                        ? 'bg-teal-600 text-white shadow-md transform scale-105' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                      ${val}
                  </button>
              ))}
          </div>

          <div className="bg-indigo-50 p-6 rounded-2xl mb-8 relative overflow-hidden">
              <Sparkles className="absolute top-4 right-4 text-indigo-200" size={40} />
              <h4 className="font-semibold text-indigo-900 mb-2">Your Potential Impact</h4>
              {loading ? (
                  <div className="flex items-center gap-2 text-indigo-600/50">
                      <Loader2 className="animate-spin" size={18} /> Calculating impact...
                  </div>
              ) : (
                  <p className="text-indigo-700 text-lg leading-relaxed font-medium">
                      "{impactText}"
                  </p>
              )}
          </div>

          <button 
            onClick={handleDonate}
            disabled={loading || donated}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                donated 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-900 text-white hover:bg-gray-800 shadow-xl shadow-gray-200'
            }`}
          >
            {donated ? 'Thank You!' : <><CreditCard size={20} /> Donate ${amount}</>}
          </button>
          
          <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
             <span className="w-2 h-2 bg-green-500 rounded-full"></span> Secure SSL Payment
          </p>
      </div>

      <div className="text-center">
          <h4 className="font-bold text-gray-700 mb-4">Top Contributors This Month</h4>
          <div className="flex justify-center gap-2">
               {[1,2,3].map((i) => (
                   <img key={i} src={`https://picsum.photos/seed/${i * 45}/40/40`} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="donor" />
               ))}
               <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500 font-bold border-2 border-white">+124</div>
          </div>
      </div>
    </div>
  );
};

export default Donations;