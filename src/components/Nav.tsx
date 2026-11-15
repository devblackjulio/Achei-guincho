import { useEffect, useState } from "react";
import { IconHook, IconMenu, IconClose, IconPhone } from "./Icons";
import { PHONE, PHONE_HREF } from "../lib/data";

// Âncoras com "/" na frente de propósito: o mesmo nav aparece na home e nas
// páginas legais (/privacidade.html etc), onde essas seções não existem. Com
// "/#servicos" o clique leva à home no trecho certo em vez de virar link
// morto; na própria home o navegador só rola.
const LINKS = [
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/#cobertura", label: "Cobertura" },
  { href: "/#parceiros", label: "Parceiros" },
  { href: "/#faq", label: "Dúvidas" },
];

export default function Nav({ onSOS }: { onSOS: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(id);
    };
  }, []);

  const clock = now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* barra de status */}
      <div className="hidden border-b border-ink/40 bg-ink text-paper md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 font-mono text-[10.5px] tracking-[0.14em]">
          <p>
            CENTRAL 24H · <a href={PHONE_HREF} className="underline decoration-amber underline-offset-2 hover:text-amber">{PHONE}</a>
          </p>
          <p className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <span className="blink-dot inline-block h-1.5 w-1.5 rounded-full bg-[#59c98a]" />
              REDE ATIVA · ATENDIMENTO 24H
            </span>
            <span className="text-paper/60">SÃO PAULO {clock}</span>
          </p>
        </div>
      </div>

      {/* navegação principal */}
      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-line bg-paper/90 shadow-[0_2px_20px_rgba(28,27,22,0.07)] backdrop-blur-md"
            : "border-transparent bg-paper/0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <a href="/#topo" className="group flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-lg border-2 border-ink bg-amber text-ink shadow-hard-sm transition-transform duration-300 group-hover:-rotate-6">
              <IconHook className="h-5.5 w-5.5" />
            </span>
            <span className="font-display text-[1.35rem] font-extrabold leading-none tracking-tight">
              achei<span className="text-amber2">guincho</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink2 transition-colors hover:text-ink after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-amber after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={PHONE_HREF}
              aria-label={`Ligar para ${PHONE}`}
              className="hidden h-10 w-10 place-items-center rounded-lg border-2 border-ink bg-paper text-ink transition-all duration-200 hover:bg-ink hover:text-amber sm:grid"
            >
              <IconPhone className="h-4.5 w-4.5" />
            </a>
            <button
              onClick={onSOS}
              className="hidden rounded-lg border-2 border-ink bg-amber px-5 py-2.5 font-display text-[0.95rem] font-bold text-ink shadow-hard transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none sm:block"
            >
              Pedir socorro
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="grid h-10 w-10 place-items-center rounded-lg border-2 border-ink bg-paper lg:hidden"
            >
              {open ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>

        {/* menu mobile */}
        <div
          className={`overflow-hidden border-ink bg-paper transition-all duration-300 lg:hidden ${
            open ? "max-h-96 border-t" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col px-6 py-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3.5 font-display text-lg font-bold hover:text-amber2"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                onSOS();
              }}
              className="mt-4 rounded-lg border-2 border-ink bg-amber py-3 font-display font-bold shadow-hard"
            >
              Pedir socorro agora
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
