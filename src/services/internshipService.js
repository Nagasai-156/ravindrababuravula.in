import { supabase } from '../supabaseClient'

// Submit internship application
export const submitInternshipApplication = async (applicationData) => {
    try {
        const insertData = {
            full_name: applicationData.fullName || '',
            email: applicationData.email || '',
            phone: applicationData.phone || '',
            university: applicationData.organization || applicationData.university || '',
            major: applicationData.fieldOfStudy || applicationData.major || '',
            graduation_year: applicationData.graduationOrExperience || applicationData.graduationYear || '',
            current_status: applicationData.currentStatus || '',
            internship_type: applicationData.internshipType || '',
            experience: applicationData.experience || '',
            skills: applicationData.skills || '',
            portfolio_url: applicationData.portfolio || '',
            cover_letter: applicationData.coverLetter || '',
            resume_filename: applicationData.resume ? applicationData.resume.name : '',
            application_status: 'pending'
        }

        console.log('Inserting data:', insertData);

        const { data, error } = await supabase
            .from('internship_applications')
            .insert([insertData])
            .select()

        if (error) {
            console.error('Insert error:', error);
            return { data: null, error }
        }

        console.log('Insert success:', data);

        // Upload resume if provided
        if (applicationData.resume && data && data[0]) {
            const resumeResult = await uploadResume(applicationData.resume, data[0].id)
            if (!resumeResult.error) {
                await supabase
                    .from('internship_applications')
                    .update({ resume_url: resumeResult.data.publicUrl })
                    .eq('id', data[0].id)
            }
        }

        return { data: data[0], error: null }
    } catch (error) {
        console.error('Unexpected error:', error)
        return { data: null, error }
    }
}

// Upload resume to Supabase Storage
export const uploadResume = async (file, applicationId) => {
    try {
        const fileExt = file.name.split('.').pop()
        const filePath = `resumes/${applicationId}_${Date.now()}.${fileExt}`

        const { data, error } = await supabase.storage
            .from('internship-files')
            .upload(filePath, file)

        if (error) throw error

        const { data: publicUrlData } = supabase.storage
            .from('internship-files')
            .getPublicUrl(filePath)

        return { data: { ...data, publicUrl: publicUrlData.publicUrl }, error: null }
    } catch (error) {
        return { data: null, error }
    }
}

// Get all applications
export const getAllApplications = async () => {
    try {
        const { data, error } = await supabase
            .from('internship_applications')
            .select('*')
            .order('submitted_at', { ascending: false })

        if (error) throw error
        return { data, error: null }
    } catch (error) {
        return { data: null, error }
    }
}

// Update application status
export const updateApplicationStatus = async (id, status) => {
    try {
        const { data, error } = await supabase
            .from('internship_applications')
            .update({ application_status: status, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select()

        if (error) throw error
        return { data: data[0], error: null }
    } catch (error) {
        return { data: null, error }
    }
}

// Delete application
export const deleteApplication = async (id) => {
    try {
        const { error } = await supabase
            .from('internship_applications')
            .delete()
            .eq('id', id)

        if (error) throw error
        return { data: true, error: null }
    } catch (error) {
        return { data: null, error }
    }
}