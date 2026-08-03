import { useEffect, useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { WovenCanvas } from "./components/WovenCanvas";
import {
  waitlist,
  pricing,
  priceLabel,
  startLabel,
  seatsLabel,
  brand,
  applyFlow,
} from "./content/site";
import { track } from "./lib/track";
import "./ai-os.css";

const perks = [
  `${pricing.liveDays} live days · ~${pricing.totalHours} hrs live + lab`,
  "6 portfolio projects, built on the call",
  "Capstone, demo day and certificate",
];

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("idle"); // idle | sending | done | error
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    const cleanPhone = phone.trim();

    // Either one is enough — don't force both.
    if (!cleanEmail && !cleanPhone) {
      setError("Enter an email address or a phone number so we can reach you.");
      setState("error");
      return;
    }
    if (cleanEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleanEmail)) {
      setError("That email address doesn't look right.");
      setState("error");
      return;
    }
    if (cleanPhone && cleanPhone.replace(/\D/g, "").length < 7) {
      setError("That phone number looks too short.");
      setState("error");
      return;
    }

    setState("sending");
    setError("");
    track("waitlist_submit", { hasEmail: !!cleanEmail, hasPhone: !!cleanPhone });

    try {
      /*
       * The Apps Script does JSON.parse(e.postData.contents), so the body must
       * be JSON — but sending `application/json` would trigger a CORS
       * preflight that Apps Script can't answer. `text/plain` is a
       * CORS-safelisted content type, so the POST goes straight through and
       * the script still receives the raw JSON string.
       *
       * Both the /exec 302 and the googleusercontent response it redirects to
       * send `Access-Control-Allow-Origin: *`, so unlike the usual no-cors
       * workaround we can actually read the result and report a real failure
       * instead of showing a false success.
       */
      const res = await fetch(waitlist.endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          email: cleanEmail,
          phone: cleanPhone,
          course: "AI Generalist OS — 38-Day Builder Program",
          price: priceLabel,
          source: typeof window !== "undefined" ? window.location.pathname : "",
          submittedAt: new Date().toISOString(),
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || (data && data.success === false)) {
        // Surface the script's own message to the console for debugging, but
        // never to the visitor.
        console.error("Waitlist signup failed:", data?.error ?? res.status);
        throw new Error(data?.error ?? `HTTP ${res.status}`);
      }

      track("waitlist_success");
      setState("done");
    } catch (err) {
      track("waitlist_error", { message: String(err?.message ?? err).slice(0, 120) });
      setState("error");
      setError(
        `We couldn't save that just now. Please email ${applyFlow.email} and we'll add you manually.`
      );
    }
  };

  return (
    <div className="aios-root grain">
      <section className="relative flex min-h-dvh w-full flex-col justify-center overflow-hidden px-5 py-24 md:px-10">
        <WovenCanvas className="absolute inset-0 h-full w-full" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink/90" />

        <div className="relative mx-auto w-full max-w-[1400px]">
          <a
            href="/ai-generalist-os"
            className="inline-flex items-center gap-2 text-[15px] text-muted transition-colors hover:text-bone"
          >
            <ArrowLeft className="h-4 w-4" /> Back to the programme
          </a>

          <div className="mt-10 grid grid-cols-12 items-start gap-x-8 gap-y-12">
            {/* ── pitch ── */}
            <div className="col-span-12 lg:col-span-6">
              <span className="aios-sec-label">Waitlist</span>
              <h1 className="mt-6 text-[clamp(1.9rem,6.5vw,3.4rem)] font-light leading-[1.15] tracking-[-1.5px] text-bone lg:text-[clamp(2.2rem,3.4vw,3.4rem)]">
                Be first in line for the next{" "}
                <span className="text-volt">cohort.</span>
              </h1>
              <p className="t-lead mt-6">
                Dates for the next AI Generalist OS cohort haven't been
                announced yet. Leave an email or a phone number and you'll hear
                the moment enrolment opens — before the seats go public.
              </p>

              <ul className="mt-8 flex flex-col gap-3">
                {perks.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[15px] text-bone">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-volt" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>

              <p className="t-meta mt-8">
                {startLabel} · {seatsLabel} · {priceLabel}
              </p>
            </div>

            {/* ── form ── */}
            <div className="col-span-12 lg:col-span-5 lg:col-start-8">
              <div className="rounded-3xl border border-hairline bg-surface/90 p-7 backdrop-blur-md md:p-9">
                {state === "done" ? (
                  <div>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-volt">
                      <Check className="h-6 w-6 text-ink" aria-hidden />
                    </span>
                    <h2 className="mt-5 text-2xl font-light leading-snug text-bone">
                      You're on the list.
                    </h2>
                    <p className="t-card mt-3">
                      We'll be in touch as soon as dates are confirmed. Nothing
                      has been charged, and you're free to walk away when the
                      details land.
                    </p>
                    <a
                      href="/courses"
                      className="mt-7 inline-block border-b border-hairline pb-0.5 text-[15px] font-medium text-bone transition-colors hover:border-bone"
                    >
                      Browse other courses →
                    </a>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate>
                    <h2 className="text-2xl font-light leading-snug text-bone">
                      Join the waitlist
                    </h2>
                    <p className="t-card mt-2">
                      Either field is enough — whichever you'd rather be reached on.
                    </p>

                    <div className="mt-7">
                      <label htmlFor="wl-email" className="t-label block text-bone-70">
                        Email address
                      </label>
                      <input
                        id="wl-email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (state === "error") setState("idle");
                        }}
                        placeholder="you@example.com"
                        className="mt-2.5 min-h-[52px] w-full rounded-full border border-hairline bg-ink px-5 text-[16px] text-bone outline-none transition-colors placeholder:text-muted focus-visible:border-volt"
                      />
                    </div>

                    <div className="my-5 flex items-center gap-4">
                      <span className="h-px flex-1 bg-hairline" />
                      <span className="t-label text-muted">or</span>
                      <span className="h-px flex-1 bg-hairline" />
                    </div>

                    <div>
                      <label htmlFor="wl-phone" className="t-label block text-bone-70">
                        Phone number
                      </label>
                      <input
                        id="wl-phone"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (state === "error") setState("idle");
                        }}
                        placeholder="+91 98765 43210"
                        className="mt-2.5 min-h-[52px] w-full rounded-full border border-hairline bg-ink px-5 text-[16px] text-bone outline-none transition-colors placeholder:text-muted focus-visible:border-volt"
                      />
                    </div>

                    {state === "error" && (
                      <p role="alert" className="mt-4 text-[15px] text-bone">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={state === "sending"}
                      className="mt-7 min-h-[52px] w-full rounded-full bg-volt px-6 text-[16px] font-bold text-ink disabled:opacity-60"
                    >
                      {state === "sending" ? "Adding you…" : "Join the waitlist"}
                    </button>

                    <p className="t-meta mt-4">
                      No payment, no spam. One message when enrolment opens.
                      Questions? {" "}
                      <a
                        href={`mailto:${applyFlow.email}`}
                        className="text-bone underline underline-offset-4"
                      >
                        {applyFlow.email}
                      </a>
                    </p>
                  </form>
                )}
              </div>

              <p className="t-meta mt-5 text-center">
                {brand.name} · {brand.site}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
