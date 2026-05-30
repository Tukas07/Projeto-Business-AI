import { useState, useEffect, useCallback } from "react";
const KEY = "yf:completed";
function useProgress() {
  const [completed, setCompleted] = useState(/* @__PURE__ */ new Set());
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setCompleted(new Set(JSON.parse(raw)));
    } catch {
    }
  }, []);
  const markDone = useCallback((id) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.add(id);
      try {
        localStorage.setItem(KEY, JSON.stringify([...next]));
      } catch {
      }
      return next;
    });
  }, []);
  return { completed, markDone };
}
export {
  useProgress as u
};
