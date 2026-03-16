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

-- Enable RLS on internship_applications table
ALTER TABLE internship_applications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for internship_applications table
CREATE POLICY "Anyone can insert applications" 
ON internship_applications FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can read applications" 
ON internship_applications FOR SELECT 
USING (true);

CREATE POLICY "Anyone can update applications" 
ON internship_applications FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete applications" 
ON internship_applications FOR DELETE 
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