import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, TrendingUp, Search } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  sources?: any[];
};

const SYSTEM_PROMPT = `You are NEXUS Intelligence, the official AI support for NEXUS Prime Capital Partners.
You provide high-level financial insights and site assistance.
If the user asks for real-time market prices, you may use Google Search grounding where available.
Be concise, professional, and helpful.`;

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello. I am NEXUS Intelligence. Ask me about market prices, our ecosystem, or current financial trends.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    const userMsg = input.trim();
    if (!userMsg || isTyping) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsTyping(true);

    try {
      // ✅ Vite env var (must be prefixed with VITE_)
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
      if (!apiKey) {
        throw new Error(
          "Missing VITE_GEMINI_API_KEY. Add it to your .env and restart the dev server."
        );
      }

      const ai = new GoogleGenAI({ apiKey });

      // Optional: keep a short chat history context (last N messages)
      const lastTurns = messages.slice(-8).map((m) => `${m.role.toUpperCase()}: ${m.content}`).join("\n");
      const prompt = `${SYSTEM_PROMPT}\n\nConversation so far:\n${lastTurns}\n\nUSER: ${userMsg}\nASSISTANT:`;

      const response = await ai.models.generateContent({
        // ⚠️ If this model fails for you, try: "gemini-2.0-flash" or "gemini-1.5-flash"
        model: "gemini-3-pro-preview",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      // SDK responses can vary by version — these fallbacks prevent UI breakage
      const text =
        (response as any)?.text ||
        (response as any)?.response?.text?.() ||
        "I apologize, my neural link is temporarily disrupted.";

      const sources =
        (response as any)?.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

      setMessages((prev) => [...prev, { role: "assistant", content: text, sources }]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I couldn't reach the AI service. Please check configuration and try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen((v) => !v)}
          className="w-16 h-16 bg-cyan-500 rounded-full shadow-2xl flex items-center justify-center text-black border-4 border-black group"
          aria-label={isOpen ? "Close assistant" : "Open assistant"}
        >
          {isOpen ? (
            <X size={24} />
          ) : (
            <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
          )}
        </motion.button>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
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
                  <TrendingUp size={20} />
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
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
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
                          <Search size={10} /> GROUNDED SOURCES
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {m.sources.slice(0, 3).map((s: any, si: number) => (
                            <a
                              key={si}
                              href={s?.web?.uri || "#"}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] bg-black/40 px-2 py-1 rounded-md text-slate-500 hover:text-white"
                            >
                              {(s?.web?.title?.substring(0, 18) || "Source") + "..."}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                  placeholder="Ask about markets..."
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 pr-16 outline-none focus:border-cyan-500 transition-all text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={isTyping || !input.trim()}
                  className="absolute right-2 p-3 bg-cyan-500 rounded-xl text-black hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                  aria-label="Send"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
