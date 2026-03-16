# Troubleshooting Supabase Connection

## Current Status
✅ **Form now works temporarily** - Data is logged to console
❌ **Supabase connection needs fixing**

## Quick Test
1. Fill out the internship form at `http://localhost:5173/internship`
2. Submit the form - it should work now and show success page
3. Check browser console (F12) to see the submitted data

## To Fix Supabase Connection

### Step 1: Verify Supabase Project
1. Go to https://supabase.com/dashboard/project/llavayxmrnzrfpyrcdgb
2. Make sure the project exists and you have access

### Step 2: Check Database Table
1. In Supabase dashboard, go to **Database > Tables**
2. Look for `internship_applications` table
3. If it doesn't exist, run this SQL in **SQL Editor**:

```sql
CREATE TABLE internship_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    university VARCHAR(255) NOT NULL,
    major VARCHAR(255) NOT NULL,
    graduation_year VARCHAR(4) NOT NULL,
    internship_type VARCHAR(100) NOT NULL,
    experience TEXT,
    skills TEXT NOT NULL,
    portfolio_url VARCHAR(500),
    cover_letter TEXT NOT NULL,
    resume_filename VARCHAR(255),
    resume_url VARCHAR(500),
    application_status VARCHAR(50) DEFAULT 'pending',
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE internship_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all operations for everyone" 
ON internship_applications FOR ALL 
USING (true) 
WITH CHECK (true);
```

### Step 3: Check Storage Bucket
1. Go to **Storage** in Supabase dashboard
2. Look for `internship-files` bucket
3. If it doesn't exist, create it:
   - Click **New Bucket**
   - Name: `internship-files`
   - Make it **Public**

### Step 4: Test Connection
Once database and storage are set up:

1. In `InternshipPage.jsx`, uncomment the Supabase code:
   - Remove the temporary console.log code
   - Uncomment the `submitInternshipApplication` code

2. Test the form again

## Alternative: Use Local Storage
If Supabase continues to have issues, I can modify the code to use browser localStorage for testing purposes.

## Need Help?
If you're still having issues:
1. Share screenshots of your Supabase dashboard (Tables and Storage sections)
2. Let me know what error messages you see
3. I can create a localStorage version for immediate testing