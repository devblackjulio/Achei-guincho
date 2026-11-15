import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

type Props = {
  mode: "hero" | "scroll";
  /** Elemento "pista" cujo scroll controla a animação (modo scroll) */
  trackRef?: RefObject<HTMLElement | null>;
  onStep?: (step: number) => void;
  className?: string;
};

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const smooth = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

const COLORS = {
  accent: 0xee5a24,
  graphite: 0x252930,
  bed: 0xdcd8cf,
  tire: 0x1c1e22,
  rim: 0xc4c8cd,
  glass: 0x2d343c,
  carBody: 0x3b4048,
  carGlass: 0xaeb6bd,
  white: 0xfaf8f4,
};

function makeLabelTexture(text: string) {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 256;
  const g = c.getContext("2d")!;
  const draw = () => {
    g.clearRect(0, 0, c.width, c.height);
    g.fillStyle = "#ffffff";
    g.font = "700 150px 'Hanken Grotesk', Arial, sans-serif";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText(text, c.width / 2, c.height / 2 + 6);
  };
  draw();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  // redesenha quando a fonte do site terminar de carregar
  document.fonts
    ?.load("700 150px 'Hanken Grotesk'")
    .then(() => {
      draw();
      tex.needsUpdate = true;
    })
    .catch(() => {});
  return tex;
}

function buildWorld(mode: "hero" | "scroll") {
  const root = new THREE.Group();

  const mat = (color: number, rough = 0.55, metal = 0.05) =>
    new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal });

  const mAccent = mat(COLORS.accent, 0.45, 0.1);
  const mGraphite = mat(COLORS.graphite, 0.6, 0.2);
  const mBed = mat(COLORS.bed, 0.7, 0.05);
  const mTire = mat(COLORS.tire, 0.9, 0);
  const mRim = mat(COLORS.rim, 0.35, 0.7);
  const mGlass = mat(COLORS.glass, 0.15, 0.4);
  const mCar = mat(COLORS.carBody, 0.4, 0.3);
  const mCarGlass = mat(COLORS.carGlass, 0.15, 0.3);
  const mLight = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xfff2d6,
    emissiveIntensity: 1.2,
  });
  const mBeacon = new THREE.MeshStandardMaterial({
    color: 0xffb27a,
    emissive: 0xff7a2e,
    emissiveIntensity: 1,
    roughness: 0.3,
  });

  const rbox = (
    parent: THREE.Object3D,
    w: number,
    h: number,
    d: number,
    r: number,
    m: THREE.Material,
    x: number,
    y: number,
    z: number
  ) => {
    const mesh = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, r), m);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  };
  const box = (
    parent: THREE.Object3D,
    w: number,
    h: number,
    d: number,
    m: THREE.Material,
    x: number,
    y: number,
    z: number
  ) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  };

  const makeWheel = (radius: number, width: number, boltCount: number) => {
    const holder = new THREE.Group();
    const spinner = new THREE.Group();
    holder.add(spinner);
    const tireGeo = new THREE.CylinderGeometry(radius, radius, width, 32);
    tireGeo.rotateX(Math.PI / 2);
    const tire = new THREE.Mesh(tireGeo, mTire);
    tire.castShadow = true;
    spinner.add(tire);
    const rimGeo = new THREE.CylinderGeometry(radius * 0.58, radius * 0.58, width + 0.03, 24);
    rimGeo.rotateX(Math.PI / 2);
    spinner.add(new THREE.Mesh(rimGeo, mRim));
    for (let i = 0; i < boltCount; i++) {
      const a = (i / boltCount) * Math.PI * 2;
      for (const side of [1, -1]) {
        const b = new THREE.Mesh(
          new THREE.BoxGeometry(radius * 0.12, radius * 0.12, 0.03),
          mGraphite
        );
        b.position.set(
          Math.cos(a) * radius * 0.34,
          Math.sin(a) * radius * 0.34,
          side * (width / 2 + 0.03)
        );
        spinner.add(b);
      }
    }
    return { holder, spinner };
  };

  /* ───────────── Caminhão ───────────── */
  const truck = new THREE.Group();
  root.add(truck);

  // chassi
  box(truck, 6.3, 0.22, 1.5, mGraphite, 0.1, 0.84, 0);
  // para-lamas / caixas de roda
  for (const wx of [-2.0, -0.9]) {
    for (const z of [1, -1]) rbox(truck, 1.1, 0.12, 0.42, 0.05, mGraphite, wx, 1.02, z * 0.87);
  }

  // cabine
  rbox(truck, 1.3, 1.5, 2.0, 0.14, mAccent, 2.2, 1.7, 0);
  // capô
  rbox(truck, 0.85, 0.85, 1.95, 0.12, mAccent, 3.2, 1.4, 0);
  // vidros
  const ws = box(truck, 0.06, 0.58, 1.72, mGlass, 2.855, 2.13, 0);
  ws.rotation.z = -0.16;
  box(truck, 0.95, 0.56, 2.02, mGlass, 2.12, 2.12, 0);
  // teto + sirene
  rbox(truck, 1.4, 0.08, 2.05, 0.04, mGraphite, 2.2, 2.47, 0);
  const beacon = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.15, 0.14, 20), mBeacon);
  beacon.position.set(2.0, 2.6, 0);
  truck.add(beacon);
  // pára-choque e faróis
  rbox(truck, 0.22, 0.26, 2.08, 0.06, mGraphite, 3.7, 0.98, 0);
  for (const z of [1, -1]) {
    box(truck, 0.05, 0.2, 0.36, mLight, 3.64, 1.4, z * 0.7);
  }
  // grade
  box(truck, 0.04, 0.3, 0.9, mGraphite, 3.63, 1.18, 0);
  // retrovisores
  for (const z of [1, -1]) {
    box(truck, 0.1, 0.3, 0.06, mGraphite, 2.78, 2.0, z * 1.12);
  }
  // logo na porta
  const labelTex = makeLabelTexture("achei guincho");
  const labelMat = new THREE.MeshBasicMaterial({ map: labelTex, transparent: true });
  for (const side of [1, -1]) {
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.275), labelMat);
    plane.position.set(2.2, 1.35, side * 1.011);
    if (side < 0) plane.rotation.y = Math.PI;
    truck.add(plane);
  }

  // rodas
  const truckWheels: THREE.Group[] = [];
  for (const wx of [2.85, -0.9, -2.0]) {
    for (const z of [1, -1]) {
      const { holder, spinner } = makeWheel(0.5, 0.36, 5);
      holder.position.set(wx, 0.5, z * 0.92);
      truck.add(holder);
      truckWheels.push(spinner);
    }
  }

  // plataforma (basculante)
  const bed = new THREE.Group();
  truck.add(bed);
  rbox(bed, 4.3, 0.18, 2.1, 0.05, mBed, 2.05, 0.09, 0);
  // frisos laterais
  for (const z of [1, -1]) {
    box(bed, 4.3, 0.1, 0.06, mAccent, 2.05, 0.2, z * 1.04);
    box(bed, 4.3, 0.2, 0.05, mGraphite, 2.05, -0.1, z * 0.9);
  }
  // cabeceira
  rbox(bed, 0.16, 0.95, 2.05, 0.05, mAccent, 4.12, 0.62, 0);
  box(bed, 0.18, 0.1, 1.6, mGraphite, 4.12, 1.0, 0);
  // listras de marcação traseira
  for (let i = 0; i < 6; i++) {
    box(bed, 0.12, 0.012, 0.3, i % 2 ? mGraphite : mAccent, -0.04, 0.19, -0.75 + i * 0.3);
  }
  // sub-estrutura fixa (trilhos)
  for (const z of [0.55, -0.55]) box(truck, 5.2, 0.1, 0.16, mGraphite, -0.1, 0.99, z);

  /* ───────────── Carro ───────────── */
  const car = new THREE.Group();
  root.add(car);
  rbox(car, 3.4, 0.5, 1.6, 0.16, mCar, 0, 0.55, 0);
  rbox(car, 1.8, 0.45, 1.4, 0.16, mCar, -0.2, 0.98, 0);
  box(car, 1.7, 0.28, 1.43, mCarGlass, -0.2, 1.0, 0);
  rbox(car, 1.5, 0.08, 1.3, 0.04, mCar, -0.2, 1.24, 0);
  for (const z of [1, -1]) {
    box(car, 0.04, 0.1, 0.3, mLight, 1.7, 0.6, z * 0.55);
    box(car, 0.04, 0.1, 0.3, mBeacon, -1.7, 0.62, z * 0.55);
  }
  const carWheels: THREE.Group[] = [];
  for (const wx of [1.1, -1.1]) {
    for (const z of [1, -1]) {
      const { holder, spinner } = makeWheel(0.32, 0.24, 5);
      holder.position.set(wx, 0.32, z * 0.76);
      car.add(holder);
      carWheels.push(spinner);
    }
  }

  /* ───────────── Cabo do guincho ───────────── */
  const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1, 8), mGraphite);
  cable.castShadow = true;
  root.add(cable);

  /* ───────────── Cones ───────────── */
  const cones = new THREE.Group();
  const conePositions: [number, number][] = [
    [-9.6, 2.4],
    [-10.5, 1.1],
    [-11.2, -0.3],
  ];
  for (const [cx, cz] of conePositions) {
    const g = new THREE.Group();
    const base = new THREE.Mesh(new RoundedBoxGeometry(0.55, 0.06, 0.55, 2, 0.02), mGraphite);
    base.position.y = 0.03;
    base.castShadow = true;
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.75, 20), mAccent);
    cone.position.y = 0.06 + 0.375;
    cone.castShadow = true;
    const stripe = new THREE.Mesh(new THREE.CylinderGeometry(0.135, 0.165, 0.1, 20), mat(COLORS.white, 0.6, 0));
    stripe.position.y = 0.06 + 0.27;
    g.add(base, cone, stripe);
    g.position.set(cx, 0, cz);
    cones.add(g);
  }
  cones.visible = mode === "scroll";
  root.add(cones);

  /* ───────────── Animação ───────────── */
  const LOAD_START = 0.4;
  const LOAD_END = 0.75;
  const S_START = -3.4;
  const S_END = 2.2;
  const MAX_TILT = 0.32;

  const tmpA = new THREE.Vector3();
  const tmpB = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);

  /** p: 0→1 progresso da sequência; extraX: deslocamento extra (intro do hero) */
  const update = (p: number, time: number, extraX = 0) => {
    const drive = (1 - smooth(0, 0.2, p)) * 14;
    const truckX = drive + extraX;
    const t = smooth(0.2, 0.4, p) - smooth(0.75, 0.9, p);
    const theta = MAX_TILT * t;

    truck.position.x = truckX;
    truck.position.y = Math.sin(time * 2.2) * 0.004 * (drive > 0.01 || extraX !== 0 ? 1 : 0.4);
    for (const w of truckWheels) w.rotation.z = -truckX / 0.5;

    const px = -2.8 - 0.8 * t;
    const py = 1.0 - 0.8 * t;
    bed.position.set(px, py, 0);
    bed.rotation.z = theta;

    // carro
    const loadK = smooth(LOAD_START, LOAD_END, p);
    const s = S_START + (S_END - S_START) * loadK;
    const pxw = px + truckX;
    let cx: number, cy: number, cr: number;
    if (p < LOAD_START) {
      cx = -3.6 + S_START * Math.cos(MAX_TILT) - 0.18 * Math.sin(MAX_TILT);
      cy = 0;
      cr = 0;
    } else {
      cx = pxw + s * Math.cos(theta) - 0.18 * Math.sin(theta);
      cy = Math.max(0, py + s * Math.sin(theta) + 0.18 * Math.cos(theta));
      cr = theta * smooth(-1.8, 0.2, s);
    }
    car.position.set(cx, cy, 0);
    car.rotation.z = cr;
    for (const w of carWheels) w.rotation.z = -cx / 0.32;

    // cabo
    const showCable = t > 0.25 || p > LOAD_END;
    cable.visible = showCable;
    if (showCable) {
      tmpA.set(4.05, 0.5, 0).applyEuler(new THREE.Euler(0, 0, theta)).add(new THREE.Vector3(pxw, py, 0));
      tmpB.set(1.7, 0.42, 0).applyEuler(new THREE.Euler(0, 0, cr)).add(new THREE.Vector3(cx, cy, 0));
      const dir = tmpB.clone().sub(tmpA);
      const len = dir.length();
      cable.position.copy(tmpA).addScaledVector(dir, 0.5);
      cable.scale.set(1, len, 1);
      cable.quaternion.setFromUnitVectors(up, dir.normalize());
    }

    // sirene pulsando
    const pulse = 0.5 + 0.5 * Math.sin(time * 5);
    mBeacon.emissiveIntensity = 0.4 + pulse * 1.6;
  };

  const dispose = () => {
    root.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.geometry) m.geometry.dispose();
    });
    [mAccent, mGraphite, mBed, mTire, mRim, mGlass, mCar, mCarGlass, mLight, mBeacon, labelMat].forEach((x) => x.dispose());
    labelTex.dispose();
  };

  return { root, update, dispose };
}

export default function TowScene({ mode, trackRef, onStep, className }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const onStepRef = useRef(onStep);
  onStepRef.current = onStep;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    scene.environmentIntensity = 0.75;

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 200);

    const hemi = new THREE.HemisphereLight(0xffffff, 0xe9e2d3, 0.55);
    scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xfff6ea, 2.3);
    const shadowSpan = mode === "scroll" ? 17 : 9;
    const sunTarget = new THREE.Object3D();
    const lookX = mode === "scroll" ? -3.4 : 0.2;
    sunTarget.position.set(lookX, 0, 0);
    scene.add(sunTarget);
    sun.target = sunTarget;
    sun.position.set(lookX + 5, 11, 8);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -shadowSpan;
    sun.shadow.camera.right = shadowSpan;
    sun.shadow.camera.top = shadowSpan;
    sun.shadow.camera.bottom = -shadowSpan;
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 40;
    sun.shadow.radius = 5;
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.02;
    scene.add(sun);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(120, 120),
      new THREE.ShadowMaterial({ color: 0x3a2f1f, opacity: 0.18 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // marcações de pista (modo scroll)
    const roadMat = new THREE.MeshStandardMaterial({ color: 0xd9d3c4, roughness: 1 });
    const roadGeos: THREE.BufferGeometry[] = [];
    if (mode === "scroll") {
      for (let i = -9; i <= 3; i++) {
        const g = new THREE.BoxGeometry(1.6, 0.01, 0.14);
        roadGeos.push(g);
        const m = new THREE.Mesh(g, roadMat);
        m.position.set(i * 2.6, 0.005, -3.4);
        m.receiveShadow = true;
        scene.add(m);
      }
    }

    const world = buildWorld(mode);
    scene.add(world.root);

    /* enquadramento */
    const frame = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      renderer.setSize(w, h, false);
      const aspect = w / h;
      camera.aspect = aspect;
      const tanHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      if (mode === "scroll") {
        const needW = aspect < 1 ? 17 : 16.5;
        const D = clamp(needW / (2 * tanHalf * aspect), 16, 60);
        camera.position.set(lookX + 2.5, 4.0 + D * 0.06, D);
        camera.lookAt(lookX, 1.0, 0);
      } else {
        const needW = aspect < 1 ? 9 : 8.2;
        const D = clamp(needW / (2 * tanHalf * aspect), 12, 45);
        camera.position.set(lookX + 1.2, 2.9 + D * 0.12, D);
        camera.lookAt(lookX, 1.15, 0);
      }
      camera.updateProjectionMatrix();
    };
    frame();
    const ro = new ResizeObserver(frame);
    ro.observe(host);

    /* interação */
    const pointer = { x: 0, y: 0, cx: 0, cy: 0 };
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting), { rootMargin: "100px" });
    io.observe(host);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let lastStep = -1;
    let smoothP = 0;
    const clock = new THREE.Clock();
    let heroTime = 0;

    // estado inicial
    if (mode === "hero") world.update(1, 0, -14);
    else world.update(0, 0);
    renderer.render(scene, camera);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) {
        clock.getDelta();
        return;
      }
      const dt = Math.min(clock.getDelta(), 0.05);
      const time = clock.elapsedTime;

      pointer.cx += (pointer.x - pointer.cx) * 0.05;
      pointer.cy += (pointer.y - pointer.cy) * 0.05;

      if (mode === "hero") {
        heroTime += dt;
        const k = reduced ? 1 : clamp((heroTime - 0.25) / 3.0);
        const eased = 1 - Math.pow(1 - k, 3);
        world.update(1, time, -14 * (1 - eased));
        world.root.rotation.y = -0.5 + pointer.cx * 0.22 + Math.sin(time * 0.35) * 0.05;
        camera.position.y += (2.9 + (camera.position.z) * 0.12 - pointer.cy * 0.5 - camera.position.y) * 0.05;
        camera.lookAt(lookX, 1.15, 0);
      } else {
        const el = trackRef?.current;
        let target = 0;
        if (el) {
          const r = el.getBoundingClientRect();
          const span = Math.max(1, r.height - window.innerHeight);
          target = clamp(-r.top / span);
        }
        smoothP += (target - smoothP) * (reduced ? 1 : 0.1);
        world.update(smoothP, time);
        world.root.rotation.y = -0.2 + smoothP * 0.1 + pointer.cx * 0.05;
        const step = target < 0.33 ? 0 : target < 0.72 ? 1 : 2;
        if (step !== lastStep) {
          lastStep = step;
          onStepRef.current?.(step);
        }
      }
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      world.dispose();
      roadGeos.forEach((g) => g.dispose());
      roadMat.dispose();
      floor.geometry.dispose();
      (floor.material as THREE.Material).dispose();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
    };
  }, [mode, trackRef]);

  return <div ref={hostRef} className={className} aria-hidden="true" />;
}
