import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./MainSections.css";

// Sample Data
const COURSES = [
  {
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?auto=format&fit=crop&w=600&q=80",
    rating: "4.8",
    reviews: "12k",
    title: "Learn Advanced UI/UX Design with Figma: From Scratch",
    duration: "10h 30mins",
    lessons: "12 Lessons",
    author: "Jane Doe",
    authorImg:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    price: "$130.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1542744094-24638ea0b347?auto=format&fit=crop&w=600&q=80",
    rating: "4.9",
    reviews: "8k",
    title: "Canva Design Master Course: The Complete Guide",
    duration: "6h 15mins",
    lessons: "8 Lessons",
    author: "Alex Morgan",
    authorImg:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    price: "$99.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80",
    rating: "4.7",
    reviews: "4k",
    title: "100 Days for Beginners: Camera 3D and cinematography",
    duration: "24h 45mins",
    lessons: "30 Lessons",
    author: "Chris Evans",
    authorImg:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
    price: "$150.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    rating: "4.9",
    reviews: "20k",
    title: "Creative professional: Web App UI/UX and Engineering",
    duration: "18h 00mins",
    lessons: "25 Lessons",
    author: "Sarah Connor",
    authorImg:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80",
    price: "$180.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    rating: "4.6",
    reviews: "5k",
    title: "Google Web Designer masterclass with mastery builder",
    duration: "8h 20mins",
    lessons: "10 Lessons",
    author: "David Smith",
    authorImg:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
    price: "$120.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    rating: "4.8",
    reviews: "15k",
    title: "Mastering Programming: From zero to hero in 2025",
    duration: "40h 00mins",
    lessons: "50 Lessons",
    author: "Prof. RBR",
    authorImg:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    price: "$299.00",
  },
];

const MENTORS = [
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=400&q=80",
];

const TESTIMONIALS = [
  {
    quote: '"This Platform Didn\'t Just Teach Me—It Transformed My Career!"',
    body: "The AI-assisted courses were incredibly fast and accurate. I was able to grasp complex concepts thoroughly. Huge thanks to the interactive mentors.",
    author: "Maria Santos",
    role: "Software Dev",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  },
  {
    quote: '"This Platform Helped Me Break Into Tech—Fast!"',
    body: "Excellent application and amazing professors. I was able to land a job within 3 months of completion. I love the hands-on projects and quizzes.",
    author: "Thomas Lee",
    role: "UX Designer",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
  },
];

export default function MainSections() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  return (
    <div className="main-sections-wrapper" ref={containerRef}>
      {/* 1. Logos Section */}
      <section className="logos-section">
        <div className="logos-container">
          {["Microsoft", "Google", "Stanford", "Oxford", "Cambridge"].map(
            (logo) => (
              <h3 className="brand-logo" key={logo}>
                {logo}
              </h3>
            ),
          )}
        </div>
      </section>

      {/* 2. Courses Section */}
      <section className="courses-section">
        <div className="section-header-centered">
          <span className="pill-badge-light">OUR COURSES</span>
          <h2>Courses Designed for a Fast-Changing World</h2>
          <p>
            Gain practical skills in technology, design, and business with our
            comprehensive, up-to-date courses.
          </p>
        </div>

        <div className="course-categories">
          {[
            "Show All",
            "UX/UI Design",
            "Marketing",
            "Data Science",
            "Web Dev",
            "3D Design",
            "Product Management",
            "Finance",
          ].map((cat, i) => (
            <button key={cat} className={`cat-pill ${i === 0 ? "active" : ""}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="courses-grid">
          {COURSES.map((course, i) => (
            <div className="course-card" key={i}>
              <div className="cc-img-wrapper">
                <img src={course.image} alt={course.title} />
              </div>
              <div className="cc-content">
                <div className="cc-rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-text">
                    {" "}
                    {course.rating} ({course.reviews} Reviews)
                  </span>
                </div>
                <h3 className="cc-title">{course.title}</h3>
                <div className="cc-meta">
                  <span>⏱ {course.duration}</span>
                  <span>📚 {course.lessons}</span>
                </div>
                <div className="cc-footer">
                  <div className="cc-author">
                    <img src={course.authorImg} alt="author" />
                    <span>{course.author}</span>
                  </div>
                  <div className="cc-price">{course.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="centered-btn-wrapper">
          <button className="btn-yellow-outline">Load More Courses</button>
        </div>
      </section>

      {/* 3. Features Dashboard section */}
      <section className="features-section">
        <div className="section-header-centered">
          <span className="pill-badge-light">FEATURES</span>
          <h2>Built to Help You Learn Better, faster, smarter.</h2>
          <p>
            Get comprehensive, hands-on tutorials with integrated data streams
            and expert reviews to master your craft.
          </p>
        </div>

        <div className="features-grid">
          {/* Left Column (Stack of Dark Cards) */}
          <div className="feature-left-col">
            <div className="feature-card dark-blue">
              <h3>We Have More Than 5k+ Courses</h3>
              <p>
                All courses available with your $30/mo sub. Unlock your
                potential.
              </p>
              <button className="btn-yellow-small">Explore Library</button>
            </div>

            <div className="feature-card dark-blue members-card">
              <div className="member-avatars">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=50&q=80"
                  alt="1"
                />
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=50&q=80"
                  alt="2"
                />
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=50&q=80"
                  alt="3"
                />
              </div>
              <h4>Are You Ready To Join Us 100k+ Successful Students</h4>
            </div>
          </div>

          {/* Center Column (Brands & Co-Creation) */}
          <div className="feature-center-col">
            <div className="feature-card light-gray">
              <div className="brand-bubbles">
                <div className="bubble">React</div>
                <div className="bubble yellow">JS</div>
                <div className="bubble blue">G</div>
                <div className="bubble dark">in</div>
              </div>
              <h3>Co-Created With Top Brands</h3>
              <h2>Collaborated With more Than 100+ Top Companies</h2>
              <p>
                Learn real-world best practices seamlessly. We partner with
                industry giants to build curriculum that gets you hired.
              </p>
            </div>
          </div>

          {/* Right Column (Stats) */}
          <div className="feature-right-col">
            <div className="feature-card light-gray stat-card">
              <h5>Case Study</h5>
              <div className="stat-block">
                <h1>70%</h1>
                <p>Average salary bump post completion</p>
              </div>
              <div className="stat-block">
                <h1>450%</h1>
                <p>ROI on premium enrollment length</p>
              </div>
              <a href="#" className="link-arrow">
                Read more →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Expert Mentors */}
      <section className="mentors-section">
        <div className="section-header-centered">
          <span className="pill-badge-light">MENTORS</span>
          <h2>Meet Our Expert Mentors</h2>
          <p>
            Learn from industry leaders who actively shape technology and
            business landscapes.
          </p>
        </div>

        <div className="mentors-grid">
          {MENTORS.map((img, i) => (
            <div className="mentor-card" key={i}>
              <img src={img} alt="Mentor" />
              <div className="mentor-tag">
                <strong>Michael Smart</strong>
                <span>Lead Frontend Dev</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="testimonials-section">
        <div className="section-header-centered">
          <span className="pill-badge-light">TESTIMONIALS</span>
          <h2>What Our Learners Are Saying</h2>
          <p>
            Join over 100,000 students who revolutionized their lives and
            careers through our platform.
          </p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <h3 className="t-quote">{t.quote}</h3>
              <p className="t-body">{t.body}</p>
              <div className="t-author">
                <img src={t.img} alt={t.author} />
                <div className="t-info">
                  <h4>{t.author}</h4>
                  <span>{t.role}</span>
                </div>
                <div className="t-stars">
                  ★★★★★
                  <br />
                  <small>5.0 Ratings</small>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="t-view-all-wrapper">
          <button className="t-view-all-btn" onClick={() => navigate("/testimonials")}>
            View All 100+ Success Stories →
          </button>
        </div>
      </section>

      {/* 6. Big Footer */}
      <footer className="main-footer">
        <div className="footer-top-curve"></div>
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-col-left">
              <h4 className="teaching-since">Teaching Since 2012</h4>
              <p>
                Equipping students with exactly what they <br /> need to get
                ahead in tech.
              </p>
              <div className="newsletter-box">
                <input type="email" placeholder="Enter your email" />
                <button>Subscribe</button>
              </div>
              <div className="footer-logo">
                <h2>RBR</h2>
                <small>RavindraBabu Ravula</small>
              </div>
            </div>

            <div className="footer-links-grid">
              <div className="f-col">
                <strong>Quick Links</strong>
                <a href="#">Courses</a>
                <a href="#">About Us</a>
                <a href="#">Contact</a>
                <a href="#">Resources</a>
              </div>
              <div className="f-col">
                <strong>Legal</strong>
                <a href="#">Terms of Service</a>
                <a href="#">Privacy Policy</a>
              </div>
              <div className="f-col">
                <strong>Connect</strong>
                <a href="#">Twitter</a>
                <a href="#">LinkedIn</a>
                <a href="#">YouTube</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 RavindraBabu Ravula. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
