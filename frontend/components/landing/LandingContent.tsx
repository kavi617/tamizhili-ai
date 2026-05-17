"use client";

import Link from "next/link";
import { COPY } from "@/lib/i18n-copy";
import { ROUTES } from "@/lib/routes";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function LandingContent() {
  const { locale } = useLanguage();
  const L = (en: string, ta: string) => (locale === "ta" ? ta : en);

  const kicker = L(COPY.landing.kicker.en, COPY.landing.kicker.ta);
  const lead = L(COPY.landing.lead.en, COPY.landing.lead.ta);
  const enterChat = L(COPY.landing.enterChat.en, COPY.landing.enterChat.ta);
  const exploreTimeline = L(COPY.landing.timelinePageCta.en, COPY.landing.timelinePageCta.ta);
  const whatItDoes = L(COPY.landing.whatItDoes.en, COPY.landing.whatItDoes.ta);
  const whatItDoesBody = L(COPY.landing.whatItDoesBody.en, COPY.landing.whatItDoesBody.ta);
  const whyExists = L(COPY.landing.whyExists.en, COPY.landing.whyExists.ta);
  const whyExistsBody = L(COPY.landing.whyExistsBody.en, COPY.landing.whyExistsBody.ta);
  const exploreTitle = L(COPY.landing.exploreTitle.en, COPY.landing.exploreTitle.ta);
  const chatLbl = L(COPY.landing.exploreChat.en, COPY.landing.exploreChat.ta);
  const chatNote = L(COPY.landing.exploreChatNote.en, COPY.landing.exploreChatNote.ta);
  const tlLbl = L(COPY.landing.exploreTimeline.en, COPY.landing.exploreTimeline.ta);
  const tourLbl = L(COPY.landing.exploreTour.en, COPY.landing.exploreTour.ta);
  const libLbl = L(COPY.landing.exploreLibrary.en, COPY.landing.exploreLibrary.ta);

  const cards = [
    { title: whatItDoes, body: whatItDoesBody },
    { title: whyExists, body: whyExistsBody },
    {
      title: exploreTitle,
      body: null,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 bg-[#faf7f2] px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-16 lg:px-10">
      <section className="animate-page-in">
        <div className="rounded-3xl border border-[#e8dfd0] bg-gradient-to-b from-[#fffefb] to-[#faf7f2] p-8 shadow-sm sm:p-10 lg:p-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8b7355]">
            {kicker}
          </p>
          <h1 className="font-tamil mt-4 text-4xl font-bold tracking-tight text-[#2c1810] sm:text-5xl lg:text-[3.25rem]">
            தமிழி AI
          </h1>
          <p className="font-heritage mt-5 max-w-2xl text-lg leading-relaxed text-[#5c4a3d] sm:text-xl">
            {lead}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={ROUTES.chat}
              className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-[#6b5344] px-8 py-3 text-sm font-semibold text-[#faf7f2] shadow-md transition hover:bg-[#5c3d2e]"
            >
              {enterChat}
            </Link>
            <Link
              href={ROUTES.timeline}
              className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border-2 border-[#d4c4b0] bg-[#fffefb] px-8 py-3 text-sm font-semibold text-[#4a3428] transition hover:border-[#c4a574] hover:bg-[#faf3e8]"
            >
              {exploreTimeline}
            </Link>
          </div>
        </div>
      </section>

      <section className="animate-page-in animate-page-in-delay-md mt-14 grid gap-6 sm:grid-cols-3 lg:mt-16">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-[#e8dfd0] bg-[#fffefb] p-6 shadow-sm transition hover:border-[#d4c4b0] lg:p-7"
          >
            <h2 className="border-b border-[#f0ebe3] pb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#3d2914]">
              {card.title}
            </h2>
            {card.body ? (
              <p className="font-heritage mt-4 text-sm leading-relaxed text-[#5c4a3d]">
                {card.body}
              </p>
            ) : (
              <ul className="font-heritage mt-4 space-y-3 text-sm text-[#5c4a3d]">
                <li className="flex flex-wrap gap-x-1">
                  <Link
                    href={ROUTES.chat}
                    className="font-semibold text-[#7d5a32] underline decoration-[#c4a574]/50 underline-offset-2 hover:text-[#3d2914]"
                  >
                    {chatLbl}
                  </Link>
                  <span className="text-[#a89888]">—</span>
                  <span>{chatNote}</span>
                </li>
                <li>
                  <Link
                    href={ROUTES.timeline}
                    className="font-semibold text-[#7d5a32] underline decoration-[#c4a574]/50 underline-offset-2 hover:text-[#3d2914]"
                  >
                    {tlLbl}
                  </Link>
                </li>
                <li>
                  <Link
                    href={ROUTES.tour}
                    className="font-semibold text-[#7d5a32] underline decoration-[#c4a574]/50 underline-offset-2 hover:text-[#3d2914]"
                  >
                    {tourLbl}
                  </Link>
                </li>
                <li>
                  <Link
                    href={ROUTES.library}
                    className="font-semibold text-[#7d5a32] underline decoration-[#c4a574]/50 underline-offset-2 hover:text-[#3d2914]"
                  >
                    {libLbl}
                  </Link>
                </li>
              </ul>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
