import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer, Check } from "@/components/Chrome";
import { INTEGRANTES } from "@/lib/course-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Young Founders • SP — IA para Pequenos Empreendedores" },
      { name: "description", content: "Curso direto e prático de IA para donos de pequenos negócios. Atraia clientes, atenda melhor e ganhe tempo." },
      { property: "og:title", content: "IA para Pequenos Empreendedores" },
      { property: "og:description", content: "Curso prático, sem jargão. Ferramentas em sua maioria gratuitas." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main>
      <section className="yf-hero">
        <div className="yf-wrap py-20 md:py-24">
          <span className="yf-pill mb-6">Curso · IA na prática</span>
          <h1 className="yf-display max-w-[860px]">
            Inteligência Artificial<br />
            <span className="text-primary">para pequenos empreendedores.</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-[600px] mt-6">
            Um curso direto e prático para donos de pequenos negócios. Ferramentas de IA, a maioria gratuita, para atrair clientes, atender melhor e ganhar tempo no dia a dia. Sem jargão. Sem enrolação.
          </p>
          <p className="yf-micro mt-6">Por {INTEGRANTES} · Escola de Negócios Saint Paul</p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link to="/curso" className="yf-btn yf-btn-primary">Começar o curso</Link>
            <Link to="/assistente" className="yf-btn yf-btn-secondary">Falar com o consultor</Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="yf-wrap">
          <span className="yf-secnum">O problema</span>
          <h2 className="yf-h2 max-w-[720px] mb-10">Você faz tudo sozinho, e o dia não cabe.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ["Sobra trabalho, falta tempo", "Você vende, atende, posta e controla o caixa. O dia acaba antes da lista. IA tira a tarefa repetitiva do seu colo."],
              ["IA parece coisa de empresa grande", "Você ouve falar de IA o tempo todo, mas não sabe por onde começar nem o que serve para um negócio pequeno. A maioria das ferramentas úteis é gratuita."],
              ["Concorrência com mais estrutura", "Negócios maiores têm equipe de marketing e de atendimento. Com IA, você compete sem precisar contratar."],
            ].map(([t, d]) => (
              <div className="yf-card" key={t}>
                <h3 className="text-lg font-bold mb-2.5">{t}</h3>
                <p className="text-muted-foreground text-[15px]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="yf-wrap">
          <span className="yf-secnum">O que você vai aprender</span>
          <h2 className="yf-h2 mb-9">O que você sai sabendo fazer.</h2>
          <div className="flex flex-col gap-3.5 max-w-[720px]">
            {[
              "Criar posts, anúncios e artes para divulgar o seu negócio sem agência.",
              "Atender e vender melhor no WhatsApp, com resposta rápida e follow-up.",
              "Entender os seus números e organizar a rotina com a ajuda da IA.",
              "Usar um assistente de IA como um sócio que nunca dorme.",
            ].map((t) => (
              <div key={t} className="flex gap-3.5 items-center">
                <Check on={true} />
                <span className="text-base">{t}</span>
              </div>
            ))}
          </div>
          <p className="yf-micro text-primary mt-8">Três frentes práticas · Atrair · Atender · Ganhar tempo</p>
        </div>
      </section>

      <section className="py-20">
        <div className="yf-wrap">
          <span className="yf-secnum">Acesso</span>
          <h2 className="yf-h2 mb-9">Como entrar.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[740px]">
            <div className="yf-card">
              <span className="yf-pill mb-4">Acesso</span>
              <p className="yf-tnum text-[42px] font-extrabold tracking-tight my-1">R$ 0</p>
              <p className="text-muted-foreground text-[15px] mb-5">Curso completo, três módulos, assistente de IA e quiz de cada módulo. Para quem quer aplicar sozinho.</p>
              <Link to="/curso" className="yf-btn yf-btn-primary">Começar</Link>
            </div>
            <div className="yf-card" style={{ borderColor: "var(--color-primary)" }}>
              <span className="yf-pill mb-4" style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)" }}>Acesso + mentoria</span>
              <p className="yf-tnum text-[42px] font-extrabold tracking-tight my-1">R$ 197</p>
              <p className="text-muted-foreground text-[15px] mb-5">Tudo do Acesso mais uma sessão de 45 min para aplicar no seu negócio. Para quem quer sair com um plano.</p>
              <Link to="/assistente" className="yf-btn yf-btn-secondary">Falar com o consultor</Link>
            </div>
          </div>
          <p className="text-muted-foreground text-[15px] mt-7 max-w-[740px]">
            Distribuição: Instagram, grupos de WhatsApp de empreendedores e parcerias com associações comerciais de bairro. Diferencial: ferramentas em sua maioria gratuitas e exemplos reais de pequenos negócios.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
