import { create } from 'zustand';

interface Profile {
  id: string;
  email: string;
  role: 'admin' | 'interviewer' | 'interviewee';
  full_name: string;
}

interface AuthState {
  user: Profile | null;
  setUser: (user: Profile | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// Dummy users for testing
const dummyUsers: Profile[] = [
  {
    id: '1',
    email: 'admin@example.com',
    role: 'admin',
    full_name: 'Admin User'
  },
  {
    id: '2',
    email: 'interviewer@example.com',
    role: 'interviewer',
    full_name: 'John Interviewer'
  },
  {
    id: '3',
    email: 'interviewee@example.com',
    role: 'interviewee',
    full_name: 'Jane Interviewee'
  }
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  signIn: async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = dummyUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    set({ user });
  },
  signOut: async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ user: null });
  },
}));