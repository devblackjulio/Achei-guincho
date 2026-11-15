import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const links = [
  { href: "#servicos", label: "Serviços" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#pessoas", label: "Quem somos" },
  { href: "#parceiros", label: "Para prestadores" },
  { href: "#duvidas", label: "Dúvidas" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "border-b border-line bg-paper/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[0.95rem] font-medium text-muted transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#chamar"
            className="hidden rounded-full bg-ink px-5 py-2.5 text-[0.92rem] font-semibold text-white transition-colors hover:bg-accent sm:inline-block"
          >
            Chamar guincho
          </a>
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-line px-5 pb-6 pt-3 lg:hidden" aria-label="Mobile">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line py-3.5 text-lg font-medium"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#chamar"
            onClick={() => setOpen(false)}
            className="mt-5 block rounded-full bg-accent px-5 py-3.5 text-center font-semibold text-white"
          >
            Chamar guincho
          </a>
        </nav>
      )}
    </header>
  );
}
