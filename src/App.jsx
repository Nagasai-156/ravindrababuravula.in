import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import heroPerson from "./assets/hero-person.png";
import logoImg from "./assets/logo.png";
import YoutuberPage from "./YoutuberPage";
import EducatorPage from "./EducatorPage";
import FinancialPlannerPage from "./FinancialPlannerPage";
import FitnessTrainerPage from "./FitnessTrainerPage";
import SerialEntrepreneurPage from "./SerialEntrepreneurPage";

const ITEMS = [
  { text: "Youtuber", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=150&q=80" },
  { text: "Educator", img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=150&q=80" },
  { text: "Certified Financial Planner", img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=150&q=80" },
  { text: "Fitness Trainer", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=150&q=80" },
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
      <img src={logoImg} alt="Logo" className="top-logo" />
      
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
                    if (item.text === "Youtuber") {
                      navigate("/youtuber");
                    } else if (item.text === "Educator") {
                      navigate("/educator");
                    } else if (item.text === "Certified Financial Planner") {
                      navigate("/financial-planner");
                    } else if (item.text === "Fitness Trainer") {
                      navigate("/fitness-trainer");
                    } else if (item.text === "Serial Entrepreneur") {
                      navigate("/serial-entrepreneur");
                    }
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
      <Route path="/" element={<HomeOrbit />} />
      <Route path="/youtuber" element={<YoutuberPage />} />
      <Route path="/educator" element={<EducatorPage />} />
      <Route path="/financial-planner" element={<FinancialPlannerPage />} />
      <Route path="/fitness-trainer" element={<FitnessTrainerPage />} />
      <Route path="/serial-entrepreneur" element={<SerialEntrepreneurPage />} />
    </Routes>
  );
}
