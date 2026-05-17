import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import LibraryBrowse from "@/components/library/LibraryBrowse";

export const metadata: Metadata = {
  title: "Library · தமிழி AI",
};

export default function LibraryPage() {
  return (
    <PageShell pageKey="library">
      <LibraryBrowse />
    </PageShell>
  );
}
