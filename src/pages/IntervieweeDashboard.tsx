import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { dummyFeedback, dummyMeetings } from '../lib/dummyData';
import { useNavigate } from 'react-router-dom';
import { Video, MessageSquare, Sun, Moon } from 'lucide-react';
import Calendar from '../components/Calendar';

export default function IntervieweeDashboard() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { isDarkMode, toggleTheme } = useThemeStore();
  const signOut = useAuthStore((state) => state.signOut);
  const feedbacks = dummyFeedback.filter(f => f.interviewee_id === user?.id);
  const [meetingId, setMeetingId] = useState('');
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const joinMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (meetingId.trim()) {
      navigate(`/meeting/${meetingId}`);
    }
  };

  const handleMeetingClick = (meeting) => {
    setSelectedMeeting(meeting);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md p-4`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Interviewee Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              Welcome, {user?.full_name}
            </span>
            <button
              onClick={() => signOut()}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4">
        <div className="mb-8">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
            <div className="flex items-center gap-3 mb-4">
              <Video className="text-blue-600" size={24} />
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Join Interview
              </h2>
            </div>
            <form onSubmit={joinMeeting} className="flex gap-4">
              <input
                type="text"
                value={meetingId}
                onChange={(e) => setMeetingId(e.target.value)}
                placeholder="Enter meeting ID"
                className="flex-1 p-2 border rounded-md"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Video size={20} />
                Join Meeting
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="text-blue-600" size={24} />
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Your Feedback
                </h2>
              </div>
              <div className="space-y-4">
                {feedbacks.map((feedback) => (
                  <div key={feedback.id} className={`border-b pb-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">From: {feedback.interviewer_name}</p>
                        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                          {new Date(feedback.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Rating: {feedback.rating}/5
                      </span>
                    </div>
                    <p className="mt-2 text-gray-700">{feedback.content}</p>
                  </div>
                ))}
                {feedbacks.length === 0 && (
                  <p className={`text-center py-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    No feedback received yet.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <Calendar 
              meetings={dummyMeetings.filter(m => m.interviewee === user?.full_name)}
              onEventClick={handleMeetingClick}
            />
            {selectedMeeting && (
              <div className={`mt-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-md`}>
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Meeting Details
                </h3>
                <div className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <p><strong>Title:</strong> {selectedMeeting.title}</p>
                  <p><strong>Interviewer:</strong> {selectedMeeting.interviewer}</p>
                  <p><strong>Company:</strong> {selectedMeeting.company}</p>
                  <p><strong>Position:</strong> {selectedMeeting.position}</p>
                  <p><strong>Time:</strong> {new Date(selectedMeeting.start).toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}