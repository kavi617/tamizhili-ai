"use client";

import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { sendChatMessage } from "@/lib/api";
import { COPY, type Locale } from "@/lib/i18n-copy";
import { IconInscription, IconSend } from "@/components/icons/UiIcons";
import { useLanguage } from "@/components/providers/LanguageProvider";
import Markdown from "./Markdown";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

function AgentResponseCard({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="w-full max-w-2xl">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8b7355]">
        {label}
      </p>
      <div className="rounded-xl border border-[#d4c4b0] bg-white px-4 py-4 font-heritage text-[15px] leading-relaxed text-[#2c1810] shadow-[0_1px_3px_rgba(44,24,16,0.06)]">
        {children}
      </div>
    </div>
  );
}

function welcomeForLocale(locale: Locale): Message {
  return {
    id: "welcome",
    role: "assistant",
    content: locale === "ta" ? COPY.chat.welcome.ta : COPY.chat.welcome.en,
  };
}

export default function ChatPanel() {
  const { locale } = useLanguage();
  const [messages, setMessages] = useState<Message[]>(() => [welcomeForLocale("en")]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const suggestions = useMemo(
    () => (locale === "ta" ? COPY.chat.suggestions.ta : COPY.chat.suggestions.en),
    [locale]
  );

  const t = useMemo(
    () => ({
      placeholder: locale === "ta" ? COPY.chat.placeholder.ta : COPY.chat.placeholder.en,
      inscriptionAttached:
        locale === "ta" ? COPY.chat.inscriptionAttached.ta : COPY.chat.inscriptionAttached.en,
      inscriptionReady:
        locale === "ta" ? COPY.chat.inscriptionReady.ta : COPY.chat.inscriptionReady.en,
      remove: locale === "ta" ? COPY.chat.remove.ta : COPY.chat.remove.en,
      uploadAria:
        locale === "ta" ? COPY.chat.uploadInscriptionAria.ta : COPY.chat.uploadInscriptionAria.en,
      uploadTitle:
        locale === "ta" ? COPY.chat.uploadInscriptionTitle.ta : COPY.chat.uploadInscriptionTitle.en,
      sendAria: locale === "ta" ? COPY.chat.sendAria.ta : COPY.chat.sendAria.en,
      guide: locale === "ta" ? COPY.chat.guideLabel.ta : COPY.chat.guideLabel.en,
      historian: locale === "ta" ? COPY.chat.historianLabel.ta : COPY.chat.historianLabel.en,
      errPrefix: locale === "ta" ? COPY.chat.errorPrefix.ta : COPY.chat.errorPrefix.en,
      errGeneric: locale === "ta" ? COPY.chat.errorGeneric.ta : COPY.chat.errorGeneric.en,
      imgLarge: locale === "ta" ? COPY.chat.imageTooLarge.ta : COPY.chat.imageTooLarge.en,
    }),
    [locale]
  );

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === "welcome") {
        return [welcomeForLocale(locale)];
      }
      return prev;
    });
  }, [locale]);

  /** Avoid useSearchParams — it can trigger “Router action dispatched before initialization” during hydration. */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const topic = params.get("topic");
    if (!topic) return;
    try {
      const decoded = decodeURIComponent(topic);
      setInput((prev) => (prev.trim() ? prev : decoded));
    } catch {
      setInput((prev) => (prev.trim() ? prev : topic));
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string, img?: string | null) {
    const trimmed = text.trim();
    const pendingImg = img?.trim() || null;
    if ((!trimmed && !pendingImg) || loading) return;

    const userBubbleParts: string[] = [];
    if (trimmed) userBubbleParts.push(trimmed);
    if (pendingImg) userBubbleParts.push(t.inscriptionAttached);

    setMessages((m) => [
      ...m,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: userBubbleParts.join("\n\n"),
      },
    ]);
    setInput("");
    setImageDataUrl(null);
    setLoading(true);

    try {
      const data = await sendChatMessage(trimmed, {
        imageBase64: pendingImg ?? undefined,
        responseLanguage: locale,
      });
      setMessages((m) => [
        ...m,
        { id: crypto.randomUUID(), role: "assistant", content: data.response },
      ]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            err instanceof Error
              ? `${t.errPrefix} ${err.message}`
              : t.errGeneric,
        },
      ]);
    } finally {
      setLoading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function onPickImage(f: FileList | null) {
    const file = f?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    if (file.size > 10 * 1024 * 1024) {
      alert(t.imgLarge);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result;
      if (typeof url === "string") setImageDataUrl(url);
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await send(input, imageDataUrl);
  }

  const canSend =
    loading === false && (Boolean(input.trim()) || Boolean(imageDataUrl));

  const assistantLabel = (id: string) =>
    id === "welcome" ? t.guide : t.historian;

  return (
    <section
      id="chat"
      className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#faf7f2]"
    >
      <div className="thin-scroll flex-1 space-y-6 overflow-y-auto px-4 py-5 sm:px-6">
        {messages.map((msg) =>
          msg.role === "user" ? (
            <article
              key={msg.id}
              className="animate-fade-up flex justify-end"
            >
              <div className="max-w-[85%] rounded-2xl bg-[#4a3428] px-4 py-3 font-heritage text-[15px] leading-relaxed text-[#faf7f2] shadow-md">
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </article>
          ) : (
            <article key={msg.id} className="animate-fade-up flex justify-start">
              <AgentResponseCard label={assistantLabel(msg.id)}>
                <Markdown text={msg.content} />
              </AgentResponseCard>
            </article>
          )
        )}

        {loading && (
          <article className="animate-fade-up flex justify-start">
            <AgentResponseCard label={t.historian}>
              <span className="dot-loader text-[#8b7355]">
                <span />
                <span />
                <span />
              </span>
            </AgentResponseCard>
          </article>
        )}

        <div ref={bottomRef} />
      </div>

      {messages.length === 1 && (
        <div className="flex flex-wrap gap-2 border-t border-[#e8dfd0] bg-[#f5f0e8] px-4 py-3 sm:px-6">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="rounded-full border border-[#d4c4b0] bg-[#fffefb] px-3 py-1.5 text-xs font-medium text-[#5c4a3d] shadow-sm transition hover:border-[#c4a574] hover:bg-[#faf3e8]"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="shrink-0 border-t border-[#e8dfd0] bg-[#faf7f2] px-4 pb-4 pt-3 sm:px-6">
        <div className="mx-auto mb-2 flex max-w-2xl justify-center gap-2">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-[#c4a574]/70"
              aria-hidden
            />
          ))}
        </div>
        <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(e) => onPickImage(e.target.files)}
          />
          {imageDataUrl ? (
            <div className="flex items-center gap-2 rounded-lg border border-[#d4c4b0] bg-[#faf3e8] px-2 py-1.5 text-xs text-[#5c4a3d]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageDataUrl}
                alt=""
                className="h-10 w-10 rounded object-cover"
              />
              <span className="flex flex-1 items-center gap-2 font-medium">
                <IconInscription className="shrink-0 text-[#7d5a32]" />
                {t.inscriptionReady}
              </span>
              <button
                type="button"
                className="rounded px-2 py-1 text-[11px] underline"
                onClick={() => {
                  setImageDataUrl(null);
                  if (fileRef.current) fileRef.current.value = "";
                }}
              >
                {t.remove}
              </button>
            </div>
          ) : null}
          <div className="flex items-end gap-2 rounded-xl border border-[#d4c4b0] bg-[#fffefb] px-3 py-2 shadow-sm focus-within:border-[#c4a574] focus-within:ring-2 focus-within:ring-[#e8d5b5]/80">
            <button
              type="button"
              disabled={loading}
              onClick={() => fileRef.current?.click()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#c4a574]/80 bg-[#faf3e8] text-[#4a3428] transition hover:bg-[#f5ead8] disabled:opacity-50"
              aria-label={t.uploadAria}
              title={t.uploadTitle}
            >
              <IconInscription className="h-[1.15rem] w-[1.15rem]" />
            </button>
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(input, imageDataUrl);
                }
              }}
              placeholder={t.placeholder}
              disabled={loading}
              className="font-heritage max-h-36 min-h-[44px] flex-1 resize-none bg-transparent py-2 text-[15px] leading-6 text-[#2c1810] outline-none placeholder:text-[#a89888] disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!canSend}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-[#6b5344] bg-transparent text-[#4a3428] transition hover:bg-[#faf3e8] disabled:opacity-40"
              aria-label={t.sendAria}
            >
              <IconSend className="text-[#4a3428]" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
