import React, { useEffect, useState } from "react";
import heroPerson from "./assets/hero-person.png";
import "./FinancialPlannerPage.css";
import "./FinancialPlannerLayout.css";

/* ── Icons ── */
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

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fp-wrapper">

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

              <h1 className="p1-headline" style={{ fontSize: 'clamp(2.5rem, 3.5vw, 4.2rem)' }}>
                Certified Financial Planner<br />for a <em>Secure</em> &<br /><em>Prosperous</em> Future.
              </h1>

              <div className="p1-cards-row">
                <div className="cc dark" style={{ padding: 24 }}>
                  <Badge label="Financial Evolution" />
                  <div className="cc-journey" style={{ marginTop: 'auto', gap: 16 }}>
                    <div className="journey-year" style={{ fontSize: '1.4rem' }}>Earnings</div>
                    <div className="journey-arrow">→</div>
                    <div className="journey-year accent" style={{ fontSize: '1.4rem' }}>Wealth</div>
                  </div>
                  <div className="cc-lbl" style={{ marginTop: 8 }}>Managing income effectively to build sustainable high-growth assets.</div>
                  <div className="cc-prog" style={{ marginTop: 16 }}>
                    <div className="cc-prog-fill" style={{ width: "100%" }} />
                  </div>
                  <div className="cc-prog-labels">
                    <span>Strategic Planning</span>
                  </div>
                </div>

                <div className="cc gold" style={{ minHeight: 'auto', justifyContent: "space-between", padding: 24 }}>
                  <Badge label="Credentials" type="gold" />
                  <div className="cc-val" style={{ marginTop: 'auto', marginBottom: 4, fontSize: '1.6rem', fontWeight: 600 }}>
                    ARN-354459
                  </div>
                  <div className="cc-lbl" style={{ color: '#333' }}>
                    Authorized Mutual Fund Distributor ensuring adherence to industry standards.
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
            INTRODUCTION (Moved from Hero)
        ══════════════════════════════════════════ */}
        <section className="fp-intro-section" style={{ padding: '80px 40px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="panel-h2" style={{ whiteSpace: 'normal', fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', marginBottom: 32, lineHeight: 1.4 }}>
            True financial success comes not just from income, but from <span style={{ color: '#ffb703' }}>financial awareness, disciplined planning, and intelligent investment decisions.</span>
          </h2>
          <p className="panel-p" style={{ fontSize: '1.1rem', marginBottom: 24, marginInline: 'auto', maxWidth: '850px' }}>
            In today’s rapidly evolving world, earning money alone is no longer enough to achieve true financial security. Many individuals work hard, earn well, and yet struggle to build sustainable wealth because they lack the knowledge and strategy needed to manage their finances effectively.
          </p>
          <p className="panel-p" style={{ fontSize: '1.1rem', marginInline: 'auto', maxWidth: '850px' }}>
            Recognizing this challenge, Prof. Ravindrababu Ravula has expanded his mission beyond education and technology into the field of financial planning. Having achieved financial independence himself through disciplined planning and strategic investing, he is now on a mission to help millions of students and professionals achieve financial freedom. Through his structured financial planning framework, Prof. Ravindrababu Ravula helps individuals understand how to build wealth systematically, protect their finances from risks, and create long-term financial stability. Every financial plan he provides is carefully tailored to the individual’s goals, risk profile, and life priorities, ensuring that each person receives guidance that truly fits their needs.
          </p>
        </section>

        <div className="fp-divider yp-divider" />

        {/* ══════════════════════════════════════════
            CHAPTER 1: CREDENTIALS & LITERACY
        ══════════════════════════════════════════ */}
        <section className="p2-section">
          <div className="p2-inner">
            <div className="p2-left">
              <p className="sec-label">Chapter 01</p>
              <h2 className="panel-h2" style={{ whiteSpace: 'normal' }}>Certified Mutual Fund Distributor</h2>
              <p className="panel-p">
                Adding credibility and professional certification to his financial guidance, Prof. Ravindrababu Ravula is also a certified Mutual Fund Distributor. His AMFI ARN (Association of Mutual Funds in India Registration Number) is ARN-354459, officially authorizing him to guide and distribute mutual fund investments in India.
              </p>
              <p className="panel-p">
                This certification ensures that his financial guidance is aligned with recognized industry standards and regulatory frameworks. It reflects both his professional commitment and his dedication to helping individuals make informed and responsible investment decisions.
              </p>

              <div className="img-card tall">
                <img
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80"
                  alt="Financial analytics and certification"
                />
              </div>
            </div>

            <div className="p2-right">
              <div className="dark-info-card">
                <h3>A Mission to Spread Financial Literacy</h3>
                <p>
                  After achieving financial independence through careful planning and disciplined investing, Prof. Ravindrababu Ravula realized an important truth: most people are never taught how to manage money effectively.
                </p>
                <p>
                  Schools and universities teach technical knowledge and professional skills, but very few institutions teach students how to handle real-world financial decisions such as investing, saving taxes, building wealth, or managing credit responsibly.
                </p>
                <p>
                  Driven by a desire to fill this gap, he began guiding individuals on financial literacy and structured wealth building. His mission is clear — to empower students and young professionals with the knowledge required to achieve financial freedom early in life.
                </p>
              </div>

              <blockquote className="highlight-quote">
                "Just as he simplified complex computer science concepts for lakhs of learners, he now simplifies the world of finance so that anyone can understand and benefit from it."
              </blockquote>
            </div>
          </div>
        </section>

        <div className="fp-divider yp-divider" />

        {/* ══════════════════════════════════════════
            CHAPTER 2: A STRUCTURED ROADMAP (INTRO & GRID)
        ══════════════════════════════════════════ */}
        <section className="p3-section">
          <div className="fp-roadmap-intro">
            <p className="sec-label">Chapter 02</p>
            <h2 className="panel-h2" style={{ whiteSpace: 'normal', fontSize: 'clamp(2rem, 3vw, 3.5rem)' }}>A Structured Roadmap for Financial Growth</h2>
            <p className="panel-p">
              Prof. Ravindrababu Ravula’s financial planning framework follows a structured roadmap designed to guide individuals step-by-step toward financial independence. This comprehensive framework covers the most critical aspects of personal finance. Each stage of the program is designed to ensure that individuals do not simply invest randomly but instead build wealth through informed, strategic, and disciplined financial decisions.
            </p>
            
            <div className="fp-roadmap-chips">
              {[
                "Investment fundamentals",
                "Choosing the right investments",
                "Protection planning and insurance",
                "Building a financial safety net",
                "Tax planning and wealth creation",
                "Responsible credit and loan management",
                "Personalized investment strategies"
              ].map(item => (
                <div key={item} className="fp-chip">{item}</div>
              ))}
            </div>
          </div>

          <div className="fp-pillars">
            {/* Pillar 1 */}
            <div className="fp-pillar-card">
              <div className="fp-pillar-num">01</div>
              <h3 className="fp-pillar-title">Understanding the Foundations of Investment</h3>
              <p className="fp-pillar-p">
                The journey toward financial freedom begins with a strong understanding of investment fundamentals. Many people invest based on tips, emotions, or short-term trends without understanding the underlying principles. Prof. Ravindrababu Ravula believes that financial education must come before financial action. In this stage, individuals learn essential concepts such as:
              </p>
              <div className="fp-pillar-list">
                <div className="fp-pillar-list-item"><CheckIcon /> <span>what mutual funds are and how they work</span></div>
                <div className="fp-pillar-list-item"><CheckIcon /> <span>understanding various fund categories such as large-cap, mid-cap, small-cap, flexi-cap, and value funds</span></div>
                <div className="fp-pillar-list-item"><CheckIcon /> <span>the relationship between risk and return</span></div>
                <div className="fp-pillar-list-item"><CheckIcon /> <span>deciding between SIP (Systematic Investment Plan) and lump-sum investments</span></div>
              </div>
              <p className="fp-pillar-p" style={{ marginTop: '16px', marginBottom: 0, fontStyle: 'italic', fontSize: '0.85rem' }}>
                By mastering these fundamentals, individuals develop the confidence required to participate in financial markets responsibly and intelligently.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="fp-pillar-card">
              <div className="fp-pillar-num">02</div>
              <h3 className="fp-pillar-title">Choosing the Right Investments</h3>
              <p className="fp-pillar-p">
                Once the basics are clear, the next step is aligning investments with personal financial goals. Different individuals have different financial objectives — purchasing a home, funding education, building retirement wealth, or achieving early financial independence. Prof. Ravindrababu Ravula helps individuals design investment strategies based on their unique goals. This stage focuses on:
              </p>
              <div className="fp-pillar-list">
                <div className="fp-pillar-list-item"><CheckIcon /> <span>identifying short-term, medium-term, and long-term financial goals</span></div>
                <div className="fp-pillar-list-item"><CheckIcon /> <span>assessing personal risk tolerance</span></div>
                <div className="fp-pillar-list-item"><CheckIcon /> <span>understanding asset allocation between equity and debt</span></div>
                <div className="fp-pillar-list-item"><CheckIcon /> <span>selecting appropriate investment instruments</span></div>
                <div className="fp-pillar-list-item"><CheckIcon /> <span>avoiding common mistakes made by beginner investors</span></div>
              </div>
              <p className="fp-pillar-p" style={{ marginTop: '16px', marginBottom: 0, fontStyle: 'italic', fontSize: '0.85rem' }}>
                This approach ensures that investments are goal-oriented rather than random, creating a clear roadmap toward financial success.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="fp-pillar-card">
              <div className="fp-pillar-num">03</div>
              <h3 className="fp-pillar-title">Protection Planning – Securing Financial Stability</h3>
              <p className="fp-pillar-p">
                Before focusing on wealth creation, financial security must be established. Unexpected medical emergencies, accidents, or life events can disrupt financial stability if adequate protection measures are not in place. Prof. Ravindrababu Ravula emphasizes the importance of insurance and protection planning as a foundation for long-term financial growth. This stage includes guidance on:
              </p>
              <div className="fp-pillar-list">
                <div className="fp-pillar-list-item"><CheckIcon /> <span>understanding the role of insurance in financial planning</span></div>
                <div className="fp-pillar-list-item"><CheckIcon /> <span>comparing ULIPs and traditional insurance products</span></div>
                <div className="fp-pillar-list-item"><CheckIcon /> <span>selecting appropriate health insurance coverage</span></div>
                <div className="fp-pillar-list-item"><CheckIcon /> <span>determining the right level of insurance protection</span></div>
                <div className="fp-pillar-list-item"><CheckIcon /> <span>evaluating policy features before making decisions</span></div>
              </div>
              <p className="fp-pillar-p" style={{ marginTop: '16px', marginBottom: 0, fontStyle: 'italic', fontSize: '0.85rem' }}>
                By securing financial protection, individuals ensure that their long-term financial plans remain stable even during unforeseen circumstances.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="fp-pillar-card">
              <div className="fp-pillar-num">04</div>
              <h3 className="fp-pillar-title">Building a Financial Safety Net</h3>
              <p className="fp-pillar-p">
                One of the most important pillars of financial planning is the creation of a financial safety net, commonly known as an emergency fund. An emergency fund acts as a financial cushion that protects individuals during unexpected events such as job loss, medical emergencies, or sudden expenses. Prof. Ravindrababu Ravula guides individuals on:
              </p>
              <div className="fp-pillar-list">
                <div className="fp-pillar-list-item"><CheckIcon /> <span>the importance of maintaining an emergency fund</span></div>
                <div className="fp-pillar-list-item"><CheckIcon /> <span>how much emergency savings should be maintained</span></div>
                <div className="fp-pillar-list-item"><CheckIcon /> <span>where emergency funds should be stored for quick access</span></div>
                <div className="fp-pillar-list-item"><CheckIcon /> <span>why financial stability must precede aggressive investments</span></div>
              </div>
              <p className="fp-pillar-p" style={{ marginTop: '16px', marginBottom: 0, fontStyle: 'italic', fontSize: '0.85rem' }}>
                This safety net provides the confidence needed to pursue long-term investments without fear of short-term disruptions.
              </p>
            </div>

            {/* Pillar 5 */}
            <div className="fp-pillar-card">
              <div className="fp-pillar-num">05</div>
              <h3 className="fp-pillar-title">Tax Planning and Long-Term Wealth Creation</h3>
              <p className="fp-pillar-p">
                Effective financial planning also involves understanding how to legally reduce tax burdens while building wealth. Many individuals unknowingly lose a significant portion of their income due to poor tax planning. Prof. Ravindrababu Ravula teaches individuals how to optimize taxes while strengthening their financial portfolios. This includes guidance on:
              </p>
              <div className="fp-pillar-list">
                <div className="fp-pillar-list-item"><CheckIcon /> <span>legal tax-saving strategies</span></div>
                <div className="fp-pillar-list-item"><CheckIcon /> <span>understanding income tax filing procedures</span></div>
                <div className="fp-pillar-list-item"><CheckIcon /> <span>exploring tax-efficient investment instruments</span></div>
                <div className="fp-pillar-list-item"><CheckIcon /> <span>utilizing national saving certificates and similar options</span></div>
                <div className="fp-pillar-list-item"><CheckIcon /> <span>understanding the power of compounding</span></div>
                <div className="fp-pillar-list-item"><CheckIcon /> <span>planning for early retirement</span></div>
              </div>
               <p className="fp-pillar-p" style={{ marginTop: '16px', marginBottom: 0, fontStyle: 'italic', fontSize: '0.85rem' }}>
                Through disciplined investing and tax-efficient strategies, individuals can significantly accelerate their wealth-building journey.
              </p>
            </div>

            {/* Pillar 6 */}
            <div className="fp-pillar-card">
              <div className="fp-pillar-num">06</div>
              <h3 className="fp-pillar-title">Responsible Credit and Loan Management</h3>
              <p className="fp-pillar-p">
                Credit is a powerful financial tool when used wisely, but it can become a major burden if mismanaged. Prof. Ravindrababu Ravula helps individuals understand how to manage credit responsibly by focusing on:
              </p>
              <div className="fp-pillar-list">
                <div className="fp-pillar-list-item"><CheckIcon /> <span>understanding what a CIBIL score is and how it works</span></div>
                <div className="fp-pillar-list-item"><CheckIcon /> <span>maintaining a strong credit profile</span></div>
                <div className="fp-pillar-list-item"><CheckIcon /> <span>responsible credit card usage</span></div>
                <div className="fp-pillar-list-item"><CheckIcon /> <span>selecting appropriate loans when necessary</span></div>
                <div className="fp-pillar-list-item"><CheckIcon /> <span>distinguishing between good debt and bad debt</span></div>
              </div>
              <p className="fp-pillar-p" style={{ marginTop: '16px', marginBottom: 0, fontStyle: 'italic', fontSize: '0.85rem' }}>
                By developing responsible credit habits, individuals can avoid debt traps and maintain long-term financial health.
              </p>
            </div>

            {/* Pillar 7 */}
            <div className="fp-pillar-card" style={{ gridColumn: '1 / -1', maxWidth: '800px', margin: '0 auto' }}>
              <div className="fp-pillar-num">07</div>
              <h3 className="fp-pillar-title">Personalized Financial Planning Strategy</h3>
              <p className="fp-pillar-p">
                Every individual has unique financial circumstances, responsibilities, and goals. Recognizing this, Prof. Ravindrababu Ravula provides financial planning guidance that is personalized according to each person’s needs. This individualized strategy includes:
              </p>
              <div className="fp-pillar-list fp-list-2col">
                <div className="fp-pillar-list-item"><CheckIcon /> <span>goal-based investment planning</span></div>
                <div className="fp-pillar-list-item"><CheckIcon /> <span>risk-based asset allocation</span></div>
                <div className="fp-pillar-list-item"><CheckIcon /> <span>SIP investment strategies</span></div>
                <div className="fp-pillar-list-item"><CheckIcon /> <span>long-term wealth creation roadmaps</span></div>
              </div>
              <p className="fp-pillar-p" style={{ marginTop: '24px', marginBottom: 0, fontStyle: 'italic', fontSize: '0.95rem', color: '#ffb703' }}>
                The result is a clear financial blueprint designed to guide individuals toward long-term financial independence.
              </p>
            </div>

          </div>
        </section>

        <div className="fp-divider yp-divider" />

        {/* ══════════════════════════════════════════
            CHAPTER 3: LEGACY & CONCLUSION
        ══════════════════════════════════════════ */}
        <section className="p4-section">
          <div className="p4-inner">
            <div className="p4-left">
              <p className="sec-label">Chapter 03</p>
              <h2 className="panel-h2" style={{ whiteSpace: 'normal' }}>A Mission to Create Financially Empowered Generations</h2>
              <p className="panel-p">
                For Prof. Ravindrababu Ravula, financial planning is not just about numbers—it is about empowering people. Having experienced financial struggle earlier in life and later achieving financial freedom through disciplined planning, he understands the transformative power of financial knowledge.
              </p>
              
              <div className="cc dark" style={{ padding: 24, marginTop: 24 }}>
                <Badge label="The Mission" />
                <div className="cc-body" style={{ color: "#aaa", marginTop: 12 }}>
                  Today, his mission is clear: to help millions of students and young professionals achieve financial freedom through education, awareness, and disciplined financial planning.
                </div>
              </div>
              
              <p className="panel-p" style={{ marginTop: 24 }}>
                Just as he revolutionized computer science education for lakhs of learners, he now seeks to revolutionize financial literacy and wealth-building awareness for the next generation.
              </p>
            </div>

            <div className="p4-right">
              <div className="gold-card-massive">
                <Badge label="Conclusion" type="gold" />

                <h3 className="gold-card-h3" style={{ fontSize: '1.4rem' }}>
                  Prof. Ravindrababu Ravula’s financial planning guidance represents a powerful extension of his lifelong mission to empower people through knowledge.
                </h3>

                <p className="gold-card-p">
                  With a structured financial roadmap, professional certification as a Mutual Fund Distributor (ARN-354459), and a deep commitment to financial education, he helps individuals build, protect, and grow their wealth with confidence.
                </p>

                <div className="gold-quote-box">
                  <strong>"Through his guidance, individuals learn that financial freedom is not a matter of luck or high income—it is the result of clear planning, disciplined investing, and informed financial decisions."</strong>
                </div>
                
                <p className="gold-card-p" style={{ marginTop: '20px', fontWeight: 600, color: '#000' }}>
                  And through this mission, Prof. Ravindrababu Ravula continues to inspire a new generation—not only to build successful careers, but also to build secure and financially independent lives.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Scroll hint */}
      <div className="scroll-hint-overlay" style={{ opacity: scrolled ? 0 : 1 }}>
        <div className="scroll-mouse" />
        <span>Plan Your Future</span>
      </div>

    </div>
  );
}
