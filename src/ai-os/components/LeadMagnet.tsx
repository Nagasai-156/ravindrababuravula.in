import { useState } from "react";
import { Section, Reveal } from "./shared";
import { leadMagnet, applyFlow, pricing } from "../content/site";
import { track } from "../lib/track";

type State = "idle" | "sending" | "done" | "error";

export const LeadMagnet = () => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    track("lead_submit", { location: "lead_magnet" });

    if (!leadMagnet.endpoint) {
      // No list connected yet — hand off to email rather than dropping the lead.
      window.location.href = `mailto:${applyFlow.email}?subject=${encodeURIComponent(
        "Send me the AI Generalist OS curriculum"
      )}&body=${encodeURIComponent(`Please send the curriculum to: ${email}`)}`;
      setState("done");
      return;
    }

    setState("sending");
    try {
      const res = await fetch(leadMagnet.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, source: "curriculum_download" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("done");
      if (leadMagnet.fileUrl) window.open(leadMagnet.fileUrl, "_blank", "noopener");
    } catch {
      setState("error");
    }
  };

  return (
    <Section className="py-20 md:py-24">
      <Reveal>
        <div className="grid grid-cols-12 items-center gap-x-6 gap-y-8 rounded-3xl border border-hairline bg-surface p-8 md:p-11">
          <div className="col-span-12 lg:col-span-6">
            <h2 className="max-w-[22ch] text-3xl font-medium leading-[1.05] tracking-[-0.02em] text-bone md:text-4xl">
              Not ready to apply? Read the whole thing first.
            </h2>
            <p className="t-body mt-4">
              The complete day-by-day curriculum — all {pricing.liveDays} days,
              every deliverable, the tools used in each phase. No call required.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            {state === "done" ? (
              <div className="rounded-2xl border border-hairline bg-ink p-6">
                <p className="text-[17px] font-medium text-bone">
                  {leadMagnet.endpoint
                    ? "Sent — check your inbox."
                    : "Your email app is open — send that message and we'll reply with the PDF."}
                </p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <label
                  htmlFor="lead-email"
                  className="t-label block text-bone-70"
                >
                  EMAIL ADDRESS
                </label>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="lead-email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (state === "error") setState("idle");
                    }}
                    placeholder="you@company.com"
                    aria-describedby={state === "error" ? "lead-error" : undefined}
                    className="min-h-[48px] w-full rounded-full border border-hairline bg-ink px-5 text-[16px] text-bone outline-none transition-colors placeholder:text-muted focus-visible:border-volt"
                  />
                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="min-h-[48px] shrink-0 rounded-full bg-volt px-6 text-[15px] font-bold text-ink transition-transform hover:-translate-y-px disabled:opacity-60"
                  >
                    {state === "sending" ? "Sending…" : "Send it to me"}
                  </button>
                </div>
                {state === "error" && (
                  <p
                    id="lead-error"
                    role="alert"
                    className="mt-3 text-[15px] text-bone"
                  >
                    That didn't go through. Email{" "}
                    <a
                      href={`mailto:${applyFlow.email}`}
                      className="underline underline-offset-4"
                    >
                      {applyFlow.email}
                    </a>{" "}
                    and we'll send it manually.
                  </p>
                )}
                <p className="t-meta mt-3">
                  One email with the PDF. No drip sequence.
                </p>
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
};
