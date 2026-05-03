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
  { value: "4.9", label: "Average Rating", icon: "⭐" },
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
    key: "featured",
    label: "Featured",
    heading: "Featured Courses",
    description: "Start your learning journey — explore our AI Generalist Program, Study Abroad Guidance, and Free Practice Questions all in one place.",
    count: 3,
    courses: [
      {
        id: "ai-generalist-01",
        tag: "6-MONTH PROGRAM",
        title: "AI Generalist Program",
        subtitle: "Become an AI Generalist in 6 Months",
        image: "/courses/ai generalist.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/33-ai-generalist-program",
        description: "A comprehensive program designed to help learners build practical AI skills across multiple domains — from AI fundamentals to building real-world AI applications using modern tools and workflows.",
        highlights: ["6 Structured Levels", "Hands-on Tool-Based Learning", "Capstone Project & Demo Day", "Real-World AI Applications"],
        price: "29,999",
        originalPrice: "0",
        discount: "0",
        color: "solid-gold",
        marqueeText: "FEATURED ★ AI GENERALIST PROGRAM ★ 6 MONTHS ★ HANDS-ON LEARNING ★ REAL-WORLD TOOLS ★ CAPSTONE PROJECT ★ ",
        details: {
          overview: "A comprehensive program designed to help learners build practical AI skills across multiple domains. The course covers everything from understanding AI fundamentals to building real-world AI applications using modern tools and workflows.\n\nThe focus is on hands-on learning, structured progression, and real-world problem solving, enabling learners to apply AI effectively across industries.",
          format: [
            "Structured learning across 6 levels",
            "Hands-on assignments and practical exercises",
            "Tool-based learning with real-world applications",
            "Capstone project for end-to-end implementation",
            "Demo Day presentation",
          ],
          whatYouLearn: [
            "Fundamentals of Artificial Intelligence and Generative AI",
            "Working with Large Language Models (LLMs)",
            "Prompt engineering and optimization techniques",
            "AI-based content creation (text, image, video, voice)",
            "Automation using workflows and AI agents",
            "Building and deploying AI-powered applications",
          ],
          programLevels: [
            {
              title: "Level 1 & 2 — Foundations of LLMs, RAG & Prompt Engineering",
              desc: "Learn the fundamentals of AI, Generative AI, and Large Language Models. Understand prompt engineering techniques, prompt chaining, and introduction to Retrieval-Augmented Generation (RAG).",
              tools: ["Hugging Face Hub", "GPT-4 (OpenAI Playground)", "Playground AI", "OpenAI API", "Google Gemini Deep Research", "Google AI Studio", "Claude", "Fireflies", "NotebookLM", "Vapi", "Gamma", "ElevenLabs", "Surf AI", "Replit", "Rows"],
            },
            {
              title: "Level 3 — AI for Image & Video Creation",
              desc: "Explore generative AI for images and videos, diffusion models, and tools for creating visual and media content.",
              tools: ["Leonardo AI", "MidJourney", "Runway ML", "Pika AI", "HeyGen", "Synthesia", "Stability AI", "D-ID", "ElevenLabs"],
            },
            {
              title: "Level 4 — Automate Tasks with AI Agents",
              desc: "Understand workflow automation, build AI agents, and design multi-step automation systems using modern tools.",
              tools: ["n8n", "Zapier", "Make (Integromat)", "LangChain", "Relevance AI", "Agentive AI"],
            },
            {
              title: "Level 5 — Building AI-Powered Applications",
              desc: "Learn to build AI-powered applications, create chatbots, integrate APIs, and deploy real-world solutions.",
              tools: ["v0 (Vercel)", "Cursor AI", "Bubble", "Supabase", "Bolt.new"],
            },
            {
              title: "Level 6 — Final Project (Capstone)",
              desc: "Apply all concepts to build an end-to-end AI solution and solve a real-world problem.",
              tools: ["Cursor AI", "Postman", "SDXL", "Runway ML", "ElevenLabs", "LangChain / n8n"],
            },
          ],
          whatYouGet: [
            "Complete structured learning across 6 levels",
            "Hands-on assignments and practice",
            "Real-world tool exposure",
            "Capstone project",
            "Demo Day presentation",
          ],
          whoIsFor: [
            "Beginners exploring AI",
            "Students and recent graduates",
            "Working professionals",
            "Individuals interested in automation and AI applications",
          ],
          outcome: [
            "Strong understanding of AI and LLMs",
            "Ability to use AI tools effectively",
            "Capability to automate workflows",
            "Experience in building AI-powered applications",
            "Confidence to solve real-world problems using AI",
          ],
          features: [
            "Structured learning path",
            "Practical and tool-based approach",
            "Industry-relevant curriculum",
            "Focus on real-world applications",
          ],
        },
      },
      {
        id: "study-abroad-01",
        tag: "GUIDANCE PROGRAM",
        title: "Study Abroad Guidance Program",
        subtitle: "Your Journey to a Global Career Starts Here",
        image: "/courses/study abroad.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/32-study-abroad",
        description: "End-to-end support for students serious about pursuing a Master\u2019s degree abroad — guidance at every step until you successfully secure a job, covering USA, UK, Australia, Canada, Germany, New Zealand, and Singapore.",
        highlights: ["End-to-End Guidance", "Country & University Selection", "Visa & SOP Assistance", "Job Placement Support"],
        price: "4,999",
        originalPrice: "0",
        discount: "0",
        color: "dark",
        details: {
          overview: "If you are serious about pursuing a Master\u2019s degree abroad — whether you are in your first year, final year, or even a drop year — we are here to guide you at every step of your journey until you successfully secure a job.\n\nWith the number of Indian students planning to study overseas expected to exceed 2 million by 2025, global education is no longer a trend — it is a powerful pathway to better opportunities and a higher quality of life.\n\nCountries such as the USA, UK, Australia, Canada, Germany, New Zealand, and Singapore continue to attract students due to strong job markets, high earning potential, advanced education systems, and better quality of life.",
          format: [
            "Personalized one-on-one guidance sessions",
            "Step-by-step assistance throughout the process",
            "Updated information on immigration policies and global trends",
            "Dedicated customer support throughout your journey",
          ],
          whatYouLearn: [
            "How to choose the right country based on opportunities, budget, and preferences",
            "Identifying programs aligned with your career goals",
            "How to craft a strong Statement of Purpose (SOP) and Letters of Recommendation",
            "Understanding visa procedures and mock interview preparation",
            "Financial planning, loan approval guidance, and pre-departure preparation",
          ],
          programLevels: [
            { title: "1. Career Counseling", desc: "Understand your goals, interests, and career path to make informed decisions.", tools: [] },
            { title: "2. Country Selection", desc: "Choose the right country based on opportunities, budget, and personal preferences.", tools: [] },
            { title: "3. Course Selection", desc: "Identify programs aligned with your career goals and academic background.", tools: [] },
            { title: "4. University Selection", desc: "Shortlist universities based on your profile, academic requirements, and goals.", tools: [] },
            { title: "5. SOP & LOR Assistance", desc: "Craft strong Statements of Purpose and Letters of Recommendation with expert guidance.", tools: [] },
            { title: "6. Loan Assistance", desc: "Guidance to secure the best education loans with favourable terms.", tools: [] },
            { title: "7. Visa Mock Interviews", desc: "Prepare confidently for visa interviews with practice sessions and tips.", tools: [] },
            { title: "8. Pre-Departure Guidance", desc: "Get ready for life abroad — travel, accommodation, cultural expectations, and more.", tools: [] },
          ],
          whatYouGet: [
            "End-to-end guidance until you secure a job",
            "Transparent and reliable support",
            "Updated knowledge of global education and immigration",
            "Dedicated customer support throughout your journey",
          ],
          whoIsFor: [
            "First-year students planning early",
            "Final-year students preparing for applications",
            "Graduates and drop-year students",
            "Anyone serious about studying abroad",
          ],
          outcome: [
            "Clear roadmap to study at a top university abroad",
            "Strong application with compelling SOP and LOR",
            "Visa confidence through mock interview preparation",
            "Financial clarity with loan guidance",
            "Smooth pre-departure and post-arrival transition",
            "End-to-end support until you land your first job",
          ],
          note: "Candidates are expected to have GRE scores (if required) and English proficiency test scores (IELTS / TOEFL / equivalent). Once you have your scores, we will guide you through all next steps.",
        },
      },
      {
        id: "free10k", tag: "FREE · GATE CS & DA", title: "10000+ Free Practice Questions and 500+ Free Tests",
        subtitle: "Prof Ravindrababu Ravula",
        image: "/courses/10000+ free practice questions.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/31-free-10k-practice-questions-and-500-tests-gate",
        description: "Free 10,000+ Practice Questions & 500+ Tests for GATE CS & DA. Prepare smarter and stronger with our comprehensive practice platform — now available completely FREE.",
        highlights: ["10,000+ High-Quality Practice Questions", "500+ Full-length & Topic-wise Tests", "Detailed Solutions & Performance Analysis", "Covers Entire GATE CS & DA Syllabus"],
        price: "FREE", originalPrice: "0", discount: "0", color: "gold", isFree: true,
        marqueeText: "FREE PRACTICE ★ 10000+ QUESTIONS ★ 500+ TESTS ★ GATE CS & DA ★ ",
        details: {
          overview: "Prepare smarter and stronger for GATE CS and Data Science & AI (DA) with our comprehensive practice platform — now available completely FREE.\n\nWe provide 10,000+ high-quality practice questions covering the entire GATE syllabus, carefully designed to strengthen your concepts and improve problem-solving skills. Along with this, get access to 500+ full-length and topic-wise tests that simulate the real exam environment and help you track your performance effectively.\n\nWhether you are just starting your preparation or revising before the exam, this platform ensures you have everything you need to excel in GATE CS & DA.\n\nStart practicing today and take one step closer to your dream rank — absolutely free!",
          whatYouLearn: ["Build strong fundamentals across all subjects", "Practice a wide variety of questions (easy to advanced level)", "Analyze your performance with detailed solutions", "Improve speed, accuracy, and confidence"],
          whatYouGet: ["10,000+ practice questions covering entire GATE CS & DA syllabus", "500+ full-length and topic-wise tests", "Detailed solutions for every question", "Performance analytics to track progress", "Real exam environment simulation", "Completely free access — no payment required"],
          whoIsFor: ["Students starting their GATE CS / DA preparation", "Aspirants in the revision phase before the exam", "Anyone looking for high-quality free practice material", "Students who want to benchmark themselves against the GATE pattern"],
          outcome: ["Strong conceptual foundation across all GATE topics", "Improved problem-solving speed and accuracy", "Confidence built through extensive practice", "Clear understanding of personal strengths and weaknesses"],
          note: "Sign up on the platform to access all 10,000+ questions and 500+ tests — completely free.",
        },
      },
      /* ──────────────────────────────────────────────────────────────
         Super 100 Batch — temporarily removed from the Featured section.
         Kept here (commented out) so it can be re-enabled in the future
         without re-typing the full content.
         ──────────────────────────────────────────────────────────────
      {
        id: "super100", tag: "FLAGSHIP · GATE 2027", title: "GATE CS + DA 2027 — Super 100 Batch + DSA with Java & LeetCode",
        subtitle: "Prof Ravindrababu Ravula · Syed Peera Saheb",
        image: "/courses/super100.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/29-super-100-gate-csda-2027-dsa-with-java",
        description: "Complete Preparation + Coding Mastery + Mentorship Program. A comprehensive, high-impact program combining GATE CS & DA preparation with hands-on DSA training using Java and LeetCode.",
        highlights: ["1200+ Hours LIVE CS & DA Classes", "200+ Hours DSA + Java + LeetCode", "1:1 Personalized Mentorship", "LIVE + Recorded Access"],
        price: "50,000", originalPrice: "50,000", discount: "0", color: "gold",
        marqueeText: "FEATURED COURSE ★ FLAGSHIP PROGRAM ★ SUPER 100 BATCH ★ GATE CS + DA 2027 ★ ",
        details: {
          overview: "This program integrates complete GATE CS & Data Science (DA) preparation with hands-on coding training in DSA using Java and LeetCode.\n\nIt is designed to ensure:\n• Strong theoretical foundation (GATE-oriented)\n• Practical coding skills (placement-oriented)\n• Structured preparation with continuous mentorship\n• Consistent progress through planning and evaluation\n\nThe focus is on building both:\n• Rank-oriented preparation\n• Industry-ready coding skills",
          format: ["Fully LIVE structured classes (with recorded access)", "Dedicated DSA + LeetCode coding sessions", "Regular mentor meetings via Google Meet", "Frequent interaction sessions with Ravindrababu Ravula", "Personalized study plan for each student", "Continuous support via discussion forum", "Lecture notes provided after every class", "The program ensures discipline, flexibility, and guided learning throughout your journey"],
          whatYouLearn: ["Deep understanding of CS + Data Science concepts", "Strong problem-solving skills for GATE and coding interviews", "Ability to solve problems on platforms like LeetCode", "Improved accuracy, speed, and exam temperament", "Personalized strategy based on your performance", "Consistent motivation, accountability, and direction"],
          subjects: ["Programming & Data Structures", "Algorithms", "Discrete Mathematics", "Computer Organization & Architecture", "Operating Systems", "Databases", "Computer Networks", "Theory of Computation", "Compiler Design"],
          csSyllabus: [
            { subject: "Engineering Mathematics", topics: "Discrete Mathematics: Propositional and first order logic, sets, relations, functions, partial orders and lattices, monoids, groups, graphs (connectivity, matching, colouring), combinatorics (counting, recurrence relations, generating functions). Linear Algebra: Matrices, determinants, system of linear equations, eigenvalues and eigenvectors, LU decomposition. Calculus: Limits, continuity and differentiability, maxima and minima, mean value theorem, integration. Probability and Statistics: Random variables, uniform, normal, exponential, Poisson and binomial distributions, mean, median, mode and standard deviation, conditional probability and Bayes theorem." },
            { subject: "Digital Logic", topics: "Boolean algebra. Combinational and sequential circuits. Minimization. Number representations and computer arithmetic (fixed and floating point)." },
            { subject: "Computer Organization & Architecture", topics: "Machine instructions and addressing modes. ALU, data-path and control unit. Instruction pipelining, pipeline hazards. Memory hierarchy: cache, main memory and secondary storage; I/O interface (interrupt and DMA mode)." },
            { subject: "Programming & Data Structures", topics: "Programming in C. Recursion. Arrays, stacks, queues, linked lists, trees, binary search trees, binary heaps, graphs." },
            { subject: "Algorithms", topics: "Searching, sorting, hashing. Asymptotic worst case time and space complexity. Algorithm design techniques: greedy, dynamic programming and divide-and-conquer. Graph traversals, minimum spanning trees, shortest paths." },
            { subject: "Theory of Computation", topics: "Regular expressions and finite automata. Context-free grammars and push-down automata. Regular and context-free languages, pumping lemma. Turing machines and undecidability." },
            { subject: "Compiler Design", topics: "Lexical analysis, parsing, syntax-directed translation. Runtime environments. Intermediate code generation. Local optimization, data flow analyses: constant propagation, liveness analysis, common sub-expression elimination." },
            { subject: "Operating Systems", topics: "System calls, processes, threads, inter-process communication, concurrency and synchronization. Deadlock. CPU and I/O scheduling. Memory management and virtual memory. File systems." },
            { subject: "Databases", topics: "ER-model. Relational model: relational algebra, tuple calculus, SQL. Integrity constraints, normal forms. File organization, indexing (e.g., B and B+ trees). Transactions and concurrency control." },
            { subject: "Computer Networks", topics: "Concept of layering: OSI and TCP/IP Protocol Stacks; basics of packet, circuit and virtual circuit-switching; Data link layer: framing, error detection, Medium Access Control, Ethernet bridging; Routing protocols: shortest path, flooding, distance vector and link state routing; Fragmentation and IP addressing, IPv4, CIDR notation, basics of IP support protocols (ARP, DHCP, ICMP), NAT; Transport layer: flow control and congestion control, UDP, TCP, sockets; Application layer protocols: DNS, SMTP, HTTP, FTP, Email." },
          ],
          daSubjects: ["Probability & Statistics", "Linear Algebra", "Calculus & Optimization", "Programming, Data Structures & Algorithms", "Database Management & Warehousing", "Machine Learning", "AI"],
          daSyllabus: [
            { subject: "Probability and Statistics", topics: "Counting (permutation and combinations), probability axioms, sample space, events, independent events, mutually exclusive events, marginal, conditional and joint probability, Bayes Theorem, conditional expectation and variance, mean, median, mode and standard deviation, correlation and covariance, random variables, discrete random variables and probability mass functions, uniform, Bernoulli, binomial distribution, continuous random variables and probability distribution function, uniform, exponential, Poisson, normal, standard normal, t-distribution, chi-squared distributions, cumulative distribution function, conditional PDF, Central limit theorem, confidence interval, z-test, t-test, chi-squared test." },
            { subject: "Linear Algebra", topics: "Vector space, subspaces, linear dependence and independence of vectors, matrices, projection matrix, orthogonal matrix, idempotent matrix, partition matrix and their properties, quadratic forms, systems of linear equations and solutions, Gaussian elimination, eigenvalues and eigenvectors, determinant, rank, nullity, projections, LU decomposition, singular value decomposition." },
            { subject: "Calculus and Optimization", topics: "Functions of a single variable, limit, continuity and differentiability, Taylor series, maxima and minima, optimization involving a single variable." },
            { subject: "Programming, Data Structures and Algorithms", topics: "Programming in Python, basic data structures: stacks, queues, linked lists, trees, hash tables; search algorithms: linear search and binary search, basic sorting algorithms: selection sort, bubble sort and insertion sort; divide and conquer: mergesort, quicksort; introduction to graph theory; basic graph algorithms: traversals and shortest path." },
            { subject: "Database Management and Warehousing", topics: "ER-model, relational model: relational algebra, tuple calculus, SQL, integrity constraints, normal form, file organization, indexing, data types, data transformation such as normalization, discretization, sampling, compression; data warehouse modelling: schema for multidimensional data models, concept hierarchies, measures: categorization and computations." },
            { subject: "Machine Learning", topics: "Supervised Learning: regression and classification problems, simple linear regression, multiple linear regression, ridge regression, logistic regression, k-nearest neighbour, naive Bayes classifier, linear discriminant analysis, support vector machine, decision trees, bias-variance trade-off, cross-validation methods (LOO, k-folds), multi-layer perceptron, feed-forward neural network. Unsupervised Learning: clustering algorithms, k-means/k-medoid, hierarchical clustering, top-down, bottom-up: single-linkage, multiple-linkage, dimensionality reduction, principal component analysis." },
            { subject: "AI", topics: "Search: informed, uninformed, adversarial; logic: propositional, predicate; reasoning under uncertainty — conditional independence representation, exact inference through variable elimination, and approximate inference through sampling." },
          ],
          dsaCoverage: ["Arrays and Strings", "Linked Lists", "Stacks and Queues", "Trees and Graphs", "Recursion and Backtracking", "Searching and Sorting", "Greedy Algorithms", "Dynamic Programming", "Problem-solving patterns"],
          javaCoverage: ["Java fundamentals and syntax", "Control structures and functions", "Object-Oriented Programming (OOP)", "Classes, Objects, Inheritance, Polymorphism", "Exception handling", "Writing clean and maintainable code"],
          leetcodeCoverage: ["Topic-wise curated problems", "Easy to medium level progression", "Focus on approach and optimization", "Speed and accuracy improvement"],
          customSections: [
            { title: "Structured Concept Delivery", desc: "Topics are taught in a logical and progressive sequence, ensuring strong conceptual clarity across both theory and coding." },
            { title: "Practice & Coding After Every Session", items: ["Assignments after each lecture", "Coding exercises and implementation tasks", "Guided problem-solving sessions"] },
            { title: "GATE PYQs with Detailed Explanation", items: ["Complete Previous Year Questions coverage", "Focus on patterns, approach, and exam strategy"] },
            { title: "High-Quality Practice Sets", items: ["Curated problems for both GATE and coding", "Designed to strengthen problem-solving ability"] },
            { title: "Regular Evaluation", items: ["Weekly quizzes and tests", "Daily Practice Problems (DPPs)", "Full-length mock tests", "Coding progress tracking"] },
            { title: "Revision Support", items: ["Compact revision modules", "Quick revision strategies for final phase"] },
          ],
          mentorship: [
            { title: "Mentorship & Personal Guidance (Key Feature)", items: ["Regular mentor meetings on Google Meet", "Frequent live sessions with Ravindrababu Ravula", "Personalized study schedule and planning", "Continuous performance tracking and feedback", "Exclusive WhatsApp groups for peer learning and discussion"] },
            { title: "These curated peer groups ensure", items: ["Daily discussions and doubt solving", "Coding + GATE preparation support", "Healthy competition and consistency", "Real-time updates and guidance"] },
          ],
          whatYouGet: ["1200+ hours of LIVE + recorded CS & DA classes", "200+ hours of DSA + Java + LeetCode training", "Complete syllabus coverage (GATE + Coding)", "Weekly tests and structured practice", "Full-length test series", "Weekly live problem-solving sessions", "Complete PYQ and practice coverage", "Personalized schedule plan", "Regular mentorship sessions", "Exclusive peer learning groups", "Access to student discussion forum"],
          whoIsFor: ["Serious GATE CS/DA 2027 aspirants", "Students aiming for both top ranks and placements", "College students balancing academics with preparation", "Beginners who want both theory + coding clarity", "Working professionals seeking structured and guided learning"],
          outcome: ["Strong conceptual clarity across CS and Data Science", "Ability to solve GATE-level and coding interview problems", "Confidence in writing clean Java code", "Familiarity with LeetCode-style problem solving", "A disciplined and structured preparation approach", "Improved chances of achieving both high GATE rank and placement readiness"],
          note: "Join this program to prepare with a complete ecosystem — concepts, coding, mentorship, and strategy — designed for aspirants who aim to excel in both GATE and placements.",
        },
      },
      */
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
        image: "/courses/challenging test series gate cs.jpg",
        link: "https://courses.ravindrababuravula.in/test-series/1-gate-cs-2027-test-series?subjectId=-1",
        description: "A structured test series designed to simulate the actual GATE exam environment, allowing you to practice under exam conditions and assess your performance regularly.",
        highlights: ["Full-Length Mocks", "Subject-wise Tests", "Detailed Analysis", "Performance Tracking"],
        price: "3,999", originalPrice: "4,999", discount: "20", color: "dark",
        details: {
          overview: "This test series is created to simulate the actual GATE exam environment, allowing you to practice under exam conditions and assess your performance regularly. The focus is on helping you identify strengths and weak areas, improve problem-solving speed and accuracy, and build confidence for the final exam.",
          format: ["Topic-wise tests covering individual subjects", "Sectional tests for combined topics", "Full-length tests based on GATE exam pattern"],
          whatYouLearn: ["Identify strengths and weak areas", "Improve problem-solving speed and accuracy", "Build confidence for the final exam"],
          features: ["Exam-Level Practice — Tests designed to reflect real GATE CS patterns and difficulty", "Detailed Solutions — Every question explained with the correct approach", "Performance Tracking — Analyze progress and identify areas for improvement", "Regular Practice — Maintain consistency and improve speed"],
          whatYouGet: ["Multiple topic-wise and sectional tests", "Full-length mock tests (exam-level)", "Detailed solutions for all questions", "Performance analysis after each test", "Ranking and score evaluation"],
          whoIsFor: ["Students preparing for GATE CS 2027", "Aspirants looking to evaluate their preparation", "Those who want to improve accuracy and time management", "Students nearing revision or final preparation phase"],
          outcome: ["Gain familiarity with the GATE exam pattern", "Improve speed and accuracy", "Identify weak areas and work on them", "Build confidence for the final exam"],
          note: "This test series is focused on practice and evaluation. It does not include full-length teaching sessions.",
        },
      },
      {
        id: 12, tag: "GATE DA", title: "GATE DA 2027 Test Series",
        subtitle: "Prof Ravindrababu Ravula",
        image: "/courses/challenging test series gate da.jpg",
        link: "https://courses.ravindrababuravula.in/test-series/2-gate-da-2027-test-series?subjectId=-1",
        description: "A structured test series designed to help you evaluate your preparation, improve accuracy, and build confidence for GATE Data Science & AI 2027.",
        highlights: ["Full-Length Mocks", "Subject-wise Tests", "Detailed Analysis", "Performance Tracking"],
        price: "3,999", originalPrice: "4,999", discount: "20", color: "dark",
        details: {
          overview: "This test series is designed to simulate the actual GATE DA exam environment, allowing you to practice under timed conditions and assess your performance regularly. The focus is on helping you identify strong and weak areas, improve accuracy and problem-solving speed, and develop confidence in handling exam-level questions.",
          format: ["Topic-wise tests covering individual subjects", "Sectional tests combining multiple topics", "Full-length mock tests based on GATE DA pattern"],
          whatYouLearn: ["Identify strong and weak areas", "Improve accuracy and problem-solving speed", "Develop confidence in handling exam-level questions"],
          features: ["Exam-Oriented Practice — Tests designed to match real GATE DA question patterns", "Detailed Solutions — Step-by-step explanations for concepts and approach", "Performance Tracking — Track progress and identify areas that need improvement", "Consistent Practice — Improve speed, accuracy, and time management"],
          whatYouGet: ["Topic-wise and sectional tests", "Full-length mock tests (exam-level)", "Detailed solutions for all questions", "Performance analysis after each test", "Score evaluation and ranking"],
          whoIsFor: ["Students preparing for GATE DA 2027", "Aspirants looking to evaluate their preparation", "Those who want to improve accuracy and consistency", "Students in revision or final preparation phase"],
          outcome: ["Gain familiarity with GATE DA exam pattern", "Improve speed and accuracy", "Identify and work on weak areas", "Build confidence for the final exam"],
          note: "This test series is focused on practice and evaluation. It does not include full-length teaching sessions.",
        },
      },
    ],
  },
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
        image: "/courses/gate cs 2027 core.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/1-gate-cs-core-2027",
        description: "A comprehensive LIVE program designed to cover the complete GATE Computer Science syllabus with a structured and consistent approach to learning and practice.",
        highlights: ["Complete GATE CS Syllabus", "LIVE Classes Daily", "Structured Learning Path"],
        price: "9,999", originalPrice: "15,000", discount: "34", color: "dark",
        details: {
          overview: "Gate CS Core is built to provide complete syllabus coverage through well-structured LIVE classes, supported by regular practice and evaluation. The focus is on building strong conceptual understanding, problem-solving ability, and familiarity with GATE-level questions. The course follows a clear and organized flow, helping you progress steadily throughout your preparation.",
          format: ["Fully LIVE classes with topic-wise structured delivery", "Live doubt-solving sessions", "Discussion Forum group for continuous discussion and support", "Lecture notes will be provided after every lecture for revision"],
          whatYouLearn: ["Core Computer Science subjects required for GATE", "Application of concepts through problem-solving", "Approach to solving exam-level questions", "Techniques to improve accuracy and speed"],
          subjects: ["Engineering Mathematics", "Digital Logic", "Computer Organization & Architecture", "Programming & Data Structures", "Algorithms", "Theory of Computation", "Compiler Design", "Operating Systems", "Databases", "Computer Networks", "General Aptitude"],
          csSyllabus: [
            { subject: "Engineering Mathematics", topics: "Discrete Mathematics: Propositional and first order logic, sets, relations, functions, partial orders and lattices, monoids, groups, graphs (connectivity, matching, colouring), combinatorics (counting, recurrence relations, generating functions). Linear Algebra: Matrices, determinants, system of linear equations, eigenvalues and eigenvectors, LU decomposition. Calculus: Limits, continuity and differentiability, maxima and minima, mean value theorem, integration. Probability and Statistics: Random variables, uniform, normal, exponential, Poisson and binomial distributions, mean, median, mode and standard deviation, conditional probability and Bayes theorem." },
            { subject: "Digital Logic", topics: "Boolean algebra. Combinational and sequential circuits. Minimization. Number representations and computer arithmetic (fixed and floating point)." },
            { subject: "Computer Organization & Architecture", topics: "Machine instructions and addressing modes. ALU, data-path and control unit. Instruction pipelining, pipeline hazards. Memory hierarchy: cache, main memory and secondary storage; I/O interface (interrupt and DMA mode)." },
            { subject: "Programming & Data Structures", topics: "Programming in C. Recursion. Arrays, stacks, queues, linked lists, trees, binary search trees, binary heaps, graphs." },
            { subject: "Algorithms", topics: "Searching, sorting, hashing. Asymptotic worst case time and space complexity. Algorithm design techniques: greedy, dynamic programming and divide-and-conquer. Graph traversals, minimum spanning trees, shortest paths." },
            { subject: "Theory of Computation", topics: "Regular expressions and finite automata. Context-free grammars and push-down automata. Regular and context-free languages, pumping lemma. Turing machines and undecidability." },
            { subject: "Compiler Design", topics: "Lexical analysis, parsing, syntax-directed translation. Runtime environments. Intermediate code generation. Local optimization, data flow analyses: constant propagation, liveness analysis, common sub-expression elimination." },
            { subject: "Operating Systems", topics: "System calls, processes, threads, inter-process communication, concurrency and synchronization. Deadlock. CPU and I/O scheduling. Memory management and virtual memory. File systems." },
            { subject: "Databases", topics: "ER-model. Relational model: relational algebra, tuple calculus, SQL. Integrity constraints, normal forms. File organization, indexing (e.g., B and B+ trees). Transactions and concurrency control." },
            { subject: "Computer Networks", topics: "Concept of layering: OSI and TCP/IP Protocol Stacks; basics of packet, circuit and virtual circuit-switching; Data link layer: framing, error detection, Medium Access Control, Ethernet bridging; Routing protocols: shortest path, flooding, distance vector and link state routing; Fragmentation and IP addressing, IPv4, CIDR notation, basics of IP support protocols (ARP, DHCP, ICMP), NAT; Transport layer: flow control and congestion control, UDP, TCP, sockets; Application layer protocols: DNS, SMTP, HTTP, FTP, Email." },
          ],
          features: ["Structured Concept Delivery — Topics taught in a clear and logical sequence", "Practice After Every Lecture — Assignments with detailed solutions", "GATE PYQs with Explanation — Previous Year Questions with complete analysis", "High-Quality Practice Sets — Curated questions to strengthen problem-solving", "Weekly quizzes, weekly tests and DPPs", "Full-length test series", "Compact revision modules"],
          whatYouGet: ["600+ hours of LIVE classes", "Weekly tests and structured practice", "Full-length test series", "Weekly live problem-solving sessions", "Complete PYQ and practice coverage", "Compact revision modules", "Access to student discussion forum"],
          whoIsFor: ["Students preparing for GATE CS 2027", "College students balancing academics and GATE preparation", "Working professionals looking for structured preparation", "Aspirants who want a clear and organized study plan"],
          outcome: ["Strong conceptual clarity across all subjects", "Improved problem-solving ability", "Familiarity with GATE exam patterns", "A structured approach to preparation"],

        },
      },
      {
        id: 2, tag: "COMBO · GATE 2027", title: "GATE CS & DA Core 2027",
        subtitle: "Prof Ravindrababu Ravula",
        image: "/courses/gate cs+da 2027 core.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/16-gate-cs-da-core-2027",
        description: "A comprehensive LIVE program designed to cover the complete GATE Computer Science and Data Analytics syllabus with a structured and consistent approach to learning and practice.",
        highlights: ["Complete CS + DA Syllabus", "LIVE Classes Daily", "Best Value Combo"],
        price: "16,999", originalPrice: "25,000", discount: "33", color: "accent",
        details: {
          overview: "Gate CS & DA Core is a comprehensive LIVE program designed to cover the complete GATE Computer Science and Data Analytics syllabus with a structured and consistent approach. The course provides strong conceptual understanding across both CS and DA subjects, supported by regular practice and evaluation, helping you progress steadily throughout your preparation.",
          format: ["Fully LIVE classes with topic-wise structured delivery", "Live doubt-solving sessions", "Discussion Forum group for continuous discussion and support", "Lecture notes will be provided after every lecture for revision"],
          whatYouLearn: ["Core Computer Science subjects required for GATE", "Core Data Science and AI concepts required for GATE DA", "Application of concepts through problem-solving", "Approach to solving exam-level questions", "Techniques to improve accuracy and speed"],
          subjects: ["Engineering Mathematics", "Digital Logic", "Computer Organization & Architecture", "Programming & Data Structures", "Algorithms", "Theory of Computation", "Compiler Design", "Operating Systems", "Databases", "Computer Networks", "General Aptitude"],
          csSyllabus: [
            { subject: "Engineering Mathematics", topics: "Discrete Mathematics: Propositional and first order logic, sets, relations, functions, partial orders and lattices, monoids, groups, graphs (connectivity, matching, colouring), combinatorics (counting, recurrence relations, generating functions). Linear Algebra: Matrices, determinants, system of linear equations, eigenvalues and eigenvectors, LU decomposition. Calculus: Limits, continuity and differentiability, maxima and minima, mean value theorem, integration. Probability and Statistics: Random variables, uniform, normal, exponential, Poisson and binomial distributions, mean, median, mode and standard deviation, conditional probability and Bayes theorem." },
            { subject: "Digital Logic", topics: "Boolean algebra. Combinational and sequential circuits. Minimization. Number representations and computer arithmetic (fixed and floating point)." },
            { subject: "Computer Organization & Architecture", topics: "Machine instructions and addressing modes. ALU, data-path and control unit. Instruction pipelining, pipeline hazards. Memory hierarchy: cache, main memory and secondary storage; I/O interface (interrupt and DMA mode)." },
            { subject: "Programming & Data Structures", topics: "Programming in C. Recursion. Arrays, stacks, queues, linked lists, trees, binary search trees, binary heaps, graphs." },
            { subject: "Algorithms", topics: "Searching, sorting, hashing. Asymptotic worst case time and space complexity. Algorithm design techniques: greedy, dynamic programming and divide-and-conquer. Graph traversals, minimum spanning trees, shortest paths." },
            { subject: "Theory of Computation", topics: "Regular expressions and finite automata. Context-free grammars and push-down automata. Regular and context-free languages, pumping lemma. Turing machines and undecidability." },
            { subject: "Compiler Design", topics: "Lexical analysis, parsing, syntax-directed translation. Runtime environments. Intermediate code generation. Local optimization, data flow analyses: constant propagation, liveness analysis, common sub-expression elimination." },
            { subject: "Operating Systems", topics: "System calls, processes, threads, inter-process communication, concurrency and synchronization. Deadlock. CPU and I/O scheduling. Memory management and virtual memory. File systems." },
            { subject: "Databases", topics: "ER-model. Relational model: relational algebra, tuple calculus, SQL. Integrity constraints, normal forms. File organization, indexing (e.g., B and B+ trees). Transactions and concurrency control." },
            { subject: "Computer Networks", topics: "Concept of layering: OSI and TCP/IP Protocol Stacks; basics of packet, circuit and virtual circuit-switching; Data link layer: framing, error detection, Medium Access Control, Ethernet bridging; Routing protocols: shortest path, flooding, distance vector and link state routing; Fragmentation and IP addressing, IPv4, CIDR notation, basics of IP support protocols (ARP, DHCP, ICMP), NAT; Transport layer: flow control and congestion control, UDP, TCP, sockets; Application layer protocols: DNS, SMTP, HTTP, FTP, Email." },
          ],
          syllabus: [
            { subject: "Probability and Statistics", topics: "Counting (permutation and combinations), probability axioms, sample space, events, independent events, mutually exclusive events, marginal, conditional and joint probability, Bayes Theorem, conditional expectation and variance, mean, median, mode and standard deviation, correlation and covariance, random variables, discrete random variables and probability mass functions, uniform, Bernoulli, binomial distribution, continuous random variables and probability distribution function, uniform, exponential, Poisson, normal, standard normal, t-distribution, chi-squared distributions, cumulative distribution function, conditional PDF, Central limit theorem, confidence interval, z-test, t-test, chi-squared test." },
            { subject: "Linear Algebra", topics: "Vector space, subspaces, linear dependence and independence of vectors, matrices, projection matrix, orthogonal matrix, idempotent matrix, partition matrix and their properties, quadratic forms, systems of linear equations and solutions, Gaussian elimination, eigenvalues and eigenvectors, determinant, rank, nullity, projections, LU decomposition, singular value decomposition." },
            { subject: "Calculus and Optimization", topics: "Functions of a single variable, limit, continuity and differentiability, Taylor series, maxima and minima, optimization involving a single variable." },
            { subject: "Programming, Data Structures and Algorithms", topics: "Programming in Python, basic data structures: stacks, queues, linked lists, trees, hash tables; search algorithms: linear search and binary search, basic sorting algorithms: selection sort, bubble sort and insertion sort; divide and conquer: mergesort, quicksort; introduction to graph theory; basic graph algorithms: traversals and shortest path." },
            { subject: "Database Management and Warehousing", topics: "ER-model, relational model: relational algebra, tuple calculus, SQL, integrity constraints, normal form, file organization, indexing, data types, data transformation such as normalization, discretization, sampling, compression; data warehouse modelling: schema for multidimensional data models, concept hierarchies, measures: categorization and computations." },
            { subject: "Machine Learning", topics: "Supervised Learning: regression and classification problems, simple linear regression, multiple linear regression, ridge regression, logistic regression, k-nearest neighbour, naive Bayes classifier, linear discriminant analysis, support vector machine, decision trees, bias-variance trade-off, cross-validation methods (LOO, k-folds), multi-layer perceptron, feed-forward neural network. Unsupervised Learning: clustering algorithms, k-means/k-medoid, hierarchical clustering, top-down, bottom-up: single-linkage, multiple-linkage, dimensionality reduction, principal component analysis." },
            { subject: "AI", topics: "Search: informed, uninformed, adversarial; logic: propositional, predicate; reasoning under uncertainty — conditional independence representation, exact inference through variable elimination, and approximate inference through sampling." },
          ],
          features: ["Structured Concept Delivery — Topics taught in a clear and logical sequence", "Complete CS & DA Syllabus Coverage — All subjects covered with exam-focused approach", "Practice After Every Lecture — Assignments with detailed solutions", "GATE PYQs with Explanation — Previous Year Questions with complete analysis", "High-Quality Practice Sets — Curated questions to strengthen problem-solving", "Weekly quizzes, weekly tests and DPPs", "Full-length test series", "Compact revision modules"],
          whatYouGet: ["600+ hours of LIVE classes covering both CS and DA syllabi", "Weekly tests and structured practice", "Full-length test series", "Weekly live problem-solving sessions", "Complete PYQ and practice coverage", "Compact revision modules", "Access to student discussion forum"],
          whoIsFor: ["Students preparing for both GATE CS and DA 2027", "Aspirants who want maximum flexibility across both papers", "College students balancing academics and GATE preparation", "Working professionals looking for structured preparation"],
          outcome: ["Strong conceptual clarity across all CS and DA subjects", "Improved problem-solving ability for both papers", "Familiarity with GATE exam patterns for CS and DA", "A structured approach to preparation"],

        },
      },
      {
        id: 3, tag: "MOST POPULAR · GATE 2027", title: "GATE CS Core Plus 2027",
        subtitle: "Prof Ravindrababu Ravula · Syed Peera Saheb",
        image: "/courses/gate cs 2027 core plus.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/4-gate-cs-core-plus-2027",
        description: "(GATE + DSA + Java + LeetCode Problems) Includes complete GATE preparation along with Data Structures, Algorithms, Java programming and LeetCode problem solving.",
        highlights: ["Complete GATE CS Prep", "DSA with Java", "LeetCode Problems"],
        price: "14,999", originalPrice: "25,000", discount: "41", color: "accent",
        details: {
          overview: "Gate CS Core Plus for GATE CS 2027 is a comprehensive LIVE program designed to combine complete GATE syllabus coverage with practical programming skills and structured preparation. Along with GATE preparation, this program also builds strong foundations in Algorithms, Data Structures, Java programming, and problem-solving through LeetCode, ensuring that your learning is both exam-focused and application-oriented.",
          format: ["Fully LIVE classes with structured, topic-wise delivery", "Live doubt-solving sessions", "Discussion Forum for brainstorming of sessions", "Integrated learning of GATE subjects, DSA, Java, and LeetCode", "Lecture notes will be provided after every lecture for revision"],
          whatYouLearn: ["Strong understanding of core Computer Science subjects", "Practical knowledge of Data Structures and Algorithms", "Java programming skills for problem-solving", "Experience in solving problems on LeetCode", "Improved accuracy and speed for GATE-level questions", "A structured and consistent preparation approach"],
          subjects: ["Engineering Mathematics", "Digital Logic", "Computer Organization & Architecture", "Programming & Data Structures", "Algorithms", "Theory of Computation", "Compiler Design", "Operating Systems", "Databases", "Computer Networks", "General Aptitude"],
          csSyllabus: [
            { subject: "Engineering Mathematics", topics: "Discrete Mathematics: Propositional and first order logic, sets, relations, functions, partial orders and lattices, monoids, groups, graphs (connectivity, matching, colouring), combinatorics (counting, recurrence relations, generating functions). Linear Algebra: Matrices, determinants, system of linear equations, eigenvalues and eigenvectors, LU decomposition. Calculus: Limits, continuity and differentiability, maxima and minima, mean value theorem, integration. Probability and Statistics: Random variables, uniform, normal, exponential, Poisson and binomial distributions, mean, median, mode and standard deviation, conditional probability and Bayes theorem." },
            { subject: "Digital Logic", topics: "Boolean algebra. Combinational and sequential circuits. Minimization. Number representations and computer arithmetic (fixed and floating point)." },
            { subject: "Computer Organization & Architecture", topics: "Machine instructions and addressing modes. ALU, data-path and control unit. Instruction pipelining, pipeline hazards. Memory hierarchy: cache, main memory and secondary storage; I/O interface (interrupt and DMA mode)." },
            { subject: "Programming & Data Structures", topics: "Programming in C. Recursion. Arrays, stacks, queues, linked lists, trees, binary search trees, binary heaps, graphs." },
            { subject: "Algorithms", topics: "Searching, sorting, hashing. Asymptotic worst case time and space complexity. Algorithm design techniques: greedy, dynamic programming and divide-and-conquer. Graph traversals, minimum spanning trees, shortest paths." },
            { subject: "Theory of Computation", topics: "Regular expressions and finite automata. Context-free grammars and push-down automata. Regular and context-free languages, pumping lemma. Turing machines and undecidability." },
            { subject: "Compiler Design", topics: "Lexical analysis, parsing, syntax-directed translation. Runtime environments. Intermediate code generation. Local optimization, data flow analyses: constant propagation, liveness analysis, common sub-expression elimination." },
            { subject: "Operating Systems", topics: "System calls, processes, threads, inter-process communication, concurrency and synchronization. Deadlock. CPU and I/O scheduling. Memory management and virtual memory. File systems." },
            { subject: "Databases", topics: "ER-model. Relational model: relational algebra, tuple calculus, SQL. Integrity constraints, normal forms. File organization, indexing (e.g., B and B+ trees). Transactions and concurrency control." },
            { subject: "Computer Networks", topics: "Concept of layering: OSI and TCP/IP Protocol Stacks; basics of packet, circuit and virtual circuit-switching; Data link layer: framing, error detection, Medium Access Control, Ethernet bridging; Routing protocols: shortest path, flooding, distance vector and link state routing; Fragmentation and IP addressing, IPv4, CIDR notation, basics of IP support protocols (ARP, DHCP, ICMP), NAT; Transport layer: flow control and congestion control, UDP, TCP, sockets; Application layer protocols: DNS, SMTP, HTTP, FTP, Email." },
          ],
          dsaCoverage: ["Arrays, Strings, Linked Lists", "Stacks, Queues, Trees, Graphs", "Recursion and Backtracking", "Searching and Sorting techniques", "Greedy, Dynamic Programming, and Graph algorithms", "Problem-solving techniques and pattern recognition"],
          javaCoverage: ["Basics of Java (syntax, control structures)", "Object-Oriented Programming (OOP concepts)", "Classes, Objects, Inheritance, Polymorphism", "Exception handling and standard libraries", "Writing clean and structured code", "Applying Java for problem-solving"],
          leetcodeCoverage: ["Topic-wise problem-solving aligned with DSA concepts", "Easy to medium level problems for concept building", "Selected problems to improve logical thinking", "Approach-based problem discussion", "Focus on writing optimized and correct solutions"],
          features: ["Structured Concept Delivery — Topics taught in a clear and logical sequence", "Practice After Every Lecture — Assignments with detailed solutions", "GATE PYQs with Analysis — Previous Year Questions with proper approach", "Coding Practice & Problem Solving — Regular sessions to strengthen DSA and coding", "High-Quality Practice Sets — Curated questions for GATE and concept strengthening", "Weekly quizzes, tests and DPPs", "Full-length test series", "Compact revision modules"],
          whatYouGet: ["600+ hours of LIVE classes", "Complete GATE CS syllabus coverage", "100+ hours of DSA + Java + LeetCode LIVE sessions", "Weekly tests and structured practice", "Full-length test series", "Weekly live problem-solving sessions", "Complete PYQ and practice coverage", "Compact revision modules", "Access to discussion forum"],
          whoIsFor: ["Students preparing for GATE CS 2027", "Those who want both GATE preparation and coding skills", "College students balancing academics, placements, and GATE", "Aspirants looking for a structured and practical approach", "People preparing for interviews of product based companies"],
          outcome: ["Strong conceptual clarity across all GATE CS subjects", "Solid foundation in Data Structures and Algorithms", "Practical coding experience using Java", "Confidence in solving problems on LeetCode", "A structured and consistent preparation approach"],
        },
      },
      {
        id: 4, tag: "GATE 2028", title: "GATE CS Core 2028",
        subtitle: "Prof Ravindrababu Ravula",
        image: "/courses/gate cs 2028 core.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/2-gate-cs-core-2028",
        description: "A comprehensive LIVE program designed to cover the complete GATE Computer Science syllabus with a structured and consistent approach to learning and practice.",
        highlights: ["Complete GATE CS Syllabus", "LIVE Classes Daily", "Early Bird Advantage"],
        price: "14,999", originalPrice: "25,000", discount: "41", color: "dark",
        details: {
          overview: "Gate CS Core is built to provide complete syllabus coverage through well-structured LIVE classes, supported by regular practice and evaluation. The focus is on building strong conceptual understanding, problem-solving ability, and familiarity with GATE-level questions. The course follows a clear and organized flow, helping you progress steadily throughout your preparation.",
          format: ["Fully LIVE classes with topic-wise structured delivery", "Live doubt-solving sessions", "Discussion Forum group for continuous discussion and support", "Lecture notes will be provided after every lecture for revision"],
          whatYouLearn: ["Core Computer Science subjects required for GATE", "Application of concepts through problem-solving", "Approach to solving exam-level questions", "Techniques to improve accuracy and speed"],
          subjects: ["Engineering Mathematics", "Digital Logic", "Computer Organization & Architecture", "Programming & Data Structures", "Algorithms", "Theory of Computation", "Compiler Design", "Operating Systems", "Databases", "Computer Networks", "General Aptitude"],
          csSyllabus: [
            { subject: "Engineering Mathematics", topics: "Discrete Mathematics: Propositional and first order logic, sets, relations, functions, partial orders and lattices, monoids, groups, graphs (connectivity, matching, colouring), combinatorics (counting, recurrence relations, generating functions). Linear Algebra: Matrices, determinants, system of linear equations, eigenvalues and eigenvectors, LU decomposition. Calculus: Limits, continuity and differentiability, maxima and minima, mean value theorem, integration. Probability and Statistics: Random variables, uniform, normal, exponential, Poisson and binomial distributions, mean, median, mode and standard deviation, conditional probability and Bayes theorem." },
            { subject: "Digital Logic", topics: "Boolean algebra. Combinational and sequential circuits. Minimization. Number representations and computer arithmetic (fixed and floating point)." },
            { subject: "Computer Organization & Architecture", topics: "Machine instructions and addressing modes. ALU, data-path and control unit. Instruction pipelining, pipeline hazards. Memory hierarchy: cache, main memory and secondary storage; I/O interface (interrupt and DMA mode)." },
            { subject: "Programming & Data Structures", topics: "Programming in C. Recursion. Arrays, stacks, queues, linked lists, trees, binary search trees, binary heaps, graphs." },
            { subject: "Algorithms", topics: "Searching, sorting, hashing. Asymptotic worst case time and space complexity. Algorithm design techniques: greedy, dynamic programming and divide-and-conquer. Graph traversals, minimum spanning trees, shortest paths." },
            { subject: "Theory of Computation", topics: "Regular expressions and finite automata. Context-free grammars and push-down automata. Regular and context-free languages, pumping lemma. Turing machines and undecidability." },
            { subject: "Compiler Design", topics: "Lexical analysis, parsing, syntax-directed translation. Runtime environments. Intermediate code generation. Local optimization, data flow analyses: constant propagation, liveness analysis, common sub-expression elimination." },
            { subject: "Operating Systems", topics: "System calls, processes, threads, inter-process communication, concurrency and synchronization. Deadlock. CPU and I/O scheduling. Memory management and virtual memory. File systems." },
            { subject: "Databases", topics: "ER-model. Relational model: relational algebra, tuple calculus, SQL. Integrity constraints, normal forms. File organization, indexing (e.g., B and B+ trees). Transactions and concurrency control." },
            { subject: "Computer Networks", topics: "Concept of layering: OSI and TCP/IP Protocol Stacks; basics of packet, circuit and virtual circuit-switching; Data link layer: framing, error detection, Medium Access Control, Ethernet bridging; Routing protocols: shortest path, flooding, distance vector and link state routing; Fragmentation and IP addressing, IPv4, CIDR notation, basics of IP support protocols (ARP, DHCP, ICMP), NAT; Transport layer: flow control and congestion control, UDP, TCP, sockets; Application layer protocols: DNS, SMTP, HTTP, FTP, Email." },
          ],
          features: ["Structured Concept Delivery — Topics taught in a clear and logical sequence", "Practice After Every Lecture — Assignments with detailed solutions", "GATE PYQs with Explanation — Previous Year Questions with complete analysis", "High-Quality Practice Sets — Curated questions to strengthen problem-solving", "Weekly quizzes, weekly tests and DPPs", "Full-length test series", "Compact revision modules"],
          whatYouGet: ["600+ hours of LIVE classes", "Weekly tests and structured practice", "Full-length test series", "Weekly live problem-solving sessions", "Complete PYQ and practice coverage", "Compact revision modules", "Access to student discussion forum"],
          whoIsFor: ["Students preparing for GATE CS 2028", "College students balancing academics and GATE preparation", "Working professionals looking for structured preparation", "Aspirants who want a clear and organized study plan"],
          outcome: ["Strong conceptual clarity across all subjects", "Improved problem-solving ability", "Familiarity with GATE exam patterns", "A structured approach to preparation"],

        },
      },
      {
        id: 5, tag: "COMBO · GATE 2028", title: "GATE CS & DA Core 2028",
        subtitle: "Prof Ravindrababu Ravula",
        image: "/courses/gate cs+da 2028 core.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/17-gate-cs-da-core-2028",
        description: "A comprehensive LIVE program designed to cover the complete GATE Computer Science and Data Analytics syllabus with a structured and consistent approach to learning and practice.",
        highlights: ["Complete CS + DA Syllabus", "LIVE Classes Daily", "Best Value Combo"],
        price: "22,999", originalPrice: "35,000", discount: "35", color: "accent",
        details: {
          overview: "Gate CS & DA Core is a comprehensive LIVE program designed to cover the complete GATE Computer Science and Data Analytics syllabus with a structured and consistent approach. The course provides strong conceptual understanding across both CS and DA subjects, supported by regular practice and evaluation, helping you progress steadily throughout your preparation.",
          format: ["Fully LIVE classes with topic-wise structured delivery", "Live doubt-solving sessions", "Discussion Forum group for continuous discussion and support", "Lecture notes will be provided after every lecture for revision"],
          whatYouLearn: ["Core Computer Science subjects required for GATE", "Core Data Science and AI concepts required for GATE DA", "Application of concepts through problem-solving", "Approach to solving exam-level questions", "Techniques to improve accuracy and speed"],
          subjects: ["Engineering Mathematics", "Digital Logic", "Computer Organization & Architecture", "Programming & Data Structures", "Algorithms", "Theory of Computation", "Compiler Design", "Operating Systems", "Databases", "Computer Networks", "General Aptitude"],
          csSyllabus: [
            { subject: "Engineering Mathematics", topics: "Discrete Mathematics: Propositional and first order logic, sets, relations, functions, partial orders and lattices, monoids, groups, graphs (connectivity, matching, colouring), combinatorics (counting, recurrence relations, generating functions). Linear Algebra: Matrices, determinants, system of linear equations, eigenvalues and eigenvectors, LU decomposition. Calculus: Limits, continuity and differentiability, maxima and minima, mean value theorem, integration. Probability and Statistics: Random variables, uniform, normal, exponential, Poisson and binomial distributions, mean, median, mode and standard deviation, conditional probability and Bayes theorem." },
            { subject: "Digital Logic", topics: "Boolean algebra. Combinational and sequential circuits. Minimization. Number representations and computer arithmetic (fixed and floating point)." },
            { subject: "Computer Organization & Architecture", topics: "Machine instructions and addressing modes. ALU, data-path and control unit. Instruction pipelining, pipeline hazards. Memory hierarchy: cache, main memory and secondary storage; I/O interface (interrupt and DMA mode)." },
            { subject: "Programming & Data Structures", topics: "Programming in C. Recursion. Arrays, stacks, queues, linked lists, trees, binary search trees, binary heaps, graphs." },
            { subject: "Algorithms", topics: "Searching, sorting, hashing. Asymptotic worst case time and space complexity. Algorithm design techniques: greedy, dynamic programming and divide-and-conquer. Graph traversals, minimum spanning trees, shortest paths." },
            { subject: "Theory of Computation", topics: "Regular expressions and finite automata. Context-free grammars and push-down automata. Regular and context-free languages, pumping lemma. Turing machines and undecidability." },
            { subject: "Compiler Design", topics: "Lexical analysis, parsing, syntax-directed translation. Runtime environments. Intermediate code generation. Local optimization, data flow analyses: constant propagation, liveness analysis, common sub-expression elimination." },
            { subject: "Operating Systems", topics: "System calls, processes, threads, inter-process communication, concurrency and synchronization. Deadlock. CPU and I/O scheduling. Memory management and virtual memory. File systems." },
            { subject: "Databases", topics: "ER-model. Relational model: relational algebra, tuple calculus, SQL. Integrity constraints, normal forms. File organization, indexing (e.g., B and B+ trees). Transactions and concurrency control." },
            { subject: "Computer Networks", topics: "Concept of layering: OSI and TCP/IP Protocol Stacks; basics of packet, circuit and virtual circuit-switching; Data link layer: framing, error detection, Medium Access Control, Ethernet bridging; Routing protocols: shortest path, flooding, distance vector and link state routing; Fragmentation and IP addressing, IPv4, CIDR notation, basics of IP support protocols (ARP, DHCP, ICMP), NAT; Transport layer: flow control and congestion control, UDP, TCP, sockets; Application layer protocols: DNS, SMTP, HTTP, FTP, Email." },
          ],
          syllabus: [
            { subject: "Probability and Statistics", topics: "Counting (permutation and combinations), probability axioms, sample space, events, independent events, mutually exclusive events, marginal, conditional and joint probability, Bayes Theorem, conditional expectation and variance, mean, median, mode and standard deviation, correlation and covariance, random variables, discrete random variables and probability mass functions, uniform, Bernoulli, binomial distribution, continuous random variables and probability distribution function, uniform, exponential, Poisson, normal, standard normal, t-distribution, chi-squared distributions, cumulative distribution function, conditional PDF, Central limit theorem, confidence interval, z-test, t-test, chi-squared test." },
            { subject: "Linear Algebra", topics: "Vector space, subspaces, linear dependence and independence of vectors, matrices, projection matrix, orthogonal matrix, idempotent matrix, partition matrix and their properties, quadratic forms, systems of linear equations and solutions, Gaussian elimination, eigenvalues and eigenvectors, determinant, rank, nullity, projections, LU decomposition, singular value decomposition." },
            { subject: "Calculus and Optimization", topics: "Functions of a single variable, limit, continuity and differentiability, Taylor series, maxima and minima, optimization involving a single variable." },
            { subject: "Programming, Data Structures and Algorithms", topics: "Programming in Python, basic data structures: stacks, queues, linked lists, trees, hash tables; search algorithms: linear search and binary search, basic sorting algorithms: selection sort, bubble sort and insertion sort; divide and conquer: mergesort, quicksort; introduction to graph theory; basic graph algorithms: traversals and shortest path." },
            { subject: "Database Management and Warehousing", topics: "ER-model, relational model: relational algebra, tuple calculus, SQL, integrity constraints, normal form, file organization, indexing, data types, data transformation such as normalization, discretization, sampling, compression; data warehouse modelling: schema for multidimensional data models, concept hierarchies, measures: categorization and computations." },
            { subject: "Machine Learning", topics: "Supervised Learning: regression and classification problems, simple linear regression, multiple linear regression, ridge regression, logistic regression, k-nearest neighbour, naive Bayes classifier, linear discriminant analysis, support vector machine, decision trees, bias-variance trade-off, cross-validation methods (LOO, k-folds), multi-layer perceptron, feed-forward neural network. Unsupervised Learning: clustering algorithms, k-means/k-medoid, hierarchical clustering, top-down, bottom-up: single-linkage, multiple-linkage, dimensionality reduction, principal component analysis." },
            { subject: "AI", topics: "Search: informed, uninformed, adversarial; logic: propositional, predicate; reasoning under uncertainty — conditional independence representation, exact inference through variable elimination, and approximate inference through sampling." },
          ],
          features: ["Structured Concept Delivery — Topics taught in a clear and logical sequence", "Complete CS & DA Syllabus Coverage — All subjects covered with exam-focused approach", "Practice After Every Lecture — Assignments with detailed solutions", "GATE PYQs with Explanation — Previous Year Questions with complete analysis", "High-Quality Practice Sets — Curated questions to strengthen problem-solving", "Weekly quizzes, weekly tests and DPPs", "Full-length test series", "Compact revision modules"],
          whatYouGet: ["600+ hours of LIVE classes covering both CS and DA syllabi", "Weekly tests and structured practice", "Full-length test series", "Weekly live problem-solving sessions", "Complete PYQ and practice coverage", "Compact revision modules", "Access to student discussion forum"],
          whoIsFor: ["Students preparing for both GATE CS and DA 2028", "Aspirants who want maximum flexibility across both papers", "College students balancing academics and GATE preparation", "Working professionals looking for structured preparation"],
          outcome: ["Strong conceptual clarity across all CS and DA subjects", "Improved problem-solving ability for both papers", "Familiarity with GATE exam patterns for CS and DA", "A structured approach to preparation"],

        },
      },
      {
        id: 6, tag: "MOST POPULAR · GATE 2028", title: "GATE CS Core Plus 2028",
        subtitle: "Prof Ravindrababu Ravula · Syed Peera Saheb",
        image: "/courses/gate cs 2028 core plus.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/5-gate-cs-core-plus-2028",
        description: "(GATE + DSA + Java + LeetCode Problems) Includes complete GATE preparation along with Data Structures, Algorithms, Java programming and LeetCode problem solving.",
        highlights: ["Complete GATE CS Prep", "DSA with Java", "LeetCode Problems"],
        price: "19,999", originalPrice: "30,000", discount: "34", color: "accent",
        details: {
          overview: "Gate CS Core Plus for GATE CS 2028 is a comprehensive LIVE program designed to combine complete GATE syllabus coverage with practical programming skills and structured preparation. Along with GATE preparation, this program also builds strong foundations in Algorithms, Data Structures, Java programming, and problem-solving through LeetCode, ensuring that your learning is both exam-focused and application-oriented.",
          format: ["Fully LIVE classes with structured, topic-wise delivery", "Live doubt-solving sessions", "Discussion Forum for brainstorming of sessions", "Integrated learning of GATE subjects, DSA, Java, and LeetCode", "Lecture notes will be provided after every lecture for revision"],
          whatYouLearn: ["Strong understanding of core Computer Science subjects", "Practical knowledge of Data Structures and Algorithms", "Java programming skills for problem-solving", "Experience in solving problems on LeetCode", "Improved accuracy and speed for GATE-level questions", "A structured and consistent preparation approach"],
          subjects: ["Engineering Mathematics", "Digital Logic", "Computer Organization & Architecture", "Programming & Data Structures", "Algorithms", "Theory of Computation", "Compiler Design", "Operating Systems", "Databases", "Computer Networks", "General Aptitude"],
          csSyllabus: [
            { subject: "Engineering Mathematics", topics: "Discrete Mathematics: Propositional and first order logic, sets, relations, functions, partial orders and lattices, monoids, groups, graphs (connectivity, matching, colouring), combinatorics (counting, recurrence relations, generating functions). Linear Algebra: Matrices, determinants, system of linear equations, eigenvalues and eigenvectors, LU decomposition. Calculus: Limits, continuity and differentiability, maxima and minima, mean value theorem, integration. Probability and Statistics: Random variables, uniform, normal, exponential, Poisson and binomial distributions, mean, median, mode and standard deviation, conditional probability and Bayes theorem." },
            { subject: "Digital Logic", topics: "Boolean algebra. Combinational and sequential circuits. Minimization. Number representations and computer arithmetic (fixed and floating point)." },
            { subject: "Computer Organization & Architecture", topics: "Machine instructions and addressing modes. ALU, data-path and control unit. Instruction pipelining, pipeline hazards. Memory hierarchy: cache, main memory and secondary storage; I/O interface (interrupt and DMA mode)." },
            { subject: "Programming & Data Structures", topics: "Programming in C. Recursion. Arrays, stacks, queues, linked lists, trees, binary search trees, binary heaps, graphs." },
            { subject: "Algorithms", topics: "Searching, sorting, hashing. Asymptotic worst case time and space complexity. Algorithm design techniques: greedy, dynamic programming and divide-and-conquer. Graph traversals, minimum spanning trees, shortest paths." },
            { subject: "Theory of Computation", topics: "Regular expressions and finite automata. Context-free grammars and push-down automata. Regular and context-free languages, pumping lemma. Turing machines and undecidability." },
            { subject: "Compiler Design", topics: "Lexical analysis, parsing, syntax-directed translation. Runtime environments. Intermediate code generation. Local optimization, data flow analyses: constant propagation, liveness analysis, common sub-expression elimination." },
            { subject: "Operating Systems", topics: "System calls, processes, threads, inter-process communication, concurrency and synchronization. Deadlock. CPU and I/O scheduling. Memory management and virtual memory. File systems." },
            { subject: "Databases", topics: "ER-model. Relational model: relational algebra, tuple calculus, SQL. Integrity constraints, normal forms. File organization, indexing (e.g., B and B+ trees). Transactions and concurrency control." },
            { subject: "Computer Networks", topics: "Concept of layering: OSI and TCP/IP Protocol Stacks; basics of packet, circuit and virtual circuit-switching; Data link layer: framing, error detection, Medium Access Control, Ethernet bridging; Routing protocols: shortest path, flooding, distance vector and link state routing; Fragmentation and IP addressing, IPv4, CIDR notation, basics of IP support protocols (ARP, DHCP, ICMP), NAT; Transport layer: flow control and congestion control, UDP, TCP, sockets; Application layer protocols: DNS, SMTP, HTTP, FTP, Email." },
          ],
          dsaCoverage: ["Arrays, Strings, Linked Lists", "Stacks, Queues, Trees, Graphs", "Recursion and Backtracking", "Searching and Sorting techniques", "Greedy, Dynamic Programming, and Graph algorithms", "Problem-solving techniques and pattern recognition"],
          javaCoverage: ["Basics of Java (syntax, control structures)", "Object-Oriented Programming (OOP concepts)", "Classes, Objects, Inheritance, Polymorphism", "Exception handling and standard libraries", "Writing clean and structured code", "Applying Java for problem-solving"],
          leetcodeCoverage: ["Topic-wise problem-solving aligned with DSA concepts", "Easy to medium level problems for concept building", "Selected problems to improve logical thinking", "Approach-based problem discussion", "Focus on writing optimized and correct solutions"],
          features: ["Structured Concept Delivery — Topics taught in a clear and logical sequence", "Practice After Every Lecture — Assignments with detailed solutions", "GATE PYQs with Analysis — Previous Year Questions with proper approach", "Coding Practice & Problem Solving — Regular sessions to strengthen DSA and coding", "High-Quality Practice Sets — Curated questions for GATE and concept strengthening", "Weekly quizzes, tests and DPPs", "Full-length test series", "Compact revision modules"],
          whatYouGet: ["600+ hours of LIVE classes", "Complete GATE CS syllabus coverage", "100+ hours of DSA + Java + LeetCode LIVE sessions", "Weekly tests and structured practice", "Full-length test series", "Weekly live problem-solving sessions", "Complete PYQ and practice coverage", "Compact revision modules", "Access to discussion forum"],
          whoIsFor: ["Students preparing for GATE CS 2028", "Those who want both GATE preparation and coding skills", "College students balancing academics, placements, and GATE", "Aspirants looking for a structured and practical approach", "People preparing for interviews of product based companies"],
          outcome: ["Strong conceptual clarity across all GATE CS subjects", "Solid foundation in Data Structures and Algorithms", "Practical coding experience using Java", "Confidence in solving problems on LeetCode", "A structured and consistent preparation approach"],
        },
      },
      {
        id: 7, tag: "GATE 2029", title: "GATE CS Core 2029",
        subtitle: "Prof Ravindrababu Ravula",
        image: "/courses/gate cs 2029 core.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/3-gate-cs-core-2029",
        description: "A comprehensive LIVE program designed to cover the complete GATE Computer Science syllabus with a structured and consistent approach to learning and practice.",
        highlights: ["Complete GATE CS Syllabus", "LIVE Classes Daily", "Maximum Prep Time"],
        price: "19,999", originalPrice: "35,000", discount: "43", color: "dark",
        details: {
          overview: "Gate CS Core is built to provide complete syllabus coverage through well-structured LIVE classes, supported by regular practice and evaluation. The focus is on building strong conceptual understanding, problem-solving ability, and familiarity with GATE-level questions. The course follows a clear and organized flow, helping you progress steadily throughout your preparation.",
          format: ["Fully LIVE classes with topic-wise structured delivery", "Live doubt-solving sessions", "Discussion Forum group for continuous discussion and support", "Lecture notes will be provided after every lecture for revision"],
          whatYouLearn: ["Core Computer Science subjects required for GATE", "Application of concepts through problem-solving", "Approach to solving exam-level questions", "Techniques to improve accuracy and speed"],
          subjects: ["Engineering Mathematics", "Digital Logic", "Computer Organization & Architecture", "Programming & Data Structures", "Algorithms", "Theory of Computation", "Compiler Design", "Operating Systems", "Databases", "Computer Networks", "General Aptitude"],
          csSyllabus: [
            { subject: "Engineering Mathematics", topics: "Discrete Mathematics: Propositional and first order logic, sets, relations, functions, partial orders and lattices, monoids, groups, graphs (connectivity, matching, colouring), combinatorics (counting, recurrence relations, generating functions). Linear Algebra: Matrices, determinants, system of linear equations, eigenvalues and eigenvectors, LU decomposition. Calculus: Limits, continuity and differentiability, maxima and minima, mean value theorem, integration. Probability and Statistics: Random variables, uniform, normal, exponential, Poisson and binomial distributions, mean, median, mode and standard deviation, conditional probability and Bayes theorem." },
            { subject: "Digital Logic", topics: "Boolean algebra. Combinational and sequential circuits. Minimization. Number representations and computer arithmetic (fixed and floating point)." },
            { subject: "Computer Organization & Architecture", topics: "Machine instructions and addressing modes. ALU, data-path and control unit. Instruction pipelining, pipeline hazards. Memory hierarchy: cache, main memory and secondary storage; I/O interface (interrupt and DMA mode)." },
            { subject: "Programming & Data Structures", topics: "Programming in C. Recursion. Arrays, stacks, queues, linked lists, trees, binary search trees, binary heaps, graphs." },
            { subject: "Algorithms", topics: "Searching, sorting, hashing. Asymptotic worst case time and space complexity. Algorithm design techniques: greedy, dynamic programming and divide-and-conquer. Graph traversals, minimum spanning trees, shortest paths." },
            { subject: "Theory of Computation", topics: "Regular expressions and finite automata. Context-free grammars and push-down automata. Regular and context-free languages, pumping lemma. Turing machines and undecidability." },
            { subject: "Compiler Design", topics: "Lexical analysis, parsing, syntax-directed translation. Runtime environments. Intermediate code generation. Local optimization, data flow analyses: constant propagation, liveness analysis, common sub-expression elimination." },
            { subject: "Operating Systems", topics: "System calls, processes, threads, inter-process communication, concurrency and synchronization. Deadlock. CPU and I/O scheduling. Memory management and virtual memory. File systems." },
            { subject: "Databases", topics: "ER-model. Relational model: relational algebra, tuple calculus, SQL. Integrity constraints, normal forms. File organization, indexing (e.g., B and B+ trees). Transactions and concurrency control." },
            { subject: "Computer Networks", topics: "Concept of layering: OSI and TCP/IP Protocol Stacks; basics of packet, circuit and virtual circuit-switching; Data link layer: framing, error detection, Medium Access Control, Ethernet bridging; Routing protocols: shortest path, flooding, distance vector and link state routing; Fragmentation and IP addressing, IPv4, CIDR notation, basics of IP support protocols (ARP, DHCP, ICMP), NAT; Transport layer: flow control and congestion control, UDP, TCP, sockets; Application layer protocols: DNS, SMTP, HTTP, FTP, Email." },
          ],
          features: ["Structured Concept Delivery — Topics taught in a clear and logical sequence", "Practice After Every Lecture — Assignments with detailed solutions", "GATE PYQs with Explanation — Previous Year Questions with complete analysis", "High-Quality Practice Sets — Curated questions to strengthen problem-solving", "Weekly quizzes, weekly tests and DPPs", "Full-length test series", "Compact revision modules"],
          whatYouGet: ["600+ hours of LIVE classes", "Weekly tests and structured practice", "Full-length test series", "Weekly live problem-solving sessions", "Complete PYQ and practice coverage", "Compact revision modules", "Access to student discussion forum"],
          whoIsFor: ["Students preparing for GATE CS 2029", "College students balancing academics and GATE preparation", "Working professionals looking for structured preparation", "Aspirants who want a clear and organized study plan"],
          outcome: ["Strong conceptual clarity across all subjects", "Improved problem-solving ability", "Familiarity with GATE exam patterns", "A structured approach to preparation"],

        },
      },
      {
        id: 8, tag: "COMBO · GATE 2029", title: "GATE CS & DA Core 2029",
        subtitle: "Prof Ravindrababu Ravula",
        image: "/courses/gate cs+da 2029 core.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/18-gate-cs-da-core-2029",
        description: "A comprehensive LIVE program designed to cover the complete GATE Computer Science and Data Analytics syllabus with a structured and consistent approach to learning and practice.",
        highlights: ["Complete CS + DA Syllabus", "LIVE Classes Daily", "Best Value Combo"],
        price: "28,999", originalPrice: "45,000", discount: "36", color: "accent",
        details: {
          overview: "Gate CS & DA Core is a comprehensive LIVE program designed to cover the complete GATE Computer Science and Data Analytics syllabus with a structured and consistent approach. The course provides strong conceptual understanding across both CS and DA subjects, supported by regular practice and evaluation, helping you progress steadily throughout your preparation.",
          format: ["Fully LIVE classes with topic-wise structured delivery", "Live doubt-solving sessions", "Discussion Forum group for continuous discussion and support", "Lecture notes will be provided after every lecture for revision"],
          whatYouLearn: ["Core Computer Science subjects required for GATE", "Core Data Science and AI concepts required for GATE DA", "Application of concepts through problem-solving", "Approach to solving exam-level questions", "Techniques to improve accuracy and speed"],
          subjects: ["Engineering Mathematics", "Digital Logic", "Computer Organization & Architecture", "Programming & Data Structures", "Algorithms", "Theory of Computation", "Compiler Design", "Operating Systems", "Databases", "Computer Networks", "General Aptitude"],
          csSyllabus: [
            { subject: "Engineering Mathematics", topics: "Discrete Mathematics: Propositional and first order logic, sets, relations, functions, partial orders and lattices, monoids, groups, graphs (connectivity, matching, colouring), combinatorics (counting, recurrence relations, generating functions). Linear Algebra: Matrices, determinants, system of linear equations, eigenvalues and eigenvectors, LU decomposition. Calculus: Limits, continuity and differentiability, maxima and minima, mean value theorem, integration. Probability and Statistics: Random variables, uniform, normal, exponential, Poisson and binomial distributions, mean, median, mode and standard deviation, conditional probability and Bayes theorem." },
            { subject: "Digital Logic", topics: "Boolean algebra. Combinational and sequential circuits. Minimization. Number representations and computer arithmetic (fixed and floating point)." },
            { subject: "Computer Organization & Architecture", topics: "Machine instructions and addressing modes. ALU, data-path and control unit. Instruction pipelining, pipeline hazards. Memory hierarchy: cache, main memory and secondary storage; I/O interface (interrupt and DMA mode)." },
            { subject: "Programming & Data Structures", topics: "Programming in C. Recursion. Arrays, stacks, queues, linked lists, trees, binary search trees, binary heaps, graphs." },
            { subject: "Algorithms", topics: "Searching, sorting, hashing. Asymptotic worst case time and space complexity. Algorithm design techniques: greedy, dynamic programming and divide-and-conquer. Graph traversals, minimum spanning trees, shortest paths." },
            { subject: "Theory of Computation", topics: "Regular expressions and finite automata. Context-free grammars and push-down automata. Regular and context-free languages, pumping lemma. Turing machines and undecidability." },
            { subject: "Compiler Design", topics: "Lexical analysis, parsing, syntax-directed translation. Runtime environments. Intermediate code generation. Local optimization, data flow analyses: constant propagation, liveness analysis, common sub-expression elimination." },
            { subject: "Operating Systems", topics: "System calls, processes, threads, inter-process communication, concurrency and synchronization. Deadlock. CPU and I/O scheduling. Memory management and virtual memory. File systems." },
            { subject: "Databases", topics: "ER-model. Relational model: relational algebra, tuple calculus, SQL. Integrity constraints, normal forms. File organization, indexing (e.g., B and B+ trees). Transactions and concurrency control." },
            { subject: "Computer Networks", topics: "Concept of layering: OSI and TCP/IP Protocol Stacks; basics of packet, circuit and virtual circuit-switching; Data link layer: framing, error detection, Medium Access Control, Ethernet bridging; Routing protocols: shortest path, flooding, distance vector and link state routing; Fragmentation and IP addressing, IPv4, CIDR notation, basics of IP support protocols (ARP, DHCP, ICMP), NAT; Transport layer: flow control and congestion control, UDP, TCP, sockets; Application layer protocols: DNS, SMTP, HTTP, FTP, Email." },
          ],
          syllabus: [
            { subject: "Probability and Statistics", topics: "Counting (permutation and combinations), probability axioms, sample space, events, independent events, mutually exclusive events, marginal, conditional and joint probability, Bayes Theorem, conditional expectation and variance, mean, median, mode and standard deviation, correlation and covariance, random variables, discrete random variables and probability mass functions, uniform, Bernoulli, binomial distribution, continuous random variables and probability distribution function, uniform, exponential, Poisson, normal, standard normal, t-distribution, chi-squared distributions, cumulative distribution function, conditional PDF, Central limit theorem, confidence interval, z-test, t-test, chi-squared test." },
            { subject: "Linear Algebra", topics: "Vector space, subspaces, linear dependence and independence of vectors, matrices, projection matrix, orthogonal matrix, idempotent matrix, partition matrix and their properties, quadratic forms, systems of linear equations and solutions, Gaussian elimination, eigenvalues and eigenvectors, determinant, rank, nullity, projections, LU decomposition, singular value decomposition." },
            { subject: "Calculus and Optimization", topics: "Functions of a single variable, limit, continuity and differentiability, Taylor series, maxima and minima, optimization involving a single variable." },
            { subject: "Programming, Data Structures and Algorithms", topics: "Programming in Python, basic data structures: stacks, queues, linked lists, trees, hash tables; search algorithms: linear search and binary search, basic sorting algorithms: selection sort, bubble sort and insertion sort; divide and conquer: mergesort, quicksort; introduction to graph theory; basic graph algorithms: traversals and shortest path." },
            { subject: "Database Management and Warehousing", topics: "ER-model, relational model: relational algebra, tuple calculus, SQL, integrity constraints, normal form, file organization, indexing, data types, data transformation such as normalization, discretization, sampling, compression; data warehouse modelling: schema for multidimensional data models, concept hierarchies, measures: categorization and computations." },
            { subject: "Machine Learning", topics: "Supervised Learning: regression and classification problems, simple linear regression, multiple linear regression, ridge regression, logistic regression, k-nearest neighbour, naive Bayes classifier, linear discriminant analysis, support vector machine, decision trees, bias-variance trade-off, cross-validation methods (LOO, k-folds), multi-layer perceptron, feed-forward neural network. Unsupervised Learning: clustering algorithms, k-means/k-medoid, hierarchical clustering, top-down, bottom-up: single-linkage, multiple-linkage, dimensionality reduction, principal component analysis." },
            { subject: "AI", topics: "Search: informed, uninformed, adversarial; logic: propositional, predicate; reasoning under uncertainty — conditional independence representation, exact inference through variable elimination, and approximate inference through sampling." },
          ],
          features: ["Structured Concept Delivery — Topics taught in a clear and logical sequence", "Complete CS & DA Syllabus Coverage — All subjects covered with exam-focused approach", "Practice After Every Lecture — Assignments with detailed solutions", "GATE PYQs with Explanation — Previous Year Questions with complete analysis", "High-Quality Practice Sets — Curated questions to strengthen problem-solving", "Weekly quizzes, weekly tests and DPPs", "Full-length test series", "Compact revision modules"],
          whatYouGet: ["600+ hours of LIVE classes covering both CS and DA syllabi", "Weekly tests and structured practice", "Full-length test series", "Weekly live problem-solving sessions", "Complete PYQ and practice coverage", "Compact revision modules", "Access to student discussion forum"],
          whoIsFor: ["Students preparing for both GATE CS and DA 2029", "Aspirants who want maximum flexibility across both papers", "College students balancing academics and GATE preparation", "Working professionals looking for structured preparation"],
          outcome: ["Strong conceptual clarity across all CS and DA subjects", "Improved problem-solving ability for both papers", "Familiarity with GATE exam patterns for CS and DA", "A structured approach to preparation"],

        },
      },
      {
        id: 9, tag: "MOST POPULAR · GATE 2029", title: "GATE CS Core Plus 2029",
        subtitle: "Prof Ravindrababu Ravula · Syed Peera Saheb",
        image: "/courses/gate cs 2029 core plus.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/6-gate-cs-core-plus-2029",
        description: "(GATE + DSA + Java + LeetCode Problems) Includes complete GATE preparation along with Data Structures, Algorithms, Java programming and LeetCode problem solving.",
        highlights: ["Complete GATE CS Prep", "DSA with Java", "LeetCode Problems"],
        price: "24,999", originalPrice: "35,000", discount: "29", color: "accent",
        details: {
          overview: "Gate CS Core Plus for GATE CS 2029 is a comprehensive LIVE program designed to combine complete GATE syllabus coverage with practical programming skills and structured preparation. Along with GATE preparation, this program also builds strong foundations in Algorithms, Data Structures, Java programming, and problem-solving through LeetCode, ensuring that your learning is both exam-focused and application-oriented.",
          format: ["Fully LIVE classes with structured, topic-wise delivery", "Live doubt-solving sessions", "Discussion Forum for brainstorming of sessions", "Integrated learning of GATE subjects, DSA, Java, and LeetCode", "Lecture notes will be provided after every lecture for revision"],
          whatYouLearn: ["Strong understanding of core Computer Science subjects", "Practical knowledge of Data Structures and Algorithms", "Java programming skills for problem-solving", "Experience in solving problems on LeetCode", "Improved accuracy and speed for GATE-level questions", "A structured and consistent preparation approach"],
          subjects: ["Engineering Mathematics", "Digital Logic", "Computer Organization & Architecture", "Programming & Data Structures", "Algorithms", "Theory of Computation", "Compiler Design", "Operating Systems", "Databases", "Computer Networks", "General Aptitude"],
          csSyllabus: [
            { subject: "Engineering Mathematics", topics: "Discrete Mathematics: Propositional and first order logic, sets, relations, functions, partial orders and lattices, monoids, groups, graphs (connectivity, matching, colouring), combinatorics (counting, recurrence relations, generating functions). Linear Algebra: Matrices, determinants, system of linear equations, eigenvalues and eigenvectors, LU decomposition. Calculus: Limits, continuity and differentiability, maxima and minima, mean value theorem, integration. Probability and Statistics: Random variables, uniform, normal, exponential, Poisson and binomial distributions, mean, median, mode and standard deviation, conditional probability and Bayes theorem." },
            { subject: "Digital Logic", topics: "Boolean algebra. Combinational and sequential circuits. Minimization. Number representations and computer arithmetic (fixed and floating point)." },
            { subject: "Computer Organization & Architecture", topics: "Machine instructions and addressing modes. ALU, data-path and control unit. Instruction pipelining, pipeline hazards. Memory hierarchy: cache, main memory and secondary storage; I/O interface (interrupt and DMA mode)." },
            { subject: "Programming & Data Structures", topics: "Programming in C. Recursion. Arrays, stacks, queues, linked lists, trees, binary search trees, binary heaps, graphs." },
            { subject: "Algorithms", topics: "Searching, sorting, hashing. Asymptotic worst case time and space complexity. Algorithm design techniques: greedy, dynamic programming and divide-and-conquer. Graph traversals, minimum spanning trees, shortest paths." },
            { subject: "Theory of Computation", topics: "Regular expressions and finite automata. Context-free grammars and push-down automata. Regular and context-free languages, pumping lemma. Turing machines and undecidability." },
            { subject: "Compiler Design", topics: "Lexical analysis, parsing, syntax-directed translation. Runtime environments. Intermediate code generation. Local optimization, data flow analyses: constant propagation, liveness analysis, common sub-expression elimination." },
            { subject: "Operating Systems", topics: "System calls, processes, threads, inter-process communication, concurrency and synchronization. Deadlock. CPU and I/O scheduling. Memory management and virtual memory. File systems." },
            { subject: "Databases", topics: "ER-model. Relational model: relational algebra, tuple calculus, SQL. Integrity constraints, normal forms. File organization, indexing (e.g., B and B+ trees). Transactions and concurrency control." },
            { subject: "Computer Networks", topics: "Concept of layering: OSI and TCP/IP Protocol Stacks; basics of packet, circuit and virtual circuit-switching; Data link layer: framing, error detection, Medium Access Control, Ethernet bridging; Routing protocols: shortest path, flooding, distance vector and link state routing; Fragmentation and IP addressing, IPv4, CIDR notation, basics of IP support protocols (ARP, DHCP, ICMP), NAT; Transport layer: flow control and congestion control, UDP, TCP, sockets; Application layer protocols: DNS, SMTP, HTTP, FTP, Email." },
          ],
          dsaCoverage: ["Arrays, Strings, Linked Lists", "Stacks, Queues, Trees, Graphs", "Recursion and Backtracking", "Searching and Sorting techniques", "Greedy, Dynamic Programming, and Graph algorithms", "Problem-solving techniques and pattern recognition"],
          javaCoverage: ["Basics of Java (syntax, control structures)", "Object-Oriented Programming (OOP concepts)", "Classes, Objects, Inheritance, Polymorphism", "Exception handling and standard libraries", "Writing clean and structured code", "Applying Java for problem-solving"],
          leetcodeCoverage: ["Topic-wise problem-solving aligned with DSA concepts", "Easy to medium level problems for concept building", "Selected problems to improve logical thinking", "Approach-based problem discussion", "Focus on writing optimized and correct solutions"],
          features: ["Structured Concept Delivery — Topics taught in a clear and logical sequence", "Practice After Every Lecture — Assignments with detailed solutions", "GATE PYQs with Analysis — Previous Year Questions with proper approach", "Coding Practice & Problem Solving — Regular sessions to strengthen DSA and coding", "High-Quality Practice Sets — Curated questions for GATE and concept strengthening", "Weekly quizzes, tests and DPPs", "Full-length test series", "Compact revision modules"],
          whatYouGet: ["600+ hours of LIVE classes", "Complete GATE CS syllabus coverage", "100+ hours of DSA + Java + LeetCode LIVE sessions", "Weekly tests and structured practice", "Full-length test series", "Weekly live problem-solving sessions", "Complete PYQ and practice coverage", "Compact revision modules", "Access to discussion forum"],
          whoIsFor: ["Students preparing for GATE CS 2029", "Those who want both GATE preparation and coding skills", "College students balancing academics, placements, and GATE", "Aspirants looking for a structured and practical approach", "People preparing for interviews of product based companies"],
          outcome: ["Strong conceptual clarity across all GATE CS subjects", "Solid foundation in Data Structures and Algorithms", "Practical coding experience using Java", "Confidence in solving problems on LeetCode", "A structured and consistent preparation approach"],
        },
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
        image: "/courses/gate da 2027 core.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/7-gate-da-core-2027",
        description: "A comprehensive LIVE program designed for serious GATE DA aspirants who want a structured, consistent, and well-guided preparation experience.",
        highlights: ["Complete GATE DA Syllabus", "LIVE Classes Daily", "Structured Approach"],
        price: "9,999", originalPrice: "15,000", discount: "34", color: "dark",
        details: {
          overview: "This course is built to cover the entire GATE Data Science & AI syllabus through a carefully structured live learning process. Each subject is taught with emphasis on strong conceptual understanding, clarity in problem-solving, and alignment with GATE exam patterns. The goal is not just coverage, but meaningful learning and steady progress throughout the preparation cycle.",
          format: ["Fully LIVE classes with topic-wise structured delivery", "Interactive doubt-solving sessions", "Continuous academic support via discussion forum", "Lecture notes of every class will be provided after every class"],
          whatYouLearn: ["Clear understanding of core Data Science and AI concepts", "Ability to approach and solve GATE-level problems confidently", "Improved accuracy, speed, and exam temperament", "A well-defined preparation flow from start to finish"],
          syllabus: [
            { subject: "Probability and Statistics", topics: "Counting (permutation and combinations), probability axioms, sample space, events, independent events, mutually exclusive events, marginal, conditional and joint probability, Bayes Theorem, conditional expectation and variance, mean, median, mode and standard deviation, correlation and covariance, random variables, discrete random variables and probability mass functions, uniform, Bernoulli, binomial distribution, continuous random variables and probability distribution function, uniform, exponential, Poisson, normal, standard normal, t-distribution, chi-squared distributions, cumulative distribution function, conditional PDF, Central limit theorem, confidence interval, z-test, t-test, chi-squared test." },
            { subject: "Linear Algebra", topics: "Vector space, subspaces, linear dependence and independence of vectors, matrices, projection matrix, orthogonal matrix, idempotent matrix, partition matrix and their properties, quadratic forms, systems of linear equations and solutions, Gaussian elimination, eigenvalues and eigenvectors, determinant, rank, nullity, projections, LU decomposition, singular value decomposition." },
            { subject: "Calculus and Optimization", topics: "Functions of a single variable, limit, continuity and differentiability, Taylor series, maxima and minima, optimization involving a single variable." },
            { subject: "Programming, Data Structures and Algorithms", topics: "Programming in Python, basic data structures: stacks, queues, linked lists, trees, hash tables; search algorithms: linear search and binary search, basic sorting algorithms: selection sort, bubble sort and insertion sort; divide and conquer: mergesort, quicksort; introduction to graph theory; basic graph algorithms: traversals and shortest path." },
            { subject: "Database Management and Warehousing", topics: "ER-model, relational model: relational algebra, tuple calculus, SQL, integrity constraints, normal form, file organization, indexing, data types, data transformation such as normalization, discretization, sampling, compression; data warehouse modelling: schema for multidimensional data models, concept hierarchies, measures: categorization and computations." },
            { subject: "Machine Learning", topics: "Supervised Learning: regression and classification problems, simple linear regression, multiple linear regression, ridge regression, logistic regression, k-nearest neighbour, naive Bayes classifier, linear discriminant analysis, support vector machine, decision trees, bias-variance trade-off, cross-validation methods (LOO, k-folds), multi-layer perceptron, feed-forward neural network. Unsupervised Learning: clustering algorithms, k-means/k-medoid, hierarchical clustering, top-down, bottom-up: single-linkage, multiple-linkage, dimensionality reduction, principal component analysis." },
            { subject: "AI", topics: "Search: informed, uninformed, adversarial; logic: propositional, predicate; reasoning under uncertainty — conditional independence representation, exact inference through variable elimination, and approximate inference through sampling." },
          ],
          features: ["Structured Concept Delivery — Topics taught in a logical sequence ensuring continuity and depth", "Complete Syllabus Coverage — All subjects covered with focus on GATE relevance", "Practice After Every Lecture — Assignments to reinforce concepts and improve application", "GATE PYQs with Detailed Solutions — Previous Year Questions with complete explanation", "High-Quality Practice Sets — Curated questions for additional exposure", "Dedicated Doubt Resolution — Live sessions and ongoing discussion support", "Revision Support — Compact and focused revision modules"],
          whatYouGet: ["600+ hours of LIVE classes covering the complete syllabus", "Weekly tests and DPPs for continuous practice", "Full-length test series for exam-level preparation", "Weekly live problem-solving sessions", "Comprehensive practice material and PYQ coverage", "Revision modules for quick and effective review"],
          whoIsFor: ["Students preparing seriously for GATE DA 2027", "College students balancing academics with GATE preparation", "Working professionals looking for a structured and guided approach"],
          outcome: ["Strong conceptual clarity across all subjects", "Confidence in solving a wide range of GATE-level problems", "Familiarity with exam patterns and question types", "A disciplined and structured preparation approach"],
        },
      },
      {
        id: 102, tag: "COMBO · GATE 2027", title: "GATE CS & DA Core 2027",
        subtitle: "Prof Ravindrababu Ravula",
        image: "/courses/gate cs+da 2027 core.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/16-gate-cs-da-core-2027",
        description: "A comprehensive LIVE program designed to cover the complete GATE Computer Science and Data Analytics syllabus with a structured and consistent approach to learning and practice.",
        highlights: ["Complete CS + DA Syllabus", "LIVE Classes Daily", "Best Value Combo"],
        price: "16,999", originalPrice: "25,000", discount: "33", color: "accent",
        details: {
          overview: "Gate CS & DA Core is a comprehensive LIVE program designed to cover the complete GATE Computer Science and Data Analytics syllabus with a structured and consistent approach. The course provides strong conceptual understanding across both CS and DA subjects, supported by regular practice and evaluation, helping you progress steadily throughout your preparation.",
          format: ["Fully LIVE classes with topic-wise structured delivery", "Live doubt-solving sessions", "Discussion Forum group for continuous discussion and support", "Lecture notes will be provided after every lecture for revision"],
          whatYouLearn: ["Core Computer Science subjects required for GATE", "Core Data Science and AI concepts required for GATE DA", "Application of concepts through problem-solving", "Approach to solving exam-level questions", "Techniques to improve accuracy and speed"],
          subjects: ["Engineering Mathematics", "Digital Logic", "Computer Organization & Architecture", "Programming & Data Structures", "Algorithms", "Theory of Computation", "Compiler Design", "Operating Systems", "Databases", "Computer Networks", "General Aptitude"],
          csSyllabus: [
            { subject: "Engineering Mathematics", topics: "Discrete Mathematics: Propositional and first order logic, sets, relations, functions, partial orders and lattices, monoids, groups, graphs (connectivity, matching, colouring), combinatorics (counting, recurrence relations, generating functions). Linear Algebra: Matrices, determinants, system of linear equations, eigenvalues and eigenvectors, LU decomposition. Calculus: Limits, continuity and differentiability, maxima and minima, mean value theorem, integration. Probability and Statistics: Random variables, uniform, normal, exponential, Poisson and binomial distributions, mean, median, mode and standard deviation, conditional probability and Bayes theorem." },
            { subject: "Digital Logic", topics: "Boolean algebra. Combinational and sequential circuits. Minimization. Number representations and computer arithmetic (fixed and floating point)." },
            { subject: "Computer Organization & Architecture", topics: "Machine instructions and addressing modes. ALU, data-path and control unit. Instruction pipelining, pipeline hazards. Memory hierarchy: cache, main memory and secondary storage; I/O interface (interrupt and DMA mode)." },
            { subject: "Programming & Data Structures", topics: "Programming in C. Recursion. Arrays, stacks, queues, linked lists, trees, binary search trees, binary heaps, graphs." },
            { subject: "Algorithms", topics: "Searching, sorting, hashing. Asymptotic worst case time and space complexity. Algorithm design techniques: greedy, dynamic programming and divide-and-conquer. Graph traversals, minimum spanning trees, shortest paths." },
            { subject: "Theory of Computation", topics: "Regular expressions and finite automata. Context-free grammars and push-down automata. Regular and context-free languages, pumping lemma. Turing machines and undecidability." },
            { subject: "Compiler Design", topics: "Lexical analysis, parsing, syntax-directed translation. Runtime environments. Intermediate code generation. Local optimization, data flow analyses: constant propagation, liveness analysis, common sub-expression elimination." },
            { subject: "Operating Systems", topics: "System calls, processes, threads, inter-process communication, concurrency and synchronization. Deadlock. CPU and I/O scheduling. Memory management and virtual memory. File systems." },
            { subject: "Databases", topics: "ER-model. Relational model: relational algebra, tuple calculus, SQL. Integrity constraints, normal forms. File organization, indexing (e.g., B and B+ trees). Transactions and concurrency control." },
            { subject: "Computer Networks", topics: "Concept of layering: OSI and TCP/IP Protocol Stacks; basics of packet, circuit and virtual circuit-switching; Data link layer: framing, error detection, Medium Access Control, Ethernet bridging; Routing protocols: shortest path, flooding, distance vector and link state routing; Fragmentation and IP addressing, IPv4, CIDR notation, basics of IP support protocols (ARP, DHCP, ICMP), NAT; Transport layer: flow control and congestion control, UDP, TCP, sockets; Application layer protocols: DNS, SMTP, HTTP, FTP, Email." },
          ],
          syllabus: [
            { subject: "Probability and Statistics", topics: "Counting (permutation and combinations), probability axioms, sample space, events, independent events, mutually exclusive events, marginal, conditional and joint probability, Bayes Theorem, conditional expectation and variance, mean, median, mode and standard deviation, correlation and covariance, random variables, discrete random variables and probability mass functions, uniform, Bernoulli, binomial distribution, continuous random variables and probability distribution function, uniform, exponential, Poisson, normal, standard normal, t-distribution, chi-squared distributions, cumulative distribution function, conditional PDF, Central limit theorem, confidence interval, z-test, t-test, chi-squared test." },
            { subject: "Linear Algebra", topics: "Vector space, subspaces, linear dependence and independence of vectors, matrices, projection matrix, orthogonal matrix, idempotent matrix, partition matrix and their properties, quadratic forms, systems of linear equations and solutions, Gaussian elimination, eigenvalues and eigenvectors, determinant, rank, nullity, projections, LU decomposition, singular value decomposition." },
            { subject: "Calculus and Optimization", topics: "Functions of a single variable, limit, continuity and differentiability, Taylor series, maxima and minima, optimization involving a single variable." },
            { subject: "Programming, Data Structures and Algorithms", topics: "Programming in Python, basic data structures: stacks, queues, linked lists, trees, hash tables; search algorithms: linear search and binary search, basic sorting algorithms: selection sort, bubble sort and insertion sort; divide and conquer: mergesort, quicksort; introduction to graph theory; basic graph algorithms: traversals and shortest path." },
            { subject: "Database Management and Warehousing", topics: "ER-model, relational model: relational algebra, tuple calculus, SQL, integrity constraints, normal form, file organization, indexing, data types, data transformation such as normalization, discretization, sampling, compression; data warehouse modelling: schema for multidimensional data models, concept hierarchies, measures: categorization and computations." },
            { subject: "Machine Learning", topics: "Supervised Learning: regression and classification problems, simple linear regression, multiple linear regression, ridge regression, logistic regression, k-nearest neighbour, naive Bayes classifier, linear discriminant analysis, support vector machine, decision trees, bias-variance trade-off, cross-validation methods (LOO, k-folds), multi-layer perceptron, feed-forward neural network. Unsupervised Learning: clustering algorithms, k-means/k-medoid, hierarchical clustering, top-down, bottom-up: single-linkage, multiple-linkage, dimensionality reduction, principal component analysis." },
            { subject: "AI", topics: "Search: informed, uninformed, adversarial; logic: propositional, predicate; reasoning under uncertainty — conditional independence representation, exact inference through variable elimination, and approximate inference through sampling." },
          ],
          features: ["Structured Concept Delivery — Topics taught in a clear and logical sequence", "Complete CS & DA Syllabus Coverage — All subjects covered with exam-focused approach", "Practice After Every Lecture — Assignments with detailed solutions", "GATE PYQs with Explanation — Previous Year Questions with complete analysis", "High-Quality Practice Sets — Curated questions to strengthen problem-solving", "Weekly quizzes, weekly tests and DPPs", "Full-length test series", "Compact revision modules"],
          whatYouGet: ["600+ hours of LIVE classes covering both CS and DA syllabi", "Weekly tests and structured practice", "Full-length test series", "Weekly live problem-solving sessions", "Complete PYQ and practice coverage", "Compact revision modules", "Access to student discussion forum"],
          whoIsFor: ["Students preparing for both GATE CS and DA 2027", "Aspirants who want maximum flexibility across both papers", "College students balancing academics and GATE preparation", "Working professionals looking for structured preparation"],
          outcome: ["Strong conceptual clarity across all CS and DA subjects", "Improved problem-solving ability for both papers", "Familiarity with GATE exam patterns for CS and DA", "A structured approach to preparation"],

        },
      },
      {
        id: 103, tag: "PREMIUM · MENTORSHIP · GATE 2027", title: "GATE DA 2027 – Core Plus",
        subtitle: "Prof Ravindrababu Ravula · Sri Harsha Achyunthuni",
        image: "/courses/gate-da-2027-core-plus.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/10-gate-da-2027-core-plus-mentorship-program",
        description: "Includes everything in Core + personalized 1:1 mentorship and performance tracking.",
        highlights: ["Everything in DA Core", "1:1 Personalized Mentorship", "Performance Tracking"],
        price: "14,999", originalPrice: "25,000", discount: "40", color: "dark",
        details: {
          overview: "Gate DA Core Plus is a comprehensive LIVE program designed to combine complete GATE syllabus coverage with industry oriented courses, personalized mentorship and guided preparation. Along with structured classes, this program provides individual support, planning, and continuous feedback, ensuring that your preparation remains consistent, focused, and aligned with your goals throughout the journey.",
          format: ["Fully LIVE classes with structured, topic-wise delivery", "Live doubt-solving sessions", "Discussion forum for continuous interaction", "Dedicated 1:1 mentorship with regular check-ins", "Lecture notes will be provided after every lecture for revision"],
          whatYouLearn: ["Strong understanding of all GATE DA subjects", "Personalized preparation strategy", "Improved problem-solving ability with continuous feedback", "Disciplined and consistent preparation approach"],
          mentorship: [
            { title: "Personalized 1:1 Mentorship", items: ["Regular interaction with your mentor", "Discussion of progress and challenges", "Guidance tailored to your current level and needs"] },
            { title: "Structured Study Planning", items: ["Weekly study targets", "Topic prioritization based on progress", "Adjustments to maintain consistency"] },
            { title: "Performance Tracking & Feedback", items: ["Feedback on tests and quizzes", "Identification of strong and weak areas", "Clear direction on what to improve next"] },
            { title: "Priority Academic Support", items: ["Faster and focused doubt resolution", "Additional guidance whenever required", "Continuous support through the student group"] },
            { title: "Additional Support", items: ["Guided timetable support to maintain discipline", "Strategy discussions for exam approach and time management", "Ongoing academic guidance throughout the course"] },
          ],
          syllabus: [
            { subject: "Probability and Statistics", topics: "Counting (permutation and combinations), probability axioms, sample space, events, independent events, mutually exclusive events, marginal, conditional and joint probability, Bayes Theorem, conditional expectation and variance, mean, median, mode and standard deviation, correlation and covariance, random variables, discrete random variables and probability mass functions, uniform, Bernoulli, binomial distribution, continuous random variables and probability distribution function, uniform, exponential, Poisson, normal, standard normal, t-distribution, chi-squared distributions, cumulative distribution function, conditional PDF, Central limit theorem, confidence interval, z-test, t-test, chi-squared test." },
            { subject: "Linear Algebra", topics: "Vector space, subspaces, linear dependence and independence of vectors, matrices, projection matrix, orthogonal matrix, idempotent matrix, partition matrix and their properties, quadratic forms, systems of linear equations and solutions, Gaussian elimination, eigenvalues and eigenvectors, determinant, rank, nullity, projections, LU decomposition, singular value decomposition." },
            { subject: "Calculus and Optimization", topics: "Functions of a single variable, limit, continuity and differentiability, Taylor series, maxima and minima, optimization involving a single variable." },
            { subject: "Programming, Data Structures and Algorithms", topics: "Programming in Python, basic data structures: stacks, queues, linked lists, trees, hash tables; search algorithms: linear search and binary search, basic sorting algorithms: selection sort, bubble sort and insertion sort; divide and conquer: mergesort, quicksort; introduction to graph theory; basic graph algorithms: traversals and shortest path." },
            { subject: "Database Management and Warehousing", topics: "ER-model, relational model: relational algebra, tuple calculus, SQL, integrity constraints, normal form, file organization, indexing, data types, data transformation such as normalization, discretization, sampling, compression; data warehouse modelling: schema for multidimensional data models, concept hierarchies, measures: categorization and computations." },
            { subject: "Machine Learning", topics: "Supervised Learning: regression and classification problems, simple linear regression, multiple linear regression, ridge regression, logistic regression, k-nearest neighbour, naive Bayes classifier, linear discriminant analysis, support vector machine, decision trees, bias-variance trade-off, cross-validation methods (LOO, k-folds), multi-layer perceptron, feed-forward neural network. Unsupervised Learning: clustering algorithms, k-means/k-medoid, hierarchical clustering, top-down, bottom-up: single-linkage, multiple-linkage, dimensionality reduction, principal component analysis." },
            { subject: "AI", topics: "Search: informed, uninformed, adversarial; logic: propositional, predicate; reasoning under uncertainty — conditional independence representation, exact inference through variable elimination, and approximate inference through sampling." },
          ],
          dsaCoverage: ["Arrays, Strings, Linked Lists", "Stacks, Queues, Trees, Graphs", "Recursion and Backtracking", "Searching and Sorting techniques", "Greedy, Dynamic Programming, and Graph algorithms", "Problem-solving techniques and pattern recognition"],
          javaCoverage: ["Basics of Java (syntax, control structures)", "Object-Oriented Programming (OOP concepts)", "Classes, Objects, Inheritance, Polymorphism", "Exception handling and standard libraries", "Writing clean and structured code", "Applying Java for problem-solving"],
          leetcodeCoverage: ["Topic-wise problem-solving aligned with DSA concepts", "Easy to medium level problems for concept building", "Selected problems to improve logical thinking", "Approach-based problem discussion", "Focus on writing optimized and correct solutions"],
          features: ["Structured Concept Delivery — Topics taught in a clear and logical sequence", "Complete Syllabus Coverage — All subjects covered with exam-focused approach", "Practice After Every Lecture — Assignments with detailed solutions", "GATE PYQs with Analysis — Previous Year Questions with proper explanation", "High-Quality Practice Sets — Curated questions to strengthen problem-solving", "Weekly quizzes, tests and DPPs", "Full-length test series", "Compact revision modules for efficient revision"],
          whatYouGet: ["600+ hours of LIVE classes", "Weekly tests and structured practice", "Full-length test series for exam-level preparation", "Weekly live problem-solving sessions", "Complete PYQ and practice coverage", "Compact revision modules", "Personalized mentorship and performance guidance"],
          whoIsFor: ["Students who want structured preparation along with personal guidance", "Aspirants looking for continuous feedback and improvement tracking", "Those who prefer a planned and disciplined approach", "Students aiming for consistent progress throughout preparation", "Students and Professionals who are looking for job in AIML domain"],
          outcome: ["Strong conceptual clarity across all subjects", "A personalized and structured preparation approach", "Improved problem-solving ability and accuracy", "Consistent and measurable progress"],
        },
      },
      {
        id: 104, tag: "GATE 2028", title: "GATE DA Core 2028",
        subtitle: "Prof Ravindrababu Ravula",
        image: "/courses/gate da 2028 core.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/8-gate-da-core-2028",
        description: "A comprehensive LIVE program designed for serious GATE DA aspirants who want a structured, consistent, and well-guided preparation.",
        highlights: ["Complete GATE DA Syllabus", "LIVE Classes Daily", "Early Bird Advantage"],
        price: "14,999", originalPrice: "25,000", discount: "41", color: "dark",
        details: {
          overview: "This course is built to cover the entire GATE Data Science & AI syllabus through a carefully structured live learning process. Each subject is taught with emphasis on strong conceptual understanding, clarity in problem-solving, and alignment with GATE exam patterns. The goal is not just coverage, but meaningful learning and steady progress throughout the preparation cycle.",
          format: ["Fully LIVE classes with topic-wise structured delivery", "Interactive doubt-solving sessions", "Continuous academic support via discussion forum", "Lecture notes of every class will be provided after every class"],
          whatYouLearn: ["Clear understanding of core Data Science and AI concepts", "Ability to approach and solve GATE-level problems confidently", "Improved accuracy, speed, and exam temperament", "A well-defined preparation flow from start to finish"],
          syllabus: [
            { subject: "Probability and Statistics", topics: "Counting (permutation and combinations), probability axioms, sample space, events, independent events, mutually exclusive events, marginal, conditional and joint probability, Bayes Theorem, conditional expectation and variance, mean, median, mode and standard deviation, correlation and covariance, random variables, discrete random variables and probability mass functions, uniform, Bernoulli, binomial distribution, continuous random variables and probability distribution function, uniform, exponential, Poisson, normal, standard normal, t-distribution, chi-squared distributions, cumulative distribution function, conditional PDF, Central limit theorem, confidence interval, z-test, t-test, chi-squared test." },
            { subject: "Linear Algebra", topics: "Vector space, subspaces, linear dependence and independence of vectors, matrices, projection matrix, orthogonal matrix, idempotent matrix, partition matrix and their properties, quadratic forms, systems of linear equations and solutions, Gaussian elimination, eigenvalues and eigenvectors, determinant, rank, nullity, projections, LU decomposition, singular value decomposition." },
            { subject: "Calculus and Optimization", topics: "Functions of a single variable, limit, continuity and differentiability, Taylor series, maxima and minima, optimization involving a single variable." },
            { subject: "Programming, Data Structures and Algorithms", topics: "Programming in Python, basic data structures: stacks, queues, linked lists, trees, hash tables; search algorithms: linear search and binary search, basic sorting algorithms: selection sort, bubble sort and insertion sort; divide and conquer: mergesort, quicksort; introduction to graph theory; basic graph algorithms: traversals and shortest path." },
            { subject: "Database Management and Warehousing", topics: "ER-model, relational model: relational algebra, tuple calculus, SQL, integrity constraints, normal form, file organization, indexing, data types, data transformation such as normalization, discretization, sampling, compression; data warehouse modelling: schema for multidimensional data models, concept hierarchies, measures: categorization and computations." },
            { subject: "Machine Learning", topics: "Supervised Learning: regression and classification problems, simple linear regression, multiple linear regression, ridge regression, logistic regression, k-nearest neighbour, naive Bayes classifier, linear discriminant analysis, support vector machine, decision trees, bias-variance trade-off, cross-validation methods (LOO, k-folds), multi-layer perceptron, feed-forward neural network. Unsupervised Learning: clustering algorithms, k-means/k-medoid, hierarchical clustering, top-down, bottom-up: single-linkage, multiple-linkage, dimensionality reduction, principal component analysis." },
            { subject: "AI", topics: "Search: informed, uninformed, adversarial; logic: propositional, predicate; reasoning under uncertainty — conditional independence representation, exact inference through variable elimination, and approximate inference through sampling." },
          ],
          features: ["Structured Concept Delivery — Topics taught in a logical sequence ensuring continuity and depth", "Complete Syllabus Coverage — All subjects covered with focus on GATE relevance", "Practice After Every Lecture — Assignments to reinforce concepts and improve application", "GATE PYQs with Detailed Solutions — Previous Year Questions with complete explanation", "High-Quality Practice Sets — Curated questions for additional exposure", "Dedicated Doubt Resolution — Live sessions and ongoing discussion support", "Revision Support — Compact and focused revision modules"],
          whatYouGet: ["600+ hours of LIVE classes covering the complete syllabus", "Weekly tests and DPPs for continuous practice", "Full-length test series for exam-level preparation", "Weekly live problem-solving sessions", "Comprehensive practice material and PYQ coverage", "Revision modules for quick and effective review"],
          whoIsFor: ["Students preparing seriously for GATE DA 2028", "College students balancing academics with GATE preparation", "Working professionals looking for a structured and guided approach"],
          outcome: ["Strong conceptual clarity across all subjects", "Confidence in solving a wide range of GATE-level problems", "Familiarity with exam patterns and question types", "A disciplined and structured preparation approach"],
        },
      },
      {
        id: 105, tag: "COMBO · GATE 2028", title: "GATE CS & DA Core 2028",
        subtitle: "Prof Ravindrababu Ravula",
        image: "/courses/gate cs+da 2028 core.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/17-gate-cs-da-core-2028",
        description: "A comprehensive LIVE program designed to cover the complete GATE Computer Science and Data Analytics syllabus with a structured and consistent approach to learning and practice.",
        highlights: ["Complete CS + DA Syllabus", "LIVE Classes Daily", "Best Value Combo"],
        price: "22,999", originalPrice: "35,000", discount: "35", color: "accent",
        details: {
          overview: "Gate CS & DA Core is a comprehensive LIVE program designed to cover the complete GATE Computer Science and Data Analytics syllabus with a structured and consistent approach. The course provides strong conceptual understanding across both CS and DA subjects, supported by regular practice and evaluation, helping you progress steadily throughout your preparation.",
          format: ["Fully LIVE classes with topic-wise structured delivery", "Live doubt-solving sessions", "Discussion Forum group for continuous discussion and support", "Lecture notes will be provided after every lecture for revision"],
          whatYouLearn: ["Core Computer Science subjects required for GATE", "Core Data Science and AI concepts required for GATE DA", "Application of concepts through problem-solving", "Approach to solving exam-level questions", "Techniques to improve accuracy and speed"],
          subjects: ["Engineering Mathematics", "Digital Logic", "Computer Organization & Architecture", "Programming & Data Structures", "Algorithms", "Theory of Computation", "Compiler Design", "Operating Systems", "Databases", "Computer Networks", "General Aptitude"],
          csSyllabus: [
            { subject: "Engineering Mathematics", topics: "Discrete Mathematics: Propositional and first order logic, sets, relations, functions, partial orders and lattices, monoids, groups, graphs (connectivity, matching, colouring), combinatorics (counting, recurrence relations, generating functions). Linear Algebra: Matrices, determinants, system of linear equations, eigenvalues and eigenvectors, LU decomposition. Calculus: Limits, continuity and differentiability, maxima and minima, mean value theorem, integration. Probability and Statistics: Random variables, uniform, normal, exponential, Poisson and binomial distributions, mean, median, mode and standard deviation, conditional probability and Bayes theorem." },
            { subject: "Digital Logic", topics: "Boolean algebra. Combinational and sequential circuits. Minimization. Number representations and computer arithmetic (fixed and floating point)." },
            { subject: "Computer Organization & Architecture", topics: "Machine instructions and addressing modes. ALU, data-path and control unit. Instruction pipelining, pipeline hazards. Memory hierarchy: cache, main memory and secondary storage; I/O interface (interrupt and DMA mode)." },
            { subject: "Programming & Data Structures", topics: "Programming in C. Recursion. Arrays, stacks, queues, linked lists, trees, binary search trees, binary heaps, graphs." },
            { subject: "Algorithms", topics: "Searching, sorting, hashing. Asymptotic worst case time and space complexity. Algorithm design techniques: greedy, dynamic programming and divide-and-conquer. Graph traversals, minimum spanning trees, shortest paths." },
            { subject: "Theory of Computation", topics: "Regular expressions and finite automata. Context-free grammars and push-down automata. Regular and context-free languages, pumping lemma. Turing machines and undecidability." },
            { subject: "Compiler Design", topics: "Lexical analysis, parsing, syntax-directed translation. Runtime environments. Intermediate code generation. Local optimization, data flow analyses: constant propagation, liveness analysis, common sub-expression elimination." },
            { subject: "Operating Systems", topics: "System calls, processes, threads, inter-process communication, concurrency and synchronization. Deadlock. CPU and I/O scheduling. Memory management and virtual memory. File systems." },
            { subject: "Databases", topics: "ER-model. Relational model: relational algebra, tuple calculus, SQL. Integrity constraints, normal forms. File organization, indexing (e.g., B and B+ trees). Transactions and concurrency control." },
            { subject: "Computer Networks", topics: "Concept of layering: OSI and TCP/IP Protocol Stacks; basics of packet, circuit and virtual circuit-switching; Data link layer: framing, error detection, Medium Access Control, Ethernet bridging; Routing protocols: shortest path, flooding, distance vector and link state routing; Fragmentation and IP addressing, IPv4, CIDR notation, basics of IP support protocols (ARP, DHCP, ICMP), NAT; Transport layer: flow control and congestion control, UDP, TCP, sockets; Application layer protocols: DNS, SMTP, HTTP, FTP, Email." },
          ],
          syllabus: [
            { subject: "Probability and Statistics", topics: "Counting (permutation and combinations), probability axioms, sample space, events, independent events, mutually exclusive events, marginal, conditional and joint probability, Bayes Theorem, conditional expectation and variance, mean, median, mode and standard deviation, correlation and covariance, random variables, discrete random variables and probability mass functions, uniform, Bernoulli, binomial distribution, continuous random variables and probability distribution function, uniform, exponential, Poisson, normal, standard normal, t-distribution, chi-squared distributions, cumulative distribution function, conditional PDF, Central limit theorem, confidence interval, z-test, t-test, chi-squared test." },
            { subject: "Linear Algebra", topics: "Vector space, subspaces, linear dependence and independence of vectors, matrices, projection matrix, orthogonal matrix, idempotent matrix, partition matrix and their properties, quadratic forms, systems of linear equations and solutions, Gaussian elimination, eigenvalues and eigenvectors, determinant, rank, nullity, projections, LU decomposition, singular value decomposition." },
            { subject: "Calculus and Optimization", topics: "Functions of a single variable, limit, continuity and differentiability, Taylor series, maxima and minima, optimization involving a single variable." },
            { subject: "Programming, Data Structures and Algorithms", topics: "Programming in Python, basic data structures: stacks, queues, linked lists, trees, hash tables; search algorithms: linear search and binary search, basic sorting algorithms: selection sort, bubble sort and insertion sort; divide and conquer: mergesort, quicksort; introduction to graph theory; basic graph algorithms: traversals and shortest path." },
            { subject: "Database Management and Warehousing", topics: "ER-model, relational model: relational algebra, tuple calculus, SQL, integrity constraints, normal form, file organization, indexing, data types, data transformation such as normalization, discretization, sampling, compression; data warehouse modelling: schema for multidimensional data models, concept hierarchies, measures: categorization and computations." },
            { subject: "Machine Learning", topics: "Supervised Learning: regression and classification problems, simple linear regression, multiple linear regression, ridge regression, logistic regression, k-nearest neighbour, naive Bayes classifier, linear discriminant analysis, support vector machine, decision trees, bias-variance trade-off, cross-validation methods (LOO, k-folds), multi-layer perceptron, feed-forward neural network. Unsupervised Learning: clustering algorithms, k-means/k-medoid, hierarchical clustering, top-down, bottom-up: single-linkage, multiple-linkage, dimensionality reduction, principal component analysis." },
            { subject: "AI", topics: "Search: informed, uninformed, adversarial; logic: propositional, predicate; reasoning under uncertainty — conditional independence representation, exact inference through variable elimination, and approximate inference through sampling." },
          ],
          features: ["Structured Concept Delivery — Topics taught in a clear and logical sequence", "Complete CS & DA Syllabus Coverage — All subjects covered with exam-focused approach", "Practice After Every Lecture — Assignments with detailed solutions", "GATE PYQs with Explanation — Previous Year Questions with complete analysis", "High-Quality Practice Sets — Curated questions to strengthen problem-solving", "Weekly quizzes, weekly tests and DPPs", "Full-length test series", "Compact revision modules"],
          whatYouGet: ["600+ hours of LIVE classes covering both CS and DA syllabi", "Weekly tests and structured practice", "Full-length test series", "Weekly live problem-solving sessions", "Complete PYQ and practice coverage", "Compact revision modules", "Access to student discussion forum"],
          whoIsFor: ["Students preparing for both GATE CS and DA 2028", "Aspirants who want maximum flexibility across both papers", "College students balancing academics and GATE preparation", "Working professionals looking for structured preparation"],
          outcome: ["Strong conceptual clarity across all CS and DA subjects", "Improved problem-solving ability for both papers", "Familiarity with GATE exam patterns for CS and DA", "A structured approach to preparation"],

        },
      },
      {
        id: 106, tag: "PREMIUM · MENTORSHIP · GATE 2028", title: "GATE DA 2028 – Core Plus",
        subtitle: "Prof Ravindrababu Ravula · Sri Harsha Achyunthuni",
        image: "/courses/gate-da-2028-core-plus.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/11-gate-da-2028-core-plus-mentorship-program",
        description: "Includes everything in Core + personalized 1:1 mentorship and performance tracking.",
        highlights: ["Everything in DA Core", "1:1 Personalized Mentorship", "Performance Tracking"],
        price: "19,999", originalPrice: "35,000", discount: "43", color: "dark",
        details: {
          overview: "Gate DA Core Plus is a comprehensive LIVE program designed to combine complete GATE syllabus coverage with industry oriented courses, personalized mentorship and guided preparation. Along with structured classes, this program provides individual support, planning, and continuous feedback, ensuring that your preparation remains consistent, focused, and aligned with your goals throughout the journey.",
          format: ["Fully LIVE classes with structured, topic-wise delivery", "Live doubt-solving sessions", "Discussion forum for continuous interaction", "Dedicated 1:1 mentorship with regular check-ins", "Lecture notes will be provided after every lecture for revision"],
          whatYouLearn: ["Strong understanding of all GATE DA subjects", "Personalized preparation strategy", "Improved problem-solving ability with continuous feedback", "Disciplined and consistent preparation approach"],
          mentorship: [
            { title: "Personalized 1:1 Mentorship", items: ["Regular interaction with your mentor", "Discussion of progress and challenges", "Guidance tailored to your current level and needs"] },
            { title: "Structured Study Planning", items: ["Weekly study targets", "Topic prioritization based on progress", "Adjustments to maintain consistency"] },
            { title: "Performance Tracking & Feedback", items: ["Feedback on tests and quizzes", "Identification of strong and weak areas", "Clear direction on what to improve next"] },
            { title: "Priority Academic Support", items: ["Faster and focused doubt resolution", "Additional guidance whenever required", "Continuous support through the student group"] },
            { title: "Additional Support", items: ["Guided timetable support to maintain discipline", "Strategy discussions for exam approach and time management", "Ongoing academic guidance throughout the course"] },
          ],
          syllabus: [
            { subject: "Probability and Statistics", topics: "Counting (permutation and combinations), probability axioms, sample space, events, independent events, mutually exclusive events, marginal, conditional and joint probability, Bayes Theorem, conditional expectation and variance, mean, median, mode and standard deviation, correlation and covariance, random variables, discrete random variables and probability mass functions, uniform, Bernoulli, binomial distribution, continuous random variables and probability distribution function, uniform, exponential, Poisson, normal, standard normal, t-distribution, chi-squared distributions, cumulative distribution function, conditional PDF, Central limit theorem, confidence interval, z-test, t-test, chi-squared test." },
            { subject: "Linear Algebra", topics: "Vector space, subspaces, linear dependence and independence of vectors, matrices, projection matrix, orthogonal matrix, idempotent matrix, partition matrix and their properties, quadratic forms, systems of linear equations and solutions, Gaussian elimination, eigenvalues and eigenvectors, determinant, rank, nullity, projections, LU decomposition, singular value decomposition." },
            { subject: "Calculus and Optimization", topics: "Functions of a single variable, limit, continuity and differentiability, Taylor series, maxima and minima, optimization involving a single variable." },
            { subject: "Programming, Data Structures and Algorithms", topics: "Programming in Python, basic data structures: stacks, queues, linked lists, trees, hash tables; search algorithms: linear search and binary search, basic sorting algorithms: selection sort, bubble sort and insertion sort; divide and conquer: mergesort, quicksort; introduction to graph theory; basic graph algorithms: traversals and shortest path." },
            { subject: "Database Management and Warehousing", topics: "ER-model, relational model: relational algebra, tuple calculus, SQL, integrity constraints, normal form, file organization, indexing, data types, data transformation such as normalization, discretization, sampling, compression; data warehouse modelling: schema for multidimensional data models, concept hierarchies, measures: categorization and computations." },
            { subject: "Machine Learning", topics: "Supervised Learning: regression and classification problems, simple linear regression, multiple linear regression, ridge regression, logistic regression, k-nearest neighbour, naive Bayes classifier, linear discriminant analysis, support vector machine, decision trees, bias-variance trade-off, cross-validation methods (LOO, k-folds), multi-layer perceptron, feed-forward neural network. Unsupervised Learning: clustering algorithms, k-means/k-medoid, hierarchical clustering, top-down, bottom-up: single-linkage, multiple-linkage, dimensionality reduction, principal component analysis." },
            { subject: "AI", topics: "Search: informed, uninformed, adversarial; logic: propositional, predicate; reasoning under uncertainty — conditional independence representation, exact inference through variable elimination, and approximate inference through sampling." },
          ],
          dsaCoverage: ["Arrays, Strings, Linked Lists", "Stacks, Queues, Trees, Graphs", "Recursion and Backtracking", "Searching and Sorting techniques", "Greedy, Dynamic Programming, and Graph algorithms", "Problem-solving techniques and pattern recognition"],
          javaCoverage: ["Basics of Java (syntax, control structures)", "Object-Oriented Programming (OOP concepts)", "Classes, Objects, Inheritance, Polymorphism", "Exception handling and standard libraries", "Writing clean and structured code", "Applying Java for problem-solving"],
          leetcodeCoverage: ["Topic-wise problem-solving aligned with DSA concepts", "Easy to medium level problems for concept building", "Selected problems to improve logical thinking", "Approach-based problem discussion", "Focus on writing optimized and correct solutions"],
          features: ["Structured Concept Delivery — Topics taught in a clear and logical sequence", "Complete Syllabus Coverage — All subjects covered with exam-focused approach", "Practice After Every Lecture — Assignments with detailed solutions", "GATE PYQs with Analysis — Previous Year Questions with proper explanation", "High-Quality Practice Sets — Curated questions to strengthen problem-solving", "Weekly quizzes, tests and DPPs", "Full-length test series", "Compact revision modules for efficient revision"],
          whatYouGet: ["600+ hours of LIVE classes", "Weekly tests and structured practice", "Full-length test series for exam-level preparation", "Weekly live problem-solving sessions", "Complete PYQ and practice coverage", "Compact revision modules", "Personalized mentorship and performance guidance"],
          whoIsFor: ["Students who want structured preparation along with personal guidance", "Aspirants looking for continuous feedback and improvement tracking", "Those who prefer a planned and disciplined approach", "Students aiming for consistent progress throughout preparation", "Students and Professionals who are looking for job in AIML domain"],
          outcome: ["Strong conceptual clarity across all subjects", "A personalized and structured preparation approach", "Improved problem-solving ability and accuracy", "Consistent and measurable progress"],
        },
      },
      {
        id: 107, tag: "GATE 2029", title: "GATE DA Core 2029",
        subtitle: "Prof Ravindrababu Ravula",
        image: "/courses/gate da 2029 core.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/9-gate-da-core-2029",
        description: "A comprehensive LIVE program designed for serious GATE DA aspirants who want a structured, consistent, and well-guided preparation.",
        highlights: ["Complete GATE DA Syllabus", "LIVE Classes Daily", "Maximum Prep Time"],
        price: "19,999", originalPrice: "35,000", discount: "43", color: "dark",
        details: {
          overview: "This course is built to cover the entire GATE Data Science & AI syllabus through a carefully structured live learning process. Each subject is taught with emphasis on strong conceptual understanding, clarity in problem-solving, and alignment with GATE exam patterns. The goal is not just coverage, but meaningful learning and steady progress throughout the preparation cycle.",
          format: ["Fully LIVE classes with topic-wise structured delivery", "Interactive doubt-solving sessions", "Continuous academic support via discussion forum", "Lecture notes of every class will be provided after every class"],
          whatYouLearn: ["Clear understanding of core Data Science and AI concepts", "Ability to approach and solve GATE-level problems confidently", "Improved accuracy, speed, and exam temperament", "A well-defined preparation flow from start to finish"],
          syllabus: [
            { subject: "Probability and Statistics", topics: "Counting (permutation and combinations), probability axioms, sample space, events, independent events, mutually exclusive events, marginal, conditional and joint probability, Bayes Theorem, conditional expectation and variance, mean, median, mode and standard deviation, correlation and covariance, random variables, discrete random variables and probability mass functions, uniform, Bernoulli, binomial distribution, continuous random variables and probability distribution function, uniform, exponential, Poisson, normal, standard normal, t-distribution, chi-squared distributions, cumulative distribution function, conditional PDF, Central limit theorem, confidence interval, z-test, t-test, chi-squared test." },
            { subject: "Linear Algebra", topics: "Vector space, subspaces, linear dependence and independence of vectors, matrices, projection matrix, orthogonal matrix, idempotent matrix, partition matrix and their properties, quadratic forms, systems of linear equations and solutions, Gaussian elimination, eigenvalues and eigenvectors, determinant, rank, nullity, projections, LU decomposition, singular value decomposition." },
            { subject: "Calculus and Optimization", topics: "Functions of a single variable, limit, continuity and differentiability, Taylor series, maxima and minima, optimization involving a single variable." },
            { subject: "Programming, Data Structures and Algorithms", topics: "Programming in Python, basic data structures: stacks, queues, linked lists, trees, hash tables; search algorithms: linear search and binary search, basic sorting algorithms: selection sort, bubble sort and insertion sort; divide and conquer: mergesort, quicksort; introduction to graph theory; basic graph algorithms: traversals and shortest path." },
            { subject: "Database Management and Warehousing", topics: "ER-model, relational model: relational algebra, tuple calculus, SQL, integrity constraints, normal form, file organization, indexing, data types, data transformation such as normalization, discretization, sampling, compression; data warehouse modelling: schema for multidimensional data models, concept hierarchies, measures: categorization and computations." },
            { subject: "Machine Learning", topics: "Supervised Learning: regression and classification problems, simple linear regression, multiple linear regression, ridge regression, logistic regression, k-nearest neighbour, naive Bayes classifier, linear discriminant analysis, support vector machine, decision trees, bias-variance trade-off, cross-validation methods (LOO, k-folds), multi-layer perceptron, feed-forward neural network. Unsupervised Learning: clustering algorithms, k-means/k-medoid, hierarchical clustering, top-down, bottom-up: single-linkage, multiple-linkage, dimensionality reduction, principal component analysis." },
            { subject: "AI", topics: "Search: informed, uninformed, adversarial; logic: propositional, predicate; reasoning under uncertainty — conditional independence representation, exact inference through variable elimination, and approximate inference through sampling." },
          ],
          features: ["Structured Concept Delivery — Topics taught in a logical sequence ensuring continuity and depth", "Complete Syllabus Coverage — All subjects covered with focus on GATE relevance", "Practice After Every Lecture — Assignments to reinforce concepts and improve application", "GATE PYQs with Detailed Solutions — Previous Year Questions with complete explanation", "High-Quality Practice Sets — Curated questions for additional exposure", "Dedicated Doubt Resolution — Live sessions and ongoing discussion support", "Revision Support — Compact and focused revision modules"],
          whatYouGet: ["600+ hours of LIVE classes covering the complete syllabus", "Weekly tests and DPPs for continuous practice", "Full-length test series for exam-level preparation", "Weekly live problem-solving sessions", "Comprehensive practice material and PYQ coverage", "Revision modules for quick and effective review"],
          whoIsFor: ["Students preparing seriously for GATE DA 2029", "College students balancing academics with GATE preparation", "Working professionals looking for a structured and guided approach"],
          outcome: ["Strong conceptual clarity across all subjects", "Confidence in solving a wide range of GATE-level problems", "Familiarity with exam patterns and question types", "A disciplined and structured preparation approach"],
        },
      },
      {
        id: 108, tag: "COMBO · GATE 2029", title: "GATE CS & DA Core 2029",
        subtitle: "Prof Ravindrababu Ravula",
        image: "/courses/gate cs+da 2029 core.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/18-gate-cs-da-core-2029",
        description: "A comprehensive LIVE program designed to cover the complete GATE Computer Science and Data Analytics syllabus with a structured and consistent approach to learning and practice.",
        highlights: ["Complete CS + DA Syllabus", "LIVE Classes Daily", "Best Value Combo"],
        price: "28,999", originalPrice: "45,000", discount: "36", color: "accent",
        details: {
          overview: "Gate CS & DA Core is a comprehensive LIVE program designed to cover the complete GATE Computer Science and Data Analytics syllabus with a structured and consistent approach. The course provides strong conceptual understanding across both CS and DA subjects, supported by regular practice and evaluation, helping you progress steadily throughout your preparation.",
          format: ["Fully LIVE classes with topic-wise structured delivery", "Live doubt-solving sessions", "Discussion Forum group for continuous discussion and support", "Lecture notes will be provided after every lecture for revision"],
          whatYouLearn: ["Core Computer Science subjects required for GATE", "Core Data Science and AI concepts required for GATE DA", "Application of concepts through problem-solving", "Approach to solving exam-level questions", "Techniques to improve accuracy and speed"],
          subjects: ["Engineering Mathematics", "Digital Logic", "Computer Organization & Architecture", "Programming & Data Structures", "Algorithms", "Theory of Computation", "Compiler Design", "Operating Systems", "Databases", "Computer Networks", "General Aptitude"],
          csSyllabus: [
            { subject: "Engineering Mathematics", topics: "Discrete Mathematics: Propositional and first order logic, sets, relations, functions, partial orders and lattices, monoids, groups, graphs (connectivity, matching, colouring), combinatorics (counting, recurrence relations, generating functions). Linear Algebra: Matrices, determinants, system of linear equations, eigenvalues and eigenvectors, LU decomposition. Calculus: Limits, continuity and differentiability, maxima and minima, mean value theorem, integration. Probability and Statistics: Random variables, uniform, normal, exponential, Poisson and binomial distributions, mean, median, mode and standard deviation, conditional probability and Bayes theorem." },
            { subject: "Digital Logic", topics: "Boolean algebra. Combinational and sequential circuits. Minimization. Number representations and computer arithmetic (fixed and floating point)." },
            { subject: "Computer Organization & Architecture", topics: "Machine instructions and addressing modes. ALU, data-path and control unit. Instruction pipelining, pipeline hazards. Memory hierarchy: cache, main memory and secondary storage; I/O interface (interrupt and DMA mode)." },
            { subject: "Programming & Data Structures", topics: "Programming in C. Recursion. Arrays, stacks, queues, linked lists, trees, binary search trees, binary heaps, graphs." },
            { subject: "Algorithms", topics: "Searching, sorting, hashing. Asymptotic worst case time and space complexity. Algorithm design techniques: greedy, dynamic programming and divide-and-conquer. Graph traversals, minimum spanning trees, shortest paths." },
            { subject: "Theory of Computation", topics: "Regular expressions and finite automata. Context-free grammars and push-down automata. Regular and context-free languages, pumping lemma. Turing machines and undecidability." },
            { subject: "Compiler Design", topics: "Lexical analysis, parsing, syntax-directed translation. Runtime environments. Intermediate code generation. Local optimization, data flow analyses: constant propagation, liveness analysis, common sub-expression elimination." },
            { subject: "Operating Systems", topics: "System calls, processes, threads, inter-process communication, concurrency and synchronization. Deadlock. CPU and I/O scheduling. Memory management and virtual memory. File systems." },
            { subject: "Databases", topics: "ER-model. Relational model: relational algebra, tuple calculus, SQL. Integrity constraints, normal forms. File organization, indexing (e.g., B and B+ trees). Transactions and concurrency control." },
            { subject: "Computer Networks", topics: "Concept of layering: OSI and TCP/IP Protocol Stacks; basics of packet, circuit and virtual circuit-switching; Data link layer: framing, error detection, Medium Access Control, Ethernet bridging; Routing protocols: shortest path, flooding, distance vector and link state routing; Fragmentation and IP addressing, IPv4, CIDR notation, basics of IP support protocols (ARP, DHCP, ICMP), NAT; Transport layer: flow control and congestion control, UDP, TCP, sockets; Application layer protocols: DNS, SMTP, HTTP, FTP, Email." },
          ],
          syllabus: [
            { subject: "Probability and Statistics", topics: "Counting (permutation and combinations), probability axioms, sample space, events, independent events, mutually exclusive events, marginal, conditional and joint probability, Bayes Theorem, conditional expectation and variance, mean, median, mode and standard deviation, correlation and covariance, random variables, discrete random variables and probability mass functions, uniform, Bernoulli, binomial distribution, continuous random variables and probability distribution function, uniform, exponential, Poisson, normal, standard normal, t-distribution, chi-squared distributions, cumulative distribution function, conditional PDF, Central limit theorem, confidence interval, z-test, t-test, chi-squared test." },
            { subject: "Linear Algebra", topics: "Vector space, subspaces, linear dependence and independence of vectors, matrices, projection matrix, orthogonal matrix, idempotent matrix, partition matrix and their properties, quadratic forms, systems of linear equations and solutions, Gaussian elimination, eigenvalues and eigenvectors, determinant, rank, nullity, projections, LU decomposition, singular value decomposition." },
            { subject: "Calculus and Optimization", topics: "Functions of a single variable, limit, continuity and differentiability, Taylor series, maxima and minima, optimization involving a single variable." },
            { subject: "Programming, Data Structures and Algorithms", topics: "Programming in Python, basic data structures: stacks, queues, linked lists, trees, hash tables; search algorithms: linear search and binary search, basic sorting algorithms: selection sort, bubble sort and insertion sort; divide and conquer: mergesort, quicksort; introduction to graph theory; basic graph algorithms: traversals and shortest path." },
            { subject: "Database Management and Warehousing", topics: "ER-model, relational model: relational algebra, tuple calculus, SQL, integrity constraints, normal form, file organization, indexing, data types, data transformation such as normalization, discretization, sampling, compression; data warehouse modelling: schema for multidimensional data models, concept hierarchies, measures: categorization and computations." },
            { subject: "Machine Learning", topics: "Supervised Learning: regression and classification problems, simple linear regression, multiple linear regression, ridge regression, logistic regression, k-nearest neighbour, naive Bayes classifier, linear discriminant analysis, support vector machine, decision trees, bias-variance trade-off, cross-validation methods (LOO, k-folds), multi-layer perceptron, feed-forward neural network. Unsupervised Learning: clustering algorithms, k-means/k-medoid, hierarchical clustering, top-down, bottom-up: single-linkage, multiple-linkage, dimensionality reduction, principal component analysis." },
            { subject: "AI", topics: "Search: informed, uninformed, adversarial; logic: propositional, predicate; reasoning under uncertainty — conditional independence representation, exact inference through variable elimination, and approximate inference through sampling." },
          ],
          features: ["Structured Concept Delivery — Topics taught in a clear and logical sequence", "Complete CS & DA Syllabus Coverage — All subjects covered with exam-focused approach", "Practice After Every Lecture — Assignments with detailed solutions", "GATE PYQs with Explanation — Previous Year Questions with complete analysis", "High-Quality Practice Sets — Curated questions to strengthen problem-solving", "Weekly quizzes, weekly tests and DPPs", "Full-length test series", "Compact revision modules"],
          whatYouGet: ["600+ hours of LIVE classes covering both CS and DA syllabi", "Weekly tests and structured practice", "Full-length test series", "Weekly live problem-solving sessions", "Complete PYQ and practice coverage", "Compact revision modules", "Access to student discussion forum"],
          whoIsFor: ["Students preparing for both GATE CS and DA 2029", "Aspirants who want maximum flexibility across both papers", "College students balancing academics and GATE preparation", "Working professionals looking for structured preparation"],
          outcome: ["Strong conceptual clarity across all CS and DA subjects", "Improved problem-solving ability for both papers", "Familiarity with GATE exam patterns for CS and DA", "A structured approach to preparation"],

        },
      },
      {
        id: 109, tag: "PREMIUM · MENTORSHIP · GATE 2029", title: "GATE DA 2029 – Core Plus",
        subtitle: "Prof Ravindrababu Ravula · Sri Harsha Achyunthuni",
        image: "/courses/gate-da-2029-core-plus.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/12-gate-da-2029-core-plus-mentorship-program",
        description: "Includes everything in Core + personalized 1:1 mentorship and performance tracking.",
        highlights: ["Everything in DA Core", "1:1 Personalized Mentorship", "Performance Tracking"],
        price: "24,999", originalPrice: "45,000", discount: "44", color: "dark",
        details: {
          overview: "Gate DA Core Plus is a comprehensive LIVE program designed to combine complete GATE syllabus coverage with industry oriented courses, personalized mentorship and guided preparation. Along with structured classes, this program provides individual support, planning, and continuous feedback, ensuring that your preparation remains consistent, focused, and aligned with your goals throughout the journey.",
          format: ["Fully LIVE classes with structured, topic-wise delivery", "Live doubt-solving sessions", "Discussion forum for continuous interaction", "Dedicated 1:1 mentorship with regular check-ins", "Lecture notes will be provided after every lecture for revision"],
          whatYouLearn: ["Strong understanding of all GATE DA subjects", "Personalized preparation strategy", "Improved problem-solving ability with continuous feedback", "Disciplined and consistent preparation approach"],
          mentorship: [
            { title: "Personalized 1:1 Mentorship", items: ["Regular interaction with your mentor", "Discussion of progress and challenges", "Guidance tailored to your current level and needs"] },
            { title: "Structured Study Planning", items: ["Weekly study targets", "Topic prioritization based on progress", "Adjustments to maintain consistency"] },
            { title: "Performance Tracking & Feedback", items: ["Feedback on tests and quizzes", "Identification of strong and weak areas", "Clear direction on what to improve next"] },
            { title: "Priority Academic Support", items: ["Faster and focused doubt resolution", "Additional guidance whenever required", "Continuous support through the student group"] },
            { title: "Additional Support", items: ["Guided timetable support to maintain discipline", "Strategy discussions for exam approach and time management", "Ongoing academic guidance throughout the course"] },
          ],
          syllabus: [
            { subject: "Probability and Statistics", topics: "Counting (permutation and combinations), probability axioms, sample space, events, independent events, mutually exclusive events, marginal, conditional and joint probability, Bayes Theorem, conditional expectation and variance, mean, median, mode and standard deviation, correlation and covariance, random variables, discrete random variables and probability mass functions, uniform, Bernoulli, binomial distribution, continuous random variables and probability distribution function, uniform, exponential, Poisson, normal, standard normal, t-distribution, chi-squared distributions, cumulative distribution function, conditional PDF, Central limit theorem, confidence interval, z-test, t-test, chi-squared test." },
            { subject: "Linear Algebra", topics: "Vector space, subspaces, linear dependence and independence of vectors, matrices, projection matrix, orthogonal matrix, idempotent matrix, partition matrix and their properties, quadratic forms, systems of linear equations and solutions, Gaussian elimination, eigenvalues and eigenvectors, determinant, rank, nullity, projections, LU decomposition, singular value decomposition." },
            { subject: "Calculus and Optimization", topics: "Functions of a single variable, limit, continuity and differentiability, Taylor series, maxima and minima, optimization involving a single variable." },
            { subject: "Programming, Data Structures and Algorithms", topics: "Programming in Python, basic data structures: stacks, queues, linked lists, trees, hash tables; search algorithms: linear search and binary search, basic sorting algorithms: selection sort, bubble sort and insertion sort; divide and conquer: mergesort, quicksort; introduction to graph theory; basic graph algorithms: traversals and shortest path." },
            { subject: "Database Management and Warehousing", topics: "ER-model, relational model: relational algebra, tuple calculus, SQL, integrity constraints, normal form, file organization, indexing, data types, data transformation such as normalization, discretization, sampling, compression; data warehouse modelling: schema for multidimensional data models, concept hierarchies, measures: categorization and computations." },
            { subject: "Machine Learning", topics: "Supervised Learning: regression and classification problems, simple linear regression, multiple linear regression, ridge regression, logistic regression, k-nearest neighbour, naive Bayes classifier, linear discriminant analysis, support vector machine, decision trees, bias-variance trade-off, cross-validation methods (LOO, k-folds), multi-layer perceptron, feed-forward neural network. Unsupervised Learning: clustering algorithms, k-means/k-medoid, hierarchical clustering, top-down, bottom-up: single-linkage, multiple-linkage, dimensionality reduction, principal component analysis." },
            { subject: "AI", topics: "Search: informed, uninformed, adversarial; logic: propositional, predicate; reasoning under uncertainty — conditional independence representation, exact inference through variable elimination, and approximate inference through sampling." },
          ],
          dsaCoverage: ["Arrays, Strings, Linked Lists", "Stacks, Queues, Trees, Graphs", "Recursion and Backtracking", "Searching and Sorting techniques", "Greedy, Dynamic Programming, and Graph algorithms", "Problem-solving techniques and pattern recognition"],
          javaCoverage: ["Basics of Java (syntax, control structures)", "Object-Oriented Programming (OOP concepts)", "Classes, Objects, Inheritance, Polymorphism", "Exception handling and standard libraries", "Writing clean and structured code", "Applying Java for problem-solving"],
          leetcodeCoverage: ["Topic-wise problem-solving aligned with DSA concepts", "Easy to medium level problems for concept building", "Selected problems to improve logical thinking", "Approach-based problem discussion", "Focus on writing optimized and correct solutions"],
          features: ["Structured Concept Delivery — Topics taught in a clear and logical sequence", "Complete Syllabus Coverage — All subjects covered with exam-focused approach", "Practice After Every Lecture — Assignments with detailed solutions", "GATE PYQs with Analysis — Previous Year Questions with proper explanation", "High-Quality Practice Sets — Curated questions to strengthen problem-solving", "Weekly quizzes, tests and DPPs", "Full-length test series", "Compact revision modules for efficient revision"],
          whatYouGet: ["600+ hours of LIVE classes", "Weekly tests and structured practice", "Full-length test series for exam-level preparation", "Weekly live problem-solving sessions", "Complete PYQ and practice coverage", "Compact revision modules", "Personalized mentorship and performance guidance"],
          whoIsFor: ["Students who want structured preparation along with personal guidance", "Aspirants looking for continuous feedback and improvement tracking", "Those who prefer a planned and disciplined approach", "Students aiming for consistent progress throughout preparation", "Students and Professionals who are looking for job in AIML domain"],
          outcome: ["Strong conceptual clarity across all subjects", "A personalized and structured preparation approach", "Improved problem-solving ability and accuracy", "Consistent and measurable progress"],
        },
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
        image: "/courses/ugc net dec 2026.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/13-ugc-net-dec-2026",
        description: "A structured LIVE program designed to cover the complete UGC NET syllabus with a focus on concept clarity, answer writing, and exam-oriented preparation.",
        highlights: ["Complete UGC NET Syllabus", "LIVE Classes Daily", "Concept Clarity Focus"],
        price: "15,999", originalPrice: "25,000", discount: "34", color: "dark",
        details: {
          overview: "This course is designed to provide comprehensive coverage of the UGC NET syllabus through a structured and consistent learning approach. The focus is on building strong conceptual understanding, clarity in theoretical topics, and ability to approach exam-level questions with confidence. The preparation is guided in a way that ensures steady progress and effective revision throughout the course.",
          format: ["Fully LIVE classes with topic-wise structured delivery", "Live doubt-solving sessions", "Discussion Forum for continuous discussion and support"],
          whatYouLearn: ["Core concepts required for UGC NET", "Understanding of important topics and exam patterns", "Techniques for solving objective questions", "Approach to improve accuracy and time management"],
          subjects: ["Paper 1 (General Aptitude)", "Paper 2 (Subject-specific topics)"],
          features: ["Complete Syllabus Coverage — All topics covered in structured, exam-focused manner", "Concept-Based Teaching — Topics explained clearly for proper understanding and retention", "Practice After Every Lecture — Assignments with detailed solutions", "Previous Year Questions (PYQs) — Discussed with explanation and pattern analysis", "Practice Sets — Additional questions to strengthen preparation", "Weekly quizzes and practice tests", "Full-length mock tests", "Compact revision modules for quick review"],
          whatYouGet: ["Complete LIVE syllabus coverage", "Weekly tests and practice material", "Full-length mock tests", "PYQ discussion and analysis", "Practice sets with solutions", "Revision modules", "Access to discussion forum"],
          whoIsFor: ["Students preparing for UGC NET", "Aspirants aiming for structured and consistent preparation", "Those looking for concept clarity and exam-focused learning", "Students who want guided preparation with regular evaluation"],
          outcome: ["Clear understanding of all major topics", "Strong conceptual foundation", "Improved accuracy in solving questions", "Familiarity with exam pattern and question types"],

        },
      },
      {
        id: 14, tag: "JUNE 2027", title: "UGC NET June 2027",
        subtitle: "Prof Ravindrababu Ravula",
        image: "/courses/ugc net june 2027.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/14-ugc-net-june-2027",
        description: "A structured LIVE program designed to cover the complete UGC NET syllabus with a focus on concept clarity, answer writing, and exam-oriented preparation.",
        highlights: ["Complete UGC NET Syllabus", "LIVE Classes Daily", "Concept Clarity Focus"],
        price: "20,999", originalPrice: "35,000", discount: "40", color: "dark",
        details: {
          overview: "This course is designed to provide comprehensive coverage of the UGC NET syllabus through a structured and consistent learning approach. The focus is on building strong conceptual understanding, clarity in theoretical topics, and ability to approach exam-level questions with confidence. The preparation is guided in a way that ensures steady progress and effective revision throughout the course.",
          format: ["Fully LIVE classes with topic-wise structured delivery", "Live doubt-solving sessions", "Discussion Forum for continuous discussion and support"],
          whatYouLearn: ["Core concepts required for UGC NET", "Understanding of important topics and exam patterns", "Techniques for solving objective questions", "Approach to improve accuracy and time management"],
          subjects: ["Paper 1 (General Aptitude)", "Paper 2 (Subject-specific topics)"],
          features: ["Complete Syllabus Coverage — All topics covered in structured, exam-focused manner", "Concept-Based Teaching — Topics explained clearly for proper understanding and retention", "Practice After Every Lecture — Assignments with detailed solutions", "Previous Year Questions (PYQs) — Discussed with explanation and pattern analysis", "Practice Sets — Additional questions to strengthen preparation", "Weekly quizzes and practice tests", "Full-length mock tests", "Compact revision modules for quick review"],
          whatYouGet: ["Complete LIVE syllabus coverage", "Weekly tests and practice material", "Full-length mock tests", "PYQ discussion and analysis", "Practice sets with solutions", "Revision modules", "Access to discussion forum"],
          whoIsFor: ["Students preparing for UGC NET", "Aspirants aiming for structured and consistent preparation", "Those looking for concept clarity and exam-focused learning", "Students who want guided preparation with regular evaluation"],
          outcome: ["Clear understanding of all major topics", "Strong conceptual foundation", "Improved accuracy in solving questions", "Familiarity with exam pattern and question types"],

        },
      },
    ],
  },
  {
    key: "dsa",
    label: "DSA with Java",
    heading: "DSA with Java",
    description: "Build strong foundations in Data Structures, Java programming, and LeetCode problem solving. Recorded classes — learn at your own pace.",
    count: 1,
    courses: [
      {
        id: 201, tag: "RECORDED", title: "DSA with Java & LeetCode Problems",
        subtitle: "Prof Ravindrababu Ravula · Syed Peera Saheb",
        image: "/courses/dsa with java.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/15-dsa-with-java-leet-code-problems",
        description: "A structured recorded program designed to build strong foundations in Data Structures, Java programming, and problem-solving through LeetCode, with a focus on practical coding skills and logical thinking.",
        highlights: ["Data Structures & Algorithms", "Java Programming", "LeetCode Problems", "Recorded Classes"],
        price: "6,999", originalPrice: "9,999", discount: "31", color: "dark",
        details: {
          overview: "This course is designed to help you develop problem-solving ability from basics to a confident level, using Java as the primary language. The program focuses on understanding core data structures, applying algorithms effectively, and solving problems with a clear approach. Along with concepts, you will practice through curated problems and guided coding sessions, ensuring steady improvement.",
          format: ["Recorded sessions covering concepts and implementation", "Guided problem-solving classes", "Practice assignments and coding exercises", "Continuous support through a student discussion group", "Learn at your own pace — access anytime"],
          whatYouLearn: ["Fundamentals of Data Structures and Algorithms", "Writing clean and structured Java code", "Approach to solving coding problems", "Techniques to improve logical thinking and efficiency"],
          dsaCoverage: ["Arrays and Strings", "Linked Lists", "Stacks and Queues", "Trees and Graphs", "Recursion and Backtracking", "Searching and Sorting", "Greedy Algorithms", "Dynamic Programming", "Problem-solving patterns"],
          javaCoverage: ["Basics of Java and syntax", "Control structures and functions", "Object-Oriented Programming (OOP)", "Classes, Objects, Inheritance, Polymorphism", "Exception handling", "Writing structured and maintainable code"],
          leetcodeCoverage: ["Topic-wise problem practice", "Easy to medium level problems", "Selected problems for concept clarity", "Focus on approach and optimization", "Improving speed and accuracy"],
          features: ["Concept + Implementation Approach — Each topic taught with coding implementation", "Guided Problem Solving — Problems solved step-by-step for clarity", "Practice After Every Session — Assignments to reinforce concepts", "Coding-Focused Learning — Emphasis on writing code, not just theory", "Progressive Difficulty — Problems increase as understanding improves"],
          whatYouGet: ["100 hours of recorded classes", "Concept explanations with coding implementation", "Practice problems and assignments", "LeetCode problem-solving sessions", "Java-based coding approach", "Access to student discussion group"],
          whoIsFor: ["Students starting with Data Structures and Algorithms", "Those who want to improve coding skills using Java", "College students preparing for placements", "Beginners looking for a structured approach to problem-solving"],
          outcome: ["Strong foundation in Data Structures and Algorithms", "Ability to solve problems on platforms like LeetCode", "Confidence in writing Java programs", "Improved logical thinking and coding approach"],
        },
      },
      /* ──────────────────────────────────────────────────────────────
         Algorithms to AI Accelerator (DSA + AIML) — hidden for now.
         Kept here (commented out) so it can be re-enabled in the future
         without re-typing the full content.
         ──────────────────────────────────────────────────────────────
      {
        id: 202, tag: "DSA + AI/ML", title: "Algorithms to AI Accelerator (DSA + AIML)",
        subtitle: "Prof Ravindrababu Ravula · Sri Harsha Achyuthuni · Syed Peera Saheb",
        image: "/courses/algorithms-to-ai.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/20-algorithms-to-ai-accelerator-dsa-aiml",
        description: "An implementation-focused LIVE program combining DSA with AI & ML. Industry-oriented, hands-on, and application-focused with depth and projects.",
        highlights: ["DSA + AI/ML Combined", "3 Expert Instructors", "Hands-on Projects"],
        price: "45,999", originalPrice: "65,000", discount: "30", color: "accent",
        details: {
          overview: "Algorithms to AI Accelerator is a comprehensive LIVE program that combines strong foundations in Data Structures, Algorithms, and Java programming with practical, industry-oriented AI & ML skills. The course takes you from coding fundamentals through DSA problem-solving to building and deploying real-world AI and Machine Learning systems, ensuring both technical depth and practical application.",
          format: ["Structured sessions covering DSA concepts and implementation", "Fully LIVE AI/ML sessions with hands-on coding", "Guided problem-solving and LeetCode practice", "Real-world case studies across multiple domains", "Continuous support through student discussion groups"],
          whatYouLearn: ["Fundamentals of Data Structures and Algorithms", "Writing clean and structured Java code", "Approach to solving coding problems on LeetCode", "Foundations of Data Science and Machine Learning", "Building and evaluating ML models", "Developing AI-powered applications", "Deploying models and systems"],
          dsaCoverage: ["Arrays and Strings", "Linked Lists", "Stacks and Queues", "Trees and Graphs", "Recursion and Backtracking", "Searching and Sorting", "Greedy Algorithms", "Dynamic Programming", "Problem-solving patterns"],
          javaCoverage: ["Basics of Java and syntax", "Control structures and functions", "Object-Oriented Programming (OOP)", "Classes, Objects, Inheritance, Polymorphism", "Exception handling", "Writing structured and maintainable code"],
          leetcodeCoverage: ["Topic-wise problem practice", "Easy to medium level problems", "Selected problems for concept clarity", "Focus on approach and optimization", "Improving speed and accuracy"],
          programStructure: [
            { title: "Programming & Data Handling", items: ["Python fundamentals for data", "Data structures and OOP", "NumPy, Pandas, and data handling", "Version control using Git", "Basic application deployment"] },
            { title: "Data Analysis & Visualization", items: ["Matplotlib, Seaborn, Plotly", "Data storytelling and interpretation", "Exploratory data analysis techniques"] },
            { title: "Statistics & Mathematics", items: ["Descriptive statistics and probability", "Hypothesis testing and experimentation", "Linear algebra concepts for ML"] },
            { title: "Data Preparation & SQL", items: ["SQL queries and data manipulation", "Feature engineering", "Handling missing and imbalanced data"] },
            { title: "Machine Learning Models", items: ["Regression and classification techniques", "Decision trees and ensemble methods", "Model evaluation and interpretation"] },
            { title: "Advanced ML Systems", items: ["Cross-validation and tuning", "Model selection and optimization", "Real-world ML system design"] },
            { title: "Time Series & Forecasting", items: ["Trend, seasonality, and forecasting models", "ARIMA and smoothing techniques", "Real-world forecasting use cases"] },
            { title: "Deep Learning", items: ["Neural networks and backpropagation", "RNN, LSTM, and autoencoders", "Applied deep learning systems"] },
            { title: "Optimization & Clustering", items: ["Linear programming and constraints", "Clustering techniques and segmentation", "Real-world optimization problems"] },
            { title: "Generative AI", items: ["Large Language Models and embeddings", "Prompt engineering and RAG pipelines", "Building AI-powered applications"] },
            { title: "Agentic AI Systems", items: ["Multi-agent workflows", "Tool usage and orchestration", "Building intelligent agents"] },
            { title: "Deployment & MLOps", items: ["Model deployment using Streamlit and Flask", "Cloud basics (AWS, Azure, GCP)", "Model monitoring and evaluation"] },
            { title: "Capstone Project", items: ["End-to-end project covering data processing → modeling → deployment"] },
          ],
          features: ["Concept + Implementation Approach — Each DSA topic taught with coding implementation", "Guided Problem Solving — Problems solved step-by-step for clarity", "Hands-On AI/ML Learning — Every concept supported with implementation and coding", "Real-World Case Studies — Practical scenarios across finance, healthcare, retail, and more", "End-to-End Approach — Complete pipeline from raw data to deployed systems", "Progressive Difficulty — Problems increase as understanding improves", "Practice After Every Session — Assignments to reinforce concepts"],
          whatYouGet: ["100+ hours of DSA + Java + LeetCode structured learning", "Structured LIVE AI/ML sessions across all modules", "Concept explanations with coding implementation", "Practice problems, assignments, and LeetCode sessions", "Real-world case studies and capstone project", "Continuous learning support and discussion group"],
          whoIsFor: ["Students who want both strong DSA foundations and AI/ML skills", "Those preparing for tech interviews at product-based companies", "College students looking for a comprehensive skill-building program", "Beginners who want to go from coding fundamentals to AI/ML applications", "Working professionals exploring AI applications alongside coding skills"],
          outcome: ["Strong foundation in Data Structures and Algorithms", "Ability to solve problems on platforms like LeetCode", "Confidence in writing Java programs", "Work with real-world datasets confidently", "Build and evaluate machine learning models", "Develop and deploy AI-based applications"],
        },
      },
      */
    ],
  },
  {
    key: "aiml",
    label: "AI & ML",
    heading: "AI & ML Course",
    description: "Industry-oriented, hands-on programs designed to build real-world AI, Machine Learning skills with depth and projects.",
    count: 1,
    courses: [
      {
        id: 301, tag: "HANDS-ON", title: "Practical AI & ML Program",
        subtitle: "Prof Ravindrababu Ravula · Sri Harsha Achyuthuni",
        image: "/courses/practical ai ml program.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/19-practical-ai-ml-program",
        description: "An implementation-focused LIVE program designed to build real-world AI & ML skills. Industry-oriented, hands-on, and application-focused with depth and projects.",
        highlights: ["Real-World Projects", "Hands-on Implementation", "Industry-Oriented"],
        price: "39,999", originalPrice: "55,999", discount: "29", color: "accent",
        details: {
          overview: "This program is designed to provide a practical and application-oriented approach to Artificial Intelligence and Machine Learning, focusing on building real systems rather than only studying theory. The course avoids heavy mathematical derivations and instead emphasizes understanding concepts through intuition, applying them to real-world problems, and building end-to-end ML and AI systems. You will learn how to move from data → model → deployment, with continuous hands-on practice throughout the program.",
          format: ["Fully LIVE sessions with structured module-wise delivery", "Hands-on coding and implementation", "Case studies across real-world domains", "Continuous support through discussion groups"],
          whatYouLearn: ["Foundations of Data Science and Machine Learning", "Building and evaluating ML models", "Working with real-world datasets", "Developing AI-powered applications", "Deploying models and systems"],
          programStructure: [
            { title: "Programming & Data Handling", items: ["Python fundamentals for data", "Data structures and OOP", "NumPy, Pandas, and data handling", "Version control using Git", "Basic application deployment"] },
            { title: "Data Analysis & Visualization", items: ["Matplotlib, Seaborn, Plotly", "Data storytelling and interpretation", "Exploratory data analysis techniques"] },
            { title: "Statistics & Mathematics", items: ["Descriptive statistics and probability", "Hypothesis testing and experimentation", "Linear algebra concepts for ML"] },
            { title: "Data Preparation & SQL", items: ["SQL queries and data manipulation", "Feature engineering", "Handling missing and imbalanced data"] },
            { title: "Machine Learning Models", items: ["Regression and classification techniques", "Decision trees and ensemble methods", "Model evaluation and interpretation"] },
            { title: "Advanced ML Systems", items: ["Cross-validation and tuning", "Model selection and optimization", "Real-world ML system design"] },
            { title: "Time Series & Forecasting", items: ["Trend, seasonality, and forecasting models", "ARIMA and smoothing techniques", "Real-world forecasting use cases"] },
            { title: "Deep Learning", items: ["Neural networks and backpropagation", "RNN, LSTM, and autoencoders", "Applied deep learning systems"] },
            { title: "Optimization & Clustering", items: ["Linear programming and constraints", "Clustering techniques and segmentation", "Real-world optimization problems"] },
            { title: "Generative AI", items: ["Large Language Models and embeddings", "Prompt engineering and RAG pipelines", "Building AI-powered applications"] },
            { title: "Agentic AI Systems", items: ["Multi-agent workflows", "Tool usage and orchestration", "Building intelligent agents"] },
            { title: "Deployment & MLOps", items: ["Model deployment using Streamlit and Flask", "Cloud basics (AWS, Azure, GCP)", "Model monitoring and evaluation"] },
            { title: "Capstone Project", items: ["End-to-end project covering data processing → modeling → deployment"] },
          ],
          features: ["Hands-On Learning — Every concept supported with implementation and coding", "Real-World Case Studies — Practical scenarios across finance, healthcare, retail, and more", "End-to-End Approach — Complete pipeline from raw data to deployed systems", "Industry-Relevant Skills — Tools and techniques used in real-world AI/ML applications"],
          whatYouGet: ["Structured LIVE sessions across all modules", "Hands-on coding and implementation practice", "Real-world case studies", "Capstone project", "Continuous learning support"],
          whoIsFor: ["Students interested in AI and Machine Learning", "Beginners looking for a practical learning approach", "Working professionals exploring AI applications", "Anyone who wants to build real-world ML systems"],
          outcome: ["Work with real-world datasets confidently", "Build and evaluate machine learning models", "Develop AI-based applications", "Deploy and manage ML systems", "Understand modern AI tools and workflows"],
        },
      },
      /* ──────────────────────────────────────────────────────────────
         Algorithms to AI Accelerator (DSA + AIML) — hidden for now.
         Kept here (commented out) so it can be re-enabled in the future
         without re-typing the full content.
         ──────────────────────────────────────────────────────────────
      {
        id: 302, tag: "PREMIUM · DSA + AI/ML", title: "Algorithms to AI Accelerator (DSA + AIML)",
        subtitle: "Prof Ravindrababu Ravula · Sri Harsha Achyuthuni · Syed Peera Saheb",
        image: "/courses/algorithms-to-ai.jpg",
        link: "https://courses.ravindrababuravula.in/new-courses/20-algorithms-to-ai-accelerator-dsa-aiml",
        description: "An implementation-focused LIVE program combining DSA with AI & ML. More industry-oriented, more hands-on and application-focused with premium depth and projects.",
        highlights: ["DSA + AI/ML Combined", "3 Expert Instructors", "Hands-on Projects"],
        price: "45,999", originalPrice: "65,000", discount: "30", color: "accent",
        details: {
          overview: "Algorithms to AI Accelerator is a comprehensive LIVE program that combines strong foundations in Data Structures, Algorithms, and Java programming with practical, industry-oriented AI & ML skills. The course takes you from coding fundamentals through DSA problem-solving to building and deploying real-world AI and Machine Learning systems, ensuring both technical depth and practical application.",
          format: ["Structured sessions covering DSA concepts and implementation", "Fully LIVE AI/ML sessions with hands-on coding", "Guided problem-solving and LeetCode practice", "Real-world case studies across multiple domains", "Continuous support through student discussion groups"],
          whatYouLearn: ["Fundamentals of Data Structures and Algorithms", "Writing clean and structured Java code", "Approach to solving coding problems on LeetCode", "Foundations of Data Science and Machine Learning", "Building and evaluating ML models", "Developing AI-powered applications", "Deploying models and systems"],
          dsaCoverage: ["Arrays and Strings", "Linked Lists", "Stacks and Queues", "Trees and Graphs", "Recursion and Backtracking", "Searching and Sorting", "Greedy Algorithms", "Dynamic Programming", "Problem-solving patterns"],
          javaCoverage: ["Basics of Java and syntax", "Control structures and functions", "Object-Oriented Programming (OOP)", "Classes, Objects, Inheritance, Polymorphism", "Exception handling", "Writing structured and maintainable code"],
          leetcodeCoverage: ["Topic-wise problem practice", "Easy to medium level problems", "Selected problems for concept clarity", "Focus on approach and optimization", "Improving speed and accuracy"],
          programStructure: [
            { title: "Programming & Data Handling", items: ["Python fundamentals for data", "Data structures and OOP", "NumPy, Pandas, and data handling", "Version control using Git", "Basic application deployment"] },
            { title: "Data Analysis & Visualization", items: ["Matplotlib, Seaborn, Plotly", "Data storytelling and interpretation", "Exploratory data analysis techniques"] },
            { title: "Statistics & Mathematics", items: ["Descriptive statistics and probability", "Hypothesis testing and experimentation", "Linear algebra concepts for ML"] },
            { title: "Data Preparation & SQL", items: ["SQL queries and data manipulation", "Feature engineering", "Handling missing and imbalanced data"] },
            { title: "Machine Learning Models", items: ["Regression and classification techniques", "Decision trees and ensemble methods", "Model evaluation and interpretation"] },
            { title: "Advanced ML Systems", items: ["Cross-validation and tuning", "Model selection and optimization", "Real-world ML system design"] },
            { title: "Time Series & Forecasting", items: ["Trend, seasonality, and forecasting models", "ARIMA and smoothing techniques", "Real-world forecasting use cases"] },
            { title: "Deep Learning", items: ["Neural networks and backpropagation", "RNN, LSTM, and autoencoders", "Applied deep learning systems"] },
            { title: "Optimization & Clustering", items: ["Linear programming and constraints", "Clustering techniques and segmentation", "Real-world optimization problems"] },
            { title: "Generative AI", items: ["Large Language Models and embeddings", "Prompt engineering and RAG pipelines", "Building AI-powered applications"] },
            { title: "Agentic AI Systems", items: ["Multi-agent workflows", "Tool usage and orchestration", "Building intelligent agents"] },
            { title: "Deployment & MLOps", items: ["Model deployment using Streamlit and Flask", "Cloud basics (AWS, Azure, GCP)", "Model monitoring and evaluation"] },
            { title: "Capstone Project", items: ["End-to-end project covering data processing → modeling → deployment"] },
          ],
          features: ["Concept + Implementation Approach — Each DSA topic taught with coding implementation", "Guided Problem Solving — Problems solved step-by-step for clarity", "Hands-On AI/ML Learning — Every concept supported with implementation and coding", "Real-World Case Studies — Practical scenarios across finance, healthcare, retail, and more", "End-to-End Approach — Complete pipeline from raw data to deployed systems", "Progressive Difficulty — Problems increase as understanding improves", "Practice After Every Session — Assignments to reinforce concepts"],
          whatYouGet: ["100+ hours of DSA + Java + LeetCode structured learning", "Structured LIVE AI/ML sessions across all modules", "Concept explanations with coding implementation", "Practice problems, assignments, and LeetCode sessions", "Real-world case studies and capstone project", "Continuous learning support and discussion group"],
          whoIsFor: ["Students who want both strong DSA foundations and AI/ML skills", "Those preparing for tech interviews at product-based companies", "College students looking for a comprehensive skill-building program", "Beginners who want to go from coding fundamentals to AI/ML applications", "Working professionals exploring AI applications alongside coding skills"],
          outcome: ["Strong foundation in Data Structures and Algorithms", "Ability to solve problems on platforms like LeetCode", "Confidence in writing Java programs", "Work with real-world datasets confidently", "Build and evaluate machine learning models", "Develop and deploy AI-based applications"],
        },
      },
      */
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

/* ── Close Icon ── */
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ── Detail Section Helper ── */
const DetailSection = ({ title, items, icon = "check" }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="cp-modal-detail-section">
      <div className="cp-modal-section-label">{title}</div>
      <div className="cp-modal-detail-list">
        {items.map((item, i) => (
          <div className="cp-modal-detail-item" key={i}>
            {icon === "check" ? <CheckIcon /> : <span className="cp-modal-bullet" />}
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Course Detail Modal ── */
function CourseModal({ course, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!course) return null;
  const d = course.details;

  return (
    <div className="cp-modal-overlay" onClick={onClose}>
      <div className="cp-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="cp-modal-close" onClick={onClose}><CloseIcon /></button>

        {/* Banner */}
        {course.image && (
          <div className="cp-modal-banner">
            <img src={`${course.image}?v=3`} alt={course.title} />
          </div>
        )}

        {/* Content */}
        <div className="cp-modal-content">
          {/* Tag */}
          <div className="cp-modal-tag">{course.tag}</div>

          {/* Title & Subtitle */}
          <h2 className="cp-modal-title">{course.title}</h2>
          <p className="cp-modal-subtitle">
            Instructor: <strong>{course.subtitle}</strong>
          </p>

          {/* Price Section — at the top for visibility */}
          <div className="cp-modal-price-section">
            <div className="cp-modal-price-left">
              <div className="cp-modal-price">{course.isFree ? "FREE" : `₹${course.price}`}</div>
              {!course.isFree && course.originalPrice && course.originalPrice !== "0" && (
                <>
                  <div className="cp-modal-original-price">₹{course.originalPrice}</div>
                  <div className="cp-modal-discount">{course.discount}% off</div>
                </>
              )}
            </div>
            {!course.isFree && <div className="cp-modal-gst">+ 18% GST</div>}
          </div>

          {/* CTA — at top */}
          <a
            href={course.link}
            target="_blank"
            rel="noopener noreferrer"
            className="cp-modal-enroll"
          >
            Enroll Now <ArrowIcon />
          </a>

          {/* Description */}
          <p className="cp-modal-desc">{course.description}</p>




          {/* If full details exist, show them */}
          {d ? (
            <>
              {/* Course Overview */}
              <div className="cp-modal-detail-section">
                <div className="cp-modal-section-label">Course Overview</div>
                <p className="cp-modal-desc" style={{ whiteSpace: "pre-line" }}>{d.overview}</p>
              </div>

              {/* Course Format */}
              <DetailSection title="Course Format" items={d.format} />

              {/* What You Will Gain / Learn */}
              <DetailSection title={course.id === "super100" ? "What You Will Gain" : "What You Will Learn"} items={d.whatYouLearn} />

              {/* Academic Coverage heading for super100 */}
              {course.id === "super100" && (
                <div className="cp-modal-detail-section">
                  <div className="cp-modal-section-label">Academic Coverage</div>
                </div>
              )}

              {/* GATE CS Subjects (chip style) */}
              {d.subjects && (
                <div className="cp-modal-detail-section">
                  <div className="cp-modal-section-label">GATE CS Subjects</div>
                  <div className="cp-modal-subjects-grid">
                    {d.subjects.map((s, i) => (
                      <div className="cp-modal-subject-chip" key={i}>{s}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* CS Detailed Syllabus */}
              {d.csSyllabus && (
                <div className="cp-modal-detail-section">
                  <div className="cp-modal-section-label">GATE CS Detailed Syllabus</div>
                  <div className="cp-modal-syllabus">
                    {d.csSyllabus.map((item, i) => (
                      <div className="cp-modal-syllabus-item" key={i}>
                        <h4 className="cp-modal-syllabus-subject">{item.subject}</h4>
                        <p className="cp-modal-syllabus-topics">{item.topics}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Data Science & AI Subjects (chip style) + full syllabus */}
              {d.daSubjects && (
                <div className="cp-modal-detail-section">
                  <div className="cp-modal-section-label">Data Science & AI</div>
                  <div className="cp-modal-subjects-grid">
                    {d.daSubjects.map((s, i) => (
                      <div className="cp-modal-subject-chip" key={i}>{s}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* DA Detailed Syllabus — from daSyllabus for super100, else from syllabus */}
              {d.daSyllabus && (
                <div className="cp-modal-detail-section">
                  <div className="cp-modal-section-label">Data Science & AI — Detailed Syllabus</div>
                  <div className="cp-modal-syllabus">
                    {d.daSyllabus.map((item, i) => (
                      <div className="cp-modal-syllabus-item" key={i}>
                        <h4 className="cp-modal-syllabus-subject">{item.subject}</h4>
                        <p className="cp-modal-syllabus-topics">{item.topics}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* DA Detailed Syllabus (for non-super100 courses) */}
              {d.syllabus && !d.daSyllabus && (
                <div className="cp-modal-detail-section">
                  <div className="cp-modal-section-label">GATE DA Detailed Syllabus</div>
                  <div className="cp-modal-syllabus">
                    {d.syllabus.map((item, i) => (
                      <div className="cp-modal-syllabus-item" key={i}>
                        <h4 className="cp-modal-syllabus-subject">{item.subject}</h4>
                        <p className="cp-modal-syllabus-topics">{item.topics}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Program Structure */}
              {d.programStructure && (
                <div className="cp-modal-detail-section">
                  <div className="cp-modal-section-label">Program Structure</div>
                  <div className="cp-modal-mentorship">
                    {d.programStructure.map((block, i) => (
                      <div className="cp-modal-mentorship-block" key={i}>
                        <h4 className="cp-modal-mentorship-title">{block.title}</h4>
                        {block.items.map((item, j) => (
                          <div className="cp-modal-detail-item" key={j}>
                            <CheckIcon /> <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Program Levels (AI Generalist / Study Abroad) */}
              {d.programLevels && (
                <div className="cp-modal-detail-section">
                  <div className="cp-modal-section-label">Program Structure</div>
                  <div className="cp-modal-mentorship">
                    {d.programLevels.map((level, i) => (
                      <div className="cp-modal-mentorship-block" key={i}>
                        <h4 className="cp-modal-mentorship-title">{level.title}</h4>
                        <p className="cp-modal-desc" style={{ marginBottom: level.tools && level.tools.length ? 8 : 0 }}>{level.desc}</p>
                        {level.tools && level.tools.length > 0 && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
                            {level.tools.map((tool, j) => (
                              <span key={j} className="cp-modal-subject-chip" style={{ fontSize: 11, padding: "3px 8px" }}>{tool}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Practical AI & ML Syllabus */}
              {d.aimlSyllabus && (
                <div className="cp-modal-detail-section">
                  <div className="cp-modal-section-label">Practical AI & ML Syllabus</div>
                  <div className="cp-modal-syllabus">
                    {d.aimlSyllabus.map((item, i) => (
                      <div className="cp-modal-syllabus-item" key={i}>
                        <h4 className="cp-modal-syllabus-subject">{item.module}</h4>
                        <p className="cp-modal-syllabus-topics">{item.topics}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mentorship & Guidance */}
              {d.mentorship && (
                <div className="cp-modal-detail-section">
                  <div className="cp-modal-section-label">Mentorship & Guidance</div>
                  <div className="cp-modal-mentorship">
                    {d.mentorship.map((block, i) => (
                      <div className="cp-modal-mentorship-block" key={i}>
                        <h4 className="cp-modal-mentorship-title">{block.title}</h4>
                        {block.items.map((item, j) => (
                          <div className="cp-modal-detail-item" key={j}>
                            <CheckIcon /> <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* DSA Coverage */}
              {d.dsaCoverage && <DetailSection title={course.id === "super100" ? "DSA with Java + LeetCode — Taught by Syed Peera Saheb" : "DSA Coverage"} items={d.dsaCoverage} />}

              {/* Java Coverage */}
              {d.javaCoverage && <DetailSection title="Java Programming" items={d.javaCoverage} />}

              {/* LeetCode Coverage */}
              {d.leetcodeCoverage && <DetailSection title={course.id === "super100" ? "LeetCode Practice" : "LeetCode Problem Solving"} items={d.leetcodeCoverage} />}

              {/* Custom Sections (for super100) */}
              {d.customSections && d.customSections.map((sec, i) => (
                <div className="cp-modal-detail-section" key={i}>
                  <div className="cp-modal-section-label">{sec.title}</div>
                  {sec.desc && <p className="cp-modal-desc">{sec.desc}</p>}
                  {sec.items && (
                    <div className="cp-modal-detail-list">
                      {sec.items.map((item, j) => (
                        <div className="cp-modal-detail-item" key={j}>
                          <CheckIcon /> <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Academic Features (for non-super100 courses) */}
              {d.features && !d.customSections && <DetailSection title="Course Features" items={d.features} />}

              {/* What You Get */}
              <DetailSection title="What You Get" items={d.whatYouGet} />

              {/* Who Is This For */}
              <DetailSection title="Who This Course Is For" items={d.whoIsFor} icon="bullet" />

              {/* Learning Outcome */}
              <DetailSection title="Learning Outcome" items={d.outcome} />

              {/* Note / Enrollment */}
              {d.note && (
                <div className="cp-modal-note">
                  <strong>{course.id === "super100" ? "Enrollment:" : "Note:"}</strong> {d.note}
                </div>
              )}
            </>
          ) : (
            /* Fallback: show highlights */
            <>
              <div className="cp-modal-section-label">What's Included</div>
              <div className="cp-modal-detail-list">
                {course.highlights.map((h, i) => (
                  <div className="cp-modal-detail-item" key={i}>
                    <CheckIcon /> <span>{h}</span>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState(null);

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
                <a href="#courses-grid" className="cp-cta-primary">
                  <PlayIcon /> Explore All Courses
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
                    <div className="cp-big-num">19</div>
                    <div className="cp-small-lbl">Courses<br />& Programs</div>
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
              <div className={`cp-category-group ${cat.key === "featured" ? "cp-category-featured" : ""}`} key={cat.key}>
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
                <div className={`cp-courses-grid ${cat.key === "featured" ? "cp-featured-grid" : ""}`}>
                  {cat.courses.map((course) => (
                    <div
                      key={course.id}
                      className={`cp-course-card ${course.color === "gold" ? "cp-card-gold" : course.color === "accent" ? "cp-card-accent" : ""}`}
                      style={{ position: "relative" }}
                    >
                      {/* Highlighted Badge */}
                      {course.highlighted && (
                        <div style={{
                          position: "absolute", top: 12, right: 12, zIndex: 10,
                          background: "linear-gradient(135deg, #f59e0b, #ef4444)",
                          color: "#fff", fontSize: 11, fontWeight: 700,
                          padding: "4px 10px", borderRadius: 20,
                          letterSpacing: "0.05em", boxShadow: "0 2px 8px rgba(245,158,11,0.5)",
                          display: "flex", alignItems: "center", gap: 4,
                        }}>
                          ⭐ HIGHLIGHTED
                        </div>
                      )}

                      {/* Banner Image */}
                      {course.image && (
                        <div className="cp-card-banner">
                          <img
                            src={`${course.image}?v=3`}
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
                          <div className="cp-card-price">{course.isFree ? "FREE" : `₹${course.price}`}</div>
                          {!course.isFree && course.originalPrice && course.originalPrice !== "0" && course.discount !== "0" && (
                            <>
                              <div className="cp-card-original-price">₹{course.originalPrice}</div>
                              <div className="cp-card-discount">{course.discount}% off</div>
                            </>
                          )}
                        </div>
                        {!course.isFree && <div className="cp-card-gst">+ 18% GST</div>}

                        <button
                          className="cp-card-cta"
                          onClick={() => setSelectedCourse(course)}
                        >
                          View Details <ArrowIcon />
                        </button>
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
                  href="#courses-grid"
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
                  Free Lectures on YouTube <ArrowIcon />
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

      {/* Course Detail Modal */}
      {selectedCourse && (
        <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
      )}
    </div>
  );
}
