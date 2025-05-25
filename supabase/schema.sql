-- Reset tables
DROP TABLE IF EXISTS subjects CASCADE;
DROP TABLE IF EXISTS user_settings CASCADE;
DROP TABLE IF EXISTS topic_progress CASCADE;
DROP TABLE IF EXISTS revision_sessions CASCADE;
DROP TYPE IF EXISTS qualification_type CASCADE;

-- Create enum type
CREATE TYPE qualification_type AS ENUM ('GCSE', 'A-Level');

-- Create subjects table
CREATE TABLE subjects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    qualification qualification_type NOT NULL,
    subject TEXT NOT NULL,
    board TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE(user_id, subject)
);

-- Add selected_topics to subjects table
ALTER TABLE subjects ADD COLUMN selected_topics TEXT[] DEFAULT '{}';

-- Enable RLS and create policies
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subjects"
    ON subjects FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create own subjects"
    ON subjects FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subjects"
    ON subjects FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own subjects"
    ON subjects FOR DELETE
    USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_subjects_updated_at
    BEFORE UPDATE ON subjects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create topics progress table
CREATE TABLE topic_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    topic_name TEXT NOT NULL,  -- Changed from 'topic' to 'topic_name'
    completed_questions INTEGER DEFAULT 0 NOT NULL,
    total_questions INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE(user_id, subject_id, topic_name)  -- Updated constraint
);

-- Enable RLS
ALTER TABLE topic_progress ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own progress"
    ON topic_progress FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
    ON topic_progress FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
    ON topic_progress FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Add trigger
CREATE TRIGGER update_topic_progress_updated_at
    BEFORE UPDATE ON topic_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create revision sessions table
CREATE TABLE revision_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    current_question_id TEXT NOT NULL,
    progress INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE(user_id, subject_id)
);

-- Enable RLS
ALTER TABLE revision_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own sessions"
    ON revision_sessions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions"
    ON revision_sessions FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions"
    ON revision_sessions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions"
    ON revision_sessions FOR DELETE
    USING (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_revision_sessions_updated_at
    BEFORE UPDATE ON revision_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
