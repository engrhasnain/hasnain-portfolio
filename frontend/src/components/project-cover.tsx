import type { ProjectMeta, ProjectType } from "@/lib/types";
import { CoverArt } from "./cover-art";
import { CoverMock, isMockArt, type MockArt } from "./cover-mocks";

const defaultArt: Partial<Record<ProjectType, MockArt>> = {
  Chatbots: "chat",
  MCP: "mcp",
  WhatsApp: "whatsapp",
};

/** Generated Midnight Glow cover, used when a project has no cover image yet. */
export function ProjectCover({ project, large = false }: { project: ProjectMeta; large?: boolean }) {
  const primary = project.type[0] ?? "Chatbots";
  const art = project.art ?? defaultArt[primary];
  return (
    <div
      aria-hidden="true"
      className="cover-host tilt-host absolute inset-0 overflow-hidden bg-panel"
      style={{
        backgroundImage:
          "radial-gradient(circle at 85% 0%, rgb(94 234 212 / 0.2), transparent 55%), radial-gradient(circle at 0% 100%, rgb(59 130 246 / 0.25), transparent 60%)",
      }}
    >
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <div className="absolute top-1/2 left-1/2 size-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(94_234_212/0.18),transparent_65%)]" />
      {isMockArt(art) ? (
        <CoverMock art={art} />
      ) : (
        <CoverArt
          type={primary}
          uid={`${project.slug}${large ? "-lg" : ""}`}
          className={`absolute inset-x-4 transition duration-500 group-hover:scale-[1.03] ${
            large ? "top-14 bottom-14 h-[calc(100%-7rem)] w-[calc(100%-2rem)]" : "top-8 bottom-8 h-[calc(100%-4rem)] w-[calc(100%-2rem)]"
          }`}
        />
      )}
      <span className={`absolute z-10 rounded-md border border-teal/30 bg-night/80 px-2 py-0.5 font-mono text-[11px] text-teal backdrop-blur ${large ? "top-5 left-5 sm:top-7 sm:left-7" : "top-3 left-3"}`}>
        /{art === "platform" ? "platform" : primary.toLowerCase()}
      </span>
    </div>
  );
}
