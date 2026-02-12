// api/chat.ts — Vercel Serverless Function (TypeScript)
// Endpoint: POST /api/chat
// Body: { message: string, history?: Array<{role:"user"|"assistant", text?:string, content?:string}> }
//
// Required env on Vercel (Production + Preview):
//   GEMINI_API_KEY
// Optional:
//   GEMINI_MODEL (default: gemini-3-flash-preview)

type Role = "user" | "assistant";

type HistoryItem = {
  role: Role;
  text?: string;
  content?: string;
};

type ChatBody = {
  message?: string;
  history?: HistoryItem[];
};

const BUILD_ID = "nexus-chat-ts-v2";

const s = (v: unknown) => (typeof v === "string" ? v.trim() : "");

function buildContents(systemText: string, history: unknown, userMessage: string) {
  const safeHistory = Array.isArray(history) ? (history as HistoryItem[]) : [];

  const normalized = safeHistory
    .map((m) => {
      if (!m) return null;
      const role: Role | null =
        m.role === "assistant" ? "assistant" : m.role === "user" ? "user" : null;
      const text = s(m.text) || s(m.content);
      if (!role || !text) return null;
      return { role, text };
    })
    .filter(Boolean)
    .slice(-12) as Array<{ role: Role; text: string }>;

  return [
    { role: "user", parts: [{ text: systemText }] },
    ...normalized.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.text }],
    })),
    { role: "user", parts: [{ text: userMessage }] },
  ];
}

function extractText(data: any): string {
  const parts = data?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) return "";
  return parts
    .map((p: any) => (p && typeof p.text === "string" ? p.text : ""))
    .filter(Boolean)
    .join("");
}

export default async function handler(req: any, res: any) {
  // CORS (ok anche same-origin)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method !== "POST") {
    return res.status(405).json({ build: BUILD_ID, error: "Method not allowed" });
  }

  try {
    const body: ChatBody = req.body || {};
    const userMessage = s(body.message);

    if (!userMessage) {
      return res.status(400).json({ build: BUILD_ID, error: "Missing message" });
    }

    const apiKey = process.env.GEMINI_API_KEY as string | undefined;
    const model = (process.env.GEMINI_MODEL as string | undefined) || "gemini-3-flash-preview";

    if (!apiKey) {
      return res.status(500).json({ build: BUILD_ID, error: "Missing GEMINI_API_KEY" });
    }

    const SYSTEM_TEXT =
      "Rispondi SEMPRE e SOLO in italiano. " +
      "Sei l'assistente virtuale del sito NEXUS Prime. " +
      "Tono: amichevole e professionale. " +
      "Se mancano dettagli, fai UNA domanda alla volta. " +
      "Non inventare informazioni: se non sai, chiedi chiarimenti.";

    const contents = buildContents(SYSTEM_TEXT, body.history, userMessage);

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
      model
    )}:generateContent`;

    const upstream = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents,
        generationConfig: { temperature: 0.4, maxOutputTokens: 800 },
      }),
    });

    const data = await upstream.json().catch(() => ({}));

    if (!upstream.ok) {
      const rawMsg =
        data?.error?.message ||
        (typeof data === "string" ? data : "") ||
        `Gemini error HTTP ${upstream.status}`;

      // quota/rate limit => 429
      if (upstream.status === 429 || /quota|rate limit/i.test(rawMsg)) {
        return res.status(429).json({
          build: BUILD_ID,
          error: "Siamo momentaneamente al limite di richieste. Riprova tra qualche secondo.",
          detail: rawMsg,
        });
      }

      return res.status(500).json({ build: BUILD_ID, error: rawMsg });
    }

    const text = extractText(data).trim() || "Ok.";
    return res.status(200).json({ build: BUILD_ID, text });
  } catch (e: any) {
    return res.status(500).json({ build: BUILD_ID, error: e?.message || "Server error" });
  }
}
