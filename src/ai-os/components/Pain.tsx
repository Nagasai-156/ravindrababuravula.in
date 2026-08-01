import { Section, SysLabel, Reveal } from "./shared";

const symptoms = [
  "You've saved 40 hours of AI videos and built nothing from any of them.",
  "You can use ChatGPT, but you couldn't explain to your team why an answer was wrong.",
  "You've tried six tools this month and still do the work manually.",
  "Someone with half your experience is charging clients for automations you could have built.",
];

const stats = [
  {
    n: "75%",
    claim: "of knowledge workers already use generative AI at work",
    src: "Microsoft/LinkedIn Work Trend Index, 2024",
  },
  {
    n: "#1",
    claim: "AI and big data — fastest-growing skill area globally",
    src: "WEF Future of Jobs, 2025",
  },
  {
    n: "1.25M+",
    claim: "projected Indian AI talent demand by 2027",
    src: "Deloitte/NASSCOM AI talent report",
  },
];

export const Pain = () => (
  <Section id="pain" className="py-24 md:py-36">
    <SysLabel index="01" name="WHY THIS EXISTS" />

    <div className="grid grid-cols-12 gap-x-6 gap-y-10">
      <div className="col-span-12 lg:col-span-6">
        <Reveal>
          <h2 className="max-w-[18ch] text-4xl font-light leading-[1.15] tracking-[-0.02em] text-bone md:text-6xl">
            Consuming AI content is not the same as being able to{" "}
            <span className="text-volt">use it.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="t-lead mt-7">
            Almost everyone stuck on AI is stuck at the same place: enough
            exposure to feel behind, not enough structure to build anything.
            Tool demos create activity. They don't create capability.
          </p>
        </Reveal>
      </div>

      <div className="col-span-12 lg:col-span-5 lg:col-start-8">
        <ul>
          {symptoms.map((s, i) => (
            <Reveal key={s} delay={i * 0.08}>
              <li
                className={`flex gap-4 border-t border-hairline py-5 ${
                  i === symptoms.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted" />
                <p className="text-[17px] leading-snug text-bone">{s}</p>
              </li>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={0.35}>
          <p className="t-body mt-6">
            If more than one of those landed, the gap isn't motivation or
            intelligence. It's that nobody gave you a sequence, a deadline and
            someone to check your work.
          </p>
        </Reveal>
      </div>
    </div>

    {/* market context — small, sourced, and clearly secondary */}
    <Reveal delay={0.2}>
      <div className="mt-16 grid grid-cols-1 gap-x-10 border-t border-hairline pt-8 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.n} className="py-3">
            <p className="font-mono text-xl font-semibold text-bone md:text-2xl">
              {s.n}
            </p>
            <p className="t-card mt-1.5">{s.claim}</p>
            <p className="mt-2 font-mono text-xs text-muted">{s.src}</p>
          </div>
        ))}
      </div>
    </Reveal>
  </Section>
);
