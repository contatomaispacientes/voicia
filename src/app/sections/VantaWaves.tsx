"use client";

import { useEffect, useRef, useState } from "react";

export default function VantaWaves() {
  const vantaRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (vantaEffect) return;

    // Skip on mobile (expensive) and when user prefers reduced motion
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isMobile || reducedMotion) return;

    let cancelled = false;
    let effect: unknown = null;

    // Defer init until the browser is idle to avoid blocking first paint
    const idle =
      (window as unknown as { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback ??
      ((cb: () => void) => setTimeout(cb, 200));

    idle(async () => {
      const THREE = await import("three");
      const WAVES = (await import("vanta/dist/vanta.waves.min")).default;

      if (cancelled || !vantaRef.current) return;

      effect = WAVES({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: false, // disable touch — reduces mobile jank
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        color: 0x0b1120,
        shininess: 15,
        waveHeight: 8,
        waveSpeed: 0.5,
        zoom: 0.75,
        colorCycleSpeed: 0,
        forceAnimate: true,
        scaleMobile: 1.0,
        scale: 1.0,
      });

      if (!cancelled) setVantaEffect(effect);
    });

    // Pause animation when tab is hidden
    const onVisibility = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const e = effect as any;
      if (!e) return;
      if (document.hidden) e.pause?.();
      else e.play?.();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className="absolute inset-0 z-0 opacity-60"
      style={{
        maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
      }}
    />
  );
}
