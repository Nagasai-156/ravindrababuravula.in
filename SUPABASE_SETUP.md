# Supabase Setup Instructions

## Database Setup

To set up the database for the internship application system, follow these steps:

### 1. Create Supabase Project
- Go to [Supabase Dashboard](https://supabase.com/dashboard)
- Create a new project or use existing project: `llavayxmrnzrfpyrcdgb`

### 2. Run Database Setup Script
Copy and paste the following SQL script in your Supabase SQL Editor:

```sql
-- Create internship_applications table
CREATE TABLE IF NOT EXISTS internship_applications (
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

-- Create storage bucket for internship files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('internship-files', 'internship-files', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy for public read access to internship files
CREATE POLICY IF NOT EXISTS "Public read access for internship files" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'internship-files');

-- Create policy for authenticated upload access to internship files
CREATE POLICY IF NOT EXISTS "Authenticated upload access for internship files" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'internship-files');

-- Create RLS policies for internship_applications table
ALTER TABLE internship_applications ENABLE ROW LEVEL SECURITY;

-- Policy for inserting applications (anyone can apply)
CREATE POLICY IF NOT EXISTS "Anyone can insert applications" 
ON internship_applications FOR INSERT 
WITH CHECK (true);

-- Policy for reading applications (for now, anyone can read - you might want to restrict this)
CREATE POLICY IF NOT EXISTS "Anyone can read applications" 
ON internship_applications FOR SELECT 
USING (true);

-- Policy for updating applications (you might want to restrict this to admin users)
CREATE POLICY IF NOT EXISTS "Anyone can update applications" 
ON internship_applications FOR UPDATE 
USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_internship_applications_updated_at ON internship_applications;
CREATE TRIGGER update_internship_applications_updated_at
    BEFORE UPDATE ON internship_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_internship_applications_email ON internship_applications(email);
CREATE INDEX IF NOT EXISTS idx_internship_applications_status ON internship_applications(application_status);
CREATE INDEX IF NOT EXISTS idx_internship_applications_submitted_at ON internship_applications(submitted_at);
CREATE INDEX IF NOT EXISTS idx_internship_applications_internship_type ON internship_applications(internship_type);
```

### 3. Configure Storage
1. Go to Storage in your Supabase dashboard
2. The `internship-files` bucket should be created automatically
3. Verify that the bucket is public for file downloads

### 4. Environment Variables
The Supabase configuration is already set up in `src/supabaseClient.js` with your credentials:
- **Supabase URL**: `https://llavayxmrnzrfpyrcdgb.supabase.co`
- **Anon Key**: Already configured
- **Service Role Key**: Available for admin operations if needed

## Features Implemented

### 1. Internship Application Form (`/internship`)
- Complete form with validation
- File upload for resumes
- Real-time data submission to Supabase
- Success confirmation page

### 2. Admin Dashboard (`/admin`)
- View all applications
- Filter by status and search
- Update application status
- Download resumes
- Delete applications
- Detailed application view modal

### 3. Database Schema
- **internship_applications** table with all necessary fields
- **File storage** for resume uploads
- **Automatic timestamps** for tracking
- **Status management** (pending, approved, rejected, interview)
- **Indexes** for performance optimization

## Usage

### For Applicants:
1. Visit `/internship` to apply
2. Fill out the complete form
3. Upload resume (PDF, DOC, DOCX)
4. Submit application

### For Admins:
1. Visit `/admin` to view all applications
2. Filter and search applications
3. Update status for each application
4. Download resumes
5. View detailed application information

## Security Notes

- Row Level Security (RLS) is enabled
- Public policies allow anyone to submit applications
- File uploads are restricted to the internship-files bucket
- Consider implementing admin authentication for production use

## Next Steps for Production

1. **Add Authentication**: Implement admin login system
2. **Restrict Admin Access**: Add authentication checks for admin routes
3. **Email Notifications**: Send confirmation emails to applicants
4. **File Size Limits**: Implement client-side file size validation
5. **Data Validation**: Add server-side validation rules
6. **Backup Strategy**: Set up regular database backups