import { motion, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { WovenCanvas } from "./WovenCanvas";
import { usePointerOffset, useMagnetic } from "./usePointer";
import {
  pricing,
  cohort,
  brand,
  startLabel,
  seatsLabel,
  priceLabel,
  ctaLabel,
  applyHref,
  applyLinkProps,
  applyFlow,
  instructors,
  leadMagnet,
} from "../content/site";
import { track } from "../lib/track";

const ease = [0.16, 1, 0.3, 1] as const;

const Line = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <span className="block overflow-hidden pb-[0.06em]">
    <motion.span
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.95, delay, ease }}
      className="block"
    >
      {children}
    </motion.span>
  </span>
);

const PrimaryCta = () => {
  const { ref, x, y } = useMagnetic<HTMLAnchorElement>(0.22);
  return (
    <motion.a
      ref={ref}
      href={applyHref}
      {...applyLinkProps}
      onClick={() => track("cta_click", { location: "hero" })}
      style={{ x, y }}
      className="group inline-flex items-center gap-2 rounded-full bg-volt py-1.5 pl-6 pr-1.5 text-base font-bold text-ink transition-[gap] hover:gap-3.5 md:text-lg"
    >
      {ctaLabel}
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink transition-transform duration-300 group-hover:scale-110 md:h-11 md:w-11">
        <ArrowRight className="h-4 w-4 text-volt" />
      </span>
    </motion.a>
  );
};

/** The logistics buyers actually look for, at a size they can read. */
const factRows = () => {
  const rows: [string, string][] = [
    ["Starts", startLabel],
    ["Format", "Live online cohort"],
    ["Length", `${pricing.liveDays} days · ~${pricing.totalHours} hrs live + lab`],
  ];
  if (pricing.liveSessions !== null)
    rows.push(["Sessions", `${pricing.liveSessions} live sessions`]);
  if (cohort.sessionTimings) rows.push(["Timings", cohort.sessionTimings]);
  if (cohort.hoursPerWeek) rows.push(["Commitment", `${cohort.hoursPerWeek} / week`]);
  rows.push(["Seats", seatsLabel]);
  rows.push(["Fee", priceLabel]);
  return rows;
};

export const Hero = () => {
  const { ref, x, y } = usePointerOffset<HTMLElement>();
  const washX = useTransform(x, (v) => v * 40);
  const washY = useTransform(y, (v) => v * 28);
  const promiseX = useTransform(x, (v) => v * -7);
  const promiseY = useTransform(y, (v) => v * -5);
  const asideX = useTransform(x, (v) => v * 11);
  const asideY = useTransform(y, (v) => v * 8);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100dvh] w-full flex-col justify-center overflow-hidden pb-14 pt-28 md:pb-16 md:pt-28"
    >
      <WovenCanvas className="absolute inset-0 h-full w-full" interactive />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          x: washX,
          y: washY,
          background:
            "radial-gradient(48rem 34rem at 62% 38%, rgba(255,183,3,0.10), transparent 70%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/25 to-ink/90" />

      <div className="relative mx-auto grid w-full max-w-[1400px] grid-cols-12 items-center gap-x-6 gap-y-10 px-5 md:px-10">
        {/* ---------------- offer column ---------------- */}
        <motion.div
          className="col-span-12 lg:col-span-7"
          style={{ x: promiseX, y: promiseY }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 md:mb-6"
          >
            <span className="t-label font-semibold text-volt">AI GENERALIST OS</span>
            <span className="hidden h-3 w-px bg-hairline sm:block" />
            <span className="t-label inline-flex items-center gap-2 text-bone-70">
              <span className="relative flex h-1.5 w-1.5">
                <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-volt" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-volt" />
              </span>
              COHORT {String(cohort.number).padStart(2, "0")} · {brand.name}
            </span>
          </motion.div>

          {/* Same scale and weight as .cp-headline on the rest of the site.
              Unbounded is a wide face, so this is deliberately smaller than a
              grotesk would need — at 4.5rem "systems in 38 days." still holds
              on one line in the 7/12 column. */}
          <h1 className="text-[clamp(1.9rem,6.5vw,4.5rem)] font-light leading-[1.1] tracking-[-1.5px] text-bone lg:text-[clamp(2.4rem,4vw,4.5rem)]">
            <Line delay={0.2}>
              Build 6 <span className="text-volt">real</span> AI
            </Line>
            <Line delay={0.32}>systems in 38 days.</Line>
          </h1>

          <motion.p
            initial={{ y: 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.55, ease }}
            className="t-lead mt-6 md:mt-7"
          >
            A live cohort for professionals, founders and students who are tired
            of watching AI tutorials and want a working portfolio instead.{" "}
            <span className="text-bone">No coding background required.</span>
          </motion.p>

          {/* the three facts a buyer needs before they'll scroll */}
          <motion.div
            initial={{ y: 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.68, ease }}
            className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 md:mt-8"
          >
            {[startLabel, seatsLabel, priceLabel].map(
              (fact, i) => (
                <span key={fact} className="flex items-center gap-3">
                  {i > 0 && <span className="h-3 w-px bg-hairline" />}
                  <span className="font-mono text-sm font-medium text-bone md:text-base">
                    {fact}
                  </span>
                </span>
              )
            )}
          </motion.div>

          <motion.div
            initial={{ y: 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.8, ease }}
            className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4"
          >
            <PrimaryCta />
            {/* deliberately a text link, not a second button */}
            <div className="flex flex-col gap-1.5">
              {leadMagnet.fileUrl && (
                <a
                  href={leadMagnet.fileUrl}
                  onClick={() => track("curriculum_download", { location: "hero" })}
                  className="text-[15px] text-bone-70 underline-offset-4 transition-colors hover:text-bone hover:underline"
                >
                  Download the 38-day curriculum ↓
                </a>
              )}
              {applyFlow.consultUrl && (
                <a
                  href={applyFlow.consultUrl}
                  onClick={() => track("consult_click", { location: "hero" })}
                  className="text-[15px] text-muted underline-offset-4 transition-colors hover:text-bone hover:underline"
                >
                  Not sure it's for you? Book a 20-min call →
                </a>
              )}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.95 }}
            className="t-meta mt-7"
          >
            Taught live by{" "}
            {instructors.map((m, i) => (
              <span key={m.initials}>
                {i > 0 && (i === instructors.length - 1 ? " and " : ", ")}
                {m.name} ({m.role.split(" · ")[0]})
              </span>
            ))}
            .
          </motion.p>
        </motion.div>

        {/* ---------------- facts card ---------------- */}
        <motion.aside
          initial={{ y: 34, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.55, ease }}
          className="col-span-12 lg:col-span-4 lg:col-start-9"
        >
          <motion.div
            style={{ x: asideX, y: asideY }}
            className="rounded-3xl border border-hairline bg-surface/90 p-6 backdrop-blur-md md:p-7"
          >
            <p className="t-label text-volt">COHORT {String(cohort.number).padStart(2, "0")}</p>
            <dl className="mt-4">
              {factRows().map(([k, v], i, arr) => (
                <div
                  key={k}
                  className={`flex items-baseline justify-between gap-4 border-t border-hairline py-3 ${
                    i === arr.length - 1 ? "border-b" : ""
                  }`}
                >
                  <dt className="shrink-0 font-mono text-xs tracking-wide text-muted">
                    {k}
                  </dt>
                  <dd className="text-right text-[15px] font-medium text-bone">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="t-meta mt-4">
              {applyFlow.mode === "apply"
                ? "Applying takes 2 minutes and costs nothing. We'll confirm your seat by email."
                : "Checkout is handled on our course platform. Your seat is confirmed as soon as payment goes through."}
            </p>
          </motion.div>
        </motion.aside>
      </div>
    </section>
  );
};
