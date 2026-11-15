import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export const PALETTE = {
  // Paleta do SITE institucional (não a do experimento de origem).
  // O caminhão é branco-papel com faixa âmbar e chassi ink — a mesma
  // linguagem do resto da página: papel, tinta e âmbar de sinalização.
  // O laranja #f2570f que havia aqui pertencia a outra identidade e
  // destoava de todos os outros componentes do site.
  white: 0xf6f5f0, // --color-paper
  paper: 0xefede2, // --color-paper2
  charcoal: 0x1c1b16, // --color-ink
  tire: 0x2a2925,
  steel: 0xbab5a6,
  glass: 0x3b3a33,
  accent: 0xf2a900, // --color-amber
  car: 0x494639, // --color-ink2
};

const mat = (color: number, rough = 0.55, metal = 0.0) =>
  new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal });

function rbox(
  w: number,
  h: number,
  d: number,
  color: number,
  radius = 0.08,
  rough = 0.55
) {
  const m = new THREE.Mesh(
    new RoundedBoxGeometry(w, h, d, 4, Math.min(radius, w / 2, h / 2, d / 2)),
    mat(color, rough)
  );
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function wheel(radius: number, width: number) {
  const g = new THREE.Group();
  const tire = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, width, 28),
    mat(PALETTE.tire, 0.9)
  );
  tire.rotation.x = Math.PI / 2;
  tire.castShadow = true;
  const hub = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.55, radius * 0.55, width + 0.02, 20),
    mat(PALETTE.steel, 0.35, 0.4)
  );
  hub.rotation.x = Math.PI / 2;
  const bolt = new THREE.Mesh(
    new THREE.BoxGeometry(radius * 0.18, radius * 0.5, width + 0.05),
    mat(PALETTE.charcoal, 0.6)
  );
  g.add(tire, hub, bolt);
  return g;
}

export type TruckRig = {
  group: THREE.Group;
  wheels: THREE.Object3D[];
  beacon: THREE.Mesh;
  beaconLight: THREE.PointLight | null;
};

/** Cria um guincho plataforma estilizado. Frente aponta para +X. */
export function buildTruck(opts: { withCar?: boolean; light?: boolean } = {}): TruckRig {
  const { withCar = true, light = true } = opts;
  const group = new THREE.Group();
  const wheels: THREE.Object3D[] = [];

  // chassi
  const chassis = rbox(4.7, 0.22, 1.45, PALETTE.charcoal, 0.05);
  chassis.position.set(0, 0.62, 0);
  group.add(chassis);

  // cabine
  const cab = rbox(1.25, 1.05, 1.82, PALETTE.white, 0.16);
  cab.position.set(1.4, 1.38, 0);
  group.add(cab);

  const hood = rbox(0.85, 0.62, 1.82, PALETTE.white, 0.12);
  hood.position.set(2.3, 1.02, 0);
  group.add(hood);

  const sideGlass = rbox(0.78, 0.42, 1.86, PALETTE.glass, 0.08, 0.2);
  sideGlass.position.set(1.36, 1.62, 0);
  group.add(sideGlass);

  const wind = rbox(0.05, 0.42, 1.55, PALETTE.glass, 0.02, 0.2);
  wind.position.set(1.99, 1.62, 0);
  group.add(wind);

  // faixa laranja na cabine
  const stripe = rbox(2.2, 0.1, 1.86, PALETTE.accent, 0.03);
  stripe.position.set(1.75, 1.05, 0);
  group.add(stripe);

  // para-choque + faróis
  const bumper = rbox(0.18, 0.24, 1.78, PALETTE.charcoal, 0.06);
  bumper.position.set(2.78, 0.76, 0);
  group.add(bumper);
  [-0.65, 0.65].forEach((z) => {
    const head = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.14, 0.3),
      new THREE.MeshStandardMaterial({
        color: 0xfff4d8,
        emissive: 0xffe9b0,
        emissiveIntensity: 0.9,
      })
    );
    head.position.set(2.74, 1.02, z);
    group.add(head);
  });

  // girofle
  const beacon = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.12, 0.9),
    new THREE.MeshStandardMaterial({
      color: PALETTE.accent,
      emissive: PALETTE.accent,
      emissiveIntensity: 0.6,
    })
  );
  beacon.position.set(1.35, 1.97, 0);
  beacon.castShadow = true;
  group.add(beacon);
  let beaconLight: THREE.PointLight | null = null;
  if (light) {
    beaconLight = new THREE.PointLight(PALETTE.accent, 0, 4, 2);
    beaconLight.position.set(1.35, 2.2, 0);
    group.add(beaconLight);
  }

  // plataforma
  const skirt = rbox(3.15, 0.2, 1.95, PALETTE.accent, 0.05);
  skirt.position.set(-0.78, 0.8, 0);
  group.add(skirt);
  const deck = rbox(3.15, 0.1, 1.95, PALETTE.paper, 0.04);
  deck.position.set(-0.78, 0.95, 0);
  group.add(deck);
  [-0.93, 0.93].forEach((z) => {
    const rail = rbox(3.15, 0.1, 0.09, PALETTE.charcoal, 0.03);
    rail.position.set(-0.78, 1.04, z);
    group.add(rail);
  });
  const head = rbox(0.1, 0.55, 1.95, PALETTE.white, 0.04);
  head.position.set(0.72, 1.28, 0);
  group.add(head);

  // rodas
  const axle = [
    { x: 1.75, r: 0.46 },
    { x: -1.55, r: 0.46 },
    { x: -0.6, r: 0.46 },
  ];
  axle.forEach(({ x, r }) => {
    [-0.88, 0.88].forEach((z) => {
      const w = wheel(r, 0.36);
      w.position.set(x, r, z);
      group.add(w);
      wheels.push(w);
    });
  });
  // para-lamas
  [1.75, -1.1].forEach((x, i) => {
    [-0.84, 0.84].forEach((z) => {
      const fender = rbox(i === 0 ? 1.15 : 1.9, 0.08, 0.52, PALETTE.charcoal, 0.03);
      fender.position.set(x, 0.98 + (i === 0 ? 0 : -0.0), z);
      if (i === 0) group.add(fender);
    });
  });

  // carro na plataforma
  if (withCar) {
    const car = new THREE.Group();
    car.position.set(-0.78, 1.0, 0);
    const body = rbox(2.5, 0.44, 1.32, PALETTE.car, 0.16, 0.45);
    body.position.set(0, 0.42, 0);
    const cabin = rbox(1.3, 0.4, 1.12, PALETTE.car, 0.15, 0.45);
    cabin.position.set(-0.12, 0.8, 0);
    const glass = rbox(1.18, 0.28, 1.16, PALETTE.glass, 0.1, 0.2);
    glass.position.set(-0.12, 0.82, 0);
    car.add(body, glass, cabin);
    // pequeno detalhe: faróis do carro
    [-0.4, 0.4].forEach((z) => {
      const l = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 0.08, 0.22),
        new THREE.MeshStandardMaterial({ color: 0xfff4d8, emissive: 0xffe9b0, emissiveIntensity: 0.4 })
      );
      l.position.set(1.25, 0.46, z);
      car.add(l);
    });
    [0.8, -0.8].forEach((x) => {
      [-0.6, 0.6].forEach((z) => {
        const w = wheel(0.22, 0.2);
        w.position.set(x, 0.24, z);
        car.add(w);
      });
    });
    // cintas de fixação
    [-0.7, 0.7].forEach((x) => {
      const strap = rbox(0.07, 0.03, 1.5, PALETTE.accent, 0.01);
      strap.position.set(x, 0.66, 0);
      car.add(strap);
    });
    group.add(car);
  }

  return { group, wheels, beacon, beaconLight };
}
