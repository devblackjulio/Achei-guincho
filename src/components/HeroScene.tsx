import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Cena low-poly: rodovia ao amanhecer, guincho plataforma com giroflex,
 * carro em pane no acostamento, atendente acenando, cones e quilômetros.
 * O asfalto rola em loop, as rodas giram e o giroflex pisca.
 */
export default function HeroScene({ onReady }: { onReady?: () => void } = {}) {
  const mountRef = useRef<HTMLDivElement>(null);
  // Ref para o efeito de montagem (que roda uma vez) enxergar o callback
  // atual sem recriar o contexto WebGL a cada render.
  const readyRef = useRef(onReady);
  readyRef.current = onReady;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const PAPER = new THREE.Color("#f6f5f0");
    const scene = new THREE.Scene();
    scene.background = PAPER;
    scene.fog = new THREE.Fog(PAPER, 26, 82);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 260);
    const CAM_DESK = {
      base: new THREE.Vector3(9.6, 5.1, 13.6),
      target: new THREE.Vector3(0.9, 1.25, -1.2),
    };
    const CAM_MOB = {
      base: new THREE.Vector3(8.0, 4.7, 13.0),
      target: new THREE.Vector3(-2.6, 1.0, -1.6),
    };
    let camBase = CAM_DESK.base;
    let camTarget = CAM_DESK.target;
    camera.position.copy(camBase);
    camera.lookAt(camTarget);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    // PCFShadowMap (PCFSoftShadowMap foi removido no r186).
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.06;
    mount.appendChild(renderer.domElement);

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const mob = w / h < 0.95;
      camBase = mob ? CAM_MOB.base : CAM_DESK.base;
      camTarget = mob ? CAM_MOB.target : CAM_DESK.target;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    /* ---------- luzes ---------- */
    scene.add(new THREE.HemisphereLight(0xffffff, 0xd8d3c2, 1.0));
    const sun = new THREE.DirectionalLight(0xfff1da, 2.0);
    sun.position.set(15, 21, 9);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    const sc = sun.shadow.camera;
    sc.left = -24;
    sc.right = 24;
    sc.top = 24;
    sc.bottom = -24;
    sc.near = 1;
    sc.far = 70;
    sc.updateProjectionMatrix();
    sun.shadow.bias = -0.0004;
    scene.add(sun);

    const beaconLight = new THREE.PointLight(0xffb020, 0, 13, 1.6);
    beaconLight.position.set(2.15, 3.5, -1.35);
    scene.add(beaconLight);

    /* ---------- helpers ---------- */
    const mat = (color: string, roughness = 0.92) =>
      new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.03 });

    const box = (
      w: number,
      h: number,
      d: number,
      color: string,
      rough = 0.92,
    ) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color, rough));
      m.castShadow = true;
      m.receiveShadow = true;
      return m;
    };

    const makeWheel = (r: number, width: number) => {
      const g = new THREE.Group();
      const tire = new THREE.Mesh(
        new THREE.CylinderGeometry(r, r, width, 20),
        mat("#22211d", 0.95),
      );
      tire.rotation.z = Math.PI / 2;
      tire.castShadow = true;
      const hub = new THREE.Mesh(
        new THREE.CylinderGeometry(r * 0.45, r * 0.45, width + 0.02, 14),
        mat("#cfcaba", 0.6),
      );
      hub.rotation.z = Math.PI / 2;
      g.add(tire, hub);
      return g;
    };

    /* ---------- chão + rodovia ---------- */
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(420, 420), mat("#e7e4d6", 1));
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const road = new THREE.Mesh(new THREE.PlaneGeometry(11, 420), mat("#4c4b45", 0.97));
    road.rotation.x = -Math.PI / 2;
    road.position.y = 0.02;
    road.receiveShadow = true;
    scene.add(road);

    const edgeL = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 420), mat("#f2f0e4", 1));
    edgeL.rotation.x = -Math.PI / 2;
    edgeL.position.set(-4.95, 0.03, 0);
    const edgeR = edgeL.clone();
    edgeR.position.x = 4.95;
    scene.add(edgeL, edgeR);

    /* ---------- faixas, postes e árvores em loop ---------- */
    const loop: THREE.Object3D[] = [];
    const SPAN = 190;

    const addLooper = (obj: THREE.Object3D, z0: number) => {
      obj.userData.z0 = z0;
      obj.position.z = z0;
      scene.add(obj);
      loop.push(obj);
    };

    for (let i = 0; i < 22; i++) {
      const dash = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 2.5), mat("#f6f4ea", 1));
      dash.rotation.x = -Math.PI / 2;
      dash.position.y = 0.04;
      addLooper(dash, -95 + i * 8.6);
    }

    for (let i = 0; i < 12; i++) {
      const side = i % 2 === 0 ? 6.6 : -6.6;
      const post = new THREE.Group();
      const shaft = box(0.14, 1.0, 0.14, "#efece0");
      shaft.position.y = 0.5;
      const cap = box(0.2, 0.18, 0.2, "#f2a900", 0.7);
      cap.position.y = 1.06;
      post.add(shaft, cap);
      post.position.x = side;
      addLooper(post, -95 + i * 16.4);
    }

    const crownA = mat("#8d9477", 1);
    const crownB = mat("#767e5c", 1);
    const trunkM = mat("#8a7a5c", 1);
    for (let i = 0; i < 16; i++) {
      const side = i % 2 === 0 ? 1 : -1;
      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.22, 1.2, 8), trunkM);
      trunk.position.y = 0.6;
      trunk.castShadow = true;
      const c1 = new THREE.Mesh(new THREE.ConeGeometry(1.25, 2.1, 7), crownA);
      c1.position.y = 2.0;
      c1.castShadow = true;
      const c2 = new THREE.Mesh(new THREE.ConeGeometry(0.85, 1.5, 7), crownB);
      c2.position.y = 3.1;
      c2.castShadow = true;
      tree.add(trunk, c1, c2);
      const s = 0.75 + ((i * 37) % 10) / 14;
      tree.scale.setScalar(s);
      tree.position.x = side * (10.5 + ((i * 53) % 9));
      addLooper(tree, -95 + i * 12.3);
    }

    /* ---------- nuvens ---------- */
    const cloudMat = new THREE.MeshStandardMaterial({ color: "#fdfcf7", roughness: 1 });
    const clouds: THREE.Group[] = [];
    for (let i = 0; i < 4; i++) {
      const c = new THREE.Group();
      const puffs = 3 + (i % 2);
      for (let j = 0; j < puffs; j++) {
        const puff = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 10), cloudMat);
        puff.scale.set(2.4 - j * 0.4, 0.85, 1.15);
        puff.position.set(j * 1.7 - puffs * 0.8, (j % 2) * 0.35, 0);
        c.add(puff);
      }
      c.position.set(-46 + i * 26, 17 + (i % 3) * 3.4, -34 - (i % 2) * 14);
      scene.add(c);
      clouds.push(c);
    }

    /* ---------- guincho plataforma ---------- */
    const truck = new THREE.Group();
    const wheels: THREE.Group[] = [];
    const INK = "#23221d";

    const chassis = box(2.15, 0.42, 6.3, INK, 0.85);
    chassis.position.y = 0.64;
    truck.add(chassis);

    const cab = box(2.1, 1.62, 1.85, "#f2a900", 0.55);
    cab.position.set(0, 1.72, -2.15);
    truck.add(cab);

    const windshield = box(1.74, 0.64, 0.12, "#31404a", 0.3);
    windshield.position.set(0, 1.98, -3.06);
    truck.add(windshield);

    const bumper = box(2.16, 0.32, 0.3, INK, 0.8);
    bumper.position.set(0, 0.98, -3.12);
    truck.add(bumper);

    const lampMat = () =>
      new THREE.MeshStandardMaterial({
        color: "#ffd489",
        emissive: 0xffb020,
        emissiveIntensity: 0.5,
        roughness: 0.4,
      });
    const headL = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.2, 0.08), lampMat());
    headL.position.set(-0.72, 1.22, -3.14);
    const headR = headL.clone();
    headR.position.x = 0.72;
    truck.add(headL, headR);

    const mirrorL = box(0.1, 0.34, 0.2, INK);
    mirrorL.position.set(-1.22, 2.0, -2.7);
    const mirrorR = mirrorL.clone();
    mirrorR.position.x = 1.22;
    truck.add(mirrorL, mirrorR);

    const bar = box(1.35, 0.1, 0.42, INK);
    bar.position.set(0, 2.58, -2.15);
    truck.add(bar);
    const beaconMatL = new THREE.MeshStandardMaterial({
      color: "#ffcf70",
      emissive: 0xffab00,
      emissiveIntensity: 1,
      roughness: 0.35,
    });
    const beaconMatR = beaconMatL.clone();
    const beaconL = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.18, 0.34), beaconMatL);
    beaconL.position.set(-0.42, 2.72, -2.15);
    const beaconR = beaconL.clone();
    beaconR.material = beaconMatR;
    beaconR.position.x = 0.42;
    truck.add(beaconL, beaconR);

    const exhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.5, 10), mat(INK, 0.5));
    exhaust.position.set(1.16, 2.1, -1.15);
    exhaust.castShadow = true;
    truck.add(exhaust);

    // plataforma inclinada
    const bed = new THREE.Group();
    const deck = box(2.32, 0.16, 3.95, "#2e2d28", 0.85);
    deck.position.set(0, 0, 0);
    const railL = box(0.09, 0.26, 3.95, "#f2a900", 0.6);
    railL.position.set(-1.12, 0.2, 0);
    const railR = railL.clone();
    railR.position.x = 1.12;
    bed.add(deck, railL, railR);
    bed.position.set(0, 1.22, 1.35);
    bed.rotation.x = 0.055;
    truck.add(bed);

    const winch = box(0.55, 0.55, 0.95, INK);
    winch.position.set(0, 1.05, -0.55);
    truck.add(winch);

    const tailL = new THREE.Mesh(
      new THREE.BoxGeometry(0.34, 0.18, 0.08),
      new THREE.MeshStandardMaterial({
        color: "#7a2c1e",
        emissive: 0xc4452e,
        emissiveIntensity: 0.85,
        roughness: 0.4,
      }),
    );
    tailL.position.set(-0.82, 0.8, 3.42);
    const tailR = tailL.clone();
    tailR.position.x = 0.82;
    truck.add(tailL, tailR);

    const truckWheelPos: [number, number, number][] = [
      [-1.08, 0.47, -2.25],
      [1.08, 0.47, -2.25],
      [-1.08, 0.47, 1.45],
      [1.08, 0.47, 1.45],
      [-1.08, 0.47, 2.65],
      [1.08, 0.47, 2.65],
    ];
    for (const p of truckWheelPos) {
      const w = makeWheel(0.47, 0.34);
      w.position.set(...p);
      truck.add(w);
      wheels.push(w);
    }

    truck.position.set(2.15, 0, 0.8);
    scene.add(truck);

    /* ---------- carro em pane ---------- */
    const car = new THREE.Group();
    const CAR = "#6e7b84";

    const body = box(1.62, 0.54, 3.5, CAR, 0.55);
    body.position.y = 0.62;
    car.add(body);

    const glass = box(1.3, 0.42, 1.75, "#33424b", 0.3);
    glass.position.set(0, 1.14, -0.1);
    car.add(glass);
    const roof = box(1.36, 0.1, 1.9, CAR, 0.55);
    roof.position.set(0, 1.4, -0.1);
    car.add(roof);

    const hood = box(1.5, 0.07, 1.05, CAR, 0.55);
    hood.position.set(0, 1.08, -1.5);
    hood.rotation.x = -0.62;
    car.add(hood);

    const hazardMat = new THREE.MeshStandardMaterial({
      color: "#ffd489",
      emissive: 0xffab00,
      emissiveIntensity: 1.6,
      roughness: 0.4,
    });
    const hazPos: [number, number, number][] = [
      [-0.78, 0.74, -1.74],
      [0.78, 0.74, -1.74],
      [-0.78, 0.74, 1.74],
      [0.78, 0.74, 1.74],
    ];
    for (const p of hazPos) {
      const hz = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.14, 0.06), hazardMat);
      hz.position.set(...p);
      car.add(hz);
    }

    const carWheelPos: [number, number, number][] = [
      [-0.8, 0.34, -1.12],
      [0.8, 0.34, -1.12],
      [-0.8, 0.34, 1.12],
      [0.8, 0.34, 1.12],
    ];
    for (const p of carWheelPos) {
      const w = makeWheel(0.34, 0.24);
      w.position.set(...p);
      car.add(w);
    }

    car.position.set(2.2, 0, -5.4);
    scene.add(car);

    /* ---------- atendente acenando ---------- */
    const attendant = new THREE.Group();
    const legs = box(0.34, 0.72, 0.18, "#26251f");
    legs.position.y = 0.36;
    const torso = box(0.4, 0.5, 0.24, "#f2a900", 0.7);
    torso.position.y = 0.98;
    const vestStripe = box(0.42, 0.1, 0.26, "#efece0", 0.8);
    vestStripe.position.y = 0.98;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.15, 14, 12), mat("#d9a07b", 0.8));
    head.position.y = 1.42;
    head.castShadow = true;
    const armL = box(0.09, 0.46, 0.09, "#f2a900", 0.7);
    armL.position.set(-0.27, 0.95, 0);
    const armR = new THREE.Group();
    const armMesh = box(0.09, 0.5, 0.09, "#f2a900", 0.7);
    armMesh.position.y = 0.24;
    armR.add(armMesh);
    armR.position.set(0.24, 1.18, 0);
    armR.rotation.z = -2.5;
    attendant.add(legs, torso, vestStripe, head, armL, armR);
    attendant.position.set(4.15, 0, -4.3);
    attendant.rotation.y = -0.5;
    attendant.traverse((o) => {
      o.castShadow = true;
    });
    scene.add(attendant);

    /* ---------- triângulo + cones ---------- */
    const tri = new THREE.Group();
    const triMat = mat("#f2a900", 0.6);
    const sideA = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.09, 0.05), triMat);
    sideA.position.set(-0.15, 0.26, 0);
    sideA.rotation.z = 1.05;
    const sideB = sideA.clone();
    sideB.position.x = 0.15;
    sideB.rotation.z = -1.05;
    const apex = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.09, 0.05), triMat);
    apex.position.y = 0.52;
    const baseBar = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.06, 0.24), mat(INK));
    baseBar.position.y = 0.03;
    tri.add(sideA, sideB, apex, baseBar);
    tri.position.set(2.15, 0, -8.6);
    tri.traverse((o) => (o.castShadow = true));
    scene.add(tri);

    const makeCone = () => {
      const g = new THREE.Group();
      const base = box(0.5, 0.07, 0.5, INK);
      base.position.y = 0.035;
      const cone = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.62, 14), mat("#f2a900", 0.6));
      cone.position.y = 0.36;
      cone.castShadow = true;
      const band = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.14, 14), mat("#fdfcf7", 0.8));
      band.position.y = 0.4;
      g.add(base, cone, band);
      return g;
    };
    const coneA = makeCone();
    coneA.position.set(4.4, 0, -1.4);
    const coneB = makeCone();
    coneB.position.set(4.7, 0, 2.6);
    const coneC = makeCone();
    coneC.position.set(0.9, 0, -9.6);
    scene.add(coneA, coneB, coneC);

    /* ---------- interação + loop ---------- */
    let mx = 0;
    let my = 0;
    const onPointer = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Timer substitui Clock (deprecado desde r186).
    const timer = new THREE.Timer();
    timer.connect(document);
    let dist = 0;
    const SPEED = 6.5;
    let raf = 0;
    let readySent = false;

    const frame = () => {
      timer.update();
      const dt = Math.min(timer.getDelta(), 0.05);
      const t = timer.getElapsed();
      dist += SPEED * dt;

      for (const obj of loop) {
        const z0 = obj.userData.z0 as number;
        let z = z0 + dist;
        z = ((z + SPAN / 2) % SPAN) - SPAN / 2;
        obj.position.z = z;
      }

      for (const w of wheels) w.rotation.x -= (SPEED * dt) / 0.47;

      const pulse = (Math.sin(t * 7.5) + 1) / 2;
      beaconMatL.emissiveIntensity = 0.35 + pulse * 2.6;
      beaconMatR.emissiveIntensity = 0.35 + (1 - pulse) * 2.6;
      beaconLight.intensity = 1.2 + pulse * 3.2;

      const haz = Math.sin(t * 5.2) > -0.2 ? 1.7 : 0.15;
      hazardMat.emissiveIntensity = haz;

      truck.position.y = Math.abs(Math.sin(t * 9)) * 0.013;
      armR.rotation.z = -2.5 + Math.sin(t * 4.2) * 0.32;

      for (let i = 0; i < clouds.length; i++) {
        clouds[i].position.x += dt * (0.35 + i * 0.12);
        if (clouds[i].position.x > 55) clouds[i].position.x = -55;
      }

      camera.position.x += (camBase.x + mx * 1.15 - camera.position.x) * 0.045;
      camera.position.y += (camBase.y - my * 0.55 - camera.position.y) * 0.045;
      camera.lookAt(camTarget);

      renderer.render(scene, camera);
      if (!readySent) {
        readySent = true;
        readyRef.current?.();
      }
      raf = requestAnimationFrame(frame);
    };

    if (reduced) {
      renderer.render(scene, camera);
      readySent = true;
      readyRef.current?.();
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      timer.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const m = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(m)) m.forEach((x) => x.dispose());
        else if (m) m.dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} aria-hidden="true" className="absolute inset-0" />;
}
