"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { TimelineEvent } from "@/data/timeline";
import { COPY, type Locale } from "@/lib/i18n-copy";
import { ROUTES } from "@/lib/routes";

function chatTopicHref(title: string, locale: Locale) {
  const q =
    locale === "ta"
      ? `இந்த காலத்தைச் சுருக்கமாக விளக்கவும்: ${title}`
      : `Explain this period briefly: ${title}`;
  return `${ROUTES.chat}?topic=${encodeURIComponent(q)}`;
}

function TimelineScrollItem({ ev }: { ev: TimelineEvent }) {
  const { locale } = useLanguage();
  const ref = useRef<HTMLLIElement>(null);
  const [visible, setVisible] = useState(false);
  const askLabel = locale === "ta" ? COPY.links.askAi.ta : COPY.links.askAi.en;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -24px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <li
      ref={ref}
      className={`relative transition-[opacity,transform] duration-[520ms] ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
    >
      <span className="absolute -left-[39px] mt-1.5 h-3 w-3 rounded-full border-2 border-[#c4a574] bg-[#faf7f2]" />
      <p className="text-xs font-semibold uppercase tracking-wider text-[#8b7355]">
        {ev.year}
        <span className="ml-2 rounded-full bg-[#faf3e8] px-2 py-0.5 text-[10px] normal-case text-[#5c3d2e]">
          {ev.dynasty}
        </span>
      </p>
      <h2 className="font-heritage mt-1 text-xl font-semibold text-[#2c1810]">{ev.title}</h2>
      <p className="font-heritage mt-2 max-w-prose text-[15px] leading-relaxed text-[#5c4a3d]">
        {ev.description}
      </p>
      <Link
        href={chatTopicHref(ev.title, locale)}
        className="mt-3 inline-block text-sm font-medium text-[#7d5a32] underline decoration-[#c4a574]/60 underline-offset-2 hover:text-[#3d2914]"
      >
        {askLabel}
      </Link>
    </li>
  );
}

export default function TimelineScrollList({ events }: { events: TimelineEvent[] }) {
  return (
    <ol className="relative space-y-10 border-l border-[#d4c4b0] pl-8">
      {events.map((ev) => (
        <TimelineScrollItem key={ev.title} ev={ev} />
      ))}
    </ol>
  );
}
