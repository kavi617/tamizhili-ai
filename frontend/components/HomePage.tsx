"use client";

import ChatPanel from "./chat/ChatPanel";

/** Chat route shell (/chat); fills space below global navbar */
export default function HomePage() {
  return (
    <main className="animate-page-in flex min-h-0 flex-1 flex-col bg-[#faf7f2]">
      <ChatPanel />
    </main>
  );
}
