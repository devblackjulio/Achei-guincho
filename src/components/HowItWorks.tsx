import { useState } from "react";
import { Reveal, Label } from "./ui";
import { IconCheck } from "./Icons";
import LazyMount from "./LazyMount";
import RouteScene from "../three/RouteScene";

/**
 * "Como funciona" com demonstração 3D.
 *
 * O texto é o mesmo que já existia na página (quatro passos). O que mudou é
 * que ele passou a andar junto com uma maquete 3D: um guincho percorre a rota
 * até o veículo parado, e o passo destacado à esquerda acompanha a cena.
 *
 * Por que o 3D vale o peso do three.js aqui: o serviço é difícil de explicar
 * em texto ("o guincho se aproxima, você acompanha no mapa"). Uma maquete
 * mostra isso sem pedir que o visitante leia nada.
 *
 * A cena é decorativa do ponto de vista de acessibilidade (aria-hidden no
 * canvas) — quem usa leitor de tela lê apenas o texto dos passos, que é
 * completo por si só.
 */

const STEPS = [
  {
    n: "01",
    title: "Conte o que aconteceu",
    desc: "Dois toques: o tipo de socorro e o seu veículo. Se não souber explicar, mande uma foto ou ligue — a central resolve com você, sem robô enrolando.",
    scene: "Pedido registrado no ponto",
  },
  {
    n: "02",
    title: "Preço fechado na hora",
    desc: "O app calcula pela distância real até o parceiro mais próximo e mostra o valor final antes de você confirmar. Combinou, tá combinado.",
    scene: "Rota e valor calculados",
  },
  {
    n: "03",
    title: "Acompanhe em tempo real",
    desc: "Nome, foto e placa do guincheiro no seu celular. Mapa com GPS ao vivo, ETA atualizado e aviso quando ele estiver a menos de 500 metros.",
    scene: "Guincho a caminho",
  },
  {
    n: "04",
    title: "Pronto, siga viagem",
    desc: "Pagamento no app, no Pix ou na maquininha do guincheiro. Nota fiscal por e-mail e avaliação em uma estrela só — se merecer cinco, melhor ainda.",
    scene: "Chegou até você",
  },
];

export default function HowItWorks({
  onSceneReady,
  forceMount = false,
}: {
  onSceneReady?: () => void;
  /**
   * Monta a cena imediatamente, sem esperar a viewport.
   *
   * É usado durante o carregamento inicial: o preloader promete esperar as
   * cenas 3D ficarem prontas, e esta seção fica abaixo da dobra — com o
   * lazy padrão ela nunca avisaria "pronta" enquanto o overlay estivesse de
   * pé, e o progresso travaria em 50%.
   */
  forceMount?: boolean;
}) {
  const [step, setStep] = useState(0);

  return (
    <section id="como-funciona" className="scroll-mt-28 bg-paper py-16 sm:py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        {/* coluna de texto — fixa no scroll em telas grandes */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <Label className="text-mut">Como funciona</Label>
            <h2 className="mt-4 font-display text-[2.1rem] font-extrabold leading-[1.04] tracking-tight sm:text-4xl md:text-[3.4rem]">
              Do aperto ao alívio
              <br />
              em quatro passos.
            </h2>
            <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-ink2">
              Ninguém planeja ficar na beira da estrada. Por isso o pedido foi
              desenhado pra ser feito em menos de um minuto — com uma mão só, se
              for o caso.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-8 flex items-start gap-3 rounded-lg border-2 border-ink bg-ambersoft p-4 shadow-hard-sm">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border-2 border-ink bg-amber">
                <IconCheck className="h-4 w-4" />
              </span>
              <p className="text-sm leading-relaxed text-ink2">
                <strong className="font-semibold text-ink">
                  Preço fechado antes de confirmar.
                </strong>{" "}
                Sem taxa de chamada, sem “adicional de noite”, sem surpresa na
                hora de pagar.
              </p>
            </div>
          </Reveal>

          {/* Passos. O ativo é o que a maquete está encenando agora; os
              demais ficam esmaecidos para não competir com a cena. */}
          <ol className="mt-10 space-y-2">
            {STEPS.map((s, i) => {
              const active = step === i;
              return (
                <li
                  key={s.n}
                  className={`flex gap-4 rounded-lg border-2 p-4 transition-all duration-500 ${
                    active
                      ? "border-ink bg-paper shadow-hard-sm"
                      : "border-transparent opacity-50"
                  }`}
                >
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-md border-2 font-mono text-[11px] font-semibold transition-colors duration-500 ${
                      active
                        ? "border-ink bg-amber text-ink"
                        : "border-line bg-paper2 text-mut"
                    }`}
                  >
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold leading-tight tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-[0.93rem] leading-relaxed text-ink2">
                      {s.desc}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* maquete 3D */}
        <Reveal from="right">
          <div className="lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-lg border-2 border-ink bg-paper2 shadow-hard-lg">
              {/* O canvas só é criado quando a seção se aproxima da viewport:
                  a home já tem um WebGL no hero e dois contextos simultâneos
                  pesam no celular. O fundo listrado segura a área até lá. */}
              {forceMount ? (
                <RouteScene
                  className="h-[300px] w-full sm:h-[420px] lg:h-[560px]"
                  onStep={setStep}
                  onReady={onSceneReady}
                />
              ) : (
                <LazyMount
                  className="h-[300px] w-full sm:h-[420px] lg:h-[560px]"
                  fallback={
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-mut">
                        Carregando demonstração…
                      </span>
                    </div>
                  }
                >
                  <RouteScene
                    className="h-[300px] w-full sm:h-[420px] lg:h-[560px]"
                    onStep={setStep}
                    onReady={onSceneReady}
                  />
                </LazyMount>
              )}

              {/* legenda da etapa — sobre a cena, com o âmbar de sinalização */}
              <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-md border-2 border-ink bg-paper/95 px-3.5 py-2 shadow-hard-sm backdrop-blur-sm">
                <span className="h-2 w-2 shrink-0 rounded-full bg-amber" />
                <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink">
                  {STEPS[step].scene}
                </span>
              </div>

              {/* etiqueta do canto */}
              <div className="pointer-events-none absolute right-4 top-4 rounded-md border border-ink/25 bg-paper/80 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.16em] text-mut backdrop-blur-sm">
                Demonstração 3D
              </div>
            </div>

            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-mut">
              Simulação do atendimento · não é um pedido real
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
