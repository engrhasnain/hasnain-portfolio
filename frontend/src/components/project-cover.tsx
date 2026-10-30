import type { ProjectMeta, ProjectType } from "@/lib/types";
import { CoverArt } from "./cover-art";
import { CoverMock, isMockArt, PanelCover, type MockArt } from "./cover-mocks";

const defaultArt: Partial<Record<ProjectType, MockArt>> = {
  Chatbots: "chat",
  MCP: "mcp",
  WhatsApp: "whatsapp",
};

/** Each kind of project gets its own glow, so a grid of covers has rhythm instead of looking copy-pasted. */
const glow: Record<ProjectType, string> = {
  Voice: "167 139 250", // violet
  MCP: "96 165 250", // azure
  Agents: "94 234 212", // teal
  Chatbots: "45 212 191", // teal-green
  WhatsApp: "52 211 153", // emerald
  SEO: "52 211 153", // emerald
  Automation: "94 234 212", // teal
  Models: "129 140 248", // indigo
};

/** Generated cover, used when a project has no cover image yet: a product mockup on a tinted panel. */
export function ProjectCover({ project, large = false }: { project: ProjectMeta; large?: boolean }) {
  const primary = project.type[0] ?? "Chatbots";
  const art = project.art ?? defaultArt[primary];
  const rgb = glow[primary];
  return (
    <div
      aria-hidden="true"
      className="cover-host tilt-host absolute inset-0 overflow-hidden bg-[#0d1430]"
      style={{
        backgroundImage: `radial-gradient(70% 90% at 85% 0%, rgb(${rgb} / 0.2), transparent 65%), radial-gradient(60% 70% at 0% 100%, rgb(${rgb} / 0.08), transparent 70%)`,
      }}
    >
      <div className="absolute inset-0 bg-dots opacity-50 [mask-image:linear-gradient(180deg,black,transparent_85%)]" />
      {art === "panel" && project.preview ? (
        <PanelCover preview={project.preview} />
      ) : isMockArt(art) ? (
        <CoverMock art={art} />
      ) : (
        <CoverArt
          type={primary}
          uid={`${project.slug}${large ? "-lg" : ""}`}
          className={`absolute inset-x-4 ${
            large ? "top-14 bottom-14 h-[calc(100%-7rem)] w-[calc(100%-2rem)]" : "top-8 bottom-8 h-[calc(100%-4rem)] w-[calc(100%-2rem)]"
          }`}
        />
      )}
    </div>
  );
}
