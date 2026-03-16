import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "./assets/logo.png";
import heroPerson from "./assets/hero-person.png";
import "./YoutuberPage.css";

/* ── Icons ── */
const ArrowUpRight = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const StarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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

/* ── YouTube stat data ── */
const YT_STATS = [
  { value: "690K+", label: "Subscribers", icon: "👥" },
  { value: "2,448", label: "Videos Published", icon: "🎬" },
  { value: "90.9M+", label: "Total Views", icon: "👁️" },
  { value: "2012", label: "Teaching Since", icon: "📅" },
];

export default function YoutuberPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="yp-wrapper">

      {/* ── Navigation ── */}
      <nav className="hs-nav">
        <div className="hs-nav-left">
          <img src={logoImg} alt="Logo" style={{ height: '32px' }} />
        </div>
        <button className="hs-nav-btn" onClick={() => navigate("/")}>
          Go Back <ArrowUpRight />
        </button>
      </nav>

      <div className="yp-body">

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
                  <span className="eyebrow-label">Era</span>
                  <span className="eyebrow-value">THE 2010s</span>
                </div>
                <div className="eyebrow-row">
                  <span className="eyebrow-label">Domain</span>
                  <span className="eyebrow-value">COMPUTER SCIENCE</span>
                </div>
              </div>

              <h1 className="p1-headline">
                Prof RBR is the<br />
                <em>first one</em> to start<br />
                EdTech in India.
              </h1>

              {/* Two meaningful cards */}
              <div className="p1-cards-row">

                {/* Card 1 — Journey timeline */}
                <div className="cc dark">
                  <Badge label="YouTube Journey" />
                  <div className="cc-journey">
                    <div className="journey-year">2012</div>
                    <div className="journey-arrow">→</div>
                    <div className="journey-year accent">13+ Yrs</div>
                  </div>
                  <div className="cc-lbl">Started free CS lectures on YouTube — still going strong.</div>
                  <div className="cc-prog">
                    <div className="cc-prog-fill" style={{ width: "100%" }} />
                  </div>
                  <div className="cc-prog-labels">
                    <span>Started</span>
                    <span>Today</span>
                  </div>
                </div>

                {/* Card 2 — Channel link */}
                <div className="cc gold" style={{ minHeight: 200, justifyContent: "space-between" }}>
                  <div className="cc-yt-icon"><YoutubeIcon /></div>
                  <Badge label="Live Channel" type="gold" />
                  <div className="cc-yt-handle">@ravindrababu_ravula</div>
                  <a
                    href="https://www.youtube.com/@ravindrababu_ravula"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cc-yt-link"
                  >
                    Visit Channel ↗
                  </a>
                </div>

              </div>
            </div>

            {/* ─ Right ─ Image */}
            <div className="p1-right">
              <div className="p1-img-wrap">
                <img
                  src={heroPerson}
                  alt="Prof. Ravindrababu Ravula"
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                />
                <div className="p1-img-overlay">
                  <p className="p1-img-title">Pioneer of<br />EdTech India</p>
                  <div className="p1-stat-box">
                    <div className="big-num">690K+</div>
                    <div className="small-lbl">YouTube<br />Subscribers</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════
            YOUTUBE STATS STRIP
        ══════════════════════════════════════════ */}
        <section className="yt-stats-strip">
          <div className="yt-stats-inner">
            <div className="yt-strip-label">
              <YoutubeIcon />
              <span>youtube.com/@ravindrababu_ravula</span>
            </div>
            <div className="yt-stats-grid">
              {YT_STATS.map((s) => (
                <div className="yt-stat-item" key={s.label}>
                  <div className="yt-stat-val">{s.value}</div>
                  <div className="yt-stat-lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="yp-divider" />

        {/* ══════════════════════════════════════════
            PANEL 2 — VISION & EARLY DAYS
        ══════════════════════════════════════════ */}
        <section className="p2-section">
          <div className="p2-inner">
            <div className="p2-left">
              <p className="sec-label">Chapter 01</p>
              <h2 className="panel-h2">A Vision to Democratize Education</h2>
              <p className="panel-p">
                In the early 2010s, India was standing at the edge of a technological transformation.
                The internet was still a luxury for many students, smartphones were not yet common,
                and access to high-quality educational resources online was extremely limited.
              </p>
              <p className="panel-p">
                For countless engineering students across the country, especially those in smaller
                towns and rural regions, learning advanced computer science concepts often depended
                entirely on classroom lectures and textbooks.
              </p>

              <div className="img-card tall">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
                  alt="Students learning together"
                />
              </div>
            </div>

            <div className="p2-right">
              <div className="dark-info-card">
                <h3>A Pioneer in India's Early EdTech Era</h3>
                <p>
                  It was during this period of limited access and opportunity that Prof. Ravindrababu Ravula
                  emerged as a visionary educator and entrepreneur, going on to shape the early landscape
                  of India's EdTech movement.
                </p>
                <p>
                  In 2012, long before online learning became mainstream in India, Prof. Ravindrababu Ravula
                  started one of the first educational YouTube channels in India dedicated to computer
                  science education — sharing lectures for free, making complex subjects accessible
                  to students everywhere.
                </p>
              </div>

              <blockquote className="highlight-quote">
                "This initiative marked a historic step in India's digital education journey.
                What began as a simple effort to teach and guide students gradually evolved into
                a powerful educational movement."
              </blockquote>

              {/* Mini stat row */}
              <div className="p2-mini-stats">
                <div className="p2-mini-stat">
                  <div className="p2-mini-val">2012</div>
                  <div className="p2-mini-lbl">Year launched</div>
                </div>
                <div className="p2-mini-divider" />
                <div className="p2-mini-stat">
                  <div className="p2-mini-val">Free</div>
                  <div className="p2-mini-lbl">Forever accessible</div>
                </div>
                <div className="p2-mini-divider" />
                <div className="p2-mini-stat">
                  <div className="p2-mini-val">Lakhs</div>
                  <div className="p2-mini-lbl">Students reached</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="yp-divider" />

        {/* ══════════════════════════════════════════
            PANEL 3 — ENTREPRENEURIAL SPIRIT
        ══════════════════════════════════════════ */}
        <section className="p3-section">
          <div className="p3-inner">
            <div className="p3-left">
              <div className="big-chapter">02</div>
              <h2 className="panel-h2">The Entrepreneurial Spirit</h2>

              <div className="note-row">
                <div className="note-item">
                  <div className="note-label">Reach</div>
                  <div className="note-value">MASSIVE AUDIENCE</div>
                </div>
                <div className="note-item">
                  <div className="note-label">Approach</div>
                  <div className="note-value">DIGITAL PLATFORMS</div>
                </div>
              </div>

              <p className="panel-p">
                Beyond his role as an educator, Prof. Ravindrababu Ravula is also an entrepreneur
                who recognized the transformative power of technology in education. His approach
                combined teaching, innovation, and digital platforms to create a new model of
                learning — one where knowledge could be shared with lakhs of students simultaneously.
              </p>
              <p className="panel-p">
                This entrepreneurial mindset allowed him to build a powerful online learning
                ecosystem where students could access high-quality educational content anytime
                and from anywhere.
              </p>
            </div>

            <div className="p3-right">
              <div className="cc-innovation">
                <Badge label="Innovation" />
                <h3 className="cc-innovation-title">Scaling Quality Education</h3>
                <div className="cc-innovation-text">
                  <strong>By leveraging the reach of YouTube and digital platforms,</strong> he demonstrated how
                  education could be scaled to reach massive audiences while maintaining quality
                  and clarity.
                  <br /><br />
                  His journey reflects the true spirit of educational entrepreneurship — using
                  innovation to create <em>meaningful impact</em> in society.
                </div>
              </div>

              <div className="dark-info-card">
                <p>
                  Prof. Ravindrababu Ravula believed in a powerful idea: education should not be
                  restricted by geography, infrastructure, or financial limitations. Across India,
                  many talented students lacked access to quality teaching resources — not because
                  they lacked the ability to learn, but because the resources were simply not
                  available to them.
                </p>
                <p style={{ marginTop: 12 }}>
                  Recognizing this gap, he began creating structured lectures covering fundamental
                  and advanced topics in computer science, helping students prepare for competitive
                  exams and build confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="yp-divider" />

        {/* ══════════════════════════════════════════
            PANEL 4 — INSPIRING STUDENTS
        ══════════════════════════════════════════ */}
        <section className="p4-section">
          <div className="p4-inner">
            <div className="p4-left">
              <p className="sec-label">Chapter 03</p>
              <h2 className="panel-h2">Inspiring Students Beyond Academics</h2>
              <p className="panel-p">
                While his technical lectures helped students master computer science concepts,
                Prof. Ravindrababu Ravula understood that academic knowledge alone is not enough
                for success.
              </p>
              <p className="panel-p">
                Students often struggle with self-doubt, lack of confidence, and uncertainty
                about their career paths. Recognizing this challenge, he expanded his content
                beyond technical lectures and began creating motivational videos aimed at
                inspiring and guiding students toward success.
              </p>

              <div className="list-card">
                {[
                  "Perseverance and consistent effort",
                  "Building confidence and self-belief",
                  "Overcoming academic setbacks",
                  "Developing the right mindset for success",
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
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80"
                  alt="Students inspired"
                />
              </div>

              <div className="support-grid">
                <div className="cc dark" style={{ padding: 24 }}>
                  <Badge label="Emotional Support" />
                  <div className="cc-body" style={{ color: "#aaa", marginTop: 8 }}>
                    For many students, these messages became just as valuable as the technical lessons — offering encouragement during difficult times.
                  </div>
                </div>
                <div className="dark-info-card" style={{ margin: 0 }}>
                  <p>
                    By addressing both the intellectual and emotional aspects of learning,
                    Prof. Ravindrababu Ravula became not only a teacher but also a mentor to
                    lakhs of aspiring engineers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="yp-divider" />

        {/* ══════════════════════════════════════════
            PANEL 5 — IMPACT & CONCLUSION
        ══════════════════════════════════════════ */}
        <section className="p5-section">
          <div className="p5-inner">
            <div className="p5-left">
              <p className="sec-label">Chapter 04</p>
              <h2 className="panel-h2">Impact on Lakhs of Learners</h2>
              <p className="panel-p">
                Over the years, the educational content created by Prof. Ravindrababu Ravula
                has reached lakhs of students across India.
              </p>
              <p className="panel-p">
                For many students who lacked access to high-quality teaching resources, these
                videos became an accessible and reliable source of knowledge. By empowering
                students with knowledge and confidence, Prof. Ravindrababu Ravula has contributed
                to building a stronger generation of engineers, technologists, and innovators
                across India.
              </p>

              <h2 className="panel-h2" style={{ marginTop: 60 }}>A Legacy of Accessible Learning</h2>
              <p className="panel-p">
                One of the most remarkable aspects of Prof. Ravindrababu Ravula's journey is his
                unwavering commitment to making education accessible to everyone. Through his early
                efforts in digital education, he helped lay the foundation for the online learning
                culture that millions of students rely on today.
              </p>
              <p className="panel-p">
                As technology continues to reshape education, the vision championed by Prof.
                Ravindrababu Ravula remains more relevant than ever.
              </p>
            </div>

            <div className="p5-right">
              <div className="gold-card-massive">
                <Badge label="Conclusion" type="gold" />

                <h3 className="gold-card-h3">
                  The story of Prof. Ravindrababu Ravula is not simply the story of a teacher
                  uploading lectures online. It is the story of an entrepreneur, educator, and
                  pioneer who recognized the power of digital education long before it became
                  a global movement.
                </h3>

                <p className="gold-card-p">
                  Through his free computer science lectures, motivational guidance, and unwavering
                  commitment to student success, Prof. Ravindrababu Ravula has inspired and educated
                  lakhs of learners across the country.
                </p>

                <div className="gold-quote-box">
                  His work continues to stand as a testament to a simple yet powerful belief:
                  <strong>"Knowledge should be accessible to everyone, everywhere."</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FOOTER — no buttons, just elegance
        ══════════════════════════════════════════ */}
        <footer className="yp-footer">
          <div className="yp-footer-inner">
            <div className="yp-footer-left">
              <div className="footer-logo-text">Prof. Ravindrababu Ravula</div>
              <p className="yp-footer-tagline">
                Transforming the way India learns —<br />one lecture at a time.
              </p>
            </div>
            <div className="yp-footer-right">
              <a
                href="https://www.youtube.com/@ravindrababu_ravula"
                target="_blank"
                rel="noopener noreferrer"
                className="yp-yt-link"
              >
                <YoutubeIcon />
                <span>@ravindrababu_ravula</span>
              </a>
              <div className="yp-footer-copy">
                © 2026 Prof. Ravindrababu Ravula. All rights reserved.
              </div>
            </div>
          </div>
        </footer>

      </div>

      {/* Scroll hint — fades after scroll */}
      <div className="scroll-hint-overlay" style={{ opacity: scrolled ? 0 : 1 }}>
        <div className="scroll-mouse" />
        <span>Scroll to Explore</span>
      </div>

    </div>
  );
}
