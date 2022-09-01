import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://boauthbfhtbrwyqdvzfo.supabase.co';
const supabaseAnonToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvYXV0aGJmaHRicnd5cWR2emZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjIwMzUyMjUsImV4cCI6MTk3NzYxMTIyNX0.u0_aallK4lyQ2zhlRqeS8IefCN6MJinaljN8sjKLK5g';

export default createClient(supabaseUrl, supabaseAnonToken);
