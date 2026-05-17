"use client";

import Link from "next/link";
import { COPY } from "@/lib/i18n-copy";
import { ROUTES } from "@/lib/routes";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function DocsBackLink() {
  const { locale } = useLanguage();
  const label = locale === "ta" ? COPY.links.backHome.ta : COPY.links.backHome.en;
  return (
    <Link href={ROUTES.home} className="underline decoration-[#c4a574]/60 hover:text-[#3d2914]">
      {label}
    </Link>
  );
}
