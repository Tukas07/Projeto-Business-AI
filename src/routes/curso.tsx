import { createFileRoute, Link } from "@tanstack/react-router";
import { MODULES, ALL_LESSONS } from "@/lib/course-data";
import { useProgress } from "@/hooks/useProgress";
import { Footer, Check } from "@/components/Chrome";

export const Route = createFileRoute("/curso")({
  head: () => ({
    meta: [
      { title: "O curso — Young Founders • SP" },
      { name: "description", content: "Três módulos práticos: Atrair clientes, Atender melhor e Ganhar tempo com IA." },
      { property: "og:title", content: "O curso — Young Founders • SP" },
      { property: "og:description", content: "Três módulos práticos de IA para pequenos negócios." },
    ],
  }),
  component: Curso,
});

function Curso() {
  const { completed } = useProgress();
  const total = ALL_LESSONS.length;
  const done = completed.size;
  return (
    <div className="py-16">
      <div className="yf-wrap">
        <span className="yf-eyebrow">O curso</span>
        <h1 className="yf-display text-[clamp(32px,5vw,52px)] mt-3 mb-7">Os módulos.</h1>

        <div className="max-w-[560px] mb-12">
          <div className="flex justify-between mb-2.5">
            <span className="yf-micro">Seu progresso</span>
            <span className="yf-micro yf-tnum text-primary">{done} de {total} aulas</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-[width] duration-300" style={{ width: `${(done / total) * 100}%` }} />
          </div>
        </div>

        <div className="flex flex-col gap-11">
          {MODULES.map((m) => (
            <div key={m.id}>
              <span className="yf-secnum">Módulo {m.num}</span>
              <h2 className="text-[28px]">{m.title}</h2>
              <p className="text-muted-foreground text-[17px] mt-1 mb-5">{m.subtitle}</p>
              <div className="flex flex-col gap-3">
                {m.lessons.map((l) => {
                  const isDone = completed.has(l.id);
                  return (
                    <Link
                      key={l.id}
                      to="/aula/$id"
                      params={{ id: l.id }}
                      className="flex justify-between items-center px-5 py-4 border border-border rounded-2xl bg-card hover:border-primary hover:shadow-[0_4px_14px_oklch(0.52_0.22_277/0.08)] transition-all"
                    >
                      <div className="flex gap-3.5 items-center">
                        <Check on={isDone} />
                        <span className="text-base font-semibold">{l.title}</span>
                      </div>
                      <span className={`yf-micro ${isDone ? "text-success" : "text-muted-foreground"}`}>
                        {isDone ? "Concluída" : `Aula ${l.id}`}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
