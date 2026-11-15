import { Reveal } from "./ui";
import {
  IconHook,
  IconPhone,
  IconInstagram,
  IconYoutube,
  IconX,
  IconPin,
} from "./Icons";
import { PHONE, PHONE_HREF } from "../lib/data";

const COLS = [
  {
    title: "Plataforma",
    links: ["Como funciona", "Aplicativo", "Cobertura", "Preços", "Central 24h"],
    hrefs: ["/#como-funciona", "/#app", "/#cobertura", "/#servicos", "/#faq"],
  },
  {
    title: "Serviços",
    links: ["Guincho leve", "Guincho pesado", "Socorro moto", "Pane seca", "Chaveiro auto"],
    hrefs: ["/#servicos", "/#servicos", "/#servicos", "/#servicos", "/#servicos"],
  },
  {
    title: "Empresa",
    links: ["Sobre nós", "Seja um parceiro", "Imprensa", "Trabalhe conosco", "Contato"],
    hrefs: ["/#topo", "/#parceiros", "/#topo", "/#parceiros", "#contato"],
  },
];

function FinalCta({ onSOS }: { onSOS: () => void }) {
  return (
    <section className="border-y-2 border-ink bg-amber py-20 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-10 px-6">
        <Reveal>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink/70">
            Salve este número, torça pra nunca usar
          </p>
          <h2 className="mt-3 font-display text-[clamp(2.6rem,6vw,4.6rem)] font-extrabold leading-[0.96] tracking-tight">
            Precisou, chamou.
            <br />
            Chegou.
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <div className="flex flex-col items-start gap-4">
            <button
              onClick={onSOS}
              className="inline-flex items-center gap-3 rounded-lg border-2 border-ink bg-ink px-8 py-5 font-display text-xl font-bold text-amber shadow-[0.4rem_0.4rem_0_0_rgba(28,27,22,0.25)] transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
            >
              <span className="sos-ring h-3 w-3 rounded-full bg-amber" />
              Pedir socorro
            </button>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2.5 font-mono text-lg font-semibold tracking-wide hover:underline decoration-2 underline-offset-4"
            >
              <IconPhone className="h-5 w-5" />
              {PHONE}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Footer({ onSOS }: { onSOS: () => void }) {
  return (
    <>
      <FinalCta onSOS={onSOS} />
      <footer id="contato" className="scroll-mt-28 bg-ink pb-8 pt-16 text-paper">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
            <div>
              <a href="/#topo" className="flex items-center gap-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-lg border-2 border-amber bg-amber text-ink">
                  <IconHook className="h-5.5 w-5.5" />
                </span>
                <span className="font-display text-[1.35rem] font-extrabold tracking-tight">
                  achei<span className="text-amber">guincho</span>
                </span>
              </a>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/60">
                A plataforma brasileira que conecta quem ficou na mão a quem sabe resolver — com
                preço honesto, gente educada e pressa na medida certa.
              </p>
              <div className="mt-6 flex items-center gap-3">
                {[
                  { icon: <IconInstagram />, label: "Instagram" },
                  { icon: <IconX />, label: "X / Twitter" },
                  { icon: <IconYoutube />, label: "YouTube" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href="/#topo"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-lg border border-paper/25 text-paper/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber hover:text-amber"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
              <p className="mt-6 flex items-center gap-2 font-mono text-[11px] tracking-wider text-paper/50">
                <IconPin className="h-4 w-4 text-amber" />
                Atendimento em todo o Brasil · 24 horas
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {COLS.map((c) => (
                <div key={c.title}>
                  <h3 className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-amber">
                    {c.title}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {c.links.map((l, i) => (
                      <li key={l}>
                        <a
                          href={c.hrefs[i]}
                          className="text-sm text-paper/65 transition-colors hover:text-paper"
                        >
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div>
                <h3 className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-amber">
                  Emergência
                </h3>
                <a
                  href={PHONE_HREF}
                  className="mt-4 block font-display text-2xl font-extrabold text-paper hover:text-amber"
                >
                  {PHONE}
                </a>
                <p className="mt-2 font-mono text-[10px] leading-relaxed tracking-wider text-paper/50">
                  24 HORAS · 7 DIAS
                  <br />
                  LIGAÇÃO GRATUITA
                </p>
              </div>
            </div>
          </div>

          {/* wordmark gigante */}
          <p
            aria-hidden="true"
            className="text-outline-paper mt-14 select-none text-center font-display text-[clamp(3rem,11vw,9rem)] font-extrabold leading-none tracking-tight"
          >
            acheiguincho
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-6 font-mono text-[10px] tracking-[0.12em] text-paper/45">
            {/* Sem CNPJ inventado: enquanto a razão social não for
                confirmada pela empresa, o rodapé não afirma nada. */}
            <p>© {new Date().getFullYear()} ACHEI GUINCHO · TODOS OS DIREITOS RESERVADOS</p>
            {/* As três páginas da Play e da LGPD — as MESMAS URLs
                cadastradas no Console, para não quebrar o link. */}
            <div className="flex gap-6">
              <a href="termos.html" className="hover:text-amber">TERMOS DE USO</a>
              <a href="privacidade.html" className="hover:text-amber">PRIVACIDADE</a>
              <a href="exclusao-de-conta.html" className="hover:text-amber">EXCLUIR CONTA</a>
            </div>
            <p className="flex items-center gap-2">
              FEITO NO BRASIL <span className="inline-block h-2 w-2 rotate-45 bg-amber" />
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
