"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FloatingItem {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  symbol: string;
  drift: number;
}

const SYMBOLS = ["❤️", "💖", "🍔", "💕", "🍔", "💗"];

export default function FloatingHearts() {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    const count = 22;
    const generated: FloatingItem[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 94 + 3,
      size: Math.floor(Math.random() * 18) + 18,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.35 + 0.2,
      symbol: SYMBOLS[i % SYMBOLS.length],
      drift: (Math.random() - 0.5) * 40,
    }));
    setItems(generated);
  }, []);

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {items.map((item) => (
        <motion.span
          key={item.id}
          initial={{
            y: "110dvh",
            x: 0,
            opacity: 0,
            scale: 0.8,
            rotate: -10,
          }}
          animate={{
            y: "-15dvh",
            x: [0, item.drift, -item.drift * 0.5, 0],
            opacity: [0, item.opacity, item.opacity, 0],
            scale: [0.8, 1.05, 0.95, 1],
            rotate: [-10, 12, -8, 10],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            left: `${item.x}%`,
            fontSize: `${item.size}px`,
          }}
          className="absolute bottom-0 will-change-transform"
        >
          {item.symbol}
        </motion.span>
      ))}
    </div>
  );
}
