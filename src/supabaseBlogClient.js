import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://opwstufrsebwbflqhnus.supabase.co'
const supabaseAnonKey = 'sb_publishable_PFTzqhiVDSXuFqnBu7CLNA_BYGf1KVA'

export const supabaseBlog = createClient(supabaseUrl, supabaseAnonKey)
