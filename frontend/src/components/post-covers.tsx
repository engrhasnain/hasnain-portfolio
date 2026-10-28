import type { CSSProperties, ReactNode } from "react";

// Live (HTML) versions of blog covers, so they can move: the card is tilted and straightens on hover,
// and the network twinkles. The same design is also saved as a JPG (frontmatter `cover`) for share previews.
// Sizes are in `em`; 1em is 1/120 of the cover's width, so it looks the same on a post page or a small card.
// Covers are green-led: teal and emerald, with amber and rose only where they mean "needs approval" and "never".

const TEAL = "#5EEAD4";
const EMERALD = "#34D399";
const greenText = "bg-[linear-gradient(90deg,#5EEAD4,#34D399)] bg-clip-text text-transparent";
const greenTile = "bg-[linear-gradient(135deg,#5EEAD4,#34D399)] text-night shadow-[0_0_3em_-0.6em_rgb(52_211_153/0.85)]";

function CoverNetwork({ seed = 7 }: { seed?: number }) {
  let s = seed;
  const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  const nodes = Array.from({ length: 30 }, () => ({ x: rnd() * 1200, y: rnd() * 630, r: 1.5 + rnd() * 2.2, emerald: rnd() < 0.45 }));
  const links: [number, number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
      if (d < 150) links.push([i, j, d]);
    }
  }
  return (
    <svg viewBox="0 0 1200 630" preserveAspectRatio="none" className="absolute inset-0 size-full">
      {links.map(([i, j, d]) => (
        <line
          key={`${i}-${j}`}
          x1={nodes[i].x}
          y1={nodes[i].y}
          x2={nodes[j].x}
          y2={nodes[j].y}
          stroke={TEAL}
          strokeOpacity={((1 - d / 150) * 0.32).toFixed(2)}
          strokeWidth="1"
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill={n.emerald ? EMERALD : TEAL}
          className="net-node"
          style={{ "--d": `${(i * 0.37) % 3.2}s` } as CSSProperties}
        />
      ))}
    </svg>
  );
}

/** Shared layout: eyebrow, title and subtitle on the left, the author at the bottom, a tilted card on the right. */
function CoverLayout({
  eyebrow,
  title,
  subtitle,
  seed,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  seed: number;
  children: ReactNode;
}) {
  return (
    <div aria-hidden="true" className="cover-host relative aspect-[1200/630] w-full overflow-hidden bg-night">
      <div className="post-cover-root absolute inset-0">
        <div className="absolute -top-[48%] -right-[22%] aspect-square w-[63%] rounded-full bg-[radial-gradient(circle,rgb(94_234_212/0.24),transparent_62%)]" />
        <div className="absolute -bottom-[57%] -left-[25%] aspect-square w-[58%] rounded-full bg-[radial-gradient(circle,rgb(52_211_153/0.2),transparent_62%)]" />
        <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(70%_70%_at_60%_40%,black,transparent)]" />
        <CoverNetwork seed={seed} />

        <div className="absolute top-[6.2em] left-[6.4em] w-[60em]">
          <p className="flex items-center gap-[0.9em] font-mono text-[1.5em] tracking-[0.22em] text-teal uppercase">
            <span className="h-[0.14em] w-[2.3em] bg-[linear-gradient(90deg,#5EEAD4,#34D399)]" />
            {eyebrow}
          </p>
          <p className="mt-[0.46em] text-[5.6em] leading-[1.04] font-extrabold tracking-[-0.035em] text-ink">{title}</p>
          <p className="mt-[1.1em] max-w-[27em] text-[2em] leading-[1.5] text-muted">{subtitle}</p>
        </div>

        <div className="absolute bottom-[5.2em] left-[6.4em] flex items-center gap-[1.4em]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hasnain.jpg"
            alt=""
            className="size-[4.6em] rounded-full bg-[linear-gradient(135deg,#5EEAD4,#34D399)] object-cover p-[0.2em]"
          />
          <span>
            <span className="block text-[1.7em] font-bold text-ink">Muhammad Hasnain Pirzada</span>
            <span className="block text-[1.4em] text-muted">Full Stack AI Engineer</span>
          </span>
        </div>

        {/* the card: tilted, straightens when you hover the cover */}
        <div className="absolute top-[9.2em] right-[5.8em] w-[43em]">
          <div className="tilt">
            <div className="agent-card rounded-[2.2em] border border-white/10 bg-[linear-gradient(180deg,rgb(20_38_58/0.95),rgb(16_28_44/0.95))] p-[2.6em] pb-[2.2em] shadow-[0_3em_8em_-3em_rgb(0_0_0/0.9),0_0_6em_-2em_rgb(52_211_153/0.4)] transition-shadow duration-700">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardHeader({ icon, label, name, status }: { icon: ReactNode; label: string; name: string; status: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-[1.4em]">
        <span className={`grid size-[5.2em] place-items-center rounded-[1.4em] ${greenTile}`}>
          <svg width="2.8em" height="2.8em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {icon}
          </svg>
        </span>
        <span>
          <span className="block font-mono text-[1.2em] tracking-[0.2em] text-muted">{label}</span>
          <span className="block text-[2.1em] font-extrabold text-ink">{name}</span>
        </span>
      </div>
      <span className="flex items-center gap-[0.4em] rounded-full border border-emerald-400/45 bg-emerald-400/10 px-[0.85em] py-[0.38em] text-[1.3em] font-semibold text-emerald-300">
        <span className="relative flex size-[0.55em]">
          <span className="absolute inline-flex size-full rounded-full bg-emerald-300 opacity-75 motion-safe:animate-ping" />
          <span className="relative inline-flex size-[0.55em] rounded-full bg-emerald-300" />
        </span>
        {status}
      </span>
    </div>
  );
}

const chip = "agent-chip flex items-center gap-[0.5em] rounded-full border px-[0.95em] py-[0.45em] text-[1.5em] font-semibold transition duration-500";
const okChip = "border-teal/45 bg-teal/10 text-teal";
const waitChip = "border-amber/50 bg-amber/10 text-amber";
const noChip = "border-rose-400/50 bg-rose-400/10 text-rose-400";

/** "Your AI Agent Needs a Job Description Before It Gets Access" */
function AgentIdCover() {
  return (
    <CoverLayout
      seed={7}
      eyebrow="AI agents · MCP · AI security"
      title={
        <>
          Your AI Agent Needs a <span className={greenText}>Job Description</span> Before It Gets Access
        </>
      }
      subtitle="How to decide what an agent can read, send and change, before it touches a real system."
    >
      <CardHeader
        label="AGENT ID"
        name="content-agent-01"
        status="active"
        icon={
          <>
            <path d="M12 8V4H8" />
            <rect x="4" y="8" width="16" height="12" rx="2" />
            <path d="M2 14h2" />
            <path d="M20 14h2" />
            <path d="M15 13v2" />
            <path d="M9 13v2" />
          </>
        }
      />
      <div className="mt-[2em] grid gap-[1.2em] border-t border-white/10 pt-[1.6em]">
        <div>
          <span className="font-mono text-[1.2em] tracking-[0.16em] text-muted">ROLE</span>
          <span className="mt-[0.2em] block text-[1.6em] font-semibold text-ink">Draft service pages and posts</span>
        </div>
        <div>
          <span className="font-mono text-[1.2em] tracking-[0.16em] text-muted">OWNER</span>
          <span className="mt-[0.2em] block text-[1.6em] font-semibold text-ink">Marketing lead · review every 90 days</span>
        </div>
      </div>
      <div className="mt-[1.8em] flex flex-col gap-[0.9em]">
        <span className={`${chip} ${okChip}`}>✓ Read client knowledge base</span>
        <span className={`${chip} ${waitChip}`}>⏸ Publish · needs a person</span>
        <span className={`${chip} ${noChip}`}>✕ Billing · never</span>
      </div>
    </CoverLayout>
  );
}

const tools = [
  { name: "crm.find_customer", label: "✓ read", tone: okChip },
  { name: "crm.list_deals", label: "✓ read", tone: okChip },
  { name: "crm.update_deal", label: "⏸ needs approval", tone: waitChip },
  { name: "crm.delete_contact", label: "✕ blocked", tone: noChip },
];

/** "What Is an MCP Server, and Does Your Business Need One?" */
function McpServerCover() {
  return (
    <CoverLayout
      seed={19}
      eyebrow="MCP · Claude · AI agents"
      title={
        <>
          What Is an <span className={greenText}>MCP Server</span>, and Does Your Business Need One?
        </>
      }
      subtitle="What it is, when it's worth building, and how to keep the AI inside the limits you set."
    >
      <CardHeader
        label="MCP SERVER"
        name="crm-server"
        status="connected"
        icon={
          <>
            <path d="M12 22v-5" />
            <path d="M9 8V2" />
            <path d="M15 8V2" />
            <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
          </>
        }
      />
      <p className="mt-[1.6em] border-t border-white/10 pt-[1.4em] font-mono text-[1.2em] tracking-[0.18em] text-muted">TOOLS FOR CLAUDE</p>
      <ul className="mt-[1em] flex flex-col gap-[0.8em]">
        {tools.map((t) => (
          <li key={t.name} className="flex items-center justify-between gap-[1em] rounded-[1em] border border-white/[0.07] bg-night/60 px-[1.1em] py-[0.7em]">
            <span className="font-mono text-[1.45em] text-ink">
              <span className="text-emerald-300">{t.name.split(".")[0]}</span>
              <span className="text-muted">.</span>
              {t.name.split(".")[1]}
            </span>
            <span className={`${chip} ${t.tone} text-[1.2em]! whitespace-nowrap`}>{t.label}</span>
          </li>
        ))}
      </ul>
      <p className="mt-[1.4em] font-mono text-[1.2em] text-muted">OAuth 2.1 · every call logged</p>
    </CoverLayout>
  );
}

/** "How I Build RAG Chatbots That Don't Make Things Up" */
function RagChatbotCover() {
  return (
    <CoverLayout
      seed={31}
      eyebrow="RAG · Claude · AI security"
      title={
        <>
          How I Build <span className={greenText}>RAG Chatbots</span> That Don&apos;t Make Things Up
        </>
      }
      subtitle="Five things I do on every build, so the bot answers from your documents or says it doesn't know."
    >
      <CardHeader
        label="AI CHATBOT"
        name="support-bot"
        status="grounded"
        icon={
          <>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <path d="M8 9h8" />
            <path d="M8 13h5" />
          </>
        }
      />
      <div className="mt-[1.8em] flex flex-col gap-[0.9em] border-t border-white/10 pt-[1.6em] text-[1.5em] leading-snug">
        <p className="ml-auto max-w-[80%] rounded-[1em] rounded-br-[0.3em] bg-[linear-gradient(90deg,#5EEAD4,#34D399)] px-[0.9em] py-[0.5em] font-semibold text-night">
          What&apos;s your refund policy?
        </p>
        <div className="max-w-[90%] rounded-[1em] rounded-tl-[0.3em] border border-white/10 bg-white/[0.04] px-[0.9em] py-[0.55em] text-ink">
          Refunds within 14 days with the original receipt.
          <span className="mt-[0.45em] flex w-fit items-center gap-[0.4em] rounded-[0.5em] border border-teal/40 bg-teal/10 px-[0.55em] py-[0.15em] font-mono text-[0.8em] text-teal">
            source: refund-policy.pdf · p.2
          </span>
        </div>
        <p className="ml-auto max-w-[80%] rounded-[1em] rounded-br-[0.3em] bg-[linear-gradient(90deg,#5EEAD4,#34D399)] px-[0.9em] py-[0.5em] font-semibold text-night">
          Do you price-match?
        </p>
        <div className="max-w-[90%] rounded-[1em] rounded-tl-[0.3em] border border-white/10 bg-white/[0.04] px-[0.9em] py-[0.55em] text-ink">
          I don&apos;t know that one yet. I&apos;ll pass you to the team.
          <span className="mt-[0.45em] flex w-fit items-center gap-[0.4em] rounded-[0.5em] border border-amber/50 bg-amber/10 px-[0.55em] py-[0.15em] font-mono text-[0.8em] text-amber">
            handed to a person
          </span>
        </div>
      </div>
    </CoverLayout>
  );
}

const wave = [0.35, 0.6, 0.9, 0.5, 1, 0.7, 0.4, 0.85, 0.55, 0.3, 0.75, 0.95, 0.45, 0.65, 0.3, 0.8, 0.5, 0.7, 0.35, 0.55];

/** "Your Voice AI Hears "Martin" When Your Customer Says "Mardan"" */
function VoiceNamesCover() {
  return (
    <CoverLayout
      seed={43}
      eyebrow="Voice AI · Speech recognition"
      title={
        <>
          Your Voice AI Gets the Sentence Right and <span className={greenText}>the Name Wrong</span>
        </>
      }
      subtitle="Why names break voice agents, what the research says, and five fixes that work."
    >
      <CardHeader
        label="VOICE AGENT"
        name="booking-line"
        status="listening"
        icon={
          <>
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <path d="M12 19v3" />
          </>
        }
      />
      <div className="mt-[1.8em] flex h-[4.2em] items-center gap-[0.45em] border-t border-white/10 pt-[1.4em]">
        {wave.map((h, i) => (
          <span
            key={i}
            className="net-node w-[0.55em] rounded-full bg-[linear-gradient(180deg,#5EEAD4,#34D399)]"
            style={{ height: `${h * 2.8}em`, "--d": `${(i * 0.21) % 2.4}s` } as CSSProperties}
          />
        ))}
      </div>
      <div className="mt-[1.4em] grid gap-[0.9em] text-[1.5em]">
        <div className="flex items-center justify-between rounded-[0.8em] border border-white/[0.07] bg-night/60 px-[0.8em] py-[0.5em]">
          <span className="font-mono text-[0.8em] tracking-[0.14em] text-muted">CUSTOMER SAID</span>
          <span className="font-bold text-teal">&ldquo;Mardan&rdquo;</span>
        </div>
        <div className="flex items-center justify-between rounded-[0.8em] border border-white/[0.07] bg-night/60 px-[0.8em] py-[0.5em]">
          <span className="font-mono text-[0.8em] tracking-[0.14em] text-muted">MODEL HEARD</span>
          <span className="font-bold text-rose-400 line-through decoration-2">&ldquo;Martin&rdquo;</span>
        </div>
        <span className={`${chip} ${okChip} text-[1em]!`}>✓ Matched to your cities: Mardan</span>
        <span className={`${chip} ${waitChip} text-[1em]!`}>⏸ &ldquo;Mardan, in KP, right?&rdquo;</span>
      </div>
    </CoverLayout>
  );
}

const covers = {
  "agent-id": AgentIdCover,
  "mcp-server": McpServerCover,
  "rag-chatbot": RagChatbotCover,
  "voice-names": VoiceNamesCover,
} as const;

export type CoverArt = keyof typeof covers;

export function hasPostCover(art: string | undefined): art is CoverArt {
  return !!art && art in covers;
}

export function PostCover({ art }: { art: CoverArt }) {
  const Cover = covers[art];
  return <Cover />;
}
