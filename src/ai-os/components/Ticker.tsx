const entries = [
  "ChatGPT",
  "Claude",
  "Perplexity",
  "NotebookLM",
  "Replit",
  "Webflow",
  "n8n",
  "Make",
  "Canva",
  "Gemini",
];

/**
 * Labelled explicitly as tools taught — an unlabelled logo strip in this slot
 * reads as "partners/backers" and implies endorsement that doesn't exist.
 */
export const Ticker = () => (
  <div className="relative overflow-hidden border-y border-hairline bg-surface py-5">
    <div className="mx-auto mb-3 max-w-[1400px] px-5 md:px-10">
      <p className="t-label text-muted">TOOLS YOU'LL MASTER</p>
    </div>
    <div className="animate-marquee flex w-max whitespace-nowrap" aria-hidden="true">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex items-center">
          {entries.map((e) => (
            <span key={copy + e} className="flex items-center">
              <span className="px-7 text-lg font-medium text-bone-70 md:text-xl">
                {e}
              </span>
              <span className="h-1 w-1 rounded-full bg-muted/50" />
            </span>
          ))}
        </div>
      ))}
    </div>
    <p className="sr-only">
      Tools taught in the program: {entries.join(", ")}.
    </p>
  </div>
);
