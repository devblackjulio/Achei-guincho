import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { buildTruck, PALETTE } from "./truck";

type Props = {
  className?: string;
  onStep?: (step: number) => void;
};

// pseudo-aleatório determinístico
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Constrói um caminho com curvas suaves nos cantos a partir de pontos ortogonais. */
function roundedPath(pts: THREE.Vector3[], radius: number) {
  const path = new THREE.CurvePath<THREE.Vector3>();
  let cursor = pts[0].clone();
  for (let i = 1; i < pts.length - 1; i++) {
    const prev = pts[i - 1];
    const p = pts[i];
    const next = pts[i + 1];
    const dirIn = p.clone().sub(prev).normalize();
    const dirOut = next.clone().sub(p).normalize();
    const a = p.clone().addScaledVector(dirIn, -radius);
    const b = p.clone().addScaledVector(dirOut, radius);
    path.add(new THREE.LineCurve3(cursor.clone(), a));
    path.add(new THREE.QuadraticBezierCurve3(a, p.clone(), b));
    cursor = b;
  }
  path.add(new THREE.LineCurve3(cursor, pts[pts.length - 1].clone()));
  return path;
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export default function RouteScene({ className = "", onStep }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef(onStep);
  stepRef.current = onStep;

  useEffect(() => {
    const mount = mountRef.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 200);

    scene.add(new THREE.HemisphereLight(0xffffff, 0xe3ded2, 1.15));
    const sun = new THREE.DirectionalLight(0xffffff, 2.1);
    sun.position.set(-8, 16, 9);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    const sc = sun.shadow.camera;
    sc.left = -13;
    sc.right = 13;
    sc.top = 13;
    sc.bottom = -13;
    sun.shadow.radius = 4;
    sun.shadow.bias = -0.0005;
    scene.add(sun);

    const world = new THREE.Group();
    scene.add(world);

    // base da maquete
    const slab = new THREE.Mesh(
      new RoundedBoxGeometry(18.4, 0.7, 18.4, 4, 0.25),
      new THREE.MeshStandardMaterial({ color: 0xe7e3da, roughness: 0.95 })
    );
    slab.position.y = -0.36;
    slab.receiveShadow = true;
    world.add(slab);

    // quarteirões
    const rand = rng(7);
    const blockMat = new THREE.MeshStandardMaterial({ color: 0xfbfaf7, roughness: 0.8 });
    const blockMatAlt = new THREE.MeshStandardMaterial({ color: 0xf3f0e9, roughness: 0.8 });
    const parkMat = new THREE.MeshStandardMaterial({ color: 0xdedacf, roughness: 0.9 });
    const centers = [-6, -3, 0, 3, 6];
    centers.forEach((cx) =>
      centers.forEach((cz) => {
        const isPark = rand() < 0.12;
        const h = isPark ? 0.06 : 0.25 + rand() * rand() * 1.9;
        const w = 2.1;
        const mesh = new THREE.Mesh(
          new RoundedBoxGeometry(w, h, w, 3, Math.min(0.12, h / 2 - 0.001)),
          isPark ? parkMat : rand() > 0.5 ? blockMat : blockMatAlt
        );
        mesh.position.set(cx, h / 2, cz);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        world.add(mesh);
      })
    );

    // rota
    const route = roundedPath(
      [
        new THREE.Vector3(-7.5, 0.05, 7.5),
        new THREE.Vector3(-7.5, 0.05, 1.5),
        new THREE.Vector3(1.5, 0.05, 1.5),
        new THREE.Vector3(1.5, 0.05, -4.5),
        new THREE.Vector3(4.5, 0.05, -4.5),
        new THREE.Vector3(4.5, 0.05, -7.5),
      ],
      0.9
    );
    const routeLen = route.getLength();
    const tubeSegs = 220;
    const tubeGeo = new THREE.TubeGeometry(route, tubeSegs, 0.09, 6, false);
    const tube = new THREE.Mesh(
      tubeGeo,
      new THREE.MeshStandardMaterial({
        color: PALETTE.accent,
        roughness: 0.5,
        emissive: PALETTE.accent,
        emissiveIntensity: 0.15,
      })
    );
    tube.scale.y = 0.35;
    tube.position.y = 0.01;
    world.add(tube);
    const idxPerSeg = 6 * 6;

    // pino do cliente
    const pin = new THREE.Group();
    pin.position.set(4.5, 0, -7.5);
    const pinMat = new THREE.MeshStandardMaterial({ color: PALETTE.accent, roughness: 0.4 });
    const pinHead = new THREE.Mesh(new THREE.SphereGeometry(0.34, 32, 24), pinMat);
    pinHead.position.y = 2.1;
    pinHead.castShadow = true;
    const pinTip = new THREE.Mesh(new THREE.ConeGeometry(0.34, 0.7, 32), pinMat);
    pinTip.rotation.x = Math.PI;
    pinTip.position.y = 1.6;
    pinTip.castShadow = true;
    const pinDot = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 20, 16),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    pinDot.position.set(0, 2.1, 0);
    pinDot.scale.setScalar(1);
    pin.add(pinHead, pinTip, pinDot);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: PALETTE.accent,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
    });
    const pulse = new THREE.Mesh(new THREE.RingGeometry(0.5, 0.58, 64), pulseMat);
    pulse.rotation.x = -Math.PI / 2;
    pulse.position.y = 0.04;
    pin.add(pulse);
    world.add(pin);

    // carro parado (do cliente)
    const stranded = new THREE.Group();
    stranded.position.set(4.5, 0, -7.5);
    const sBody = new THREE.Mesh(
      new RoundedBoxGeometry(1.1, 0.24, 0.6, 3, 0.08),
      new THREE.MeshStandardMaterial({ color: PALETTE.car, roughness: 0.5 })
    );
    sBody.position.y = 0.2;
    const sCab = new THREE.Mesh(
      new RoundedBoxGeometry(0.6, 0.2, 0.52, 3, 0.07),
      new THREE.MeshStandardMaterial({ color: PALETTE.car, roughness: 0.5 })
    );
    sCab.position.set(-0.06, 0.4, 0);
    [sBody, sCab].forEach((m) => (m.castShadow = true));
    stranded.add(sBody, sCab);
    stranded.rotation.y = Math.PI / 2;
    stranded.position.x += 0.0;
    stranded.position.z += 0.0;
    world.add(stranded);
    // pisca-alerta do carro parado
    const hazard = new THREE.MeshStandardMaterial({
      color: 0xffb27d,
      emissive: PALETTE.accent,
      emissiveIntensity: 0,
    });
    [-0.28, 0.28].forEach((z) => {
      const l = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.06, 0.1), hazard);
      l.position.set(0.55, 0.22, z);
      stranded.add(l);
      const l2 = l.clone();
      l2.position.x = -0.55;
      stranded.add(l2);
    });

    // guincho
    const rig = buildTruck({ withCar: false, light: false });
    const truck = new THREE.Group();
    rig.group.scale.setScalar(0.3);
    // modelo olha para +X; giramos para que a frente aponte para +Z local
    rig.group.rotation.y = -Math.PI / 2;
    truck.add(rig.group);
    world.add(truck);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      const visH = Math.max(21, 27.5 / camera.aspect);
      const dist = visH / 2 / Math.tan(THREE.MathUtils.degToRad(13));
      camera.position.set(1, 1, 1).normalize().multiplyScalar(dist);
      camera.lookAt(0, 0.4, 0.2);
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(mount);

    const CYCLE = 12;
    const clock = new THREE.Clock();
    let raf = 0;
    let lastStep = -1;
    const pos = new THREE.Vector3();
    const tan = new THREE.Vector3();
    let yaw = 0;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      clock.getDelta();
      const t = clock.elapsedTime;
      const phase = reduce ? 0.8 : (t % CYCLE) / CYCLE;

      // linha do tempo
      const pinIn = ease(clamp01(phase / 0.08));
      const draw = clamp01((phase - 0.1) / 0.1);
      const travel = ease(clamp01((phase - 0.22) / 0.62));
      const out = clamp01((phase - 0.94) / 0.06);

      // pino cai do alto
      const drop = 1 - pinIn;
      pin.position.y = drop * 3;
      pin.scale.setScalar(Math.max(0.001, pinIn * (1 - out)));
      stranded.scale.setScalar(Math.max(0.001, 1 - out));
      truck.scale.setScalar(Math.max(0.001, 1 - out));
      pulse.scale.setScalar(1 + ((t * 0.8) % 1) * 2.2);
      pulseMat.opacity = 0.45 * (1 - ((t * 0.8) % 1)) * pinIn;
      hazard.emissiveIntensity = Math.sin(t * 7) > 0 ? 1.6 : 0.05;

      // desenhar a rota
      const segs = Math.floor(tubeSegs * draw * (1 - out));
      tubeGeo.setDrawRange(0, segs * idxPerSeg);

      // guincho percorre a rota
      const d = travel * (1 - 1.7 / routeLen);
      route.getPointAt(d, pos);
      route.getTangentAt(Math.min(d + 0.002, 1), tan);
      const targetYaw = Math.atan2(tan.x, tan.z);
      if (phase < 0.22) {
        yaw = Math.PI; // parte de z=7.5 rumo a z=1.5
      } else {
        let diff = targetYaw - yaw;
        diff = Math.atan2(Math.sin(diff), Math.cos(diff));
        yaw += diff * 0.2;
      }
      truck.position.copy(pos);
      truck.rotation.y = yaw;
      const moving = travel > 0 && travel < 1;
      truck.visible = phase > 0.1;
      const spin = moving ? 0.1 : 0;
      rig.wheels.forEach((w) => (w.rotation.z -= spin));
      rig.group.position.y = moving ? Math.sin(t * 22) * 0.003 : 0;
      (rig.beacon.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.3 + ((Math.sin(t * 6) + 1) / 2) * 1.6;

      // etapa atual (para o texto ao lado)
      const step = phase < 0.22 ? 0 : travel < 0.995 ? 1 : 2;
      if (step !== lastStep) {
        lastStep = step;
        stepRef.current?.(step);
      }

      // câmera: leve respiração
      world.rotation.y = Math.sin(t * 0.25) * 0.05;
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        if (m.material) {
          const mm = m.material as THREE.Material | THREE.Material[];
          (Array.isArray(mm) ? mm : [mm]).forEach((x) => x.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
