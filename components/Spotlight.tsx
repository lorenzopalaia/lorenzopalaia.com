"use client";

import useMousePosition from "@/hooks/useMousePosition";

export default function Spotlight() {
  const { x, y } = useMousePosition();

  return (
    <div
      className="fixed inset-0 z-30 transition duration-300 pointer-events-none lg:absolute"
      style={{
        background: `radial-gradient(600px at ${x}px ${y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
      }}
    ></div>
  );
}
