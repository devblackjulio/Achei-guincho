import { useEffect, useState } from "react";
import HeroScene from "./HeroScene";
import { Reveal } from "./ui";
import { IconPhone, IconPin } from "./Icons";
import { DRIVERS, PHASES, PHONE, PHONE_HREF } from "../lib/data";

function DispatchCard() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % PHASES.length), 3400);
    return () => clearInterval(id);
  }, []);

  const phase = PHASES[i];
  const progress = ((i + 1) / PHASES.length) * 100;
  const driver = DRIVERS[i % DRIVERS.length];
  const done = phase.eta === 0;

  return (
    <div className="relative w-full max-w-sm">
      {/* adesivo decorativo */}
      <span className="absolute -top-5 -right-2 z-10 rotate-6 rounded-md border-2 border-ink bg-ink px-2.5 py-1 font-mono text-[9.5px] font-semibold tracking-[0.2em] text-amber shadow-hard-sm sm:-right-5">
        SOCORRO 24H
      </span>

      <div className="-rotate-1 rounded-xl border-2 border-ink bg-paper p-5 shadow-hard-lg transition-transform duration-500 hover:rotate-0">
        <div className="flex items-center justify-between border-b border-line pb-3 font-mono text-[10.5px] tracking-[0.18em] text-mut">
          <span>DESPACHO · CHAMADO #48.291</span>
          <span className="flex items-center gap-1.5 font-semibold text-moss">
            <span className="blink-dot h-2 w-2 rounded-full bg-moss" />
            AO VIVO
          </span>
        </div>

        <div className="flex items-end justify-between pt-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mut">Status</p>
            <p className="font-display text-xl font-bold leading-tight">{phase.label}</p>
          </div>
          <p className="font-mono text-2xl font-semibold text-amber2">
            {done ? "OK ✓" : `~${phase.eta}′`}
          </p>
        </div>

        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-amber transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {i >= 1 && (
          <div className="mt-4 flex items-center gap-3 rounded-lg border border-line bg-paper2/70 p-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-ink bg-amber font-display text-sm font-extrabold">
              {driver.initials}
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-bold">{driver.name}</p>
              <p className="truncate font-mono text-[10px] tracking-wider text-mut">
                {driver.vehicle}
              </p>
            </div>
            <span className="ml-auto shrink-0 rounded border border-line bg-paper px-1.5 py-0.5 font-mono text-[10px] font-semibold text-amber2">
              ★ {driver.rating}
            </span>
          </div>
        )}

        <p className="mt-3.5 flex items-center gap-1.5 font-mono text-[10.5px] text-mut">
          <IconPin className="h-3.5 w-3.5 shrink-0" />
          Av. Marginal Tietê, 4.200 — São Paulo · SP
        </p>
      </div>
    </div>
  );
}

export default function Hero({
  onSOS,
  onSceneReady,
}: {
  onSOS: () => void;
  onSceneReady?: () => void;
}) {
  return (
    <section id="topo" className="relative overflow-hidden">
      {/* cena 3D */}
      <div className="absolute inset-0">
        <HeroScene onReady={onSceneReady} />
      </div>
      {/* suaviza a junção com a próxima seção */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-paper/0 to-paper" />

      <div className="relative mx-auto grid max-w-7xl gap-8 px-5 pt-28 pb-20 sm:px-6 sm:pt-40 sm:pb-28 md:pt-48 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-6 lg:pb-36">
        <div className="max-w-2xl">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-3.5 py-1.5 font-mono text-[10.5px] font-medium tracking-[0.18em] shadow-hard-sm">
              <span className="blink-dot h-2 w-2 rounded-full bg-moss" />
              PLATAFORMA NO AR · TEMPO MÉDIO 24 MIN
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-6 font-display text-[clamp(3.1rem,8vw,5.9rem)] font-extrabold leading-[0.94] tracking-tight">
              Quebrou
              <span className="text-amber2">?</span>
              <br />
              Respira.
              <br />
              <span className="relative inline-block">
                A gente
                <svg
                  aria-hidden="true"
                  className="absolute -bottom-1.5 left-0 w-full text-amber"
                  viewBox="0 0 220 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path d="M3 9C40 3 90 2 217 6" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>{" "}
              resolve.
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-7 max-w-md text-[1.06rem] leading-relaxed text-ink2">
              O <strong className="font-semibold text-ink">Achei Guincho</strong> conecta você ao
              guincho ou socorrista mais próximo — com preço fechado antes de confirmar, foto do
              motorista e GPS em tempo real. Do furo de pneu ao caminhão tombado.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={onSOS}
                className="group relative inline-flex items-center gap-3 rounded-lg border-2 border-ink bg-ink px-6 py-4 font-display text-lg font-bold text-paper shadow-hard-amber transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
              >
                <span className="sos-ring grid h-3 w-3 place-items-center rounded-full bg-amber" />
                Pedir socorro agora
              </button>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2.5 rounded-lg border-2 border-ink bg-paper px-5 py-4 font-mono text-sm font-semibold shadow-hard-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-ambersoft"
              >
                <IconPhone className="h-4 w-4" />
                {PHONE}
              </a>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <dl className="mt-11 flex flex-wrap gap-x-9 gap-y-4">
              {[
                ["320 mil+", "atendimentos realizados"],
                ["4,9 ★", "nota média dos motoristas"],
                ["98,2%", "chamados concluídos"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-display text-2xl font-extrabold">{n}</dd>
                  <dd className="font-mono text-[10px] uppercase tracking-[0.16em] text-mut">{l}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal from="right" delay={220} className="flex justify-center lg:justify-end lg:pr-6">
          <DispatchCard />
        </Reveal>
      </div>

      <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-ink2 md:flex">
        <span className="font-mono text-[9.5px] tracking-[0.28em]">ROLE PARA CONHECER</span>
        <svg className="scroll-cue h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 4v14m0 0-5-5m5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}

/* ---------- letreiro de serviços ---------- */
export function Ticker() {
  const items = [
    "Guincho leve",
    "Guincho pesado",
    "Socorro moto",
    "Pane seca",
    "Bateria",
    "Troca de pneu",
    "Chaveiro auto",
    "Pequenos reparos",
    "24 horas",
    "Todo o Brasil",
  ];
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center">
      {items.map((it) => (
        <span key={key + it} className="flex items-center">
          <span className="px-6 font-display text-[0.95rem] font-bold uppercase tracking-[0.12em]">
            {it}
          </span>
          <span className="h-2.5 w-2.5 rotate-45 bg-amber" aria-hidden="true" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee relative z-10 -my-1 -rotate-[1.1deg] scale-x-105 border-y-2 border-ink bg-ink py-3 text-paper">
      <div className="marquee-track">{[row("a"), row("b")]}</div>
    </div>
  );
}
