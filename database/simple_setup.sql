-- Step 1: Create the table
CREATE TABLE internship_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    university TEXT NOT NULL,
    major TEXT NOT NULL,
    graduation_year TEXT NOT NULL,
    internship_type TEXT NOT NULL,
    experience TEXT,
    skills TEXT NOT NULL,
    portfolio_url TEXT,
    cover_letter TEXT NOT NULL,
    resume_filename TEXT,
    resume_url TEXT,
    application_status TEXT DEFAULT 'pending',
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 2: Disable RLS temporarily for testing
ALTER TABLE internship_applications DISABLE ROW LEVEL SECURITY;