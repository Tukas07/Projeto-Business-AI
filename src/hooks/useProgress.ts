import { useEffect, useState, useCallback } from "react";

const KEY = "yf:completed";

export function useProgress() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setCompleted(new Set(JSON.parse(raw)));
    } catch {}
  }, []);

  const markDone = useCallback((id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.add(id);
      try { localStorage.setItem(KEY, JSON.stringify([...next])); } catch {}
      return next;
    });
  }, []);

  return { completed, markDone };
}
