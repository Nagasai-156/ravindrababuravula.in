import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import heroPerson from "./assets/hero-person.png";
import Layout from "./components/Layout";
import YoutuberPage from "./YoutuberPage";
import EducatorPage from "./EducatorPage";
import FinancialPlannerPage from "./FinancialPlannerPage";
import SerialEntrepreneurPage from "./SerialEntrepreneurPage";
import VibeCoderPage from "./VibeCoderPage";
import CorporateTrainerPage from "./CorporateTrainerPage";
import PhilanthropistPage from "./PhilanthropistPage";
import EnvironmentalistPage from "./EnvironmentalistPage";
import InternshipPage from "./InternshipPage";
import CohortPage from "./CohortPage";
import AdminDashboard from "./AdminDashboard";
import TestimonialsPage from "./TestimonialsPage";
import MentorsPage from "./MentorsPage";
import SEO from "./components/SEO";

const ITEMS = [
  { text: "Youtuber", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=150&q=80" },
  { text: "Educator", img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=150&q=80" },
  { text: "Certified Financial Planner", img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=150&q=80" },
  { text: "Startup Coach", img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=150&q=80" },
  { text: "Serial Entrepreneur", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80" },
  { text: "Vibe Coder", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=150&q=80" },
  { text: "Corporate Trainer", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=150&q=80" },
  { text: "Philanthropist", img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=150&q=80" },
  { text: "Environmentalist", img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=150&q=80" }
];

function HomeOrbit() {
  const navigate = useNavigate();
  return (
    <div className="orbit-wrapper">
      <div className="lines-bg"></div>

      <div className="orbit-container">
        {ITEMS.map((item, i) => {
          const angle = (i * 360) / ITEMS.length;
          return (
            <div
              key={i}
              className="orbit-item"
              style={{ transform: `rotate(${angle}deg) translateY(calc(var(--orbit-radius) * -1))` }}
            >
              <div
                className="orbit-item-angle-corrector"
                style={{ transform: `rotate(${-angle}deg)` }}
              >
                <div
                  className="orbit-item-animator"
                  onClick={() => {
                    if (item.text === "Youtuber") navigate("/youtuber");
                    else if (item.text === "Educator") navigate("/educator");
                    else if (item.text === "Certified Financial Planner") navigate("/financial-planner");
                    else if (item.text === "Startup Coach") navigate("/cohort");
                    else if (item.text === "Serial Entrepreneur") navigate("/serial-entrepreneur");
                    else if (item.text === "Vibe Coder") navigate("/vibe-coder");
                    else if (item.text === "Corporate Trainer") navigate("/corporate-trainer");
                    else if (item.text === "Philanthropist") navigate("/philanthropist");
                    else if (item.text === "Environmentalist") navigate("/environmentalist");
                  }}
                >
                  <img src={item.img} alt={item.text} className="orbit-item-image" />
                  <div className="orbit-item-text">{item.text}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="orbit-center">
        <img src={heroPerson} alt="Prof. RBR" className="center-photo" />
      </div>
    </div>
  );
}


/* ── SEO data per route ── */
const PAGE_SEO = {
  "/": {
    title: null,
    description: "Official website of Prof. Ravindrababu Ravula — India's EdTech pioneer with 690K+ YouTube subscribers, 90M+ views. IISc alumnus, PhD in AI/ML & Finance. Educator, Serial Entrepreneur, Corporate Trainer.",
  },
  "/youtuber": {
    title: "Youtuber — 690K+ Subscribers & 90M+ Views",
    description: "Prof. Ravindrababu Ravula's YouTube journey — 2400+ free GATE CS lectures, 690K subscribers, 90M+ views. The first educator to start EdTech in India through YouTube.",
  },
  "/educator": {
    title: "Educator — 18+ Years of Teaching Excellence",
    description: "Prof. Ravindrababu Ravula, IISc alumnus and PhD in AI/ML, has redefined CS education in India. 18+ years of teaching, from classrooms to digital scale. Known as the 'God of CS' by students.",
  },
  "/financial-planner": {
    title: "Certified Financial Planner — ARN-354459",
    description: "Prof. Ravindrababu Ravula as a Certified Financial Planner. PhD in Finance & AI/ML. Helping individuals make informed investment decisions with data-driven strategies.",
  },
  "/serial-entrepreneur": {
    title: "Serial Entrepreneur — Raudra Technologies, Raudra Labs, MetaBrix Labs",
    description: "Prof. Ravindrababu Ravula's entrepreneurial journey. Founder of Raudra Technologies, Raudra Labs, MetaBrix Labs. Building the future across multiple industries.",
  },
  "/vibe-coder": {
    title: "Vibe Coder — Building with AI & Code",
    description: "Prof. Ravindrababu Ravula as a Vibe Coder. Exploring the intersection of AI, coding, and creativity. Building innovative solutions with modern technology.",
  },
  "/corporate-trainer": {
    title: "Corporate Trainer — 100+ Companies Trained",
    description: "Prof. Ravindrababu Ravula has trained 100+ companies in Computer Science, AI/ML, and technology. Empowering modern workforces with industry-relevant skills.",
  },
  "/philanthropist": {
    title: "Philanthropist — Raudra Charitable Trust",
    description: "Prof. Ravindrababu Ravula's philanthropic work through Raudra Charitable Trust. Compassion beyond classrooms — making education accessible to all.",
  },
  "/environmentalist": {
    title: "Environmentalist — Sustainability & Green Initiatives",
    description: "Prof. Ravindrababu Ravula's commitment to environmental sustainability. Tree planting drives, green initiatives, and raising awareness for a better planet.",
  },
  "/internship": {
    title: "Apply for Internship — Work with Prof. RBR's Team",
    description: "Join Prof. Ravindrababu Ravula's team as an intern. Work on real projects in EdTech, AI/ML, and technology. Apply now for hands-on learning experience.",
  },
  "/cohort": {
    title: "Startup Coach — For Startups & Entrepreneurs",
    description: "Prof. Ravindrababu Ravula as a Startup Coach. Guidance for aspiring entrepreneurs, startup strategy, fundraising, and building scalable businesses.",
  },
  "/testimonials": {
    title: "Testimonials — 109+ GATE Toppers Success Stories | AIR 2, AIR 3, AIR 5",
    description: "Real success stories from 109+ GATE CS toppers trained by Prof. Ravindrababu Ravula. AIR 2 Jay Bansal, AIR 3 Prateek Agarwal, AIR 5 Timojit Chatterjee. From single-digit ranks to IISc, IIT Bombay, IIT Kanpur, Google. Read how students cracked GATE with RBR Sir's lectures.",
    schema: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "GATE Topper Testimonials",
      "description": "Success stories from 109+ GATE toppers trained by Prof. Ravindrababu Ravula",
      "numberOfItems": 109,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Jay Bansal — AIR 2, GATE CS 2019" },
        { "@type": "ListItem", "position": 2, "name": "Prateek Agarwal — AIR 3, GATE CS 2019" },
        { "@type": "ListItem", "position": 3, "name": "Timojit Chatterjee — AIR 5, GATE 2015" },
      ],
    },
  },
  "/mentors": {
    title: "1:1 GATE Mentorship — IIT Bombay, IISc, DRDO, PayPal, NVIDIA, Amazon Mentors",
    description: "Book 1:1 GATE CSE & DA mentorship with 30+ expert mentors. IIT Bombay MTech, IISc Bangalore, DRDO Scientist, PayPal ML Engineer, NVIDIA Engineer, Amazon SDE. Personalized GATE preparation strategy, interview prep, PSU guidance, career counseling. Join Prof. Ravindrababu Ravula's mentor network.",
    schema: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Expert Mentors for GATE & Career Guidance",
      "description": "1:1 mentorship from IIT, IISc, DRDO, FAANG professionals",
      "numberOfItems": 30,
    },
  },
};

/* ── 404 Page ── */
function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "160px 20px 100px", color: "#fff", fontFamily: "'Unbounded', sans-serif" }}>
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist." path="/404" />
      <h1 style={{ fontSize: "clamp(4rem, 10vw, 8rem)", fontWeight: 200, color: "#ffb703", margin: 0 }}>404</h1>
      <p style={{ color: "#666", fontSize: "1rem", marginTop: 16, fontFamily: "Inter, sans-serif" }}>This page doesn't exist.</p>
      <a href="/" style={{ display: "inline-block", marginTop: 24, padding: "10px 24px", borderRadius: 999, background: "#ffb703", color: "#111", fontFamily: "Inter, sans-serif", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}>Go Home</a>
    </div>
  );
}

/* ── Route with SEO wrapper ── */
function PageWithSEO({ path, children }) {
  const seo = PAGE_SEO[path] || {};
  return (
    <>
      <SEO title={seo.title} description={seo.description} path={path} schema={seo.schema} />
      {children}
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><PageWithSEO path="/"><HomeOrbit /></PageWithSEO></Layout>} />
      <Route path="/youtuber" element={<Layout><PageWithSEO path="/youtuber"><YoutuberPage /></PageWithSEO></Layout>} />
      <Route path="/educator" element={<Layout><PageWithSEO path="/educator"><EducatorPage /></PageWithSEO></Layout>} />
      <Route path="/financial-planner" element={<Layout><PageWithSEO path="/financial-planner"><FinancialPlannerPage /></PageWithSEO></Layout>} />
      <Route path="/serial-entrepreneur" element={<Layout><PageWithSEO path="/serial-entrepreneur"><SerialEntrepreneurPage /></PageWithSEO></Layout>} />
      <Route path="/vibe-coder" element={<Layout><PageWithSEO path="/vibe-coder"><VibeCoderPage /></PageWithSEO></Layout>} />
      <Route path="/corporate-trainer" element={<Layout><PageWithSEO path="/corporate-trainer"><CorporateTrainerPage /></PageWithSEO></Layout>} />
      <Route path="/philanthropist" element={<Layout><PageWithSEO path="/philanthropist"><PhilanthropistPage /></PageWithSEO></Layout>} />
      <Route path="/environmentalist" element={<Layout><PageWithSEO path="/environmentalist"><EnvironmentalistPage /></PageWithSEO></Layout>} />
      <Route path="/internship" element={<Layout><PageWithSEO path="/internship"><InternshipPage /></PageWithSEO></Layout>} />
      <Route path="/cohort" element={<Layout><PageWithSEO path="/cohort"><CohortPage /></PageWithSEO></Layout>} />
      <Route path="/testimonials" element={<Layout><PageWithSEO path="/testimonials"><TestimonialsPage /></PageWithSEO></Layout>} />
      <Route path="/mentors" element={<Layout><PageWithSEO path="/mentors"><MentorsPage /></PageWithSEO></Layout>} />
      <Route path="/responses-portal" element={<Layout><AdminDashboard /></Layout>} />
      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </Routes>
  );
}
