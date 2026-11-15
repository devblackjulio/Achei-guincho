import { useEffect, useRef } from "react";
import * as THREE from "three";
import { buildTruck, PALETTE } from "./truck";

export default function HeroScene({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.touchAction = "pan-y";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);

    // luz suave, de estúdio
    scene.add(new THREE.HemisphereLight(0xffffff, 0xe6e1d6, 1.1));
    const sun = new THREE.DirectionalLight(0xffffff, 2.2);
    sun.position.set(-5, 9, 6);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -6;
    sun.shadow.camera.right = 6;
    sun.shadow.camera.top = 6;
    sun.shadow.camera.bottom = -6;
    sun.shadow.radius = 5;
    sun.shadow.bias = -0.0004;
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0xfff2e2, 0.7);
    fill.position.set(6, 3, -4);
    scene.add(fill);

    // plataforma (palco)
    const stage = new THREE.Mesh(
      new THREE.CylinderGeometry(4.3, 4.3, 0.2, 96),
      new THREE.MeshStandardMaterial({ color: 0xf1eee7, roughness: 0.95 })
    );
    stage.position.y = -0.1;
    stage.receiveShadow = true;
    scene.add(stage);
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(3.7, 3.74, 128),
      new THREE.MeshBasicMaterial({ color: 0xd9d4c8, side: THREE.DoubleSide })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.002;
    scene.add(ring);
    const accentRing = new THREE.Mesh(
      new THREE.RingGeometry(4.0, 4.04, 128, 1, 0, Math.PI * 0.5),
      new THREE.MeshBasicMaterial({ color: PALETTE.accent, side: THREE.DoubleSide })
    );
    accentRing.rotation.x = -Math.PI / 2;
    accentRing.position.y = 0.003;
    scene.add(accentRing);

    const rig = buildTruck({ withCar: true });
    const holder = new THREE.Group();
    holder.add(rig.group);
    rig.group.position.x = -0.35;
    scene.add(holder);

    // interação
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let dragging = false;
    let dragYaw = 0;
    let lastX = 0;
    const onMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (dragging) {
        dragYaw += (e.clientX - lastX) * 0.01;
        lastX = e.clientX;
      }
    };
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      mount.style.cursor = "grabbing";
    };
    const onUp = () => {
      dragging = false;
      mount.style.cursor = "grab";
    };
    mount.style.cursor = "grab";
    mount.addEventListener("pointermove", onMove);
    mount.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      const narrow = camera.aspect < 1;
      camera.position.set(narrow ? 14.5 : 12, narrow ? 10.5 : 8, narrow ? 16.5 : 14);
      camera.lookAt(0, 0.9, 0);
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(mount);

    const clock = new THREE.Clock();
    let raf = 0;
    let auto = -0.6;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;
      if (!dragging && !reduce) auto += dt * 0.18;
      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;

      holder.rotation.y = auto + dragYaw + current.x * 0.25;
      holder.position.y = Math.sin(t * 1.6) * 0.012;
      rig.group.rotation.z = Math.sin(t * 1.3) * 0.004 - current.y * 0.01;
      accentRing.rotation.z = t * 0.25;
      const pulse = (Math.sin(t * 5) + 1) / 2;
      (rig.beacon.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.3 + pulse * 1.6;
      if (rig.beaconLight) rig.beaconLight.intensity = pulse * 6;
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mount.removeEventListener("pointermove", onMove);
      mount.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
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
