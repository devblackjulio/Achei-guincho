import { Reveal, Label } from "./ui";
import { SERVICES } from "../lib/data";
import {
  IconHook,
  IconHeavy,
  IconMoto,
  IconFuel,
  IconBattery,
  IconTire,
  IconKey,
  IconWrench,
  IconArrow,
} from "./Icons";

const ICONS: Record<string, typeof IconHook> = {
  hook: IconHook,
  heavy: IconHeavy,
  moto: IconMoto,
  fuel: IconFuel,
  battery: IconBattery,
  tire: IconTire,
  key: IconKey,
  wrench: IconWrench,
};

export default function Services({ onSOS }: { onSOS: () => void }) {
  return (
    <section id="servicos" className="scroll-mt-28 border-y-2 border-ink bg-paper2 py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <Label className="text-mut">Serviços</Label>
            <h2 className="mt-4 max-w-xl font-display text-[2.1rem] font-extrabold leading-[1.04] tracking-tight sm:text-4xl md:text-[3.4rem]">
              Um app. <span className="text-amber2">Todos</span> os socorros da estrada.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-sm pb-2 leading-relaxed text-ink2">
              Cada serviço tem parceiros verificados, com equipamento certo e treinamento pra
              atender sem danificar o seu bem. Passe o mouse e veja o que cabe no seu aperto.
            </p>
          </Reveal>
        </div>

        <div className="mt-12">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <Reveal key={s.name} delay={Math.min(i * 55, 330)}>
                <button
                  onClick={onSOS}
                  className="group grid w-full grid-cols-[2.6rem_3.2rem_1fr] items-center gap-4 border-t border-line py-6 text-left transition-colors duration-300 last:border-b hover:bg-ambersoft/70 md:grid-cols-[3.5rem_3.6rem_1fr_auto] md:gap-7 md:px-4"
                >
                  <span className="font-mono text-xs font-medium text-mut transition-colors group-hover:text-amber2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="grid h-13 w-13 place-items-center rounded-lg border-2 border-ink bg-paper transition-all duration-300 group-hover:-rotate-6 group-hover:bg-amber">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block font-display text-xl font-bold tracking-tight md:text-[1.35rem]">
                      {s.name}
                    </span>
                    <span className="mt-1 block max-w-xl text-sm leading-relaxed text-mut">
                      {s.desc}
                    </span>
                  </span>
                  <span className="col-start-3 hidden items-center gap-4 md:col-start-4 md:flex">
                    <span className="font-mono text-[10.5px] tracking-[0.14em] text-mut">
                      {s.eta.toUpperCase()}
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-ink bg-paper transition-all duration-300 group-hover:translate-x-1.5 group-hover:bg-ink group-hover:text-amber">
                      <IconArrow className="h-4 w-4" />
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={150}>
          <p className="mt-10 text-center font-mono text-[11px] tracking-[0.16em] text-mut">
            NÃO ACHOU O SEU PROBLEMA?{" "}
            <button onClick={onSOS} className="font-semibold text-ink underline decoration-amber decoration-2 underline-offset-4 hover:text-amber2">
              CHAMA MESMO ASSIM
            </button>{" "}
            — A GENTE JÁ VIU DE TUDO NA PISTA.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
