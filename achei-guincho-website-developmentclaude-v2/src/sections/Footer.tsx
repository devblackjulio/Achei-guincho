import { ArrowRight } from "lucide-react";
import Logo from "../components/Logo";
import Reveal from "../components/Reveal";

export default function Footer() {
  return (
    <footer id="chamar-agora" className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8 lg:pt-28">
        <Reveal>
          <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
            <h2 className="font-display text-[3.2rem] leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl">
              Precisando agora? <span className="italic text-accent">Estamos aqui.</span>
            </h2>
            <div>
              <p className="max-w-sm text-lg leading-relaxed text-white/65">
                Abra o aplicativo, conte o que houve e receba ofertas de profissionais por perto em instantes.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#top"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 font-semibold transition-colors hover:bg-accent-dark"
                >
                  Chamar um guincho
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#parceiros"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-4 font-semibold transition-colors hover:border-white"
                >
                  Sou prestador
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="text-white">
              <Logo />
            </div>
            <p className="mt-4 max-w-xs leading-relaxed text-white/55">
              Socorro de estrada de gente para gente. Em todo o Brasil, a qualquer hora.
            </p>
          </div>
          <FooterCol
            title="Plataforma"
            items={[
              ["Serviços", "#servicos"],
              ["Como funciona", "#como-funciona"],
              ["Quem somos", "#pessoas"],
            ]}
          />
          <FooterCol
            title="Prestadores"
            items={[
              ["Seja parceiro", "#parceiros"],
              ["Dúvidas frequentes", "#duvidas"],
            ]}
          />
          <FooterCol
            title="Contato"
            items={[
              ["contato@acheiguincho.com.br", "mailto:contato@acheiguincho.com.br"],
              ["Atendimento 24h", "#top"],
            ]}
          />
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/45 sm:flex-row">
          <p>© 2026 Achei Guincho. Todos os direitos reservados.</p>
          <p>
            Fotos por{" "}
            <a className="underline underline-offset-2 hover:text-white" href="https://www.pexels.com" target="_blank" rel="noreferrer">
              Pexels
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/40">{title}</p>
      <ul className="mt-4 space-y-3">
        {items.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="text-white/80 transition-colors hover:text-accent">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
