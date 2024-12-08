"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ClickEffectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mousePosition, setMousePosition] = useState<{
    x: number | null;
    y: number | null;
  }>({ x: null, y: null });
  const [clicks, setClicks] = useState<{ x: number; y: number; id: number }[]>(
    [],
  );
  const [isHovering, setIsHovering] = useState(false);

  // Handle mouse movement
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const newClick = {
      x: e.clientX,
      y: e.clientY,
      id: Date.now(),
    };
    setClicks((prev) => [...prev, newClick]);

    // Remove click effect after animation
    setTimeout(() => {
      setClicks((prev) => prev.filter((click) => click.id !== newClick.id));
    }, 1000);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Main cursor */}
      {mousePosition.x !== null && mousePosition.y !== null && (
        <motion.div
          className="pointer-events-none fixed z-50"
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
            scale: isHovering ? 1.5 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28,
            mass: 0.5,
          }}
          style={{
            transform: "translate(-50%, -50%)",
          }}
        ></motion.div>
      )}

      {/* Click effects */}
      <AnimatePresence>
        {clicks.map((click) => (
          <React.Fragment key={click.id}>
            {/* Ripple effect */}
            <motion.div
              className="pointer-events-none fixed z-50"
              style={{
                left: click.x,
                top: click.y,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="h-12 w-12 rounded-full border-2 border-primary" />
            </motion.div>

            {/* Particle explosion */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="pointer-events-none fixed z-50 h-2 w-2 rounded-full bg-primary"
                style={{
                  left: click.x,
                  top: click.y,
                }}
                initial={{ scale: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i * Math.PI) / 6) * 80,
                  y: Math.sin((i * Math.PI) / 6) * 80,
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  times: [0, 0.2, 1],
                }}
              />
            ))}
          </React.Fragment>
        ))}
      </AnimatePresence>

      {children}
    </div>
  );
}
