import React, { useEffect, useState } from "react";
import heroPerson from "./assets/hero-person.png";
import "./PhilanthropistPage.css";

/* ── Icons ── */
const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
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
  <span className="ph-badge" style={{
    background: type === "gold" ? "rgba(0,0,0,0.15)" : "rgba(255,183,3,0.12)",
    color: type === "gold" ? "#111" : "#ffb703",
    border: type !== "gold" ? "1px solid rgba(255,183,3,0.2)" : "none",
  }}>
    <StarIcon /> {label}
  </span>
);

/* ── Stats data ── */
const PH_STATS = [
  { value: "Lakhs", label: "Students Inspired" },
  { value: "Free", label: "Quality Education" },
  { value: "Raudra", label: "Charitable Trust" },
  { value: "Change", label: "Tool for Social Change" },
];

export default function PhilanthropistPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="ph-wrapper">

      <div className="ph-body">

        {/* ══════════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════════ */}
        <section className="ph-hero">
          <div className="ph-bg-text">RBR</div>

          <div className="ph-hero-inner">
            <div className="ph-hero-left">
              <div className="ph-eyebrow">
                <div className="eyebrow-row">
                  <span className="eyebrow-label">Mission</span>
                  <span className="eyebrow-value">COMPASSIONATE EDUCATION</span>
                </div>
                <div className="eyebrow-row">
                  <span className="eyebrow-label">Vision</span>
                  <span className="eyebrow-value">SOCIAL TRANSFORMATION</span>
                </div>
              </div>

              <h1 className="ph-headline">
                Compassion <br />
                <em>Beyond</em> <br />
                Classrooms.
              </h1>

              <div className="ph-hero-cards">
                <div className="ph-card dark">
                  <Badge label="Social Impact" />
                  <p className="ph-card-text">
                    Committed to a vision where quality education is accessible to everyone, regardless of financial background.
                  </p>
                </div>
                <div className="ph-card gold">
                  <Badge label="Trust Foundation" type="gold" />
                  <div className="ph-card-big-num">Impact</div>
                  <p className="ph-card-text" style={{ color: "#444" }}>
                    Driving long-term social progress through the Raudra Charitable Trust.
                  </p>
                </div>
              </div>
            </div>

            <div className="ph-hero-right">
              <div className="ph-hero-img-wrap">
                <img
                  src={heroPerson}
                  alt="Prof. Ravindrababu Ravula as Philanthropist"
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                />
                <div className="ph-hero-img-overlay">
                  <p className="ph-img-title">Education for<br />All</p>
                  <div className="ph-stat-box">
                    <div className="big-num">
                        1M+
                    </div>
                    <div className="small-lbl">Lives<br />Touched</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats Strip ── */}
        <section className="ph-stats-strip">
          <div className="ph-stats-inner">
            <div className="ph-strip-label">
              <HeartIcon />
              <span>A Legacy of Giving Back</span>
            </div>
            <div className="ph-stats-grid">
              {PH_STATS.map((s) => (
                <div className="ph-stat-item" key={s.label}>
                  <div className="ph-stat-val">{s.value}</div>
                  <div className="ph-stat-lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="ph-divider" />

        {/* ══════════════════════════════════════════
            PANEL 2 — RAUDRA CHARITABLE TRUST
        ══════════════════════════════════════════ */}
        <section className="ph-section">
          <div className="ph-panel-inner">
            <div className="ph-panel-left">
              <p className="sec-label">Foundation</p>
              <h2 className="panel-h2">
                Raudra Charitable Trust — <em style={{ fontStyle: "normal", color: "#ffb703" }}>Empowering Through Education</em>
              </h2>
              <p className="panel-p">
                The Raudra Charitable Trust was founded with a simple yet powerful mission: to promote education and provide learning opportunities to children and students who cannot afford access to quality education.
              </p>
              <p className="panel-p">
                At the heart of this vision lies an initiative established to support education and provide opportunities for students from underprivileged backgrounds. Through this trust, efforts are made to bring free education, learning resources, and academic guidance to those who need them most.
              </p>

              <div className="ph-pills-row">
                {['Empowering Youth', 'Equal Access', 'Academic Guidance', 'Free Resources'].map(tag => (
                  <span key={tag} className="ph-pill">{tag}</span>
                ))}
              </div>
            </div>

            <div className="ph-panel-right">
              <div className="ph-img-card">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80"
                  alt="Students learning and growing"
                />
              </div>
              <div className="ph-info-card">
                <h3>Bridging the Gap</h3>
                <p>Prof. Ravindrababu Ravula firmly believes that talent exists everywhere, but opportunity does not. This initiative reflects a belief that education should be a powerful equalizer capable of transforming lives.</p>
              </div>
            </div>
          </div>

          <div className="ph-panel-full">
            <blockquote className="ph-quote">
              "When knowledge is shared freely, it has the power to change the world."
            </blockquote>
          </div>
        </section>

        <div className="ph-divider" />

        {/* ══════════════════════════════════════════
            PANEL 3 — FREE EDUCATION
        ══════════════════════════════════════════ */}
        <section className="ph-section ph-section-alt">
          <div className="ph-panel-full" style={{ marginBottom: 48 }}>
            <p className="sec-label">Dedication</p>
            <h2 className="panel-h2">A Deep Commitment to Accessible Learning</h2>
          </div>
          
          <div className="ph-panel-inner ph-panel-reverse ph-panel-v-center">
            <div className="ph-panel-left">
              <div className="ph-huge-stat">
                <div className="ph-huge-num">
                  <CountUp end={100} suffix="%" />
                </div>
                <div className="ph-huge-label">Commitment to Free Education</div>
                <p className="ph-huge-desc">Ensuring that financial limitations do not become barriers to learning for any deserving student.</p>
              </div>
            </div>

            <div className="ph-panel-right">
              <p className="panel-p">
                One of the core values guiding Prof. Ravindrababu Ravula’s philanthropic work is his unwavering belief in free and accessible education. From the early days of his career, he has consistently worked toward making knowledge available to as many people as possible.
              </p>
              <p className="panel-p">
                Whether through online lectures, educational resources, or charitable initiatives, he has always sought ways to ensure that financial limitations do not become barriers to learning. His approach is simple: if education has the power to change lives, then it should be shared generously.
              </p>
              <blockquote className="ph-quote" style={{ margin: "24px 0", maxWidth: "none" }}>
                "His vision reflects a future where every child has the opportunity to learn, grow, and build a better life through education."
              </blockquote>
            </div>
          </div>
        </section>

        <div className="ph-divider" />

        {/* ══════════════════════════════════════════
            PANEL 4 — SUPPORTING STUDENTS
        ══════════════════════════════════════════ */}
        <section className="ph-section">
          <div className="ph-panel-inner">
            <div className="ph-panel-left">
              <p className="sec-label">Personal Impact</p>
              <h2 className="panel-h2">Supporting Students in Need</h2>
              <p className="panel-p">
                Prof. Ravindrababu Ravula’s philanthropic philosophy goes beyond institutional programs. At a personal level, he has always demonstrated a willingness to help individuals who are struggling to access educational opportunities.
              </p>
              <p className="panel-p">
                Whenever possible, he has tried to provide support to students who face financial challenges, helping them continue their education and pursue their dreams. This willingness to extend help—whether through mentorship, guidance, or educational support—reflects a genuine commitment to uplifting others.
              </p>
              
              <div className="ph-method-tags">
                {[
                  'Personal Mentorship', 
                  'Financial Assistance', 
                  'Career Guidance', 
                  'Emotional Support', 
                  'Success Coaching'
                ].map(tag => (
                  <span key={tag} className="ph-method-tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="ph-panel-right">
              <div className="ph-img-card">
                 <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80"
                  alt="Compassion and support"
                />
              </div>
              <div className="ph-info-card">
                <h3>A Turning Point</h3>
                <p>For many students, his support becomes a turning point that allows them to move forward in life with confidence and hope.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="ph-divider" />

        {/* ══════════════════════════════════════════
            PANEL 5 — SOCIAL CHANGE
        ══════════════════════════════════════════ */}
        <section className="ph-section ph-section-alt">
          <div className="ph-panel-full" style={{ marginBottom: 48 }}>
            <p className="sec-label">Vision</p>
            <h2 className="panel-h2">Education as a Tool for Social Change</h2>
          </div>

          <div className="ph-panel-inner ph-panel-v-center">
            <div className="ph-panel-left">
              <p className="panel-p">
                Prof. Ravindrababu Ravula strongly believes that education is one of the most powerful tools for social transformation. When individuals gain access to knowledge and skills, they gain the ability to change not only their own lives but also the lives of their families and communities.
              </p>
              <p className="panel-p">
                By promoting free education and supporting underprivileged learners, the Raudra Charitable Trust seeks to create a <span style={{ color: "var(--ph-accent-color)", fontWeight: "600" }}>ripple effect of positive change</span>. A single educated student can inspire many others, creating a chain reaction that strengthens society as a whole.
              </p>

              <div className="ph-check-list-card">
                 <ul className="ph-check-list">
                    <li><CheckIcon /> Transforming individual lives</li>
                    <li><CheckIcon /> Uplifting entire communities</li>
                    <li><CheckIcon /> Creating a ripple effect of change</li>
                    <li><CheckIcon /> Long-term societal progress</li>
                 </ul>
              </div>
            </div>

            <div className="ph-panel-right">
               <div className="ph-gold-card">
                  <Badge label="Responsibility" type="gold" />
                  <h3 className="ph-gold-h3" style={{ marginTop: 16 }}>Compassion & Responsibility</h3>
                  <p className="ph-gold-p">
                    He believes that those who have been fortunate enough to succeed have a responsibility to contribute back to society. This sense of responsibility drives his continued involvement in philanthropic efforts.
                  </p>
                  <p className="ph-gold-p" style={{ marginTop: 16, fontWeight: 600 }}>
                    Success and generosity go hand in hand — true success is measured by the positive impact one creates in the lives of others.
                  </p>
               </div>
            </div>
          </div>
        </section>

        <div className="ph-divider" />

        {/* ══════════════════════════════════════════
            PANEL 6 — CONCLUSION
        ══════════════════════════════════════════ */}
        <section className="ph-section" style={{ paddingBottom: "100px" }}>
          <div className="ph-panel-inner">
            <div className="ph-panel-left">
              <p className="sec-label">The Legacy</p>
              <h2 className="panel-h2">Inspiring a Culture of Generosity</h2>
              <p className="panel-p">
                Prof. Ravindrababu Ravula’s story is not only a story of academic excellence and professional success—it is also a story of compassion, generosity, and commitment to social progress.
              </p>
              <p className="panel-p">
                Through his journey, he encourages students, professionals, and entrepreneurs to think beyond their own achievements and consider how they can contribute to society. In a world where education has the power to transform lives, he remains dedicated to ensuring that no deserving student is left behind.
              </p>
            </div>

            <div className="ph-panel-right">
              <div className="ph-info-card" style={{ marginBottom: 0 }}>
                <Badge label="Conclusion" />
                <h3 style={{ marginTop: 16 }}>A Lifelong Commitment</h3>
                <p>For Prof. Ravindrababu Ravula, philanthropy is not a one-time effort—it is a lifelong commitment. His journey shows that when knowledge is shared generously, it has the power to change the world.</p>
                <div className="ph-pills-row" style={{ marginTop: 24 }}>
                   <span className="ph-pill">Compassion</span>
                   <span className="ph-pill">Generosity</span>
                   <span className="ph-pill">Social Impact</span>
                </div>
              </div>
            </div>
          </div>

          <div className="ph-panel-full">
            <blockquote className="ph-quote">
              <strong style={{ color: "#fff", display: "block" }}>"True educators are remembered for their compassion and commitment to society."</strong>
            </blockquote>
          </div>
        </section>

      </div>

      {/* Scroll hint */}
      <div className="ph-scroll-hint" style={{ opacity: scrolled ? 0 : 1 }}>
        <div className="ph-scroll-mouse" />
        <span>Scroll Down</span>
      </div>

    </div>
  );
}
