"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroModel() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect prefers-reduced-motion
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let disposed = false;
    let isVisible = true;

    (async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import(
        // @ts-expect-error — three v0.134 export path
        "three/examples/jsm/loaders/GLTFLoader"
      );

      if (disposed) return;

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        100
      );
      camera.position.set(0, 0, 4);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: window.innerWidth > 768, // disable AA on mobile
        powerPreference: "high-performance",
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      // Cap DPR to 1.5 — 2x is overkill for a small logo, saves ~40% GPU time
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);

      const ambient = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambient);

      const dirLight = new THREE.DirectionalLight(0x5ba8a2, 1.4);
      dirLight.position.set(3, 4, 5);
      scene.add(dirLight);

      const rimLight = new THREE.DirectionalLight(0x7bbfba, 0.6);
      rimLight.position.set(-3, 2, -3);
      scene.add(rimLight);

      const loader = new GLTFLoader();
      const gltf: any = await new Promise((resolve, reject) => {
        loader.load("/Objeto3D_VoicIA.glb", resolve, undefined, reject);
      });

      if (disposed) return;

      const model = gltf.scene;

      // Center and scale
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.4 / maxDim;
      model.scale.setScalar(scale);

      // Wrap in pivot so scroll rotation is independent from base rotation
      const pivot = new THREE.Group();
      pivot.add(model);

      // Recalculate center after rotation and re-center
      const box2 = new THREE.Box3().setFromObject(pivot);
      const center2 = box2.getCenter(new THREE.Vector3());
      model.position.sub(center2);

      scene.add(pivot);

      const floatProxy = { y: 0 };
      gsap.to(floatProxy, {
        y: 0.12,
        duration: 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      const scrollProxy = { rotation: 0 };
      gsap.to(scrollProxy, {
        rotation: Math.PI * 2,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      let rafId: number;
      const animate = () => {
        if (disposed) return;
        rafId = requestAnimationFrame(animate);
        // Skip rendering when offscreen or tab hidden — saves major GPU
        if (!isVisible || document.hidden) return;
        pivot.position.y = floatProxy.y;
        pivot.rotation.y = scrollProxy.rotation;
        renderer.render(scene, camera);
      };
      animate();

      // Only render when in viewport
      const io = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
        },
        { rootMargin: "100px" }
      );
      io.observe(container);

      const onResize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      (container as any)._cleanup = () => {
        disposed = true;
        cancelAnimationFrame(rafId);
        io.disconnect();
        ScrollTrigger.getAll().forEach((t) => {
          if (t.vars.trigger === container) t.kill();
        });
        gsap.killTweensOf(floatProxy);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      (containerRef.current as any)?._cleanup?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mx-auto lg:mx-0 -mb-2"
      aria-hidden="true"
    />
  );
}
