# Database Setup - Step by Step

## Step 1: Create Database Table
1. Go to your Supabase project: https://supabase.com/dashboard/project/llavayxmrnzrfpyrcdgb
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste this SQL:

```sql
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

ALTER TABLE internship_applications DISABLE ROW LEVEL SECURITY;
```

5. Click **Run** button

## Step 2: Create Storage Bucket
1. Go to **Storage** in the left sidebar
2. Click **New Bucket**
3. Name: `internship-files`
4. Make it **Public**
5. Click **Create Bucket**

## Step 3: Test the Application
1. Go to http://localhost:5173/internship
2. Fill out the form
3. Submit - data should now save to database!
4. Check http://localhost:5173/admin to see submitted applications

That's it! The database is now ready.