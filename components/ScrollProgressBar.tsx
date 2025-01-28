"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ScrollProgressBar: React.FC = () => {
  const [scrollWidth, setScrollWidth] = useState(0);
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (scrollTop / windowHeight) * 100;
      setScrollWidth(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 h-1 w-full">
      <div
        className="h-full"
        style={{
          width: `${scrollWidth}%`,
          backgroundColor: color,
          transition: "width 0.1s ease-in-out",
        }}
      ></div>
    </div>
  );
};

export default ScrollProgressBar;
