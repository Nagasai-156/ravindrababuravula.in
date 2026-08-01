import { Section, SysLabel, Reveal } from "./shared";

const audiences = [
  {
    who: "Students",
    outcome:
      "Graduate with six shipped projects and a demo-day recording — while your peers have a certificate.",
  },
  {
    who: "Engineers",
    outcome:
      "Agentic workflows, RAG and evaluation you can defend in a design review and put into production.",
  },
  {
    who: "Marketers & creators",
    outcome:
      "A content engine that researches, drafts and schedules — running weekly without you rebuilding it.",
  },
  {
    who: "Business owners",
    outcome:
      "Automate two real processes and cut a recurring cost you're currently paying a person or tool for.",
  },
  {
    who: "Freelancers",
    outcome:
      "A new service line — websites, assistants, automations — you can quote for by the end of week 5.",
  },
  {
    who: "Aspiring founders",
    outcome:
      "Problem selection, an MVP built during the sprint, and a demo plus one-pager to show investors.",
  },
];

export const Who = () => (
  <Section id="who" className="py-24 md:py-36">
    <SysLabel index="08" name="WHO IT'S FOR" />

    <div className="grid grid-cols-12 gap-x-6 gap-y-4">
      <div className="col-span-12 lg:col-span-6">
        <Reveal>
          <h2 className="max-w-[20ch] text-4xl font-light leading-[1.15] tracking-[-0.02em] text-bone md:text-5xl">
            Same 38 days. Six different things to walk away with.
          </h2>
        </Reveal>
      </div>
      <div className="col-span-12 lg:col-span-5 lg:col-start-8">
        <Reveal delay={0.1}>
          <p className="t-lead">
            Every topic is taught at three levels — a plain explanation, a real
            workflow you copy, and builder depth if you want it. Nobody is left
            behind; nobody is bored.
          </p>
        </Reveal>
      </div>
    </div>

    <div className="mt-14 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
      {audiences.map((a, i) => (
        <Reveal key={a.who} delay={(i % 3) * 0.08}>
          <div className="border-t border-hairline py-7 pr-4">
            <h3 className="text-xl font-medium text-bone">{a.who}</h3>
            <p className="t-card mt-2">{a.outcome}</p>
          </div>
        </Reveal>
      ))}
    </div>

    <Reveal delay={0.2}>
      <p className="t-meta mt-10">
        Level 1 — clarity for everyone &nbsp;·&nbsp; Level 2 — tool demo +
        workflow &nbsp;·&nbsp; Level 3 — builder + business depth
      </p>
    </Reveal>
  </Section>
);
