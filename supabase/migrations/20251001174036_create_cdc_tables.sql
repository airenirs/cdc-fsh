/*
  # Career Development Center Database Schema

  1. New Tables
    - `job_vacancies` - Stores job vacancy listings
      - `id` (uuid, primary key)
      - `title` (text) - Job title
      - `company` (text) - Company name
      - `location` (text) - Job location
      - `type` (text) - Job type (full-time, part-time, contract)
      - `description` (text) - Job description
      - `requirements` (text) - Job requirements
      - `salary_range` (text) - Salary information
      - `deadline` (date) - Application deadline
      - `created_at` (timestamptz)
      
    - `internships` - Stores internship opportunities
      - `id` (uuid, primary key)
      - `title` (text) - Internship title
      - `company` (text) - Company name
      - `location` (text) - Internship location
      - `duration` (text) - Duration period
      - `description` (text) - Internship description
      - `requirements` (text) - Requirements
      - `stipend` (text) - Stipend information
      - `deadline` (date) - Application deadline
      - `created_at` (timestamptz)
      
    - `events` - Stores events and training information
      - `id` (uuid, primary key)
      - `title` (text) - Event title
      - `type` (text) - Event type (training, workshop, seminar)
      - `date` (date) - Event date
      - `time` (text) - Event time
      - `location` (text) - Event location
      - `description` (text) - Event description
      - `speaker` (text) - Speaker/facilitator
      - `quota` (integer) - Participant quota
      - `registered` (integer) - Current registrations
      - `created_at` (timestamptz)
      
    - `company_partners` - Stores partner company information
      - `id` (uuid, primary key)
      - `name` (text) - Company name
      - `logo_url` (text) - Company logo URL
      - `industry` (text) - Industry sector
      - `description` (text) - Company description
      - `website` (text) - Company website
      - `partnership_year` (integer) - Year of partnership
      - `created_at` (timestamptz)
      
    - `alumni_network` - Stores alumni networking information
      - `id` (uuid, primary key)
      - `name` (text) - Alumni name
      - `photo_url` (text) - Profile photo URL
      - `graduation_year` (integer) - Graduation year
      - `current_position` (text) - Current job position
      - `company` (text) - Current company
      - `industry` (text) - Industry sector
      - `linkedin` (text) - LinkedIn profile
      - `email` (text) - Contact email
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add public read policies for all tables
*/

-- Job Vacancies Table
CREATE TABLE IF NOT EXISTS job_vacancies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  type text NOT NULL DEFAULT 'Full-time',
  description text NOT NULL,
  requirements text NOT NULL,
  salary_range text DEFAULT '',
  deadline date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE job_vacancies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view job vacancies"
  ON job_vacancies FOR SELECT
  TO anon, authenticated
  USING (true);

-- Internships Table
CREATE TABLE IF NOT EXISTS internships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  duration text NOT NULL,
  description text NOT NULL,
  requirements text NOT NULL,
  stipend text DEFAULT '',
  deadline date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE internships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view internships"
  ON internships FOR SELECT
  TO anon, authenticated
  USING (true);

-- Events Table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL DEFAULT 'training',
  date date NOT NULL,
  time text NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  speaker text NOT NULL,
  quota integer DEFAULT 0,
  registered integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view events"
  ON events FOR SELECT
  TO anon, authenticated
  USING (true);

-- Company Partners Table
CREATE TABLE IF NOT EXISTS company_partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text DEFAULT '',
  industry text NOT NULL,
  description text NOT NULL,
  website text DEFAULT '',
  partnership_year integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE company_partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view company partners"
  ON company_partners FOR SELECT
  TO anon, authenticated
  USING (true);

-- Alumni Network Table
CREATE TABLE IF NOT EXISTS alumni_network (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  photo_url text DEFAULT '',
  graduation_year integer NOT NULL,
  current_position text NOT NULL,
  company text NOT NULL,
  industry text NOT NULL,
  linkedin text DEFAULT '',
  email text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE alumni_network ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view alumni network"
  ON alumni_network FOR SELECT
  TO anon, authenticated
  USING (true);