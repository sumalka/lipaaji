// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'postgresql://postgres:@MAI$*4875S@db.gdgwpgixxudvruxojhqm.supabase.co:5432/postgres';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkZ3dwZ2l4eHVkdnJ1eG9qaHFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MzM2MTcsImV4cCI6MjA2NTMwOTYxN30.sSNRVJrSLzW1WQmlnogUi9vuDbl7JI22xENzWp2BrMo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);