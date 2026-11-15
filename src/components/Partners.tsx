import { Label, Reveal } from "./ui";
import { IconCheck } from "./Icons";

const PHOTO =
  "https://images.pexels.com/photos/17429097/pexels-photo-17429097.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";

const PERKS = [
  "Repasse semanal, sem burocracia e sem pegadinha de taxa",
  "Você escolhe região, horário e tipo de corrida que aceita",
  "Sem deslocamento morto: as chamadas são sempre da sua área",
  "Suporte de gente de verdade, no WhatsApp, a qualquer hora",
];

export default function Partners() {
  return (
    <section id="parceiros" className="scroll-mt-28 border-y-2 border-ink bg-paper2 py-16 sm:py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <Reveal from="left">
          <figure className="relative rotate-[1.4deg] transition-transform duration-500 hover:rotate-0">
            <div className="overflow-hidden rounded-xl border-2 border-ink bg-paper p-2.5 shadow-hard-lg">
              <img
                src={PHOTO}
                alt="Guincheiro parceiro operando a plataforma para carregar um veículo"
                loading="lazy"
                className="h-[340px] w-full rounded-lg object-cover md:h-[420px]"
              />
              <figcaption className="flex items-center justify-between pt-3 font-mono text-[10px] tracking-[0.14em] text-mut">
                <span>CARLOS · PARCEIRO DESDE 2022</span>
                <span>SOROCABA — SP</span>
              </figcaption>
            </div>
            <span className="absolute -bottom-4 -left-3 -rotate-6 rounded-md border-2 border-ink bg-amber px-3 py-1.5 font-display text-sm font-extrabold shadow-hard-sm">
              1.843 corridas ★ 4,98
            </span>
          </figure>
        </Reveal>

        <div>
          <Reveal>
            <Label className="text-mut">Seja um parceiro</Label>
            <h2 className="mt-4 font-display text-[2.1rem] font-extrabold leading-[1.04] tracking-tight sm:text-4xl md:text-[3.4rem]">
              Tem guincho parado na garagem? Bote ele pra render.
            </h2>
            <p className="mt-5 max-w-lg text-[1.02rem] leading-relaxed text-ink2">
              Mais de 1.200 guincheiros e socorristas já tiram a renda principal — ou um extra de
              respeito — pela plataforma. Sem exclusividade, sem mensalidade, sem letra miúda.
            </p>
          </Reveal>

          <ul className="mt-8 space-y-3.5">
            {PERKS.map((p, i) => (
              <Reveal key={p} delay={i * 80}>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 border-ink bg-amber">
                    <IconCheck className="h-3.5 w-3.5" />
                  </span>
                  <span className="leading-relaxed text-ink2">{p}</span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={280}>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a
                href="#cadastro-parceiro"
                className="rounded-lg border-2 border-ink bg-amber px-6 py-3.5 font-display text-lg font-bold shadow-hard transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
              >
                Cadastrar meu guincho
              </a>
              <p className="font-mono text-[10.5px] tracking-[0.14em] text-mut">
                APROVAÇÃO EM ATÉ 48H ÚTEIS
                <br />
                REPASSE MÉDIO DE R$ 8,4 MIL/MÊS
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
