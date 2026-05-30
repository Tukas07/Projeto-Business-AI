export const APP_NAME = "Young Founders";
export const APP_SUFFIX = "SP";
export const COURSE_NAME = "Inteligência Artificial para Pequenos Empreendedores";
export const INTEGRANTES = "Alexandre Karnakis Bazzi";

export const SYSTEM_PROMPT = `Você é o consultor de IA do curso "Inteligência Artificial para Pequenos Empreendedores", da Young Founders • SP. Seu público são donos de pequenos negócios: lojas, serviços, autônomos, microempresas. Fale em linguagem simples e prática, sem jargão técnico. Recomende ferramentas acessíveis, e prefira opções gratuitas quando existirem. Sempre diga qual é a ferramenta, para que serve e qual o primeiro passo. Respostas curtas, de duas a quatro frases, com um exemplo concreto do dia a dia de um pequeno negócio quando ajudar. Seja encorajador, mas direto. Se a pergunta fugir do tema de IA para pequenos negócios, traga de volta com gentileza. Quando fizer sentido, termine com uma pergunta para entender melhor o negócio da pessoa.`;

export type LessonContent = {
  tool: string;
  for: string;
  why: string;
  how: string;
  applied: string;
};

export type Lesson = {
  id: string;
  title: string;
  youtube: string;
  c: LessonContent;
};

export type QuizItem = { q: string; o: string[]; a: number; e: string };

export type Module = {
  id: number;
  num: string;
  title: string;
  subtitle: string;
  lessons: Lesson[];
  quiz: QuizItem[];
};

export const MODULES: Module[] = [
  {
    id: 1, num: "01", title: "Atrair clientes", subtitle: "IA para divulgar o seu negócio.",
    lessons: [
      { id: "1.1", title: "Criar posts e legendas para as redes", youtube: "",
        c: { tool: "ChatGPT ou Gemini (versões gratuitas resolvem).",
             for: "Gerar ideias e textos de post para Instagram, Facebook e WhatsApp.",
             why: "Vence a página em branco e mantém presença sem precisar de agência.",
             how: "Descreva seu negócio e o que quer divulgar, peça 5 opções de legenda, escolha a melhor e ajuste no seu jeito.",
             applied: "Você posta com frequência sem gastar horas pensando no texto." } },
      { id: "1.2", title: "Descrições de produto e anúncios que vendem", youtube: "",
        c: { tool: "ChatGPT.",
             for: "Escrever descrição de produto e texto de anúncio.",
             why: "Texto claro, com o benefício na frente, aumenta a venda sem custo nenhum.",
             how: "Informe o produto, o público e o preço, peça uma descrição curta e três variações de anúncio.",
             applied: "Catálogo e anúncios prontos para marketplace, redes e WhatsApp." } },
      { id: "1.3", title: "Artes e imagens simples com IA", youtube: "",
        c: { tool: "Canva com IA, e ferramentas de imagem gratuitas.",
             for: "Criar artes de post, banner e cardápio sem contratar designer.",
             why: "Visual profissional, rápido e barato.",
             how: "Use um modelo pronto, gere variações com a IA, troque cores e texto para a cara do seu negócio.",
             applied: "Feed e promoções com aparência profissional." } },
    ],
    quiz: [
      { q: "Para criar legendas de post sem travar, você pode usar:",
        o: ["Só a sua memória", "ChatGPT ou Gemini para gerar opções", "Esperar a inspiração chegar", "Copiar de um concorrente"],
        a: 1, e: "Peça 5 opções e ajuste a que mais combina com o seu negócio." },
      { q: "Uma boa descrição de produto serve para:",
        o: ["Encher de palavras", "Aumentar a conversão da venda", "Parecer mais formal", "Nada de prático"],
        a: 1, e: "Texto claro com o benefício na frente vende mais, e sai de graça com IA." },
      { q: "Para fazer artes de post sem designer, a opção prática é:",
        o: ["Photoshop avançado", "Canva com IA e modelos prontos", "Contratar uma agência", "Deixar para depois"],
        a: 1, e: "Modelo pronto mais IA dão visual profissional rápido e barato." },
    ],
  },
  {
    id: 2, num: "02", title: "Atender melhor", subtitle: "IA no atendimento e nas vendas.",
    lessons: [
      { id: "2.1", title: "Responder no WhatsApp mais rápido", youtube: "",
        c: { tool: "ChatGPT para rascunhar respostas, mais as respostas rápidas do WhatsApp.",
             for: "Responder as dúvidas mais comuns com qualidade e agilidade.",
             why: "Resposta rápida fecha mais venda. Cliente que espera, desiste.",
             how: "Liste as perguntas que você mais recebe, peça respostas prontas para cada uma, salve como respostas rápidas no celular.",
             applied: "O atendimento não trava quando você está no balcão ou na cozinha." } },
      { id: "2.2", title: "Um assistente para tirar dúvidas sozinho", youtube: "",
        c: { tool: "Um chatbot simples ou assistente de IA com as suas perguntas frequentes.",
             for: "Deixar o cliente se atender fora do seu horário.",
             why: "Você não perde venda de madrugada nem no domingo.",
             how: "Junte as dúvidas frequentes (horário, preço, entrega) e monte um assistente que responde com base nelas.",
             applied: "Atendimento que funciona 24 horas sem contratar ninguém." } },
      { id: "2.3", title: "Follow-up e pós-venda sem esquecer ninguém", youtube: "",
        c: { tool: "ChatGPT mais uma planilha ou a agenda do celular.",
             for: "Escrever mensagens de retomada e lembrete para cada etapa da venda.",
             why: "A maior parte das vendas vem do segundo contato, não do primeiro.",
             how: "Peça modelos de mensagem para cada situação: orçamento enviado, cliente sumiu, pós-compra.",
             applied: "Cliente lembrado, recompra mais alta, ninguém cai no esquecimento." } },
    ],
    quiz: [
      { q: "Para responder dúvidas comuns no WhatsApp mais rápido, vale:",
        o: ["Responder uma por uma do zero", "Criar respostas prontas com a IA", "Ignorar as mensagens", "Atender só por telefone"],
        a: 1, e: "Respostas prontas mantêm qualidade e agilidade quando você está ocupado." },
      { q: "Um assistente ou FAQ automático ajuda principalmente porque:",
        o: ["Parece moderno", "Atende o cliente fora do seu horário", "Substitui o produto", "Baixa o preço"],
        a: 1, e: "Você não perde venda quando não está disponível." },
      { q: "A maior parte das vendas costuma vir:",
        o: ["Só do primeiro contato", "Do follow-up, o segundo contato", "Da sorte", "Sempre de desconto"],
        a: 1, e: "Uma mensagem de retomada bem feita recupera o cliente que sumiu." },
    ],
  },
  {
    id: 3, num: "03", title: "Ganhar tempo", subtitle: "IA para a rotina do dia a dia.",
    lessons: [
      { id: "3.1", title: "Organizar as finanças e entender os números", youtube: "",
        c: { tool: "ChatGPT com análise de planilha.",
             for: "Ler a sua planilha simples de caixa e responder o que está acontecendo.",
             why: "Decisão com número na mão, sem depender do contador para cada dúvida.",
             how: "Suba a planilha do mês e pergunte para onde está indo o dinheiro e o que dá para cortar.",
             applied: "Você passa a saber o que dá lucro e o que só dá trabalho." } },
      { id: "3.2", title: "Resumir, planejar e escrever em minutos", youtube: "",
        c: { tool: "ChatGPT, e o NotebookLM para os seus documentos.",
             for: "Resumir textos, planejar a semana e redigir e-mail, contrato simples e mensagem.",
             why: "Tarefa chata sai do seu colo e você foca no negócio.",
             how: "Cole o texto e peça o resumo. Descreva a semana e peça um plano. Peça o rascunho do e-mail e só revise.",
             applied: "Menos tempo na burocracia, mais tempo no cliente." } },
    ],
    quiz: [
      { q: "Para entender para onde vai o dinheiro do mês, você pode:",
        o: ["Adivinhar", "Subir a planilha e perguntar para a IA", "Esperar o fim do ano", "Olhar só o saldo do banco"],
        a: 1, e: "A IA lê a planilha e mostra onde cortar e o que dá lucro." },
      { q: "Tarefas chatas como resumir texto e redigir e-mail podem ser feitas:",
        o: ["Só por você, sempre", "Com IA, em minutos", "Por ninguém", "Apenas no fim de semana"],
        a: 1, e: "Cole o texto, peça o resumo ou o rascunho, e só revise." },
      { q: "O maior ganho de usar IA na rotina de um pequeno negócio é:",
        o: ["Parecer uma empresa grande", "Recuperar tempo para o que importa", "Gastar mais", "Postar mais"],
        a: 1, e: "Menos burocracia, mais tempo no negócio e no cliente." },
    ],
  },
];

export const ALL_LESSONS = MODULES.flatMap((m) =>
  m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title, moduleNum: m.num }))
);
