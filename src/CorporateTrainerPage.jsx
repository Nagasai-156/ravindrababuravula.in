import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroPerson from "./assets/hero-person.png";
import "./CorporateTrainerPage.css";

/* ── Icons ── */
const ArrowUpRight = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const BuildingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>
  </svg>
);

const StarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const CheckIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

/* ── Count Up component ── */
const CountUp = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [ref, setRef] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return <span ref={setRef}>{count}{suffix}</span>;
};

/* ── Badge pill ── */
const Badge = ({ label, type = "dark" }) => (
  <span className="ct-badge" style={{
    background: type === "gold" ? "rgba(0,0,0,0.15)" : "rgba(255,183,3,0.12)",
    color: type === "gold" ? "#111" : "#ffb703",
    border: type !== "gold" ? "1px solid rgba(255,183,3,0.2)" : "none",
  }}>
    <StarIcon /> {label}
  </span>
);

/* ── Stats data ── */
const CT_STATS = [
  { value: "100+", label: "Companies Trained" },
  { value: "Soft Skills", label: "Communication & EQ" },
  { value: "Leadership", label: "Executive Development" },
  { value: "Tech Skills", label: "Digital Transformation" },
];

export default function CorporateTrainerPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="ct-wrapper">

      {/* ── Navigation ── */}
      <nav className="ct-nav">
        <div className="ct-nav-left">
          <span className="ct-logo">PROF RBR</span>
        </div>
        <button className="ct-nav-btn" onClick={() => navigate("/")}>
          Go Back <ArrowUpRight />
        </button>
      </nav>

      <div className="ct-body">

        {/* ══════════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════════ */}
        <section className="ct-hero">
          <div className="ct-bg-text">RBR</div>

          <div className="ct-hero-inner">
            {/* Left */}
            <div className="ct-hero-left">
              <div className="ct-eyebrow">
                <div className="eyebrow-row">
                  <span className="eyebrow-label">Domain</span>
                  <span className="eyebrow-value">CORPORATE TRAINING</span>
                </div>
                <div className="eyebrow-row">
                  <span className="eyebrow-label">Impact</span>
                  <span className="eyebrow-value">WORKFORCE DEVELOPMENT</span>
                </div>
              </div>

              <h1 className="ct-headline">
                Empowering <br />
                <em>Modern</em> <br />
                Workforces.
              </h1>

              <div className="ct-hero-cards">
                <div className="ct-card dark">
                  <Badge label="Bridging the Gap" />
                  <p className="ct-card-text">
                    Transforming employees into confident professionals, effective leaders, and collaborative team members in today's rapidly evolving business world.
                  </p>
                </div>
                <div className="ct-card gold">
                  <Badge label="Industry Reach" type="gold" />
                  <div className="ct-card-big-num">100+</div>
                  <p className="ct-card-text" style={{ color: "#444" }}>
                    Companies trained across diverse industries.
                  </p>
                </div>
              </div>
            </div>

            {/* Right — Hero Image */}
            <div className="ct-hero-right">
              <div className="ct-hero-img-wrap">
                <img
                  src={heroPerson}
                  alt="Prof. Ravindrababu Ravula as Corporate Trainer"
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                />
                <div className="ct-hero-img-overlay">
                  <p className="ct-img-title">Corporate<br />Trainer</p>
                  <div className="ct-stat-box">
                    <div className="big-num">100+</div>
                    <div className="small-lbl">Corporate<br />Partners</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats Strip ── */}
        <section className="ct-stats-strip">
          <div className="ct-stats-inner">
            <div className="ct-strip-label">
              <BuildingIcon />
              <span>Building Future-Ready Organizations</span>
            </div>
            <div className="ct-stats-grid">
              {CT_STATS.map((s) => (
                <div className="ct-stat-item" key={s.label}>
                  <div className="ct-stat-val">{s.value}</div>
                  <div className="ct-stat-lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="ct-divider" />

        {/* ══════════════════════════════════════════
            PANEL 2 — THE MODERN WORKPLACE
        ══════════════════════════════════════════ */}
        <section className="ct-section">
          <div className="ct-panel-inner">
            {/* Left: Text content */}
            <div className="ct-panel-left">
              <p className="sec-label">The Landscape</p>
              <h2 className="panel-h2">
                Corporate Training<br />in the <em style={{ fontStyle: "normal", color: "#ffb703" }}>Modern Workplace</em>
              </h2>
              <p className="panel-p">
                Organizations today operate in environments defined by rapid technological change, global collaboration, and constant innovation. To remain competitive, companies must ensure employees possess both technical knowledge and the soft skills to communicate, collaborate, and lead effectively.
              </p>
              <p className="panel-p">
                Corporate training helps bridge skill gaps by enhancing employee capabilities, improving productivity, and strengthening organizational culture. It plays a key role in equipping employees with the skills needed to adapt to new technologies, evolving business practices, and changing market demands.
              </p>

              <div className="ct-pills-row">
                {['Skill Gaps Bridged', 'Productivity Enhanced', 'Culture Strengthened', 'Workforce Future-Ready'].map(tag => (
                  <span key={tag} className="ct-pill">{tag}</span>
                ))}
              </div>
            </div>

            {/* Right: Image */}
            <div className="ct-panel-right">
              <div className="ct-img-card">
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80"
                  alt="Corporate meeting and collaboration"
                />
              </div>
              <div className="ct-info-card">
                <h3>Recognizing These Needs</h3>
                <p>Prof. Ravindrababu Ravula has designed training programs that combine practical workplace skills with modern technological awareness, enabling professionals to perform effectively in dynamic corporate environments.</p>
              </div>
            </div>
          </div>

          <div className="ct-panel-full">
            <blockquote className="ct-quote">
              "When individuals grow and develop their skills, organizations naturally grow stronger."
            </blockquote>
          </div>
        </section>

        <div className="ct-divider" />

        {/* ══════════════════════════════════════════
            PANEL 3 — 100+ COMPANIES
        ══════════════════════════════════════════ */}
        <section className="ct-section ct-section-alt">
          <div className="ct-panel-inner ct-panel-reverse ct-panel-v-center">
            {/* Left: Big stat */}
            <div className="ct-panel-left">
              <div className="ct-huge-stat">
                <div className="ct-huge-num">
                  <CountUp end={100} suffix="+" />
                </div>
                <div className="ct-huge-label">Organizations Transformed</div>
                <p className="ct-huge-desc">Through sessions designed to be interactive, practical, and aligned with real-world business challenges.</p>
              </div>
            </div>

            {/* Right: Text content */}
            <div className="ct-panel-right">
              <p className="sec-label">Widespread Impact</p>
              <h2 className="panel-h2">Training More Than 100 Companies</h2>
              <p className="panel-p">
                Over the course of his career, Prof. Ravindrababu Ravula has conducted corporate training programs for more than 100 companies, delivering workshops, seminars, and skill development programs for professionals across different industries.
              </p>
              <p className="panel-p">
                These training sessions focus on improving both individual performance and team effectiveness, ensuring that employees develop the capabilities needed to contribute meaningfully to organizational success.
              </p>
              <blockquote className="ct-quote">
                "Participants often highlight his ability to simplify complex concepts, engage audiences, and provide actionable insights that professionals can apply immediately in their work environments."
              </blockquote>
            </div>
          </div>
        </section>

        <div className="ct-divider" />

        {/* ══════════════════════════════════════════
            PANEL 4 — TRAINING DOMAINS
        ══════════════════════════════════════════ */}
        <section className="ct-section">
          <div className="ct-domains-header">
            <Badge label="Key Focus Areas" />
            <h2 className="panel-h2" style={{ textAlign: "center", marginTop: 16 }}>Comprehensive Skill Development</h2>
          </div>

          <div className="ct-domains-grid">
            <div className="ct-domain-card">
              <h3 className="domain-h3">Soft Skills Training</h3>
              <p className="domain-p">Modern organizations increasingly value soft skills. Communication, emotional intelligence, adaptability, and problem-solving are among the most critical skills required for professional success.</p>
              <ul className="ct-check-list">
                <li><CheckIcon /> Effective communication and presentation</li>
                <li><CheckIcon /> Emotional intelligence & relationships</li>
                <li><CheckIcon /> Conflict resolution and problem-solving</li>
                <li><CheckIcon /> Collaboration and teamwork</li>
                <li><CheckIcon /> Adaptability in changing work environments</li>
                <li><CheckIcon /> Time management and productivity</li>
              </ul>
            </div>

            <div className="ct-domain-card">
              <h3 className="domain-h3">Leadership Development</h3>
              <p className="domain-p">As organizations grow, the need for capable leaders becomes increasingly important. Emotional intelligence is recognized as a key trait that enables resolving conflicts and fostering relationships.</p>
              <ul className="ct-check-list">
                <li><CheckIcon /> Strategic thinking and decision-making</li>
                <li><CheckIcon /> Emotional intelligence in leadership</li>
                <li><CheckIcon /> Motivating and inspiring teams</li>
                <li><CheckIcon /> Managing organizational change</li>
                <li><CheckIcon /> Building high-performance teams</li>
                <li><CheckIcon /> Effective feedback & performance management</li>
              </ul>
            </div>

            <div className="ct-domain-card ct-domain-wide">
              <div className="ct-domain-split">
                <div>
                  <h3 className="domain-h3">Technical & Technology-Oriented Training</h3>
                  <p className="domain-p">As industries increasingly rely on technology-driven solutions, professionals must remain updated with evolving technical concepts and digital tools. By integrating both technical knowledge and soft skills, he helps professionals develop a well-rounded skill set.</p>
                </div>
                <ul className="ct-check-list ct-check-grid">
                  <li><CheckIcon /> Problem-solving using technology</li>
                  <li><CheckIcon /> Modern software development practices</li>
                  <li><CheckIcon /> Analytical thinking & algorithmic problem-solving</li>
                  <li><CheckIcon /> Technology-driven innovation</li>
                  <li><CheckIcon /> Digital transformation awareness</li>
                  <li><CheckIcon /> Productivity tools for modern workplaces</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="ct-divider" />

        {/* ══════════════════════════════════════════
            PANEL 5 — APPROACH & HIGH-PERFORMANCE TEAMS
        ══════════════════════════════════════════ */}
        <section className="ct-section ct-section-alt">
          <div className="ct-panel-inner ct-panel-v-center">
            <div className="ct-panel-left">
              <p className="sec-label">The Methodology</p>
              <h2 className="panel-h2">Interactive and Practical Learning Approach</h2>
              <p className="panel-p">
                One of the defining features of Prof. Ravindrababu Ravula's corporate training methodology is his emphasis on interactive and practical learning. Rather than relying solely on theoretical lectures, his sessions ensure that participants not only understand concepts but also learn how to apply them effectively.
              </p>

              <div className="ct-method-tags">
                {['Real-world case studies', 'Interactive discussions', 'Scenario-based learning', 'Problem-solving exercises', 'Leadership simulations'].map(tag => (
                  <span key={tag} className="ct-method-tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="ct-panel-right">
              <div className="ct-info-card" style={{ marginBottom: 0 }}>
                <Badge label="Organizational Growth" />
                <h3 style={{ marginTop: 16 }}>Building High-Performance Teams</h3>
                <p>Successful organizations are built on strong teams that collaborate effectively and work toward shared goals.</p>
                <p style={{ marginTop: 8 }}>He helps organizations develop teams that are:</p>
                <ul className="ct-check-list" style={{ marginTop: 12 }}>
                  <li><CheckIcon /> Collaborative and supportive</li>
                  <li><CheckIcon /> Innovative and solution-oriented</li>
                  <li><CheckIcon /> Adaptable to change</li>
                  <li><CheckIcon /> Committed to continuous learning</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="ct-divider" />

        {/* ══════════════════════════════════════════
            PANEL 6 — CONCLUSION
        ══════════════════════════════════════════ */}
        <section className="ct-section" style={{ paddingBottom: "100px" }}>
          <div className="ct-panel-inner">
            <div className="ct-panel-left">
              <p className="sec-label">The Ongoing Mission</p>
              <h2 className="panel-h2">Inspiring Professionals to Grow</h2>
              <p className="panel-p">
                For Prof. Ravindrababu Ravula, corporate training is not just about improving professional skills—it is about empowering individuals to reach their full potential.
              </p>
              <p className="panel-p">
                Many professionals attend training sessions with the goal of improving workplace performance, but they often leave with something more valuable: renewed confidence, clarity of purpose, and a stronger commitment to personal growth.
              </p>
              <blockquote className="ct-quote">
                <strong style={{ color: "#fff", display: "block" }}>"When individuals grow, organizations grow."</strong>
              </blockquote>
            </div>

            <div className="ct-panel-right">
              <div className="ct-gold-card">
                <Badge label="Conclusion" type="gold" />
                <h3 className="ct-gold-h3" style={{ marginTop: 16 }}>
                  A Continuing Mission to Empower Organizations
                </h3>
                <p className="ct-gold-p">
                  Prof. Ravindrababu Ravula's work as a corporate trainer represents another dimension of his lifelong mission to empower people through knowledge. Having trained professionals across more than 100 companies, he continues to help organizations develop skilled, confident, and future-ready professionals.
                </p>
                <p className="ct-gold-p" style={{ marginTop: 16, fontWeight: 600, color: "#111" }}>
                  In a world where knowledge, adaptability, and collaboration define success, Prof. Ravindrababu Ravula remains dedicated to shaping professionals who can lead, innovate, and thrive in the modern workplace.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="ct-footer">
          <div className="ct-footer-inner">
            <div>
              <div className="ct-footer-logo">PROF RBR</div>
              <p className="ct-footer-tagline">
                Transforming the modern workforce —<br />empowering leaders and teams.
              </p>
            </div>
            <div className="ct-footer-copy">
              © 2026 Prof. Ravindrababu Ravula. All rights reserved.
            </div>
          </div>
        </footer>

      </div>

      {/* Scroll hint */}
      <div className="ct-scroll-hint" style={{ opacity: scrolled ? 0 : 1 }}>
        <div className="ct-scroll-mouse" />
        <span>Scroll Down</span>
      </div>

    </div>
  );
}
