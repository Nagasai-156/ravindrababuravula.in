import React, { useEffect, useRef } from "react";
import "./TeamPage.css";

import mubeenImg from "./assets/team/mubeen.jpg";
import rbrImg from "./assets/team/rbr.jpg";
import chitraImg from "./assets/team/chitra.jpeg";
import kaushalyaImg from "./assets/team/kaushalya.jpg";
import gauravImg from "./assets/team/gaurav.jpg";
import tilakImg from "./assets/team/tilak.jpg";
import avinashImg from "./assets/team/avinash.jpg";
import abhishekImg from "./assets/team/abhishek.jpg";
import swathiImg from "./assets/team/swathi.jpg";
import nagasaiImg from "./assets/team/nagasai.jpg";
import nagasai1Img from "./assets/team/nagasai1.jpg";
import yashdeepImg from "./assets/team/yashdeep.jpg";
import saivenkatImg from "./assets/team/saivenkat.jpg";
import chiranjeevImg from "./assets/team/chiranjeev.jpg";
import cifalImg from "./assets/team/cifal.jpg";
import divyImg from "./assets/team/divy.jpg";
import preetamImg from "./assets/team/preetam.jpg";
import vinaykumarImg from "./assets/team/vinaykumar.jpg";
import krishnaImg from "./assets/team/krishna.jpg";
import chaitranImg from "./assets/team/chaitran.jpg";
import vanishaImg from "./assets/team/vanisha.jpg";
import vasudhaImg from "./assets/team/vasudha.jpg";
import saitejaImg from "./assets/team/saiteja.jpg";
import gnanaImg from "./assets/team/gnana.jpg";
import rajendraImg from "./assets/team/rajendra.jpg";
import sudarshanImg from "./assets/team/sudarshan.jpg";
import janhaviImg from "./assets/team/janhavi.jpg";
import ishaImg from "./assets/team/isha.jpg";
import govindImg from "./assets/team/govind.jpg";
import guruvardhanImg from "./assets/team/guruvardhan.jpg";
import vallideviImg from "./assets/team/vallidevi.jpg";
import shahadalamImg from "./assets/team/shahadalam.jpg";

/* ── Featured leadership (hero card) ── */
const CEO = {
  initials: "M",
  name: "Mubeen",
  role: "CEO, Raudra Group of Companies",
  badge: "CEO",
  img: mubeenImg,
  linkedin: null,
};

/* initials fallback for members with no photo yet */
const ini = (name) =>
  name.replace(/^Prof\.?\s+/i, "").split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

/* ── The rest of the team (ids auto-numbered) ── */
const RAW_MEMBERS = [
  // Leadership row (alongside CTO)
  { layer: "lead", name: "Nagasai Chimmili", role: "Chief Technology Officer", img: nagasaiImg,  linkedin: "https://www.linkedin.com/in/nagasai-chimmili/" },
  { layer: "lead", name: "Yashdeep",         role: "Chief Marketing Officer",  img: yashdeepImg, linkedin: null },

  // Educators
  { layer: "educators", name: "Prof. Ravindrababu Ravula", role: "Director, Educator & AI Generalist", img: rbrImg, linkedin: "https://www.linkedin.com/in/ravindrababu-ravula/" },
  { layer: "educators", name: "Chitra",                    role: "Educator & AI Generalist", img: chitraImg,    linkedin: null },
  { layer: "educators", name: "Kaushalya",                 role: "UGC NET Educator",         img: kaushalyaImg, linkedin: null },
  { layer: "educators", name: "Vallidevi",                 role: "UGC NET Educator",         img: vallideviImg, linkedin: null },

  // Mentors (guide students through GATE)
  { layer: "mentors", name: "Sai Venkat Eluru", role: "Mentor", img: saivenkatImg,  linkedin: null },
  { layer: "mentors", name: "Chiranjeev Patel", role: "Mentor", img: chiranjeevImg, linkedin: null },
  { layer: "mentors", name: "Cifal Shaul",      role: "Mentor", img: cifalImg,      linkedin: null },
  { layer: "mentors", name: "Shahjad Alam",     role: "Mentor", img: shahadalamImg, linkedin: null },

  // Subject Matter Experts
  { layer: "sme", name: "Gaurav",         role: "Subject Matter Expert", img: gauravImg,     linkedin: "https://www.linkedin.com/in/connectgaurav/" },
  { layer: "sme", name: "Tilak",          role: "Subject Matter Expert", img: tilakImg,      linkedin: "https://www.linkedin.com/in/tilak-akasapu-42581b288/" },
  { layer: "sme", name: "Avnish",         role: "Subject Matter Expert", img: avinashImg,    linkedin: "https://www.linkedin.com/in/avnish-tripathi-4559a5196/" },
  { layer: "sme", name: "Abhishek",       role: "Subject Matter Expert", img: abhishekImg,   linkedin: "https://www.linkedin.com/in/abhishek-sharma-iisc/" },
  { layer: "sme", name: "Divy Dodrajka",  role: "Subject Matter Expert", img: divyImg,       linkedin: null },
  { layer: "sme", name: "Sai Teja",       role: "Subject Matter Expert", img: saitejaImg,    linkedin: null },
  { layer: "sme", name: "Gnana",          role: "Subject Matter Expert", img: gnanaImg,      linkedin: null },
  { layer: "sme", name: "Rajendra",       role: "Subject Matter Expert", img: rajendraImg,   linkedin: null },
  { layer: "sme", name: "Sudarshan",      role: "Subject Matter Expert", img: sudarshanImg,  linkedin: null },
  { layer: "sme", name: "Issac Preetham", role: "Subject Matter Expert", img: preetamImg,    linkedin: null },
  { layer: "sme", name: "Vinay Kumar",    role: "Subject Matter Expert", img: vinaykumarImg, linkedin: null },
  { layer: "sme", name: "Naga Sai",       role: "Subject Matter Expert", img: nagasai1Img,   linkedin: null },
  { layer: "sme", name: "Krishna",        role: "Subject Matter Expert", img: krishnaImg,    linkedin: null },
  { layer: "sme", name: "Chaitran",       role: "Subject Matter Expert", img: chaitranImg,   linkedin: null },
  { layer: "sme", name: "Janhavi Naik",   role: "Subject Matter Expert", img: janhaviImg,    linkedin: null },
  { layer: "sme", name: "Isha Kule",      role: "Subject Matter Expert", img: ishaImg,       linkedin: null },
  { layer: "sme", name: "Govind Narayan", role: "Subject Matter Expert", img: govindImg,     linkedin: null },
  { layer: "sme", name: "Guruvardhan",    role: "Subject Matter Expert", img: guruvardhanImg, linkedin: null },

  // Student Relationship Managers
  { layer: "srm", name: "Swathi",  role: "Student Relationship Manager", img: swathiImg,  linkedin: null },
  { layer: "srm", name: "Vanisha", role: "Student Relationship Manager", img: vanishaImg, linkedin: null },
  { layer: "srm", name: "Vasudha", role: "Student Relationship Manager", img: vasudhaImg, linkedin: null },
];

const MEMBERS = RAW_MEMBERS.map((m, i) => ({
  ...m,
  id: String(i + 2).padStart(2, "0"),
  initials: ini(m.name),
}));

/* Ordered role layers — Educators, then Mentors (rest order good) */
const LAYERS = [
  { key: "lead",      title: "Leadership",                    subtitle: "Technology & Marketing" },
  { key: "educators", title: "Educators",                     subtitle: "AI Generalists & UGC NET" },
  { key: "mentors",   title: "Mentors",                       subtitle: "Guiding students through GATE" },
  { key: "sme",       title: "Subject Matter Experts",        subtitle: "Curriculum & Content" },
  { key: "srm",       title: "Student Relationship Managers",  subtitle: "Student Success" },
];

/* LinkedIn glyph */
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>
);


/* ── Member card (used in every layer) ── */
function MemberCard({ m }) {
  const Tag = m.linkedin ? "a" : "div";
  const linkProps = m.linkedin
    ? { href: m.linkedin, target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <Tag className={`member-card${m.linkedin ? " has-link" : ""}`} {...linkProps}>
      <div className="member-img">
        {m.img ? (
          <img className="member-photo" src={m.img} alt={m.name} loading="lazy" />
        ) : (
          <div className="member-initials">{m.initials}</div>
        )}
        {m.linkedin && (
          <div className="member-li" aria-label={`${m.name} on LinkedIn`}>
            <LinkedInIcon />
          </div>
        )}
      </div>
      <div className="member-bottom">
        <div className="member-name">{m.name}</div>
        <div className="member-role">{m.role}</div>
        <div className="member-line"></div>
      </div>
    </Tag>
  );
}

export default function TeamPage() {
  const rootRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("visible"), i * 80);
          }
        });
      },
      { threshold: 0.1 }
    );

    root.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    root.querySelectorAll(".member-card").forEach((card, i) => {
      card.classList.add("fade-up");
      card.style.transitionDelay = i * 50 + "ms";
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="team-page" ref={rootRef}>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-left fade-up visible">
          <div className="eyebrow">The people behind the vision</div>
          <h1 className="hero-title">
            Meet<br />
            <span className="outline">Our</span>{" "}
            <span className="gold">Team</span>
          </h1>
          <p className="hero-desc">
            Educators, engineers, and subject-matter experts working together
            to make world-class learning accessible to every student.
          </p>
        </div>

        {/* CEO card */}
        <div className="ceo-wrap">
          <div className="ceo-label-vertical">Chief Executive</div>
          {(() => {
            const Tag = CEO.linkedin ? "a" : "div";
            const linkProps = CEO.linkedin
              ? { href: CEO.linkedin, target: "_blank", rel: "noopener noreferrer" }
              : {};
            return (
              <Tag className={`ceo-card${CEO.linkedin ? " has-link" : ""}`} {...linkProps}>
                <div className="ceo-image-box">
                  <div className="grid-overlay"></div>
                  {CEO.img ? (
                    <img className="ceo-photo" src={CEO.img} alt={CEO.name} loading="eager" />
                  ) : (
                    <div className="ceo-initials">{CEO.initials}</div>
                  )}
                  <div className="ceo-badge">{CEO.badge}</div>
                  <div className="ceo-hover-bar"></div>
                </div>
                <div className="ceo-info">
                  <div>
                    <div className="ceo-name">{CEO.name}</div>
                    <div className="ceo-role">{CEO.role}</div>
                  </div>
                  {CEO.linkedin && <div className="ceo-arrow"><LinkedInIcon /></div>}
                </div>
              </Tag>
            );
          })()}
        </div>
      </section>

      {/* ── ROLE LAYERS ── */}
      {LAYERS.map((layer) => {
        const people = MEMBERS.filter((m) => m.layer === layer.key);
        if (people.length === 0) return null;
        return (
          <section className="team-section fade-up" key={layer.key}>
            <div className="layer-head">
              <div className="layer-line"></div>
              <div className="layer-titles">
                <div className="layer-title">{layer.title}</div>
                {layer.subtitle && <div className="layer-subtitle">{layer.subtitle}</div>}
              </div>
            </div>

            <div className="team-grid">
              {people.map((m) => (
                <MemberCard key={m.id} m={m} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
