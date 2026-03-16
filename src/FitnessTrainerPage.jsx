import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "./assets/logo.png";
import heroPerson from "./assets/hero-person.png";
import "./FitnessTrainerPage.css";
import "./FitnessTrainerLayout.css";

/* ── Icons ── */
const ArrowUpRight = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const DumbbellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.4 14.4 9.6 9.6" />
    <path d="M18.65 21.35a3.53 3.53 0 0 0 0-5l-2.83-2.83a3.53 3.53 0 0 0-5 0l-2.83 2.83a3.53 3.53 0 0 0 0 5l2.83 2.83a3.53 3.53 0 0 0 5 0l2.83-2.83Z" />
    <path d="m21.5 21.5-1.4-1.4" />
    <path d="M3.9 3.9 2.5 2.5" />
    <path d="M6.4 7.82a3.53 3.53 0 0 0 5 0l2.83-2.83a3.53 3.53 0 0 0 0-5L11.4 2.82a3.53 3.53 0 0 0-5 0L3.57 5.65a3.53 3.53 0 0 0 0 5l2.83 2.83Z" />
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

/* ── Fitness stats ── */
const FT_STATS = [
  { value: "Daily", label: "Discipline", icon: "🗓️" },
  { value: "Hobby", label: "Passion Driven", icon: "🔥" },
  { value: "Mind+", label: "Body Balance", icon: "🧠" },
  { value: "Science", label: "Backed Training", icon: "🧬" },
];

export default function FitnessTrainerPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="ft-wrapper">

      {/* ── Navigation ── */}
      <nav className="hs-nav">
        <div className="hs-nav-left">
          <img src={logoImg} alt="Logo" style={{ height: '32px' }} />
        </div>
        <button className="hs-nav-btn" onClick={() => navigate("/")}>
          Go Back <ArrowUpRight />
        </button>
      </nav>

      <div className="ft-body">

        {/* ══════════════════════════════════════════
            PANEL 1 — HERO
        ══════════════════════════════════════════ */}
        <section className="p1-hero">
          <div className="p1-bg-text">FIT</div>

          <div className="p1-hero-inner">
            <div className="p1-left">
              <div className="p1-eyebrow">
                <div className="eyebrow-row">
                  <span className="eyebrow-label">Passion</span>
                  <span className="eyebrow-value">FITNESS ENTHUSIAST</span>
                </div>
                <div className="eyebrow-row">
                  <span className="eyebrow-label">Core Belief</span>
                  <span className="eyebrow-value">STRONG BODY = STRONG MIND</span>
                </div>
              </div>

              <h1 className="p1-headline" style={{ fontSize: 'clamp(2.5rem, 3.5vw, 4.2rem)' }}>
                A Fitness Trainer by <em>Hobby</em> & a True <em>Enthusiast.</em>
              </h1>

              {/* Unique Hero Card Layout */}
              <div className="ft-hero-cards">
                <div className="cc dark" style={{ padding: '32px 24px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.05, transform: 'scale(3)' }}>
                    <DumbbellIcon />
                  </div>
                  <Badge label="The Philosophy" />
                  <div className="ft-stat-row">
                    <div className="ft-stat-num" style={{ fontSize: '1.4rem' }}>Mindset</div>
                    <div className="ft-stat-lbl" style={{ fontSize: '0.9rem', color: '#fff' }}>Physical discipline fuels mental strength.</div>
                  </div>
                  <div className="cc-lbl" style={{ marginTop: 16 }}>
                    Maintaining a healthy body improves concentration, resilience, productivity, and emotional balance.
                  </div>
                </div>

                <div className="cc gold" style={{ padding: '32px 24px', justifyContent: 'center' }}>
                  <Badge label="The Lifestyle" type="gold" />
                  <div className="cc-val" style={{ marginTop: 16, fontSize: '1.4rem', fontWeight: 600, color: '#111' }}>
                    Beyond Profession
                  </div>
                  <div className="cc-lbl" style={{ color: '#333', marginTop: 8 }}>
                    Despite his demanding career as an educator and entrepreneur, fitness remains an integral, non-negotiable part of his daily routine.
                  </div>
                </div>
              </div>

            </div>

            <div className="p1-right">
              <div className="p1-img-wrap" style={{ minHeight: '500px' }}>
                <img
                  src={heroPerson} // Placeholder, can be swapped for a fitness image if available
                  alt="Prof. Ravindrababu Ravula - Fitness Enthusiast"
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                />
                <div className="p1-img-overlay">
                  <p className="p1-img-title">Peak<br />Performance</p>
                  <div className="p1-stat-box">
                    <div className="big-num">100%</div>
                    <div className="small-lbl">Commitment<br />to Health</div>
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
              <DumbbellIcon />
              <span>Training & Lifestyle Metrics</span>
            </div>
            <div className="yt-stats-grid">
              {FT_STATS.map((s) => (
                <div className="yt-stat-item" key={s.label}>
                  <div className="yt-stat-val">{s.value}</div>
                  <div className="yt-stat-lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="ft-divider yp-divider" />

        {/* ══════════════════════════════════════════
            INTRODUCTION SECTION
        ══════════════════════════════════════════ */}
        <section className="ft-intro-section" style={{ padding: '80px 40px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="panel-h2" style={{ whiteSpace: 'normal', fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', marginBottom: 32, lineHeight: 1.4 }}>
            Success in life requires more than intellectual ability. <br/> <span style={{ color: '#ffb703' }}>True excellence comes from maintaining a balance.</span>
          </h2>
          <p className="panel-p" style={{ fontSize: '1.1rem', marginBottom: 24, marginInline: 'auto', maxWidth: '850px' }}>
            Success in life requires more than intellectual ability or professional expertise. True excellence comes from maintaining a balance between mental strength, physical fitness, discipline, and a healthy lifestyle. Many high achievers across different fields understand that physical fitness plays a crucial role in sustaining energy, focus, and long-term productivity.
          </p>
          <p className="panel-p" style={{ fontSize: '1.1rem', marginInline: 'auto', maxWidth: '850px' }}>
            For Prof. Ravindrababu Ravula, fitness is not a profession but a deep personal passion and hobby. Despite his demanding career as an educator, entrepreneur, and mentor, he consistently prioritizes physical health and disciplined living. His commitment to fitness reflects the mindset of someone who believes that a strong body supports a powerful mind. Over the years, he has developed strong knowledge of modern training methods, exercise science, nutrition, and lifestyle discipline.
          </p>
        </section>

        <div className="ft-divider yp-divider" />

        {/* ══════════════════════════════════════════
            TRAINING ROUTINES GRID
        ══════════════════════════════════════════ */}
        <section style={{ padding: '60px 0' }}>
          <div style={{ textAlign: 'center', marginBottom: 60, padding: '0 24px' }}>
            <p className="sec-label">The Regimen</p>
            <h2 className="panel-h2" style={{ fontSize: 'clamp(2rem, 3vw, 3rem)' }}>Comprehensive Training Approach</h2>
          </div>

          <div className="ft-routine-grid">
            
            {/* Box 1 */}
            <div className="ft-routine-card">
              <div className="ft-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h3>Strength & Resistance</h3>
              <p>One of the core components of his fitness routine is strength training, which focuses on building muscle strength, endurance, and overall body stability. Strength training helps improve metabolism, bone density, and long-term physical resilience.</p>
              <div className="ft-routine-list">
                <div className="ft-list-item"><CheckIcon /> Resistance training using weights and bodyweight</div>
                <div className="ft-list-item"><CheckIcon /> Progressive overload to gradually improve strength</div>
                <div className="ft-list-item"><CheckIcon /> Compound exercises (squats, deadlifts, presses)</div>
                <div className="ft-list-item"><CheckIcon /> Functional strength for movement efficiency</div>
                <div className="ft-list-item"><CheckIcon /> Core strengthening programs for posture</div>
              </div>
            </div>

            {/* Box 2 */}
            <div className="ft-routine-card">
              <div className="ft-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <h3>Cardiovascular & Endurance</h3>
              <p>Along with strength development, cardiovascular health is an essential aspect of his fitness routine. Cardio training helps improve heart health, stamina, and overall endurance, supporting energy levels and lung capacity.</p>
              <div className="ft-routine-list">
                <div className="ft-list-item"><CheckIcon /> High-Intensity Interval Training (HIIT)</div>
                <div className="ft-list-item"><CheckIcon /> Steady-state cardio workouts</div>
                <div className="ft-list-item"><CheckIcon /> Endurance conditioning</div>
                <div className="ft-list-item"><CheckIcon /> Aerobic fitness training</div>
              </div>
            </div>

            {/* Box 3 */}
            <div className="ft-routine-card">
              <div className="ft-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m12 18 4-4-4-4"/><path d="M8 12h8"/></svg>
              </div>
              <h3>Modern Fitness Programs</h3>
              <p>Prof. Ravindrababu Ravula keeps himself updated with popular modern fitness programs and training techniques practiced worldwide, focusing not only on building strength but also on improving mobility and physical performance.</p>
              <div className="ft-routine-list">
                <div className="ft-list-item"><CheckIcon /> Cross-training workouts</div>
                <div className="ft-list-item"><CheckIcon /> Functional fitness programs</div>
                <div className="ft-list-item"><CheckIcon /> Bodyweight training systems</div>
                <div className="ft-list-item"><CheckIcon /> Strength and conditioning programs</div>
                <div className="ft-list-item"><CheckIcon /> Metabolic training routines</div>
                <div className="ft-list-item"><CheckIcon /> Mobility and flexibility training</div>
              </div>
            </div>

            {/* Box 4 */}
            <div className="ft-routine-card">
              <div className="ft-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"/><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="m4 8 16-4"/><path d="m8.86 6.78-.45-1.81a2 2 0 0 0-2.45-1.46L4.15 4.02"/></svg>
              </div>
              <h3>Knowledge of Fitness Science</h3>
              <p>What distinguishes his approach to fitness is not only dedication but also a curiosity to understand the science behind training. He treats fitness not just as a physical activity but as a disciplined system for long-term health.</p>
              <div className="ft-routine-list">
                <div className="ft-list-item"><CheckIcon /> Muscle adaptation and recovery</div>
                <div className="ft-list-item"><CheckIcon /> Exercise biomechanics</div>
                <div className="ft-list-item"><CheckIcon /> Workout programming and periodization</div>
                <div className="ft-list-item"><CheckIcon /> Injury prevention techniques</div>
                <div className="ft-list-item"><CheckIcon /> Mobility and flexibility training</div>
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════
            FULL WIDTH QUOTE
        ══════════════════════════════════════════ */}
        <section className="ft-philosophy">
          <div className="ft-quote-text">
            "A strong mind performs best within a strong and healthy body."
          </div>
          <div className="ft-quote-sub">The Core Philosophy</div>
        </section>

        {/* ══════════════════════════════════════════
            NUTRITION & DIET SPLIT
        ══════════════════════════════════════════ */}
        <section className="ft-diet-split">
          <div className="ft-diet-content">
            <Badge label="Fueling the Machine" />
            <h2 className="panel-h2" style={{ whiteSpace: 'normal', margin: '24px 0 16px', fontSize: '2rem' }}>Discipline in Diet and Nutrition</h2>
            <p className="panel-p" style={{ marginBottom: 16 }}>
              Exercise alone is not enough to maintain peak physical health. Nutrition plays an equally important role in supporting physical training and recovery.
            </p>
            <p className="panel-p">
              Prof. Ravindrababu Ravula follows a disciplined and balanced approach to diet and nutrition, ensuring that his body receives the necessary nutrients required for strength, recovery, and energy. By combining a structured fitness routine with conscious dietary habits, he maintains a sustainable and healthy lifestyle.
            </p>
            <div className="ft-diet-tags">
              <span className="ft-diet-tag">Nutritional Balance</span>
              <span className="ft-diet-tag">Clean Eating</span>
              <span className="ft-diet-tag">Muscle Recovery</span>
              <span className="ft-diet-tag">Long-term Health</span>
            </div>
          </div>
          <div className="ft-diet-image" />
        </section>

        <div className="ft-divider yp-divider" />

        {/* ══════════════════════════════════════════
            HOBBY & LIFESTYLE INFO
        ══════════════════════════════════════════ */}
        <section className="p4-section">
          <div className="p4-inner">
            <div className="p4-left">
              <p className="sec-label">Impact</p>
              <h2 className="panel-h2" style={{ whiteSpace: 'normal' }}>Inspiring a Healthy Lifestyle</h2>
              <p className="panel-p">
                In an era where sedentary lifestyles and work-related stress are increasingly common, Prof. Ravindrababu Ravula’s dedication to fitness sends an important message: health is the foundation of productivity, creativity, and long-term success.
              </p>
              <p className="panel-p">
                Although fitness is not his profession, his deep interest in training and healthy living has made him someone who enjoys guiding and motivating others toward better health. As a hobby, he often shares insights on fitness routines, exercise techniques, and healthy lifestyle habits with those around him.
              </p>
            </div>

            <div className="p4-right">
              <div className="gold-card-massive">
                <Badge label="Conclusion" type="gold" />

                <h3 className="gold-card-h3" style={{ fontSize: '1.4rem' }}>
                  Prof. Ravindrababu Ravula’s passion for fitness reflects yet another dimension of his disciplined and well-rounded personality.
                </h3>

                <p className="gold-card-p">
                  As a fitness trainer by hobby, he actively follows modern training programs, strength workouts, cardio conditioning, and disciplined nutrition practices to maintain peak physical health.
                </p>

                <div className="gold-quote-box">
                  <strong>"His enthusiasm, knowledge of training techniques, and commitment to healthy living make him a true fitness enthusiast and fitness inspiration."</strong>
                </div>
                
                <p className="gold-card-p" style={{ marginTop: '20px', fontWeight: 600, color: '#000' }}>
                  By consistently prioritizing physical well-being alongside professional excellence, he encourages others to adopt healthier and more balanced lifestyles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FOOTER 
        ══════════════════════════════════════════ */}
        <footer className="ft-footer p5-footer">
          <div className="fp-footer-inner p5-footer-inner">
            <div className="ft-footer-left">
              <div className="footer-logo-text">Prof. Ravindrababu Ravula</div>
              <p className="fp-footer-tagline">
                Advocating for the perfect balance of<br />mental strength and physical excellence.
              </p>
            </div>
            <div className="fp-footer-right">
              <a href="https://www.youtube.com/@RavindrababuRavula" target="_blank" rel="noopener noreferrer" className="ft-yt-link">
                <YoutubeIcon />
                <span>Subscribe to Prof. RBR</span>
              </a>
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
        <span>Embrace Fitness</span>
      </div>

    </div>
  );
}
