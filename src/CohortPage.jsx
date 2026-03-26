import React, { useEffect, useState } from "react";
import "./CohortPage.css";

const RocketIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.59.79-1.47.79-1.47l4.13-1.63L16 11l4.71-4.71a2.83 2.83 0 0 0-4-4L12 7l-5.37 3.58-1.63 4.13s-.88.08-1.47.79z" />
        <path d="m13 10 4 4" />
        <path d="m14.5 6.5 3 3" />
        <path d="M10.11 11.2a1 1 0 1 1-1.41-1.41 1 1 0 1 1 1.41 1.41z" />
    </svg>
);

const TrophyIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
);

const BrainIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9.5 2A5.43 5.37 0 0 1 15 7.42c0 1.53-.51 3.08-1.58 3.08a3.03 3.03 0 0 1-3.23-2.69 2.1 2.1 0 0 0-3.35-1.44 2.19 2.19 0 0 0-1.22 2.64c.54 1.48 1.83 2.15 3.38 2.3 0 0-1 4.5 1.5 5.5s5-1 5-4.5c0-.5.5-1 1-1s1 .5 1 1c0 3.5-2.5 5.5-5 5.5-3 0-4.5-2.5-4.5-5.5 0-.28 0-.55.03-.81-1.58-.15-2.87-.82-3.41-2.3a4.19 4.19 0 0 1 2.32-5.06 4.1 4.1 0 0 1 4.54 1.44 1.03 1.03 0 0 0 1.09.28c.3-.11.53-.33.64-.64a1.41 1.41 0 0 1 1-1" />
        <path d="M15 13c1.5 0 2.5 1 2.5 2.5s-1 2.5-2.5 2.5" />
    </svg>
);

export default function CohortPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="cp-wrapper">
      <div className="cp-body">
        {/* Hero Section */}
        <section className="p1-hero">
          <div className="p1-bg-text">VENTURES</div>
          
          <div className="p1-hero-inner">
            <div className="p1-left">
              <div className="p1-eyebrow">
                <div className="eyebrow-row">
                  <span className="eyebrow-label">Program</span>
                  <span className="eyebrow-value">RAUDRA VENTURES</span>
                </div>
                <div className="eyebrow-row">
                  <span className="eyebrow-label">Batch</span>
                  <span className="eyebrow-value">COHORT 01</span>
                </div>
              </div>
              
              <h1 className="p1-headline">
                Where Bold Ideas Meet <br />
                <em>Unstoppable</em> <br />
                Momentum.
              </h1>

              <p className="p1-subheadline">
                Raudra Ventures backs 12 early-stage startups every cohort with mentorship, capital, infrastructure, and the network to scale. Apply now and build the future.
              </p>

              <div className="p1-cta-row">
                <button className="cta-primary" onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSdoK0hxfcyeqVAsTpzgrCn0qbhVTqOPwknAhC0b6bfc3V6xJQ/viewform?usp=publish-editor", "_blank")}>Apply Now</button>
                <button className="cta-secondary">Learn More</button>
              </div>

              <div className="p1-cards-row">
                <div className="cc dark">
                  <div className="cc-lbl">Duration</div>
                  <div className="cc-val">5 Months</div>
                  <div className="cc-prog"><div className="cc-prog-fill" style={{ width: "100%" }} /></div>
                </div>
                <div className="cc gold">
                  <div className="cc-lbl">Cohort Size</div>
                  <div className="cc-val">12 Startups</div>
                </div>
              </div>
            </div>

            <div className="p1-right">
              <div className="p1-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80"
                  alt="Acceleration Program"
                />
                <div className="p1-img-overlay">
                  <p className="p1-img-title">Backing the Builders<br />of Tomorrow</p>
                  <div className="p1-stat-box">
                    <div className="big-num">₹5L</div>
                    <div className="small-lbl">Top Prize<br />Funding</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Program Highlights */}
        <section className="cp-highlights">
          <div className="cp-container">
            <div className="highlights-strip">
                <div className="hs-item">
                    <span className="hs-val">5 Months</span>
                    <span className="hs-lbl">📅 Duration</span>
                </div>
                <div className="hs-item">
                    <span className="hs-val">12 Startups</span>
                    <span className="hs-lbl">🏢 Cohort Size</span>
                </div>
                <div className="hs-item">
                    <span className="hs-val">5–6%</span>
                    <span className="hs-lbl">💼 Equity</span>
                </div>
                <div className="hs-item">
                    <span className="hs-val">₹2–5 Lakhs</span>
                    <span className="hs-lbl">🏆 Top Prize</span>
                </div>
                <div className="hs-item">
                    <span className="hs-val">Demo Day</span>
                    <span className="hs-lbl">🎤 Pitch</span>
                </div>
                <div className="hs-item">
                    <span className="hs-val">In-person</span>
                    <span className="hs-lbl">📍 Mode</span>
                </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="cp-about">
          <div className="cp-container">
            <div className="cp-grid">
              <div className="cp-about-left">
                <h2 className="section-h2">About the Program</h2>
                <p className="cp-p">
                  Raudra Ventures Acceleration Program is a 5-month intensive program designed to take early-stage startups from idea to investable. We select 12 high-potential startups per cohort across frontier technology domains, and give them everything they need — space, support, structure, and skin in the game.
                </p>
                <p className="cp-p highlight">
                  In return, we take 5–6% equity — because we believe in growing together.
                </p>
              </div>
              <div className="cp-about-right">
                <div className="highlight-box">
                    <h3 style={{ fontFamily: 'Unbounded', fontSize: '1.2rem', marginBottom: '20px' }}>Program Focus</h3>
                    <p style={{ color: '#888', lineHeight: '1.6' }}>
                        Providing space, support, structure, and skin in the game for high-potential startups.
                    </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Domains Section */}
        <section className="cp-domains">
          <div className="cp-container">
            <div className="section-header">
                <h2 className="section-h2">Domains We Back</h2>
                <p className="section-p">We invest in the technologies defining the next decade.</p>
            </div>
            
            <div className="domains-grid">
              {[
                { id: "01", title: "Artificial Intelligence", desc: "LLMs, machine learning infrastructure, AI-powered products, and intelligent automation." },
                { id: "02", title: "Quantum Computing", desc: "Quantum algorithms, hardware development, and simulation platforms." },
                { id: "03", title: "Blockchain & Web3", desc: "Decentralized finance, smart contracts, dApps, and protocol infrastructure." },
                { id: "04", title: "Research", desc: "Science-first, IP-heavy ventures coming out of academia or independent labs." },
                { id: "05", title: "Deep Tech", desc: "Robotics, semiconductors, advanced materials, and frontier engineering." },
                { id: "06", title: "Hardware", desc: "IoT, embedded systems, consumer hardware, and physical product innovation." }
              ].map(d => (
                <div key={d.id} className="domain-card">
                  <span className="domain-num">{d.id}</span>
                  <h3 className="domain-title">{d.title}</h3>
                  <p className="domain-desc">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What You Get Section */}
        <section className="cp-benefits">
          <div className="cp-container">
            <h2 className="section-h2">What You Get</h2>
            <div className="benefits-grid">
              {[
                { icon: "🏛️", title: "Office Space", desc: "A dedicated workspace at Raudra HQ for the full 5 months — no distractions, just building." },
                { icon: "🔬", title: "Raudra Labs Access", desc: "Full access to our R&D lab, testing infrastructure, equipment, and technical resources." },
                { icon: "🤝", title: "Co-founder & Mentor Support", desc: "Matched with experienced mentors who've built and scaled companies." },
                { icon: "📡", title: "Weekly Industry Connect", desc: "Real conversations, real insights, real network with senior industry professionals." },
                { icon: "🎯", title: "Structured Task System", desc: "defined milestones and points. Your score reflects your execution." },
                { icon: "💰", title: "Performance-Based Funding", desc: "Top performers don't just get recognition — they get funded." },
                { icon: "🎤", title: "Demo Day Opportunity", desc: "Top 6 startups get the stage to pitch investors, partners, and the press." }
              ].map((b, i) => (
                <div key={i} className="benefit-item">
                  <span className="benefit-icon">{b.icon}</span>
                  <div className="benefit-content">
                    <h3 className="benefit-title">{b.title}</h3>
                    <p className="benefit-desc">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Points System */}
        <section className="cp-points">
          <div className="cp-container">
            <div className="points-card">
                <h2 className="section-h2">Points & Rewards System</h2>
                <p className="cp-p">We believe in rewarding execution. Every task, milestone, and deliverable in the program is tied to a points system.</p>
                
                <div className="points-info-grid">
                    <div className="points-rules">
                        <ul>
                            <li>Weekly tasks are assigned to each startup</li>
                            <li>Each task carries a defined point value</li>
                            <li>Points are tracked on a live cohort leaderboard</li>
                            <li>Final rankings calculated at the end of Month 5</li>
                        </ul>
                    </div>
                    <div className="points-why">
                        <div className="quote-box">
                            "Because we back builders, not just talkers. The system creates accountability and rewards teams that show up every week."
                        </div>
                    </div>
                </div>

                <div className="rewards-row">
                    <div className="reward-box rank-1">
                        <span className="reward-rank">🥇 Rank 1</span>
                        <span className="reward-val">₹5 Lakhs</span>
                        <p className="reward-note">Plus priority intros to Raudra's investor network</p>
                    </div>
                    <div className="reward-box rank-2">
                        <span className="reward-rank">🥈 Rank 2</span>
                        <span className="reward-val">₹3–4 Lakhs</span>
                        <p className="reward-note">Significant capital & continued engagement</p>
                    </div>
                    <div className="reward-box rank-3">
                        <span className="reward-rank">🥉 Rank 3</span>
                        <span className="reward-val">₹2 Lakhs</span>
                        <p className="reward-note">Access to follow-on mentorship</p>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="cp-timeline">
           <div className="cp-container">
                <h2 className="section-h2">Program Timeline</h2>
                <div className="timeline-flow">
                    {[
                        { month: "Month 1", title: "Foundation", desc: "Onboarding, co-founder matching, goal-setting. Weekly industry connect begins." },
                        { month: "Month 2", title: "Build", desc: "Deep product development phase. Lab access opens fully. Mentor check-ins." },
                        { month: "Month 3", title: "Validate", desc: "Market validation sprints, customer discovery. Mid-program review." },
                        { month: "Month 4", title: "Scale", desc: "Go-to-market strategy, fundraising prep, team structuring." },
                        { month: "Month 5", title: "Demo Prep", desc: "Final milestone tasks. Top 3 announced. Top 6 prep for Demo Day." }
                    ].map((t, i) => (
                        <div key={i} className="timeline-item">
                            <div className="tl-left">
                                <span className="tl-month">{t.month}</span>
                                <div className="tl-line" />
                            </div>
                            <div className="tl-right">
                                <h3 className="tl-title">{t.title}</h3>
                                <p className="tl-desc">{t.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
           </div>
        </section>

        {/* Demo Day & Investment */}
        <section className="cp-details">
            <div className="cp-container">
                <div className="details-grid">
                    <div className="details-card dark">
                        <h3>Demo Day</h3>
                        <p>Top 6 startups qualify for our flagship investor event. Pitch to VCs, angel investors, and industry leaders.</p>
                        <ul>
                            <li>10 min pitch + 5 min Q&A</li>
                            <li>Professional pitch deck review</li>
                            <li>1:1 investor scheduling</li>
                        </ul>
                    </div>
                    <div className="details-card gold">
                        <h3>Investment Terms</h3>
                        <p>We take 5–6% equity. Founder-friendly, simple, and transparent path from early-stage to investor-ready.</p>
                        <ul>
                            <li>Intensive support worth far more than equity</li>
                            <li>Immediate access to infra, labs, and labs</li>
                            <li>Structured path to scaling</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        {/* Who Should Apply */}
        <section className="cp-who">
          <div className="cp-container">
            <h2 className="section-h2">Who Should Apply</h2>
            <div className="who-grid">
              <div className="who-card fit">
                <h3>You're a great fit if you:</h3>
                <ul>
                  <li>Are an early-stage startup (pre-seed or seed stage)</li>
                  <li>Are working in AI, Quantum, Web3, Deep Tech, Research, or Hardware</li>
                  <li>Have a founding team of at least 2 people</li>
                  <li>Are ready to work full-time on your startup for 5 months</li>
                  <li>Can commit to weekly tasks, milestones, and the points system</li>
                  <li>Are open to 5–6% equity in exchange for the full program</li>
                </ul>
              </div>
              <div className="who-card not-fit">
                <h3>You're not a fit if:</h3>
                <p>You're looking for passive funding with no accountability. We back builders, not just talkers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Equity & Investment Terms */}
        <section className="cp-equity">
          <div className="cp-container">
            <div className="equity-box">
              <h2 className="section-h2">Equity & Investment Terms</h2>
              <p className="cp-p">We take 5–6% equity in each startup that joins the program. This is our commitment that we are invested in your success — not just as advisors, but as stakeholders.</p>
              <div className="equity-features">
                <div className="ef-item">
                  <h4>Founder-Friendly</h4>
                  <p>Simple, transparent terms with no hidden clauses.</p>
                </div>
                <div className="ef-item">
                  <h4>Massive Value</h4>
                  <p>Infrastructure, mentors, labs, and networks worth far more than the equity.</p>
                </div>
                <div className="ef-item">
                  <h4>Structured Path</h4>
                  <p>A proven trajectory from early-stage to investor-ready.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="cp-faq">
            <div className="cp-container">
                <h2 className="section-h2">Frequently Asked Questions</h2>
                <div className="faq-grid">
                    {[
                        { q: "Is this only for tech startups?", a: "Yes, focused on AI, Quantum, Blockchain, Deep Tech, Research, and Hardware." },
                        { q: "Do we need a product to apply?", a: "Not necessarily. Strong teams with clear problems or prototypes are considered." },
                        { q: "Is the equity negotiable?", a: "The standard range is 5–6%, discussed during selection." },
                        { q: "Can startups outside India apply?", a: "Currently in-person at Raudra HQ. Remote cases considered on case-by-case." }
                    ].map((f, i) => (
                        <div key={i} className="faq-item">
                            <h4 className="faq-q">Q: {f.q}</h4>
                            <p className="faq-a">{f.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

      </div>

      {/* Scroll hint */}
      <div className="scroll-hint-overlay" style={{ opacity: scrolled ? 0 : 1 }}>
        <div className="scroll-mouse" />
        <span>Scroll to Explore</span>
      </div>
    </div>
  );
}
