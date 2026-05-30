import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { A as ALL_LESSONS, M as MODULES } from "./course-data-DD467rnx.js";
import { u as useProgress } from "./useProgress-DcPbvUmq.js";
import { C as Check, F as Footer } from "./Chrome-CCUGlFfK.js";
import { R as Route } from "./router-DTicDenU.js";
import "@tanstack/react-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "lucide-react";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-separator";
import "@radix-ui/react-dialog";
import "@radix-ui/react-tooltip";
import "./server-CB487Y80.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
function AulaPage() {
  const {
    id
  } = Route.useParams();
  const navigate = useNavigate();
  const {
    completed,
    markDone
  } = useProgress();
  const idx = ALL_LESSONS.findIndex((l2) => l2.id === id);
  if (idx === -1) {
    return /* @__PURE__ */ jsxs("div", { className: "py-20 yf-wrap text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Aula não encontrada" }),
      /* @__PURE__ */ jsx(Link, { to: "/curso", className: "yf-btn yf-btn-primary mt-6 inline-flex", children: "Voltar ao curso" })
    ] });
  }
  const l = ALL_LESSONS[idx];
  const next = ALL_LESSONS[idx + 1];
  const mod = MODULES.find((m) => m.id === l.moduleId);
  const isLastOfModule = mod.lessons[mod.lessons.length - 1].id === l.id;
  const isDone = completed.has(l.id);
  return /* @__PURE__ */ jsxs("div", { className: "py-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "yf-wrap max-w-[760px]", children: [
      /* @__PURE__ */ jsx(Link, { to: "/curso", className: "text-[15px] font-semibold text-muted-foreground hover:text-foreground mb-6 inline-block", children: "← Voltar ao curso" }),
      /* @__PURE__ */ jsxs("span", { className: "yf-secnum", children: [
        "Módulo ",
        l.moduleNum,
        " · ",
        l.moduleTitle,
        " · Aula ",
        l.id
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-[clamp(26px,4vw,38px)] mb-7", children: l.title }),
      /* @__PURE__ */ jsx("div", { className: "aspect-video w-full bg-muted border border-border rounded-2xl flex items-center justify-center flex-col gap-3.5 mb-7 overflow-hidden", children: l.youtube ? /* @__PURE__ */ jsx("iframe", { width: "100%", height: "100%", src: l.youtube, title: l.title, frameBorder: "0", allowFullScreen: true, className: "rounded-2xl" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "w-[60px] h-[60px] rounded-full bg-primary flex items-center justify-center shadow-[0_8px_20px_oklch(0.52_0.22_277/0.3)]", children: /* @__PURE__ */ jsx("div", { className: "w-0 h-0 border-y-[11px] border-y-transparent border-l-[18px] border-l-primary-foreground ml-1" }) }),
        /* @__PURE__ */ jsx("span", { className: "yf-micro", children: "vídeo · em breve" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Field, { label: "A ferramenta", text: l.c.tool }),
        /* @__PURE__ */ jsx(Field, { label: "Para quê", text: l.c.for }),
        /* @__PURE__ */ jsx(Field, { label: "Por que esta", text: l.c.why }),
        /* @__PURE__ */ jsx(Field, { label: "Como usar", text: l.c.how }),
        /* @__PURE__ */ jsx(Field, { label: "No seu negócio", text: l.c.applied })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 mt-9", children: [
        isDone ? /* @__PURE__ */ jsxs("button", { className: "yf-btn yf-btn-done", disabled: true, children: [
          /* @__PURE__ */ jsx(Check, { on: true }),
          " Concluída"
        ] }) : /* @__PURE__ */ jsx("button", { className: "yf-btn yf-btn-primary", onClick: () => markDone(l.id), children: "Marcar como concluída" }),
        next && /* @__PURE__ */ jsx("button", { className: "yf-btn yf-btn-secondary", onClick: () => {
          navigate({
            to: "/aula/$id",
            params: {
              id: next.id
            }
          });
          window.scrollTo(0, 0);
        }, children: "Próxima aula" })
      ] }),
      isLastOfModule && /* @__PURE__ */ jsx(Quiz, { module: mod })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function Field({
  label,
  text
}) {
  return /* @__PURE__ */ jsxs("div", { className: "py-4 border-b border-muted", children: [
    /* @__PURE__ */ jsx("b", { className: "text-xs uppercase tracking-wider text-primary font-bold block mb-1.5", children: label }),
    /* @__PURE__ */ jsx("span", { className: "text-base text-foreground leading-relaxed", children: text })
  ] });
}
function Quiz({
  module: m
}) {
  const [answers, setAnswers] = useState({});
  const answered = Object.keys(answers).length;
  const score = m.quiz.reduce((s, q, i) => s + (answers[i] === q.a ? 1 : 0), 0);
  return /* @__PURE__ */ jsxs("div", { className: "mt-11 pt-9 border-t border-border", children: [
    /* @__PURE__ */ jsxs("span", { className: "yf-secnum", children: [
      "Quiz · ",
      m.title
    ] }),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl mb-2", children: "Fixe o que importa." }),
    answered === m.quiz.length && /* @__PURE__ */ jsxs("p", { className: "yf-tnum text-success font-bold mb-5", children: [
      "Você acertou ",
      score,
      " de ",
      m.quiz.length,
      "."
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-7 mt-4", children: m.quiz.map((q, qi) => {
      const picked = answers[qi];
      const isAnswered = picked !== void 0;
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { className: "font-semibold mb-3 text-base", children: [
          qi + 1,
          ". ",
          q.q
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2", children: q.o.map((opt, oi) => {
          const correct = isAnswered && oi === q.a;
          const wrong = isAnswered && oi !== q.a;
          return /* @__PURE__ */ jsx("button", { disabled: isAnswered, onClick: () => setAnswers({
            ...answers,
            [qi]: oi
          }), className: `text-left w-full px-4 py-3.5 border rounded-xl bg-card text-[15px] transition-colors ${correct ? "border-success bg-success-soft text-success font-bold" : wrong ? "opacity-55 border-border" : "border-border hover:border-primary"}`, children: opt }, oi);
        }) }),
        isAnswered && /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm mt-2", children: q.e })
      ] }, qi);
    }) }),
    answered === m.quiz.length && /* @__PURE__ */ jsx("button", { className: "yf-btn yf-btn-secondary mt-6", onClick: () => setAnswers({}), children: "Refazer" })
  ] });
}
export {
  AulaPage as component
};
