import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Section, SysLabel, Reveal } from "./shared";
import { cohort, pricing, applyFlow } from "../content/site";
import { track } from "../lib/track";

const faqs: { q: string; a: string }[] = [
  {
    q: "Do I need to know how to code?",
    a: "No. Every build is done through guided no-code and low-code workflows — if you can use a browser, you can finish all six projects. Engineers who do code will still find depth in the model-thinking, RAG and evaluation phases.",
  },
  {
    q: `How many hours a week does this take?${cohort.hoursPerWeek ? "" : ""}`,
    a: cohort.hoursPerWeek
      ? `${cohort.hoursPerWeek} per week, across live sessions and lab time. In total the program is ${pricing.liveDays} days and roughly ${pricing.totalHours} hours of live and lab learning.`
      : `The program runs ${pricing.liveDays} days and roughly ${pricing.totalHours} hours of live and lab learning in total. Your exact weekly commitment and session times are confirmed with your cohort before Day 1.`,
  },
  {
    q: "What are the session timings?",
    a: cohort.sessionTimings
      ? `${cohort.sessionTimings}. Every session is recorded, so a clash on one day doesn't set you back.`
      : "Timings are set with each cohort before Day 1 and shared in your welcome email. Every session is recorded, so a clash on one day doesn't set you back.",
  },
  {
    q: "Are sessions recorded, and how long do I keep access?",
    a: cohort.recordingAccess
      ? `Yes — every session is recorded and you keep access for ${cohort.recordingAccess}.`
      : "Yes — every session is recorded and shared with the cohort. The exact access window is confirmed in your welcome email.",
  },
  {
    q: "What if I miss a week or fall behind?",
    a: "Watch the recording, then bring your questions to the next live session or the cohort channel. The build sprint is the one stretch worth protecting in your calendar — that's where the six artifacts get made.",
  },
  {
    q: "Do I need a specific laptop or paid AI subscriptions?",
    a: "Any laptop that runs a modern browser is enough — no GPU, no heavy local setup. The program is designed to run on free tiers. A paid ChatGPT or Claude plan (roughly ₹1,700–2,000/month) is optional and never required to finish a project.",
  },
  {
    q: "How big is the batch — will I actually get attention?",
    a: `Seats are deliberately limited (${cohort.seatsTotal ? `${cohort.seatsTotal} for this cohort` : "the number is capped for each cohort"}) so every project can be reviewed rather than just submitted. Both instructors are present for all ${pricing.liveDays} days.`,
  },
  {
    q: "Is there a certificate, and does it mean anything?",
    a: "There is, and it's linked to project completion rather than attendance — you get it by presenting a working capstone. Treat the six public artifacts as the real credential; the certificate is the paperwork.",
  },
  {
    q: "Is there job or placement support?",
    a: "No placement service, and no job guarantee — an honest no is worth more here than a dodge. What the program does provide is career, freelance and startup positioning: portfolio, résumé and LinkedIn work, client proposal templates and pricing guidance.",
  },
  {
    q: "What language are sessions taught in?",
    a: cohort.language
      ? cohort.language
      : "Sessions are taught in English. The exact language mix for your cohort is confirmed before Day 1.",
  },
  {
    q: `Why ${pricing.display} when workshops cost ₹999?`,
    a: `A three-hour workshop gives you prompt tips. This is ${pricing.liveDays} live days, an 8-day CTO-led build sprint, project reviews, a capstone and a demo day — with two instructors in the room throughout. You're paying for sequence, deadline and someone who checks your work, which is exactly what free content cannot give you.`,
  },
  {
    q: "Is GST included in the fee?",
    a: `No — the programme fee is ${pricing.display} plus ${pricing.gstRate}% GST. Your invoice shows the GST component separately. There are no other charges: no registration fee, no materials fee, no exam fee.`,
  },
  {
    q: "What happens after the 38 days?",
    a: "You keep the recordings, the templates and the artifacts, and stay in the cohort community. Alumni access to future cohort materials is confirmed in your welcome email.",
  },
  {
    q: "What's the refund policy?",
    a: "The full policy — window, conditions and how to claim — is published on the refund policy page linked in the footer. Read it before you pay; we'd rather you know the terms than trust a slogan.",
  },
  {
    q: applyFlow.mode === "apply" ? "Does applying commit me to paying?" : "How do I pay?",
    a:
      applyFlow.mode === "apply"
        ? "No. The application is a short form and costs nothing. We confirm whether the program is a fit, and only then share the payment link — so nothing is charged before you've decided."
        : "Payment is completed through the checkout link, and your seat is confirmed immediately afterwards.",
  },
];

export const Faq = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" className="py-24 md:py-36">
      <SysLabel index="12" name="QUESTIONS" />
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 lg:col-span-4">
          <Reveal>
            <h2 className="text-4xl font-light leading-[1.15] tracking-[-0.02em] text-bone md:text-5xl">
              Asked, answered.
            </h2>
            <p className="t-lead mt-6">
              Anything not covered here — write to{" "}
              <a
                href="mailto:gate2014.ravindra@gmail.com"
                className="text-bone underline underline-offset-4"
              >
                gate2014.ravindra@gmail.com
              </a>{" "}
              and you'll get a straight answer.
            </p>
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          {faqs.map((f, i) => (
            <div
              key={f.q}
              className={`border-t border-hairline ${
                i === faqs.length - 1 ? "border-b" : ""
              }`}
            >
              <h3>
                <button
                  onClick={() => {
                    const next = open === i ? null : i;
                    setOpen(next);
                    if (next === i) track("faq_open", { question: f.q });
                  }}
                  aria-expanded={open === i}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="text-[17px] font-medium text-bone md:text-lg">
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="shrink-0"
                  >
                    <Plus className="h-5 w-5 text-bone-70" aria-hidden />
                  </motion.span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="t-body pb-6">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
