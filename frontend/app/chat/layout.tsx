import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat · தமிழி AI",
  description: "Ask தமிழி AI about Tamil history with multi-agent RAG.",
};

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return children;
}
