import { BatteryCharging, Fuel, KeyRound, Truck, Wrench, CircleDashed } from "lucide-react";
import Reveal from "../components/Reveal";

const services = [
  {
    icon: Truck,
    title: "Guincho e reboque",
    text: "Plataforma, asa-delta ou reboque leve. Carro, moto e utilitário levados com cuidado até a oficina ou até a sua casa.",
  },
  {
    icon: CircleDashed,
    title: "Troca de pneu",
    text: "Pneu furado ou estourado? Um profissional troca no local, com o seu estepe, sem você sujar as mãos.",
  },
  {
    icon: BatteryCharging,
    title: "Bateria arriada",
    text: "Chupeta ou troca de bateria no lugar onde você parou. Em muitos casos, em menos de meia hora.",
  },
  {
    icon: Fuel,
    title: "Pane seca",
    text: "Acabou o combustível longe do posto? Levamos o suficiente para você chegar ao próximo.",
  },
  {
    icon: KeyRound,
    title: "Chaveiro automotivo",
    text: "Chave trancada dentro do carro ou perdida. Abertura sem danos e cópia de chave no local.",
  },
  {
    icon: Wrench,
    title: "Mecânico socorrista",
    text: "Problemas simples resolvidos ali mesmo. Se não der, o guincho já vai no mesmo chamado.",
  },
];

export default function Services() {
  return (
    <section id="servicos" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">O que resolvemos</p>
            <h2 className="mt-5 font-display text-5xl leading-[1.02] tracking-tight sm:text-6xl">
              Quando a situação aperta, a gente <span className="italic">resolve</span>.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Um problema na estrada nunca vem avisando. Por isso reunimos num só lugar os profissionais que você
              precisaria ligar, um por um, naquela hora.
            </p>
          </Reveal>
        </div>

        <ul className="border-t border-line">
          {services.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 40}>
                <div className="group flex items-start gap-5 border-b border-line py-7 transition-colors sm:gap-7 sm:py-9">
                  <span className="mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line bg-white text-ink transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                    <s.icon size={21} strokeWidth={1.8} />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-3xl tracking-tight sm:text-[2.2rem]">{s.title}</h3>
                    <p className="mt-2 max-w-xl text-[1.02rem] leading-relaxed text-muted">{s.text}</p>
                  </div>
                  <span className="hidden pt-3 font-display text-xl italic text-muted/60 sm:block">
                    0{i + 1}
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
