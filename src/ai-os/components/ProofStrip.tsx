import { Section, Reveal } from "./shared";
import { trackRecord, testimonials, cohort, seatsLabel } from "../content/site";
import { ShieldCheck, Users, MessageSquare } from "lucide-react";

const foundingPromises = [
  {
    icon: Users,
    title: "Small by design",
    body: `${seatsLabel} — so every project gets looked at, not just submitted.`,
  },
  {
    icon: MessageSquare,
    title: "Direct access to the teachers",
    body: "Both instructors are in the room for the full 38 days. Not a TA, not a forum.",
  },
  {
    icon: ShieldCheck,
    title: "Founding-cohort price",
    body: "This price is for the first cohort and will not be repeated once there's a track record to point at.",
  },
];

export const ProofStrip = () => {
  const isFounding = cohort.number === 1 && testimonials.length === 0;

  return (
    <Section className="border-b border-hairline py-16 md:py-20">
      {trackRecord.length > 0 && (
        <Reveal>
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-center md:gap-10">
            <p className="t-label shrink-0 text-muted">BUILT BY THE TEAM BEHIND</p>
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {trackRecord.map((t) => (
                <li key={t.label} className="text-[15px] text-bone">
                  <span className="font-medium">{t.label}</span>
                  <span className="ml-2 text-muted">{t.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}

      {isFounding ? (
        <>
          <Reveal>
            <div className="grid grid-cols-12 gap-x-6 gap-y-4">
              <h2 className="col-span-12 text-2xl font-medium leading-snug tracking-[-0.02em] text-bone lg:col-span-5 md:text-3xl">
                This is cohort 01. There are no testimonials yet.
              </h2>
              <p className="t-body col-span-12 lg:col-span-6 lg:col-start-7">
                We could have filled this page with stock photos and invented
                quotes. Instead — this is the first run of the program, and
                you'd be joining it early. That's a real trade, so here's the
                honest version of both sides.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {foundingPromises.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="flex gap-4 border-t border-hairline py-6 pr-4">
                  <p.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-bone-70"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <div>
                    <h3 className="text-lg font-medium text-bone">{p.title}</h3>
                    <p className="t-card mt-1.5">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </>
      ) : (
        <Reveal>
          <p className="t-lead">
            {testimonials.length} students have completed the program.
          </p>
        </Reveal>
      )}
    </Section>
  );
};
