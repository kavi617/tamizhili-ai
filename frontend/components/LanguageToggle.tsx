"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

/** Compact தமிழ் ↔ EN switch */
export default function LanguageToggle() {
  const { locale, toggleLocale } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      title="Toggle site language (English / தமிழ்)"
      aria-label="Toggle site language between English and Tamil"
      className="inline-flex shrink-0 items-center gap-0.5 rounded-full border border-[#d4c4b0] bg-[#fffefb] p-0.5 text-[11px] font-semibold text-[#4a3428] shadow-sm transition hover:border-[#c4a574] hover:bg-[#faf3e8]"
    >
      <span
        className={`rounded-full px-2 py-1 transition ${
          locale === "en"
            ? "bg-[#faf3e8] text-[#3d2914] shadow-inner"
            : "text-[#8b7355]"
        }`}
      >
        EN
      </span>
      <span className="select-none text-[#d4c4b0]" aria-hidden>
        |
      </span>
      <span
        className={`rounded-full px-2 py-1 font-tamil transition ${
          locale === "ta"
            ? "bg-[#faf3e8] text-[#3d2914] shadow-inner"
            : "text-[#8b7355]"
        }`}
      >
        தமிழ்
      </span>
    </button>
  );
}
