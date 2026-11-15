import { type CSSProperties } from "react";
import { Label, Reveal } from "./ui";
import { IconDownload, IconStar } from "./Icons";
import { DRIVERS, PLAY_URL_CLIENTE, PLAY_URL_PRESTADOR } from "../lib/data";

function PhoneMock() {
  const d = DRIVERS[0];
  return (
    <div className="relative mx-auto w-[240px] sm:w-[280px]">
      {/* chips flutuantes */}
      <span
        className="floaty absolute -left-24 top-16 hidden rounded-md border-2 border-ink bg-paper px-2.5 py-1.5 font-mono text-[9px] font-semibold tracking-[0.14em] shadow-hard-sm sm:block"
        style={{ "--fl-rot": "-4deg" } as CSSProperties}
      >
        GPS EM TEMPO REAL
      </span>
      <span
        className="floaty absolute -right-20 top-40 hidden rounded-md border-2 border-ink bg-amber px-2.5 py-1.5 font-mono text-[9px] font-semibold tracking-[0.14em] shadow-hard-sm sm:block"
        style={{ "--fl-rot": "3deg", animationDelay: "1.2s" } as CSSProperties}
      >
        PREÇO FECHADO ✓
      </span>

      <div className="rounded-[2.6rem] border-2 border-ink bg-ink p-2.5 shadow-hard-lg">
        <div className="overflow-hidden rounded-[2.1rem] bg-paper">
          {/* barra de status */}
          <div className="flex items-center justify-between px-5 pt-3 font-mono text-[9px] text-mut">
            <span>14:32</span>
            <span className="h-4 w-16 rounded-full bg-ink" />
            <span>5G ▮▮▮</span>
          </div>

          {/* mapa */}
          <div className="relative mx-3 mt-3 h-44 overflow-hidden rounded-xl border border-line bg-paper2">
            <svg viewBox="0 0 240 170" className="h-full w-full">
              <g stroke="#d9d5c4" strokeWidth="2">
                <path d="M0 40H240M0 95H240M0 140H240" />
                <path d="M50 0V170M120 0V170M190 0V170" />
              </g>
              <path d="M0 120 C60 110 90 70 150 62 S220 40 240 30" stroke="#1c1b16" strokeWidth="6" fill="none" strokeLinecap="round" />
              <path d="M0 120 C60 110 90 70 150 62 S220 40 240 30" stroke="#f2a900" strokeWidth="2.4" fill="none" className="dash-anim" />
              {/* você */}
              <circle cx="36" cy="114" r="7" fill="#f2a900" stroke="#1c1b16" strokeWidth="2" />
              <circle cx="36" cy="114" r="12" fill="none" stroke="#f2a900" className="radar-ring" />
              {/* guincho */}
              <g>
                <rect x="-9" y="-6" width="18" height="12" rx="3" fill="#1c1b16" />
                <rect x="3" y="-8" width="5" height="4" rx="1" fill="#f2a900" />
                <animateMotion
                  dur="5s"
                  repeatCount="indefinite"
                  path="M225 34 C200 44 175 58 150 62 S90 110 60 112"
                  rotate="auto"
                />
              </g>
            </svg>
            <span className="absolute left-2.5 top-2.5 rounded border border-line bg-paper px-1.5 py-0.5 font-mono text-[8.5px] tracking-wider text-ink2">
              CHEGA EM ~4 MIN
            </span>
          </div>

          {/* card do motorista */}
          <div className="mx-3 mt-3 rounded-xl border border-line bg-paper p-3">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-ink bg-amber font-display text-[11px] font-extrabold">
                {d.initials}
              </span>
              <div className="min-w-0">
                <p className="truncate font-display text-[13px] font-bold leading-none">{d.name}</p>
                <p className="mt-1 truncate font-mono text-[8.5px] text-mut">{d.vehicle}</p>
              </div>
              <span className="ml-auto flex items-center gap-1 rounded border border-line px-1.5 py-0.5 font-mono text-[9px] font-semibold text-amber2">
                <IconStar className="h-2.5 w-2.5" /> {d.rating}
              </span>
            </div>
            <div className="mt-2.5 flex items-center justify-between rounded-lg bg-paper2 px-3 py-2">
              <span className="font-mono text-[9px] tracking-wider text-ink2">TOTAL COMBINADO</span>
              <span className="font-display text-sm font-extrabold">R$ 218,00</span>
            </div>
          </div>

          {/* botão SOS */}
          <div className="flex items-center justify-center px-3 py-4">
            <span className="sos-ring grid h-14 w-14 place-items-center rounded-full border-2 border-ink bg-amber font-display text-[11px] font-extrabold tracking-widest">
              SOS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppPromo({ onSOS }: { onSOS: () => void }) {
  return (
    <section id="app" className="scroll-mt-28 bg-paper py-16 sm:py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:gap-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal from="left">
          <PhoneMock />
        </Reveal>

        <div>
          <Reveal>
            <Label className="text-mut">No app e no navegador</Label>
            <h2 className="mt-4 font-display text-[2.1rem] font-extrabold leading-[1.04] tracking-tight sm:text-4xl md:text-[3.4rem]">
              Pediu, acompanhou,
              <br />
              respirou.
            </h2>
            <p className="mt-5 max-w-lg text-[1.02rem] leading-relaxed text-ink2">
              O aplicativo guarda seus veículos, cartões e endereços frequentes pra um próximo
              pedido sair em segundos. Mas se o celular estiver sem espaço — ou sem paciência —
              tudo funciona direto no navegador também.
            </p>
          </Reveal>

          <ul className="mt-7 space-y-3 font-mono text-[12px] tracking-wide text-ink2">
            <li className="flex gap-3"><span className="text-amber2">→</span> Histórico de atendimentos com nota fiscal</li>
            <li className="flex gap-3"><span className="text-amber2">→</span> Modo frota: vários veículos num painel só</li>
            <li className="flex gap-3"><span className="text-amber2">→</span> Compartilhe o deslocamento com quem você ama</li>
          </ul>

          {/* Dois apps, dois botões — cada um vai para a ficha certa na Play.
              Antes havia um caminho só, com "Baixar na App Store" mesmo sem
              app iOS, e os dois botões apontavam para #app (ou seja: nenhum
              baixava nada). Só Android está publicado. */}
          <Reveal delay={180}>
            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              <a
                href={PLAY_URL_CLIENTE}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-lg border-2 border-ink bg-ink px-5 py-3.5 text-paper transition-all duration-200 hover:-translate-y-0.5 hover:shadow-hard-sm"
              >
                <IconDownload className="h-5 w-5 shrink-0 text-amber" />
                <span className="flex flex-col leading-tight">
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-paper/55">
                    Para quem precisa
                  </span>
                  <span className="text-sm font-semibold">Baixar o app do cliente</span>
                </span>
              </a>

              <a
                href={PLAY_URL_PRESTADOR}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-lg border-2 border-ink bg-amber px-5 py-3.5 text-ink transition-all duration-200 hover:-translate-y-0.5 hover:shadow-hard-sm"
              >
                <IconDownload className="h-5 w-5 shrink-0" />
                <span className="flex flex-col leading-tight">
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/55">
                    Para quem atende
                  </span>
                  <span className="text-sm font-semibold">App do guincheiro</span>
                </span>
              </a>
            </div>
            <p className="mt-3 font-mono text-[10.5px] tracking-[0.12em] text-mut">
              ANDROID · GRÁTIS · SEM TAXA DE ADESÃO
            </p>
            <button
              onClick={onSOS}
              className="mt-5 inline-flex items-center rounded-lg border-2 border-ink bg-paper px-5 py-3 text-sm font-semibold underline decoration-amber decoration-2 underline-offset-4 transition-colors hover:bg-ambersoft"
            >
              pedir socorro agora →
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
