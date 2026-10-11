import type { ComponentType, ReactNode } from "react";
import type { IconProps } from "./icons";

/**
 * The one chip used by every diagram on the site (hero, system map), so they all look the same.
 * "in" = data going into the AI (outlined icon), "out" = something I build (gradient icon).
 */
export function NodeChip({
  Icon,
  label,
  variant = "out",
  size = "md",
  reverse = false,
  trailing,
  className = "",
}: {
  Icon: ComponentType<IconProps>;
  label: string;
  variant?: "in" | "out";
  size?: "sm" | "md";
  /** Put the icon after the label (chips on the left side of a diagram). */
  reverse?: boolean;
  trailing?: ReactNode;
  className?: string;
}) {
  const out = variant === "out";
  return (
    <span
      className={`flex items-center rounded-xl border bg-panel/90 whitespace-nowrap text-ink shadow-[0_8px_24px_-12px_rgb(0_0_0/0.9)] backdrop-blur-md ${
        size === "sm" ? "gap-2 px-2.5 py-1.5 text-xs" : "gap-2.5 px-3.5 py-2 text-sm"
      } ${out ? "border-azure/40 font-semibold" : "border-line font-medium"} ${reverse ? "flex-row-reverse" : ""} ${className}`}
    >
      <span
        className={`grid shrink-0 place-items-center rounded-lg ${size === "sm" ? "size-6" : "size-7"} ${
          out ? "bg-brand text-night" : "border border-teal/30 bg-night text-teal"
        }`}
      >
        <Icon />
      </span>
      {label}
      {trailing}
    </span>
  );
}
