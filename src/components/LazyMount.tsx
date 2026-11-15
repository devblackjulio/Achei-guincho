import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Só monta o filho quando ele chega perto da viewport.
 *
 * Motivo: a home já tem um canvas WebGL no hero. Um segundo
 * WebGLRenderer criado no carregamento significa dois contextos GPU vivos
 * ao mesmo tempo — pesado em celular e desnecessário, já que esta seção fica
 * muito abaixo da dobra. Aqui o contexto só nasce quando o bloco se aproxima,
 * e o `fallback` segura o layout até lá (mesma altura, sem salto visual).
 *
 * `once` é o padrão: depois de montado, o componente não é desmontado ao
 * sair da tela — desmontar e remontar WebGL a cada rolagem sairia caro.
 */
export default function LazyMount({
  children,
  fallback,
  className = "",
  rootMargin = "300px",
}: {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || mounted) return;

    // Sem IntersectionObserver (navegador antigo), monta e segue.
    if (typeof IntersectionObserver === "undefined") {
      setMounted(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mounted, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {mounted ? children : fallback}
    </div>
  );
}
