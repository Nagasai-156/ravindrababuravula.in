import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "./assets/logo.png";
import heroPerson from "./assets/hero-person.png";
import "./VibeCoderPage.css";
import "./VibeCoderLayout.css";

/* ── Icons ── */
const ArrowUpRight = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const CodeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);

const SparklesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4M3 5h4"/>
  </svg>
);

const StarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ZapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const PaletteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
  </svg>
);

const BookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
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
    color: type === "gold" ? "#fff" : "#ffb703",
    border: type !== "gold" ? "1px solid rgba(255,183,3,0.2)" : "none",
  }}>
    <StarIcon /> {label}
  </span>
);

/* ── Stats ── */
const VC_STATS = [
  { value: "Flow", label: "Creative State", icon: "🌊" },
  { value: "Rapid", label: "Prototyping", icon: "⚡" },
  { value: "Joy", label: "Curiosity Driven", icon: "✨" },
  { value: "Tools", label: "Modern Systems", icon: "🛠️" },
];

const fullPrompt = "Generate a modern login component with glassmorphism";
const fullCode = `const LoginPage = () => {
  return (
    <div className="glass-container">
      <h2 className="title">Welcome Back</h2>
      <form>
        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <button type="submit" className="login-btn">Log In</button>
      </form>
    </div>
  );
};

export default LoginPage;`;

/* ── VS Code Animation Component ── */
const VSCodeAnimation = () => {
  const [step, setStep] = useState(0);
  const [promptText, setPromptText] = useState('');
  const [codeText, setCodeText] = useState('');

  useEffect(() => {
    let timeoutId;
    
    if (step === 0) {
      // Type prompt
      let i = 0;
      setPromptText('');
      setCodeText('');
      const interval = setInterval(() => {
        setPromptText(fullPrompt.slice(0, i + 1));
        i++;
        if (i === fullPrompt.length) {
          clearInterval(interval);
          timeoutId = setTimeout(() => setStep(1), 600);
        }
      }, 40);
      return () => {
        clearInterval(interval);
        clearTimeout(timeoutId);
      };
    } else if (step === 1) {
      // Generate code
      let i = 0;
      const interval = setInterval(() => {
        setCodeText(fullCode.slice(0, i + 1));
        i++;
        if (i === fullCode.length) {
          clearInterval(interval);
          timeoutId = setTimeout(() => setStep(0), 4000);
        }
      }, 10);
      return () => {
        clearInterval(interval);
        clearTimeout(timeoutId);
      };
    }
  }, [step]);

  return (
    <div className="vscode-window">
      <div className="vscode-header">
        <div className="vscode-dots">
          <span></span><span></span><span></span>
        </div>
        <div className="vscode-title">vibe-coder-agent.js — AI Assistant</div>
      </div>
      <div className="vscode-body">
        <div className="vscode-sidebar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <SparklesIcon />
        </div>
        <div className="vscode-editor">
          <div className="vscode-prompt-container">
            <SparklesIcon />
            <div className="vscode-prompt-text">
              {promptText}
              {step === 0 && <span className="vscode-prompt-cursor"></span>}
            </div>
          </div>
          
          <div className="vscode-code-area">
            {codeText.split('\n').map((line, idx) => {
              // 1. Escape angle brackets so the browser doesn't try to render HTML
              let formattedLine = line.replace(/</g, '&lt;').replace(/>/g, '&gt;');
              
              // 2. Wrap tags in spans (e.g., <div, </div, </div>)
              formattedLine = formattedLine.replace(/(&lt;\/?)([a-zA-Z0-9]+)(.*?&gt;)/g, '<span style="color:#569cd6">$1$2</span>$3');
              // Also highlight trailing brackets of tags if needed
              formattedLine = formattedLine.replace(/(&gt;)/g, '<span style="color:#569cd6">$1</span>');

              // 3. Highlight standard keywords
              if (formattedLine.includes('const') || formattedLine.includes('return') || formattedLine.includes('export default')) {
                formattedLine = formattedLine.replace(/(const|return|export default)/g, '<span class="code-keyword">$1</span>');
              }
              if (formattedLine.includes('LoginPage') && formattedLine.includes('const')) {
                formattedLine = formattedLine.replace('LoginPage', '<span class="code-function">LoginPage</span>');
              }
              // 4. Highlight attributes (e.g. className="...")
              if (formattedLine.includes('className=')) {
                formattedLine = formattedLine.replace(/className=&lt;span style="color:#569cd6"&gt;"&lt;\/span&gt;([^"]+)&lt;span style="color:#569cd6"&gt;"&lt;\/span&gt;/g, '<span style="color:#9cdcfe">className</span>=<span class="code-string">"$1"</span>');
                // simpler fallback replacement
                formattedLine = formattedLine.replace(/className="([^"]+)"/g, '<span style="color:#9cdcfe">className</span>=<span class="code-string">"$1"</span>');
              }
              return (
                <div key={idx} className="vscode-code-line" dangerouslySetInnerHTML={{ __html: formattedLine || '&nbsp;' }}></div>
              );
            })}
            {step === 1 && <span className="vscode-prompt-cursor" style={{ height: '1em', display: 'inline-block' }}></span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function VibeCoderPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="vc-wrapper">

      {/* ── Navigation ── */}
      <nav className="hs-nav">
        <div className="hs-nav-left">
          <img src={logoImg} alt="Logo" style={{ height: '32px' }} />
        </div>
        <button className="hs-nav-btn" onClick={() => navigate("/")}>
          Go Back <ArrowUpRight />
        </button>
      </nav>

      <div className="vc-body">

        {/* ══════════════════════════════════════════
            PANEL 1 — HERO 
        ══════════════════════════════════════════ */}
        <section className="p1-hero">
          <div className="p1-bg-text">FLOW</div>

          <div className="p1-hero-inner">
            <div className="p1-left">
              <div className="p1-eyebrow">
                <div className="eyebrow-row">
                  <span className="eyebrow-label">Mindset</span>
                  <span className="eyebrow-value">CREATIVE PROBLEM SOLVING</span>
                </div>
                <div className="eyebrow-row">
                  <span className="eyebrow-label">Focus</span>
                  <span className="eyebrow-value">HUMAN INTUITION</span>
                </div>
              </div>

              <h1 className="p1-headline" style={{ fontSize: 'clamp(2.5rem, 3.5vw, 4.2rem)' }}>
                The Rise of <br /> <em>Vibe Coding.</em> <br /> Shaping the Future.
              </h1>

              <div className="p1-cards-row">
                <div className="cc dark" style={{ padding: '32px 24px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.05, transform: 'scale(3)' }}>
                    <CodeIcon />
                  </div>
                  <Badge label="The Philosophy" />
                  <div className="cc-lbl" style={{ marginTop: 16, fontSize: '0.95rem', color: '#fff', lineHeight: 1.5 }}>
                    A philosophy of coding that emphasizes creativity, flow, experimentation, and rapid problem-solving using modern development tools.
                  </div>
                </div>

                <div className="cc gold" style={{ padding: '32px 24px', justifyContent: 'center' }}>
                  <Badge label="The Shift" type="gold" />
                  <div className="cc-val" style={{ marginTop: 16, fontSize: '1.4rem', fontWeight: 600, color: '#111' }}>
                    Art & Logic
                  </div>
                  <div className="cc-lbl" style={{ color: '#333', marginTop: 8 }}>
                    Blending technical knowledge with creativity to rapidly transform ideas into working software.
                  </div>
                </div>
              </div>

            </div>

            <div className="p1-right">
              <div className="p1-img-wrap" style={{ minHeight: '500px' }}>
                <img
                  src={heroPerson} 
                  alt="Prof. Ravindrababu Ravula - Vibe Coder"
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                />
                <div className="p1-img-overlay">
                  <p className="p1-img-title">Creative<br />Coding</p>
                  <div className="p1-stat-box">
                    <div className="big-num">Flow</div>
                    <div className="small-lbl">Intuitive<br />Development</div>
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
              <CodeIcon />
              <span>Modern Development Paradigm</span>
            </div>
            <div className="yt-stats-grid">
              {VC_STATS.map((s) => (
                <div className="yt-stat-item" key={s.label}>
                  <div className="yt-stat-val">{s.value}</div>
                  <div className="yt-stat-lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="vc-divider yp-divider" />

        {/* ══════════════════════════════════════════
            WHAT IS VIBE CODING & EVOLUTION
        ══════════════════════════════════════════ */}
        <section className="p2-section" style={{ paddingBottom: '0' }}>
          <div className="p2-inner">
            <div className="p2-left">
              <p className="sec-label">The Evolution</p>
              <h2 className="panel-h2" style={{ whiteSpace: 'normal', fontSize: '2.5rem' }}>From Rigid Syntax to <span style={{color: '#ffb703'}}>Creative Flow.</span></h2>
              <p className="panel-p">
                The world of software development is evolving at an extraordinary pace. Technologies that once required years of deep specialization are now becoming more accessible, creative, and intuitive.
              </p>
              <p className="panel-p">
                Traditionally, programming required extensive memorization of syntax, complex debugging, and long development cycles. Developers had to spend significant time writing code from scratch and solving problems step by step through manual processes.
              </p>
            </div>

            <div className="p2-right" style={{ paddingTop: 0 }}>
              <div className="dark-info-card" style={{ borderColor: '#ffb703', background: 'rgba(255, 183, 3, 0.03)' }}>
                <h3 style={{ display:'flex', alignItems:'center', gap: '8px', color:'#fff', fontFamily:'Unbounded', fontSize: '1.2rem', marginBottom: '16px'}}>
                   The Modern Era
                </h3>
                <p>
                  However, modern programming environments have dramatically changed the landscape. With powerful development tools, intelligent coding assistants, and advanced frameworks, programmers can now focus more on creativity, architecture, and problem-solving rather than repetitive technical tasks.
                </p>
                <p style={{ marginBottom: 0 }}>
                  This transformation has led to the emergence of new development philosophies like vibe coding, where the focus shifts from mechanical coding to building, experimenting, and innovating quickly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CONCEPT BOX: WHAT IT IS
        ══════════════════════════════════════════ */}
        <section className="vc-concept-box">
          <div style={{ textAlign: 'center' }}>
            <Badge label="The Mindset" />
            <h2 className="panel-h2" style={{ fontSize: 'clamp(1.8rem, 2.5vw, 2.2rem)', margin: '16px 0', whiteSpace: 'normal'}}>What is Vibe Coding?</h2>
            <p className="panel-p" style={{ maxWidth: '800px', margin: '0 auto 16px' }}>
              Vibe coding is a mindset and approach to programming where developers work in a state of deep creative flow, using modern tools and technologies to rapidly build ideas into real applications. Instead of overthinking every line of code, developers focus on the broader goal of solving problems and creating functional solutions quickly.
            </p>
            <p className="panel-p" style={{ maxWidth: '800px', margin: '0 auto 32px' }}>
              In this approach, coding becomes less about rigid rules and more about creative exploration combined with strong technical foundations. The emphasis is heavily placed on:
            </p>
          </div>

          <div className="vc-concept-list">
            <div className="vc-concept-item"><CheckIcon /> Creative problem solving</div>
            <div className="vc-concept-item"><CheckIcon /> Rapid experimentation</div>
            <div className="vc-concept-item"><CheckIcon /> Intuitive development</div>
            <div className="vc-concept-item"><CheckIcon /> Leveraging modern tools and automation</div>
            <div className="vc-concept-item"><CheckIcon /> Building prototypes quickly</div>
            <div className="vc-concept-item"><CheckIcon /> Maintaining the joy and curiosity of programming</div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            VS CODE AI AGENT ANIMATION DEMO
        ══════════════════════════════════════════ */}
        <section style={{ padding: '0 24px' }}>
          <VSCodeAnimation />
        </section>

        {/* ══════════════════════════════════════════
            FEATURES: WHY IT MATTERS
        ══════════════════════════════════════════ */}
        <section style={{ padding: '40px 0 0' }}>
          <div style={{ textAlign: 'center', padding: '0 24px' }}>
            <p className="sec-label">Advantage</p>
            <h2 className="panel-h2" style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', marginBottom: 24 }}>Why Vibe Coding Matters in the Modern Era</h2>
            <p className="panel-p" style={{ margin: '0 auto', maxWidth: '800px', textAlign: 'center' }}>The software industry today moves faster than ever before. Startups launch products within weeks, new frameworks appear every year, and developers constantly adapt to evolving technologies. Vibe coding encourages developers to:</p>
          </div>

          <div className="vc-features-grid">
            <div className="vc-feature-card">
              <div className="vc-feature-icon"><ZapIcon /></div>
              <h3>Speed to Market</h3>
              <p>Move from idea to prototype rapidly, adapting to modern speeds and breaking away from the friction of outdated setups.</p>
            </div>
            <div className="vc-feature-card">
              <div className="vc-feature-icon"><SparklesIcon /></div>
              <h3>Fearless Experimentation</h3>
              <p>Experiment with multiple solutions without fear of failure, quickly pivoting to what actually works.</p>
            </div>
            <div className="vc-feature-card">
              <div className="vc-feature-icon"><PaletteIcon /></div>
              <h3>Sustain Joy</h3>
              <p>Leverage modern development tools efficiently, maintain enthusiasm, and preserve curiosity while coding.</p>
            </div>
          </div>
        </section>

        <div className="vc-divider yp-divider" />

        {/* ══════════════════════════════════════════
            LEARNING PHILOSOPHY
        ══════════════════════════════════════════ */}
        <section style={{ padding: '60px 24px 40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '1200px', margin: '0 auto' }}>
            <Badge label="Education Approach" />
            <h2 className="panel-h2" style={{ whiteSpace: 'normal', fontSize: 'clamp(2rem, 3vw, 2.8rem)', margin: '16px 0 24px', textAlign: 'center' }}>
              A New Learning Philosophy for Future Developers
            </h2>
            <p className="panel-p" style={{ maxWidth: '800px', margin: '0 auto 40px', textAlign: 'center' }}>
              For many students and young developers, learning programming can initially feel overwhelming. Complex syntax, debugging errors, and unfamiliar technologies often discourage beginners. Vibe coding offers a refreshing perspective.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', maxWidth: '750px', margin: '0 auto', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255, 183, 3, 0.1)', color: '#ffb703', flexShrink: 0, border: '1px solid rgba(255, 183, 3, 0.2)' }}>
                  <ZapIcon />
                </div>
                <div style={{ paddingTop: '8px' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: '#fff', fontFamily: 'Unbounded, sans-serif' }}>Confidence</h3>
                  <p style={{ fontSize: '1rem', color: '#aaa', margin: 0, lineHeight: 1.6 }}>Building confidence in solving problems independently.</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255, 183, 3, 0.1)', color: '#ffb703', flexShrink: 0, border: '1px solid rgba(255, 183, 3, 0.2)' }}>
                  <SparklesIcon />
                </div>
                <div style={{ paddingTop: '8px' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: '#fff', fontFamily: 'Unbounded, sans-serif' }}>Curiosity</h3>
                  <p style={{ fontSize: '1rem', color: '#aaa', margin: 0, lineHeight: 1.6 }}>Fostering curiosity to explore new tech without hesitation.</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255, 183, 3, 0.1)', color: '#ffb703', flexShrink: 0, border: '1px solid rgba(255, 183, 3, 0.2)' }}>
                  <PaletteIcon />
                </div>
                <div style={{ paddingTop: '8px' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: '#fff', fontFamily: 'Unbounded, sans-serif' }}>Creativity</h3>
                  <p style={{ fontSize: '1rem', color: '#aaa', margin: 0, lineHeight: 1.6 }}>Encouraging creativity in designing practical solutions.</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255, 183, 3, 0.1)', color: '#ffb703', flexShrink: 0, border: '1px solid rgba(255, 183, 3, 0.2)' }}>
                  <CodeIcon />
                </div>
                <div style={{ paddingTop: '8px' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: '#fff', fontFamily: 'Unbounded, sans-serif' }}>Resilience</h3>
                  <p style={{ fontSize: '1rem', color: '#aaa', margin: 0, lineHeight: 1.6 }}>Developing resilience when facing technical challenges.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            THE VISION SPLIT (WITH IMAGE)
        ══════════════════════════════════════════ */}
        <section className="vc-vision-split" style={{ paddingTop: '20px' }}>
          <div className="vc-vision-content">
            <Badge label="The Vision" />
            <h2 className="panel-h2" style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', whiteSpace: 'normal', margin: '16px 0 24px' }}>
              Prof. RBR's Vision for Vibe Coding
            </h2>
            <div className="dark-info-card" style={{ padding: '32px', borderLeft: '3px solid #ffb703', borderRadius: '0 16px 16px 0', background: 'rgba(255, 183, 3, 0.02)' }}>
              <p className="panel-p" style={{ marginBottom: '20px', color: '#e0e0e0' }}>
                Throughout his career, Prof. Ravindrababu Ravula has consistently stayed ahead of technological trends, whether in computer science education, online learning, or digital platforms.
              </p>
              <p className="panel-p" style={{ marginBottom: 0, color: '#e0e0e0' }}>
                His interest in vibe coding reflects his belief that the next generation of developers must not only understand algorithms and data structures but also develop the creativity and mindset required to build innovative software solutions. 
              </p>
            </div>
          </div>

          <div className="vc-vision-image-wrapper">
             <img 
               src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
               alt="Creative Collaboration and Vision" 
             />
             <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'}}>
                <div style={{ color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: '1.05rem', fontStyle: 'italic', fontWeight: '500' }}>
                  "Programming is not just about writing code—it is about transforming ideas into impactful solutions."
                </div>
             </div>
          </div>
        </section>


        {/* ══════════════════════════════════════════
            UDEMY COURSES BANNER
        ══════════════════════════════════════════ */}
        <section className="vc-course-banner">
          <Badge label="Coming Soon" type="gold" />
          <h2 className="panel-h2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', margin: '24px 0', whiteSpace: 'normal'}}>Upcoming Udemy Courses on Vibe Coding</h2>
          <p className="panel-p" style={{ maxWidth: '800px', margin: '0 auto 32px', textAlign: 'center', color: '#ccc' }}>
            To share this vision with a wider audience, Prof. Ravindrababu Ravula is planning to launch several Udemy courses focused on vibe coding and modern software development practices.
          </p>
          <p className="panel-p" style={{ fontSize: '0.95rem', fontStyle: 'italic', maxWidth: '800px', margin: '0 auto 32px' }}>
             The courses will be designed to help students, developers, and technology enthusiasts embrace a new style of coding that combines technical depth with creative freedom.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', textAlign: 'left', marginTop: '24px' }}>
             <div style={{ display:'flex', alignItems:'center', gap:'12px', background:'rgba(255,255,255,0.05)', padding:'16px', borderRadius:'12px', color:'#fff', fontFamily:'Inter, sans-serif', fontSize:'0.9rem'}}>
               <BookIcon /> Philosophy of vibe coding
             </div>
             <div style={{ display:'flex', alignItems:'center', gap:'12px', background:'rgba(255,255,255,0.05)', padding:'16px', borderRadius:'12px', color:'#fff', fontFamily:'Inter, sans-serif', fontSize:'0.9rem'}}>
               <ZapIcon /> Modern development tools
             </div>
             <div style={{ display:'flex', alignItems:'center', gap:'12px', background:'rgba(255,255,255,0.05)', padding:'16px', borderRadius:'12px', color:'#fff', fontFamily:'Inter, sans-serif', fontSize:'0.9rem'}}>
               <CodeIcon /> Rapid experimentation
             </div>
             <div style={{ display:'flex', alignItems:'center', gap:'12px', background:'rgba(255,255,255,0.05)', padding:'16px', borderRadius:'12px', color:'#fff', fontFamily:'Inter, sans-serif', fontSize:'0.9rem'}}>
               <PaletteIcon /> Creative problem-solving
             </div>
          </div>
        </section>

        <div className="vc-divider yp-divider" />

        {/* ══════════════════════════════════════════
            EMPOWERING & CONCLUSION
        ══════════════════════════════════════════ */}
        <section className="p4-section">
          <div className="p4-inner">
            <div className="p4-left">
              <p className="sec-label">The Future</p>
              <h2 className="panel-h2" style={{ whiteSpace: 'normal', fontSize: '2.5rem' }}>Empowering the Next Generation of Innovators</h2>
              <p className="panel-p">
                Prof. Ravindrababu Ravula has always believed that education should evolve alongside technology. Just as he helped lakhs of students master complex computer science concepts through simplified teaching methods, he now aims to help learners adapt to the evolving culture of modern programming.
              </p>
              
              <div className="cc dark" style={{ padding: 24, marginTop: 24 }}>
                <Badge label="Future of Programming" />
                <div className="cc-body" style={{ color: "#aaa", marginTop: 12 }}>
                  As AI, automation, and intelligent development tools continue to advance, the nature of programming will keep evolving. Developers who succeed will be those who combine technical knowledge with creativity, adaptability, and innovative thinking.
                </div>
              </div>
            </div>

            <div className="p4-right">
              <div className="gold-card-massive">
                <Badge label="Conclusion" type="gold" />

                <h3 className="gold-card-h3" style={{ fontSize: '1.4rem' }}>
                  The emergence of vibe coding marks an exciting new chapter in the evolution of software development.
                </h3>

                <p className="gold-card-p">
                  It encourages programmers to move beyond rigid coding practices and embrace a more creative, intuitive, and experimental approach to building software.
                </p>

                <div className="gold-quote-box">
                  <strong>"Vibe coding reflects this future. It represents a mindset where developers embrace experimentation, enjoy the process of building, and continuously push the boundaries of what technology can achieve."</strong>
                </div>
                
                <p className="gold-card-p" style={{ marginTop: '20px', fontWeight: 600, color: '#000' }}>
                  Through this initiative, Prof. Ravindrababu Ravula continues to inspire learners not only to understand technology but also to shape the future of software development itself.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FOOTER 
        ══════════════════════════════════════════ */}
        <footer className="vc-footer p5-footer">
          <div className="fp-footer-inner p5-footer-inner">
            <div className="vc-footer-left">
              <div className="footer-logo-text">Prof. Ravindrababu Ravula</div>
              <p className="fp-footer-tagline">
                Embracing the state of creative flow.<br />Vibe Coding the Future.
              </p>
            </div>
            <div className="vc-footer-right">
              <a href="https://www.youtube.com/@RavindrababuRavula" target="_blank" rel="noopener noreferrer" className="vc-yt-link">
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
        <span>Discover Flow</span>
      </div>

    </div>
  );
}
