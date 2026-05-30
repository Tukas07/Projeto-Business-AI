import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { u as useServerFn, c as chatWithConsultant } from "./router-DTicDenU.js";
import { F as Footer } from "./Chrome-CCUGlFfK.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "lucide-react";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-separator";
import "@radix-ui/react-dialog";
import "@radix-ui/react-tooltip";
import "./course-data-DD467rnx.js";
import "./server-CB487Y80.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
const SUGGESTIONS = ["Como uso IA para criar posts para o meu Instagram?", "Como respondo meus clientes no WhatsApp mais rápido?", "Tenho uma loja pequena. Por onde começo com IA?"];
function Assistente() {
  const chat = useServerFn(chatWithConsultant);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const areaRef = useRef(null);
  useEffect(() => {
    if (areaRef.current) areaRef.current.scrollTop = areaRef.current.scrollHeight;
  }, [messages, loading]);
  async function send(text) {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    const next = [...messages, {
      role: "user",
      content
    }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const {
        reply
      } = await chat({
        data: {
          messages: next
        }
      });
      setMessages([...next, {
        role: "assistant",
        content: reply
      }]);
    } catch (e) {
      console.error(e);
      setMessages([...next, {
        role: "assistant",
        content: "Erro de conexão. Tente de novo."
      }]);
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: "py-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "yf-wrap max-w-[760px]", children: [
      /* @__PURE__ */ jsx("span", { className: "yf-eyebrow", children: "Assistente · IA na prática" }),
      /* @__PURE__ */ jsx("h1", { className: "text-[clamp(28px,4vw,42px)] mt-3", children: "Pergunte. Resposta direta." }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-[17px] mt-3 mb-7", children: "Consultor de IA para pequenos empreendedores." }),
      /* @__PURE__ */ jsxs("div", { ref: areaRef, className: "border border-border rounded-2xl p-5 min-h-[340px] max-h-[440px] overflow-y-auto flex flex-col gap-3.5 bg-card", children: [
        messages.length === 0 && !loading && /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-[15px]", children: "Faça uma pergunta sobre como usar IA no seu negócio. As sugestões abaixo são um bom começo." }),
        messages.map((m, i) => m.role === "user" ? /* @__PURE__ */ jsx("div", { className: "self-end max-w-[80%] bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-3 text-[15px]", children: m.content }, i) : /* @__PURE__ */ jsx("div", { className: "self-start max-w-[88%] bg-muted border border-border rounded-2xl rounded-bl-sm px-4 py-3 text-[15px] leading-relaxed whitespace-pre-wrap", children: m.content }, i)),
        loading && /* @__PURE__ */ jsx("div", { className: "self-start bg-muted border border-border rounded-2xl rounded-bl-sm px-4 py-3 text-[15px]", children: /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Pensando." }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mt-4", children: SUGGESTIONS.map((s) => /* @__PURE__ */ jsx("button", { onClick: () => send(s), disabled: loading, className: "text-sm px-3.5 py-2 border border-border rounded-full bg-card text-muted-foreground font-semibold hover:border-primary hover:text-primary disabled:opacity-50", children: s }, s)) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-4", children: [
        /* @__PURE__ */ jsx("input", { value: input, placeholder: "Escreva sua pergunta", onChange: (e) => setInput(e.target.value), onKeyDown: (e) => {
          if (e.key === "Enter") send();
        }, className: "flex-1 text-[15px] px-4 py-3 border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background" }),
        /* @__PURE__ */ jsx("button", { className: "yf-btn yf-btn-primary", onClick: () => send(), disabled: loading || !input.trim(), children: "Enviar" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  Assistente as component
};
