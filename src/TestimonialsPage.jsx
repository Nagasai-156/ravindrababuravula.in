import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import heroPerson from "./assets/hero-person.png";
import { testimonials } from "./data/testimonials";
import "./TestimonialsPage.css";

/* ── Icons ── */
const StarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const TrophyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
);

const QuoteIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" opacity="0.12">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

/* ── Badge pill ── */
const Badge = ({ label, type = "dark" }) => (
  <span className="cc-badge" style={{
    background: type === "gold" ? "rgba(0,0,0,0.15)" : "rgba(255,183,3,0.12)",
    color: type === "gold" ? "#111" : "#ffb703",
    border: type !== "gold" ? "1px solid rgba(255,183,3,0.2)" : "none",
  }}>
    <StarIcon /> {label}
  </span>
);

/* ── Rank Badge ── */
function RankBadge({ rank }) {
  let cls = "tm-rank-badge";
  if (rank <= 3) cls += " gold";
  else if (rank <= 10) cls += " silver";
  else if (rank <= 50) cls += " bronze";
  return (
    <div className={cls}>
      <TrophyIcon />
      <span>AIR {rank}</span>
    </div>
  );
}

/* ── Close Icon ── */
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ── Testimonial Modal ── */
function TestimonialModal({ data, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="tm-modal-overlay" onClick={onClose}>
      <div className="tm-modal" onClick={(e) => e.stopPropagation()}>
        <button className="tm-modal-close" onClick={onClose}><CloseIcon /></button>

        <div className="tm-modal-header">
          <div className="tm-modal-avatar-wrap">
            <img
              src={data.photo}
              alt={data.name}
              className="tm-modal-avatar"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=ffb703&color=111&size=300&bold=true&font-size=0.35`;
              }}
            />
          </div>
          <div className="tm-modal-info">
            <h2 className="tm-modal-name">{data.name}</h2>
            {data.air ? (
              <span className="tm-modal-rank">
                <TrophyIcon /> AIR {data.air}
              </span>
            ) : data.institution ? (
              <span className="tm-modal-inst">{data.institution}</span>
            ) : null}
          </div>
        </div>

        <div className="tm-modal-divider" />

        <div className="tm-modal-bg-quote">"</div>
        <div className="tm-modal-body">
          <p>{data.testimonial}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Testimonial Card ── */
function TestimonialCard({ data, index, onSelect }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const isLong = data.testimonial.length > 220;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) e.target.classList.add("tm-visible"); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className={`tm-card ${data.air && data.air <= 50 ? "tm-card-elite" : ""}`} ref={ref} style={{ transitionDelay: `${(index % 9) * 0.06}s`, cursor: "pointer" }} onClick={() => onSelect(data)}>
      <div className="tm-card-glow" />

      {/* Rank ribbon */}
      {data.air && (() => {
        let label = null;
        if (data.air <= 5) label = "TOP 5";
        else if (data.air <= 10) label = "TOP 10";
        else if (data.air <= 50) label = "TOP 50";
        else if (data.air <= 100) label = "TOP 100";
        else if (data.air <= 300) label = "TOP 300";
        else if (data.air <= 1000) label = "TOP 1000";
        return label ? <div className="tm-card-ribbon">{label}</div> : null;
      })()}

      {/* Large quote background */}
      <div className="tm-card-bg-quote">"</div>

      {/* Header */}
      <div className="tm-card-header">
        <div className="tm-card-avatar-wrap">
          <img
            src={data.photo}
            alt={data.name}
            className="tm-card-avatar"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=ffb703&color=111&size=200&bold=true&font-size=0.4`;
            }}
          />
          <div className="tm-card-avatar-ring" />
        </div>
        <div className="tm-card-info">
          <h3 className="tm-card-name">{data.name}</h3>
          {data.air ? (
            <span className="tm-card-rank">
              <TrophyIcon /> AIR {data.air}
            </span>
          ) : data.institution ? (
            <span className="tm-card-inst">{data.institution}</span>
          ) : null}
        </div>
      </div>

      {/* Divider line */}
      <div className="tm-card-divider" />

      {/* Testimonial */}
      <div className={`tm-card-body ${expanded ? "expanded" : ""}`}>
        <p>{data.testimonial}</p>
      </div>
      {isLong && (
        <button className="tm-read-more" onClick={() => setExpanded(!expanded)}>
          {expanded ? "← Read Less" : "Read More →"}
        </button>
      )}
    </div>
  );
}

/* ── Filter pills ── */
const FILTERS = [
  { label: "All", value: "all" },
  { label: "Top 10", value: "top10" },
  { label: "Top 50", value: "top50" },
  { label: "Top 100", value: "top100" },
];

/* ── Scroll hint ── */
function ScrollHint() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="scroll-hint-overlay" style={{ opacity: visible ? 1 : 0 }}>
      <div className="scroll-mouse"><div className="scroll-dot" /></div>
      <span>Scroll to explore</span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════ */
export default function TestimonialsPage() {
  const [search, setSearch] = useState("");
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const navigate = useNavigate();

  const filtered = testimonials.filter((t) => {
    return !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      (t.institution && t.institution.toLowerCase().includes(search.toLowerCase())) ||
      (t.air != null && String(t.air).includes(search));
  });

  const paginated = filtered;

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  return (
    <div className="tm-page">

      {/* ─── HERO ─── */}
      <section className="p1-hero">
        <div className="p1-bg-text">RBR</div>

        <div className="p1-hero-inner">
          {/* LEFT */}
          <div className="p1-left">
            <div className="p1-eyebrow">
              <div className="eyebrow-row">
                <span className="eyebrow-label">PROOF</span>
                <span className="eyebrow-value">SUCCESS STORIES</span>
              </div>
              <div className="eyebrow-row">
                <span className="eyebrow-label">IMPACT</span>
                <span className="eyebrow-value">109+ GATE TOPPERS</span>
              </div>
            </div>

            <h1 className="p1-headline">
              Real students.<br />
              Real <em>victories.</em><br />
              Real impact.
            </h1>

            <div className="p1-cards-row">
              <div className="cc dark">
                <Badge label="Voices of Impact" />
                <div className="cc-journey">
                  <div className="journey-year">Dreams</div>
                  <div className="journey-arrow">→</div>
                  <div className="journey-year accent">Reality</div>
                </div>
                <div className="cc-lbl">Every testimonial here is a story of transformation — students who dared to dream and found the right guidance to make it happen.</div>
                <div className="cc-prog">
                  <div className="cc-prog-fill" style={{ width: "100%" }} />
                </div>
                <div className="cc-prog-labels">
                  <span>From IITs to IISc to Google</span>
                </div>
              </div>

              <div className="cc gold">
                <Badge label="In Their Words" type="gold" />
                <div className="cc-val">"Sir changed my life"</div>
                <div className="cc-lbl" style={{ color: "#111" }}>Hear directly from GATE toppers, IITians, and IISc scholars whose journeys were shaped by Prof. Ravula.</div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="p1-right">
            <div className="p1-img-wrap">
              <img src={heroPerson} alt="Prof. RBR" />
              <div className="p1-img-overlay">
                <p className="p1-img-title">The Mentor<br />Behind the Ranks</p>
                <div className="p1-stat-box">
                  <div className="big-num" style={{ fontSize: "1.8rem" }}>Guru</div>
                  <div className="small-lbl" style={{ color: "#111" }}>of GATE<br />Aspirants</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ─── */}
      <section className="yt-stats-strip">
        <div className="yt-stats-inner">
          <div className="yt-strip-label">
            <TrophyIcon />
            <span>Testimonial Highlights</span>
          </div>
          <div className="yt-stats-grid">
            <div className="yt-stat-item">
              <div className="yt-stat-val">109+</div>
              <div className="yt-stat-lbl">Success Stories</div>
            </div>
            <div className="yt-stat-item">
              <div className="yt-stat-val">AIR 2</div>
              <div className="yt-stat-lbl">Best Rank</div>
            </div>
            <div className="yt-stat-item">
              <div className="yt-stat-val">IITs</div>
              <div className="yt-stat-lbl">IISc & Top Colleges</div>
            </div>
            <div className="yt-stat-item">
              <div className="yt-stat-val">Google</div>
              <div className="yt-stat-lbl">& Top Companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DIVIDER ─── */}
      <div className="ep-divider" />

      {/* ─── ALL TESTIMONIALS ─── */}
      <section className="tm-all-section">
        <div className="tm-all-inner">
          <div className="tm-section-label">
            <StarIcon />
            <span>All Success Stories</span>
          </div>
          <h2 className="tm-section-title">What They Say</h2>

          {/* Search */}
          <div className="tm-controls">
            <div className="tm-search-wrap">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search by name or rank..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Grid */}
          {paginated.length > 0 ? (
            <div className="tm-grid">
              {paginated.map((t, i) => (
                <TestimonialCard key={`${t.name}-${t.air}`} data={t} index={i} onSelect={setSelectedTestimonial} />
              ))}
            </div>
          ) : (
            <div className="tm-empty">
              <p>No testimonials match your search.</p>
              <button onClick={() => { setSearch(""); setFilter("all"); }}>Reset</button>
            </div>
          )}

        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="tm-cta-section">
        <div className="tm-cta-inner">
          <div className="cc gold tm-cta-card">
            <Badge label="Your Turn" type="gold" />
            <h2 className="tm-cta-title">Ready to Write Your Own Success Story?</h2>
            <p className="tm-cta-desc">Join thousands of students who transformed their careers with Prof. Ravula's guidance.</p>
            <button className="tm-cta-btn" onClick={() => navigate("/educator")}>
              Start Learning Today →
            </button>
          </div>
        </div>
      </section>

      {selectedTestimonial && (
        <TestimonialModal data={selectedTestimonial} onClose={() => setSelectedTestimonial(null)} />
      )}

      <ScrollHint />
    </div>
  );
}
