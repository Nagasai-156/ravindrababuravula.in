import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "./assets/logo.png";
import heroPerson from "./assets/hero-person.png";
import "./InternshipPage.css";
import { submitInternshipApplication } from "./services/internshipService";
import { submitInternshipApplicationLocal } from "./services/localStorageService";

// Icons
const ArrowUpRight = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 7h10v10M7 17L17 7" />
    </svg>
);

const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const MailIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

const PhoneIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

const FileTextIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10,9 9,9 8,9" />
    </svg>
);

const CheckIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="20,6 9,17 4,12" />
    </svg>
);

const YoutubeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
);

export default function InternshipPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        currentStatus: '', // Student, Professional, etc.
        organization: '', // University or Company
        fieldOfStudy: '', // Major or Domain
        graduationOrExperience: '', // Year or Years of Experience
        internshipType: '', // Now a text input
        experience: '',
        skills: '',
        portfolio: '',
        coverLetter: '',
        resume: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const onScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Try Supabase first
            console.log('Attempting Supabase submission...');
            const result = await submitInternshipApplication(formData);

            if (result.error) {
                console.error('Supabase error, falling back to localStorage:', result.error);

                // Fallback to localStorage
                const localResult = await submitInternshipApplicationLocal(formData);

                if (localResult.error) {
                    alert('There was an error submitting your application. Please try again.');
                    setIsSubmitting(false);
                    return;
                }

                console.log('Application saved to localStorage:', localResult.data);
                alert('Application saved locally (Supabase unavailable). Data stored in browser.');
                setIsSubmitting(false);
                setSubmitted(true);
                return;
            }

            console.log('Application submitted successfully to Supabase:', result.data);
            setIsSubmitting(false);
            setSubmitted(true);
        } catch (error) {
            console.error('Unexpected error, using localStorage:', error);

            // Fallback to localStorage
            const localResult = await submitInternshipApplicationLocal(formData);

            if (localResult.error) {
                alert('There was an unexpected error. Please try again.');
                setIsSubmitting(false);
                return;
            }

            console.log('Application saved to localStorage:', localResult.data);
            alert('Application saved locally (Supabase unavailable). Data stored in browser.');
            setIsSubmitting(false);
            setSubmitted(true);
        }
    };

    if (submitted) {
        return (
            <div className="internship-wrapper">
                <nav className="hs-nav">
                    <img src={logoImg} alt="Logo" style={{ height: '32px' }} />
                    <button className="hs-nav-btn" onClick={() => navigate("/")}>
                        Go Back <ArrowUpRight />
                    </button>
                </nav>

                <div className="success-container">
                    {/* Animated background particles */}
                    <div className="success-bg">
                        <div className="success-orb success-orb-1" />
                        <div className="success-orb success-orb-2" />
                        <div className="success-orb success-orb-3" />
                    </div>

                    <div className="success-card">
                        {/* Animated check */}
                        <div className="success-check-wrap">
                            <div className="success-check-ring" />
                            <div className="success-check-icon">
                                <CheckIcon />
                            </div>
                        </div>

                        {/* Heading */}
                        <div className="success-tag">Application Received</div>
                        <h1 className="success-title">You're In The Queue!</h1>
                        <p className="success-subtitle">
                            Your application has been successfully submitted to <strong>Prof. Ravindrababu Ravula's</strong> internship program. Our team will carefully review your profile.
                        </p>

                        {/* Timeline */}
                        <div className="success-timeline">
                            <div className="timeline-step active">
                                <div className="timeline-dot" />
                                <div className="timeline-info">
                                    <span className="timeline-label">Application Submitted</span>
                                    <span className="timeline-time">Just now</span>
                                </div>
                            </div>
                            <div className="timeline-line" />
                            <div className="timeline-step">
                                <div className="timeline-dot pending" />
                                <div className="timeline-info">
                                    <span className="timeline-label">Under Review</span>
                                    <span className="timeline-time">1–3 business days</span>
                                </div>
                            </div>
                            <div className="timeline-line" />
                            <div className="timeline-step">
                                <div className="timeline-dot pending" />
                                <div className="timeline-info">
                                    <span className="timeline-label">Decision & Feedback</span>
                                    <span className="timeline-time">5–7 business days</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="success-actions">
                            <button className="success-btn-primary" onClick={() => navigate("/")}>
                                Return Home <ArrowUpRight size={16} />
                            </button>
                            <button className="success-btn-secondary" onClick={() => { setSubmitted(false); window.scrollTo(0, 0); }}>
                                Submit Another
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="internship-wrapper">
            {/* Navigation */}
            <nav className="hs-nav">
                <div className="hs-nav-left">
                    <img src={logoImg} alt="Logo" style={{ height: '32px' }} />
                </div>
                <button className="hs-nav-btn" onClick={() => navigate("/")}>
                    Go Back <ArrowUpRight />
                </button>
            </nav>

            <div className="internship-body">
                {/* Hero Section */}
                <section className="p1-hero">
                    <div className="p1-bg-text">APPLY</div>

                    <div className="p1-hero-inner">
                        <div className="p1-left">
                            <div className="p1-eyebrow">
                                <div className="eyebrow-row">
                                    <span className="eyebrow-label">Opportunity</span>
                                    <span className="eyebrow-value">GLOBAL INTERNSHIP</span>
                                </div>
                                <div className="eyebrow-row">
                                    <span className="eyebrow-label">Open For</span>
                                    <span className="eyebrow-value">ALL DOMAINS & BACKGROUNDS</span>
                                </div>
                            </div>

                            <h1 className="p1-headline">
                                Join Our <br />
                                <em>Innovation</em> <br />
                                Journey.
                            </h1>

                            <div className="p1-cards-row">
                                <div className="cc dark">
                                    <div className="cc-lbl" style={{ fontSize: '1.1rem', color: '#fff' }}>
                                        Open for students, freshers, and working professionals from any field of expertise.
                                    </div>
                                    <div className="cc-prog" style={{ marginTop: '20px' }}>
                                        <div className="cc-prog-fill" style={{ width: "100%" }} />
                                    </div>
                                    <div className="cc-prog-labels">
                                        <span>Diverse Opportunities</span>
                                    </div>
                                </div>

                                <div className="cc gold" style={{ minHeight: 180, justifyContent: "space-between" }}>
                                    <div className="cc-val" style={{ marginTop: 'auto', marginBottom: 6, fontSize: '1.4rem', fontWeight: 600 }}>
                                        Any Domain
                                    </div>
                                    <div className="cc-lbl" style={{ color: '#333' }}>
                                        Whether you are in Tech, Marketing, Content, or Research — we have a place for you.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p1-right">
                            <div className="p1-img-wrap" style={{ height: '400px' }}>
                                <img
                                    src={heroPerson}
                                    alt="Prof. Ravindrababu Ravula"
                                    style={{ objectFit: "cover", objectPosition: "top center" }}
                                />
                                <div className="p1-img-overlay">
                                    <p className="p1-img-title">Build the<br />Future</p>
                                    <div className="p1-stat-box">
                                        <div className="big-num">2026</div>
                                        <div className="small-lbl">Batch<br />Open</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Application Form */}
                <section className="application-section">
                    <div className="form-container">
                        <div className="form-header">
                            <h2>Internship Application</h2>
                            <p>We welcome applications from students and professionals across all domains</p>
                        </div>

                        <form onSubmit={handleSubmit} className="application-form">
                            {/* Personal Information */}
                            <div className="form-section">
                                <h3 className="section-title">Personal Information</h3>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="fullName">
                                            <UserIcon />
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">
                                            <MailIcon />
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="phone">
                                            <PhoneIcon />
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your contact number"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Background Information */}
                            <div className="form-section">
                                <h3 className="section-title">Background & Status</h3>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="currentStatus">Current Status *</label>
                                        <select
                                            id="currentStatus"
                                            name="currentStatus"
                                            value={formData.currentStatus}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select your status</option>
                                            <option value="student">Currently a Student</option>
                                            <option value="graduate">Recent Graduate (Passed Out)</option>
                                            <option value="professional">Working Professional</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="organization">University / Company *</label>
                                        <input
                                            type="text"
                                            id="organization"
                                            name="organization"
                                            value={formData.organization}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter University or Company name"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="fieldOfStudy">Domain / Field of Work *</label>
                                        <input
                                            type="text"
                                            id="fieldOfStudy"
                                            name="fieldOfStudy"
                                            value={formData.fieldOfStudy}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="e.g. Computer Science, Marketing, HR, etc."
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="graduationOrExperience">Graduation Year / Experience *</label>
                                        <input
                                            type="text"
                                            id="graduationOrExperience"
                                            name="graduationOrExperience"
                                            value={formData.graduationOrExperience}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="e.g. 2024 or 2 Years experience"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Internship Details */}
                            <div className="form-section">
                                <h3 className="section-title">Internship Preferences</h3>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="internshipType">Preferred Internship Type *</label>
                                        <input
                                            type="text"
                                            id="internshipType"
                                            name="internshipType"
                                            value={formData.internshipType}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Describe the type of internship you are looking for"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="skills">Relevant Skills *</label>
                                    <textarea
                                        id="skills"
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="List your key skills relevant to the internship"
                                        rows="3"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="experience">Experience / Projects</label>
                                    <textarea
                                        id="experience"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                        placeholder="Briefly describe your relevant projects or work history"
                                        rows="4"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="portfolio">Portfolio / GitHub / LinkedIn</label>
                                    <input
                                        type="url"
                                        id="portfolio"
                                        name="portfolio"
                                        value={formData.portfolio}
                                        onChange={handleInputChange}
                                        placeholder="Link to your work or profile"
                                    />
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="form-section">
                                <h3 className="section-title">Additional Information</h3>

                                <div className="form-group">
                                    <label htmlFor="coverLetter">Why should we hire you? *</label>
                                    <textarea
                                        id="coverLetter"
                                        name="coverLetter"
                                        value={formData.coverLetter}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Tell us about your motivation and what you bring to the table..."
                                        rows="6"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="resume">
                                        <FileTextIcon />
                                        Resume/CV *
                                    </label>
                                    <input
                                        type="file"
                                        id="resume"
                                        name="resume"
                                        onChange={handleInputChange}
                                        required
                                        accept=".pdf,.doc,.docx"
                                        className="file-input"
                                    />
                                    <div className="file-input-note">
                                        Accepted formats: PDF, DOC, DOCX (Max 5MB)
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="form-submit">
                                <button
                                    type="submit"
                                    className="submit-btn"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                </button>
                            </div>
                        </form>
                    </div>
                </section>

                {/* Footer */}
                <footer className="yp-footer ep-footer">
                    <div className="yp-footer-inner ep-footer-inner">
                        <div className="ip-footer-left">
                            <div className="footer-logo-text">Prof. Ravindrababu Ravula</div>
                            <p className="yp-footer-tagline">
                                Empowering the next generation of <br />innovators and engineers.
                            </p>
                        </div>
                        <div className="yp-footer-right">
                            <a href="https://www.youtube.com/@RavindrababuRavula" target="_blank" rel="noopener noreferrer" className="yp-yt-link">
                                <YoutubeIcon />
                                <span>Subscribe to Prof. RBR</span>
                            </a>
                            <div className="yp-footer-copy">
                                © 2026 Prof. Ravindrababu Ravula. All rights reserved.
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Scroll hint */}
            <div className="scroll-hint-overlay" style={{ opacity: scrolled ? 0 : 1 }}>
                <div className="scroll-mouse" />
                <span>Scroll to Apply</span>
            </div>
        </div>
    );
}