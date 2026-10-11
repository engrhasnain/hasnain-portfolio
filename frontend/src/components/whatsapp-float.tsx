import { site } from "@/lib/site";
import { WhatsApp } from "./icons";

/** A WhatsApp button that floats in the corner of every page, so a visitor is always one tap from a chat. */
export function WhatsAppFloat() {
  if (!site.whatsapp) return null;
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with me on WhatsApp"
      data-magnetic
      className="wa-float group fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-2xl text-[#0B1020] shadow-[0_10px_30px_-8px_rgb(37_211_102/0.7)] transition duration-300 hover:pr-5 sm:right-6 sm:bottom-6"
    >
      <span aria-hidden="true" className="wa-ring absolute inset-0 rounded-full border-2 border-[#25D366]" />
      <WhatsApp />
      <span className="max-w-0 overflow-hidden text-sm font-bold whitespace-nowrap transition-all duration-300 group-hover:max-w-40">
        Chat on WhatsApp
      </span>
    </a>
  );
}
