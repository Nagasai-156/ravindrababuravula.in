/* ============================================================================
 * SINGLE SOURCE OF TRUTH for every claim on this page.
 *
 * >>> FILL THESE IN. Anything left `null` is NOT invented by the UI — each
 * section falls back to honest, weaker copy instead. Nothing on this page
 * asserts a fact you have not supplied here.
 *
 * Search for TODO to find every value that still needs your confirmation.
 * ========================================================================= */

export const cohort = {
  /** TODO: e.g. "17 March 2026". null → "Applications opening soon". */
  startDate: null as string | null,
  /** TODO: total seats, e.g. 20. null → "Limited seats". */
  seatsTotal: null as number | null,
  /** TODO: seats already taken, e.g. 12. null → no scarcity counter shown. */
  seatsTaken: null as number | null,
  /** Cohort number. 1 = founding cohort framing (honest, no fake alumni). */
  number: 1,
  /** TODO: e.g. "Tue / Thu / Sat, 8:30–10:00 PM IST". null → hides timings row. */
  sessionTimings: null as string | null,
  /** TODO: e.g. "6–8 hrs". null → falls back to the deck's "~75 hrs total". */
  hoursPerWeek: null as string | null,
  /** TODO: e.g. "English, with Hindi explanations where helpful". */
  language: null as string | null,
  /** TODO: how long recordings stay available, e.g. "12 months". */
  recordingAccess: null as string | null,
};

export const pricing = {
  amount: 35000,
  currency: "₹",
  display: "₹35,000",
  /** From the deck: 38 live days, ~75 hrs live + lab. */
  liveDays: 38,
  totalHours: 75,
  /** TODO: number of live sessions, for the per-session anchor. null → anchor hidden. */
  liveSessions: null as number | null,
  /** TODO: true once you actually offer instalments. */
  emiAvailable: false,
  /** TODO: e.g. "3-month no-cost EMI via Razorpay". Shown only if emiAvailable. */
  emiNote: null as string | null,
  /** Confirmed: ₹35,000 is exclusive of GST — 18% is charged on top. */
  gstIncluded: false,
  gstRate: 18,
  /** TODO: early-bird price, e.g. "₹29,000 until 10 March". null → hidden. */
  earlyBird: null as string | null,
  /**
   * TODO: exact refund terms. The audit is right that an unqualified
   * "no-risk guarantee" reads worse than none at all. null → the page states
   * plainly that terms are published on the refund policy page instead of
   * implying a guarantee that does not exist.
   */
  refundTerms: null as string | null,
};

export const applyFlow = {
  /**
   * "apply" = form first, no payment. "pay" = straight to checkout.
   * Set to "pay" because the CTA now goes directly to the courses.store
   * listing — the surrounding copy switches with it, so the page never says
   * "no payment now" while linking to a checkout.
   */
  mode: "pay" as "apply" | "pay",
  /** Live checkout — courses.store listing for this program. */
  // url: "https://voujhg.courses.store",
  url: null,
  email: "info@metabrixlab.com",
  /** TODO: your booking link for the consult call. null → consult link hidden. */
  consultUrl: null as string | null,
};

export const leadMagnet = {
  /** TODO: put the PDF in /public and set this, e.g. "/AI_Generalist_OS_Curriculum.pdf" */
  fileUrl: null as string | null,
  /** TODO: your email-capture endpoint (Mailchimp/ConvertKit/Formspree). */
  endpoint: null as string | null,
};

/**
 * MetaBrix's own track record — this is the credibility that replaces
 * testimonials for cohort 1.
 * TODO: add real, verifiable entries. Empty array → the section is hidden
 * rather than filled with vague claims.
 */
export const trackRecord: { label: string; detail: string }[] = [
  // { label: "Ultron AI", detail: "Shipped product — demoed at GDC 2024" },
];

/**
 * TODO: real testimonials only — name, role, photo in /public/students, and
 * what they actually built. Empty array → the page shows honest
 * founding-cohort framing instead of an empty carousel.
 * DO NOT add entries you cannot attribute to a real person.
 */
export const testimonials: {
  name: string;
  role: string;
  photo: string | null;
  quote: string;
  built: string;
}[] = [];

export const instructors = [
  {
    initials: "PP",
    name: "Pratik Padamwar",
    role: "AI Research Scientist · Founder",
    /** TODO: drop a square photo at public/team/pratik.jpg */
    photo: "/team/pratik.jpg",
    bio: "Teaches the AI worldview: model thinking, evaluation, business use cases and startup/product clarity. The mental models that make everything else make sense.",
    /** TODO: add LinkedIn URL. null → link hidden. */
    linkedin: null as string | null,
    /** TODO: one line of verifiable track record. null → hidden. */
    credential: null as string | null,
  },
  {
    initials: "ZK",
    name: "Zeeshan Ahmad Khan",
    role: "CTO · Implementation Lead",
    /** TODO: drop a square photo at public/team/zeeshan.jpg */
    photo: "/team/zeeshan.jpg",
    bio: "Runs the build sprint: websites, AI applications, automation, testing, publishing and demo preparation. The person in the room while you build.",
    linkedin: null as string | null,
    credential: null as string | null,
  },
];

/* ---------------------------------------------------------------- derived */

export const seatsLeft =
  cohort.seatsTotal !== null && cohort.seatsTaken !== null
    ? cohort.seatsTotal - cohort.seatsTaken
    : null;

export const startLabel = cohort.startDate ?? "Applications opening soon";

export const seatsLabel =
  seatsLeft !== null
    ? `${seatsLeft} of ${cohort.seatsTotal} seats left`
    : cohort.seatsTotal !== null
      ? `${cohort.seatsTotal} seats`
      : "Limited seats";

const inr = (n: number) => `${pricing.currency}${n.toLocaleString("en-IN")}`;

export const gstLabel = `+ ${pricing.gstRate}% GST`;

/** Base fee, honouring an early-bird price if one is set. */
export const baseFee = pricing.earlyBird ?? pricing.display;

/** Compact form for nav, hero, tables: "₹35,000 + 18% GST". */
export const priceLabel = `${baseFee} ${gstLabel}`;

/** All-in amount actually payable — only meaningful without an early-bird override. */
export const priceTotalDisplay = pricing.earlyBird
  ? null
  : inr(Math.round(pricing.amount * (1 + pricing.gstRate / 100)));

/** Full disclosure line for the pricing section. */
export const priceLineFull = priceTotalDisplay
  ? `${baseFee} ${gstLabel} — ${priceTotalDisplay} payable in total`
  : `${baseFee} ${gstLabel}`;

export const perSessionAnchor =
  pricing.liveSessions !== null
    ? `≈ ${pricing.currency}${Math.round(
        pricing.amount / pricing.liveSessions
      ).toLocaleString("en-IN")} per live session`
    : null;

/* "Enroll" (not "Enrol") to match the spelling used across the rest of the site. */
export const ctaLabel =
  applyFlow.mode === "apply" ? "Apply — no payment now" : "Enroll Now";

export const applyHref =
  applyFlow.url ??
  `mailto:${applyFlow.email}?subject=${encodeURIComponent(
    "AI Generalist OS — Application"
  )}`;

/** The checkout lives on another domain, so those links open in a new tab. */
export const applyIsExternal = /^https?:\/\//.test(applyHref);

export const applyLinkProps = applyIsExternal
  ? { target: "_blank" as const, rel: "noopener noreferrer" }
  : {};
