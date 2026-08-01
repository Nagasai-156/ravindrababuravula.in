import { Section, SysLabel, Reveal } from "./shared";
import { cohort, pricing } from "../content/site";

const beats = [
  {
    tag: "LIVE",
    title: "Live session",
    body: "Concept, then a demo built in front of you — no slides-only lectures. Questions answered on the call.",
  },
  {
    tag: "LAB",
    title: "Lab time",
    body: "You build the same thing on your own screen while instructors are still online to unblock you.",
  },
  {
    tag: "ASYNC",
    title: "Doubt support",
    body: "Stuck between sessions? Post it in the cohort channel and get unstuck without waiting a week.",
  },
  {
    tag: "REVIEW",
    title: "Project review",
    body: "Your work gets looked at and corrected — the part free content structurally cannot give you.",
  },
];

export const WeekRhythm = () => (
  <Section id="rhythm" className="py-24 md:py-36">
    <SysLabel index="06" name="HOW A WEEK ACTUALLY RUNS" />

    <div className="grid grid-cols-12 gap-x-6 gap-y-10">
      <div className="col-span-12 lg:col-span-5">
        <Reveal>
          <h2 className="max-w-[16ch] text-4xl font-light leading-[1.15] tracking-[-0.02em] text-bone md:text-5xl">
            Live, then build, then reviewed.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="t-lead mt-6">
            The same loop every week. It's the review step that turns watching
            into capability, so nothing you build goes unlooked at.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <dl className="mt-9">
            {[
              ["Format", "Live online, cohort-based"],
              ["Total", `${pricing.liveDays} days · ~${pricing.totalHours} hrs live + lab`],
              ...(cohort.sessionTimings
                ? [["Timings", cohort.sessionTimings] as [string, string]]
                : []),
              ...(cohort.hoursPerWeek
                ? [["Your time", `${cohort.hoursPerWeek} per week`] as [string, string]]
                : []),
              ...(cohort.language
                ? [["Language", cohort.language] as [string, string]]
                : []),
              [
                "Recordings",
                cohort.recordingAccess
                  ? `Every session recorded · ${cohort.recordingAccess} access`
                  : "Every session recorded",
              ],
            ].map(([k, v], i, arr) => (
              <div
                key={k}
                className={`flex items-baseline justify-between gap-6 border-t border-hairline py-3.5 ${
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
          {!cohort.sessionTimings && (
            <p className="t-meta mt-4">
              Exact session times are confirmed with your cohort before Day 1.
            </p>
          )}
        </Reveal>
      </div>

      <div className="col-span-12 lg:col-span-6 lg:col-start-7">
        <ol className="relative">
          {beats.map((b, i) => (
            <Reveal key={b.tag} delay={i * 0.08}>
              <li className="relative flex gap-5 pb-8 last:pb-0">
                {/* connective spine */}
                {i < beats.length - 1 && (
                  <span
                    className="absolute left-[27px] top-12 bottom-0 w-px bg-hairline"
                    aria-hidden
                  />
                )}
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-hairline bg-surface font-mono text-[10px] tracking-wider text-bone-70">
                  {b.tag}
                </span>
                <div className="pt-2.5">
                  <h3 className="text-xl font-medium text-bone">{b.title}</h3>
                  <p className="t-card mt-1.5 max-w-[46ch]">{b.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  </Section>
);
