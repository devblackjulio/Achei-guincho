import { useRef, useState } from "react";
import { BellRing, CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import TowScene from "../components/TowScene";

const steps = [
  {
    n: "01",
    title: "Conte o que aconteceu",
    text: "Em poucos toques você diz onde está e do que precisa. Sem ligação, sem ficar esperando na linha.",
  },
  {
    n: "02",
    title: "Escolha quem vai te ajudar",
    text: "Veja preço, distância e avaliações dos profissionais por perto. Só confirma quando estiver tranquilo com a oferta.",
  },
  {
    n: "03",
    title: "Acompanhe até chegar",
    text: "Veja o guincho se aproximando no mapa. Seu carro segue em segurança e você avalia o atendimento no fim.",
  },
];

const chips = [
  { icon: BellRing, title: "Chamado enviado", sub: "Pneu furado · BR-116, km 212" },
  { icon: MapPin, title: "Carlos aceitou · R$ 189", sub: "Chega em 12 minutos" },
  { icon: CheckCircle2, title: "Veículo a salvo", sub: "Atendimento concluído" },
];

export default function HowItWorks() {
  const track = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);

  const Chip = chips[step].icon;

  return (
    <section id="como-funciona" ref={track} className="relative h-[340vh] bg-paper">
      <div className="sticky top-0 flex h-screen flex-col pt-[4.5rem]">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4 px-5 pb-6 pt-4 sm:px-8 lg:grid lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-14 lg:pb-10">
          {/* texto */}
          <div className="order-2 lg:order-1">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Como funciona</p>
            <h2 className="mt-3 hidden font-display text-5xl leading-[1.02] tracking-tight lg:mt-5 lg:block lg:text-6xl">
              Três passos. <span className="italic">Nenhum</span> estresse a mais.
            </h2>

            <ol className="mt-6 lg:mt-10">
              {steps.map((s, i) => {
                const active = i === step;
                return (
                  <li
                    key={s.n}
                    className={`relative border-t border-line py-4 transition-all duration-500 lg:py-6 ${
                      active ? "" : "hidden lg:block"
                    }`}
                  >
                    <span
                      className={`absolute -top-px left-0 h-px bg-accent transition-all duration-700 ${
                        active ? "w-full" : "w-0"
                      }`}
                    />
                    <div className="flex gap-5">
                      <span
                        className={`font-display text-2xl italic transition-colors duration-500 ${
                          active ? "text-accent" : "text-muted/50"
                        }`}
                      >
                        {s.n}
                      </span>
                      <div>
                        <h3
                          className={`text-xl font-semibold tracking-tight transition-colors duration-500 sm:text-2xl ${
                            active ? "text-ink" : "text-muted/70"
                          }`}
                        >
                          {s.title}
                        </h3>
                        <div
                          className={`grid transition-all duration-500 ${
                            active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <p className="overflow-hidden pt-2 text-base leading-relaxed text-muted sm:text-[1.05rem]">
                            {s.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* cena */}
          <div className="relative order-1 h-[40vh] shrink-0 lg:order-2 lg:h-[calc(100vh-11rem)] lg:max-h-[640px] lg:min-h-[440px]">
            <div className="relative h-full overflow-hidden rounded-[2rem] bg-sand">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(70% 55% at 50% 72%, rgba(255,255,255,0.95), rgba(255,255,255,0) 72%)",
                }}
              />
              <TowScene mode="scroll" trackRef={track} onStep={setStep} className="absolute inset-0" />

              <div
                key={step}
                className="float-in absolute left-3 top-3 flex items-center gap-3 rounded-2xl border border-white bg-white/90 py-3 pl-3 pr-5 shadow-[0_18px_40px_-18px_rgba(21,24,29,0.35)] backdrop-blur sm:left-5 sm:top-5"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-white">
                  <Chip size={19} />
                </span>
                <div className="leading-tight">
                  <p className="text-[0.95rem] font-semibold">{chips[step].title}</p>
                  <p className="mt-0.5 text-sm text-muted">{chips[step].sub}</p>
                </div>
              </div>

              <div className="absolute bottom-3 right-3 hidden items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-muted backdrop-blur sm:flex sm:bottom-5 sm:right-5">
                <ShieldCheck size={16} className="text-ink" />
                Role a página para ver o resgate
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
