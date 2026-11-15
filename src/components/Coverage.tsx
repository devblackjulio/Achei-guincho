import { CountUp, Label, Reveal } from "./ui";
import { CITIES } from "../lib/data";

type Node = { x: number; y: number; label: string; hub?: boolean };

const NODES: Node[] = [
  { x: 110, y: 96, label: "Manaus" },
  { x: 196, y: 68, label: "Belém" },
  { x: 296, y: 104, label: "Fortaleza" },
  { x: 331, y: 150, label: "Recife" },
  { x: 311, y: 214, label: "Salvador" },
  { x: 231, y: 240, label: "Brasília", hub: true },
  { x: 184, y: 286, label: "C. Grande" },
  { x: 272, y: 262, label: "B. Horizonte", hub: true },
  { x: 284, y: 306, label: "Rio de Janeiro" },
  { x: 245, y: 316, label: "São Paulo", hub: true },
  { x: 222, y: 342, label: "Curitiba" },
  { x: 199, y: 382, label: "P. Alegre" },
];

const ROUTES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 7], [7, 8], [8, 9],
  [9, 10], [10, 11], [9, 6], [5, 0], [4, 7], [5, 6],
];

function RouteMap() {
  return (
    <svg viewBox="0 0 400 420" className="h-auto w-full" role="img" aria-label="Mapa estilizado da malha de cobertura do Achei Guincho no Brasil">
      <defs>
        <pattern id="dots" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="1.6" cy="1.6" r="1.1" fill="#f6f5f0" opacity="0.08" />
        </pattern>
      </defs>
      <rect width="400" height="420" fill="url(#dots)" />

      {/* rotas */}
      {ROUTES.map(([a, b], i) => (
        <line
          key={i}
          x1={NODES[a].x}
          y1={NODES[a].y}
          x2={NODES[b].x}
          y2={NODES[b].y}
          stroke="#f2a900"
          strokeOpacity="0.42"
          strokeWidth="1.4"
          className="dash-anim"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}

      {/* anéis de radar nos hubs */}
      {NODES.filter((n) => n.hub).map((n) => (
        <g key={n.label}>
          <circle cx={n.x} cy={n.y} r="10" fill="none" stroke="#f2a900" strokeWidth="1" className="radar-ring" />
          <circle cx={n.x} cy={n.y} r="10" fill="none" stroke="#f2a900" strokeWidth="1" className="radar-ring" style={{ animationDelay: "1.2s" }} />
        </g>
      ))}

      {/* cidades */}
      {NODES.map((n, i) => (
        <g key={n.label}>
          <circle cx={n.x} cy={n.y} r={n.hub ? 4 : 2.8} fill={n.hub ? "#f2a900" : "#f6f5f0"} />
          <circle cx={n.x} cy={n.y} r="6.5" fill="none" stroke="#f6f5f0" strokeOpacity="0.25" strokeWidth="0.8" />
          <text
            x={n.x + (n.x > 260 ? -9 : 9)}
            y={n.y + 3.5}
            textAnchor={n.x > 260 ? "end" : "start"}
            fill="#f6f5f0"
            fillOpacity={n.hub ? 0.95 : 0.62}
            fontSize="9.5"
            fontFamily="IBM Plex Mono, monospace"
            letterSpacing="0.08em"
          >
            {n.label.toUpperCase()}
          </text>
          {/* guincho viajando em uma rota */}
          {i === 5 && (
            <circle r="3" fill="#f2a900">
              <animateMotion
                dur="4.5s"
                repeatCount="indefinite"
                path={`M ${NODES[5].x} ${NODES[5].y} L ${NODES[7].x} ${NODES[7].y}`}
              />
            </circle>
          )}
        </g>
      ))}
    </svg>
  );
}

export default function Coverage() {
  return (
    <section id="cobertura" className="scroll-mt-0 relative overflow-hidden bg-ink py-24 text-paper md:py-32">
      {/* placa de quilômetro decorativa */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-10 top-10 rotate-6 select-none rounded-lg border-2 border-paper/25 px-4 py-2 font-mono text-[11px] tracking-[0.24em] text-paper/40">
        BR-116 · KM 042
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1fr_0.95fr] lg:gap-20">
        <div>
          <Reveal>
            <Label className="text-amber">Cobertura</Label>
            <h2 className="mt-4 font-display text-[2.1rem] font-extrabold leading-[1.04] tracking-tight sm:text-4xl md:text-[3.4rem]">
              Do Oiapoque ao Chuí.
              <br />
              <span className="text-amber">Literalmente.</span>
            </h2>
            <p className="mt-5 max-w-lg text-[1.02rem] leading-relaxed text-paper/70">
              Nossa malha cobre rodovias federais, estaduais e o perímetro urbano das principais
              regiões metropolitanas. Onde tem asfalto — e até onde não tem — tem um parceiro por
              perto.
            </p>
          </Reveal>

          <div className="mt-11 grid grid-cols-2 gap-x-8 gap-y-9">
            {[
              { v: <CountUp to={1240} />, l: "cidades atendidas" },
              { v: <CountUp to={27} />, l: "estados + DF" },
              { v: <CountUp to={24} suffix=" min" />, l: "espera média nas capitais" },
              { v: <CountUp to={98.2} decimals={1} suffix="%" />, l: "chamados concluídos" },
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 90}>
                <div className="border-l-2 border-amber pl-4">
                  <p className="font-display text-4xl font-extrabold tracking-tight md:text-[2.7rem]">
                    {s.v}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/55">
                    {s.l}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-11 flex flex-wrap gap-2">
              {CITIES.map((c) => (
                <span
                  key={c}
                  className="cursor-default rounded-md border border-paper/25 px-3 py-1.5 font-mono text-[10.5px] tracking-[0.1em] text-paper/75 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber hover:text-amber"
                >
                  {c}
                </span>
              ))}
              <span className="rounded-md bg-amber/15 px-3 py-1.5 font-mono text-[10.5px] tracking-[0.1em] text-amber">
                + 1.225 outras
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal from="right" delay={150}>
          <div className="relative rounded-xl border border-paper/20 bg-[#23211a] p-5 shadow-[0.5rem_0.5rem_0_0_rgba(242,169,0,0.9)]">
            <div className="mb-4 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-paper/50">
              <span>MALHA ATIVA · BRASIL</span>
              <span className="flex items-center gap-1.5 text-amber">
                <span className="blink-dot h-1.5 w-1.5 rounded-full bg-amber" />
                TEMPO REAL
              </span>
            </div>
            <RouteMap />
            <p className="mt-4 border-t border-paper/10 pt-3.5 text-center font-mono text-[9.5px] tracking-[0.18em] text-paper/40">
              ● HUB COM GUINCHO PESADO · — ROTA COM PARCEIRO EM DESLOCAMENTO
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
