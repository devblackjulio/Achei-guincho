import { ArrowRight, MapPin, Wallet, Handshake } from "lucide-react";
import Reveal from "../components/Reveal";

const perks = [
  { icon: MapPin, t: "Chamados perto de você", d: "Receba só pedidos na sua região e no seu horário." },
  { icon: Handshake, t: "Você define o preço", d: "Seu trabalho, sua tabela. A gente só conecta." },
  { icon: Wallet, t: "Receba rápido", d: "Pagamento direto na conta, sem burocracia." },
];

export default function Providers() {
  return (
    <section id="parceiros" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.25rem] bg-accent px-6 py-12 text-white sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">Para prestadores</p>
              <h2 className="mt-5 font-display text-5xl leading-[1.02] tracking-tight sm:text-6xl">
                Tem um guincho? Deixe a agenda <span className="italic">cheia</span>.
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/90">
                Guincheiros, mecânicos e chaveiros independentes: cadastre-se, receba chamados e cresça no seu ritmo.
              </p>

              <ul className="mt-9 space-y-5">
                {perks.map((p) => (
                  <li key={p.t} className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/15">
                      <p.icon size={20} />
                    </span>
                    <div className="leading-snug">
                      <p className="font-semibold">{p.t}</p>
                      <p className="text-white/80">{p.d}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <a
                href="#parceiros"
                className="group mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
              >
                Quero ser parceiro
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* cartão de chamado */}
            <div className="mx-auto w-full max-w-sm">
              <div className="rounded-[1.75rem] bg-white p-6 text-ink shadow-[0_30px_60px_-25px_rgba(0,0,0,0.45)]">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-sand px-3 py-1 text-xs font-semibold text-muted">Novo chamado</span>
                  <span className="text-sm font-medium text-muted">agora</span>
                </div>
                <p className="mt-5 font-display text-4xl leading-none tracking-tight">Pneu furado</p>
                <p className="mt-2 text-muted">Hatch preto · Av. das Nações, 1200</p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-paper p-4">
                    <p className="text-sm text-muted">Distância</p>
                    <p className="mt-1 text-xl font-bold">3,2 km</p>
                  </div>
                  <div className="rounded-2xl bg-paper p-4">
                    <p className="text-sm text-muted">Você recebe</p>
                    <p className="mt-1 text-xl font-bold">R$ 120</p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-[1fr_1.4fr] gap-3">
                  <button className="rounded-full border border-line py-3.5 font-semibold text-muted">Agora não</button>
                  <button className="rounded-full bg-ink py-3.5 font-semibold text-white">Aceitar chamado</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
