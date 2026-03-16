# Quick Database Setup

## Step 1: Run SQL in Supabase
Go to your Supabase project SQL Editor and run this command:

```sql
-- Create internship_applications table
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

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('internship-files', 'internship-files', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE internship_applications ENABLE ROW LEVEL SECURITY;

-- Allow public access (you can restrict this later)
CREATE POLICY "Public access" ON internship_applications FOR ALL USING (true);
CREATE POLICY "Public storage access" ON storage.objects FOR ALL USING (bucket_id = 'internship-files');
```

## Step 2: Test the Application

### For Students:
- Visit: `http://localhost:5173/internship`
- Fill out the application form
- Upload a resume
- Submit the application

### For Admins:
- Visit: `http://localhost:5173/admin`
- View all submitted applications
- Update application status
- Download resumes
- Delete applications if needed

## Features Working:
✅ Form submission to Supabase
✅ File upload for resumes
✅ Admin dashboard
✅ Status management
✅ Search and filtering
✅ Real-time data updates

That's it! Your internship application system is ready to use.