-- Drop existing table and recreate with correct columns
DROP TABLE IF EXISTS internship_applications;

CREATE TABLE internship_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT,
    email TEXT,
    phone TEXT,
    university TEXT,
    major TEXT,
    graduation_year TEXT,
    internship_type TEXT,
    experience TEXT,
    skills TEXT,
    portfolio_url TEXT,
    cover_letter TEXT,
    resume_filename TEXT,
    resume_url TEXT,
    application_status TEXT DEFAULT 'pending',
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disable RLS so anyone can insert/read
ALTER TABLE internship_applications DISABLE ROW LEVEL SECURITY;