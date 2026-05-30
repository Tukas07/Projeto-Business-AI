import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { A as ALL_LESSONS, M as MODULES } from "./course-data-DD467rnx.js";
import { u as useProgress } from "./useProgress-DcPbvUmq.js";
import { C as Check, F as Footer } from "./Chrome-CCUGlFfK.js";
import "react";
function Curso() {
  const {
    completed
  } = useProgress();
  const total = ALL_LESSONS.length;
  const done = completed.size;
  return /* @__PURE__ */ jsxs("div", { className: "py-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "yf-wrap", children: [
      /* @__PURE__ */ jsx("span", { className: "yf-eyebrow", children: "O curso" }),
      /* @__PURE__ */ jsx("h1", { className: "yf-display text-[clamp(32px,5vw,52px)] mt-3 mb-7", children: "Os módulos." }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-[560px] mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-2.5", children: [
          /* @__PURE__ */ jsx("span", { className: "yf-micro", children: "Seu progresso" }),
          /* @__PURE__ */ jsxs("span", { className: "yf-micro yf-tnum text-primary", children: [
            done,
            " de ",
            total,
            " aulas"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-primary rounded-full transition-[width] duration-300", style: {
          width: `${done / total * 100}%`
        } }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-11", children: MODULES.map((m) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("span", { className: "yf-secnum", children: [
          "Módulo ",
          m.num
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-[28px]", children: m.title }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-[17px] mt-1 mb-5", children: m.subtitle }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3", children: m.lessons.map((l) => {
          const isDone = completed.has(l.id);
          return /* @__PURE__ */ jsxs(Link, { to: "/aula/$id", params: {
            id: l.id
          }, className: "flex justify-between items-center px-5 py-4 border border-border rounded-2xl bg-card hover:border-primary hover:shadow-[0_4px_14px_oklch(0.52_0.22_277/0.08)] transition-all", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-3.5 items-center", children: [
              /* @__PURE__ */ jsx(Check, { on: isDone }),
              /* @__PURE__ */ jsx("span", { className: "text-base font-semibold", children: l.title })
            ] }),
            /* @__PURE__ */ jsx("span", { className: `yf-micro ${isDone ? "text-success" : "text-muted-foreground"}`, children: isDone ? "Concluída" : `Aula ${l.id}` })
          ] }, l.id);
        }) })
      ] }, m.id)) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  Curso as component
};
