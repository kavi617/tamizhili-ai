import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import TimelineScrollList from "@/components/timeline/TimelineScrollList";
import { TIMELINE_EVENTS } from "@/data/timeline";

export const metadata: Metadata = {
  title: "Timeline · தமிழி AI",
};

export default function TimelinePage() {
  return (
    <PageShell pageKey="timeline">
      <TimelineScrollList events={TIMELINE_EVENTS} />
    </PageShell>
  );
}
