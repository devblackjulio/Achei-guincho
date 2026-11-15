import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BatteryCharging,
  BadgeCheck,
  Bike,
  CircleDot,
  Clock,
  Fuel,
  HeartHandshake,
  KeyRound,
  MapPin,
  Phone,
  Plus,
  Truck,
  Wallet,
  CalendarClock,
  ShieldCheck,
} from "lucide-react";
import HeroScene from "./three/HeroScene";
import RouteScene from "./three/RouteScene";
import Reveal from "./components/Reveal";
import RequestModal, { type Mode } from "./components/RequestModal";

const PHONE = "0800 123 0190";

const img = {
  woman:
    "https://images.pexels.com/photos/4173093/pexels-photo-4173093.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1100",
  street:
    "https://images.pexels.com/photos/10061763/pexels-photo-10061763.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
  partner:
    "https://images.pexels.com/photos/6720533/pexels-photo-6720533.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800",
};

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label="Achei Guincho">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v8" />
          <path d="M12 11a4 4 0 1 1-4 4" />
          <circle cx="12" cy="3" r="0.4" fill="#e8500c" stroke="#e8500c" strokeWidth="3" />
        </svg>
      </span>
      <span className={`font-display text-[19px] font-semibold ${light ? "text-white" : "text-ink"}`}>
        achei<span className="text-accent">guincho</span>
      </span>
    </a>
  );
}

function Header({ onCall }: { onCall: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 16);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const links = [
    ["Serviços", "#servicos"],
    ["Como funciona", "#como-funciona"],
    ["Quem somos", "#quem-somos"],
    ["Parceiros", "#parceiros"],
    ["Dúvidas", "#duvidas"],
  ];
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "border-b border-line bg-paper/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="text-[15px] text-muted transition hover:text-ink">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="hidden items-center gap-2 text-sm font-medium md:flex">
            <Phone size={15} /> {PHONE}
          </a>
          <button
            onClick={onCall}
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-black"
          >
            Chamar guincho
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ onCall }: { onCall: () => void }) {
  return (
    <section id="top" className="relative overflow-hidden pt-[72px]">
      <div className="mx-auto grid max-w-6xl items-center gap-6 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[1.02fr_1fr] lg:gap-10 lg:pb-24 lg:pt-16">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-sm text-muted">
              <span className="relative flex h-2 w-2">
                <span className="pulse-ring absolute inset-0 rounded-full bg-accent" />
                <span className="relative h-2 w-2 rounded-full bg-accent" />
              </span>
              Atendimento 24h, todos os dias
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-display mt-6 text-[44px] font-semibold leading-[1.02] sm:text-6xl lg:text-[68px]">
              Quebrou? Respira.
              <br />
              <span className="text-muted">A gente manda ajuda.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              Guincho, pane seca, pneu furado, chave trancada no carro. Conte onde você está e
              encontramos o profissional mais perto — com o preço combinado antes de ele sair.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={onCall}
                className="group inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-7 pr-2 text-base font-medium text-white transition hover:bg-black"
              >
                Chamar um guincho
                <span className="grid h-11 w-11 place-items-center rounded-full bg-accent transition group-hover:rotate-[-45deg]">
                  <ArrowRight size={20} />
                </span>
              </button>
              <a
                href={`tel:${PHONE.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 px-2 py-3 text-[15px] font-medium text-ink underline decoration-line decoration-2 underline-offset-8 transition hover:decoration-ink"
              >
                <Phone size={16} /> ou ligue {PHONE}
              </a>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <ul className="mt-12 grid max-w-xl gap-x-6 gap-y-3 text-[15px] text-muted sm:grid-cols-2">
              {[
                "Preço combinado antes de sair",
                "Motoristas verificados",
                "Acompanhe em tempo real",
                "Cobertura em estradas e cidades",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <BadgeCheck size={18} className="shrink-0 text-ink" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div className="relative">
            <div className="relative overflow-hidden rounded-[2rem] bg-sand">
              <HeroScene className="h-[380px] w-full sm:h-[480px] lg:h-[560px]" />
              <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1.5 text-xs text-muted backdrop-blur">
                Arraste para girar
              </div>
            </div>
            {/* cartão de status humanizado */}
            <div className="absolute -bottom-6 left-4 right-4 flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-[0_20px_40px_-20px_rgba(29,31,36,0.25)] sm:left-auto sm:right-6 sm:w-[340px]">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink font-display text-lg font-semibold text-white">
                R
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-medium">Rogério está a caminho</p>
                <p className="truncate text-sm text-muted">Guincho plataforma · chega em 8 min</p>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-paper">
                <Phone size={16} />
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="max-w-2xl">
      <Reveal>
        <p className="mb-4 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.14em] text-accent">
          <span className="h-px w-8 bg-accent" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={70}>
        <h2 className="font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">{title}</h2>
      </Reveal>
      {children && (
        <Reveal delay={140}>
          <p className="mt-5 text-lg leading-relaxed text-muted">{children}</p>
        </Reveal>
      )}
    </div>
  );
}

const services = [
  { icon: Truck, title: "Guincho plataforma", text: "Carros, SUVs e utilitários levados com segurança, sem arrastar nem forçar o câmbio." },
  { icon: Fuel, title: "Pane seca", text: "Acabou o combustível no meio do caminho? Levamos o suficiente para você chegar ao posto." },
  { icon: BatteryCharging, title: "Bateria descarregada", text: "Carga ou troca no local, na hora. Você volta a rodar sem precisar de guincho." },
  { icon: CircleDot, title: "Troca de pneu", text: "Pneu furado, estepe vazio ou sem macaco: alguém vai até você e resolve." },
  { icon: KeyRound, title: "Chaveiro automotivo", text: "Chave esquecida dentro do carro ou perdida. Abrimos sem danificar nada." },
  { icon: Bike, title: "Guincho de moto", text: "Transporte adequado para motos de todos os portes, com amarração protegida." },
];

function Services({ onCall }: { onCall: () => void }) {
  return (
    <section id="servicos" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <SectionTitle eyebrow="Serviços" title="Cada imprevisto tem um jeito de resolver.">
        Você não precisa saber o nome do problema. Diga o que está acontecendo e a gente direciona o profissional certo.
      </SectionTitle>
      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 80} className="bg-paper">
            <button
              onClick={onCall}
              className="group relative flex h-full w-full flex-col items-start bg-paper p-7 text-left transition hover:bg-white sm:p-8"
            >
              <span className="mb-10 grid h-12 w-12 place-items-center rounded-2xl border border-line bg-white text-ink transition group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                <s.icon size={22} strokeWidth={1.7} />
              </span>
              <h3 className="font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
              <ArrowUpRight
                size={20}
                className="absolute right-7 top-7 text-muted/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const steps = [
  {
    title: "Você conta o que aconteceu",
    text: "Abra o site ou o app, marque onde você está e diga o que houve. Leva menos de um minuto.",
  },
  {
    title: "A gente acha quem está mais perto",
    text: "Profissionais verificados da região recebem o seu chamado. O primeiro disponível aceita e você já vê o valor.",
  },
  {
    title: "Você acompanha até a chegada",
    text: "Veja o guincho se aproximando no mapa e fale direto com o motorista. Quando ele chegar, você já sabe quem é.",
  },
];

function HowItWorks() {
  const [step, setStep] = useState(0);
  return (
    <section id="como-funciona" className="border-y border-line bg-sand/60">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-28">
        <div>
          <SectionTitle eyebrow="Como funciona" title="Simples como pedir ajuda a um amigo." />
          <ol className="mt-12 space-y-3">
            {steps.map((s, i) => {
              const active = step === i;
              return (
                <li
                  key={s.title}
                  className={`flex gap-5 rounded-2xl border p-5 transition-all duration-500 ${
                    active ? "border-line bg-white shadow-[0_18px_40px_-24px_rgba(29,31,36,0.3)]" : "border-transparent opacity-55"
                  }`}
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-base font-semibold transition-colors duration-500 ${
                      active ? "bg-accent text-white" : "bg-white text-ink"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{s.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-paper">
            <RouteScene className="h-[420px] w-full sm:h-[540px] lg:h-[600px]" onStep={setStep} />
            <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm shadow-sm backdrop-blur">
              <MapPin size={15} className="text-accent" />
              <span className="text-muted">
                {step === 0 ? "Pedido recebido" : step === 1 ? "Guincho a caminho…" : "Chegou até você"}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function About({ onCall }: { onCall: () => void }) {
  const values = [
    {
      icon: HeartHandshake,
      title: "Calma antes de tudo",
      text: "Quem liga está nervoso, às vezes à noite, às vezes com criança no carro. Nosso atendimento é feito por gente que sabe ouvir primeiro.",
    },
    {
      icon: Wallet,
      title: "Preço sem susto",
      text: "O valor aparece antes de o motorista sair. Se não fizer sentido para você, é só recusar. Sem taxa escondida.",
    },
    {
      icon: ShieldCheck,
      title: "Gente de confiança",
      text: "Todo parceiro passa por verificação de documentos, veículo e histórico antes de receber o primeiro chamado.",
    },
  ];
  return (
    <section id="quem-somos" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal>
          <div className="relative">
            <img
              src={img.woman}
              alt="Motorista ao telefone ao lado do carro parado, pedindo ajuda na estrada"
              className="aspect-[11/10] w-full rounded-[2rem] object-cover"
              loading="lazy"
            />
            <figure className="absolute -bottom-8 right-4 max-w-[280px] rounded-2xl border border-line bg-white p-5 shadow-[0_20px_40px_-20px_rgba(29,31,36,0.3)] sm:right-[-24px]">
              <p className="font-display text-lg font-medium leading-snug">
                “Nunca me senti tão acolhida num momento de aperto.”
              </p>
              <figcaption className="mt-3 text-sm text-muted">Camila, 34 · Ribeirão Preto</figcaption>
            </figure>
          </div>
        </Reveal>

        <div className="pt-6 lg:pt-0">
          <SectionTitle eyebrow="Quem somos" title="Já ficou na estrada sem saber para quem ligar? A gente também.">
            O Achei Guincho nasceu de uma noite de chuva, um pneu estourado e quarenta minutos de ligações sem resposta. Decidimos
            que ninguém deveria passar por isso sozinho.
          </SectionTitle>
          <ul className="mt-10 space-y-6">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 90}>
                <li className="flex gap-4">
                  <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-white">
                    <v.icon size={20} strokeWidth={1.7} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{v.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted">{v.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={200}>
            <button
              onClick={onCall}
              className="mt-10 inline-flex items-center gap-2 text-[15px] font-medium underline decoration-line decoration-2 underline-offset-8 transition hover:decoration-accent"
            >
              Precisa de ajuda agora? Fale com a gente <ArrowRight size={16} />
            </button>
          </Reveal>
        </div>
      </div>

      {/* números */}
      <Reveal>
        <dl className="mt-28 grid grid-cols-2 gap-y-10 border-t border-line pt-12 lg:grid-cols-4">
          {[
            ["+120 mil", "chamados atendidos"],
            ["18 min", "tempo médio de chegada"],
            ["+3.400", "parceiros em todo o Brasil"],
            ["4,9 / 5", "nota média dos clientes"],
          ].map(([n, l]) => (
            <div key={l} className="lg:border-l lg:border-line lg:pl-8 lg:first:border-0 lg:first:pl-0">
              <dt className="font-display text-4xl font-semibold sm:text-5xl">{n}</dt>
              <dd className="mt-2 text-[15px] text-muted">{l}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

function Partners({ onJoin }: { onJoin: () => void }) {
  const perks = [
    { icon: MapPin, t: "Chamados perto de você", d: "Você define a região onde quer atuar." },
    { icon: Wallet, t: "Receba em até 2 dias úteis", d: "Pagamento direto na sua conta, sem burocracia." },
    { icon: CalendarClock, t: "Seu horário, suas regras", d: "Fique online só quando fizer sentido para você." },
  ];
  return (
    <section id="parceiros" className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 lg:pb-28">
      <Reveal>
        <div className="overflow-hidden rounded-[2rem] bg-ink text-white">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-8 sm:p-12 lg:p-14">
              <p className="mb-4 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.14em] text-accent">
                <span className="h-px w-8 bg-accent" /> Para guincheiros
              </p>
              <h2 className="font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
                Tem um guincho? Vamos rodar juntos.
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/65">
                Ajudar quem está na estrada é o seu trabalho. O nosso é fazer os chamados chegarem até você, com respeito e
                pagamento justo.
              </p>
              <ul className="mt-9 space-y-5">
                {perks.map((p) => (
                  <li key={p.t} className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10">
                      <p.icon size={18} strokeWidth={1.7} />
                    </span>
                    <div>
                      <p className="font-medium">{p.t}</p>
                      <p className="text-[15px] text-white/60">{p.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                onClick={onJoin}
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-medium text-ink transition hover:bg-sand"
              >
                Quero ser parceiro <ArrowRight size={18} />
              </button>
            </div>
            <div className="relative min-h-[320px]">
              <img
                src={img.partner}
                alt="Profissional de guincho sorrindo em frente ao caminhão"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent lg:bg-gradient-to-r lg:from-ink/40" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

const quotes = [
  {
    q: "Era meia-noite na Dutra, com minha filha dormindo no banco de trás. Em 15 minutos o Seu Aderbal estava lá, calmo, explicando tudo. Só tenho a agradecer.",
    n: "Patrícia M.",
    w: "São José dos Campos",
  },
  {
    q: "O preço que apareceu no app foi exatamente o que paguei. Parece pouco, mas depois de tantas experiências ruins com guincho, isso vale ouro.",
    n: "Eduardo L.",
    w: "Belo Horizonte",
  },
  {
    q: "Fiquei sem gasolina numa rua que não conhecia. Pedi pelo celular, vi o motorista chegando no mapa e fiquei bem mais tranquilo.",
    n: "Marcos T.",
    w: "Curitiba",
  },
];

function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 lg:pb-28">
      <SectionTitle eyebrow="Histórias reais" title="Quem já precisou, conta como foi." />
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {quotes.map((q, i) => (
          <Reveal key={q.n} delay={i * 90}>
            <figure className="flex h-full flex-col justify-between rounded-3xl border border-line bg-white p-7">
              <blockquote className="text-[16.5px] leading-relaxed text-ink">“{q.q}”</blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-sand font-display font-semibold">
                  {q.n[0]}
                </span>
                <span>
                  <span className="block text-[15px] font-medium">{q.n}</span>
                  <span className="block text-sm text-muted">{q.w}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "Quanto tempo leva para o guincho chegar?",
    a: "Depende de onde você está, mas nossa média é de 18 minutos em áreas urbanas. Em rodovias, mostramos uma estimativa antes de você confirmar o chamado.",
  },
  {
    q: "Como funciona o preço?",
    a: "O valor é calculado pela distância e pelo tipo de serviço e aparece antes de o profissional sair. Você só confirma se concordar — sem taxas escondidas.",
  },
  {
    q: "Vocês atendem em rodovias e à noite?",
    a: "Sim. Funcionamos 24 horas, todos os dias, inclusive feriados, em cidades e nas principais rodovias do país.",
  },
  {
    q: "Meu carro é baixo ou rebaixado. Tem problema?",
    a: "Não. Basta avisar no pedido que enviamos um guincho plataforma adequado, para que o carro suba com todo o cuidado.",
  },
  {
    q: "Como faço para ser parceiro?",
    a: "Preencha o cadastro na seção de parceiros. Verificamos seus documentos e o veículo e, em poucos dias, você já pode receber chamados.",
  },
];

function FAQ() {
  return (
    <section id="duvidas" className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 lg:pb-28">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionTitle eyebrow="Dúvidas" title="Perguntas que sempre nos fazem.">
          Não achou o que procurava? Ligue para {PHONE} — alguém de verdade vai atender.
        </SectionTitle>
        <Reveal>
          <div className="divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group py-1">
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-left">
                  <span className="font-display text-lg font-medium">{f.q}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line transition group-open:rotate-45 group-open:bg-ink group-open:text-white">
                    <Plus size={16} />
                  </span>
                </summary>
                <p className="max-w-xl pb-6 text-[15.5px] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCTA({ onCall }: { onCall: () => void }) {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-sand px-8 py-16 text-center sm:px-16 sm:py-20">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 text-sm text-muted">
            <Clock size={16} /> Plantão aberto agora
          </div>
          <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-[1.05] sm:text-6xl">
            Em apuros? Chame. A gente já está indo.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-lg text-muted">
            Sem cadastro complicado, sem espera infinita. Só alguém pronto para ajudar.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onCall}
              className="group inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-7 pr-2 text-base font-medium text-white transition hover:bg-black"
            >
              Chamar um guincho
              <span className="grid h-11 w-11 place-items-center rounded-full bg-accent transition group-hover:rotate-[-45deg]">
                <ArrowRight size={20} />
              </span>
            </button>
            <a
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 text-[15px] font-medium transition hover:border-ink"
            >
              <Phone size={16} /> {PHONE}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-muted">
            Socorro de estrada feito por gente, para gente. Em qualquer hora e lugar.
          </p>
        </div>
        <div>
          <p className="mb-4 text-sm font-medium">Plataforma</p>
          <ul className="space-y-2.5 text-[15px] text-muted">
            {[
              ["Serviços", "#servicos"],
              ["Como funciona", "#como-funciona"],
              ["Quem somos", "#quem-somos"],
              ["Dúvidas", "#duvidas"],
            ].map(([l, h]) => (
              <li key={h}>
                <a href={h} className="transition hover:text-ink">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-4 text-sm font-medium">Fale com a gente</p>
          <ul className="space-y-2.5 text-[15px] text-muted">
            <li>{PHONE}</li>
            <li>ajuda@acheiguincho.com.br</li>
            <li>Plantão 24h · 7 dias por semana</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-sm text-muted sm:flex-row sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Achei Guincho. Todos os direitos reservados.</p>
          <p>Fotos: Pexels</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [modal, setModal] = useState<Mode | null>(null);
  return (
    <div className="min-h-screen overflow-x-clip">
      <Header onCall={() => setModal("cliente")} />
      <main>
        <Hero onCall={() => setModal("cliente")} />
        <Services onCall={() => setModal("cliente")} />
        <HowItWorks />
        <About onCall={() => setModal("cliente")} />
        <Partners onJoin={() => setModal("parceiro")} />
        <Testimonials />
        <FAQ />
        <FinalCTA onCall={() => setModal("cliente")} />
      </main>
      <Footer />
      {modal && <RequestModal mode={modal} onClose={() => setModal(null)} />}
    </div>
  );
}
