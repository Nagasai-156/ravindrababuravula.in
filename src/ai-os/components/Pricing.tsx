import { Section, SysLabel, Reveal } from "./shared";
import { ArrowRight, Check } from "lucide-react";
import {
  pricing,
  applyFlow,
  applyHref,
  ctaLabel,
  startLabel,
  seatsLabel,
  perSessionAnchor,
  baseFee,
  gstLabel,
} from "../content/site";
import { track } from "../lib/track";

/** Value stack — everything included, listed before the number appears. */
const included = [
  `${pricing.liveDays} live learning days (~${pricing.totalHours} hrs live + lab)`,
  "8-day CTO-led build sprint",
  "6 portfolio artifacts, built on the call",
  "Every session recorded",
  "100+ prompt library and AI tools directory",
  "Proposal, résumé and funnel templates",
  "Project review and doubt support",
  "Private cohort community",
  "Capstone, demo day and certificate",
  "Career, freelance and startup direction",
];

const afterYouApply = [
  applyFlow.mode === "apply"
    ? "You send the 2-minute application — no payment at this stage."
    : "You complete payment and your seat is confirmed.",
  "We confirm your seat by email and share the payment link if you're in.",
  "You get the welcome pack, tool checklist and cohort channel invite.",
  "Day 1 starts live with the whole cohort.",
];

export const Pricing = () => (
  <Section id="pricing" className="py-24 md:py-36">
    <SysLabel index="11" name="PRICING" />

    <div className="grid grid-cols-12 gap-6">
      {/* value stack first, number second */}
      <Reveal className="col-span-12 lg:col-span-7">
        {/* Solid-gold surface, matching .cp-card-solid-gold on the courses page */}
        <div className="flex h-full flex-col rounded-2xl bg-panel p-8 text-ink md:p-11">
          <p className="font-mono text-xs tracking-[0.2em] text-ink/60">
            NEXT COHORT · {startLabel.toUpperCase()} · {seatsLabel.toUpperCase()}
          </p>
          <h2 className="mt-4 max-w-[16ch] text-4xl font-medium leading-[1.02] tracking-[-0.03em] md:text-5xl">
            Everything that's included.
          </h2>

          <ul className="mt-8 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[15px] font-medium">
                <Check className="mt-1 h-4 w-4 shrink-0" aria-hidden />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 border-t border-ink/15 pt-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="font-mono text-xs tracking-[0.2em] text-ink/60">
                  PROGRAM FEE
                </p>
                <p className="mt-1 flex flex-wrap items-baseline gap-x-3 text-5xl font-bold tracking-[-0.03em] md:text-6xl">
                  {baseFee}
                  <span className="text-xl font-semibold tracking-normal md:text-2xl">
                    {gstLabel}
                  </span>
                </p>
                {pricing.earlyBird && (
                  <p className="mt-1 text-sm text-ink/60 line-through">
                    {pricing.display}
                  </p>
                )}
                {perSessionAnchor && (
                  <p className="mt-1 text-[15px] text-ink/70">
                    {perSessionAnchor} — less than an hour of a consultant's time.
                  </p>
                )}
                {pricing.emiAvailable && pricing.emiNote && (
                  <p className="mt-1 text-sm text-ink/70">{pricing.emiNote}</p>
                )}
              </div>

              <a
                href={applyHref}
                onClick={() => track("cta_click", { location: "pricing" })}
                className="group inline-flex items-center gap-2 rounded-full bg-ink py-1.5 pl-6 pr-1.5 text-base font-bold text-bone transition-all hover:gap-3.5 md:text-lg"
              >
                {ctaLabel}
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-volt transition-transform duration-300 group-hover:scale-110">
                  <ArrowRight className="h-4 w-4 text-ink" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="col-span-12 flex flex-col gap-6 lg:col-span-5">
        {/* refund — stated precisely, or not claimed at all */}
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-hairline bg-surface p-7">
            <p className="t-label text-bone-70">REFUNDS</p>
            {pricing.refundTerms ? (
              <p className="mt-3 text-[17px] leading-relaxed text-bone">
                {pricing.refundTerms}
              </p>
            ) : (
              <p className="t-card mt-3">
                We're not going to print the words “no-risk guarantee” without
                terms attached. The full refund policy — window, conditions and
                how to claim — is published on the{" "}
                <a
                  href="/refund-policy"
                  className="text-bone underline underline-offset-4"
                >
                  refund policy page
                </a>
                . Read it before you pay.
              </p>
            )}
          </div>
        </Reveal>

        {/* what happens next */}
        <Reveal delay={0.18}>
          <div className="rounded-2xl border border-hairline bg-surface p-7">
            <p className="t-label text-bone-70">WHAT HAPPENS AFTER YOU APPLY</p>
            <ol className="mt-4">
              {afterYouApply.map((step, i) => (
                <li
                  key={step}
                  className={`flex gap-4 border-t border-hairline py-3.5 ${
                    i === afterYouApply.length - 1 ? "border-b" : ""
                  }`}
                >
                  <span className="font-mono text-xs text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="t-card">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal delay={0.26}>
          <div className="rounded-2xl border border-hairline bg-surface p-7">
            <p className="text-lg font-medium leading-snug text-bone">
              No job guarantee.
            </p>
            <p className="t-card mt-2">
              Be suspicious of anyone selling one. What you get instead is six
              public artifacts, an evaluation framework and positioning for
              career, freelance, startup or business paths.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  </Section>
);
