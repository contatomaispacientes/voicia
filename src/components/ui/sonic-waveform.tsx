"use client";

import React, { useEffect, useRef } from "react";

/**
 * Sonic Waveform Canvas — adapted for VoicIA "Clinical Noir" palette.
 * Replaces VantaWaves as the Hero background.
 *
 * Colors: teal #63AAA2 (rgb 99,170,162)
 * Background: #080C15 (matches body bg — composited via rgba fade)
 */

interface SonicWaveformCanvasProps {
  className?: string;
  /** Base color as [r, g, b] — defaults to VoicIA teal */
  color?: [number, number, number];
  /** Number of wave lines */
  lineCount?: number;
  /** Opacity multiplier 0-1 */
  intensity?: number;
}

const SonicWaveformCanvas: React.FC<SonicWaveformCanvasProps> = ({
  className = "",
  color = [99, 170, 162],
  lineCount = 50,
  intensity = 0.45,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    // Skip on mobile for performance
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    let time = 0;
    let isVisible = true;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const [r, g, b] = color;

    const draw = () => {
      if (!isVisible || document.hidden) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      // Clear frame completely — no trail/smear
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const segmentCount = 80;
      const height = canvas.height / 2;

      for (let i = 0; i < lineCount; i++) {
        ctx.beginPath();
        const progress = i / lineCount;
        const colorIntensity = Math.sin(progress * Math.PI);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${colorIntensity * intensity})`;
        ctx.lineWidth = 1.2;

        for (let j = 0; j <= segmentCount; j++) {
          const x = (j / segmentCount) * canvas.width;

          // Mouse influence
          const distToMouse = Math.hypot(x - mouse.x, height - mouse.y);
          const mouseEffect = Math.max(0, 1 - distToMouse / 400);

          // Wave calculation
          const noise = Math.sin(j * 0.1 + time + i * 0.2) * 20;
          const spike =
            Math.cos(j * 0.2 + time + i * 0.1) *
            Math.sin(j * 0.05 + time) *
            50;
          const y = height + noise + spike * (1 + mouseEffect * 2);

          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      time += 0.015;
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    // Pause rendering when canvas is offscreen
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { rootMargin: "100px" }
    );
    io.observe(canvas);

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    resizeCanvas();
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      io.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [color, lineCount, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 w-full h-full ${className}`}
      style={{ background: "#080C15" }}
    />
  );
};

export default SonicWaveformCanvas;
