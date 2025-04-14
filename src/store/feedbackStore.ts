import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Feedback, dummyFeedback } from '../lib/dummyData';

interface FeedbackState {
  feedbacks: Feedback[];
  addFeedback: (feedback: Feedback) => void;
  getFeedbacksByUser: (userId: string, role: 'interviewer' | 'interviewee') => Feedback[];
}

export const useFeedbackStore = create<FeedbackState>()(
  persist(
    (set, get) => ({
      feedbacks: [...dummyFeedback],
      addFeedback: (feedback) => {
        set((state) => ({
          feedbacks: [feedback, ...state.feedbacks],
        }));
      },
      getFeedbacksByUser: (userId, role) => {
        const state = get();
        return state.feedbacks.filter((feedback) =>
          role === 'interviewer'
            ? feedback.interviewer_id === userId
            : feedback.interviewee_id === userId
        );
      },
    }),
    {
      name: 'feedback-storage',
    }
  )
);