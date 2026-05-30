import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { MessageCircle, X, Send } from "lucide-react";
import { chatWithConsultant } from "@/lib/chat.functions";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Por onde começo com IA no meu negócio?",
  "Como crio posts para o Instagram?",
  "Como respondo no WhatsApp mais rápido?",
];

export function FloatingChat() {
  const chat = useServerFn(chatWithConsultant);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (areaRef.current) areaRef.current.scrollTop = areaRef.current.scrollHeight;
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, loading]);

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const { reply } = await chat({ data: { messages: next } });
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch (e) {
      console.error(e);
      setMessages([...next, { role: "assistant", content: "Erro de conexão. Tente de novo." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir consultor de IA"
          className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-[0_10px_30px_oklch(0.52_0.22_277/0.4)] hover:bg-primary-hover transition-all flex items-center justify-center"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-40 w-[min(380px,calc(100vw-2rem))] h-[min(560px,calc(100vh-3rem))] bg-card border border-border rounded-2xl shadow-[0_20px_60px_oklch(0.18_0.04_265/0.2)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-primary-soft">
            <div>
              <p className="font-bold text-sm leading-tight">Consultor de IA</p>
              <p className="text-[11px] text-muted-foreground">Para pequenos negócios</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fechar"
              className="h-8 w-8 rounded-lg hover:bg-background flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div ref={areaRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.length === 0 && !loading && (
              <div className="flex flex-col gap-3">
                <p className="text-muted-foreground text-sm">
                  Pergunte como usar IA no seu negócio. Exemplos:
                </p>
                <div className="flex flex-col gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-left text-[13px] px-3 py-2 border border-border rounded-xl bg-background hover:border-primary hover:text-primary transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) =>
              m.role === "user" ? (
                <div
                  key={i}
                  className="self-end max-w-[85%] bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-3.5 py-2.5 text-[14px] leading-relaxed"
                >
                  {m.content}
                </div>
              ) : (
                <div
                  key={i}
                  className="self-start max-w-[90%] text-foreground text-[14px] leading-relaxed whitespace-pre-wrap"
                >
                  {m.content}
                </div>
              )
            )}
            {loading && (
              <div className="self-start text-muted-foreground text-[14px] animate-pulse">
                Pensando.
              </div>
            )}
          </div>

          <div className="border-t border-border p-3 flex gap-2 bg-background">
            <input
              ref={inputRef}
              value={input}
              placeholder="Escreva sua pergunta"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") send(); }}
              className="flex-1 text-[14px] px-3 py-2 border border-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              aria-label="Enviar"
              className="h-10 w-10 flex-shrink-0 rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
