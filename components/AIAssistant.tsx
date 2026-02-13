import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  ExternalLink,
  Loader2,
} from "lucide-react";

type Role = "user" | "assistant";

type Source = {
  web?: {
    uri?: string;
    title?: string;
  };
};

type Message = {
  role: Role;
  content: string;
  sources?: Source[];
};

type ApiHistoryItem = { role: "user" | "assistant"; text: string };

function toApiHistory(history: Message[]): ApiHistoryItem[] {
  return (Array.isArray(history) ? history : [])
    .filter((m) => m && (m.role === "user" || m.role === "assistant"))
    .map((m) => ({
      role: m.role,
      text: String(m.content || "").trim(),
    }))
    .filter((m) => m.text.length > 0)
    .slice(-12);
}

function shorten(s: string, n = 220) {
  const t = String(s || "");
  return t.length > n ? t.slice(0, n) + "…" : t;
}

async function postChat(userMessage: string, history: Message[]) {
  const payload = {
    message: userMessage,
    history: toApiHistory(history),
  };

  let res: Response;
  try {
    res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Errore di rete. Controlla la connessione e riprova.");
  }

  // Leggiamo SEMPRE testo grezzo, così anche se non è JSON vediamo cosa torna
  const raw = await res.text();

  // Prova parse JSON, se fallisce usa raw
  let data: any = {};
  try {
    data = raw ? JSON.parse(raw) : {};
  } catch {
    data = { raw };
  }

  // Gestione errori “umana”
  if (!res.ok) {
    // Quota / rate limit Gemini spesso torna come 429 o con messaggi specifici
    const serverMsg =
      data?.error ||
      data?.message ||
      data?.raw ||
      `HTTP ${res.status}`;

    // Se è 429, prova ad estrarre il retry (se presente nel testo)
    if (res.status === 429) {
      throw new Error(
        `Troppi tentativi in questo momento. Riprova tra qualche secondo.\nDettaglio: ${shorten(
          serverMsg
        )}`
      );
    }

    throw new Error(
      `Errore API (HTTP ${res.status}). Dettaglio: ${shorten(serverMsg)}`
    );
  }

  const text =
    typeof data?.text === "string" && data.text.trim().length > 0
      ? data.text
      : "Mi dispiace, non riesco a rispondere in questo momento.";

  const sources: Source[] = Array.isArray(data?.sources) ? data.sources : [];
  return { text, sources };
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Ciao! Benvenuto su NEXUS Prime. Sono il tuo assistente virtuale, come posso aiutarti oggi?",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, busy, open]);

  async function send() {
    const userText = input.trim();
    if (!userText || busy) return;

    setInput("");
    setBusy(true);

    // 1) Mostra subito msg user
    setMessages((prev) => [...prev, { role: "user", content: userText }]);

    // 2) Snapshot coerente della history (include user appena mandato)
    const historySnapshot: Message[] = [
      ...messages,
      { role: "user", content: userText },
    ];

    try {
      const { text, sources } = await postChat(userText, historySnapshot);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: text, sources },
      ]);
    } catch (err: any) {
      // ✅ qui ora vedrai il DETTAGLIO vero del server
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `⚠️ ${err?.message || "Errore. Riprova tra poco."}`,
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen((v) => !v)}
          className="w-16 h-16 bg-cyan-500 rounded-full shadow-2xl flex items-center justify-center text-black border-4 border-black group"
          aria-label={open ? "Chiudi assistente" : "Apri assistente"}
          type="button"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <MessageCircle
                  size={28}
                  className="group-hover:rotate-12 transition-transform"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.85 }}
            className="fixed bottom-28 right-8 w-96 max-h-[600px] h-[70vh] glass rounded-[3rem] border border-cyan-500/20 z-[100] flex flex-col overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-widest">
                    Nexus Intel
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-slate-500 font-bold">
                      ONLINE
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Chiudi"
                type="button"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide"
            >
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-5 rounded-3xl ${
                      m.role === "user"
                        ? "bg-cyan-500 text-black font-medium"
                        : "bg-white/5 border border-white/5 text-slate-300"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {m.content}
                    </p>

                    {m.sources && m.sources.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <p className="text-[10px] font-bold text-cyan-400 mb-2 flex items-center gap-1">
                          <ExternalLink size={10} /> SOURCES
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {m.sources.slice(0, 3).map((s, i) => {
                            const uri = s?.web?.uri;
                            const title = s?.web?.title || "Source";
                            if (!uri) return null;
                            return (
                              <a
                                key={i}
                                href={uri}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[10px] bg-black/40 px-2 py-1 rounded-md text-slate-500 hover:text-white"
                              >
                                {title.length > 18
                                  ? `${title.slice(0, 18)}...`
                                  : title}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {busy && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                    <Loader2 className="animate-spin text-cyan-500" size={18} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-white/5 border-t border-white/5">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Scrivi qui..."
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 pr-16 outline-none focus:border-cyan-500 transition-all text-sm text-slate-200"
                  disabled={busy}
                />
                <button
                  onClick={send}
                  disabled={busy || !input.trim()}
                  className="absolute right-2 p-3 bg-cyan-500 rounded-xl text-black hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                  aria-label="Invia"
                  type="button"
                >
                  <Send size={18} />
                </button>
              </div>

              <p className="mt-3 text-[10px] text-slate-600 leading-relaxed">
                Rispondo sempre in italiano. Se la quota è piena o il servizio è
                occupato, riprova tra qualche secondo.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}