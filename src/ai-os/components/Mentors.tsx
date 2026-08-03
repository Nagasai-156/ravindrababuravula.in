import { useState } from "react";
import { Section, SysLabel, Reveal } from "./shared";
import { Linkedin } from "lucide-react";
import { instructors, trackRecord } from "../content/site";

/** Real photo when one exists at the configured path; initials until then. */
const Avatar = ({
  src,
  initials,
  name,
}: {
  src: string | null;
  initials: string;
  name: string;
}) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <span
        className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-hairline bg-raised font-mono text-lg font-semibold text-bone-70 md:h-24 md:w-24"
        aria-hidden
      >
        {initials}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={name}
      width={96}
      height={96}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-20 w-20 shrink-0 rounded-full border border-hairline object-cover md:h-24 md:w-24"
    />
  );
};

const support = [
  ["Live cohort", "energy and accountability"],
  ["Doubt support", "help while you're building"],
  ["Project review", "your work, corrected"],
  ["Demo day", "present with confidence"],
  ["Community", "peer network after class"],
  ["Certificate", "linked to project completion"],
];

export const Mentors = () => (
  <Section id="mentors" className="py-24 md:py-36">
    <SysLabel index="09" name="WHO'S TEACHING" />

    <div className="grid grid-cols-12 gap-x-6 gap-y-4">
      <div className="col-span-12 lg:col-span-6">
        <Reveal>
          <h2 className="max-w-[18ch] text-4xl font-light leading-[1.15] tracking-[-0.02em] text-bone md:text-5xl">
            Theory from a founder. Implementation from a{" "}
            <span className="text-volt">CTO.</span>
          </h2>
        </Reveal>
      </div>
      <div className="col-span-12 lg:col-span-5 lg:col-start-8">
        <Reveal delay={0.1}>
          <p className="t-lead">
            {instructors.length === 2
              ? "Both are in the room for the full 38 days."
              : instructors.length > 2
                ? "All of them are in the room for the full 38 days."
                : "In the room for the full 38 days."}{" "}
            You're not handed to a teaching assistant once the build sprint
            starts.
          </p>
        </Reveal>
      </div>
    </div>

    <div className="mt-14 grid grid-cols-12 gap-6">
      {instructors.map((m, i) => (
        <Reveal
          key={m.initials}
          delay={i * 0.1}
          className={
            instructors.length > 1 ? "col-span-12 md:col-span-6" : "col-span-12 lg:col-span-8"
          }
        >
          <div className="flex h-full flex-col rounded-3xl border border-hairline bg-surface p-7 md:p-9">
            <div className="flex items-center gap-5">
              <Avatar src={m.photo} initials={m.initials} name={m.name} />
              <div className="min-w-0">
                <h3 className="text-2xl font-medium text-bone">{m.name}</h3>
                <p className="mt-1 font-mono text-xs tracking-wide text-muted">
                  {m.role}
                </p>
                {m.linkedin && (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-[13px] text-bone-70 transition-colors hover:text-bone"
                  >
                    <Linkedin className="h-3.5 w-3.5" aria-hidden />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>

            <p className="t-card mt-6">{m.bio}</p>

            {m.credential && (
              <p className="mt-4 border-t border-hairline pt-4 font-mono text-xs leading-relaxed text-bone-70">
                {m.credential}
              </p>
            )}
          </div>
        </Reveal>
      ))}
    </div>

    {trackRecord.length > 0 && (
      <Reveal delay={0.15}>
        <div className="mt-6 rounded-3xl border border-hairline bg-surface p-7">
          <p className="t-label text-muted">TRACK RECORD</p>
          <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
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

    <Reveal delay={0.2}>
      <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline sm:grid-cols-3 lg:grid-cols-6">
        {support.map(([title, sub]) => (
          <div key={title} className="bg-surface p-5">
            <p className="text-[15px] font-medium text-bone">{title}</p>
            <p className="t-card mt-1 text-sm">{sub}</p>
          </div>
        ))}
      </div>
    </Reveal>
  </Section>
);
