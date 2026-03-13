import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroPerson from "./assets/hero-person.png";
import "./SerialEntrepreneurPage.css";
import "./SerialEntrepreneurLayout.css";

/* ── Icons ── */
const ArrowUpRight = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const RocketIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

const StarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const BrainIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/></svg>
);

const GlobalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
);

const CodeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
);

const MedIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
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

/* ── Stats ── */
const SE_STATS = [
  { value: "Education", label: "Tech Platforms", icon: "📚" },
  { value: "AI + SaaS", label: "Innovation", icon: "🧠" },
  { value: "Global", label: "Consulting", icon: "🌍" },
  { value: "Healthcare", label: "Wellbeing", icon: "🏥" },
];

export default function SerialEntrepreneurPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="se-wrapper">

      {/* ── Navigation ── */}
      <nav className="hs-nav">
        <div className="hs-nav-left">
          <span className="hs-logo">PROF RBR</span>
          <div className="hs-nav-links">
            <span className="active">Home</span>
            <span>Ventures</span>
            <span>Impact</span>
          </div>
        </div>
        <button className="hs-nav-btn" onClick={() => navigate("/")}>
          Go Back <ArrowUpRight />
        </button>
      </nav>

      <div className="se-body">

        {/* ══════════════════════════════════════════
            PANEL 1 — HERO
        ══════════════════════════════════════════ */}
        <section className="p1-hero">
          <div className="p1-bg-text">VENTURES</div>

          <div className="p1-hero-inner">
            <div className="p1-left">
              <div className="p1-eyebrow">
                <div className="eyebrow-row">
                  <span className="eyebrow-label">Role</span>
                  <span className="eyebrow-value">SERIAL ENTREPRENEUR</span>
                </div>
                <div className="eyebrow-row">
                  <span className="eyebrow-label">Impact</span>
                  <span className="eyebrow-value">ACROSS INDUSTRIES</span>
                </div>
              </div>

              <h1 className="p1-headline" style={{ fontSize: 'clamp(2.5rem, 3.5vw, 4.2rem)' }}>
                Building the Future<br />Across <em>Multiple</em><br /><em>Industries.</em>
              </h1>

              <div className="p1-cards-row">
                <div className="cc dark" style={{ padding: '32px 24px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.05, transform: 'scale(3)' }}>
                    <RocketIcon />
                  </div>
                  <Badge label="The Mindset" />
                  <div className="cc-lbl" style={{ marginTop: 16, fontSize: '0.95rem', color: '#fff', lineHeight: 1.5 }}>
                    Entrepreneurship is not merely about starting companies; it is about identifying opportunities, solving real-world problems, and building systems that create lasting impact.
                  </div>
                </div>

                <div className="cc gold" style={{ padding: '32px 24px', justifyContent: 'center' }}>
                  <Badge label="The Portfolio" type="gold" />
                  <div className="cc-val" style={{ marginTop: 16, fontSize: '1.4rem', fontWeight: 600, color: '#111' }}>
                    Relentless Innovation
                  </div>
                  <div className="cc-lbl" style={{ color: '#333', marginTop: 8 }}>
                    Launching and leading ventures across Education, Artificial Intelligence, Healthcare, and Tech.
                  </div>
                </div>
              </div>

            </div>

            <div className="p1-right">
              <div className="p1-img-wrap" style={{ minHeight: '500px' }}>
                <img
                  src={heroPerson} 
                  alt="Prof. Ravindrababu Ravula - Serial Entrepreneur"
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                />
                <div className="p1-img-overlay">
                  <p className="p1-img-title">Vision &<br />Execution</p>
                  <div className="p1-stat-box">
                    <div className="big-num">7+</div>
                    <div className="small-lbl">Major Startups<br />Founded / Scaled</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            STATS STRIP
        ══════════════════════════════════════════ */}
        <section className="yt-stats-strip">
          <div className="yt-stats-inner">
            <div className="yt-strip-label">
              <RocketIcon />
              <span>Multi-Industry Footprint</span>
            </div>
            <div className="yt-stats-grid">
              {SE_STATS.map((s) => (
                <div className="yt-stat-item" key={s.label}>
                  <div className="yt-stat-val">{s.value}</div>
                  <div className="yt-stat-lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="se-divider yp-divider" />

        {/* ══════════════════════════════════════════
            FOUNDING STORY & EDTECH
        ══════════════════════════════════════════ */}
        <section className="p2-section" style={{ paddingBottom: 0 }}>
          <div className="p2-inner">
            <div className="p2-left">
              <p className="sec-label">Origins</p>
              <h2 className="panel-h2" style={{ whiteSpace: 'normal', fontSize: '2.5rem' }}>Entrepreneurial Beginnings & The EdTech Revolution</h2>
              <p className="panel-p">
                Prof. Ravindrababu Ravula’s entrepreneurial journey began with a deep understanding of the challenges faced by students and professionals in the education ecosystem. Recognizing the need for high-quality technical education and mentorship, he founded <strong>Raudra Eduservices</strong>, an educational venture focused on empowering engineering students preparing for competitive exams such as GATE.
              </p>
              <p className="panel-p">
                Under his leadership, Raudra Eduservices quickly gained recognition for its quality content, structured teaching methodology, and strong academic outcomes. The platform helped thousands of students strengthen their technical foundations and achieve success.
              </p>
            </div>

            <div className="p2-right" style={{ paddingTop: 0 }}>
              <div className="dark-info-card" style={{ borderColor: '#ffb703' }}>
                <h3>The Acquisition</h3>
                <p>
                  The impact of this venture was so significant that Raudra Eduservices was later acquired by <strong>Unacademy</strong>, one of India’s leading EdTech companies. 
                </p>
                <p>
                  This acquisition marked a major milestone in his entrepreneurial journey and highlighted the immense value of the educational ecosystem he had built from the ground up.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            MAJOR VENTURES GRID
        ══════════════════════════════════════════ */}
        <section className="se-ventures-grid">
          
          <div className="se-venture-card">
            <div className="se-venture-icon"><CodeIcon /></div>
            <h3>Raudra Technologies</h3>
            <p>Continuing his entrepreneurial journey, Prof. Ravindrababu Ravula founded Raudra Technologies Private Limited, a technology-driven company focused on developing innovative digital solutions.</p>
            <p style={{ marginBottom: 0 }}>Through Raudra Technologies, he explored the intersection of technology and business, building systems that address real-world challenges through modern technological approaches. The venture reflects his belief that technology has the power to transform industries and unlock new opportunities.</p>
          </div>

          <div className="se-venture-card">
            <div className="se-venture-icon"><GlobalIcon /></div>
            <h3>Game of Visas</h3>
            <p>Recognizing the aspirations of many students who wish to pursue higher education abroad, he launched Game of Visas, a platform dedicated to helping students achieve their dream of studying in international universities.</p>
            <div className="se-list-group">
              <div className="se-list-item"><CheckIcon /> Career & country counselling</div>
              <div className="se-list-item"><CheckIcon /> University & course selection</div>
              <div className="se-list-item"><CheckIcon /> SOP prep & Scholarship guidance</div>
              <div className="se-list-item"><CheckIcon /> Education loan & Visa support</div>
            </div>
          </div>

          <div className="se-venture-card">
            <div className="se-venture-icon"><BrainIcon /></div>
            <h3>MetaBrix Labs (CMO)</h3>
            <p>Another key venture in his entrepreneurial portfolio is MetaBrix Labs, where he serves as Chief Marketing Officer (CMO). MetaBrix is building a Gen-AI powered productivity SaaS platform for the 3D design industry.</p>
            <p style={{ marginBottom: 0 }}>By leveraging generative AI capabilities, the platform aims to accelerate development workflows for gaming, XR, marketing, and e-commerce—reducing development time and cost by more than 60 percent to improve designer efficiency.</p>
          </div>

          <div className="se-venture-card">
            <div className="se-venture-icon"><BrainIcon /></div>
            <h3>Raudra Labs</h3>
            <p>In 2026, he founded Raudra Labs, a research-driven AI organization bridging the gap between academic research and real-world industry applications.</p>
            <div className="se-list-group">
              <div className="se-list-item"><CheckIcon /> Autonomous AI Agents</div>
              <div className="se-list-item"><CheckIcon /> Multimodal AI systems</div>
              <div className="se-list-item"><CheckIcon /> India-first language intelligence</div>
              <div className="se-list-item"><CheckIcon /> Enterprise knowledge ops (RAG)</div>
              <div className="se-list-item"><CheckIcon /> Healthcare & AI Safety systems</div>
            </div>
            <p style={{ marginTop: 16, marginBottom: 0, fontSize: '0.85rem' }}>Beyond product development, Raudra Labs provides AI consulting and startup incubation.</p>
          </div>

          <div className="se-venture-card" style={{ gridColumn: '1 / -1', maxWidth: '800px', margin: '0 auto', textAlign: 'center', borderColor: 'rgba(255,183,3,0.3)' }}>
            <div className="se-venture-icon" style={{ margin: '0 auto 24px' }}><MedIcon /></div>
            <h3>DIAS Health & Drugs</h3>
            <p>Expanding his entrepreneurial footprint into healthcare, Prof. Ravindrababu Ravula also serves as a Co-Founder of DIAS Health & Drugs Private Limited. This venture reflects his commitment to exploring opportunities that contribute to societal well-being. By participating in initiatives within the healthcare sector, he continues to broaden the scope of his entrepreneurial impact beyond education and technology.</p>
          </div>

        </section>


        <div className="se-divider yp-divider" />

        {/* ══════════════════════════════════════════
            SECONDARY STARTUPS
        ══════════════════════════════════════════ */}
        <section style={{ padding: '40px 0 0' }}>
          <div style={{ textAlign: 'center', padding: '0 24px' }}>
            <p className="sec-label">The Portfolio</p>
            <h2 className="panel-h2" style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', marginBottom: 24 }}>Building Multiple Startups Across Industries</h2>
            <p className="panel-p" style={{ margin: '0 auto', maxWidth: '800px' }}>In addition to these major ventures, he actively participates in building and supporting several other startups. Each venture reflects his belief that entrepreneurship is about identifying opportunities across all sectors.</p>
          </div>

          <div className="se-startups-grid">
            <div className="se-sm-card">
              <div className="se-sm-name">Electronics Astra</div>
              <div className="se-sm-desc">A venture focused on technological hardware innovation and electronics.</div>
            </div>
            <div className="se-sm-card">
              <div className="se-sm-name">Eduview</div>
              <div className="se-sm-desc">An education-focused platform aimed at drastically improving learning experiences.</div>
            </div>
            <div className="se-sm-card">
              <div className="se-sm-name">Getroomix</div>
              <div className="se-sm-desc">A platform designed to creatively address modern accommodation and lifestyle needs.</div>
            </div>
            <div className="se-sm-card">
              <div className="se-sm-name">Kadali Kitchen</div>
              <div className="se-sm-desc">A culinary venture exploring new opportunities in the rapidly evolving food and hospitality space.</div>
            </div>
          </div>
        </section>

        <div className="se-divider yp-divider" />

        {/* ══════════════════════════════════════════
            ACADEMIA & MENTORSHIP
        ══════════════════════════════════════════ */}
        <section className="p4-section">
          <div className="p4-inner">
            <div className="p4-left">
              <p className="sec-label">Leadership</p>
              <h2 className="panel-h2" style={{ whiteSpace: 'normal', fontSize: '2.5rem' }}>Academic Leadership & Angel Investing</h2>
              <p className="panel-p">
                Alongside his entrepreneurial ventures, Prof. Ravindrababu Ravula continues to remain deeply connected to academia. He currently serves as a Professor of Practice at BVRIT Hyderabad, teaching core computer science subjects ranging from Digital Logic and Algorithms to Theory of Computation and Databases.
              </p>
              
              <div className="cc dark" style={{ padding: 24, marginTop: 24 }}>
                <Badge label="Mentorship & Investing" />
                <div className="cc-body" style={{ color: "#aaa", marginTop: 12 }}>
                  Since 2013, he has actively supported promising startups as an angel investor, providing mentorship, strategic guidance, and investment support.
                </div>
              </div>
              
              <p className="panel-p" style={{ marginTop: 24, fontStyle: 'italic', fontSize: '0.95rem' }}>
                His experience as both an educator and entrepreneur allows him to guide early-stage founders in building sustainable and impactful businesses, contributing massively to the growth of the broader innovation ecosystem.
              </p>
            </div>

            <div className="p4-right">
              <div className="gold-card-massive">
                <Badge label="The Vision" type="gold" />

                <h3 className="gold-card-h3" style={{ fontSize: '1.4rem' }}>
                  A Visionary Serial Entrepreneur
                </h3>

                <p className="gold-card-p">
                  What distinguishes Prof. Ravindrababu Ravula as a serial entrepreneur is not merely the number of ventures he has created, but the diversity and impact of those ventures. From education and technology to healthcare and AI, his entrepreneurial initiatives span multiple industries.
                </p>

                <div className="gold-quote-box">
                  <strong>"His ventures constantly reflect a forward-looking vision that embraces innovation while addressing real-world challenges."</strong>
                </div>
                
                <p className="gold-card-p" style={{ marginTop: '20px', fontWeight: 600, color: '#000' }}>
                  As a serial entrepreneur, educator, and mentor, he remains committed to building ventures that not only succeed in business but also contribute meaningfully to society and technological progress.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FOOTER 
        ══════════════════════════════════════════ */}
        <footer className="se-footer p5-footer">
          <div className="fp-footer-inner p5-footer-inner">
            <div className="fp-footer-left">
              <div className="fp-footer-logo">PROF RBR</div>
              <p className="fp-footer-tagline">
                Innovating. Building. Empowering.<br />Across Industries.
              </p>
            </div>
            <div className="fp-footer-right">
              <div className="fp-footer-copy">
                © 2026 Prof. Ravindrababu Ravula. All rights reserved. 
              </div>
            </div>
          </div>
        </footer>

      </div>

      {/* Scroll hint */}
      <div className="scroll-hint-overlay" style={{ opacity: scrolled ? 0 : 1 }}>
        <div className="scroll-mouse" />
        <span>View Ventures</span>
      </div>

    </div>
  );
}
