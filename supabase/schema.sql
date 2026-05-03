-- ========================================
-- ChineseFlix — Supabase Database Schema
-- ========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- Profiles (extends auth.users)
-- ========================================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username TEXT UNIQUE,
  avatar_url TEXT,
  streak_count INT DEFAULT 0,
  last_active_date DATE,
  total_xp INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'username');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ========================================
-- Daily Sentences (admin-curated)
-- ========================================
CREATE TABLE daily_sentences (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  language TEXT NOT NULL CHECK (language IN ('mandarin', 'cantonese')),
  sentences JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(date, language)
);

-- Everyone can read
ALTER TABLE daily_sentences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Daily sentences are readable by everyone"
  ON daily_sentences FOR SELECT USING (true);

-- ========================================
-- Recordings (user voice submissions)
-- ========================================
CREATE TABLE recordings (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  sentence_id INT REFERENCES daily_sentences(id) NOT NULL,
  audio_url TEXT NOT NULL,
  duration FLOAT DEFAULT 0,
  likes_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE recordings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Recordings are readable by everyone"
  ON recordings FOR SELECT USING (true);
CREATE POLICY "Users can insert their own recordings"
  ON recordings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own recordings"
  ON recordings FOR DELETE USING (auth.uid() = user_id);

-- ========================================
-- Likes
-- ========================================
CREATE TABLE likes (
  user_id UUID REFERENCES profiles(id) NOT NULL,
  recording_id INT REFERENCES recordings(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, recording_id)
);

ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Likes are readable by everyone"
  ON likes FOR SELECT USING (true);
CREATE POLICY "Users can insert their own likes"
  ON likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own likes"
  ON likes FOR DELETE USING (auth.uid() = user_id);

-- Auto-update likes_count on recordings
CREATE OR REPLACE FUNCTION update_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE recordings SET likes_count = likes_count + 1 WHERE id = NEW.recording_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE recordings SET likes_count = likes_count - 1 WHERE id = OLD.recording_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_like_change
  AFTER INSERT OR DELETE ON likes
  FOR EACH ROW EXECUTE FUNCTION update_likes_count();

-- ========================================
-- Comments
-- ========================================
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  recording_id INT REFERENCES recordings(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Comments are readable by everyone"
  ON comments FOR SELECT USING (true);
CREATE POLICY "Users can insert their own comments"
  ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ========================================
-- SRS Reviews (spaced repetition progress)
-- ========================================
CREATE TABLE srs_reviews (
  user_id UUID REFERENCES profiles(id) NOT NULL,
  vocab_char TEXT NOT NULL,
  ease_factor FLOAT DEFAULT 2.5,
  interval_hours FLOAT DEFAULT 0,
  repetitions INT DEFAULT 0,
  next_review TIMESTAMPTZ DEFAULT NOW(),
  last_review TIMESTAMPTZ,
  last_quality INT DEFAULT 0,
  PRIMARY KEY (user_id, vocab_char)
);

ALTER TABLE srs_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read their own SRS data"
  ON srs_reviews FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can upsert their own SRS data"
  ON srs_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own SRS data"
  ON srs_reviews FOR UPDATE USING (auth.uid() = user_id);

-- ========================================
-- Achievements (earned badges)
-- ========================================
CREATE TABLE achievements (
  user_id UUID REFERENCES profiles(id) NOT NULL,
  badge_id TEXT NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, badge_id)
);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Achievements are readable by everyone"
  ON achievements FOR SELECT USING (true);
CREATE POLICY "Users can insert their own achievements"
  ON achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ========================================
-- Video Progress
-- ========================================
CREATE TABLE progress (
  user_id UUID REFERENCES profiles(id) NOT NULL,
  video_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  last_position FLOAT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, video_id)
);

ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read their own progress"
  ON progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can upsert their own progress"
  ON progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress"
  ON progress FOR UPDATE USING (auth.uid() = user_id);
