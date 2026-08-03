import { Section, SysLabel, Reveal } from "./shared";
import { Check, Minus } from "lucide-react";
import { priceLabel } from "../content/site";

const columns = [
  "Free YouTube / courses",
  "₹500–2,000 workshops",
  "₹1.5–3L bootcamps",
  "AI Generalist OS",
];

const rows: { label: string; cells: (string | boolean)[] }[] = [
  {
    label: "Typical cost",
    cells: ["Free", "₹500 – ₹2,000", "₹1,50,000+", priceLabel],
  },
  {
    label: "Live, with a person answering",
    cells: [false, "One session", true, true],
  },
  {
    label: "Projects you actually finish",
    cells: ["Rarely", "None", "1–2", "6"],
  },
  {
    label: "Feedback on your own work",
    cells: [false, false, true, true],
  },
  {
    label: "Time to first shipped build",
    cells: ["Undefined", "None", "2–4 months", "Day 18"],
  },
  {
    label: "Needs a coding background",
    cells: ["Usually", false, "Usually", false],
  },
  {
    label: "Ends with something public",
    cells: [false, false, "Sometimes", "Portfolio + demo day"],
  },
];

const Cell = ({ v, own }: { v: string | boolean; own: boolean }) => {
  if (v === true)
    return (
      <Check
        className={`h-4 w-4 ${own ? "text-volt" : "text-bone-70"}`}
        aria-label="Yes"
      />
    );
  if (v === false)
    return <Minus className="h-4 w-4 text-muted/60" aria-label="No" />;
  return (
    <span className={own ? "font-medium text-bone" : "text-muted"}>{v}</span>
  );
};

export const Compare = () => (
  <Section id="compare" className="py-24 md:py-36">
    <SysLabel index="02" name="WHY NOT JUST WATCH YOUTUBE" />

    <div className="grid grid-cols-12 gap-x-6 gap-y-4">
      <div className="col-span-12 lg:col-span-6">
        <Reveal>
          <h2 className="text-4xl font-light leading-[1.15] tracking-[-0.02em] text-bone md:text-6xl">
            The honest comparison.
          </h2>
        </Reveal>
      </div>
      <div className="col-span-12 lg:col-span-5 lg:col-start-8">
        <Reveal delay={0.1}>
          <p className="t-lead">
            Everything here is available free somewhere. So is every recipe, and
            people still hire cooks. What you're buying is sequence, deadline
            and someone who reviews what you made.
          </p>
        </Reveal>
      </div>
    </div>

    <Reveal delay={0.15}>
      {/* contained horizontal scroll — the page itself never scrolls sideways */}
      <div className="mt-14 -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <caption className="sr-only">
            AI Generalist OS compared with free content, short workshops and
            long-form bootcamps
          </caption>
          <thead>
            <tr>
              <th scope="col" className="w-[26%] pb-5 pr-4 align-bottom">
                <span className="sr-only">Feature</span>
              </th>
              {columns.map((c, i) => {
                const own = i === columns.length - 1;
                return (
                  <th
                    key={c}
                    scope="col"
                    className={`w-[18.5%] pb-5 pr-4 align-bottom text-[15px] font-medium ${
                      own ? "text-bone" : "text-muted"
                    }`}
                  >
                    {own && (
                      <span className="mb-2 block font-mono text-[11px] tracking-[0.18em] text-volt">
                        THIS PROGRAM
                      </span>
                    )}
                    {c}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-t border-hairline">
                <th
                  scope="row"
                  className="py-4 pr-4 text-[15px] font-normal text-bone-70"
                >
                  {r.label}
                </th>
                {r.cells.map((v, i) => {
                  const own = i === r.cells.length - 1;
                  return (
                    <td
                      key={i}
                      className={`py-4 pr-4 text-[15px] ${
                        own ? "bg-surface/60" : ""
                      }`}
                    >
                      <Cell v={v} own={own} />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>

    <Reveal delay={0.2}>
      <p className="t-meta mt-5">
        Cost ranges for other formats are typical Indian market figures, not
        quotes from specific providers.
      </p>
    </Reveal>
  </Section>
);
