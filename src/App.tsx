import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import InterviewerDashboard from './pages/InterviewerDashboard';
import IntervieweeDashboard from './pages/IntervieweeDashboard';
import Meeting from './pages/Meeting';
import InterviewerFeedback from './pages/InterviewerFeedback';
import PlatformFeedback from './pages/PlatformFeedback';

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const user = useAuthStore((state) => state.user);
  
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interviewer"
          element={
            <ProtectedRoute allowedRoles={['interviewer']}>
              <InterviewerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interviewer/feedback"
          element={
            <ProtectedRoute allowedRoles={['interviewer']}>
              <InterviewerFeedback />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interviewee"
          element={
            <ProtectedRoute allowedRoles={['interviewee']}>
              <IntervieweeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interviewee/platform-feedback"
          element={
            <ProtectedRoute allowedRoles={['interviewee']}>
              <PlatformFeedback />
            </ProtectedRoute>
          }
        />
        <Route
          path="/meeting/:meetingId"
          element={
            <ProtectedRoute allowedRoles={['interviewer', 'interviewee']}>
              <Meeting />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;