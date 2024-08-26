import { createClient } from '@supabase/supabase-js';

const URL = 'https://pwhqcwhvclpvvaxmzgwy.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3aHFjd2h2Y2xwdnZheG16Z3d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2MjM3MzgsImV4cCI6MjA0MDE5OTczOH0.uO4prjtURbuPFUvat4F3bWymxX7eyLeY7sA_EJTNzDM';


export const supabase = createClient(URL, API_KEY);
