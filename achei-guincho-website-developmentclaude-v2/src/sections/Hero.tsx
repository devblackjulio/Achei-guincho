import { ArrowRight, Check, Star } from "lucide-react";
import TowScene from "../components/TowScene";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[4.5rem]">
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10 lg:pb-24 lg:pt-14">
        <div className="relative z-10">
          <div className="float-in inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Atendimento 24 horas, todos os dias
          </div>

          <h1
            className="float-in mt-7 font-display text-[3.3rem] leading-[0.98] tracking-tight sm:text-[4.6rem] lg:text-[5.4rem]"
            style={{ animationDelay: "80ms" }}
          >
            Ficou na estrada?
            <br />
            <span className="italic text-accent">Alguém</span> já pode estar a caminho.
          </h1>

          <p
            className="float-in mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
            style={{ animationDelay: "160ms" }}
          >
            O Achei Guincho conecta você a guincheiros e profissionais de socorro da sua região. Você vê o preço, o
            tempo de chegada e quem vai te atender — antes de confirmar.
          </p>

          <div className="float-in mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "240ms" }} id="chamar">
            <a
              href="#chamar-agora"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-semibold text-white shadow-[0_10px_30px_-10px_rgba(238,90,36,0.6)] transition-all hover:bg-accent-dark hover:shadow-[0_14px_34px_-10px_rgba(238,90,36,0.7)]"
            >
              Chamar um guincho
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center rounded-full border border-ink/15 bg-white px-7 py-4 text-base font-semibold transition-colors hover:border-ink"
            >
              Ver como funciona
            </a>
          </div>

          <ul
            className="float-in mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[0.95rem] font-medium"
            style={{ animationDelay: "320ms" }}
          >
            {["Preço combinado antes", "Profissionais verificados", "Acompanhe no mapa"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-ink text-white">
                  <Check size={12} strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* cena 3D */}
        <div className="relative">
          <div className="relative h-[360px] overflow-hidden rounded-[2rem] bg-sand sm:h-[460px] lg:h-[580px]">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 50% at 50% 75%, rgba(255,255,255,0.9), rgba(255,255,255,0) 70%)",
              }}
            />
            <TowScene mode="hero" className="absolute inset-0" />

            <div
              className="float-in absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl border border-white bg-white/90 p-3.5 shadow-[0_18px_40px_-18px_rgba(21,24,29,0.35)] backdrop-blur sm:right-auto sm:w-[19rem]"
              style={{ animationDelay: "1.6s" }}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink font-display text-xl text-white">
                C
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate text-[0.95rem] font-semibold">Carlos está a caminho</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                  <Star size={13} className="fill-accent text-accent" /> 4,9 · guincho plataforma
                </p>
              </div>
              <div className="text-right leading-tight">
                <p className="text-lg font-bold">12 min</p>
                <p className="text-xs text-muted">até você</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
