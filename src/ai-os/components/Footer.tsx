import { applyFlow, brand } from "../content/site";

const sections = [
  {
    title: "PROGRAM",
    links: [
      ["Curriculum", "#curriculum"],
      ["What you'll build", "#projects"],
      ["How a week runs", "#rhythm"],
      ["Pricing", "#pricing"],
      ["FAQ", "#faq"],
    ],
  },
  {
    /* Points at the main site's own policy pages — this route is part of
       ravindrababuravula.in, so it must not publish a competing policy.
       TODO: add /terms and /privacy routes to the main site and list them
       here; dead links are worse than missing ones. */
    title: "POLICIES",
    links: [
      ["Refund policy", "/refund-policy"],
      ["All courses", "/courses"],
      ["ravindrababuravula.in", "/"],
    ],
  },
];

export const Footer = () => (
  <footer className="border-t border-hairline bg-ink">
    <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <p className="font-mono text-sm font-semibold tracking-wide text-bone">
            AI GENERALIST OS
          </p>
          <p className="t-card mt-2 max-w-[40ch]">
            A 38-day live builder programme from {brand.name}. Understand modern
            AI, build six real projects, graduate with a portfolio.
          </p>
          <a
            href={`mailto:${applyFlow.email}`}
            className="mt-5 inline-block text-[15px] text-bone underline underline-offset-4"
          >
            {applyFlow.email}
          </a>
          <a
            href="/courses"
            className="mt-3 block text-[15px] text-muted transition-colors hover:text-bone"
          >
            ← All courses on ravindrababuravula.in
          </a>
        </div>

        {sections.map((s) => (
          <nav
            key={s.title}
            aria-label={s.title.toLowerCase()}
            className="col-span-6 lg:col-span-2"
          >
            <p className="t-label text-muted">{s.title}</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {s.links.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-[15px] text-bone-70 transition-colors hover:text-bone"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="col-span-12 lg:col-span-3">
          <p className="t-label text-muted">COMPANY</p>
          {/* TODO: replace with your registered entity name, address and GSTIN */}
          <p className="t-card mt-4">
            {brand.name}
            <br />
            India
          </p>
          <p className="t-meta mt-4">
            Registered entity details, address and GSTIN are listed on the terms
            page.
          </p>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-3 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </p>
        <p className="font-mono text-xs text-muted">
          No job guarantee is offered or implied.
        </p>
      </div>
    </div>
  </footer>
);
