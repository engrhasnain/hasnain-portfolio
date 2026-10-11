import type { CSSProperties } from "react";
import { services } from "@/lib/services";
import { Avatar } from "./avatar";
import { serviceIcons } from "./icons";
import { LiveFeed } from "./live-feed";
import { NeuralCanvas } from "./neural-canvas";
import { NodeChip } from "./node-chip";

// Same chips and names as the system map, so the hero and the diagram tell one story.
const chipFor = (slug: string) => services.find((s) => s.slug === slug)!;
const chips = [
  { service: chipFor("ai-platform"), position: "-left-16 top-4", delay: "0s" },
  { service: chipFor("mcp-server"), position: "-right-6 top-[38%] xl:-right-16", delay: "-2s" },
  { service: chipFor("ai-agent"), position: "-left-12 bottom-6", delay: "-4s" },
];

/** Hero visual: photo in a rotating gradient ring, an orbiting AI network, floating chips and a live feed. */
export function HeroPortrait() {
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative size-52 sm:size-64 lg:size-80">
        <NeuralCanvas className="pointer-events-none absolute top-1/2 left-1/2 size-[175%] -translate-x-1/2 -translate-y-1/2" />
        <div
          aria-hidden="true"
          className="animate-glow absolute -inset-12 rounded-full bg-[radial-gradient(circle,rgb(94_234_212/0.3),rgb(59_130_246/0.12)_45%,transparent_68%)]"
        />
        <div
          aria-hidden="true"
          className="animate-spin-slow absolute -inset-[5px] rounded-full bg-[conic-gradient(from_0deg,#5EEAD4,#3B82F6,#0B1020_35%,#0B1020_55%,#3B82F6_75%,#5EEAD4)]"
        />
        <Avatar
          ring="bg-night p-[5px]"
          className="size-full"
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 256px, 208px"
          priority
        />
        {chips.map(({ service, position, delay }) => (
          <span
            key={service.slug}
            aria-hidden="true"
            style={{ "--d": delay } as CSSProperties}
            className={`animate-float absolute hidden sm:block ${position}`}
          >
            <NodeChip
              Icon={serviceIcons[service.icon]}
              label={service.title}
              size="sm"
              className="shadow-[0_12px_30px_-10px_rgb(0_0_0/0.9),0_0_24px_-8px_rgb(94_234_212/0.6)]"
            />
          </span>
        ))}
      </div>
      <LiveFeed className="relative mt-10 lg:absolute lg:-right-6 lg:-bottom-24 lg:mt-0 xl:-right-24" />
    </div>
  );
}
