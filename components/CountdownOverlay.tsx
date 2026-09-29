"use client";

import React, { useEffect, useState } from "react";
import type { Word } from "../lib/types";

interface CountdownOverlayProps {
  word: Word;
  onComplete: () => void;
}

const BG_GRADIENTS = [
  "from-fun-coral via-fun-pink to-fun-purple",
  "from-fun-orange via-fun-yellow to-fun-green",
  "from-neo-violet via-neo-blue to-neo-cyan",
];

export function CountdownOverlay({ word, onComplete }: CountdownOverlayProps) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count < 0) {
      onComplete();
      return;
    }

    if (count === 0) {
      const goTimer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(goTimer);
    }

    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [count, onComplete]);

  // SVG ring constants: radius=45, circumference = 2*PI*45 ≈ 283
  const circumference = 283;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br ${
        BG_GRADIENTS[count % BG_GRADIENTS.length]
      } text-white p-6 animate-fade-in transition-all duration-500`}
    >
      <div className="text-center space-y-6">
        <p className="neo-badge bg-white text-ink shadow-brutal uppercase tracking-widest">
          🖊️ Get ready to draw!
        </p>

        <h2
          className="text-5xl sm:text-6xl font-bold capitalize text-white tracking-wide drop-shadow-[4px_4px_0px_#1A1A2E]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          &quot;{word.id}&quot;
        </h2>

        {/* Countdown with chunky black border ring around the SVG circle */}
        <div className="relative flex items-center justify-center h-52 w-52 mx-auto rounded-full bg-ink/25 border-4 border-ink shadow-brutal-lg">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(26,26,46,0.35)"
              strokeWidth="6"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#FFE500"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              style={{
                animation: "countdownRing 3.5s linear forwards",
                filter: "drop-shadow(0 0 8px rgba(255,229,0,0.7))",
              }}
            />
          </svg>
          <span
            className="text-8xl sm:text-9xl font-black text-white animate-scale-pop drop-shadow-[4px_4px_0px_#1A1A2E]"
            style={{ fontFamily: "var(--font-display)" }}
            key={count}
          >
            {count > 0 ? count : "GO!"}
          </span>
        </div>

        <p className="text-sm text-white font-bold max-w-xs mx-auto drop-shadow-[1px_1px_0px_#1A1A2E]">
          Draw fast & clear — the AI is watching! 🤖
        </p>
      </div>
    </div>
  );
}
