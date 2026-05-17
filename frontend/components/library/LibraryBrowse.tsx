"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  CATEGORY_LABELS,
  LIBRARY_ITEMS,
  type LibraryCategory,
} from "@/data/library";
import { COPY } from "@/lib/i18n-copy";
import { ROUTES } from "@/lib/routes";

const CATEGORIES: LibraryCategory[] = ["Dynasties", "Literature", "Trade", "Kings"];

function itemSearchBlob(item: (typeof LIBRARY_ITEMS)[0]): string {
  return [
    item.title,
    item.summary,
    item.titleTa,
    item.summaryTa,
    item.category,
    CATEGORY_LABELS[item.category].en,
    CATEGORY_LABELS[item.category].ta,
  ]
    .join(" ")
    .toLowerCase();
}

export default function LibraryBrowse() {
  const { locale } = useLanguage();
  const ta = locale === "ta";
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<LibraryCategory | "All">("All");

  const ui = useMemo(
    () => ({
      search: ta ? COPY.libraryUi.search.ta : COPY.libraryUi.search.en,
      placeholder: ta ? COPY.libraryUi.placeholder.ta : COPY.libraryUi.placeholder.en,
      all: ta ? COPY.libraryUi.all.ta : COPY.libraryUi.all.en,
      noMatch: ta ? COPY.libraryUi.noMatch.ta : COPY.libraryUi.noMatch.en,
      useChat: ta ? COPY.links.useInChat.ta : COPY.links.useInChat.en,
    }),
    [ta]
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return LIBRARY_ITEMS.filter((item) => {
      if (cat !== "All" && item.category !== cat) return false;
      if (!needle) return true;
      return itemSearchBlob(item).includes(needle);
    });
  }, [q, cat]);

  const catLabel = (c: LibraryCategory) =>
    ta ? CATEGORY_LABELS[c].ta : CATEGORY_LABELS[c].en;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-[#e8dfd0] bg-[#fffefb]/90 p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <label className="block min-w-0 flex-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#8b7355]">
              {ui.search}
            </span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={ui.placeholder}
              className="font-heritage mt-2 w-full rounded-xl border border-[#d4c4b0] bg-white px-4 py-3 text-[15px] text-[#2c1810] outline-none transition focus:border-[#c4a574] focus:ring-2 focus:ring-[#e8d5b5]/80"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCat("All")}
              className={`rounded-full px-3.5 py-2 text-xs font-semibold transition ${
                cat === "All"
                  ? "border border-[#c4a574] bg-[#faf3e8] text-[#3d2914] shadow-sm"
                  : "border border-transparent text-[#5c4a3d] hover:bg-[#faf3e8]/80"
              }`}
            >
              {ui.all}
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={`rounded-full px-3.5 py-2 text-xs font-semibold transition ${
                  cat === c
                    ? "border border-[#c4a574] bg-[#faf3e8] text-[#3d2914] shadow-sm"
                    : "border border-transparent text-[#5c4a3d] hover:bg-[#faf3e8]/80"
                }`}
              >
                {catLabel(c)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ul className="grid gap-5 sm:grid-cols-2">
        {filtered.map((item) => {
          const title = ta ? item.titleTa : item.title;
          const summary = ta ? item.summaryTa : item.summary;
          const topic =
            ta ? `சுருக்கமும் சூழலும்: ${title}` : `Summarize and contextualize: ${title}`;

          return (
            <li
              key={item.id}
              className="flex flex-col rounded-2xl border border-[#e8dfd0] bg-[#fffefb] p-6 shadow-sm transition hover:border-[#d4c4b0] hover:shadow-md"
            >
              <span className="w-fit rounded-full bg-[#faf3e8] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#7d5a32]">
                {catLabel(item.category)}
              </span>
              <h2 className="font-tamil mt-3 text-lg font-semibold leading-snug text-[#2c1810]">
                {title}
              </h2>
              <p className="font-heritage mt-2 flex-1 text-sm leading-relaxed text-[#5c4a3d]">
                {summary}
              </p>
              <Link
                href={`${ROUTES.chat}?topic=${encodeURIComponent(topic)}`}
                className="mt-5 inline-flex items-center text-sm font-semibold text-[#7d5a32] underline decoration-[#c4a574]/70 underline-offset-[3px] transition hover:text-[#3d2914]"
              >
                {ui.useChat}
              </Link>
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 ? (
        <p className="font-heritage rounded-xl border border-dashed border-[#d4c4b0] bg-[#faf7f2] py-10 text-center text-sm text-[#8b7355]">
          {ui.noMatch}
        </p>
      ) : null}
    </div>
  );
}
