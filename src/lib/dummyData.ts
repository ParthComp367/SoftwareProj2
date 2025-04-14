export interface Feedback {
  id: string;
  interviewer_id: string;
  interviewee_id: string;
  content: string;
  rating: number;
  created_at: string;
  interviewer_name: string;
  interviewee_name: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'interviewer' | 'interviewee';
  joined_date: string;
  last_active: string;
  status: 'active' | 'inactive';
}

export interface Meeting {
  id: string;
  title: string;
  start: string;
  interviewer: string;
  interviewee: string;
  company: string;
  position: string;
}

export const dummyUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    full_name: 'Admin User',
    role: 'admin',
    joined_date: '2025-01-01T00:00:00Z',
    last_active: '2025-04-10T15:30:00Z',
    status: 'active'
  },
  {
    id: '2',
    email: 'interviewer@example.com',
    full_name: 'John Interviewer',
    role: 'interviewer',
    joined_date: '2025-02-15T00:00:00Z',
    last_active: '2025-04-10T14:20:00Z',
    status: 'active'
  },
  {
    id: '3',
    email: 'interviewee@example.com',
    full_name: 'Jane Interviewee',
    role: 'interviewee',
    joined_date: '2025-03-01T00:00:00Z',
    last_active: '2025-04-09T11:45:00Z',
    status: 'active'
  },
  {
    id: '4',
    email: 'interviewer2@example.com',
    full_name: 'Sarah Smith',
    role: 'interviewer',
    joined_date: '2025-02-20T00:00:00Z',
    last_active: '2025-04-10T09:15:00Z',
    status: 'active'
  },
  {
    id: '5',
    email: 'interviewee2@example.com',
    full_name: 'Mike Johnson',
    role: 'interviewee',
    joined_date: '2025-03-10T00:00:00Z',
    last_active: '2025-04-08T16:30:00Z',
    status: 'inactive'
  }
];

export const dummyFeedback: Feedback[] = [
  {
    id: '1',
    interviewer_id: '2',
    interviewee_id: '3',
    content: 'Excellent problem-solving skills. Shows great potential in system design.',
    rating: 5,
    created_at: '2025-04-10T10:00:00Z',
    interviewer_name: 'John Interviewer',
    interviewee_name: 'Jane Interviewee'
  },
  {
    id: '2',
    interviewer_id: '2',
    interviewee_id: '3',
    content: 'Needs significant improvement in data structures and algorithms. Basic concepts are unclear.',
    rating: 2,
    created_at: '2025-04-09T15:30:00Z',
    interviewer_name: 'John Interviewer',
    interviewee_name: 'Jane Interviewee'
  },
  {
    id: '3',
    interviewer_id: '4',
    interviewee_id: '5',
    content: 'Average performance. Shows potential but needs more practice with system design patterns.',
    rating: 3,
    created_at: '2025-04-08T14:20:00Z',
    interviewer_name: 'Sarah Smith',
    interviewee_name: 'Mike Johnson'
  }
];

export const dummyMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer Interview',
    start: '2025-04-15T10:00:00Z',
    interviewer: 'John Interviewer',
    interviewee: 'Jane Interviewee',
    company: 'TechCorp',
    position: 'Senior Frontend Developer'
  },
  {
    id: '2',
    title: 'Full Stack Developer Interview',
    start: '2025-04-16T14:00:00Z',
    interviewer: 'Sarah Smith',
    interviewee: 'Mike Johnson',
    company: 'InnovateTech',
    position: 'Full Stack Developer'
  },
  {
    id: '3',
    title: 'Backend Engineer Interview',
    start: '2025-04-17T11:00:00Z',
    interviewer: 'John Interviewer',
    interviewee: 'Alex Thompson',
    company: 'DataSys',
    position: 'Senior Backend Engineer'
  }
];

export const dummyStats = {
  totalUsers: dummyUsers.length,
  interviewers: dummyUsers.filter(u => u.role === 'interviewer').length,
  interviewees: dummyUsers.filter(u => u.role === 'interviewee').length,
  totalFeedback: dummyFeedback.length
};