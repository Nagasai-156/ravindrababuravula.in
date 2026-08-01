import { motion } from "framer-motion";
import { Section, SysLabel, Reveal } from "./shared";
import { leadMagnet, pricing } from "../content/site";
import { track } from "../lib/track";

const phases = [
  {
    days: "Days 1–5",
    week: "Week 1",
    name: "Foundation",
    body: "AI vs ML vs GenAI, LLMs, agents and multimodal AI — then the Prompt Blueprint: role, context, task, constraints, examples, verify. You stop chatting randomly and start directing.",
    deliverable:
      "Your own AI opportunity map, plus a prompt library you'll reuse all program.",
    tools: ["ChatGPT", "Claude", "Gemini"],
  },
  {
    days: "Days 6–11",
    week: "Week 2",
    name: "Tools",
    body: "Research, writing, design, voice, video and automation tools — assembled into one stack instead of thirty tabs. Chosen by job-to-be-done, not by hype.",
    deliverable:
      "A working research workflow, a content workflow and a daily productivity system.",
    tools: ["Perplexity", "NotebookLM", "Canva"],
  },
  {
    days: "Days 12–17",
    week: "Week 3",
    name: "Model thinking",
    body: "Tokens, embeddings, context windows, RAG, APIs, training vs inference, hallucination, cost and latency. The layer that lets you judge output instead of trusting it.",
    deliverable:
      "An architecture map of a real AI application, drawn and explained by you.",
    tools: ["APIs", "Embeddings", "Vector stores"],
  },
  {
    days: "Days 18–25",
    week: "Weeks 4–5",
    name: "Build sprint",
    body: "Eight consecutive days of CTO-led implementation. Website, chatbot, document assistant, automation, content system and funnel — built on the call, tested, then published.",
    deliverable: "Six shipped artifacts. This is the portfolio.",
    tools: ["Replit", "Webflow", "n8n", "Make"],
  },
  {
    days: "Days 26–35",
    week: "Weeks 6–7",
    name: "Business + evaluation",
    body: "Sales, support, operations and reporting with AI. Accuracy, hallucination, bias, safety, speed and cost evaluation. Then career, freelance and startup positioning.",
    deliverable:
      "A career or freelance roadmap, client-ready proposals and an evaluation checklist.",
    tools: ["CRM", "Funnels", "Eval rubrics"],
  },
  {
    days: "Days 36–38",
    week: "Week 8",
    name: "Capstone + demo day",
    body: "Finalise, test, tell the story, present live to the cohort and answer questions. Attendance creates exposure; a capstone creates evidence.",
    deliverable: "A presented capstone and a project-linked certificate.",
    tools: ["Your stack", "Demo day"],
  },
];

export const Curriculum = () => (
  <Section id="curriculum" className="py-24 md:py-36">
    <SysLabel index="05" name="THE 38-DAY CURRICULUM" />

    <div className="grid grid-cols-12 gap-x-6">
      <div className="col-span-12 mb-12 lg:col-span-4 lg:mb-0">
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <h2 className="text-4xl font-light leading-[1.15] tracking-[-0.02em] text-bone md:text-5xl">
              Every phase ends with something you keep.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="t-lead mt-6">
              Six phases across {pricing.liveDays} days. The deliverable column
              is the point — if a phase doesn't produce an artifact, it doesn't
              belong in the program.
            </p>
            {leadMagnet.fileUrl && (
              <a
                href={leadMagnet.fileUrl}
                onClick={() =>
                  track("curriculum_download", { location: "curriculum" })
                }
                className="mt-7 inline-block border-b border-hairline pb-0.5 text-base font-medium text-bone transition-colors hover:border-bone"
              >
                Download the day-by-day curriculum ↓
              </a>
            )}
          </Reveal>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-7 lg:col-start-6">
        {phases.map((p, i) => (
          <motion.article
            key={p.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`border-t border-hairline py-9 md:py-11 ${
              i === phases.length - 1 ? "border-b" : ""
            }`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="t-label text-bone-70">
                {p.week} <span className="text-muted">· {p.days}</span>
              </p>
              <p className="font-mono text-xs tracking-[0.18em] text-muted">
                {String(i + 1).padStart(2, "0")} / 06
              </p>
            </div>

            <h3 className="mt-3 text-3xl font-medium tracking-[-0.02em] text-bone md:text-4xl">
              {p.name}
            </h3>
            <p className="t-body mt-3">{p.body}</p>

            <div className="mt-5 rounded-2xl border border-hairline bg-surface/60 p-4 md:p-5">
              <p className="t-label text-volt">YOU WALK OUT WITH</p>
              <p className="mt-2 text-[16px] leading-snug text-bone md:text-[17px]">
                {p.deliverable}
              </p>
            </div>

            <ul className="mt-4 flex flex-wrap gap-2">
              {p.tools.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-hairline px-2.5 py-1 font-mono text-[11px] tracking-wide text-muted"
                >
                  {t}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </div>
  </Section>
);
