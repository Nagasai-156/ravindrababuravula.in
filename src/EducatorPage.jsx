import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "./assets/logo.png";
import heroPerson from "./assets/hero-person.png";
import "./EducatorPage.css";

/* ── Icons ── */
const ArrowUpRight = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const BookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);

const StarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
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

/* ── Educator stat data ── */
const EDU_STATS = [
  { value: "18+", label: "Years Experience", icon: "👨‍🏫" },
  { value: "IISc", label: "Master's Degree", icon: "🏛️" },
  { value: "PhD", label: "Finance & AI/ML", icon: "🎓" },
  { value: "Lakhs", label: "Students Mentored", icon: "🌟" },
];

export default function EducatorPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="ep-wrapper">

      {/* ── Navigation ── */}
      <nav className="hs-nav">
        <div className="hs-nav-left">
          <img src={logoImg} alt="Logo" style={{ height: '32px' }} />
        </div>
        <button className="hs-nav-btn" onClick={() => navigate("/")}>
          Go Back <ArrowUpRight />
        </button>
      </nav>

      <div className="ep-body">

        {/* ══════════════════════════════════════════
            PANEL 1 — HERO
        ══════════════════════════════════════════ */}
        <section className="p1-hero">
          <div className="p1-bg-text">RBR</div>

          <div className="p1-hero-inner">

            {/* ─ Left ─ */}
            <div className="p1-left">
              {/* Eyebrow tags */}
              <div className="p1-eyebrow">
                <div className="eyebrow-row">
                  <span className="eyebrow-label">Role</span>
                  <span className="eyebrow-value">MASTER EDUCATOR</span>
                </div>
                <div className="eyebrow-row">
                  <span className="eyebrow-label">Domain</span>
                  <span className="eyebrow-value">COMPUTER SCIENCE</span>
                </div>
              </div>

              <h1 className="p1-headline">
                The educator who<br />
                <em>redefined</em> CS<br />
                learning in India.
              </h1>

              {/* Two meaningful cards */}
              <div className="p1-cards-row">

                {/* Card 1 — Journey timeline */}
                <div className="cc dark">
                  <Badge label="Teaching Evolution" />
                  <div className="cc-journey">
                    <div className="journey-year" style={{fontSize: "1.2rem"}}>Classrooms</div>
                    <div className="journey-arrow">→</div>
                    <div className="journey-year accent" style={{fontSize: "1.2rem"}}>Digital scale</div>
                  </div>
                  <div className="cc-lbl">Adapted seamlessly to online platforms, expanding his reach nationwide.</div>
                  <div className="cc-prog">
                    <div className="cc-prog-fill" style={{ width: "100%" }} />
                  </div>
                  <div className="cc-prog-labels">
                    <span>18 Years of Excellence</span>
                  </div>
                </div>

                {/* Card 2 — Gold Impact */}
                <div className="cc gold" style={{ minHeight: 200, justifyContent: "space-between" }}>
                  <Badge label="Student Trust" type="gold" />
                  <div className="cc-val" style={{ marginTop: 'auto', marginBottom: 6, fontSize: '1.4rem', fontWeight: 600 }}>
                    "God of CS"
                  </div>
                  <div className="cc-lbl" style={{ color: '#333' }}>
                    A powerful title reflecting the profound trust and admiration earned from generations of learners.
                  </div>
                </div>

              </div>
            </div>

            {/* ─ Right ─ Image */}
            <div className="p1-right">
              <div className="p1-img-wrap">
                <img
                  src={heroPerson}
                  alt="Prof. Ravindrababu Ravula as Educator"
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                />
                <div className="p1-img-overlay">
                  <p className="p1-img-title">Pioneer of<br />CS Education</p>
                  <div className="p1-stat-box">
                    <div className="big-num">18+</div>
                    <div className="small-lbl">Years of<br />Excellence</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════
            EDUCATOR STATS STRIP
        ══════════════════════════════════════════ */}
        <section className="yt-stats-strip">
          <div className="yt-stats-inner">
            <div className="yt-strip-label">
              <BookIcon />
              <span>A Legacy of Academic Brilliance</span>
            </div>
            <div className="yt-stats-grid">
              {EDU_STATS.map((s) => (
                <div className="yt-stat-item" key={s.label}>
                  <div className="yt-stat-val">{s.value}</div>
                  <div className="yt-stat-lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="ep-divider yp-divider" />

        {/* ══════════════════════════════════════════
            PANEL 2 — ACADEMIC EXCELLENCE & STRUGGLES
        ══════════════════════════════════════════ */}
        <section className="p2-section">
          <div className="p2-inner">
            <div className="p2-left">
              <p className="sec-label">Chapter 01</p>
              <h2 className="panel-h2">Academic Excellence & Intellectual Foundation</h2>
              <p className="panel-p">
                The academic journey of Prof. Ravindrababu Ravula reflects a deep commitment to learning and intellectual growth. He completed his Master’s degree in Computer Science from the prestigious Indian Institute of Science (IISc), one of India’s most respected research institutions and a global center for scientific excellence.
              </p>
              <p className="panel-p">
                Driven by curiosity, he went on to earn a PhD focusing on Finance, Artificial Intelligence, and Machine Learning. This unique academic combination allowed him to develop a deep understanding of both theoretical computer science and its real-world applications.
              </p>

              <div className="img-card tall">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80"
                  alt="Teacher explaining concepts"
                />
              </div>
            </div>

            <div className="p2-right">
              <div className="dark-info-card">
                <h3>Overcoming Early Struggles</h3>
                <p>
                  Behind the success lies a journey filled with challenges. In his early years, he faced significant personal and financial struggles, including overcoming dyslexia — a learning difficulty that makes reading and processing written information challenging.
                </p>
                <p>
                  Instead of allowing this obstacle to hold him back, he transformed it into a strength. Because of this experience, he developed a unique ability to break down complex ideas into simpler, more intuitive explanations.
                </p>
              </div>

              <blockquote className="highlight-quote">
                "Students often remark that he has an extraordinary talent for explaining difficult subjects in ways that anyone can understand — a talent that emerged from his own determination to overcome learning challenges."
              </blockquote>

              {/* Mini stat row */}
              <div className="p2-mini-stats">
                <div className="p2-mini-stat">
                  <div className="p2-mini-val">IISc</div>
                  <div className="p2-mini-lbl">Alumnus</div>
                </div>
                <div className="p2-mini-divider" />
                <div className="p2-mini-stat">
                  <div className="p2-mini-val">PhD</div>
                  <div className="p2-mini-lbl">AI & Finance</div>
                </div>
                <div className="p2-mini-divider" />
                <div className="p2-mini-stat">
                  <div className="p2-mini-val">18+</div>
                  <div className="p2-mini-lbl">Years Teaching</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="ep-divider yp-divider" />

        {/* ══════════════════════════════════════════
            PANEL 3 — PASSION TO SUCCESS
        ══════════════════════════════════════════ */}
        <section className="p3-section">
          <div className="p3-inner">
            <div className="p3-left">
              <div className="big-chapter">02</div>
              <h2 className="panel-h2">A Passion That Never Faded</h2>

              <div className="note-row">
                <div className="note-item">
                  <div className="note-label">Belief</div>
                  <div className="note-value">HONEST DEDICATION</div>
                </div>
                <div className="note-item">
                  <div className="note-label">Result</div>
                  <div className="note-value">EXTRAORDINARY OUTCOMES</div>
                </div>
              </div>

              <p className="panel-p">
                For Prof. Ravindrababu Ravula, teaching has never been just a profession—it has always been a deep passion. In the early stages, pursuing this passion was not financially rewarding. He faced severe financial difficulties, and at one point even went bankrupt while building his educational platform.
              </p>
              <p className="panel-p">
                Yet, despite these hardships, he never abandoned his mission. His belief was simple yet powerful: if you follow your passion with dedication and honesty, success will eventually follow.
              </p>
            </div>

            <div className="p3-right">
              <div className="cc-innovation">
                <Badge label="Entrepreneurial Success" />
                <h3 className="cc-innovation-title">From Struggle to Scale</h3>
                <div className="cc-innovation-text">
                  <strong>He founded Rauder Eduservices Pvt. Ltd,</strong> an educational venture delivering high-quality CS education. The impact was so significant that it was eventually acquired by Unacademy, marking a major entrepreneurial milestone.
                  <br /><br />
                  As platforms expanded, he became a star faculty at <em>Physics Wallah</em>, taking his logical approach to even wider audiences.
                </div>
              </div>

              <div className="dark-info-card">
                <p>
                  Today, his influence spans the entire EdTech ecosystem in India. His lecture styles, structured notes, and conceptual explanations have become the reference point. In fact, many EdTech companies today follow teaching methodologies inspired directly by his foundational work.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="ep-divider yp-divider" />

        {/* ══════════════════════════════════════════
            PANEL 4 — INSPIRING GENERATIONS
        ══════════════════════════════════════════ */}
        <section className="p4-section">
          <div className="p4-inner">
            <div className="p4-left">
              <p className="sec-label">Chapter 03</p>
              <h2 className="panel-h2">Inspiring a Generation of Engineers</h2>
              <p className="panel-p">
                The impact of Prof. Ravindrababu Ravula goes far beyond individual classrooms or online lectures. Over the years, he has inspired an entire generation of engineers who have gone on to build successful careers in technology, research, and innovation.
              </p>
              <p className="panel-p">
                More importantly, he has helped elevate the reputation of teaching itself, showing that teaching is a powerful force that can shape the future of society.
              </p>

              <div className="list-card">
                {[
                  "Elevating the reputation of the teaching profession",
                  "Inspiring young educators to teach with pride and passion",
                  "Mentoring students beyond just academic test scores",
                  "Shaping the methodologies used across the EdTech ecosystem",
                ].map((item, i) => (
                  <div className="list-row" key={i}>
                    <span className="num">0{i + 1}</span>
                    <span className="txt">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p4-right">
              <div className="img-card landscape" style={{ height: 320 }}>
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80"
                  alt="Student success"
                />
              </div>

              <div className="support-grid">
                <div className="cc dark" style={{ padding: 24 }}>
                  <Badge label="Continuous Learning" />
                  <div className="cc-body" style={{ color: "#aaa", marginTop: 8 }}>
                    Despite becoming a millionaire, his hunger to learn, improve, and excel has never faded.
                  </div>
                </div>
                <div className="dark-info-card" style={{ margin: 0 }}>
                  <p>
                    One of the most remarkable aspects of his personality is that he approaches every class 
                    as if it were his very first class — with the exact same enthusiasm and preparation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="ep-divider yp-divider" />

        {/* ══════════════════════════════════════════
            PANEL 5 — LEGACY
        ══════════════════════════════════════════ */}
        <section className="p5-section">
          <div className="p5-inner">
            <div className="p5-left">
              <p className="sec-label">Chapter 04</p>
              <h2 className="panel-h2">A Legacy Built on Dedication</h2>
              <p className="panel-p">
                With 18 years of teaching experience, a strong academic background from IISc, entrepreneurial success through Rauder Eduservices, and widespread influence across India’s EdTech ecosystem, he has left a lasting mark on the world of computer science education.
              </p>

              <h2 className="panel-h2" style={{ marginTop: 60 }}>A Lifelong Educator</h2>
              <p className="panel-p">
                Above all, he remains what he has always been—a teacher driven by passion, committed to empowering students, and determined to make knowledge accessible to everyone.
              </p>
            </div>

            <div className="p5-right">
              <div className="gold-card-massive">
                <Badge label="Conclusion" type="gold" />

                <h3 className="gold-card-h3" style={{ fontSize: '1.4rem' }}>
                  The story of Prof. Ravindrababu Ravula is a story of resilience, passion, and transformation. 
                  From overcoming learning challenges and financial struggles to becoming one of the most respected 
                  educators in the country.
                </h3>

                <p className="gold-card-p">
                  Through his work, Prof. Ravindrababu Ravula has not only taught computer science—he has inspired 
                  lakhs of learners and helped shape the future of engineering education in India.
                </p>

                <div className="gold-quote-box">
                  <strong>"His journey reflects the powerful truth that if you follow your passion with dedication and honesty, true success and societal impact will inevitably follow."</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FOOTER 
        ══════════════════════════════════════════ */}
        <footer className="yp-footer ep-footer">
          <div className="yp-footer-inner ep-footer-inner">
            <div className="yp-footer-left">
              <div className="footer-logo-text">Prof. Ravindrababu Ravula</div>
              <p className="yp-footer-tagline">
                Transforming the way India learns —<br />one lecture at a time.
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
        <span>Scroll to Explore</span>
      </div>

    </div>
  );
}
