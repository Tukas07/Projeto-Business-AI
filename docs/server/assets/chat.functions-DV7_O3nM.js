import { T as TSS_SERVER_FUNCTION, a as createServerFn } from "./server-CB487Y80.js";
import { S as SYSTEM_PROMPT } from "./course-data-DD467rnx.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const chatWithConsultant_createServerFn_handler = createServerRpc({
  id: "b427c7c61f8e863d7131fa3a4a4d0e780e7af3a6dfbb17b0c1df25df31c357b0",
  name: "chatWithConsultant",
  filename: "src/lib/chat.functions.ts"
}, (opts) => chatWithConsultant.__executeServer(opts));
const chatWithConsultant = createServerFn({
  method: "POST"
}).inputValidator((data) => {
  if (!data || !Array.isArray(data.messages)) throw new Error("Invalid input");
  const safe = data.messages.slice(-20).filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string").map((m) => ({
    role: m.role,
    content: m.content.slice(0, 4e3)
  }));
  if (safe.length === 0) throw new Error("No messages");
  return {
    messages: safe
  };
}).handler(chatWithConsultant_createServerFn_handler, async ({
  data
}) => {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [{
        role: "system",
        content: SYSTEM_PROMPT
      }, ...data.messages]
    })
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("AI gateway error", res.status, text);
    if (res.status === 429) return {
      reply: "Muitas perguntas em pouco tempo. Aguarde um instante e tente de novo."
    };
    if (res.status === 402) return {
      reply: "Crédito de IA esgotado. Recarregue para continuar."
    };
    throw new Error("AI gateway error");
  }
  const json = await res.json();
  const reply = json?.choices?.[0]?.message?.content?.trim() || "Não consegui responder agora. Tente de novo.";
  return {
    reply
  };
});
export {
  chatWithConsultant_createServerFn_handler
};
