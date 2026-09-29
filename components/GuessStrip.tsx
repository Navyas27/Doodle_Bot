"use client";

import React from "react";
import { FaBolt } from "react-icons/fa6";

interface GuessStripProps {
  topGuess: string | null;
  confidence?: number;
  streak?: number;
}

export function GuessStrip({ topGuess, confidence, streak = 0 }: GuessStripProps) {
  return (
    <div
      className={`min-h-[56px] w-full flex items-center justify-between rounded-2xl px-4 py-3 transition-all border-3 border-ink shadow-brutal ${
        topGuess
          ? "bg-gradient-to-r from-neo-magenta/10 to-neo-violet/10 border-neo-magenta/30 bg-white"
          : "bg-white"
      }`}
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <span className="text-lg shrink-0">{topGuess ? "🤖" : "✏️"}</span>
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-ink-muted">
            AI thinks...
          </span>
          <span
            className="font-bold text-lg text-ink truncate capitalize"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {topGuess ? topGuess : "Start doodling!"}
          </span>
        </div>
      </div>

      {topGuess && (
        <div className="flex items-center gap-2 shrink-0">
          {streak > 0 && (
            <span className="neo-badge bg-neo-orange text-white gap-1">
              <FaBolt aria-hidden="true" /> {streak}/2
            </span>
          )}
          {confidence !== undefined && (
            <span className="text-sm font-extrabold text-neo-violet">
              {Math.round(confidence * 100)}%
            </span>
          )}
        </div>
      )}
    </div>
  );
}
