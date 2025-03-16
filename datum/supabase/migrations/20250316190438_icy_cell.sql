/*
  # Enhanced User Profile and Preferences

  1. Changes to user_preferences table
    - Add fields:
      - `name` (text)
      - `age` (integer)
      - `gender` (text)
      - `reader_type` (text)
      - `profile_url` (text)
      - `favorite_categories` (text array)

  2. Security
    - Update RLS policies for new fields
*/

-- Add new columns to user_preferences
ALTER TABLE user_preferences 
ADD COLUMN IF NOT EXISTS name text,
ADD COLUMN IF NOT EXISTS age integer,
ADD COLUMN IF NOT EXISTS gender text,
ADD COLUMN IF NOT EXISTS reader_type text DEFAULT 'casual',
ADD COLUMN IF NOT EXISTS profile_url text,
ADD COLUMN IF NOT EXISTS favorite_categories text[] DEFAULT '{}';

-- Add check constraints
ALTER TABLE user_preferences
ADD CONSTRAINT age_check CHECK (age >= 13),
ADD CONSTRAINT gender_check CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
ADD CONSTRAINT reader_type_check CHECK (reader_type IN ('casual', 'avid', 'professional', 'scholar'));