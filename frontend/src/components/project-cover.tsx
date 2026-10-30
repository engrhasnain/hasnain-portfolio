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

/** A hand-drawn arrow that rises to the right, from the margin note towards the product. */
function NoteArrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 80 60" className={`overflow-visible ${className}`}>
      <path d="M4 52 C 22 54, 46 44, 66 16" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" />
      <path d="M54 18 L 67 13 L 69 27" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * The cover's annotations, drawn in the same em scale as the mockup and placed in a column beside it:
 * a cream sticky note taped on with the headline number, and a handwritten note whose arrow reaches the product.
 */
function CoverNotes({ stat, note }: { stat?: ProjectMeta["coverStat"]; note?: string }) {
  return (
    <>
      {stat ? (
        <div className="absolute -top-[0.6em] left-0 z-10 w-max max-w-[10em] -rotate-[4deg] rounded-[0.18em] bg-[#f3efe6] px-[0.75em] pt-[0.75em] pb-[0.6em] text-[#0b1020] shadow-[0_0.9em_1.6em_-0.7em_rgb(0_0_0/0.85)] transition-transform duration-700 ease-out [.tilt-host:hover_&]:-rotate-[1deg]">
          <span className="absolute -top-[0.42em] left-1/2 h-[0.85em] w-[3.1em] -translate-x-1/2 rotate-[4deg] bg-[#5eead4]/45" />
          <p className="text-[2.35em] leading-[0.9] font-extrabold tracking-[-0.045em]">{stat.value}</p>
          <p className="mt-[0.3em] max-w-[6.5em] font-hand text-[1.12em] leading-[0.95] font-bold text-[#0f766e]">{stat.label}</p>
        </div>
      ) : null}
      {note ? (
        <div className="absolute bottom-[0.2em] left-[0.1em] z-10 flex w-max items-end text-teal">
          <span className="max-w-[4.7em] -rotate-[4deg] font-hand text-[1.3em] leading-[0.92] font-bold">{note}</span>
          <NoteArrow className="mb-[1.1em] -ml-[0.1em] h-[1.9em] w-[2.5em] shrink-0" />
        </div>
      ) : null}
    </>
  );
}

/** Generated cover, used when a project has no cover image yet: a product mockup on a tinted panel. */
export function ProjectCover({ project, large = false }: { project: ProjectMeta; large?: boolean }) {
  const primary = project.type[0] ?? "Chatbots";
  const art = project.art ?? defaultArt[primary];
  const rgb = glow[primary];
  const notes =
    project.coverStat || project.coverNote ? <CoverNotes stat={project.coverStat} note={project.coverNote} /> : undefined;
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
        <PanelCover preview={project.preview} aside={notes} />
      ) : isMockArt(art) ? (
        <CoverMock art={art} aside={notes} />
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
