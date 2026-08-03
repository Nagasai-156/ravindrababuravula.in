import { Section, SysLabel, Reveal } from "./shared";

const groups = [
  {
    name: "RESEARCH",
    tools: ["Perplexity", "NotebookLM", "ChatGPT"],
    outcome:
      "Turn 20 sources into a verified brief in an afternoon, with citations you can defend.",
  },
  {
    name: "WRITE & PRESENT",
    tools: ["Claude", "ChatGPT", "Slides"],
    outcome:
      "Ship reports, decks and documents from a repeatable system instead of a blank page.",
  },
  {
    name: "DESIGN & MEDIA",
    tools: ["Canva", "Image AI", "Voice AI"],
    outcome:
      "Produce campaign-quality visuals, voice and video without hiring a production team.",
  },
  {
    name: "BUILD & AUTOMATE",
    tools: ["Replit", "Webflow", "n8n", "Make"],
    outcome:
      "Ship a workflow that runs without you — lead capture, replies, form-to-sheet.",
  },
];

export const Stack = () => (
  <Section id="tools" className="py-24 md:py-36">
    <SysLabel index="07" name="TOOLS YOU'LL MASTER" />

    <div className="grid grid-cols-12 gap-x-6 gap-y-10">
      <div className="col-span-12 lg:col-span-5">
        <Reveal>
          <h2 className="max-w-[14ch] text-4xl font-light leading-[1.15] tracking-[-0.02em] text-bone md:text-5xl">
            Not tool-chasing. Tool <span className="text-volt">choosing.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="t-lead mt-6">
            Hundreds of AI tools launch every month. You'll learn a
            job-to-be-done framework for picking one and ignoring the rest —
            then assemble a stack across four capabilities.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 rounded-2xl border border-hairline bg-surface/60 p-5">
            <p className="t-label text-bone-70">WHAT THIS COSTS YOU</p>
            <p className="t-card mt-2">
              The program runs on free tiers. You can complete all six builds
              without paying for a single subscription. If you choose to add a
              paid ChatGPT or Claude plan, budget roughly ₹1,700–2,000 per
              month — optional, and never required to finish a project.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="col-span-12 lg:col-span-6 lg:col-start-7">
        {groups.map((g, i) => (
          <Reveal key={g.name} delay={i * 0.08}>
            <div
              className={`border-t border-hairline py-7 ${
                i === groups.length - 1 ? "border-b" : ""
              }`}
            >
              <p className="t-label text-muted">{g.name}</p>
              <p className="mt-2.5 flex flex-wrap gap-x-2 text-xl font-medium text-bone md:text-2xl">
                {g.tools.map((t, j) => (
                  <span key={t}>
                    {t}
                    {j < g.tools.length - 1 && <span className="text-muted"> ·</span>}
                  </span>
                ))}
              </p>
              <p className="t-card mt-2">{g.outcome}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </Section>
);
