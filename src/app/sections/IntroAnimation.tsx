"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function IntroAnimation() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    const container = canvasContainerRef.current;
    if (!overlay || !container) return;

    // Prevent body scroll while intro plays
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const notifyDone = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__introFinished = true;
      window.dispatchEvent(new CustomEvent("intro-finished"));
    };

    // Short-circuit for reduced-motion users
    if (reducedMotion) {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          document.body.style.overflow = prevOverflow;
          notifyDone();
          setDone(true);
        },
      });
      return;
    }

    let disposed = false;
    let rafId = 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let renderer: any = null;

    (async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import(
        // @ts-expect-error — three v0.134 export path
        "three/examples/jsm/loaders/GLTFLoader"
      );

      if (disposed) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        42,
        container.clientWidth / container.clientHeight,
        0.1,
        100
      );
      camera.position.set(0, 0, 5.8);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      container.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));

      const dir = new THREE.DirectionalLight(0x63aaa2, 1.6);
      dir.position.set(3, 4, 5);
      scene.add(dir);

      const rim = new THREE.DirectionalLight(0x7bbfba, 0.7);
      rim.position.set(-3, 2, -3);
      scene.add(rim);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const gltf: any = await new Promise((resolve, reject) => {
        new GLTFLoader().load("/Objeto3D_VoicIA.glb", resolve, undefined, reject);
      });

      if (disposed) return;

      const model = gltf.scene;

      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.6 / maxDim;
      model.scale.setScalar(scale);

      model.rotation.y = -Math.PI / 2;

      const pivot = new THREE.Group();
      pivot.add(model);

      const box2 = new THREE.Box3().setFromObject(pivot);
      const c2 = box2.getCenter(new THREE.Vector3());
      model.position.sub(c2);

      pivot.scale.setScalar(0.001);
      pivot.rotation.y = 0;

      scene.add(pivot);

      const animate = () => {
        if (disposed) return;
        rafId = requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();

      // Master timeline
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(overlay, {
            opacity: 0,
            duration: 0.7,
            ease: "power2.inOut",
            onComplete: () => {
              document.body.style.overflow = prevOverflow;
              notifyDone();
              setDone(true);
            },
          });
        },
      });

      tl.to(pivot.scale, { x: 1, y: 1, z: 1, duration: 0.9, ease: "back.out(2.4)" });
      tl.to(pivot.rotation, { y: Math.PI * 2, duration: 1.1, ease: "power2.inOut" }, "-=0.1");
      tl.to(pivot.scale, { x: 1.18, y: 1.18, z: 1.18, duration: 0.25, ease: "power2.out" });
      tl.to(pivot.scale, { x: 1, y: 1, z: 1, duration: 0.4, ease: "elastic.out(1.2, 0.4)" });
      tl.to(pivot.scale, { x: 0, y: 0, z: 0, duration: 0.5, ease: "back.in(1.8)", delay: 0.2 });

      const onResize = () => {
        if (!container || !renderer) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
      };
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      if (renderer) {
        renderer.dispose?.();
        renderer.domElement?.remove?.();
      }
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#080C15]"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,170,162,0.18),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 grain opacity-[0.06] mix-blend-overlay" />

      <div
        ref={canvasContainerRef}
        className="relative w-[min(85vw,640px)] h-[min(85vw,640px)] lg:w-[min(70vh,720px)] lg:h-[min(70vh,720px)]"
      />
    </div>
  );
}
