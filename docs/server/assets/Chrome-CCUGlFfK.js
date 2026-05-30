import { jsx, jsxs } from "react/jsx-runtime";
import { a as APP_NAME, b as APP_SUFFIX } from "./course-data-DD467rnx.js";
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "py-10 border-t border-border bg-muted mt-14", children: /* @__PURE__ */ jsxs("div", { className: "yf-wrap flex justify-between gap-4 flex-wrap", children: [
    /* @__PURE__ */ jsxs("span", { className: "yf-micro", children: [
      APP_NAME,
      " • ",
      APP_SUFFIX,
      " · São Paulo · 2026"
    ] }),
    /* @__PURE__ */ jsx("span", { className: "yf-micro", children: "IA na prática para quem empreende." })
  ] }) });
}
function Check({ on }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: `w-[22px] h-[22px] rounded-full border-2 inline-flex items-center justify-center flex-shrink-0 ${on ? "bg-success border-success text-success-foreground" : "border-border"}`,
      children: on && /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) })
    }
  );
}
export {
  Check as C,
  Footer as F
};
