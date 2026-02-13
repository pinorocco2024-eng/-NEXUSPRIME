import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, ExternalLink } from "lucide-react";

type Role = "user" | "assistant";

type Source = {
  web?: { uri?: string; title?: string };
};

type Message = {
  role: Role;
  content: string;
  sources?: Source[];
};

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Ciao! Sono NEXUS Intelligence. Posso aiutarti a capire i servizi, l’ecosistema e rispondere alle tue domande.",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, busy, open]);

  async function postChat(userMessage: string, history: Message[]) {
    let res: Response;

    try {
      res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // il backend accetta { message, history }
        body: JSON.stringify({ message: userMessage, history }),
      });
    } catch {
      throw new Error("Errore di rete. Controlla la connessione e riprova tra poco.");
    }

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      // mostra l’errore vero dal server (es. quota/rate limit Gemini)
      throw new Error(data?.error || `Errore server (HTTP ${res.status}). Riprova tra poco.`);
    }

    const text =
      typeof data?.text === "string" && data.text.trim().length > 0
        ? data.text
        : "Mi dispiace, non riesco a rispondere in questo momento.";

    const sources: Source[] = Array.isArray(data?.sources) ? data.sources : [];
    return { text, sources };
  }

  async function send() {
    const userText = input.trim();
    if (!userText || busy) return;

    setInput("");
    setBusy(true);

    // aggiungi subito il messaggio user
    setMessages((prev) => [...prev, { role: "user", content: userText }]);

    // snapshot history coerente (include il messaggio appena mandato)
    const historySnapshot: Message[] = [...messages, { role: "user", content: userText }];

    try {
      const { text, sources } = await postChat(userText, historySnapshot);

      setMessages((prev) => [...prev, { role: "assistant", content: text, sources }]);
    } catch (err: any) {
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
    if (e.key === "Enter") send();
  }

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen((v) => !v)}
          className="w-16 h-16 bg-cyan-500 rounded-full shadow-2xl flex items-center justify-center text-black border-4 border-black group"
          aria-label={open ? "Chiudi assistente" : "Apri assistente"}
          type="button"
        >
          {open ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
          )}
        </motion.button>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-28 right-8 w-96 max-h-[600px] h-[70vh] glass rounded-[3rem] border border-cyan-500/20 z-[100] flex flex-col overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-widest">Nexus Intel</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-slate-500 font-bold">ONLINE</span>
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
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-5 rounded-3xl ${
                      m.role === "user"
                        ? "bg-cyan-500 text-black font-medium"
                        : "bg-white/5 border border-white/5 text-slate-300"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>

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
                                {title.length > 18 ? `${title.slice(0, 18)}...` : title}
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
                    <div className="flex gap-2 items-center text-cyan-400 text-sm">
                      <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce [animation-delay:150ms]" />
                      <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce [animation-delay:300ms]" />
                    </div>
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
                Rispondo sempre. Se il servizio è occupato potresti vedere un messaggio di attesa: riprova tra qualche secondo.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
