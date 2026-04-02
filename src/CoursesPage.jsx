import React, { useEffect, useState } from "react";
import heroPerson from "./assets/hero-person.png";
import "./CoursesPage.css";

/* ── Icons ── */
const BookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const StarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const UsersIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
  </svg>
);

/* ── Badge pill ── */
const Badge = ({ label, type = "dark" }) => (
  <span className="cp-badge" style={{
    background: type === "gold" ? "rgba(0,0,0,0.15)" : type === "accent" ? "rgba(255,183,3,0.15)" : "rgba(255,183,3,0.12)",
    color: type === "gold" ? "#111" : "#ffb703",
    border: type !== "gold" ? "1px solid rgba(255,183,3,0.2)" : "none",
  }}>
    <StarIcon /> {label}
  </span>
);

/* ── Course Stats ── */
const COURSE_STATS = [
  { value: "17", label: "Courses Offered", icon: "📚" },
  { value: "LIVE", label: "Daily Classes", icon: "⏱️" },
  { value: "50K+", label: "Students Enrolled", icon: "🎓" },
  { value: "rbr2000", label: "₹2,000 Off Coupon", icon: "🏷️" },
];

/*
 * ── Course Banner Images ──
 * Place your course banner images in: public/courses/
 * Filenames: gate-cs-core-2027.jpg, gate-da-core-2027.jpg, etc.
 * Each image should be ~600x340 (landscape ratio) like the provided banner.
 */

/* ── Course Categories with proper grouping ── */
const CATEGORIES = [
  {
    key: "gatecs",
    label: "GATE CS",
    heading: "GATE CS",
    description: "Comprehensive LIVE programs for GATE Computer Science aspirants. Classes held daily between 6 AM–8 AM and 6 PM–10 PM.",
    count: 9,
    courses: [
      {
        id: 1, tag: "GATE 2027", title: "GATE CS Core 2027",
        subtitle: "Prof Ravindrababu Ravula",
        image: "/courses/gate-cs-core-2027.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/1-gate-cs-core-2027",
        description: "A comprehensive LIVE program designed to cover the complete GATE Computer Science syllabus with a structured and consistent approach to learning and practice.",
        highlights: ["Complete GATE CS Syllabus", "LIVE Classes Daily", "Structured Learning Path", "Coupon: rbr2000 (₹2,000 off)"],
        price: "9,999", originalPrice: "15,000", discount: "34", color: "dark",
      },
      {
        id: 2, tag: "COMBO · GATE 2027", title: "GATE CS & DA Core 2027",
        subtitle: "Prof Ravindrababu Ravula",
        image: "/courses/gate-cs-da-core-2027.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/16-gate-cs-da-core-2027",
        description: "A comprehensive LIVE program designed to cover the complete GATE Computer Science and Data Analytics syllabus with a structured and consistent approach to learning and practice.",
        highlights: ["Complete CS + DA Syllabus", "LIVE Classes Daily", "Best Value Combo", "Coupon: rbr2000 (₹2,000 off)"],
        price: "16,999", originalPrice: "25,000", discount: "33", color: "accent",
      },
      {
        id: 3, tag: "MOST POPULAR · GATE 2027", title: "GATE CS Core Plus 2027",
        subtitle: "Prof Ravindrababu Ravula · Syed Peera Saheb",
        image: "/courses/gate-cs-core-plus-2027.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/4-gate-cs-core-plus-2027",
        description: "(GATE + DSA + Java + LeetCode Problems) Includes complete GATE preparation along with Data Structures, Algorithms, Java programming and LeetCode problem solving.",
        highlights: ["Complete GATE CS Prep", "DSA with Java", "LeetCode Problems", "Coupon: rbr2000 (₹2,000 off)"],
        price: "14,999", originalPrice: "25,000", discount: "41", color: "accent",
      },
      {
        id: 4, tag: "GATE 2028", title: "GATE CS Core 2028",
        subtitle: "Prof Ravindrababu Ravula",
        image: "/courses/gate-cs-core-2028.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/2-gate-cs-core-2028",
        description: "A comprehensive LIVE program designed to cover the complete GATE Computer Science syllabus with a structured and consistent approach to learning and practice.",
        highlights: ["Complete GATE CS Syllabus", "LIVE Classes Daily", "Early Bird Advantage", "Coupon: rbr2000 (₹2,000 off)"],
        price: "14,999", originalPrice: "25,000", discount: "41", color: "dark",
      },
      {
        id: 5, tag: "COMBO · GATE 2028", title: "GATE CS & DA Core 2028",
        subtitle: "Prof Ravindrababu Ravula",
        image: "/courses/gate-cs-da-core-2028.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/17-gate-cs-da-core-2028",
        description: "A comprehensive LIVE program designed to cover the complete GATE Computer Science and Data Analytics syllabus with a structured and consistent approach to learning and practice.",
        highlights: ["Complete CS + DA Syllabus", "LIVE Classes Daily", "Best Value Combo", "Coupon: rbr2000 (₹2,000 off)"],
        price: "22,999", originalPrice: "35,000", discount: "35", color: "accent",
      },
      {
        id: 6, tag: "MOST POPULAR · GATE 2028", title: "GATE CS Core Plus 2028",
        subtitle: "Prof Ravindrababu Ravula · Syed Peera Saheb",
        image: "/courses/gate-cs-core-plus-2028.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/5-gate-cs-core-plus-2028",
        description: "(GATE + DSA + Java + LeetCode Problems) Includes complete GATE preparation along with Data Structures, Algorithms, Java programming and LeetCode problem solving.",
        highlights: ["Complete GATE CS Prep", "DSA with Java", "LeetCode Problems", "Coupon: rbr2000 (₹2,000 off)"],
        price: "19,999", originalPrice: "30,000", discount: "34", color: "accent",
      },
      {
        id: 7, tag: "GATE 2029", title: "GATE CS Core 2029",
        subtitle: "Prof Ravindrababu Ravula",
        image: "/courses/gate-cs-core-2029.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/3-gate-cs-core-2029",
        description: "A comprehensive LIVE program designed to cover the complete GATE Computer Science syllabus with a structured and consistent approach to learning and practice.",
        highlights: ["Complete GATE CS Syllabus", "LIVE Classes Daily", "Maximum Prep Time", "Coupon: rbr2000 (₹2,000 off)"],
        price: "19,999", originalPrice: "35,000", discount: "43", color: "dark",
      },
      {
        id: 8, tag: "COMBO · GATE 2029", title: "GATE CS & DA Core 2029",
        subtitle: "Prof Ravindrababu Ravula",
        image: "/courses/gate-cs-da-core-2029.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/18-gate-cs-da-core-2029",
        description: "A comprehensive LIVE program designed to cover the complete GATE Computer Science and Data Analytics syllabus with a structured and consistent approach to learning and practice.",
        highlights: ["Complete CS + DA Syllabus", "LIVE Classes Daily", "Best Value Combo", "Coupon: rbr2000 (₹2,000 off)"],
        price: "28,999", originalPrice: "45,000", discount: "36", color: "accent",
      },
      {
        id: 9, tag: "MOST POPULAR · GATE 2029", title: "GATE CS Core Plus 2029",
        subtitle: "Prof Ravindrababu Ravula · Syed Peera Saheb",
        image: "/courses/gate-cs-core-plus-2029.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/6-gate-cs-core-plus-2029",
        description: "(GATE + DSA + Java + LeetCode Problems) Includes complete GATE preparation along with Data Structures, Algorithms, Java programming and LeetCode problem solving.",
        highlights: ["Complete GATE CS Prep", "DSA with Java", "LeetCode Problems", "Coupon: rbr2000 (₹2,000 off)"],
        price: "24,999", originalPrice: "35,000", discount: "29", color: "accent",
      },
    ],
  },
  {
    key: "gateda",
    label: "GATE DA",
    heading: "GATE DA",
    description: "Comprehensive LIVE programs for GATE Data Analytics aspirants. Classes held daily between 6 AM–8 AM and 6 PM–10 PM.",
    count: 9,
    courses: [
      {
        id: 101, tag: "GATE 2027", title: "GATE DA Core 2027",
        subtitle: "Prof Ravindrababu Ravula",
        image: "/courses/gate-da-core-2027.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/7-gate-da-core-2027",
        description: "A comprehensive LIVE program designed for serious GATE DA aspirants who want a structured, consistent, and well-guided preparation.",
        highlights: ["Complete GATE DA Syllabus", "LIVE Classes Daily", "Structured Approach", "Coupon: rbr2000 (₹2,000 off)"],
        price: "9,999", originalPrice: "15,000", discount: "34", color: "dark",
      },
      {
        id: 102, tag: "COMBO · GATE 2027", title: "GATE CS & DA Core 2027",
        subtitle: "Prof Ravindrababu Ravula",
        image: "/courses/gate-cs-da-core-2027.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/16-gate-cs-da-core-2027",
        description: "A comprehensive LIVE program designed to cover the complete GATE Computer Science and Data Analytics syllabus with a structured and consistent approach to learning and practice.",
        highlights: ["Complete CS + DA Syllabus", "LIVE Classes Daily", "Best Value Combo", "Coupon: rbr2000 (₹2,000 off)"],
        price: "16,999", originalPrice: "25,000", discount: "33", color: "accent",
      },
      {
        id: 103, tag: "PREMIUM · MENTORSHIP · GATE 2027", title: "GATE DA 2027 – Core Plus",
        subtitle: "Prof Ravindrababu Ravula · Sri Harsha Achyunthuni",
        image: "/courses/gate-da-core-plus-2027.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/10-gate-da-2027-core-plus-mentorship-program",
        description: "Includes everything in Core + personalized 1:1 mentorship and performance tracking.",
        highlights: ["Everything in DA Core", "1:1 Personalized Mentorship", "Performance Tracking", "Coupon: rbr2000 (₹2,000 off)"],
        price: "49,999", originalPrice: "65,000", discount: "24", color: "dark",
      },
      {
        id: 104, tag: "GATE 2028", title: "GATE DA Core 2028",
        subtitle: "Prof Ravindrababu Ravula",
        image: "/courses/gate-da-core-2028.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/8-gate-da-core-2028",
        description: "A comprehensive LIVE program designed for serious GATE DA aspirants who want a structured, consistent, and well-guided preparation.",
        highlights: ["Complete GATE DA Syllabus", "LIVE Classes Daily", "Early Bird Advantage", "Coupon: rbr2000 (₹2,000 off)"],
        price: "14,999", originalPrice: "25,000", discount: "41", color: "dark",
      },
      {
        id: 105, tag: "COMBO · GATE 2028", title: "GATE CS & DA Core 2028",
        subtitle: "Prof Ravindrababu Ravula",
        image: "/courses/gate-cs-da-core-2028.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/17-gate-cs-da-core-2028",
        description: "A comprehensive LIVE program designed to cover the complete GATE Computer Science and Data Analytics syllabus with a structured and consistent approach to learning and practice.",
        highlights: ["Complete CS + DA Syllabus", "LIVE Classes Daily", "Best Value Combo", "Coupon: rbr2000 (₹2,000 off)"],
        price: "22,999", originalPrice: "35,000", discount: "35", color: "accent",
      },
      {
        id: 106, tag: "PREMIUM · MENTORSHIP · GATE 2028", title: "GATE DA 2028 – Core Plus",
        subtitle: "Prof Ravindrababu Ravula · Sri Harsha Achyunthuni",
        image: "/courses/gate-da-core-plus-2028.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/11-gate-da-2028-core-plus-mentorship-program",
        description: "Includes everything in Core + personalized 1:1 mentorship and performance tracking.",
        highlights: ["Everything in DA Core", "1:1 Personalized Mentorship", "Performance Tracking", "Coupon: rbr2000 (₹2,000 off)"],
        price: "69,999", originalPrice: "90,000", discount: "23", color: "dark",
      },
      {
        id: 107, tag: "GATE 2029", title: "GATE DA Core 2029",
        subtitle: "Prof Ravindrababu Ravula",
        image: "/courses/gate-da-core-2029.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/9-gate-da-core-2029",
        description: "A comprehensive LIVE program designed for serious GATE DA aspirants who want a structured, consistent, and well-guided preparation.",
        highlights: ["Complete GATE DA Syllabus", "LIVE Classes Daily", "Maximum Prep Time", "Coupon: rbr2000 (₹2,000 off)"],
        price: "19,999", originalPrice: "35,000", discount: "43", color: "dark",
      },
      {
        id: 108, tag: "COMBO · GATE 2029", title: "GATE CS & DA Core 2029",
        subtitle: "Prof Ravindrababu Ravula",
        image: "/courses/gate-cs-da-core-2029.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/18-gate-cs-da-core-2029",
        description: "A comprehensive LIVE program designed to cover the complete GATE Computer Science and Data Analytics syllabus with a structured and consistent approach to learning and practice.",
        highlights: ["Complete CS + DA Syllabus", "LIVE Classes Daily", "Best Value Combo", "Coupon: rbr2000 (₹2,000 off)"],
        price: "28,999", originalPrice: "45,000", discount: "36", color: "accent",
      },
      {
        id: 109, tag: "PREMIUM · MENTORSHIP · GATE 2029", title: "GATE DA 2029 – Core Plus",
        subtitle: "Prof Ravindrababu Ravula · Sri Harsha Achyunthuni",
        image: "/courses/gate-da-core-plus-2029.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/12-gate-da-2029-core-plus-mentorship-program",
        description: "Includes everything in Core + personalized 1:1 mentorship and performance tracking.",
        highlights: ["Everything in DA Core", "1:1 Personalized Mentorship", "Performance Tracking", "Coupon: rbr2000 (₹2,000 off)"],
        price: "89,999", originalPrice: "1,50,000", discount: "41", color: "dark",
      },
    ],
  },
  {
    key: "testseries",
    label: "Test Series",
    heading: "Test Series",
    description: "Sharpen your exam readiness with full-length mock tests, subject-wise tests, and detailed performance analysis.",
    count: 2,
    courses: [
      {
        id: 11, tag: "GATE CS", title: "GATE CS 2027 Test Series",
        subtitle: "Prof Ravindrababu Ravula",
        image: "",
        link: "https://courses.ravindrababuravula.in/test-series/1-gate-cs-2027-test-series?subjectId=-1",
        description: "Comprehensive GATE CS test series with full-length mock tests, subject-wise tests, and detailed performance analysis.",
        highlights: ["Full-Length Mocks", "Subject-wise Tests", "Detailed Analysis", "Exam Simulation"],
        price: "3,538", originalPrice: "4,999", discount: "30", color: "dark",
      },
      {
        id: 12, tag: "GATE DA", title: "GATE DA 2027 Test Series",
        subtitle: "Prof Ravindrababu Ravula",
        image: "",
        link: "https://courses.ravindrababuravula.in/test-series/2-gate-da-2027-test-series?subjectId=-1",
        description: "Comprehensive GATE DA test series with full-length mock tests, subject-wise tests, and detailed performance analysis.",
        highlights: ["Full-Length Mocks", "Subject-wise Tests", "Detailed Analysis", "Exam Simulation"],
        price: "3,538", originalPrice: "4,999", discount: "30", color: "dark",
      },
    ],
  },
  {
    key: "ugcnet",
    label: "UGC NET",
    heading: "UGC NET Courses",
    description: "Structured LIVE programs for UGC NET Computer Science & Applications with concept clarity and answer writing focus.",
    count: 2,
    courses: [
      {
        id: 13, tag: "DEC 2026", title: "UGC NET Dec 2026",
        subtitle: "Prof Ravindrababu Ravula",
        image: "/courses/ugc-net-dec-2026.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/13-ugc-net-dec-2026",
        description: "A structured LIVE program designed to cover the complete UGC NET syllabus with a focus on concept clarity, answer writing, and consistent practice.",
        highlights: ["Complete UGC NET Syllabus", "LIVE Classes Daily", "Concept Clarity Focus", "Coupon: rbr2000 (₹2,000 off)"],
        price: "9,999", originalPrice: "15,000", discount: "34", color: "dark",
      },
      {
        id: 14, tag: "JUNE 2027", title: "UGC NET June 2027",
        subtitle: "Prof Ravindrababu Ravula",
        image: "/courses/ugc-net-june-2027.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/14-ugc-net-june-2027",
        description: "A structured LIVE program designed to cover the complete UGC NET syllabus with a focus on concept clarity, answer writing, and consistent practice.",
        highlights: ["Complete UGC NET Syllabus", "LIVE Classes Daily", "Concept Clarity Focus", "Coupon: rbr2000 (₹2,000 off)"],
        price: "14,999", originalPrice: "20,000", discount: "26", color: "dark",
      },
    ],
  },
  {
    key: "dsa",
    label: "DSA with Java",
    heading: "DSA with Java",
    description: "Build strong foundations in Data Structures, Java programming, and LeetCode problem solving. Classes held between 6 AM–8 AM and 6 PM–10 PM.",
    count: 2,
    courses: [
      {
        id: 201, tag: "SKILL BUILDER", title: "DSA with Java & LeetCode Problems",
        subtitle: "Prof Ravindrababu Ravula · Syed Peera Saheb",
        image: "/courses/dsa-java-leetcode.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/15-dsa-with-java-leet-code-problems",
        description: "A structured program designed to build strong foundations in Data Structures, Java programming, and LeetCode problem solving.",
        highlights: ["Data Structures & Algorithms", "Java Programming", "LeetCode Problems", "Coupon: rbr1000 (₹1,000 off)"],
        price: "6,999", originalPrice: "9,999", discount: "31", color: "dark",
      },
      {
        id: 202, tag: "DSA + AI/ML", title: "Algorithms to AI Accelerator (DSA + AIML)",
        subtitle: "Prof Ravindrababu Ravula · Sri Harsha Achyuthuni · Syed Peera Saheb",
        image: "/courses/algorithms-to-ai.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/20-algorithms-to-ai-accelerator-dsa-aiml",
        description: "An implementation-focused LIVE program combining DSA with AI & ML. Industry-oriented, hands-on, and application-focused with depth and projects.",
        highlights: ["DSA + AI/ML Combined", "3 Expert Instructors", "Hands-on Projects", "Coupon: rbr2000 (₹2,000 off)"],
        price: "45,999", originalPrice: "65,000", discount: "30", color: "accent",
      },
    ],
  },
  {
    key: "aiml",
    label: "AI & ML",
    heading: "AI & ML Course",
    description: "Industry-oriented, hands-on programs designed to build real-world AI, Machine Learning skills with depth and projects.",
    count: 2,
    courses: [
      {
        id: 301, tag: "HANDS-ON", title: "Practical AI & ML Program",
        subtitle: "Prof Ravindrababu Ravula · Sri Harsha Achyuthuni",
        image: "/courses/practical-ai-ml.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/19-practical-ai-ml-program",
        description: "An implementation-focused LIVE program designed to build real-world AI & ML skills. Industry-oriented, hands-on, and application-focused with depth and projects.",
        highlights: ["Real-World Projects", "Hands-on Implementation", "Industry-Oriented", "Coupon: rbr2000 (₹2,000 off)"],
        price: "39,999", originalPrice: "55,999", discount: "29", color: "accent",
      },
      {
        id: 302, tag: "PREMIUM · DSA + AI/ML", title: "Algorithms to AI Accelerator (DSA + AIML)",
        subtitle: "Prof Ravindrababu Ravula · Sri Harsha Achyuthuni · Syed Peera Saheb",
        image: "/courses/algorithms-to-ai.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/20-algorithms-to-ai-accelerator-dsa-aiml",
        description: "An implementation-focused LIVE program combining DSA with AI & ML. More industry-oriented, more hands-on and application-focused with premium depth and projects.",
        highlights: ["DSA + AI/ML Combined", "3 Expert Instructors", "Hands-on Projects", "Coupon: rbr2000 (₹2,000 off)"],
        price: "45,999", originalPrice: "65,000", discount: "30", color: "accent",
      },
    ],
  },
];

/* ── Why Choose Section Data ── */
const WHY_CHOOSE = [
  { num: "01", title: "IISc Alumnus Faculty", desc: "Learn from Prof. RBR — PhD in AI/ML, 18+ years of teaching experience, with deep academic and industry expertise." },
  { num: "02", title: "Proven Track Record", desc: "Our students consistently secure top GATE ranks including AIR 2, AIR 3, AIR 5 — year after year." },
  { num: "03", title: "Structured Curriculum", desc: "Meticulously designed course structure that covers every topic with the right depth and in the optimal sequence." },
  { num: "04", title: "Community & Support", desc: "Join a thriving community of 50K+ students with doubt-clearing sessions, peer discussions, and mentor access." },
];

export default function CoursesPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filters = ["All", ...CATEGORIES.map(c => c.label)];

  const visibleCategories = activeFilter === "All"
    ? CATEGORIES
    : CATEGORIES.filter(c => c.label === activeFilter);

  return (
    <div className="cp-wrapper">
      <div className="cp-body">

        {/* ══════════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════════ */}
        <section className="cp-hero">
          <div className="cp-hero-bg-text">COURSES</div>

          <div className="cp-hero-inner">
            {/* Left */}
            <div className="cp-hero-left">
              <div className="cp-eyebrow">
                <div className="cp-eyebrow-row">
                  <span className="cp-eyebrow-label">Platform</span>
                  <span className="cp-eyebrow-value">RAVINDRABABURAVULA.IN</span>
                </div>
                <div className="cp-eyebrow-row">
                  <span className="cp-eyebrow-label">Domain</span>
                  <span className="cp-eyebrow-value">GATE CS · DA · DSA</span>
                </div>
              </div>

              <h1 className="cp-headline">
                Master GATE with<br />
                <em>India's #1</em> CS<br />
                Educator.
              </h1>

              <p className="cp-hero-desc">
                Comprehensive courses designed by Prof. Ravindrababu Ravula — IISc alumnus,
                18+ years of teaching, and mentor to thousands of GATE toppers.
              </p>

              {/* CTA Buttons */}
              <div className="cp-hero-ctas">
                <a
                  href="https://courses.ravindrababuravula.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cp-cta-primary"
                >
                  <PlayIcon /> Explore All Courses
                </a>
                <a href="#courses-grid" className="cp-cta-secondary">
                  View Course Details
                </a>
              </div>
            </div>

            {/* Right — Image */}
            <div className="cp-hero-right">
              <div className="cp-hero-img-wrap">
                <img
                  src={heroPerson}
                  alt="Prof. Ravindrababu Ravula"
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                />
                <div className="cp-hero-img-overlay">
                  <p className="cp-hero-img-title">World-Class<br />CS Education</p>
                  <div className="cp-hero-stat-box">
                    <div className="cp-big-num">17</div>
                    <div className="cp-small-lbl">LIVE<br />Courses</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            STATS STRIP
        ══════════════════════════════════════════ */}
        <section className="cp-stats-strip">
          <div className="cp-stats-inner">
            <div className="cp-strip-label">
              <BookIcon />
              <span>courses.ravindrababuravula.in</span>
            </div>
            <div className="cp-stats-grid">
              {COURSE_STATS.map((s) => (
                <div className="cp-stat-item" key={s.label}>
                  <div className="cp-stat-val">{s.value}</div>
                  <div className="cp-stat-lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="cp-divider" />

        {/* ══════════════════════════════════════════
            COURSES — FILTER BAR
        ══════════════════════════════════════════ */}
        <section className="cp-courses-section" id="courses-grid">
          <div className="cp-courses-inner">
            <div className="cp-courses-header">
              <div>
                <p className="cp-sec-label">Our Courses</p>
                <h2 className="cp-panel-h2">Choose Your Path to Success</h2>
              </div>

              {/* Filter pills */}
              <div className="cp-filter-pills">
                {filters.map(f => (
                  <button
                    key={f}
                    className={`cp-filter-pill ${activeFilter === f ? "active" : ""}`}
                    onClick={() => setActiveFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Categorized Course Groups ── */}
            {visibleCategories.map((cat, catIdx) => (
              <div className="cp-category-group" key={cat.key}>
                {/* Category heading */}
                <div className="cp-category-heading">
                  <div className="cp-category-heading-left">
                    <span className="cp-category-number">0{catIdx + 1}</span>
                    <div>
                      <h3 className="cp-category-title">{cat.heading}</h3>
                      <p className="cp-category-desc">{cat.description}</p>
                    </div>
                  </div>
                  <div className="cp-category-count">{cat.count} Courses</div>
                </div>

                {/* Course cards grid */}
                <div className="cp-courses-grid">
                  {cat.courses.map((course) => (
                    <div
                      key={course.id}
                      className={`cp-course-card ${course.color === "gold" ? "cp-card-gold" : course.color === "accent" ? "cp-card-accent" : ""}`}
                    >
                      {/* Banner Image */}
                      {course.image && (
                        <div className="cp-card-banner">
                          <img
                            src={course.image}
                            alt={course.title}
                            onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.classList.add('cp-card-banner-fallback'); }}
                          />
                        </div>
                      )}

                      {/* Card body */}
                      <div className="cp-card-body">
                        <h3 className="cp-card-title">{course.title}</h3>
                        <p className="cp-card-subtitle">{course.subtitle}</p>
                        <p className="cp-card-desc">{course.description}</p>

                        <div className="cp-card-highlights">
                          {course.highlights.map((h, i) => (
                            <div className="cp-card-highlight" key={i}>
                              <CheckIcon /> <span>{h}</span>
                            </div>
                          ))}
                        </div>

                        <div className="cp-card-price-row">
                          <div className="cp-card-price">₹{course.price}</div>
                          <div className="cp-card-original-price">₹{course.originalPrice}</div>
                          <div className="cp-card-discount">{course.discount}% off</div>
                        </div>
                        <div className="cp-card-gst">+ 18% GST</div>

                        <a
                          href={course.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cp-card-cta"
                        >
                          View Details <ArrowIcon />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="cp-divider" />

        {/* ══════════════════════════════════════════
            WHY CHOOSE US
        ══════════════════════════════════════════ */}
        <section className="cp-why-section">
          <div className="cp-why-inner">
            <div className="cp-why-left">
              <p className="cp-sec-label">Why Choose Us</p>
              <h2 className="cp-panel-h2">Built for Serious<br />GATE Aspirants</h2>
              <p className="cp-panel-p">
                Our courses are not just video lectures — they are complete ecosystems
                designed to transform your GATE preparation journey from confusion to
                clarity, from doubt to confidence.
              </p>

              <blockquote className="cp-highlight-quote">
                "My students don't just clear GATE — they <strong>dominate</strong> it.
                AIR 2, AIR 3, AIR 5 — these ranks speak for themselves."
                <cite>— Prof. Ravindrababu Ravula</cite>
              </blockquote>
            </div>

            <div className="cp-why-right">
              {WHY_CHOOSE.map((item) => (
                <div className="cp-why-card" key={item.num}>
                  <div className="cp-why-num">{item.num}</div>
                  <div className="cp-why-content">
                    <h4 className="cp-why-title">{item.title}</h4>
                    <p className="cp-why-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="cp-divider" />

        {/* ══════════════════════════════════════════
            LEARNING PATH
        ══════════════════════════════════════════ */}
        <section className="cp-path-section">
          <div className="cp-path-inner">
            <p className="cp-sec-label">Learning Path</p>
            <h2 className="cp-panel-h2" style={{ textAlign: "center", marginBottom: 60 }}>
              Your Journey to GATE Success
            </h2>

            <div className="cp-path-timeline">
              {[
                { step: "01", title: "Foundation", desc: "Build strong fundamentals in all core CS subjects with structured video lectures.", period: "Month 1–3" },
                { step: "02", title: "Deep Dive", desc: "Master advanced topics, solve previous year questions, and build problem-solving skills.", period: "Month 4–7" },
                { step: "03", title: "Practice & Test", desc: "Intensive test series, mock exams, and timed practice to build exam temperament.", period: "Month 8–10" },
                { step: "04", title: "Revision & Ace GATE", desc: "Quick revision, formula sheets, last-minute strategies, and confidence building.", period: "Month 11–12" },
              ].map((item, i) => (
                <div className="cp-path-item" key={i}>
                  <div className="cp-path-step">{item.step}</div>
                  <div className="cp-path-line" />
                  <div className="cp-path-content">
                    <span className="cp-path-period">{item.period}</span>
                    <h4 className="cp-path-title">{item.title}</h4>
                    <p className="cp-path-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="cp-divider" />

        {/* ══════════════════════════════════════════
            CTA SECTION
        ══════════════════════════════════════════ */}
        <section className="cp-cta-section">
          <div className="cp-cta-inner">
            <div className="cp-cta-card">
              <Badge label="Start Today" type="gold" />
              <h2 className="cp-cta-title">
                Ready to begin your<br />GATE success story?
              </h2>
              <p className="cp-cta-desc">
                Join 50,000+ students who are already preparing with Prof. RBR's courses.
                Your rank is waiting — take the first step today.
              </p>
              <div className="cp-cta-buttons">
                <a
                  href="https://courses.ravindrababuravula.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cp-cta-btn-primary"
                >
                  Browse All Courses <ArrowIcon />
                </a>
                <a
                  href="https://www.youtube.com/@ravindrababu_ravula"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cp-cta-btn-secondary"
                >
                  Watch Free Lectures
                </a>
              </div>

              <div className="cp-cta-trust">
                <div className="cp-cta-trust-item">
                  <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon />
                  <span>4.9/5 Average Rating</span>
                </div>
                <div className="cp-cta-trust-divider" />
                <div className="cp-cta-trust-item">
                  <span>Trusted by 50K+ Students</span>
                </div>
              </div>
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
