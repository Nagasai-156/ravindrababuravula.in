import React, { useState, useEffect } from "react";
import "./App.css";
import logoImg from "./assets/logo.png";
import heroPerson from "./assets/hero-person.png";
import MainSections from "./sections/MainSections";

// ----------------- SVGs -----------------

const ArrowUpRight = ({ width = "18", height = "18" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

const AnimatedText = ({ text, delayOffset = 0 }) => {
  return text.split(" ").map((word, index) => (
    <span key={index} style={{ display: "inline-block", whiteSpace: "pre" }}>
      <span
        className="animate-word"
        style={{
          display: "inline-block",
          animationDelay: `${delayOffset + index * 0.1}s`,
        }}
      >
        {word}
      </span>
      {index < text.split(" ").length - 1 ? " " : ""}
    </span>
  ));
};

function HeroSite() {
  return (
    <>
      <div className="hero-wrapper">
        <div className="hero-container">
          {/* Header Navigation */}
          <header className="hero-header">
            <div className="logo-area">
              <img
                src={logoImg}
                alt="Logo"
                className="logo-icon"
                style={{ height: "36px", width: "auto" }}
              />
            </div>

            <ul className="nav-links">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Courses</a>
              </li>
              <li>
                <a href="#">Shop</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>

            <div className="header-actions">
              <button className="btn-login">Login</button>
              <button className="btn-circle dark">
                <ArrowUpRight width="20" height="20" />
              </button>
            </div>
          </header>

          {/* Hero Top Content */}
          <main className="hero-main">
            <div
              className="hero-pill-badge animate-item"
              style={{ animationDelay: "0s" }}
            >
              #1 E-Learning Platform 2025
            </div>
            <h1
              className="hero-title"
              style={{ maxWidth: "900px", lineHeight: "1.2" }}
            >
              <AnimatedText
                text="Learn Computer Science with"
                delayOffset={0.2}
              />
              <br />
              <AnimatedText
                text="Prof. RavindraBabu Ravula"
                delayOffset={0.6}
              />
            </h1>
            <p
              className="hero-subtitle animate-item"
              style={{
                maxWidth: "800px",
                fontSize: "1.2rem",
                animationDelay: "1.0s",
              }}
            >
              Most practical, Easiest and Structured way to learn everything
              related to Computer Science from scratch. No prior knowledge is
              needed.
            </p>

            <div
              className="hero-cta animate-item"
              style={{ animationDelay: "1.2s" }}
            >
              <button className="btn-enroll">Get started</button>
              <button className="btn-circle-yellow">
                <ArrowUpRight width="22" height="22" stroke="#000" />
              </button>
            </div>
          </main>
        </div>

        {/* Hero Bottom Stage with Image and Widgets */}
        <div className="hero-bottom-stage">
          <div className="bottom-stage-content">
            {/* Left Column Widgets */}
            <div className="stage-left">
              <div className="widget-quote">
                <div className="quote-icon">“</div>
                <p>
                  From AI-enhanced lessons to real-world projects, our platform
                  empowers you to learn.
                </p>
              </div>
              <div className="widget-stats">
                <h2>5000+</h2>
                <p>Top Notch Courses</p>
              </div>
            </div>

            {/* Center Column Image & Icons */}
            <div className="stage-center">
              <div
                className="animate-image-up"
                style={{ animationDelay: "1.4s" }}
              >
                <img
                  src={heroPerson}
                  alt="Prof. RavindraBabu Ravula"
                  className="hero-person-img"
                />
              </div>
            </div>

            {/* Right Column Widgets */}
            <div className="stage-right">
              <div className="widget-review">
                <div className="stars">★★★★★</div>
                <p>
                  "Modern, sleek, and focused on real skills. I loved the
                  hands-on projects and their system"
                </p>
                <div className="reviewer">
                  <div className="reviewer-avatar-placeholder">JK</div>
                  <div className="reviewer-info">
                    <h4>Jason Kim</h4>
                    <span>UX Designer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MainSections />
    </>
  );
}

export default function App() {
  return <HeroSite />;
}
