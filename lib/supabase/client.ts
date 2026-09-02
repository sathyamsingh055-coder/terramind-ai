import { createClient } from '@supabase/supabase-js';

// Get environment variables with safe fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
