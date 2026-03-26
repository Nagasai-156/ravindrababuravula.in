import React from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/logo.png";
import "./Footer.css";

const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const FOOTER_LINKS = {
  explore: [
    { label: "Youtuber", path: "/youtuber" },
    { label: "Educator", path: "/educator" },
    { label: "Financial Planner", path: "/financial-planner" },
    { label: "Serial Entrepreneur", path: "/serial-entrepreneur" },
    { label: "Corporate Trainer", path: "/corporate-trainer" },
  ],
  more: [
    { label: "Vibe Coder", path: "/vibe-coder" },
    { label: "Philanthropist", path: "/philanthropist" },
    { label: "Environmentalist", path: "/environmentalist" },
    { label: "Startup Coach", path: "/cohort" },
    { label: "Internship", path: "/internship" },
  ],
};

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="global-footer">
      <div className="footer-main">
        <div className="footer-grid">
          {/* Left: Brand */}
          <div className="footer-brand">
            <img src={logoImg} alt="RBR Logo" className="footer-logo-img" />
            <h3 className="footer-brand-name">Prof. Ravindrababu Ravula</h3>
            <p className="footer-brand-tagline">
              Transforming the way India learns — one lecture at a time. Educator, entrepreneur, and visionary.
            </p>
            <a
              href="https://www.youtube.com/@ravindrababu_ravula"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-yt-btn"
            >
              <YoutubeIcon />
              <span>Subscribe on YouTube</span>
            </a>
          </div>

          {/* Links */}
          <div className="footer-links-group">
            <div className="footer-col">
              <h4 className="footer-col-title">Explore</h4>
              {FOOTER_LINKS.explore.map((link) => (
                <button
                  key={link.path}
                  className="footer-link"
                  onClick={() => navigate(link.path)}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">More</h4>
              {FOOTER_LINKS.more.map((link) => (
                <button
                  key={link.path}
                  className="footer-link"
                  onClick={() => navigate(link.path)}
                >
                  {link.label}
                </button>
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>&copy; 2026 Prof. Ravindrababu Ravula. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <span className="footer-dot"></span>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
