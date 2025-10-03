import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface JobVacancy {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  salary_range: string;
  deadline: string;
  created_at: string;
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  requirements: string;
  stipend: string;
  deadline: string;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  description: string;
  speaker: string;
  quota: number;
  registered: number;
  created_at: string;
}

export interface CompanyPartner {
  id: string;
  name: string;
  logo_url: string;
  industry: string;
  description: string;
  website: string;
  partnership_year: number;
  created_at: string;
}

export interface AlumniNetwork {
  id: string;
  name: string;
  photo_url: string;
  graduation_year: number;
  current_position: string;
  company: string;
  industry: string;
  linkedin: string;
  email: string;
  created_at: string;
}
