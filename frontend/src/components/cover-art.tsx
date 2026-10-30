import type { ReactNode } from "react";
import type { ProjectType } from "@/lib/types";

// Midnight Glow illustrations for project covers, one per project type.
// Pure SVG (no image downloads), so covers stay sharp and cost almost nothing to load.

const C = {
  night: "#0B1020",
  panel: "#121933",
  line: "#1F2847",
  ink: "#E5E7F0",
  muted: "#8B90A8",
  teal: "#5EEAD4",
};

type ArtProps = { brand: string };

function Chatbots({ brand }: ArtProps) {
  return (
    <>
      {/* documents feeding the bot (RAG) */}
      <rect x="14" y="70" width="38" height="48" rx="6" fill={C.panel} stroke={C.line} />
      <rect x="22" y="62" width="38" height="48" rx="6" fill={C.panel} stroke={C.teal} strokeOpacity=".5" />
      {[72, 80, 88, 96].map((y, i) => (
        <rect key={y} x="29" y={y} width={[24, 18, 24, 14][i]} height="3" rx="1.5" fill={C.muted} fillOpacity=".7" />
      ))}
      <path className="flow-line" d="M60 88 C 68 88, 66 102, 76 102" stroke={C.teal} strokeOpacity=".7" fill="none" />

      {/* chat window */}
      <rect x="76" y="14" width="196" height="152" rx="14" fill={C.night} fillOpacity=".9" stroke={C.line} />
      {[92, 102, 112].map((x) => (
        <circle key={x} cx={x} cy="30" r="3" fill={C.line} />
      ))}
      <rect x="212" y="26" width="46" height="8" rx="4" fill={C.line} />
      <line x1="76" y1="42" x2="272" y2="42" stroke={C.line} />

      <rect x="160" y="52" width="98" height="22" rx="11" fill={`url(#${brand})`} />
      <rect x="172" y="61" width="60" height="4" rx="2" fill={C.night} fillOpacity=".55" />

      <circle cx="96" cy="92" r="8" fill={`url(#${brand})`} />
      <rect x="110" y="82" width="128" height="40" rx="12" fill={C.panel} stroke={C.teal} strokeOpacity=".35" />
      <rect x="122" y="93" width="100" height="4" rx="2" fill={C.ink} fillOpacity=".75" />
      <rect x="122" y="102" width="80" height="4" rx="2" fill={C.muted} fillOpacity=".7" />
      <rect x="122" y="111" width="54" height="4" rx="2" fill={C.muted} fillOpacity=".5" />

      {[110, 156].map((x) => (
        <g key={x}>
          <rect x={x} y="128" width="42" height="12" rx="6" fill="none" stroke={C.teal} strokeOpacity=".6" />
          <rect x={x + 8} y="132.5" width="26" height="3" rx="1.5" fill={C.teal} fillOpacity=".85" />
        </g>
      ))}

      <rect x="88" y="148" width="172" height="10" rx="5" fill={C.panel} stroke={C.line} />
      <circle cx="252" cy="153" r="3" fill={C.teal} />

      {/* image generation */}
      <rect x="282" y="58" width="32" height="32" rx="8" fill={C.panel} stroke={C.teal} strokeOpacity=".5" />
      <path d="M287 84 l8 -10 l6 7 l4 -4 l5 7 z" fill={`url(#${brand})`} />
      <circle cx="306" cy="66" r="3" fill={C.teal} />
    </>
  );
}

function Mcp({ brand }: ArtProps) {
  const left = [18, 78, 138];
  const right = [18, 78, 138];
  const node = (x: number, y: number, key: string) => (
    <g key={key}>
      <rect x={x} y={y} width="44" height="26" rx="7" fill={C.panel} stroke={C.line} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={x + 8 + i * 9} y={y + 10} width="6" height="6" rx="1.5" fill={C.teal} fillOpacity={0.35 + i * 0.25} />
      ))}
      <circle cx={x + 38} cy={y + 6} r="1.8" fill={C.teal} />
    </g>
  );
  return (
    <>
      {left.map((y, i) => (
        <path key={`l${y}`} className={i === 1 ? "flow-line" : undefined} d={`M128 90 C 96 90, 96 ${y + 13}, 62 ${y + 13}`} stroke={C.teal} strokeOpacity=".45" strokeWidth="1.5" fill="none" />
      ))}
      {right.map((y, i) => (
        <path key={`r${y}`} className={i !== 1 ? "flow-line" : undefined} d={`M192 90 C 224 90, 224 ${y + 13}, 258 ${y + 13}`} stroke={C.teal} strokeOpacity=".45" strokeWidth="1.5" fill="none" />
      ))}
      <path className="flow-line" d="M160 68 V 36" stroke={C.teal} strokeOpacity=".45" strokeWidth="1.5" />
      <path d="M160 112 V 144" stroke={C.teal} strokeOpacity=".45" strokeWidth="1.5" />

      {left.map((y) => node(18, y, `nl${y}`))}
      {right.map((y) => node(258, y, `nr${y}`))}
      {node(138, 10, "nt")}
      {node(138, 144, "nb")}

      <rect x="122" y="62" width="76" height="56" rx="14" fill={C.teal} fillOpacity=".12" />
      <rect x="128" y="68" width="64" height="44" rx="12" fill={`url(#${brand})`} />
      <text x="160" y="95" textAnchor="middle" fontSize="15" fontWeight="800" fill={C.night} letterSpacing="0.5">
        MCP
      </text>
    </>
  );
}

function WhatsApp({ brand }: ArtProps) {
  return (
    <>
      {/* n8n workflow */}
      {[52, 104].map((y) => (
        <g key={y}>
          <rect x="24" y={y} width="50" height="30" rx="8" fill={C.panel} stroke={C.teal} strokeOpacity=".45" />
          <circle cx="38" cy={y + 15} r="5.5" fill="none" stroke={C.teal} strokeWidth="1.5" />
          <rect x="48" y={y + 13} width="18" height="4" rx="2" fill={C.muted} fillOpacity=".7" />
          <path className="flow-line" d={`M74 ${y + 15} H 118`} stroke={C.teal} strokeOpacity=".6" />
        </g>
      ))}
      <path d="M49 82 V 104" stroke={C.teal} strokeOpacity=".45" />

      {/* phone */}
      <rect x="118" y="6" width="86" height="168" rx="16" fill={C.night} stroke={C.line} strokeWidth="2" />
      <circle cx="133" cy="20" r="6" fill={`url(#${brand})`} />
      <rect x="144" y="15" width="36" height="5" rx="2.5" fill={C.ink} fillOpacity=".75" />
      <rect x="144" y="23" width="22" height="3" rx="1.5" fill={C.teal} />
      <line x1="118" y1="33" x2="204" y2="33" stroke={C.line} />

      <rect x="126" y="41" width="56" height="18" rx="8" fill={C.panel} stroke={C.line} />
      <rect x="133" y="48" width="40" height="4" rx="2" fill={C.muted} fillOpacity=".8" />
      <rect x="140" y="65" width="56" height="30" rx="8" fill={`url(#${brand})`} />
      <rect x="147" y="72" width="40" height="4" rx="2" fill={C.night} fillOpacity=".5" />
      <rect x="147" y="81" width="30" height="4" rx="2" fill={C.night} fillOpacity=".5" />
      <rect x="126" y="101" width="46" height="18" rx="8" fill={C.panel} stroke={C.line} />
      <rect x="133" y="108" width="30" height="4" rx="2" fill={C.muted} fillOpacity=".8" />
      <rect x="150" y="125" width="46" height="18" rx="8" fill={`url(#${brand})`} />
      <rect x="157" y="132" width="30" height="4" rx="2" fill={C.night} fillOpacity=".5" />
      {[134, 142, 150].map((x) => (
        <circle key={x} cx={x} cy="157" r="2.5" fill={C.muted} />
      ))}

      {/* Groq speed + human hand-off */}
      <path className="flow-line" d="M204 72 H 238" stroke={C.teal} strokeOpacity=".6" />
      <circle cx="258" cy="72" r="20" fill={C.panel} stroke={C.teal} strokeOpacity=".5" />
      <path d="M262 59 L251 75 H258 L255 87 L266 70 H259 Z" fill={`url(#${brand})`} />
      <path d="M204 122 H 244" stroke={C.teal} strokeOpacity=".45" />
      <circle cx="258" cy="122" r="14" fill={C.panel} stroke={C.line} />
      <path d="M252 122 l4 4 l8 -9" fill="none" stroke={C.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

function Agents({ brand }: ArtProps) {
  const xs = [12, 92, 172, 252];
  return (
    <>
      {xs.slice(0, -1).map((x, i) => (
        <g key={x}>
          <path className="flow-line" d={`M${x + 56} 70 H ${xs[i + 1] - 6}`} stroke={C.teal} strokeOpacity=".6" />
          <path d={`M${xs[i + 1] - 8} 66 l5 4 l-5 4`} fill="none" stroke={C.teal} strokeOpacity=".8" />
        </g>
      ))}
      {xs.map((x, i) => (
        <g key={x}>
          <rect
            x={x}
            y="50"
            width="56"
            height="40"
            rx="10"
            fill={C.panel}
            stroke={i === 2 ? `url(#${brand})` : C.line}
            strokeWidth={i === 2 ? 1.75 : 1}
          />
          <circle cx={x + 15} cy="70" r="7" fill={i === 2 ? `url(#${brand})` : C.teal} fillOpacity={i === 2 ? 1 : 0.25 + i * 0.15} />
          <rect x={x + 27} y="64" width="20" height="4" rx="2" fill={C.ink} fillOpacity=".7" />
          <rect x={x + 27} y="72" width="13" height="4" rx="2" fill={C.muted} fillOpacity=".7" />
        </g>
      ))}

      {/* human approval step */}
      <path className="flow-line" d="M200 90 V 120" stroke={C.teal} strokeOpacity=".55" />
      <rect x="166" y="120" width="68" height="40" rx="10" fill={C.night} stroke={C.teal} strokeOpacity=".5" strokeDasharray="3 3" />
      <circle cx="184" cy="134" r="5" fill="none" stroke={C.ink} strokeOpacity=".8" strokeWidth="1.5" />
      <path d="M176 150 c0 -6 4 -9 8 -9 s8 3 8 9" fill="none" stroke={C.ink} strokeOpacity=".8" strokeWidth="1.5" />
      <path d="M204 140 l5 5 l10 -11" fill="none" stroke={C.teal} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M234 140 C 262 140, 280 120, 280 90" stroke={C.teal} strokeOpacity=".45" fill="none" />

      <rect x="12" y="18" width="88" height="14" rx="7" fill={C.panel} stroke={C.line} />
      <circle cx="22" cy="25" r="3" fill={C.teal} />
      <rect x="30" y="23" width="60" height="4" rx="2" fill={C.muted} fillOpacity=".7" />
    </>
  );
}

function Voice({ brand }: ArtProps) {
  const heights = [10, 18, 30, 22, 40, 56, 34, 64, 48, 26, 72, 58, 36, 80, 62, 44, 70, 50, 30, 54, 38, 24, 42, 28, 18, 26, 14, 10];
  return (
    <>
      <circle cx="54" cy="90" r="34" fill={C.teal} fillOpacity=".08" />
      <circle cx="54" cy="90" r="26" fill={C.panel} stroke={`url(#${brand})`} strokeWidth="1.75" />
      <path
        transform="translate(42 78)"
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
        fill="none"
        stroke={C.teal}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {heights.map((h, i) => (
        <rect key={i} x={100 + i * 7.4} y={90 - h / 2} width="4" height={h} rx="2" fill={`url(#${brand})`} fillOpacity={0.55 + (h / 80) * 0.45} />
      ))}
      <circle cx="104" cy="34" r="4" fill={C.teal} />
      <rect x="114" y="32" width="40" height="4" rx="2" fill={C.muted} fillOpacity=".8" />
      <rect x="100" y="142" width="120" height="18" rx="9" fill={C.panel} stroke={C.line} />
      <rect x="110" y="149" width="80" height="4" rx="2" fill={C.muted} fillOpacity=".7" />
      <rect x="230" y="142" width="54" height="18" rx="9" fill="none" stroke={C.teal} strokeOpacity=".5" />
      <text x="257" y="155" textAnchor="middle" fontSize="10" fontWeight="700" fill={C.teal}>
        24/7
      </text>
    </>
  );
}

function Models({ brand }: ArtProps) {
  const pts = [
    [30, 140],
    [70, 122],
    [110, 128],
    [150, 96],
    [190, 102],
    [230, 64],
    [270, 46],
  ];
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
  return (
    <>
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="20" y1={y} x2="300" y2={y} stroke={C.line} />
      ))}
      <path d={`${line} L270 160 L30 160 Z`} fill={C.teal} fillOpacity=".12" />
      <path d={line} fill="none" stroke={`url(#${brand})`} strokeWidth="2.5" strokeLinejoin="round" />
      {pts.map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="3.5" fill={C.night} stroke={C.teal} strokeWidth="1.5" />
      ))}
      <rect x="28" y="20" width="96" height="40" rx="10" fill={C.panel} stroke={C.line} />
      <rect x="40" y="31" width="40" height="4" rx="2" fill={C.muted} fillOpacity=".8" />
      <rect x="40" y="42" width="60" height="7" rx="3.5" fill={`url(#${brand})`} />
    </>
  );
}

const art: Record<ProjectType, (p: ArtProps) => ReactNode> = {
  Chatbots,
  MCP: Mcp,
  Agents,
  Voice,
  WhatsApp,
  Models,
  // SEO and automation projects use panel covers; these fallbacks only show if one is missing.
  SEO: Agents,
  Automation: Agents,
};

export function CoverArt({ type, uid, className }: { type: ProjectType; uid: string; className?: string }) {
  const brand = `brand-${uid}`;
  const Art = art[type];
  return (
    <svg viewBox="0 0 320 180" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={brand} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5EEAD4" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <Art brand={brand} />
    </svg>
  );
}
