# ravindrababuravula.in

Official personal website of **Prof. Ravindrababu Ravula** — Founder & CEO of Raudra Group of Companies. Educator, YouTuber, Certified Financial Planner, Serial Entrepreneur, Corporate Trainer, Vibe Coder, Philanthropist, and Environmentalist.

**Live site:** https://ravindrababu-ravula-ffb3f.web.app

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 7 |
| Routing | React Router DOM v7 |
| Styling | Plain CSS (no Tailwind) |
| 3D / Animations | Three.js, React Three Fiber, Framer Motion, GSAP |
| Blog Editor | Tiptap (rich text editor) |
| Backend | Supabase (Postgres + Storage) |
| Hosting | Firebase Hosting |
| SEO | react-helmet-async |

---

## Project Structure

```
src/
├── App.jsx                  # Root — routes + HomeOrbit galaxy section
├── App.css                  # Global styles, galaxy background, orbit animation
├── main.jsx                 # Entry point
│
├── components/
│   ├── Layout.jsx           # Navbar + Footer wrapper
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── SEO.jsx              # Helmet-based meta tags
│   └── SocialProofToast.jsx
│
├── sections/
│   └── MainSections.jsx
│
├── data/
│   ├── testimonials.js
│   ├── mentors.js
│   └── fakeEnrollments.js
│
├── services/
│   ├── internshipService.js
│   └── localStorageService.js
│
├── assets/team/             # Team member photos
├── supabaseClient.js        # Main Supabase client (internship/forum)
├── supabaseBlogClient.js    # Blog Supabase client
│
│   ── Pages ──
├── CoursesPage.jsx          # All courses (GATE, FAANG, P&C, etc.)
├── BlogListPage.jsx         # Public blog listing
├── BlogDetailPage.jsx       # Individual blog post
├── BlogAdminPage.jsx        # Blog CMS (password protected)
├── AdminDashboard.jsx       # Responses portal
├── RichEditor.jsx           # Tiptap rich text editor (blog)
├── TeamPage.jsx             # Team page
├── YoutuberPage.jsx
├── EducatorPage.jsx
├── FinancialPlannerPage.jsx
├── SerialEntrepreneurPage.jsx
├── VibeCoderPage.jsx
├── CorporateTrainerPage.jsx
├── PhilanthropistPage.jsx
├── EnvironmentalistPage.jsx
├── CohortPage.jsx
├── InternshipPage.jsx
├── MentorsPage.jsx
├── TestimonialsPage.jsx
├── ForumPage.jsx
└── RefundPolicyPage.jsx

public/
└── courses/                 # Course banner images (jpg)
```

---

## Routes

| Path | Page |
|---|---|
| `/` | Home — galaxy orbit section |
| `/youtuber` | YouTuber page |
| `/educator` | Educator page |
| `/financial-planner` | Certified Financial Planner |
| `/serial-entrepreneur` | Serial Entrepreneur |
| `/vibe-coder` | Vibe Coder |
| `/corporate-trainer` | Corporate Trainer |
| `/philanthropist` | Philanthropist |
| `/environmentalist` | Environmentalist |
| `/cohort` | Cohort / Startup Coach |
| `/courses` | All Courses |
| `/blog` | Blog listing |
| `/blog/:slug` | Blog post |
| `/team` | Team page |
| `/mentors` | Mentors |
| `/testimonials` | Testimonials |
| `/internship` | Internship program |
| `/forum` | Forum |
| `/refund-policy` | Refund Policy |
| `/admin/blog` | Blog CMS (password protected) |
| `/responses-portal` | Admin Dashboard |

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Deployment

```bash
# Build + deploy to Firebase Hosting
npm run build
firebase deploy --only hosting
```

Firebase project: `ravindrababu-ravula-ffb3f`

---

## Supabase

Two separate Supabase projects are used:

| Purpose | Project URL |
|---|---|
| Main (internship, forum) | `https://llavaymxrnzrfpyrcdgb.supabase.co` |
| Blog | `https://vxesxaaqvjbknliwgiiv.supabase.co` |

### Blog table schema

```sql
create table rbrblogs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  cover_image text,
  author text default 'Prof. Ravindrababu Ravula',
  tags text[],
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

Storage bucket: `blog-images` (public)

---

## Blog Admin

URL: `/admin/blog`
Password protected — credentials stored in `BlogAdminPage.jsx`.

---

## Adding Course Images

Place banner images (landscape, ~600×340px) in:

```
public/courses/<filename>.jpg
```

Reference in `CoursesPage.jsx` as `/courses/<filename>.jpg`.

---

## Key Design Tokens

| Token | Value |
|---|---|
| Background | `#0e0e0e` |
| Gold accent | `#ffb703` |
| Heading font | `Unbounded` |
| Body font | `Inter` |
| Orbit radius | `250px` |
| Orbit animation | `rotateOrbit 100s linear infinite` |
