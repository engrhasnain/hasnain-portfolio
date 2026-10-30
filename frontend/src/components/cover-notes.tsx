import type { CoverStat } from "@/lib/types";

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
 * A cover's annotations (project and blog cards), drawn in the mockup's em scale and placed in a column beside it:
 * a cream sticky note taped on with the headline number, and a handwritten note whose arrow reaches the product.
 */
export function CoverNotes({ stat, note }: { stat?: CoverStat; note?: string }) {
  return (
    <>
      {stat ? (
        <div className="absolute -top-[0.6em] left-0 z-10 w-max -rotate-[4deg] rounded-[0.18em] bg-[#f3efe6] px-[0.75em] pt-[0.75em] pb-[0.6em] text-[#0b1020] shadow-[0_0.9em_1.6em_-0.7em_rgb(0_0_0/0.85)] transition-transform duration-700 ease-out [.tilt-host:hover_&]:-rotate-[1deg]">
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
