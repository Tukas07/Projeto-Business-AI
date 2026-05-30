import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
const SplitNotFoundComponent = () => /* @__PURE__ */ jsxs("div", { className: "py-20 yf-wrap text-center", children: [
  /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Aula não encontrada" }),
  /* @__PURE__ */ jsx(Link, { to: "/curso", className: "yf-btn yf-btn-primary mt-6 inline-flex", children: "Voltar ao curso" })
] });
export {
  SplitNotFoundComponent as notFoundComponent
};
