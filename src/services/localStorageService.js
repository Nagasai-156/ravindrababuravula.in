// Fallback service using localStorage when Supabase is not available

export const submitInternshipApplicationLocal = async (applicationData) => {
    try {
        // Get existing applications from localStorage
        const existingApps = JSON.parse(localStorage.getItem('internship_applications') || '[]');

        // Create new application with ID
        const newApplication = {
            id: Date.now().toString(),
            full_name: applicationData.fullName,
            email: applicationData.email,
            phone: applicationData.phone,
            university: applicationData.organization,
            major: applicationData.fieldOfStudy,
            graduation_year: applicationData.graduationOrExperience,
            current_status: applicationData.currentStatus,
            internship_type: applicationData.internshipType,
            experience: applicationData.experience,
            skills: applicationData.skills,
            portfolio_url: applicationData.portfolio,
            cover_letter: applicationData.coverLetter,
            resume_filename: applicationData.resume ? applicationData.resume.name : null,
            application_status: 'pending',
            submitted_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        // Add to array
        existingApps.push(newApplication);

        // Save back to localStorage
        localStorage.setItem('internship_applications', JSON.stringify(existingApps));

        console.log('Application saved to localStorage:', newApplication);

        return { data: newApplication, error: null };
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return { data: null, error };
    }
};

export const getAllApplicationsLocal = async () => {
    try {
        const applications = JSON.parse(localStorage.getItem('internship_applications') || '[]');
        return { data: applications, error: null };
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return { data: null, error };
    }
};

export const updateApplicationStatusLocal = async (id, status) => {
    try {
        const applications = JSON.parse(localStorage.getItem('internship_applications') || '[]');
        const index = applications.findIndex(app => app.id === id);

        if (index !== -1) {
            applications[index].application_status = status;
            applications[index].updated_at = new Date().toISOString();
            localStorage.setItem('internship_applications', JSON.stringify(applications));
            return { data: applications[index], error: null };
        }

        return { data: null, error: { message: 'Application not found' } };
    } catch (error) {
        console.error('Error updating localStorage:', error);
        return { data: null, error };
    }
};

export const deleteApplicationLocal = async (id) => {
    try {
        const applications = JSON.parse(localStorage.getItem('internship_applications') || '[]');
        const filtered = applications.filter(app => app.id !== id);
        localStorage.setItem('internship_applications', JSON.stringify(filtered));
        return { data: true, error: null };
    } catch (error) {
        console.error('Error deleting from localStorage:', error);
        return { data: null, error };
    }
};