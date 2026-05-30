import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { chatWithConsultant } from "@/lib/chat.functions";
import { Footer } from "@/components/Chrome";

export const Route = createFileRoute("/assistente")({
  head: () => ({
    meta: [
      { title: "Assistente — Young Founders • SP" },
      { name: "description", content: "Consultor de IA para pequenos empreendedores. Pergunte, resposta direta." },
      { property: "og:title", content: "Assistente — Young Founders • SP" },
      { property: "og:description", content: "Consultor de IA para pequenos negócios." },
    ],
  }),
  component: Assistente,
});

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Como uso IA para criar posts para o meu Instagram?",
  "Como respondo meus clientes no WhatsApp mais rápido?",
  "Tenho uma loja pequena. Por onde começo com IA?",
];

function Assistente() {
  const chat = useServerFn(chatWithConsultant);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (areaRef.current) areaRef.current.scrollTop = areaRef.current.scrollHeight;
  }, [messages, loading]);

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
    <div className="py-16">
      <div className="yf-wrap max-w-[760px]">
        <span className="yf-eyebrow">Assistente · IA na prática</span>
        <h1 className="text-[clamp(28px,4vw,42px)] mt-3">Pergunte. Resposta direta.</h1>
        <p className="text-muted-foreground text-[17px] mt-3 mb-7">Consultor de IA para pequenos empreendedores.</p>

        <div
          ref={areaRef}
          className="border border-border rounded-2xl p-5 min-h-[340px] max-h-[440px] overflow-y-auto flex flex-col gap-3.5 bg-card"
        >
          {messages.length === 0 && !loading && (
            <p className="text-muted-foreground text-[15px]">
              Faça uma pergunta sobre como usar IA no seu negócio. As sugestões abaixo são um bom começo.
            </p>
          )}
          {messages.map((m, i) =>
            m.role === "user" ? (
              <div
                key={i}
                className="self-end max-w-[80%] bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-3 text-[15px]"
              >
                {m.content}
              </div>
            ) : (
              <div
                key={i}
                className="self-start max-w-[88%] bg-muted border border-border rounded-2xl rounded-bl-sm px-4 py-3 text-[15px] leading-relaxed whitespace-pre-wrap"
              >
                {m.content}
              </div>
            )
          )}
          {loading && (
            <div className="self-start bg-muted border border-border rounded-2xl rounded-bl-sm px-4 py-3 text-[15px]">
              <span className="text-muted-foreground">Pensando.</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              disabled={loading}
              className="text-sm px-3.5 py-2 border border-border rounded-full bg-card text-muted-foreground font-semibold hover:border-primary hover:text-primary disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          <input
            value={input}
            placeholder="Escreva sua pergunta"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") send(); }}
            className="flex-1 text-[15px] px-4 py-3 border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background"
          />
          <button
            className="yf-btn yf-btn-primary"
            onClick={() => send()}
            disabled={loading || !input.trim()}
          >
            Enviar
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
