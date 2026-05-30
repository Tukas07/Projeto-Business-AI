import { Link, useRouterState } from "@tanstack/react-router";
import { APP_NAME, APP_SUFFIX } from "@/lib/course-data";

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isCurso = pathname.startsWith("/curso") || pathname.startsWith("/aula");
  const isAssist = pathname.startsWith("/assistente");

  return (
    <header className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="yf-wrap py-4 flex justify-between items-center gap-4">
        <Link to="/" className="font-extrabold text-lg tracking-tight text-foreground">
          {APP_NAME} <span className="text-primary">• {APP_SUFFIX}</span>
        </Link>
        <nav className="flex gap-5 items-center">
          <Link
            to="/curso"
            className={`text-[15px] font-semibold ${isCurso ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Curso
          </Link>
          <Link
            to="/assistente"
            className={`text-[15px] font-semibold ${isAssist ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Assistente
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="py-10 border-t border-border bg-muted mt-14">
      <div className="yf-wrap flex justify-between gap-4 flex-wrap">
        <span className="yf-micro">{APP_NAME} • {APP_SUFFIX} · São Paulo · 2026</span>
        <span className="yf-micro">IA na prática para quem empreende.</span>
      </div>
    </footer>
  );
}

export function Check({ on }: { on: boolean }) {
  return (
    <span
      className={`w-[22px] h-[22px] rounded-full border-2 inline-flex items-center justify-center flex-shrink-0 ${
        on ? "bg-success border-success text-success-foreground" : "border-border"
      }`}
    >
      {on && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </span>
  );
}
