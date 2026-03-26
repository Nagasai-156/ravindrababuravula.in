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


export default function App() {
  return (
    <Routes>
        <Route path="/" element={<Layout><HomeOrbit /></Layout>} />
        <Route path="/youtuber" element={<Layout><YoutuberPage /></Layout>} />
        <Route path="/educator" element={<Layout><EducatorPage /></Layout>} />
        <Route path="/financial-planner" element={<Layout><FinancialPlannerPage /></Layout>} />
        <Route path="/serial-entrepreneur" element={<Layout><SerialEntrepreneurPage /></Layout>} />
        <Route path="/vibe-coder" element={<Layout><VibeCoderPage /></Layout>} />
        <Route path="/corporate-trainer" element={<Layout><CorporateTrainerPage /></Layout>} />
        <Route path="/philanthropist" element={<Layout><PhilanthropistPage /></Layout>} />
        <Route path="/environmentalist" element={<Layout><EnvironmentalistPage /></Layout>} />
        <Route path="/internship" element={<Layout><InternshipPage /></Layout>} />
        <Route path="/cohort" element={<Layout><CohortPage /></Layout>} />
        <Route path="/responses-portal" element={<Layout><AdminDashboard /></Layout>} />
      </Routes>
  );
}
