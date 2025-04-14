/*
  # Interview Feedback Application Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key) - matches auth.users id
      - `email` (text)
      - `role` (text) - admin/interviewer/interviewee
      - `full_name` (text)
      - `created_at` (timestamp)
    
    - `feedback`
      - `id` (uuid, primary key)
      - `interviewer_id` (uuid) - references profiles
      - `interviewee_id` (uuid) - references profiles
      - `content` (text)
      - `rating` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users,
  email text UNIQUE NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'interviewer', 'interviewee')),
  full_name text,
  created_at timestamptz DEFAULT now()
);

-- Create feedback table
CREATE TABLE feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  interviewer_id uuid REFERENCES profiles(id),
  interviewee_id uuid REFERENCES profiles(id),
  content text NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Feedback policies
CREATE POLICY "Admins can view all feedback"
  ON feedback FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Users can view their own feedback"
  ON feedback FOR SELECT
  USING (
    interviewer_id = auth.uid()
    OR interviewee_id = auth.uid()
  );

CREATE POLICY "Interviewers can create feedback"
  ON feedback FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'interviewer'
    )
  );