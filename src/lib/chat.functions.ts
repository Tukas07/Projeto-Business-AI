import { createServerFn } from "@tanstack/react-start";
import { SYSTEM_PROMPT } from "./course-data";

type ChatMessage = { role: "user" | "assistant"; content: string };

export const chatWithConsultant = createServerFn({ method: "POST" })
  .inputValidator((data: { messages: ChatMessage[] }) => {
    if (!data || !Array.isArray(data.messages)) throw new Error("Invalid input");
    const safe = data.messages
      .slice(-20)
      .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));
    if (safe.length === 0) throw new Error("No messages");
    return { messages: safe };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...data.messages,
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("AI gateway error", res.status, text);
      if (res.status === 429) return { reply: "Muitas perguntas em pouco tempo. Aguarde um instante e tente de novo." };
      if (res.status === 402) return { reply: "Crédito de IA esgotado. Recarregue para continuar." };
      throw new Error("AI gateway error");
    }

    const json = await res.json();
    const reply: string =
      json?.choices?.[0]?.message?.content?.trim() ||
      "Não consegui responder agora. Tente de novo.";
    return { reply };
  });
