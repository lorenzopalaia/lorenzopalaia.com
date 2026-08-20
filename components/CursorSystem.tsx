"use client";

/**
 * Quiet Systems style reminder: the cursor is a restrained orientation aid on fine pointers,
 * not a replacement for accessible controls or visible focus states.
 */

import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CursorSystem() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const x = useSpring(0, { stiffness: 500, damping: 38, mass: 0.22 });
  const y = useSpring(0, { stiffness: 500, damping: 38, mass: 0.22 });

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor]",
      );
      setLabel(target?.dataset.cursor ?? "");
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      query.removeEventListener("change", update);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className={`cursor-system ${visible ? "is-visible" : ""} ${label ? "has-label" : ""}`}
      style={{ x, y }}
    >
      <span>{label || "+"}</span>
    </motion.div>
  );
}
