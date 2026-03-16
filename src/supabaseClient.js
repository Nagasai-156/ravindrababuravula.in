import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://llavaymxrnzrfpyrcdgb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsYXZheW14cm56cmZweXJjZGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NDkzNzcsImV4cCI6MjA4OTIyNTM3N30.dNOny718mFd2ssVTAG0GfsVpK0LsdzSfxvraJSvf7Ok'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)