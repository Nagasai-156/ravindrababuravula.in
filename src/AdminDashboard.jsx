import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import { getAllApplications, updateApplicationStatus, deleteApplication } from "./services/internshipService";
import { 
    getAllApplicationsLocal, 
    updateApplicationStatusLocal, 
    deleteApplicationLocal 
} from "./services/localStorageService";

const ArrowLeft = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
);

const RefreshIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M3 21v-5h5" />
    </svg>
);

const TrashIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="3,6 5,6 21,6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);

const DownloadIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7,10 12,15 17,10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

const EyeIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
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

const STATUS_COLORS = {
    pending: { bg: 'rgba(245,197,24,0.12)', text: '#f5c518', border: 'rgba(245,197,24,0.3)' },
    approved: { bg: 'rgba(16,185,129,0.12)', text: '#10b981', border: 'rgba(16,185,129,0.3)' },
    rejected: { bg: 'rgba(239,68,68,0.12)', text: '#ef4444', border: 'rgba(239,68,68,0.3)' },
    interview: { bg: 'rgba(99,102,241,0.12)', text: '#818cf8', border: 'rgba(99,102,241,0.3)' },
};

function StatusBadge({ status }) {
    const s = STATUS_COLORS[status] || STATUS_COLORS.pending;
    return (
        <span style={{
            padding: '3px 10px',
            borderRadius: '50px',
            fontSize: '0.7rem',
            fontWeight: 600,
            textTransform: 'capitalize',
            letterSpacing: '0.5px',
            background: s.bg,
            color: s.text,
            border: `1px solid ${s.border}`,
        }}>
            {status}
        </span>
    );
}

function formatDate(d) {
    return new Date(d).toLocaleDateString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
}

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [search, setSearch] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessCode, setAccessCode] = useState('');
    const [previewResume, setPreviewResume] = useState(false);

    const loadApplications = React.useCallback(async () => {
        if (!isAuthenticated) return;
        setLoading(true);
        setError(null);
        
        // Load from Supabase
        const result = await getAllApplications();
        let combinedData = [];
        
        if (result.data) {
            combinedData = result.data.map(app => ({ ...app, source: 'live' }));
        } else if (result.error) {
            console.warn('Supabase fetch failed, showing local only:', result.error);
        }

        // Load from Local Storage
        const localResult = await getAllApplicationsLocal();
        if (localResult.data) {
            const localApps = localResult.data.map(app => ({ ...app, source: 'local' }));
            combinedData = [...combinedData, ...localApps];
        }

        // Sort by date
        combinedData.sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at));
        
        setApplications(combinedData);
        setLoading(false);
    }, []);

    useEffect(() => { loadApplications(); }, [loadApplications]);

    const handleStatusUpdate = async (app, status) => {
        if (app.source === 'live') {
            await updateApplicationStatus(app.id, status);
        } else {
            await updateApplicationStatusLocal(app.id, status);
        }
        
        setApplications(prev => prev.map(a => a.id === app.id ? { ...a, application_status: status } : a));
        if (selected?.id === app.id) setSelected(prev => ({ ...prev, application_status: status }));
    };

    const handleDelete = async (app) => {
        if (!window.confirm('Delete this application?')) return;
        
        if (app.source === 'live') {
            await deleteApplication(app.id);
        } else {
            await deleteApplicationLocal(app.id);
        }
        
        setApplications(prev => prev.filter(a => a.id !== app.id));
        if (selected?.id === app.id) setSelected(null);
    };

    const filtered = applications.filter(a => {
        const matchStatus = filterStatus === 'all' || a.application_status === filterStatus;
        const q = search.toLowerCase();
        const matchSearch = !q || a.full_name?.toLowerCase().includes(q) || a.email?.toLowerCase().includes(q) || a.university?.toLowerCase().includes(q);
        return matchStatus && matchSearch;
    });

    const counts = {
        total: applications.length,
        pending: applications.filter(a => a.application_status === 'pending').length,
        approved: applications.filter(a => a.application_status === 'approved').length,
        interview: applications.filter(a => a.application_status === 'interview').length,
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (accessCode === 'RBR2026') {
            setIsAuthenticated(true);
        } else {
            alert('Invalid Access Code');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="adm-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0a0a0a' }}>
                <div style={{ background: '#111', padding: '40px', borderRadius: '16px', border: '1px solid #333', textAlign: 'center', maxWidth: '400px', width: '90%' }}>
                    <h2 style={{ color: '#fff', marginBottom: '8px', fontFamily: 'Unbounded' }}>Restricted Access</h2>
                    <p style={{ color: '#888', marginBottom: '24px', fontSize: '0.9rem' }}>Please enter the management access code to view responses.</p>
                    <form onSubmit={handleLogin}>
                        <input 
                            type="password" 
                            placeholder="Access Code"
                            value={accessCode}
                            onChange={(e) => setAccessCode(e.target.value)}
                            style={{ width: '100%', padding: '12px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff', marginBottom: '16px', textAlign: 'center' }}
                        />
                        <button type="submit" style={{ width: '100%', padding: '12px', background: '#f5c518', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
                            Unlock Dashboard
                        </button>
                    </form>
                    <button onClick={() => navigate("/")} style={{ marginTop: '16px', background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '0.8rem' }}>
                        Return to Website
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="adm-wrapper">
            {/* Nav */}
            <nav className="adm-nav">
                <div className="adm-nav-left">
                    <span className="adm-logo">PROF RBR</span>
                    <span className="adm-nav-tag">Admin</span>
                </div>
                <div className="adm-nav-right">
                    <button className="adm-btn-icon" onClick={loadApplications} title="Refresh">
                        <RefreshIcon />
                    </button>
                    <button className="adm-btn-back" onClick={() => navigate("/")}>
                        <ArrowLeft /> Go Back
                    </button>
                </div>
            </nav>

            <div className="adm-body">
                {/* Header */}
                <div className="adm-header">
                    <h1 className="adm-title">Internship Applications</h1>
                    <div className="adm-stats">
                        {[
                            { label: 'Total', value: counts.total, color: '#fff' },
                            { label: 'Pending', value: counts.pending, color: '#f5c518' },
                            { label: 'Approved', value: counts.approved, color: '#10b981' },
                            { label: 'Interview', value: counts.interview, color: '#818cf8' },
                        ].map(s => (
                            <div className="adm-stat" key={s.label}>
                                <span className="adm-stat-num" style={{ color: s.color }}>{s.value}</span>
                                <span className="adm-stat-lbl">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Filters */}
                <div className="adm-filters">
                    <input
                        className="adm-search"
                        type="text"
                        placeholder="Search by name, email or university..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <select className="adm-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="interview">Interview</option>
                    </select>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="adm-state">Loading applications...</div>
                ) : error ? (
                    <div className="adm-state adm-error">Error: {error}</div>
                ) : filtered.length === 0 ? (
                    <div className="adm-state">No applications found.</div>
                ) : (
                    <div className="adm-table-wrap">
                        <table className="adm-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>University</th>
                                    <th>Type</th>
                                    <th>Submitted</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(app => (
                                    <tr key={app.id}>
                                        <td className="adm-td-name">
                                            {app.full_name}
                                            {app.source === 'local' && (
                                                <span style={{ 
                                                    marginLeft: '8px', 
                                                    fontSize: '0.6rem', 
                                                    padding: '2px 6px', 
                                                    background: 'rgba(255,255,255,0.05)', 
                                                    borderRadius: '4px',
                                                    color: '#888',
                                                    border: '1px solid rgba(255,255,255,0.1)'
                                                }}>LOCAL</span>
                                            )}
                                        </td>
                                        <td className="adm-td-muted">{app.email}</td>
                                        <td className="adm-td-muted">{app.university || app.organization || '—'}</td>
                                        <td className="adm-td-muted">{app.internship_type || '—'}</td>
                                        <td className="adm-td-muted">{formatDate(app.submitted_at)}</td>
                                        <td>
                                            <select
                                                className="adm-status-select"
                                                value={app.application_status}
                                                onChange={e => handleStatusUpdate(app, e.target.value)}
                                                style={{ color: STATUS_COLORS[app.application_status]?.text || '#fff' }}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="approved">Approved</option>
                                                <option value="rejected">Rejected</option>
                                                <option value="interview">Interview</option>
                                            </select>
                                        </td>
                                        <td>
                                            <div className="adm-actions">
                                                <button className="adm-action-btn view" onClick={() => setSelected(app)} title="View">
                                                    <EyeIcon />
                                                </button>
                                                {app.resume_url && (
                                                    <a className="adm-action-btn download" href={app.resume_url} target="_blank" rel="noopener noreferrer" title="Download Resume">
                                                        <DownloadIcon />
                                                    </a>
                                                )}
                                                <button className="adm-action-btn delete" onClick={() => handleDelete(app)} title="Delete">
                                                    <TrashIcon />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {selected && (
                <div className="adm-modal-overlay" onClick={() => { setSelected(null); setPreviewResume(false); }}>
                    <div className={`adm-modal ${previewResume ? 'preview-mode' : ''}`} onClick={e => e.stopPropagation()} style={{ maxWidth: previewResume ? '1200px' : '580px' }}>
                        <div className="adm-modal-header">
                            <div>
                                <h2>{selected.full_name}</h2>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <StatusBadge status={selected.application_status} />
                                    {selected.source === 'local' && (
                                        <span style={{ fontSize: '0.6rem', color: '#888', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}>LOCAL</span>
                                    )}
                                </div>
                            </div>
                            <button className="adm-modal-close" onClick={() => { setSelected(null); setPreviewResume(false); }}>×</button>
                        </div>
                        <div className="adm-modal-content-flex" style={{ display: 'flex', height: 'calc(85vh - 80px)', overflow: 'hidden' }}>
                            <div className="adm-modal-body" style={{ flex: previewResume ? '0 0 400px' : '1', overflowY: 'auto', borderRight: previewResume ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                                {[
                                    { label: 'Status', value: selected.current_status || selected.currentStatus },
                                    { label: 'Email', value: selected.email },
                                    { label: 'Phone', value: selected.phone },
                                    { label: 'University / Org', value: selected.university || selected.organization },
                                    { label: 'Major / Field', value: selected.major || selected.field_of_study },
                                    { label: 'Graduation / Exp', value: selected.graduation_year || selected.graduation_or_experience },
                                    { label: 'Internship Type', value: selected.internship_type },
                                    { label: 'Skills', value: selected.skills },
                                    { label: 'Portfolio', value: selected.portfolio_url },
                                    { label: 'Submitted', value: formatDate(selected.submitted_at) },
                                ].map(row => row.value ? (
                                    <div className="adm-detail-row" key={row.label}>
                                        <span className="adm-detail-label">{row.label}</span>
                                        <span className="adm-detail-value">{row.value}</span>
                                    </div>
                                ) : null)}

                                <div className="adm-detail-block">
                                    <span className="adm-detail-label">Experience</span>
                                    <p className="adm-detail-text">{selected.experience || 'No experience details provided.'}</p>
                                </div>
                                
                                <div className="adm-detail-block">
                                    <span className="adm-detail-label">Cover Letter / Why Hire</span>
                                    <p className="adm-detail-text">{selected.cover_letter || 'No cover letter provided.'}</p>
                                </div>

                                {selected.resume_url ? (
                                    <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                        <button className="adm-resume-btn" onClick={() => setPreviewResume(!previewResume)}>
                                            <EyeIcon /> {previewResume ? 'Hide Preview' : 'View Resume'}
                                        </button>
                                        <a className="adm-resume-btn" href={selected.resume_url} target="_blank" rel="noopener noreferrer" style={{ background: 'transparent' }}>
                                            <DownloadIcon /> Open Link
                                        </a>
                                    </div>
                                ) : selected.resume_filename ? (
                                    <div className="adm-resume-placeholder" style={{ 
                                        padding: '16px', 
                                        background: 'rgba(255,183,3,0.03)', 
                                        borderRadius: '8px', 
                                        border: '1px dashed rgba(255,183,3,0.3)', 
                                        color: '#888',
                                        marginTop: '24px',
                                        display: 'flex',
                                        gap: '12px'
                                    }}>
                                        <FileTextIcon /> 
                                        <div>
                                            <div style={{ color: '#ccc', fontSize: '0.85rem' }}>{selected.resume_filename}</div>
                                            <div style={{ fontSize: '0.7rem' }}>Stored in local browser cache.</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ marginTop: '24px', color: '#666', fontSize: '0.85rem', fontStyle: 'italic' }}>No resume uploaded.</div>
                                )}
                            </div>
                            
                            {previewResume && selected.resume_url && (
                                <div className="adm-resume-preview" style={{ flex: 1, background: '#1e1e1e', display: 'flex', flexDirection: 'column' }}>
                                    <iframe 
                                        src={selected.resume_url.toLowerCase().endsWith('.pdf') 
                                            ? `${selected.resume_url}#toolbar=0` 
                                            : `https://docs.google.com/viewer?url=${encodeURIComponent(selected.resume_url)}&embedded=true`}
                                        style={{ width: '100%', height: '100%', border: 'none' }}
                                        title="Resume Preview"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}