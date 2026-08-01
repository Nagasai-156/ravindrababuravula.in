import { motion } from "framer-motion";
import { SysLabel, Reveal, Section } from "./shared";
import { projectVisuals, type ProjectVisualKey } from "./ProjectVisuals";
import { leadMagnet } from "../content/site";
import { track } from "../lib/track";

type Project = {
  visual: ProjectVisualKey;
  n: string;
  when: string;
  title: string;
  does: string;
  tools: string[];
};

const projects: Project[] = [
  {
    visual: "portfolio",
    n: "01",
    when: "Days 18–19",
    title: "Live portfolio website",
    does: "A published site with your bio, skills, projects and contact — at a real URL you can put on a résumé.",
    tools: ["Webflow", "Replit", "Vercel"],
  },
  {
    visual: "chatbot",
    n: "02",
    when: "Day 20",
    title: "AI chatbot people can use",
    does: "An assistant answering from your own material — study notes, résumé or a business FAQ — with sources attached.",
    tools: ["Claude", "ChatGPT", "Vector store"],
  },
  {
    visual: "document",
    n: "03",
    when: "Day 21",
    title: "Document AI assistant",
    does: "Upload a stack of PDFs, ask questions, get summaries and extracted fields back instead of reading all of it.",
    tools: ["RAG", "Embeddings", "NotebookLM"],
  },
  {
    visual: "automation",
    n: "04",
    when: "Day 22",
    title: "Automation that runs itself",
    does: "Lead capture, email replies, form-to-sheet — a workflow that keeps working after you close the laptop.",
    tools: ["n8n", "Make", "Webhooks"],
  },
  {
    visual: "content",
    n: "05",
    when: "Days 23–24",
    title: "Content + marketing system",
    does: "A calendar, post drafts, scripts, a landing page and a follow-up sequence, generated on a repeatable loop.",
    tools: ["Canva", "Claude", "Scheduler"],
  },
  {
    visual: "capstone",
    n: "06",
    when: "Days 36–38",
    title: "Capstone + demo day",
    does: "One major project taken to finished, tested, told as a story and presented live to the cohort.",
    tools: ["Your stack", "Demo day", "Certificate"],
  },
];

export const Projects = () => (
  <Section id="projects" className="py-24 md:py-36">
    <SysLabel index="04" name="WHAT YOU'LL BUILD" />

    <div className="grid grid-cols-12 gap-x-6 gap-y-6">
      <div className="col-span-12 lg:col-span-7">
        <Reveal>
          <h2 className="text-4xl font-medium leading-[1.02] tracking-[-0.03em] text-bone md:text-6xl">
            Six things that exist when you're done.
          </h2>
        </Reveal>
      </div>
      <div className="col-span-12 lg:col-span-5">
        <Reveal delay={0.1}>
          <p className="t-lead">
            Not six modules you attended — six artifacts with a URL, a demo or a
            file. Every one is built with you on a live call, not left as
            homework.
          </p>
        </Reveal>
      </div>
    </div>

    <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, i) => {
        const Visual = projectVisuals[p.visual];
        return (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: (i % 3) * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group"
          >
            <div className="overflow-hidden rounded-xl border border-hairline transition-colors duration-300 group-hover:border-bone/25">
              <Visual />
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-3">
              <span className="t-label text-muted">{p.when}</span>
              <span className="t-label text-muted">{p.n}/06</span>
            </div>
            <h3 className="mt-2 text-xl font-medium text-bone md:text-2xl">
              {p.title}
            </h3>
            <p className="t-card mt-2">{p.does}</p>
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
        );
      })}
    </div>

    <Reveal delay={0.15}>
      <div className="mt-12 flex flex-col gap-4 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="t-meta max-w-[62ch]">
          Illustrations above show the kind of artifact each build produces.
          Cohort&nbsp;1 is in progress — real student work will replace these as
          it ships.
        </p>
        {leadMagnet.fileUrl ? (
          <a
            href={leadMagnet.fileUrl}
            onClick={() => track("curriculum_download", { location: "projects" })}
            className="shrink-0 border-b border-hairline pb-0.5 text-base font-medium text-bone transition-colors hover:border-bone"
          >
            Download the full curriculum ↓
          </a>
        ) : null}
      </div>
    </Reveal>
  </Section>
);
