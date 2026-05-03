import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoImg from "../assets/logo.png";
import "./Navbar.css";

const ROLES = [
  { label: "Youtuber", path: "/youtuber" },
  { label: "Educator", path: "/educator" },
  { label: "Financial Planner", path: "/financial-planner" },
  { label: "Startup Coach", path: "/cohort" },
  { label: "Serial Entrepreneur", path: "/serial-entrepreneur" },
  { label: "Vibe Coder", path: "/vibe-coder" },
  { label: "Corporate Trainer", path: "/corporate-trainer" },
  { label: "Philanthropist", path: "/philanthropist" },
  { label: "Environmentalist", path: "/environmentalist" },
];

const BREADCRUMB_MAP = {
  "/youtuber": "Youtuber",
  "/educator": "Educator",
  "/financial-planner": "Financial Planner",
  "/serial-entrepreneur": "Serial Entrepreneur",
  "/vibe-coder": "Vibe Coder",
  "/corporate-trainer": "Corporate Trainer",
  "/philanthropist": "Philanthropist",
  "/environmentalist": "Environmentalist",
  "/internship": "Internship",
  "/cohort": "Startup Coach",
  "/responses-portal": "Admin Dashboard",
  "/testimonials": "Testimonials",
  "/mentors": "Mentors",
  "/courses": "Courses",
  "/forum": "Forum",
  "/blog": "Blog",
};

/* Icons */
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const isHome = location.pathname === "/";
  const currentPage = BREADCRUMB_MAP[location.pathname];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    setSearchOpen(false);
    setSearchQuery("");
  }, [location.pathname]);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filteredRoles = searchQuery
    ? ROLES.filter((r) => r.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : ROLES;

  return (
    <>
      <nav className={`global-nav ${scrolled ? "nav-scrolled" : ""} ${isHome ? "nav-home" : ""}`}>
        <div className="nav-inner">
          {/* Left: Logo */}
          <div className="nav-left">
            <img
              src={logoImg}
              alt="RBR Logo"
              className="nav-logo"
              onClick={() => navigate("/")}
            />

            {/* Roles Dropdown */}
            <div className="nav-dropdown-wrap" ref={dropdownRef}>
              <button
                className={`nav-dropdown-trigger ${dropdownOpen ? "open" : ""}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span>Explore Roles</span>
                <ChevronDown />
              </button>
              {dropdownOpen && (
                <div className="nav-dropdown-menu">
                  {ROLES.map((role) => (
                    <button
                      key={role.path}
                      className={`nav-dropdown-item ${location.pathname === role.path ? "active" : ""}`}
                      onClick={() => {
                        navigate(role.path);
                        setDropdownOpen(false);
                      }}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center: Nav Links (desktop) */}
          <div className="nav-center">
            <button
              className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
              onClick={() => navigate("/")}
            >
              Home
            </button>
            <button
              className={`nav-link ${location.pathname === "/courses" ? "active" : ""}`}
              onClick={() => navigate("/courses")}
            >
              Courses
            </button>
            <button
              className={`nav-link ${location.pathname === "/testimonials" ? "active" : ""}`}
              onClick={() => navigate("/testimonials")}
            >
              Testimonials
            </button>
            <button
              className={`nav-link ${location.pathname === "/mentors" ? "active" : ""}`}
              onClick={() => navigate("/mentors")}
            >
              Mentors
            </button>
            <button
              className="nav-link"
              onClick={() => window.open("https://forum.ravindrababuravula.in", "_blank")}
            >
              Forum
            </button>
            <button
              className="nav-link"
              onClick={() => navigate("/blog")}
            >
              Blog
            </button>
            <button
              className="nav-link"
              onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSdeMUhwbSLSC5jDTTQas6lypd_XkAAMPkuC7MEYqC7dZhrNGQ/viewform?usp=publish-editor", "_blank")}
            >
              Apply for Internship
            </button>
            <button
              className="nav-link"
              onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSdoK0hxfcyeqVAsTpzgrCn0qbhVTqOPwknAhC0b6bfc3V6xJQ/viewform?usp=publish-editor", "_blank")}
            >
              For Startups
            </button>
          </div>

          {/* Right: Search + CTA + Mobile */}
          <div className="nav-right">
            {/* Your Purchases */}
            <button
              className="nav-purchases-btn"
              onClick={() => window.open("https://courses.ravindrababuravula.in/purchases?type=10", "_blank")}
            >
              Your Purchases
            </button>
            {/* Search */}
            <div className="nav-search-wrap" ref={searchRef}>
              <button
                className="nav-icon-btn"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
              >
                <SearchIcon />
              </button>
              {searchOpen && (
                <div className="nav-search-dropdown">
                  <input
                    type="text"
                    placeholder="Search roles, pages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <div className="nav-search-results">
                    {filteredRoles.length > 0 ? (
                      filteredRoles.map((role) => (
                        <button
                          key={role.path}
                          className="nav-search-item"
                          onClick={() => {
                            navigate(role.path);
                            setSearchOpen(false);
                            setSearchQuery("");
                          }}
                        >
                          {role.label}
                        </button>
                      ))
                    ) : (
                      <div className="nav-search-empty">No results found</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Top Banner for WhatsApp (Moved Below Nav) */}
        <div className="nav-top-banner">
          <a href="https://wa.me/919701119856" target="_blank" rel="noopener noreferrer" className="nav-whatsapp-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.29 5.29 0 0 0-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            <span>WhatsApp Us: +91-97011 19856</span>
          </a>
        </div>

        {/* Breadcrumb bar */}
        {!isHome && currentPage && (
          <div className="nav-breadcrumb">
            <div className="nav-breadcrumb-inner">
              <button className="breadcrumb-link" onClick={() => navigate("/")}>
                <HomeIcon />
                <span>Home</span>
              </button>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-current">{currentPage}</span>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Slide Menu */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? "open" : ""}`} onClick={() => setMobileMenuOpen(false)} />
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-header">
          <img src={logoImg} alt="Logo" className="mobile-menu-logo" />
          <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>
            <CloseIcon />
          </button>
        </div>

        <div className="mobile-menu-search">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="mobile-menu-section">
          <div className="mobile-menu-label">Pages</div>
          <button
            className={`mobile-menu-item ${location.pathname === "/" ? "active" : ""}`}
            onClick={() => { navigate("/"); setMobileMenuOpen(false); }}
          >
            Home
          </button>
          <button
            className={`mobile-menu-item ${location.pathname === "/courses" ? "active" : ""}`}
            onClick={() => { navigate("/courses"); setMobileMenuOpen(false); }}
          >
            Courses
          </button>
          <button
            className={`mobile-menu-item ${location.pathname === "/testimonials" ? "active" : ""}`}
            onClick={() => { navigate("/testimonials"); setMobileMenuOpen(false); }}
          >
            Testimonials
          </button>
          <button
            className={`mobile-menu-item ${location.pathname === "/mentors" ? "active" : ""}`}
            onClick={() => { navigate("/mentors"); setMobileMenuOpen(false); }}
          >
            Mentors
          </button>
          <button
            className="mobile-menu-item"
            onClick={() => { window.open("https://forum.ravindrababuravula.in", "_blank"); setMobileMenuOpen(false); }}
          >
            Forum
          </button>
          <button
            className={`mobile-menu-item ${location.pathname.startsWith("/blog") ? "active" : ""}`}
            onClick={() => { navigate("/blog"); setMobileMenuOpen(false); }}
          >
            Blog
          </button>
          <button
            className="mobile-menu-item"
            onClick={() => { window.open("https://docs.google.com/forms/d/e/1FAIpQLSdeMUhwbSLSC5jDTTQas6lypd_XkAAMPkuC7MEYqC7dZhrNGQ/viewform?usp=publish-editor", "_blank"); setMobileMenuOpen(false); }}
          >
            Apply for Internship
          </button>
          <button
            className="mobile-menu-item"
            onClick={() => { window.open("https://docs.google.com/forms/d/e/1FAIpQLSdoK0hxfcyeqVAsTpzgrCn0qbhVTqOPwknAhC0b6bfc3V6xJQ/viewform?usp=publish-editor", "_blank"); setMobileMenuOpen(false); }}
          >
            For Startups
          </button>
          <button
            className="mobile-menu-item mobile-purchases-btn"
            onClick={() => { window.open("https://courses.ravindrababuravula.in/purchases?type=10", "_blank"); setMobileMenuOpen(false); }}
          >
            Your Purchases
          </button>
        </div>

        <div className="mobile-menu-section">
          <div className="mobile-menu-label">Roles</div>
          {(searchQuery
            ? ROLES.filter((r) => r.label.toLowerCase().includes(searchQuery.toLowerCase()))
            : ROLES
          ).map((role) => (
            <button
              key={role.path}
              className={`mobile-menu-item ${location.pathname === role.path ? "active" : ""}`}
              onClick={() => {
                navigate(role.path);
                setMobileMenuOpen(false);
              }}
            >
              {role.label}
            </button>
          ))}
        </div>

        <div className="mobile-menu-cta">
          <button
            className="nav-cta-btn primary full-width"
            onClick={() => {
              window.open("https://docs.google.com/forms/d/e/1FAIpQLSdeMUhwbSLSC5jDTTQas6lypd_XkAAMPkuC7MEYqC7dZhrNGQ/viewform?usp=publish-editor", "_blank");
              setMobileMenuOpen(false);
            }}
          >
            Apply for Internship
          </button>
          <button
            className="nav-cta-btn secondary full-width"
            onClick={() => {
              window.open("https://docs.google.com/forms/d/e/1FAIpQLSdoK0hxfcyeqVAsTpzgrCn0qbhVTqOPwknAhC0b6bfc3V6xJQ/viewform?usp=publish-editor", "_blank");
              setMobileMenuOpen(false);
            }}
          >
            For Startups
          </button>
        </div>
      </div>
    </>
  );
}
