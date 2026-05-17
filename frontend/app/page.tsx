import type { Metadata } from "next";
import LandingContent from "@/components/landing/LandingContent";

export const metadata: Metadata = {
  title: "தமிழி AI — Tamil Heritage Learning",
  description:
    "Educational AI platform for Tamil history: multi-agent chat, timelines, heritage tour, and library.",
};

export default function LandingPage() {
  return <LandingContent />;
}
