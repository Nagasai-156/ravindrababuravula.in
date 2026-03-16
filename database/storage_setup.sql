-- Create storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('internship-files', 'internship-files', true)
ON CONFLICT (id) DO NOTHING;