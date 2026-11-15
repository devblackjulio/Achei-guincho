import { useState } from "react";
import { Label, Reveal } from "./ui";
import { FAQS, PHONE, PHONE_HREF } from "../lib/data";
import { IconPlus, IconPhone } from "./Icons";

export default function Faq() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" className="scroll-mt-28 border-t-2 border-ink bg-paper2 py-16 sm:py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <Label className="text-mut">Dúvidas de beira de estrada</Label>
            <h2 className="mt-4 font-display text-[2.1rem] font-extrabold leading-[1.04] tracking-tight sm:text-4xl md:text-[3.4rem]">
              Pergunta que todo mundo faz antes de confiar.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-ink2">
              Se a sua dúvida não estiver aqui, a central responde 24 horas — por telefone,
              WhatsApp ou chat. Gente de verdade, do outro lado.
            </p>
            <a
              href={PHONE_HREF}
              className="mt-7 inline-flex items-center gap-3 rounded-lg border-2 border-ink bg-paper px-5 py-3.5 font-mono text-sm font-semibold shadow-hard-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-ambersoft"
            >
              <span className="grid h-8 w-8 place-items-center rounded-md border-2 border-ink bg-amber">
                <IconPhone className="h-4 w-4" />
              </span>
              {PHONE}
            </a>
          </Reveal>
        </div>

        <div>
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={Math.min(i * 60, 300)}>
              <div className="border-t border-line last:border-b">
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-center justify-between gap-6 py-5.5 text-left"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] font-medium text-mut">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display text-lg font-bold tracking-tight transition-colors md:text-[1.3rem] ${
                        open === i ? "text-amber2" : ""
                      }`}
                    >
                      {f.q}
                    </span>
                  </span>
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border-2 border-ink transition-all duration-300 ${
                      open === i ? "rotate-45 bg-amber" : "bg-paper"
                    }`}
                  >
                    <IconPlus className="h-4 w-4" />
                  </span>
                </button>
                <div className={`acc-panel ${open === i ? "open" : ""}`}>
                  <div>
                    <p className="max-w-2xl pb-6 pl-9 leading-relaxed text-ink2">{f.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
