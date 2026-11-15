import { useRef } from "react";
import { Label, Reveal } from "./ui";
import { TESTIMONIALS } from "../lib/data";
import { IconArrow, IconStar } from "./Icons";

export default function Testimonials() {
  const track = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    track.current?.scrollBy({ left: dir * 420, behavior: "smooth" });
  };

  return (
    <section id="historias" className="scroll-mt-28 overflow-hidden bg-paper py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <Label className="text-mut">Quem já ficou na mão (e saiu)</Label>
            <h2 className="mt-4 max-w-2xl font-display text-[2.1rem] font-extrabold leading-[1.04] tracking-tight sm:text-4xl md:text-[3.4rem]">
              Histórias reais de quem já viu o giroflex de longe.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex items-center gap-3 pb-2">
              <button
                onClick={() => scroll(-1)}
                aria-label="Depoimento anterior"
                className="grid h-11 w-11 place-items-center rounded-lg border-2 border-ink bg-paper shadow-hard-sm transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              >
                <IconArrow className="h-4.5 w-4.5 rotate-180" />
              </button>
              <button
                onClick={() => scroll(1)}
                aria-label="Próximo depoimento"
                className="grid h-11 w-11 place-items-center rounded-lg border-2 border-ink bg-amber shadow-hard-sm transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              >
                <IconArrow className="h-4.5 w-4.5" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={150}>
        <div
          ref={track}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
        >
          {TESTIMONIALS.map((t, i) => (
            <article
              key={t.name}
              className={`w-[86vw] max-w-[400px] shrink-0 snap-start rounded-xl border-2 border-ink bg-paper p-6 shadow-hard transition-all duration-400 hover:-translate-y-1.5 hover:rotate-0 sm:w-[400px] ${
                i % 2 === 0 ? "rotate-[0.8deg]" : "-rotate-[0.8deg]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="flex gap-0.5 text-amber2">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <IconStar key={s} className="h-4 w-4" />
                  ))}
                </span>
                <span className="rounded border border-line bg-paper2 px-2 py-0.5 font-mono text-[9px] tracking-[0.14em] text-mut">
                  {t.tag}
                </span>
              </div>
              <blockquote className="mt-4 text-[0.95rem] leading-relaxed text-ink2">
                “{t.quote}”
              </blockquote>
              <footer className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-ink bg-ambersoft font-display text-xs font-extrabold">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="font-display text-sm font-bold leading-none">{t.name}</p>
                  <p className="mt-1 font-mono text-[10px] tracking-wider text-mut">{t.place}</p>
                </div>
              </footer>
            </article>
          ))}

          {/* cartão final */}
          <div className="flex w-[70vw] max-w-[320px] shrink-0 snap-start rotate-[0.8deg] flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-ink/40 p-8 text-center transition-all duration-300 hover:border-amber2">
            <p className="font-display text-xl font-bold leading-snug">
              A próxima história pode ser a sua.
            </p>
            <p className="font-mono text-[10.5px] tracking-[0.14em] text-mut">
              DE PREFERÊNCIA SEM O APURO.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
