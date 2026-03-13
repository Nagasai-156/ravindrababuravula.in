import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroPerson from "./assets/hero-person.png";
import "./EnvironmentalistPage.css";

/* ── Icons ── */
const ArrowUpRight = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const LeafIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2z"/>
    <path d="M11 20v-5a4 4 0 0 1 4-4h5"/>
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

/* ── Badge ── */
const Badge = ({ label, type = "dark" }) => (
  <span className="env-badge" style={{
    background: type === "gold" ? "rgba(0,0,0,0.15)" : "rgba(255,183,3,0.12)",
    color: type === "gold" ? "#111" : "#ffb703",
    border: type !== "gold" ? "1px solid rgba(255,183,3,0.2)" : "none",
  }}>
    <StarIcon /> {label}
  </span>
);

/* ── Stats ── */
const ENV_STATS = [
  { value: "13", label: "Acre Organic Farm" },
  { value: "100%", label: "Chemical Free" },
  { value: "Zero", label: "Waste Footprint" },
  { value: "Future", label: "Greener Mission" },
];

export default function EnvironmentalistPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="env-wrapper">

      {/* ── Navigation ── */}
      <nav className="env-nav">
        <div className="env-nav-left">
          <span className="env-logo">PROF RBR</span>
        </div>
        <button className="env-nav-btn" onClick={() => navigate("/")}>
          Go Back <ArrowUpRight />
        </button>
      </nav>

      <div className="env-body">

        {/* ══════════════════════════════════════════
            HERO — Image only, no content overlay
        ══════════════════════════════════════════ */}
        <section className="env-hero">
          <div className="env-bg-text">RBR</div>
          <div className="env-hero-inner">
            
            {/* ─ Left ─ */}
            <div className="env-hero-left">
              <div className="env-eyebrow">
                <div className="eyebrow-row">
                  <span className="eyebrow-label">Role</span>
                  <span className="eyebrow-value">ENVIRONMENTALIST</span>
                </div>
                <div className="eyebrow-row">
                  <span className="eyebrow-label">Method</span>
                  <span className="eyebrow-value">ORGANIC FARMING</span>
                </div>
              </div>
              <h1 className="env-headline">
                Advocate of<br />
                <em>Sustainable</em><br />
                Living.
              </h1>
              
              <div className="env-hero-cards">
                <div className="env-hero-card dark">
                  <Badge label="Biodiversity" />
                  <p className="env-card-text">
                    Committed to preserving the natural ecosystem and promoting a future that coexists with nature.
                  </p>
                </div>
                <div className="env-hero-card gold">
                  <Badge label="Vision" type="gold" />
                  <div className="env-card-big-num">Organic</div>
                  <p className="env-card-text" style={{ color: "#444" }}>
                    Driving environmental change through 100% chemical-free practices.
                  </p>
                </div>
              </div>
            </div>

            {/* ─ Right ─ */}
            <div className="env-hero-right">
              <div className="env-hero-img-wrap">
                <img
                  src={heroPerson}
                  alt="Prof. Ravindrababu Ravula – Environmentalist"
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                />
                <div className="env-hero-img-overlay">
                  <p className="env-img-tagline">Nature &<br />Sustainability</p>
                  <div className="env-stat-badge">
                    <div className="env-stat-num">13+</div>
                    <div className="env-stat-lbl">Acre<br />Organic Farm</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── Ticker Strip ── */}
        <div className="env-ticker-strip">
          <div className="env-ticker-inner">
            {["Organic Farming", "Sustainable Living", "Waste Management", "Biodiversity", "Ecological Balance", "Green Future", "Organic Farming", "Sustainable Living", "Waste Management", "Biodiversity", "Ecological Balance", "Green Future"].map((t, i) => (
              <span key={i} className="env-ticker-item">
                <LeafIcon /> {t}
              </span>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECTION 1 — INTRODUCTION
        ══════════════════════════════════════════ */}
        <section className="env-section">
          <div className="env-container">
            <div className="env-full-heading">
              <p className="sec-label">Overview</p>
              <h2 className="panel-h2">
                Prof. Ravindrababu Ravula –{" "}
                <em style={{ fontStyle: "normal", color: "#ffb703" }}>Environmentalist</em>{" "}
                and Advocate of Sustainable Living
              </h2>
            </div>
            <div className="env-intro-single">
              <p className="panel-p">
                In an era where environmental sustainability has become one of the most important global challenges, individuals who take conscious steps to protect nature play a crucial role in shaping a healthier future for the planet. Environmental responsibility is not only about policies and regulations; it is also about personal choices, sustainable practices, and the willingness to live in harmony with nature.
              </p>
              <p className="panel-p">
                Prof. Ravindrababu Ravula, widely known for his contributions as an educator, entrepreneur, and mentor, is also deeply committed to environmental sustainability. Beyond his professional achievements, he believes that protecting nature and promoting sustainable living are essential responsibilities for every individual.
              </p>
              <p className="panel-p" style={{ marginBottom: 0 }}>
                Through his commitment to organic farming, responsible land management, and sustainable waste practices, he actively demonstrates how modern living can coexist with environmental responsibility.
              </p>
            </div>
          </div>
        </section>

        <div className="env-divider" />

        {/* ══════════════════════════════════════════
            SECTION 2 — A DEEP RESPECT FOR NATURE
        ══════════════════════════════════════════ */}
        <section className="env-section env-section-alt">
          <div className="env-container">
            <div className="env-full-heading">
              <p className="sec-label">A Way of Life</p>
              <h2 className="panel-h2">A Deep Respect for Nature</h2>
            </div>
            <div className="env-panel-inner">
              <div className="env-panel-left">
                <p className="panel-p">
                  For Prof. Ravindrababu Ravula, environmental sustainability is not merely an abstract idea—it is a way of life. He strongly believes that the future of humanity depends on how responsibly we treat the natural resources that sustain us.
                </p>
                <p className="panel-p">
                  Rapid urbanization, excessive use of chemicals in agriculture, and poor waste management practices have created significant environmental challenges. These issues not only harm ecosystems but also affect the quality of food, water, and air that people depend on every day.
                </p>
                <p className="panel-p" style={{ marginBottom: 0 }}>
                  Motivated by a desire to contribute positively to the environment, Prof. Ravindrababu Ravula has embraced sustainable agricultural practices and eco-friendly land management.
                </p>
              </div>
              <div className="env-panel-right">
                <div className="env-gold-card">
                  <Badge label="Philosophy" type="gold" />
                  <h3 className="env-gold-h3" style={{ marginTop: 20 }}>Environmental Awareness</h3>
                  <p className="env-gold-p">
                    His belief that every individual has a responsibility to protect nature goes beyond philosophy — it is reflected in his daily choices and agricultural practices on his 13-acre farm.
                  </p>
                  <div className="env-tag-row" style={{ marginTop: 24 }}>
                    {["Organic Living", "Eco-Conscious", "Responsible Land Use"].map(t => (
                      <span key={t} className="env-tag-dark">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="env-divider" />

        {/* ══════════════════════════════════════════
            SECTION 3 — ORGANIC FARMING
        ══════════════════════════════════════════ */}
        <section className="env-section">
          <div className="env-container">
            <div className="env-full-heading">
              <p className="sec-label">Agricultural Vision</p>
              <h2 className="panel-h2">Organic Farming on a 13-Acre Sustainable Farm</h2>
            </div>

            <div className="env-panel-inner">
              <div className="env-panel-left">
                <p className="panel-p">
                  One of the most remarkable aspects of his environmental commitment is his 13-acre farm dedicated to organic farming.
                </p>
                <p className="panel-p">
                  On this land, he practices agriculture in a way that prioritizes natural processes and ecological balance. Unlike conventional farming methods that rely heavily on chemical fertilizers and pesticides, organic farming focuses on maintaining soil health, preserving biodiversity, and producing naturally grown crops.
                </p>
                <p className="panel-p">
                  By cultivating land through organic methods, Prof. Ravindrababu Ravula demonstrates how agriculture can be both productive and environmentally responsible.
                </p>
                <div className="env-img-card">
                  <img
                    src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=900&q=80"
                    alt="Lush green organic farm"
                  />
                </div>
              </div>
              <div className="env-panel-right">
                <div className="env-big-number-card">
                  <div className="env-big-num">13</div>
                  <div className="env-big-lbl">Acres<br />Organic Farm</div>
                </div>
                <div className="env-benefits-card">
                  <h4 className="env-benefits-title">Organic farming provides several important benefits:</h4>
                  <ul className="env-check-list">
                    <li><CheckIcon /> healthier soil through natural nutrient cycles</li>
                    <li><CheckIcon /> reduced chemical contamination of food and water</li>
                    <li><CheckIcon /> preservation of biodiversity and beneficial organisms</li>
                    <li><CheckIcon /> sustainable long-term agricultural productivity</li>
                    <li><CheckIcon /> healthier and more nutritious food production</li>
                  </ul>
                  <p className="env-benefits-note">
                    Through these practices, his farm serves as a living example of how sustainable agriculture can contribute to both environmental protection and human well-being.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="env-divider" />

        {/* ══════════════════════════════════════════
            SECTION 4 — WASTE MANAGEMENT
        ══════════════════════════════════════════ */}
        <section className="env-section env-section-alt">
          <div className="env-container">
            <div className="env-full-heading">
              <p className="sec-label">Circular Economy</p>
              <h2 className="panel-h2">Sustainable Waste Management Practices</h2>
            </div>

            <div className="env-panel-inner">
              <div className="env-panel-left">
                <div className="env-cycle-card">
                  <div className="env-cycle-icon"><LeafIcon /></div>
                  <div className="env-cycle-label">Regenerative Cycle</div>
                  <p className="env-cycle-desc">By turning organic waste into natural manure, the farm operates on a sustainable ecological cycle, where resources are continuously reused and regenerated.</p>
                </div>
                <div className="env-waste-checklist-card" style={{ marginTop: 24 }}>
                  <p className="env-waste-intro">This circular approach to waste management ensures that:</p>
                  <ul className="env-check-list">
                    <li><CheckIcon /> organic waste is recycled effectively</li>
                    <li><CheckIcon /> soil fertility is naturally improved</li>
                    <li><CheckIcon /> dependence on chemical fertilizers is reduced</li>
                    <li><CheckIcon /> environmental pollution is minimized</li>
                  </ul>
                </div>
              </div>
              <div className="env-panel-right env-align-content">
                <p className="panel-p">
                  In addition to organic farming, Prof. Ravindrababu Ravula has also implemented responsible waste management systems on his agricultural land.
                </p>
                <p className="panel-p">
                  Organic waste generated from farming activities, plant materials, and natural byproducts is carefully processed and converted into organic manure. Instead of allowing waste to accumulate or become an environmental burden, it is transformed into a valuable resource that enriches the soil.
                </p>
                <blockquote className="env-quote">
                  "By turning organic waste into natural manure, we close the loop on environmental sustainability."
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        <div className="env-divider" />

        {/* ══════════════════════════════════════════
            SECTION 5 — PROMOTING SUSTAINABLE PRACTICES
        ══════════════════════════════════════════ */}
        <section className="env-section">
          <div className="env-container">
            <div className="env-full-heading">
              <p className="sec-label">Outreach</p>
              <h2 className="panel-h2">Promoting Sustainable Agricultural Practices</h2>
            </div>
            <div className="env-panel-inner">
              <div className="env-panel-left env-align-content">
                <p className="panel-p">
                  Beyond practicing organic farming personally, Prof. Ravindrababu Ravula believes in spreading awareness about sustainable agricultural practices.
                </p>
                <p className="panel-p">
                  Many farmers today face challenges due to excessive reliance on chemical inputs and unsustainable farming methods. These practices often lead to declining soil health, reduced crop quality, and long-term environmental damage.
                </p>
                <p className="panel-p" style={{ marginBottom: 0 }}>
                  By promoting organic farming and sustainable waste management techniques, he hopes to inspire greater awareness about the importance of environmentally responsible agriculture.
                </p>
              </div>
              <div className="env-panel-right">
                <div className="env-img-card" style={{ marginBottom: 24 }}>
                  <img
                    src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80"
                    alt="Sustainable agriculture practices"
                  />
                </div>
                <div className="env-highlight-box" style={{ textAlign: "center" }}>
                  Sustainable farming not only protects the environment but also helps create healthier food systems for future generations.
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="env-divider" />

        {/* ══════════════════════════════════════════
            SECTION 6 — WAY OF LIFE
        ══════════════════════════════════════════ */}
        <section className="env-section env-section-alt">
          <div className="env-container">
            <div className="env-full-heading">
              <p className="sec-label">Philosophy</p>
              <h2 className="panel-h2">Environmental Responsibility as a Way of Life</h2>
            </div>
            <div className="env-way-of-life-grid">
              <div className="env-way-text">
                <p className="panel-p">
                  For Prof. Ravindrababu Ravula, environmental awareness extends beyond farming practices. It reflects a broader philosophy of living responsibly and respecting the natural world.
                </p>
                <p className="panel-p">
                  He believes that every individual can contribute to environmental protection by adopting small but meaningful changes such as:
                </p>
                <ul className="env-check-list" style={{ marginBottom: 32 }}>
                  <li><CheckIcon /> reducing waste</li>
                  <li><CheckIcon /> promoting sustainable farming</li>
                  <li><CheckIcon /> conserving natural resources</li>
                  <li><CheckIcon /> encouraging responsible consumption</li>
                  <li><CheckIcon /> protecting biodiversity</li>
                </ul>
                <div className="env-collective-box">
                  When these values are embraced collectively, they can create powerful positive change for the planet.
                </div>
              </div>
              <div className="env-way-image">
                <div className="env-img-card" style={{ margin: 0, height: "100%" }}>
                  <img
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=80"
                    alt="Sustainable lifestyle close to nature"
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="env-divider" />

        {/* ══════════════════════════════════════════
            SECTION 7 — BRIDGING KNOWLEDGE
        ══════════════════════════════════════════ */}
        <section className="env-section">
          <div className="env-container">
            <div className="env-full-heading">
              <p className="sec-label">Synergy</p>
              <h2 className="panel-h2">Bridging Knowledge and Sustainability</h2>
            </div>
            <div className="env-panel-inner">
              <div className="env-panel-left">
                <p className="panel-p">
                  What makes Prof. Ravindrababu Ravula's environmental efforts particularly meaningful is the way they complement his broader mission of education and empowerment.
                </p>
                <p className="panel-p">
                  As someone who has spent decades teaching and guiding students, he understands that awareness is the first step toward meaningful change. By demonstrating sustainable practices in real life, he encourages others to think more consciously about their relationship with nature.
                </p>
                <p className="panel-p" style={{ marginBottom: 0 }}>
                  His journey shows that environmental responsibility does not require large-scale initiatives alone. Individual actions, when practiced consistently, can make a significant difference.
                </p>
              </div>
              <div className="env-panel-right">
                <div className="env-consistency-card">
                  <div className="env-consistency-word">Consistency</div>
                  <div className="env-consistency-sub">The Key to Change</div>
                  <div className="env-divider" style={{ margin: "24px 0", width: "100%" }} />
                  <p className="panel-p" style={{ marginBottom: 0, color: "#bbb" }}>
                    Individual actions, when practiced consistently, can make a significant difference in shaping a greener and more responsible world.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="env-divider" />

        {/* ══════════════════════════════════════════
            SECTION 8 — INSPIRING AWARENESS
        ══════════════════════════════════════════ */}
        <section className="env-section env-section-alt">
          <div className="env-container">
            <div className="env-full-heading">
              <p className="sec-label">The Lead</p>
              <h2 className="panel-h2">Inspiring a Culture of Environmental Awareness</h2>
            </div>

            <div className="env-panel-inner">
              <div className="env-panel-left env-align-content-large">
                <p className="panel-p">
                  By combining his professional success with sustainable living practices, Prof. Ravindrababu Ravula sets an example for students, professionals, and communities.
                </p>
                <p className="panel-p">
                  His commitment to organic farming, responsible waste management, and environmental sustainability highlights an important message:
                </p>
                <div className="env-big-quote-box">
                  progress and environmental responsibility can go hand in hand.
                </div>
                <p className="panel-p" style={{ marginTop: 32, marginBottom: 0 }}>
                  Economic growth, technological innovation, and environmental protection do not have to be opposing forces. With the right mindset and practices, they can complement each other.
                </p>
              </div>
              <div className="env-panel-right">
                <div className="env-vision-card">
                  <Badge label="Vision 2026" />
                  <h3 style={{ fontFamily: "Unbounded, sans-serif", fontSize: "1.5rem", fontWeight: "400", marginTop: 24, marginBottom: 20 }}>A Vision for a Greener Future</h3>
                  <p className="panel-p">
                    Looking ahead, Prof. Ravindrababu Ravula hopes to continue promoting awareness about sustainability and responsible environmental practices.
                  </p>
                  <p className="panel-p">
                    His work in organic farming and waste management reflects a long-term vision where individuals, communities, and institutions work together to protect the environment.
                  </p>
                  <div className="env-divider-line" />
                  <p style={{ fontSize: "0.8rem", color: "#888", textTransform: "uppercase", letterSpacing: "2px", marginBottom: 16 }}>This vision emphasizes:</p>
                  <ul className="env-check-list">
                    <li><CheckIcon /> sustainable agriculture</li>
                    <li><CheckIcon /> responsible resource management</li>
                    <li><CheckIcon /> environmental education</li>
                    <li><CheckIcon /> ecological balance</li>
                  </ul>
                  <p style={{ marginTop: 24, color: "#ffb703", fontWeight: "600", fontSize: "0.95rem" }}>
                    Through these efforts, he seeks to contribute to a future where development and sustainability coexist harmoniously.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="env-divider" />

        {/* ══════════════════════════════════════════
            SECTION 9 — CONCLUSION
        ══════════════════════════════════════════ */}
        <section className="env-section" style={{ paddingBottom: "120px" }}>
          <div className="env-container">
            <div className="env-full-heading">
              <p className="sec-label">Conclusion</p>
              <h2 className="panel-h2">Sustainable Development as a Core Responsibility</h2>
            </div>

            <div className="env-panel-inner">
              <div className="env-panel-left env-align-content-small">
                <p className="panel-p">
                  Prof. Ravindrababu Ravula's journey as an environmentalist reflects his deep respect for nature and his commitment to responsible living.
                </p>
                <p className="panel-p">
                  Through his 13-acre organic farm, sustainable agricultural practices, and innovative waste management systems that convert organic waste into natural manure, he actively demonstrates how environmental sustainability can be integrated into everyday life.
                </p>
                <p className="panel-p" style={{ marginBottom: 0 }}>
                  His efforts serve as a reminder that protecting the environment is not only the responsibility of governments and institutions—it is also the responsibility of individuals who care about the future of the planet.
                </p>
              </div>
              <div className="env-panel-right">
                <div className="env-conclusion-card">
                  <Badge label="Summary" />
                  <h3 style={{ fontFamily: "Unbounded, sans-serif", fontSize: "1.5rem", fontWeight: "400", marginTop: 24, marginBottom: 20 }}>The Eco-Legacy</h3>
                  <p style={{ fontSize: "1.05rem", lineHeight: "1.8", color: "#bbb" }}>
                    By embracing sustainable living and promoting environmental awareness, Prof. Ravindrababu Ravula continues to inspire others to build a greener, healthier, and more sustainable world.
                  </p>
                  <div className="env-tag-row" style={{ marginTop: 28 }}>
                    <span className="env-tag-gold">Eco-Friendly</span>
                    <span className="env-tag-gold">Biodiversity</span>
                    <span className="env-tag-gold">Organic</span>
                  </div>
                </div>
              </div>
            </div>

            <blockquote className="env-closing-quote">
              "Sustainable living is not a choice, but a responsibility for the generations to come."
            </blockquote>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="env-footer">
          <div className="env-footer-inner">
            <div>
              <div className="env-footer-logo">PROF RBR</div>
              <p className="env-footer-tagline">
                Living in harmony with nature —<br />advocating for a cleaner, greener earth.
              </p>
            </div>
            <div className="env-footer-copy">
              © 2026 Prof. Ravindrababu Ravula. All rights reserved.
            </div>
          </div>
        </footer>
      </div>

      {/* Scroll hint */}
      <div className="env-scroll-hint" style={{ opacity: scrolled ? 0 : 1 }}>
        <div className="env-scroll-mouse" />
        <span>Scroll Down</span>
      </div>

    </div>
  );
}
