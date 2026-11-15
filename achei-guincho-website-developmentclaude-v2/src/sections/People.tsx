import Reveal from "../components/Reveal";

const photoWoman =
  "https://images.pexels.com/photos/4173086/pexels-photo-4173086.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=800&fit=crop";
const photoDriver =
  "https://images.pexels.com/photos/5209221/pexels-photo-5209221.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=700&w=900&fit=crop";

const promises = [
  { t: "Preço à vista", d: "Você vê o valor antes de aceitar. Sem surpresa quando o guincho chegar." },
  { t: "Gente verificada", d: "Conferimos documentos, veículo e histórico de cada profissional." },
  { t: "Sem letra miúda", d: "Sem mensalidade, sem plano obrigatório. Chamou, usou, pagou." },
  { t: "Suporte de verdade", d: "Gente de carne e osso para ajudar, de madrugada também." },
];

const quotes = [
  {
    q: "Eram 23h, estrada vazia e meu filho no banco de trás. O Antônio chegou em vinte minutos e ainda esperou eu me acalmar antes de sair.",
    n: "Marina",
    c: "Campinas, SP",
  },
  {
    q: "Já usei seguro e fiquei duas horas esperando. Aqui eu vi o preço, vi o rosto de quem vinha e acompanhei no mapa. Mudou tudo.",
    n: "Roberto",
    c: "Belo Horizonte, MG",
  },
  {
    q: "Como guincheiro, o app me trouxe clientes que eu nunca alcançaria sozinho. E recebo no mesmo dia, sem correr atrás.",
    n: "Sérgio",
    c: "Parceiro, Curitiba, PR",
  },
];

export default function People() {
  return (
    <section id="pessoas" className="bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal className="relative">
            <div className="grid grid-cols-5 gap-4">
              <img
                src={photoWoman}
                alt="Motorista ao telefone, pedindo ajuda ao lado do carro com o capô aberto"
                loading="lazy"
                className="col-span-3 aspect-[4/5] w-full rounded-[1.75rem] object-cover"
              />
              <div className="col-span-2 flex flex-col gap-4">
                <img
                  src={photoDriver}
                  alt="Profissional ajudando um veículo parado na estrada"
                  loading="lazy"
                  className="aspect-square w-full rounded-[1.75rem] object-cover"
                />
                <div className="flex flex-1 flex-col justify-end rounded-[1.75rem] bg-accent p-5 text-white">
                  <p className="font-display text-4xl leading-none sm:text-5xl">24h</p>
                  <p className="mt-2 text-sm leading-snug text-white/85">de segunda a segunda, feriado inclusive.</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Quem somos</p>
            <h2 className="mt-5 font-display text-5xl leading-[1.02] tracking-tight sm:text-6xl">
              Por trás de cada chamado, tem <span className="italic">uma pessoa</span>.
            </h2>
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-muted">
              <p>
                Ninguém planeja ficar parado no acostamento. É um momento de tensão, às vezes de medo, quase sempre de
                pressa. A gente nasceu para tornar esse momento menos solitário.
              </p>
              <p>
                O Achei Guincho aproxima quem precisa de ajuda de quem sabe ajudar: guincheiros, mecânicos e chaveiros
                independentes que conhecem a estrada da sua cidade, com preço justo para os dois lados.
              </p>
            </div>
          </Reveal>
        </div>

        {/* compromissos */}
        <div className="mt-20 grid gap-x-10 gap-y-10 border-t border-line pt-12 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          {promises.map((p, i) => (
            <Reveal key={p.t} delay={i * 70}>
              <span className="font-display text-xl italic text-accent">0{i + 1}</span>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">{p.t}</h3>
              <p className="mt-2 leading-relaxed text-muted">{p.d}</p>
            </Reveal>
          ))}
        </div>

        {/* depoimentos */}
        <div className="mt-20 grid gap-5 lg:mt-28 lg:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal key={q.n} delay={i * 90}>
              <figure className="flex h-full flex-col justify-between rounded-[1.75rem] bg-paper p-8">
                <blockquote className="font-display text-[1.65rem] leading-snug tracking-tight">
                  “{q.q}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-ink font-display text-xl text-white">
                    {q.n[0]}
                  </span>
                  <span className="leading-tight">
                    <span className="block font-semibold">{q.n}</span>
                    <span className="text-sm text-muted">{q.c}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
