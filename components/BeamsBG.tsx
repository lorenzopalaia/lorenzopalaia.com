"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

export default function BeamsBG({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const animationFrameRef = useRef<number>(0);
  const initializedRef = useRef(false);
  const MINIMUM_BEAMS = 15;

  useEffect(() => {
    setIsDark(resolvedTheme === "dark");
  }, [resolvedTheme]);

  const createBeam = (width: number, height: number): Beam => {
    const angle = -35 + Math.random() * 10;
    return {
      x: Math.random() * width * 1.5 - width * 0.25,
      y: Math.random() * height * 1.5 - height * 0.25,
      width: 30 + Math.random() * 60,
      length: height * 2.5,
      angle: angle,
      speed: 0.6 + Math.random() * 1.2,
      opacity: 0.12 + Math.random() * 0.16,
      hue: 190 + Math.random() * 70,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.03,
    };
  };

  const resetBeam = (beam: Beam, index: number, totalBeams: number) => {
    if (!canvasRef.current) return beam;

    const canvas = canvasRef.current;
    const column = index % 3;
    const spacing = canvas.width / 3;

    beam.y = canvas.height + 100;
    beam.x =
      column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
    beam.width = 100 + Math.random() * 100;
    beam.speed = 0.5 + Math.random() * 0.4;
    beam.hue = 190 + (index * 70) / totalBeams;
    beam.opacity = 0.2 + Math.random() * 0.1;
    return beam;
  };

  const drawBeam = (ctx: CanvasRenderingContext2D, beam: Beam) => {
    ctx.save();
    ctx.translate(beam.x, beam.y);
    ctx.rotate((beam.angle * Math.PI) / 180);

    // Calculate pulsing opacity
    const pulsingOpacity = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2);

    const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);

    // Enhanced gradient with multiple color stops
    gradient.addColorStop(0, `hsla(${beam.hue}, 85%, 65%, 0)`);
    gradient.addColorStop(
      0.1,
      `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`,
    );
    gradient.addColorStop(
      0.4,
      `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`,
    );
    gradient.addColorStop(
      0.6,
      `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`,
    );
    gradient.addColorStop(
      0.9,
      `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`,
    );
    gradient.addColorStop(1, `hsla(${beam.hue}, 85%, 65%, 0)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      // Solo inizializza i beams la prima volta, non durante i resize
      if (!initializedRef.current) {
        const totalBeams = MINIMUM_BEAMS * 1.5;
        beamsRef.current = Array.from({ length: totalBeams }, () =>
          createBeam(canvas.width, canvas.height),
        );
        initializedRef.current = true;
      }
    };

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = "blur(35px)";

      const totalBeams = beamsRef.current.length;
      beamsRef.current.forEach((beam, index) => {
        beam.y -= beam.speed;
        beam.pulse += beam.pulseSpeed;

        // Reset beam when it goes off screen
        if (beam.y + beam.length < -100) {
          resetBeam(beam, index, totalBeams);
        }

        drawBeam(ctx, beam);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    updateCanvasSize();
    animate();

    // Debounce resize per evitare troppi aggiornamenti su mobile
    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateCanvasSize, 100);
    };

    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(resizeTimeout);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      {/* Beams background (lowest z-index) */}
      <div className="fixed inset-0 -z-20 h-screen w-screen overflow-hidden">
        <div
          className={`absolute inset-0 ${
            isDark ? "bg-neutral-950" : "bg-white"
          }`}
          style={{
            minHeight: "100vh",
            minWidth: "100vw",
          }}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0"
            style={{
              filter: "blur(15px)",
              minHeight: "100vh",
              minWidth: "100vw",
            }}
          />

          <motion.div
            className={`absolute inset-0 ${
              isDark ? "bg-neutral-950/5" : "bg-white/5"
            }`}
            animate={{
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 10,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
            }}
            style={{
              backdropFilter: "blur(50px)",
            }}
          />
        </div>
      </div>

      {/* Content (higher z-index) */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
