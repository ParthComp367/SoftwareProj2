import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

export default function PlatformFeedback() {
  const location = useLocation();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({
    technicalIssues: '',
    platformExperience: '',
    suggestions: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would submit the platform feedback
    console.log('Platform feedback submitted:', feedback);
    navigate('/interviewee');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="text-blue-600" size={32} />
            <h2 className="text-2xl font-bold text-gray-800">
              Platform Feedback
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Did you encounter any technical issues?
              </label>
              <textarea
                value={feedback.technicalIssues}
                onChange={(e) => setFeedback({
                  ...feedback,
                  technicalIssues: e.target.value
                })}
                className="w-full h-24 p-3 border rounded-md"
                placeholder="Please describe any technical issues you experienced..."
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                How was your overall experience with the platform?
              </label>
              <textarea
                value={feedback.platformExperience}
                onChange={(e) => setFeedback({
                  ...feedback,
                  platformExperience: e.target.value
                })}
                className="w-full h-24 p-3 border rounded-md"
                placeholder="Share your thoughts about the interview platform..."
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Do you have any suggestions for improvement?
              </label>
              <textarea
                value={feedback.suggestions}
                onChange={(e) => setFeedback({
                  ...feedback,
                  suggestions: e.target.value
                })}
                className="w-full h-24 p-3 border rounded-md"
                placeholder="What features or improvements would you like to see?"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}