/**
 * Product-UI mockups for the six builds. These are illustrations of the
 * artifacts students produce — every card that uses one labels it as an
 * example, never as a screenshot of a real student's work.
 *
 * Drawn rather than photographed so they stay crisp, weigh nothing, and match
 * the palette exactly.
 */

/* Mirrors the palette in ai-os.css — SVG attributes can't read CSS variables
   from a stylesheet, so these are the one place the values are repeated. */
const INK = "#0e0e0e";
const SURFACE = "#161616";
const RAISED = "#232323";
const BONE = "#ffffff";
const MUTED = "#8a8a8a";
const VOLT = "#ffb703";
const LINE = "rgba(255,255,255,0.14)";

type Props = { className?: string };

const Frame = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <svg
    viewBox="0 0 400 250"
    className={`h-auto w-full ${className}`}
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
    focusable="false"
  >
    <rect width="400" height="250" rx="10" fill={SURFACE} />
    <rect
      x="0.5"
      y="0.5"
      width="399"
      height="249"
      rx="9.5"
      fill="none"
      stroke={LINE}
    />
    {children}
  </svg>
);

/** Browser chrome shared by the web-surface mockups. */
const Chrome = ({ label }: { label: string }) => (
  <>
    <rect x="1" y="1" width="398" height="26" rx="9" fill={INK} />
    <rect x="1" y="18" width="398" height="9" fill={INK} />
    <circle cx="16" cy="14" r="3" fill={MUTED} />
    <circle cx="27" cy="14" r="3" fill={MUTED} />
    <circle cx="38" cy="14" r="3" fill={MUTED} />
    <rect x="52" y="8" width="140" height="12" rx="6" fill={RAISED} />
    <text x="60" y="17" fill={MUTED} fontSize="7" fontFamily="monospace">
      {label}
    </text>
    <line x1="0" y1="27" x2="400" y2="27" stroke={LINE} />
  </>
);

/* 1 — Live portfolio website */
export const PortfolioVisual = ({ className }: Props) => (
  <Frame className={className}>
    <Chrome label="yourname.com" />
    {/* nav */}
    <rect x="20" y="42" width="34" height="7" rx="3.5" fill={BONE} opacity="0.9" />
    <rect x="300" y="43" width="22" height="5" rx="2.5" fill={MUTED} />
    <rect x="330" y="43" width="22" height="5" rx="2.5" fill={MUTED} />
    <rect x="360" y="40" width="22" height="11" rx="5.5" fill={VOLT} />
    {/* hero */}
    <rect x="20" y="72" width="190" height="15" rx="4" fill={BONE} />
    <rect x="20" y="94" width="140" height="15" rx="4" fill={BONE} />
    <rect x="20" y="120" width="170" height="5" rx="2.5" fill={MUTED} />
    <rect x="20" y="131" width="120" height="5" rx="2.5" fill={MUTED} />
    <rect x="20" y="150" width="64" height="16" rx="8" fill={VOLT} />
    {/* portrait */}
    <circle cx="330" cy="112" r="42" fill={RAISED} />
    <circle cx="330" cy="100" r="14" fill={MUTED} opacity="0.65" />
    <path d="M308 133a22 18 0 0 1 44 0z" fill={MUTED} opacity="0.65" />
    {/* project row */}
    <line x1="20" y1="184" x2="380" y2="184" stroke={LINE} />
    {[20, 144, 268].map((x) => (
      <g key={x}>
        <rect x={x} y="196" width="112" height="38" rx="6" fill={RAISED} />
        <rect x={x + 10} y="206" width="46" height="5" rx="2.5" fill={BONE} opacity="0.8" />
        <rect x={x + 10} y="217" width="76" height="4" rx="2" fill={MUTED} />
      </g>
    ))}
  </Frame>
);

/* 2 — AI chatbot */
export const ChatbotVisual = ({ className }: Props) => (
  <Frame className={className}>
    <rect x="1" y="1" width="398" height="34" rx="9" fill={INK} />
    <rect x="1" y="26" width="398" height="9" fill={INK} />
    <circle cx="24" cy="18" r="9" fill={VOLT} />
    <path d="M20 18h8M24 14v8" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
    <rect x="42" y="12" width="86" height="6" rx="3" fill={BONE} opacity="0.85" />
    <rect x="42" y="23" width="52" height="4" rx="2" fill={MUTED} />
    <line x1="0" y1="35" x2="400" y2="35" stroke={LINE} />

    {/* bot message */}
    <rect x="20" y="50" width="200" height="42" rx="10" fill={RAISED} />
    <rect x="32" y="62" width="150" height="5" rx="2.5" fill={BONE} opacity="0.75" />
    <rect x="32" y="75" width="118" height="5" rx="2.5" fill={MUTED} />

    {/* user message */}
    <rect x="200" y="104" width="180" height="30" rx="10" fill={VOLT} opacity="0.16" />
    <rect x="212" y="115" width="130" height="5" rx="2.5" fill={VOLT} opacity="0.85" />

    {/* bot message with citation chips */}
    <rect x="20" y="146" width="230" height="52" rx="10" fill={RAISED} />
    <rect x="32" y="158" width="180" height="5" rx="2.5" fill={BONE} opacity="0.75" />
    <rect x="32" y="171" width="140" height="5" rx="2.5" fill={MUTED} />
    <rect x="32" y="184" width="34" height="8" rx="4" fill={VOLT} opacity="0.3" />
    <rect x="72" y="184" width="34" height="8" rx="4" fill={VOLT} opacity="0.3" />

    {/* composer */}
    <rect x="20" y="212" width="330" height="24" rx="12" fill={INK} stroke={LINE} />
    <rect x="34" y="221" width="96" height="5" rx="2.5" fill={MUTED} />
    <circle cx="366" cy="224" r="12" fill={VOLT} />
    <path
      d="M361 224h9m-4-4 4 4-4 4"
      stroke={INK}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Frame>
);

/* 3 — Document AI assistant */
export const DocumentVisual = ({ className }: Props) => (
  <Frame className={className}>
    <Chrome label="ask-your-docs" />
    {/* document page */}
    <rect x="20" y="42" width="160" height="192" rx="6" fill={RAISED} />
    <rect x="34" y="58" width="80" height="8" rx="3" fill={BONE} opacity="0.85" />
    {[78, 90, 102, 114, 126, 138, 150, 162].map((y, i) => (
      <rect
        key={y}
        x="34"
        y={y}
        width={i % 3 === 2 ? 92 : 132}
        height="4"
        rx="2"
        fill={MUTED}
        opacity="0.75"
      />
    ))}
    {/* highlighted passage */}
    <rect x="30" y="172" width="140" height="16" rx="3" fill={VOLT} opacity="0.18" />
    <rect x="34" y="178" width="120" height="4" rx="2" fill={VOLT} opacity="0.8" />
    {[196, 208].map((y) => (
      <rect key={y} x="34" y={y} width="126" height="4" rx="2" fill={MUTED} opacity="0.75" />
    ))}

    {/* extraction panel */}
    <rect x="196" y="42" width="184" height="192" rx="6" fill={INK} stroke={LINE} />
    <text x="210" y="62" fill={VOLT} fontSize="8" fontFamily="monospace" letterSpacing="1.2">
      EXTRACTED
    </text>
    {[
      [76, 40, 86],
      [104, 52, 70],
      [132, 34, 96],
      [160, 46, 62],
    ].map(([y, kw, vw]) => (
      <g key={y}>
        <rect x="210" y={y} width={kw} height="5" rx="2.5" fill={MUTED} />
        <rect x="210" y={y + 11} width={vw} height="6" rx="3" fill={BONE} opacity="0.85" />
        <line x1="210" y1={y + 24} x2="366" y2={y + 24} stroke={LINE} />
      </g>
    ))}
    <rect x="210" y="196" width="96" height="18" rx="9" fill={VOLT} />
  </Frame>
);

/* 4 — Automation workflow */
export const AutomationVisual = ({ className }: Props) => {
  const node = (x: number, y: number, active = false) => (
    <g key={`${x}-${y}`}>
      <rect
        x={x}
        y={y}
        width="92"
        height="44"
        rx="8"
        fill={active ? VOLT : RAISED}
        stroke={active ? VOLT : LINE}
      />
      <circle cx={x + 16} cy={y + 22} r="7" fill={active ? INK : VOLT} opacity={active ? 1 : 0.8} />
      <rect
        x={x + 30}
        y={y + 14}
        width="46"
        height="5"
        rx="2.5"
        fill={active ? INK : BONE}
        opacity={active ? 0.85 : 0.85}
      />
      <rect
        x={x + 30}
        y={y + 25}
        width="32"
        height="4"
        rx="2"
        fill={active ? INK : MUTED}
        opacity={active ? 0.6 : 1}
      />
    </g>
  );

  return (
    <Frame className={className}>
      <rect x="1" y="1" width="398" height="26" rx="9" fill={INK} />
      <rect x="1" y="18" width="398" height="9" fill={INK} />
      <text x="16" y="17" fill={MUTED} fontSize="8" fontFamily="monospace" letterSpacing="1">
        workflow · live
      </text>
      <circle cx="380" cy="14" r="4" fill={VOLT} />
      <line x1="0" y1="27" x2="400" y2="27" stroke={LINE} />

      {/* connectors */}
      <path
        d="M112 78h34a10 10 0 0 1 10 10v22a10 10 0 0 0 10 10h30"
        fill="none"
        stroke={LINE}
        strokeWidth="1.5"
      />
      <path
        d="M288 120h30a10 10 0 0 1 10 10v22a10 10 0 0 1-10 10h-40"
        fill="none"
        stroke={LINE}
        strokeWidth="1.5"
      />
      <path d="M112 78h34" fill="none" stroke={VOLT} strokeWidth="1.5" opacity="0.55" />
      <path d="M196 172h-40" fill="none" stroke={LINE} strokeWidth="1.5" />

      {node(20, 56)}
      {node(196, 98, true)}
      {node(64, 150)}

      {/* run log */}
      <rect x="20" y="206" width="360" height="28" rx="6" fill={INK} stroke={LINE} />
      <circle cx="36" cy="220" r="4" fill={VOLT} />
      <rect x="50" y="217" width="150" height="5" rx="2.5" fill={MUTED} />
      <rect x="316" y="216" width="48" height="7" rx="3.5" fill={VOLT} opacity="0.25" />
    </Frame>
  );
};

/* 5 — Content + marketing system */
export const ContentVisual = ({ className }: Props) => {
  const cells: React.ReactNode[] = [];
  const filled = new Set([1, 2, 5, 8, 9, 12, 15, 16, 19]);
  const volt = new Set([2, 9, 16]);
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 7; c++) {
      const i = r * 7 + c;
      const x = 20 + c * 52;
      const y = 84 + r * 50;
      cells.push(
        <g key={i}>
          <rect x={x} y={y} width="44" height="42" rx="6" fill={RAISED} />
          {filled.has(i) && (
            <>
              <rect
                x={x + 8}
                y={y + 10}
                width="28"
                height="5"
                rx="2.5"
                fill={volt.has(i) ? VOLT : BONE}
                opacity={volt.has(i) ? 1 : 0.8}
              />
              <rect x={x + 8} y={y + 21} width="20" height="4" rx="2" fill={MUTED} />
              <rect x={x + 8} y={y + 30} width="24" height="4" rx="2" fill={MUTED} opacity="0.7" />
            </>
          )}
        </g>
      );
    }
  }
  return (
    <Frame className={className}>
      <Chrome label="content-calendar" />
      <rect x="20" y="42" width="120" height="9" rx="4" fill={BONE} opacity="0.9" />
      <rect x="316" y="41" width="64" height="14" rx="7" fill={VOLT} />
      {/* weekday header */}
      {["M", "T", "W", "T", "F", "S", "S"].map((d, c) => (
        <text
          key={c}
          x={20 + c * 52 + 6}
          y="76"
          fill={MUTED}
          fontSize="8"
          fontFamily="monospace"
        >
          {d}
        </text>
      ))}
      {cells}
    </Frame>
  );
};

/* 6 — Capstone + certificate */
export const CapstoneVisual = ({ className }: Props) => (
  <Frame className={className}>
    {/* presented slide */}
    <rect x="20" y="26" width="230" height="150" rx="8" fill={RAISED} />
    <rect x="36" y="44" width="110" height="11" rx="4" fill={BONE} opacity="0.9" />
    <rect x="36" y="62" width="76" height="6" rx="3" fill={MUTED} />
    {/* mini chart */}
    <line x1="36" y1="150" x2="234" y2="150" stroke={LINE} />
    {[
      [44, 34],
      [76, 52],
      [108, 44],
      [140, 68],
      [172, 60],
      [204, 84],
    ].map(([x, h], i) => (
      <rect
        key={x}
        x={x}
        y={150 - h}
        width="18"
        height={h}
        rx="3"
        fill={i === 5 ? VOLT : MUTED}
        opacity={i === 5 ? 1 : 0.5}
      />
    ))}
    {/* live badge */}
    <rect x="196" y="36" width="42" height="14" rx="7" fill={INK} />
    <circle cx="206" cy="43" r="3" fill={VOLT} />
    <text x="213" y="46" fill={BONE} fontSize="7" fontFamily="monospace">
      LIVE
    </text>

    {/* certificate */}
    <rect x="266" y="26" width="114" height="150" rx="8" fill={INK} stroke={VOLT} strokeOpacity="0.4" />
    <rect x="282" y="44" width="60" height="6" rx="3" fill={VOLT} opacity="0.85" />
    <rect x="282" y="58" width="82" height="5" rx="2.5" fill={MUTED} />
    <line x1="282" y1="76" x2="364" y2="76" stroke={LINE} />
    {[86, 98, 110].map((y) => (
      <rect key={y} x="282" y={y} width={y === 110 ? 52 : 74} height="4" rx="2" fill={MUTED} opacity="0.7" />
    ))}
    <circle cx="323" cy="146" r="17" fill="none" stroke={VOLT} strokeOpacity="0.55" />
    <circle cx="323" cy="146" r="10" fill={VOLT} opacity="0.18" />
    <path
      d="M317 146l4 4 8-8"
      fill="none"
      stroke={VOLT}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* audience strip */}
    <rect x="20" y="192" width="360" height="42" rx="8" fill={INK} stroke={LINE} />
    {[46, 86, 126, 166, 206, 246, 286, 326].map((cx) => (
      <g key={cx}>
        <circle cx={cx} cy="207" r="7" fill={RAISED} />
        <rect x={cx - 12} y="219" width="24" height="4" rx="2" fill={MUTED} opacity="0.6" />
      </g>
    ))}
    <circle cx="366" cy="213" r="10" fill={VOLT} opacity="0.2" />
    <text x="360" y="217" fill={VOLT} fontSize="9" fontFamily="monospace">
      +
    </text>
  </Frame>
);

export const projectVisuals = {
  portfolio: PortfolioVisual,
  chatbot: ChatbotVisual,
  document: DocumentVisual,
  automation: AutomationVisual,
  content: ContentVisual,
  capstone: CapstoneVisual,
} as const;

export type ProjectVisualKey = keyof typeof projectVisuals;
