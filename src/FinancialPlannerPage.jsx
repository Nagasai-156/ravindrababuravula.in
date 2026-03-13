import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroPerson from "./assets/hero-person.png";
import "./FinancialPlannerPage.css";

/* ── Icons ── */
const ArrowUpRight = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const WalletIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2" />
    <path d="M18 12h4" />
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

/* ── Financial Planner stats ── */
const FP_STATS = [
  { value: "ARN-354459", label: "AMFI Certification", icon: "🛡️" },
  { value: "7 Step", label: "Growth Framework", icon: "📑" },
  { value: "18+ Yrs", label: "Trust & Experience", icon: "🤝" },
  { value: "Lakhs", label: "Empowered Lives", icon: "✨" },
];

export default function FinancialPlannerPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fp-wrapper">

      {/* ── Navigation ── */}
      <nav className="hs-nav">
        <div className="hs-nav-left">
          <span className="hs-logo">PROF RBR</span>
          <div className="hs-nav-links">
            <span className="active">Home</span>
            <span>Planning</span>
            <span>Roadmap</span>
          </div>
        </div>
        <button className="hs-nav-btn" onClick={() => navigate("/")}>
          Go Back <ArrowUpRight />
        </button>
      </nav>

      <div className="fp-body">

        {/* ══════════════════════════════════════════
            PANEL 1 — HERO
        ══════════════════════════════════════════ */}
        <section className="p1-hero">
          <div className="p1-bg-text">RBR</div>

          <div className="p1-hero-inner">
            <div className="p1-left">
              <div className="p1-eyebrow">
                <div className="eyebrow-row">
                  <span className="eyebrow-label">Role</span>
                  <span className="eyebrow-value">CERTIFIED FINANCIAL PLANNER</span>
                </div>
                <div className="eyebrow-row">
                  <span className="eyebrow-label">Mission</span>
                  <span className="eyebrow-value">FINANCIAL FREEDOM</span>
                </div>
              </div>

              <h1 className="p1-headline">
                Achieving freedom<br />
                through <em>disciplined</em><br />
                planning.
              </h1>

              <div className="p1-cards-row">
                <div className="cc dark">
                  <Badge label="Financial Evolution" />
                  <div className="cc-journey">
                    <div className="journey-year">Earnings</div>
                    <div className="journey-arrow">→</div>
                    <div className="journey-year accent">Wealth</div>
                  </div>
                  <div className="cc-lbl">Managing income effectively to build sustainable high-growth assets.</div>
                  <div className="cc-prog">
                    <div className="cc-prog-fill" style={{ width: "100%" }} />
                  </div>
                  <div className="cc-prog-labels">
                    <span>AMFI Certified Professional</span>
                  </div>
                </div>

                <div className="cc gold" style={{ minHeight: 200, justifyContent: "space-between" }}>
                  <Badge label="Credentials" type="gold" />
                  <div className="cc-val" style={{ marginTop: 'auto', marginBottom: 6, fontSize: '1.2rem', fontWeight: 600 }}>
                    ARN-354459
                  </div>
                  <div className="cc-lbl" style={{ color: '#333' }}>
                    Authorized Mutual Fund Distributor ensuring adherence to industry standards and regulations.
                  </div>
                </div>
              </div>
            </div>

            <div className="p1-right">
              <div className="p1-img-wrap">
                <img
                  src={heroPerson}
                  alt="Prof. Ravindrababu Ravula - Financial Planner"
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                />
                <div className="p1-img-overlay">
                  <p className="p1-img-title">Guide to<br />Early Freedom</p>
                  <div className="p1-stat-box">
                    <div className="big-num">7</div>
                    <div className="small-lbl">Step Growth<br />Framework</div>
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
              <WalletIcon />
              <span>Professional Certification & Standards</span>
            </div>
            <div className="yt-stats-grid">
              {FP_STATS.map((s) => (
                <div className="yt-stat-item" key={s.label}>
                  <div className="yt-stat-val">{s.value}</div>
                  <div className="yt-stat-lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="fp-divider yp-divider" />

        {/* ══════════════════════════════════════════
            CHAPTER 1: BEYOND INCOME
        ══════════════════════════════════════════ */}
        <section className="p2-section">
          <div className="p2-inner">
            <div className="p2-left">
              <p className="sec-label">Chapter 01</p>
              <h2 className="panel-h2">Beyond Income: Financial Awareness & Literacy</h2>
              <p className="panel-p">
                In today’s rapidly evolving world, earning money alone is no longer enough to achieve true financial security. Many work hard and earn well, yet struggle to build sustainable wealth due to a lack of knowledge and strategy. 
              </p>
              <p className="panel-p">
                True financial success comes not just from income, but from financial awareness, disciplined planning, and intelligent investment decisions. Prof. RBR has expanded his mission into financial planning to fill this critical gap left by formal education.
              </p>

              <div className="img-card tall">
                <img
                  src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80"
                  alt="Financial graphs and planning"
                />
              </div>
            </div>

            <div className="p2-right">
              <div className="dark-info-card">
                <h3>A Mission for Freedom</h3>
                <p>
                  Schools and universities teach technical skills, but rarely teach money management. Driven by his own journey to financial independence, Prof. RBR simplifies the world of finance so that students and professionals can achieve freedom early in life.
                </p>
                <p>
                  Just as he revolutionized computer science concepts, he now provides a structured roadmap for financial growth focused on long-term stability and wealth protection.
                </p>
              </div>

              <blockquote className="highlight-quote">
                "Financial freedom is not a matter of luck or high income — it is the result of clear planning, disciplined investing, and informed decisions."
              </blockquote>

              <div className="p2-mini-stats">
                <div className="p2-mini-stat">
                  <div className="p2-mini-val">SIP</div>
                  <div className="p2-mini-lbl">Disciplined</div>
                </div>
                <div className="p2-mini-divider" />
                <div className="p2-mini-stat">
                  <div className="p2-mini-val">Wealth</div>
                  <div className="p2-mini-lbl">Systematic</div>
                </div>
                <div className="p2-mini-divider" />
                <div className="p2-mini-stat">
                  <div className="p2-mini-val">Risk</div>
                  <div className="p2-mini-lbl">Optimized</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="fp-divider yp-divider" />

        {/* ══════════════════════════════════════════
            CHAPTER 2: CERTIFICATION (AMFI)
        ══════════════════════════════════════════ */}
        <section className="p3-section">
          <div className="p3-inner">
            <div className="p3-left">
              <div className="big-chapter">02</div>
              <h2 className="panel-h2">Professional Certification & Credibility</h2>
              
              <div className="note-row">
                <div className="note-item">
                  <div className="note-label">ARN NUMBER</div>
                  <div className="note-value">ARN-354459</div>
                </div>
                <div className="note-item">
                  <div className="note-label">RECOGNIZED</div>
                  <div className="note-value">AMFI REGISTERED</div>
                </div>
              </div>

              <p className="panel-p">
                Adding credibility to his financial guidance, Prof. Ravindrababu Ravula is a certified <strong>Mutual Fund Distributor</strong>. His AMFI registration number (ARN-354459) officially authorizes him to guide and distribute mutual fund investments in India.
              </p>
              <p className="panel-p">
                This certification ensures his guidance aligns with industry standards and regulatory frameworks, reflecting a professional commitment to informed and responsible decision-making.
              </p>
            </div>

            <div className="p3-right">
              <div className="cc-innovation">
                <Badge label="Authorized Advisor" />
                <h3 className="cc-innovation-title">Professional Commitment</h3>
                <div className="cc-innovation-text">
                  His certification is more than just a number; it is a pledge to adhere to recognized financial ethics. This platform provides individuals with the confidence required to participate in financial markets responsibly and intelligently.
                </div>
              </div>

              <div className="dark-info-card">
                <p>
                  Every financial plan is carefully tailored to an individual’s goals, risk profile, and life priorities, ensuring guidance that truly fits the user’s needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="fp-divider yp-divider" />

        {/* ══════════════════════════════════════════
            CHAPTER 3: THE ROADMAP
        ══════════════════════════════════════════ */}
        <section className="p4-section">
          <div className="p4-inner">
            <div className="p4-left">
              <p className="sec-label">Chapter 03</p>
              <h2 className="panel-h2">A Roadmap for Sustained Financial Growth</h2>
              <p className="panel-p">
                Prof. RBR’s financial planning framework follows a structured Roadmap designed to guide individuals step-by-step toward independence.
              </p>

              <div className="list-card">
                {[
                  "Investment fundamentals & Fund Categories",
                  "Goal-based asset allocation (Equity vs Debt)",
                  "Protection planning & Insurance features",
                  "Financial Safety Net (Emergency Fund)",
                  "Legal Tax-saving strategies & Compounding",
                  "Responsible Credit & CIBIL score management",
                  "Personalized investment strategies",
                ].map((item, i) => (
                  <div className="list-row" key={i}>
                    <span className="num">0{i + 1}</span>
                    <span className="txt">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p4-right">
              <div className="dark-info-card" style={{ marginBottom: 20 }}>
                <h3>Understanding Investment</h3>
                <p>
                  Many invest based on tips or emotions. Here, the focus is on mastering fundamentals—understanding large-cap, mid-cap, small-cap, and the power of SIP vs Lump-sum investments.
                </p>
              </div>

              <div className="cc dark" style={{ padding: 24 }}>
                <Badge label="Strategy" />
                <div className="cc-body" style={{ color: "#aaa", marginTop: 12 }}>
                  Investments must be goal-oriented, not random. Identifying short, medium, and long-term objectives creates a clear roadmap for success.
                </div>
              </div>

              <div className="img-card landscape" style={{ height: 260, marginTop: 20 }}>
                <img
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80"
                  alt="Asset Management"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="fp-divider yp-divider" />

        {/* ══════════════════════════════════════════
            CHAPTER 4: PROTECTION & SAFETY NET
        ══════════════════════════════════════════ */}
        <section className="p2-section">
          <div className="p2-inner">
            <div className="p2-left">
              <p className="sec-label">Chapter 04</p>
              <h2 className="panel-h2">Securing Stability: Protection & Safety Nets</h2>
              <p className="panel-p">
                Before focusing on wealth creation, security must be established. Unexpected emergencies can disrupt stability if adequate measures aren't in place.
              </p>
              <p className="panel-p">
                This involves protection planning through correct health and life insurance, and building an <strong>Emergency Fund</strong> — a financial cushion that provides confidence during job loss or medical events.
              </p>

              <div className="support-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px' }}>
                <div className="cc dark" style={{ padding: '24px' }}>
                  <h4 style={{ color: '#ffb703', marginBottom: '8px' }}>Insurance</h4>
                  <div style={{ color: '#888', fontSize: '0.85rem' }}>Choosing appropriate health and life protection over traditional products.</div>
                </div>
                <div className="cc dark" style={{ padding: '24px' }}>
                  <h4 style={{ color: '#ffb703', marginBottom: '8px' }}>Safety Net</h4>
                  <div style={{ color: '#888', fontSize: '0.85rem' }}>Maintaining quick-access savings to cover unexpected life expenses.</div>
                </div>
              </div>
            </div>

            <div className="p2-right">
              <div className="img-card tall">
                <img
                  src="https://images.unsplash.com/photo-1454165833772-d99628a5ffa0?auto=format&fit=crop&w=1200&q=80"
                  alt="Secure Future"
                />
              </div>
              <div className="dark-info-card" style={{ marginTop: '20px' }}>
                <p>
                  By securing financial protection first, individuals ensure their long-term growth plans remain stable even during the most unforeseen circumstances.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="fp-divider yp-divider" />

        {/* ══════════════════════════════════════════
            CHAPTER 5: TAX & CREDIT
        ══════════════════════════════════════════ */}
        <section className="p3-section">
          <div className="p3-inner">
            <div className="p3-left">
              <div className="big-chapter">05</div>
              <h2 className="panel-h2">Tax Planning & Credit Optimization</h2>
              <p className="panel-p">
                Effective planning involves reducing tax burdens while strengthening portfolios. Legal strategies and compounding power can significantly accelerate the wealth journey.
              </p>
              <p className="panel-p">
                Furthermore, credit is a powerful tool when managed responsibly. Understanding <strong>CIBIL scores</strong> and responsible loan management prevents debt traps and maintains long-term health.
              </p>
            </div>

            <div className="p3-right">
              <div className="gold-card-massive">
                <Badge label="Legacy" type="gold" />
                <h3 className="gold-card-h3" style={{ fontSize: '1.4rem' }}>
                  A Mission for Empowerment
                </h3>
                <p className="gold-card-p">
                  For Prof. Ravindrababu Ravula, financial planning is about empowering people. Having experienced struggle and later achieved freedom, he seeks to revolutionize literacy for the next generation.
                </p>
                <div className="gold-quote-box">
                  <strong>"His roadmap guides individuals not just to build successful careers, but to build secure and financially independent lives."</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FOOTER 
        ══════════════════════════════════════════ */}
        <footer className="fp-footer">
          <div className="fp-footer-inner">
            <div className="fp-footer-left">
              <div className="fp-footer-logo">PROF RBR</div>
              <p className="fp-footer-tagline">
                Your guide to financial freedom, security,<br />and a structured wealth roadmap.
              </p>
            </div>
            <div className="fp-footer-right">
              <div className="fp-footer-copy">
                © 2026 Prof. Ravindrababu Ravula. All rights reserved. Registered MFD: ARN-354459.
              </div>
            </div>
          </div>
        </footer>

      </div>

      {/* Scroll hint */}
      <div className="scroll-hint-overlay" style={{ opacity: scrolled ? 0 : 1 }}>
        <div className="scroll-mouse" />
        <span>Plan Your Future</span>
      </div>

    </div>
  );
}
