import { useEffect, useRef, useState } from "react";

/**
 * Tela de carregamento da home.
 *
 * O site tem duas cenas WebGL. Sem esta tela, o visitante entra na página
 * enquanto o Three.js ainda compila shaders e desenha — no celular, isso
 * aparece como a página "pesada", travando a rolagem e mostrando buracos
 * onde o canvas ainda não existe.
 *
 * Como o progresso é calculado (nada de timer fingindo progresso):
 *   • 0 → 85  conforme as cenas 3D avisam que desenharam o primeiro quadro
 *             (é o passo realmente demorado);
 *   • 85 → 100 quando fontes e imagens terminam de carregar;
 *   • nunca destampa antes de um mínimo de tempo, para não piscar em
 *     conexões rápidas;
 *   • se algo falhar/estourar prazo, abre assim mesmo — preloader que
 *     trava a página é pior que página sem preloader.
 */
export default function Preloader({
  ready,
  totalScenes,
  onDone,
}: {
  /** Quantas cenas já avisaram que renderizaram. */
  ready: number;
  totalScenes: number;
  /** Chamado quando o overlay deve sair de cena. */
  onDone: () => void;
}) {
  const [pct, setPct] = useState(0);
  const [hiding, setHiding] = useState(false);
  const startedAt = useRef(performance.now());

  // Piso de tempo: evita o "flash" de um overlay que aparece e some em 80ms.
  const MIN_MS = 900;
  // Teto de tempo: se o 3D nunca avisar (contexto perdido, driver ruim),
  // a página abre de qualquer maneira.
  const MAX_MS = 9000;

  useEffect(() => {
    let raf = 0;
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      setPct(100);
      setHiding(true);
      // Espera a opacidade terminar antes de desmontar (220ms no CSS).
      setTimeout(onDone, 260);
    };

    const tick = () => {
      const elapsed = performance.now() - startedAt.current;
      const sceneRatio = totalScenes === 0 ? 1 : ready / totalScenes;

      // O que realmente falta além do 3D: fontes e imagens já em cache.
      const assetsDone =
        document.readyState === "complete" ||
        (document.fonts ? document.fonts.status === "loaded" : true);

      let target = sceneRatio * 85 + (assetsDone ? 15 : 0);
      if (elapsed > MAX_MS) target = 100;

      setPct((prev) => {
        // Sobe suave, mas nunca desce nem trava num número.
        const next = Math.max(prev, Math.min(100, target));
        return next > prev ? Math.min(next, prev + 8) : prev;
      });

      if (target >= 100 && elapsed >= MIN_MS) {
        finish();
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready, totalScenes, onDone]);

  // Trava a rolagem enquanto o overlay está de pé — senão o visitante
  // "rola" uma página que ainda não existe.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      className="preloader"
      data-hiding={hiding ? "true" : "false"}
      role="status"
      aria-live="polite"
      aria-label={`Carregando o site, ${Math.round(pct)} por cento`}
    >
      <div className="preloader-inner">
        <div className="preloader-mark" aria-hidden="true">
          {/* gancho, o mesmo desenho do logo */}
          <svg viewBox="0 0 64 64" className="h-11 w-11" fill="none">
            <path
              d="M32 14v18a11 11 0 1 0 22 0v-4"
              stroke="currentColor"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <circle cx="32" cy="9" r="5" stroke="currentColor" strokeWidth="5" />
          </svg>
        </div>

        <p className="preloader-brand">
          achei<span>guincho</span>
        </p>

        <div className="preloader-bar">
          <div
            className="preloader-fill"
            style={{ width: `${Math.round(pct)}%` }}
          />
        </div>

        <div className="preloader-meta">
          <span className="preloader-pct">{Math.round(pct)}%</span>
          <span className="preloader-note">
            {pct < 85 ? "Preparando a demonstração 3D" : "Quase pronto"}
          </span>
        </div>
      </div>
    </div>
  );
}
