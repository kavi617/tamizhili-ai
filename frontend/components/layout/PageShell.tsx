"use client";

import type { ReactNode } from "react";
import type { PageShellKey } from "@/lib/i18n-copy";
import { COPY } from "@/lib/i18n-copy";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function PageShell({
  pageKey,
  children,
}: {
  pageKey: PageShellKey;
  children: ReactNode;
}) {
  const { locale } = useLanguage();
  const copy = COPY.shell[pageKey];
  const title = locale === "ta" ? copy.title.ta : copy.title.en;
  const subtitle = locale === "ta" ? copy.subtitle.ta : copy.subtitle.en;

  return (
    <div className="animate-page-in mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col bg-[#faf7f2] px-4 py-10 sm:px-8 lg:px-10">
      <header className="mb-10 shrink-0">
        <h1 className="font-tamil text-3xl font-bold tracking-tight text-[#2c1810] sm:text-4xl">
          {title}
        </h1>
        <p className="font-heritage mt-3 max-w-2xl text-base leading-relaxed text-[#5c4a3d]">
          {subtitle}
        </p>
      </header>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
