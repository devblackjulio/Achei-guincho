import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "../components/Reveal";

const faqs = [
  {
    q: "Quanto custa chamar um guincho?",
    a: "Depende da distância e do tipo de serviço. Você recebe o valor de cada profissional antes de confirmar, então só aceita se fizer sentido para você. Não existe taxa escondida.",
  },
  {
    q: "Em quanto tempo o socorro chega?",
    a: "Depende de onde você está e de quem estiver por perto. Na tela você vê o tempo estimado de cada profissional e acompanha o trajeto até a sua localização.",
  },
  {
    q: "Preciso ter um seguro ou assinar um plano?",
    a: "Não. O Achei Guincho funciona por chamado: pediu, usou, pagou. Se você já tem seguro, pode usar a plataforma quando preferir um atendimento mais ágil.",
  },
  {
    q: "Como vocês escolhem os prestadores?",
    a: "Cada profissional passa por conferência de documentos, do veículo e de antecedentes. Depois disso, as avaliações dos clientes ajudam a manter o padrão alto.",
  },
  {
    q: "Atendem em rodovias e cidades pequenas?",
    a: "Atendemos onde houver prestadores cadastrados. A rede cresce a cada semana, e se não houver ninguém por perto, você é avisado na hora, sem enrolação.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="duvidas" className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:pb-32">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Dúvidas</p>
          <h2 className="mt-5 font-display text-5xl leading-[1.02] tracking-tight sm:text-6xl">
            Perguntas que todo mundo <span className="italic">faz</span>.
          </h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
            Não achou o que procurava? Escreva para a gente em contato@acheiguincho.com.br e uma pessoa responde.
          </p>
        </Reveal>

        <div className="border-t border-line">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-line">
                <button
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="text-xl font-semibold tracking-tight sm:text-[1.35rem]">{f.q}</span>
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                      isOpen ? "rotate-45 border-accent bg-accent text-white" : "border-line bg-white"
                    }`}
                  >
                    <Plus size={18} />
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <p className="overflow-hidden pr-14 text-[1.05rem] leading-relaxed text-muted">
                    <span className="block pb-6">{f.a}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
