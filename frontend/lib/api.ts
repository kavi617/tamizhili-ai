/** Backend base URL — set NEXT_PUBLIC_API_URL in frontend/.env */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export const API_DOCS_URL = `${API_BASE_URL.replace(/\/$/, "")}/docs`;

export type PipelineStepDTO = {
  id: string;
  label: string;
};

export type ChatResponse = {
  response: string;
  steps?: PipelineStepDTO[];
  intent?: string | null;
};

function formatFetchDetail(payload: unknown): string {
  if (typeof payload === "string") return payload;
  if (!payload || typeof payload !== "object") {
    return "Unable to reach தமிழி AI. Is the backend running?";
  }
  const detail = (payload as { detail?: unknown }).detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((d) =>
        typeof d === "object" && d !== null && "msg" in d
          ? String((d as { msg: unknown }).msg)
          : String(d)
      )
      .filter(Boolean)
      .join(" ");
  }
  return "Unable to reach தமிழி AI. Is the backend running?";
}

/** POST /chat — optional inscription image as base64 data URL */
export async function sendChatMessage(
  message: string,
  opts?: {
    imageBase64?: string | null;
    /** Backend replies in English or Tamil */
    responseLanguage?: "en" | "ta";
  }
): Promise<ChatResponse> {
  const body: {
    message: string;
    image_base64?: string;
    response_language: "en" | "ta";
  } = {
    message: message.trim(),
    response_language: opts?.responseLanguage === "ta" ? "ta" : "en",
  };
  if (opts?.imageBase64?.trim()) {
    body.image_base64 = opts.imageBase64.trim();
  }

  const res = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(formatFetchDetail(err));
  }

  return res.json();
}
