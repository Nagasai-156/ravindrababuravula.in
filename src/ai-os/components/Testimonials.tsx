import { Section, SysLabel, Reveal } from "./shared";
import { testimonials } from "../content/site";

/**
 * Renders nothing until real, attributable testimonials exist in site.ts.
 * ProofStrip carries the honest founding-cohort framing in the meantime —
 * an empty carousel or invented quotes would both be worse than silence.
 */
export const Testimonials = () => {
  if (testimonials.length === 0) return null;

  return (
    <Section id="testimonials" className="py-24 md:py-36">
      <SysLabel index="10" name="FROM THE COHORT" />

      <Reveal>
        <h2 className="max-w-[20ch] text-4xl font-light leading-[1.15] tracking-[-0.02em] text-bone md:text-5xl">
          What they built, in their words.
        </h2>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={(i % 3) * 0.08}>
            <figure className="flex h-full flex-col rounded-3xl border border-hairline bg-surface p-7">
              <blockquote className="text-[17px] leading-relaxed text-bone">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-hairline pt-5">
                {t.photo ? (
                  <img
                    src={t.photo}
                    alt={t.name}
                    width={44}
                    height={44}
                    loading="lazy"
                    className="h-11 w-11 rounded-full border border-hairline object-cover"
                  />
                ) : null}
                <span>
                  <span className="block text-[15px] font-medium text-bone">
                    {t.name}
                  </span>
                  <span className="block font-mono text-[11px] text-muted">
                    {t.role}
                  </span>
                </span>
              </figcaption>
              <p className="t-meta mt-4">Built: {t.built}</p>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};
