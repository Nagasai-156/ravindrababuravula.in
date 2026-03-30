import React, { useEffect, useRef } from "react";
import heroPerson from "./assets/hero-person.png";
import { mentors } from "./data/mentors";
import "./MentorsPage.css";

/* ── Icons ── */
const StarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3" />
  </svg>
);

const CheckCircle = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffb703" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const AwardIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffb703" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const UsersIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const Badge = ({ label, type = "dark" }) => (
  <span className="cc-badge" style={{
    background: type === "gold" ? "rgba(0,0,0,0.15)" : "rgba(255,183,3,0.12)",
    color: type === "gold" ? "#111" : "#ffb703",
    border: type !== "gold" ? "1px solid rgba(255,183,3,0.2)" : "none",
  }}>
    <StarIcon /> {label}
  </span>
);

/* ── Scroll-reveal wrapper ── */
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) e.target.classList.add("mn-revealed"); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div className={`mn-reveal ${className}`} ref={ref} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

/* ── Single Mentor Section ── */
function MentorProfile({ data, index }) {
  const hasPhoto = !!data.photo;

  return (
    <Reveal className="mn-profile" delay={0.1}>
      <div className="mn-profile-inner">

        {/* Left / Photo side */}
        <div className="mn-profile-left">
          <div className="mn-profile-photo-wrap">
            <img
              src={hasPhoto ? data.photo : "/mentors/default-avatar.svg"}
              alt={data.name}
              className="mn-profile-photo"
            />
          </div>
          {/* Name shown beside avatar on mobile */}
          <div className="mn-profile-mobile-info">
            <h3 className="mn-profile-name mn-mobile-name">{data.name}</h3>
            <p className="mn-profile-qual mn-mobile-qual">{data.qualification}</p>
          </div>
        </div>

        {/* Right / Content side */}
        <div className="mn-profile-right">
          <div className="mn-profile-num">
            {String(index + 1).padStart(2, "0")}
          </div>

          <h3 className="mn-profile-name mn-desktop-name">{data.name}</h3>
          <p className="mn-profile-qual mn-desktop-qual">{data.qualification}</p>

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <div className="mn-profile-block">
              <div className="mn-profile-block-label"><BriefcaseIcon /> Experience</div>
              <ul className="mn-profile-exp-list">
                {data.experience.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </div>
          )}

          {/* Achievements */}
          {data.achievements && (
            <div className="mn-profile-block">
              <div className="mn-profile-block-label"><AwardIcon /> Achievements</div>
              <p className="mn-profile-desc">{data.achievements}</p>
            </div>
          )}

          {/* Description */}
          {data.description && (
            <p className="mn-profile-desc">{data.description}</p>
          )}

          {/* Mentorship Areas */}
          <div className="mn-profile-block">
            <div className="mn-profile-block-label"><CheckCircle /> Mentorship Areas</div>
            <div className="mn-profile-areas">
              {data.areas.map((a, i) => (
                <div className="mn-profile-area" key={i}>
                  <span className="mn-area-dot" />
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════ */
export default function MentorsPage() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  return (
    <div className="mn-page">

      {/* ─── HERO ─── */}
      <section className="p1-hero">
        <div className="p1-bg-text">RBR</div>
        <div className="p1-hero-inner">
          <div className="p1-left">
            <div className="p1-eyebrow">
              <div className="eyebrow-row">
                <span className="eyebrow-label">Program</span>
                <span className="eyebrow-value">1:1 MENTORSHIP</span>
              </div>
              <div className="eyebrow-row">
                <span className="eyebrow-label">Mentors</span>
                <span className="eyebrow-value">IIT · IISc · DRDO · FAANG</span>
              </div>
            </div>

            <h1 className="p1-headline">
              Learn from those<br />
              who've <em>been there.</em>
            </h1>

            <div className="p1-cards-row">
              <div className="cc dark">
                <Badge label="Expert Network" />
                <div className="cc-journey">
                  <div className="journey-year">Doubt</div>
                  <div className="journey-arrow">→</div>
                  <div className="journey-year accent">Clarity</div>
                </div>
                <div className="cc-lbl">Private sessions with DRDO scientists, IIT researchers, and FAANG engineers who cracked GATE and built exceptional careers.</div>
                <div className="cc-prog">
                  <div className="cc-prog-fill" style={{ width: "100%" }} />
                </div>
                <div className="cc-prog-labels">
                  <span>DRDO · Oracle · Amazon · PayPal · Walmart</span>
                </div>
              </div>

              <div className="cc gold" style={{ minHeight: 200, justifyContent: "space-between" }}>
                <Badge label="Personalized" type="gold" />
                <div className="cc-val" style={{ marginTop: "auto", marginBottom: 6, fontSize: "2rem" }}>1:1</div>
                <div className="cc-lbl" style={{ color: "#333" }}>
                  Mentorship on GMeet, Zoom, or phone call — tailored to your goals, your pace, your journey.
                </div>
              </div>
            </div>
          </div>

          <div className="p1-right">
            <div className="p1-img-wrap">
              <img src={heroPerson} alt="Prof. RBR" style={{ objectFit: "cover", objectPosition: "top center" }} />
              <div className="p1-img-overlay">
                <p className="p1-img-title">Mentored by<br />the Best</p>
                <div className="p1-stat-box">
                  <div className="big-num" style={{ fontSize: "1.8rem" }}>Expert</div>
                  <div className="small-lbl">Expert<br />Mentors</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="yt-stats-strip">
        <div className="yt-stats-inner">
          <div className="yt-strip-label"><UsersIcon /><span>Mentorship Highlights</span></div>
          <div className="yt-stats-grid">
            {[
              { v: "Top", l: "Expert Mentors" },
              { v: "1:1", l: "Private Sessions" },
              { v: "IITs", l: "IISc & Top Colleges" },
              { v: "FAANG", l: "& Govt Orgs" },
            ].map(s => (
              <div className="yt-stat-item" key={s.l}>
                <div className="yt-stat-val">{s.v}</div>
                <div className="yt-stat-lbl">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="ep-divider" />

      {/* ─── ALL MENTOR PROFILES ─── */}
      <section className="mn-profiles-section">
        <div className="mn-profiles-inner">
          <p className="sec-label" style={{ textAlign: "center" }}>Our Mentors</p>
          <h2 className="panel-h2" style={{ textAlign: "center" }}>Meet Every Mentor</h2>
          <p className="panel-p mn-profiles-subtitle">
            Each mentor brings real-world experience from top institutions and companies.
            Browse their full profiles — qualifications, experience, achievements, and what they can help you with.
          </p>

          <div className="mn-profiles-list">
            {mentors.map((m, i) => (
              <MentorProfile key={m.name} data={m} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── NOTE ─── */}
      <section className="mn-note-section">
        <div className="mn-note-inner">
          <div className="mn-note-card">
            <p>Mentorship is available either on <strong>Google Meet</strong>, <strong>Zoom</strong>, or a <strong>phone call</strong> as per the mentor's convenience.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
