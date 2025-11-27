import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';

const WEEKLY_DATA = [
  { name: 'Mon', score: 400 },
  { name: 'Tue', score: 300 },
  { name: 'Wed', score: 600 },
  { name: 'Thu', score: 200 },
  { name: 'Fri', score: 500 },
  { name: 'Sat', score: 700 },
  { name: 'Sun', score: 450 },
];

const FOCUS_DATA = [
  { subject: 'Sleep', A: 120, fullMark: 150 },
  { subject: 'Nutrition', A: 98, fullMark: 150 },
  { subject: 'Movement', A: 86, fullMark: 150 },
  { subject: 'Stress', A: 99, fullMark: 150 },
  { subject: 'Social', A: 85, fullMark: 150 },
];

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-gray-800">Your Insights</h2>
        <p className="text-gray-500">Track your growth and identify trends.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-700 mb-6">Weekly Activity Points</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={WEEKLY_DATA}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <YAxis hide />
                        <Tooltip 
                            cursor={{fill: '#f0fdfa'}}
                            contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                        />
                        <Bar dataKey="score" fill="#0d9488" radius={[4, 4, 4, 4]} barSize={32} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Focus Area Radar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-700 mb-2">Health Balance</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={FOCUS_DATA}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 12}} />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} hide />
                        <Radar
                            name="Focus"
                            dataKey="A"
                            stroke="#0d9488"
                            fill="#0d9488"
                            fillOpacity={0.6}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>

      <div className="bg-teal-900 text-teal-100 p-6 rounded-2xl">
          <h4 className="font-bold text-white text-lg mb-2">AI Insight</h4>
          <p>You've focused heavily on <span className="font-bold text-white">Sleep</span> this week. Consider balancing your routine with more <span className="font-bold text-white">Movement</span> activities to boost your energy levels during the day.</p>
      </div>
    </div>
  );
};

export default Analytics;