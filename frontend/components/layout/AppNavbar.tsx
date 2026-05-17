"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageToggle from "@/components/LanguageToggle";
import { HeritageLogo } from "@/components/icons/HeritageLogo";
import { IconBookDocs } from "@/components/icons/UiIcons";
import { COPY } from "@/lib/i18n-copy";
import { API_DOCS_URL } from "@/lib/api";
import { ROUTES } from "@/lib/routes";
import { useLanguage } from "@/components/providers/LanguageProvider";

const ROUTES_ORDER = [
  ROUTES.home,
  ROUTES.chat,
  ROUTES.timeline,
  ROUTES.tour,
  ROUTES.library,
  ROUTES.docs,
] as const;

function navActive(pathname: string, href: string) {
  if (href === ROUTES.home) return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AppNavbar() {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const onChat = pathname.startsWith(ROUTES.chat);

  const labels: Record<(typeof ROUTES_ORDER)[number], string> = {
    [ROUTES.home]: locale === "ta" ? COPY.nav.home.ta : COPY.nav.home.en,
    [ROUTES.chat]: locale === "ta" ? COPY.nav.chat.ta : COPY.nav.chat.en,
    [ROUTES.timeline]: locale === "ta" ? COPY.nav.timeline.ta : COPY.nav.timeline.en,
    [ROUTES.tour]: locale === "ta" ? COPY.nav.tour.ta : COPY.nav.tour.en,
    [ROUTES.library]: locale === "ta" ? COPY.nav.library.ta : COPY.nav.library.en,
    [ROUTES.docs]: locale === "ta" ? COPY.nav.docs.ta : COPY.nav.docs.en,
  };

  const heritage = locale === "ta" ? COPY.navbar.heritage.ta : COPY.navbar.heritage.en;
  const apiDocs = locale === "ta" ? COPY.navbar.apiDocs.ta : COPY.navbar.apiDocs.en;
  const agentsLive =
    locale === "ta" ? COPY.navbar.agentsLive.ta : COPY.navbar.agentsLive.en;

  const pill =
    "inline-flex shrink-0 items-center gap-1 rounded-full border border-[#d4c4b0] bg-[#fffefb] px-2.5 py-1.5 text-[11px] font-medium text-[#5c4a3d] shadow-sm transition hover:border-[#c4a574] hover:bg-[#faf3e8]";

  return (
    <header className="animate-page-in sticky top-0 z-50 border-b border-[#e8dfd0] bg-[#faf7f2]/98 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl flex-nowrap items-center gap-3 px-4 py-3 sm:px-6 lg:gap-4 lg:px-8">
        <Link
          href={ROUTES.home}
          className="flex shrink-0 items-center gap-3 rounded-lg pr-2 outline-none ring-offset-2 ring-offset-[#faf7f2] focus-visible:ring-2 focus-visible:ring-[#c4a574]"
        >
          <HeritageLogo size={52} className="shrink-0 drop-shadow-sm" />
          <span className="flex flex-col leading-tight">
            <span className="font-tamil text-xl font-bold tracking-tight text-[#2c1810] sm:text-2xl md:text-[1.7rem]">
              தமிழி AI
            </span>
            <span className="font-heritage text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b7355] sm:text-xs md:text-[13px]">
              {heritage}
            </span>
          </span>
        </Link>

        <nav
          className="scrollbar-hide flex min-w-0 flex-1 flex-nowrap items-center justify-center gap-1 overflow-x-auto px-1 sm:gap-1.5"
          aria-label="Site"
        >
          {ROUTES_ORDER.map((href) => {
            const active = navActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={`shrink-0 rounded-full px-2.5 py-2 text-[11px] font-medium whitespace-nowrap transition sm:px-3 sm:text-sm ${
                  active
                    ? "border border-[#c4a574] bg-[#faf3e8] text-[#3d2914] shadow-sm"
                    : "text-[#5c4a3d] hover:bg-[#faf3e8]/90 hover:text-[#2c1810]"
                }`}
              >
                {labels[href]}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 flex-nowrap items-center gap-2 sm:gap-2.5">
          <LanguageToggle />
          {onChat ? (
            <>
              <a
                href={API_DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={pill}
              >
                <IconBookDocs className="size-3.5 shrink-0 text-[#7d5a32]" />
                {apiDocs}
              </a>
              <span className={pill}>
                <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-600" aria-hidden />
                {agentsLive}
              </span>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
