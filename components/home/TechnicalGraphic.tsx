"use client";

/**
 * Quiet Systems style reminder: technical graphics communicate the current scene;
 * never add ornament without a structural role.
 */

import { motion, useReducedMotion } from "framer-motion";

export function TechnicalGraphic({
  variant = "hero",
}: {
  variant?: "hero" | "lab";
}) {
  const reduceMotion = useReducedMotion();
  const isLab = variant === "lab";

  return (
    <svg
      aria-hidden="true"
      className={`technical-graphic technical-graphic--${variant}`}
      viewBox="0 0 760 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={`grid-${variant}`}
          width="42"
          height="42"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 42 0 L 0 0 0 42"
            stroke="currentColor"
            strokeOpacity="0.09"
          />
        </pattern>
      </defs>
      <rect width="760" height="560" fill={`url(#grid-${variant})`} />
      <path
        d="M94 88H264V198H385"
        stroke="currentColor"
        strokeOpacity="0.62"
        strokeWidth="1.5"
      />
      <path
        d="M505 66V164H662V348H542"
        stroke="currentColor"
        strokeOpacity="0.42"
        strokeWidth="1.5"
      />
      <path
        d="M112 410H280V486H428"
        stroke="currentColor"
        strokeOpacity="0.42"
        strokeWidth="1.5"
      />
      <path
        d="M350 88V246H471V411H645"
        stroke="currentColor"
        strokeOpacity="0.62"
        strokeWidth="1.5"
      />
      <circle cx="94" cy="88" r="8" fill="currentColor" />
      <circle cx="385" cy="198" r="8" fill="currentColor" />
      <circle cx="505" cy="66" r="6" fill="currentColor" />
      <circle cx="280" cy="410" r="6" fill="currentColor" />
      <circle cx="645" cy="411" r="8" fill="currentColor" />
      <rect
        x="245"
        y="178"
        width="106"
        height="46"
        rx="2"
        stroke="currentColor"
        strokeOpacity="0.6"
      />
      <rect
        x="471"
        y="389"
        width="72"
        height="46"
        rx="2"
        stroke="currentColor"
        strokeOpacity="0.6"
      />
      <path
        d="M58 296C159 196 257 389 357 290C452 194 537 271 689 160"
        stroke="#F05A24"
        strokeWidth="3"
      />
      <motion.circle
        cx="0"
        cy="0"
        r="10"
        fill="#F05A24"
        animate={
          reduceMotion ? undefined : { cx: [58, 357, 689], cy: [296, 290, 160] }
        }
        transition={{
          duration: isLab ? 7 : 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <path d="M28 531H731" stroke="currentColor" strokeOpacity="0.32" />
      <path
        d="M28 521V541M146 521V541M264 521V541M382 521V541M500 521V541M618 521V541M731 521V541"
        stroke="currentColor"
        strokeOpacity="0.52"
      />
    </svg>
  );
}
