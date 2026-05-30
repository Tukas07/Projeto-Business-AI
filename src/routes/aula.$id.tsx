import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ALL_LESSONS, MODULES, type Module } from "@/lib/course-data";
import { useProgress } from "@/hooks/useProgress";
import { Footer, Check } from "@/components/Chrome";

export const Route = createFileRoute("/aula/$id")({
  head: ({ params }) => {
    const l = ALL_LESSONS.find((x) => x.id === params.id);
    const title = l ? `${l.title} — Young Founders • SP` : "Aula — Young Founders • SP";
    return {
      meta: [
        { title },
        { name: "description", content: l?.c.for ?? "Aula do curso de IA para pequenos empreendedores." },
      ],
    };
  },
  component: AulaPage,
  notFoundComponent: () => (
    <div className="py-20 yf-wrap text-center">
      <h1 className="text-2xl font-bold">Aula não encontrada</h1>
      <Link to="/curso" className="yf-btn yf-btn-primary mt-6 inline-flex">Voltar ao curso</Link>
    </div>
  ),
});

function AulaPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { completed, markDone } = useProgress();

  const idx = ALL_LESSONS.findIndex((l) => l.id === id);
  if (idx === -1) {
    return (
      <div className="py-20 yf-wrap text-center">
        <h1 className="text-2xl font-bold">Aula não encontrada</h1>
        <Link to="/curso" className="yf-btn yf-btn-primary mt-6 inline-flex">Voltar ao curso</Link>
      </div>
    );
  }
  const l = ALL_LESSONS[idx];
  const next = ALL_LESSONS[idx + 1];
  const mod = MODULES.find((m) => m.id === l.moduleId)!;
  const isLastOfModule = mod.lessons[mod.lessons.length - 1].id === l.id;
  const isDone = completed.has(l.id);

  return (
    <div className="py-16">
      <div className="yf-wrap max-w-[760px]">
        <Link to="/curso" className="text-[15px] font-semibold text-muted-foreground hover:text-foreground mb-6 inline-block">
          ← Voltar ao curso
        </Link>
        <span className="yf-secnum">Módulo {l.moduleNum} · {l.moduleTitle} · Aula {l.id}</span>
        <h1 className="text-[clamp(26px,4vw,38px)] mb-7">{l.title}</h1>

        <div className="aspect-video w-full bg-muted border border-border rounded-2xl flex items-center justify-center flex-col gap-3.5 mb-7 overflow-hidden">
          {l.youtube ? (
            <iframe
              width="100%"
              height="100%"
              src={l.youtube}
              title={l.title}
              frameBorder="0"
              allowFullScreen
              className="rounded-2xl"
            />
          ) : (
            <>
              <div className="w-[60px] h-[60px] rounded-full bg-primary flex items-center justify-center shadow-[0_8px_20px_oklch(0.52_0.22_277/0.3)]">
                <div className="w-0 h-0 border-y-[11px] border-y-transparent border-l-[18px] border-l-primary-foreground ml-1" />
              </div>
              <span className="yf-micro">vídeo · em breve</span>
            </>
          )}
        </div>

        <div>
          <Field label="A ferramenta" text={l.c.tool} />
          <Field label="Para quê" text={l.c.for} />
          <Field label="Por que esta" text={l.c.why} />
          <Field label="Como usar" text={l.c.how} />
          <Field label="No seu negócio" text={l.c.applied} />
        </div>

        <div className="flex flex-wrap gap-3 mt-9">
          {isDone ? (
            <button className="yf-btn yf-btn-done" disabled>
              <Check on={true} /> Concluída
            </button>
          ) : (
            <button className="yf-btn yf-btn-primary" onClick={() => markDone(l.id)}>
              Marcar como concluída
            </button>
          )}
          {next && (
            <button
              className="yf-btn yf-btn-secondary"
              onClick={() => {
                navigate({ to: "/aula/$id", params: { id: next.id } });
                window.scrollTo(0, 0);
              }}
            >
              Próxima aula
            </button>
          )}
        </div>

        {isLastOfModule && <Quiz module={mod} />}
      </div>
      <Footer />
    </div>
  );
}

function Field({ label, text }: { label: string; text: string }) {
  return (
    <div className="py-4 border-b border-muted">
      <b className="text-xs uppercase tracking-wider text-primary font-bold block mb-1.5">{label}</b>
      <span className="text-base text-foreground leading-relaxed">{text}</span>
    </div>
  );
}

function Quiz({ module: m }: { module: Module }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const answered = Object.keys(answers).length;
  const score = m.quiz.reduce((s, q, i) => s + (answers[i] === q.a ? 1 : 0), 0);

  return (
    <div className="mt-11 pt-9 border-t border-border">
      <span className="yf-secnum">Quiz · {m.title}</span>
      <h2 className="text-2xl mb-2">Fixe o que importa.</h2>
      {answered === m.quiz.length && (
        <p className="yf-tnum text-success font-bold mb-5">Você acertou {score} de {m.quiz.length}.</p>
      )}
      <div className="flex flex-col gap-7 mt-4">
        {m.quiz.map((q, qi) => {
          const picked = answers[qi];
          const isAnswered = picked !== undefined;
          return (
            <div key={qi}>
              <p className="font-semibold mb-3 text-base">{qi + 1}. {q.q}</p>
              <div className="flex flex-col gap-2">
                {q.o.map((opt, oi) => {
                  const correct = isAnswered && oi === q.a;
                  const wrong = isAnswered && oi !== q.a;
                  return (
                    <button
                      key={oi}
                      disabled={isAnswered}
                      onClick={() => setAnswers({ ...answers, [qi]: oi })}
                      className={`text-left w-full px-4 py-3.5 border rounded-xl bg-card text-[15px] transition-colors ${
                        correct
                          ? "border-success bg-success-soft text-success font-bold"
                          : wrong
                          ? "opacity-55 border-border"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {isAnswered && <p className="text-muted-foreground text-sm mt-2">{q.e}</p>}
            </div>
          );
        })}
      </div>
      {answered === m.quiz.length && (
        <button className="yf-btn yf-btn-secondary mt-6" onClick={() => setAnswers({})}>Refazer</button>
      )}
    </div>
  );
}
