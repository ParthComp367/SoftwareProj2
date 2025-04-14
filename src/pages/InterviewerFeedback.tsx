import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useFeedbackStore } from '../store/feedbackStore';
import { Star, Send } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

export default function InterviewerFeedback() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const addFeedback = useFeedbackStore((state) => state.addFeedback);
  const { isDarkMode } = useThemeStore();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const { intervieweeId, intervieweeName, isDirectFeedback } = location.state || {};

  const getFeedbackColor = (rating: number) => {
    if (rating <= 2) return 'text-red-400';
    if (rating === 3) return 'text-yellow-400';
    return 'text-green-400';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !intervieweeId) return;

    const newFeedback = {
      id: String(Date.now()),
      interviewer_id: user.id,
      interviewer_name: user.full_name,
      interviewee_id: intervieweeId,
      interviewee_name: intervieweeName,
      content: feedback,
      rating,
      created_at: new Date().toISOString(),
    };

    addFeedback(newFeedback);
    navigate('/interviewer');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6`}>
            {isDirectFeedback ? 'Direct Feedback' : 'Interview Feedback'} for {intervieweeName}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={`block ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} font-semibold mb-2`}>
                Rating
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`p-1 ${star <= rating ? getFeedbackColor(rating) : isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}
                  >
                    <Star size={24} fill={star <= rating ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={`block ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} font-semibold mb-2`}>
                Detailed Feedback
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className={`w-full h-40 p-3 border rounded-md ${
                  isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900'
                }`}
                placeholder="Please provide detailed feedback about the candidate's performance..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Send size={20} />
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}