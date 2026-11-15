import { useCallback, useState } from "react";
import Nav from "./components/Nav";
import Hero, { Ticker } from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Services from "./components/Services";
import Coverage from "./components/Coverage";
import Testimonials from "./components/Testimonials";
import Partners from "./components/Partners";
import AppPromo from "./components/AppPromo";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import PedidoModal from "./components/PedidoModal";
import Preloader from "./components/Preloader";
import { SCENE_IDS } from "./components/sceneReady";

const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E";

// Quantas cenas 3D precisam avisar "pronto" antes da página abrir.
const TOTAL_SCENES = SCENE_IDS.length;

export default function App() {
  const [sos, setSos] = useState(false);
  const openSOS = () => setSos(true);

  // Carregamento: o overlay fica até as duas cenas 3D desenharem o primeiro
  // quadro (ver Preloader). Guardamos um Set para não contar a mesma cena
  // duas vezes (o React em StrictMode roda efeitos em dobro em dev).
  const [readyScenes, setReadyScenes] = useState<Set<string>>(new Set());
  const [booting, setBooting] = useState(true);

  const markSceneReady = useCallback((id: string) => {
    setReadyScenes((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const heroReady = useCallback(() => markSceneReady("hero"), [markSceneReady]);
  const routeReady = useCallback(() => markSceneReady("rota"), [markSceneReady]);
  const finishBoot = useCallback(() => setBooting(false), []);

  return (
    <div className="relative min-h-screen bg-paper text-ink">
      {/* textura de papel */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] opacity-[0.05] mix-blend-multiply"
        style={{ backgroundImage: `url("${NOISE}")` }}
      />

      <Nav onSOS={openSOS} />
      <main>
        <Hero onSOS={openSOS} onSceneReady={heroReady} />
        <Ticker />
        {/* Durante o carregamento a maquete é montada mesmo abaixo da dobra,
            para conseguir avisar "pronto". Depois volta ao lazy normal. */}
        <HowItWorks onSceneReady={routeReady} forceMount={booting} />
        <Services onSOS={openSOS} />
        <Coverage />
        <Testimonials />
        <Partners />
        <AppPromo onSOS={openSOS} />
        <Faq />
      </main>
      <Footer onSOS={openSOS} />
      <PedidoModal open={sos} onClose={() => setSos(false)} />

      {booting && (
        <Preloader
          ready={readyScenes.size}
          totalScenes={TOTAL_SCENES}
          onDone={finishBoot}
        />
      )}
    </div>
  );
}
