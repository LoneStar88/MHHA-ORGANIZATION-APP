import React from 'react';
import { MOCK_POSTS } from '../constants';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

const Community: React.FC = () => {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-gray-800">Community Hub</h2>
        <p className="text-gray-500">See what others are achieving today.</p>
      </header>

      <div className="space-y-4 max-w-2xl">
        {MOCK_POSTS.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                    <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full bg-gray-200" />
                    <div>
                        <h4 className="font-bold text-gray-900">{post.author}</h4>
                        <p className="text-xs text-gray-400">{post.timeAgo} • <span className="text-teal-600 font-medium">{post.tag}</span></p>
                    </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                    {post.content}
                </p>
                <div className="flex items-center gap-6 border-t border-gray-50 pt-4">
                    <button className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors">
                        <Heart size={18} />
                        <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-teal-600 transition-colors">
                        <MessageCircle size={18} />
                        <span className="text-sm">Comment</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-teal-600 transition-colors ml-auto">
                        <Share2 size={18} />
                    </button>
                </div>
            </div>
        ))}
        
        <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">Join a Squad to see more personalized content!</p>
            <button className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">Find a Group</button>
        </div>
      </div>
    </div>
  );
};

export default Community;