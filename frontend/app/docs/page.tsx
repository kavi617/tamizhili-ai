import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import DocsBackLink from "@/components/docs/DocsBackLink";
import { API_BASE_URL, API_DOCS_URL } from "@/lib/api";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Documentation · தமிழி AI",
};

function DocSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-[#e8dfd0] pt-10 first:border-t-0 first:pt-0">
      <h2 className="font-tamil text-xl font-bold text-[#2c1810]">{title}</h2>
      <div className="font-heritage mt-4 space-y-3 text-[15px] leading-relaxed text-[#5c4a3d]">
        {children}
      </div>
    </section>
  );
}

export default function DocsPage() {
  return (
    <PageShell pageKey="docs">
      <div className="space-y-16 pb-8">
        <DocSection title="What this project is">
          <p>
            தமிழி AI is an educational stack that combines a{" "}
            <strong className="font-semibold text-[#3d2914]">Next.js</strong> frontend (landing,
            timeline, heritage tour, library, chat UI) with a{" "}
            <strong className="font-semibold text-[#3d2914]">FastAPI</strong> backend that runs a
            multi-agent pipeline over retrieval context and optional vision transcription for stone
            inscriptions (கல்வெட்டு).
          </p>
        </DocSection>

        <DocSection title="Repository layout">
          <ul className="list-inside list-disc space-y-2 marker:text-[#c4a574]">
            <li>
              <code className="rounded bg-[#faf3e8] px-1.5 py-0.5 text-[13px] text-[#3d2914]">
                frontend/
              </code>{" "}
              — Next.js App Router, Tailwind, heritage tour (embedded Maps frames).
            </li>
            <li>
              <code className="rounded bg-[#faf3e8] px-1.5 py-0.5 text-[13px] text-[#3d2914]">
                backend/
              </code>{" "}
              — FastAPI app (<code className="text-[13px]">main.py</code>), agents under{" "}
              <code className="text-[13px]">services/agents/</code>, Chroma ingest scripts.
            </li>
          </ul>
        </DocSection>

        <DocSection title="Frontend routes">
          <div className="overflow-x-auto rounded-xl border border-[#e8dfd0] bg-[#fffefb]">
            <table className="w-full min-w-[280px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#e8dfd0] text-[#8b7355]">
                  <th className="px-4 py-3 font-semibold">Path</th>
                  <th className="px-4 py-3 font-semibold">Purpose</th>
                </tr>
              </thead>
              <tbody className="text-[#5c4a3d]">
                <tr className="border-b border-[#f0ebe3]">
                  <td className="px-4 py-2 font-mono text-[13px]">{ROUTES.home}</td>
                  <td className="px-4 py-2">Landing &amp; product overview</td>
                </tr>
                <tr className="border-b border-[#f0ebe3]">
                  <td className="px-4 py-2 font-mono text-[13px]">{ROUTES.chat}</td>
                  <td className="px-4 py-2">Chat UI → POST /chat (optional inscription image)</td>
                </tr>
                <tr className="border-b border-[#f0ebe3]">
                  <td className="px-4 py-2 font-mono text-[13px]">{ROUTES.timeline}</td>
                  <td className="px-4 py-2">Dynastic timeline starters + deep links to chat</td>
                </tr>
                <tr className="border-b border-[#f0ebe3]">
                  <td className="px-4 py-2 font-mono text-[13px]">{ROUTES.tour}</td>
                  <td className="px-4 py-2">Tamil heritage tours — Google Maps / Street View links + Chat</td>
                </tr>
                <tr className="border-b border-[#f0ebe3]">
                  <td className="px-4 py-2 font-mono text-[13px]">{ROUTES.library}</td>
                  <td className="px-4 py-2">Curated topic cards + “Use in Chat”</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-[13px]">{ROUTES.docs}</td>
                  <td className="px-4 py-2">This page</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocSection>

        <DocSection title="Backend API">
          <p>
            Primary endpoint: <code className="rounded bg-[#faf3e8] px-1.5 py-0.5 text-[13px]">POST /chat</code>{" "}
            with JSON body <code className="text-[13px]">{"{ message, image_base64? }"}</code>.
            Health: <code className="text-[13px]">GET /health</code>.
          </p>
          <p>
            Interactive OpenAPI (Swagger UI) when the API is running:{" "}
            <a
              href={API_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#7d5a32] underline decoration-[#c4a574]/60 underline-offset-2 hover:text-[#3d2914]"
            >
              {API_DOCS_URL}
            </a>
          </p>
          <p className="text-[13px] text-[#8b7355]">
            Default base URL in dev: <code>{API_BASE_URL}</code> — override with{" "}
            <code>NEXT_PUBLIC_API_URL</code> in <code>frontend/.env</code>.
          </p>
        </DocSection>

        <DocSection title="Configuration (quick reference)">
          <ul className="list-inside list-disc space-y-2 marker:text-[#c4a574]">
            <li>
              Backend: <code className="text-[13px]">OPENAI_API_KEY</code>,{" "}
              <code className="text-[13px]">LLM_PROVIDER</code> (
              <code className="text-[13px]">openai</code> vs archive-only{" "}
              <code className="text-[13px]">local</code>), chat/vision/embedding model vars — see{" "}
              <code className="text-[13px]">backend/README.md</code>.
            </li>
            <li>
              Inscription photos require cloud vision path:{" "}
              <code className="text-[13px]">LLM_PROVIDER=openai</code> and a vision-capable model.
            </li>
          </ul>
        </DocSection>

        <DocSection title="Tour page">
          <p>
            The tour uses Google Maps embeds pointed at approximate coordinates; framing depends on
            Google’s availability and is for exploration only—not field survey.
          </p>
        </DocSection>

        <p className="text-center text-sm text-[#8b7355]">
          <DocsBackLink />
        </p>
      </div>
    </PageShell>
  );
}
