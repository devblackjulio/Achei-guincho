import { createContext, useContext } from "react";

/**
 * Canal pelo qual as cenas 3D avisam que já desenharam o primeiro quadro.
 *
 * A tela de carregamento não pode ser um `setTimeout`: prometer "100%" e
 * destampar a página antes do WebGL compilar shaders e desenhar entrega
 * exatamente o que queríamos evitar — a página entrando pesada, com buracos
 * brancos onde ainda não há canvas.
 *
 * Então quem sabe que a cena ficou pronta é a cena. Cada uma chama
 * `reportReady()` uma única vez, no primeiro `renderer.render()`; o overlay
 * só sai quando todas as cenas registradas avisaram.
 */
type ReadyReporter = (id: string) => void;

export const SceneReadyContext = createContext<ReadyReporter>(() => {});

/** As chaves de todas as cenas que a home monta. O overlay espera todas. */
export const SCENE_IDS = ["hero", "rota"] as const;
export type SceneId = (typeof SCENE_IDS)[number];

export function useSceneReady(): ReadyReporter {
  return useContext(SceneReadyContext);
}
