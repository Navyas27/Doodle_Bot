"use client";

import React from "react";
import type { Word } from "../lib/types";

interface WordSelectorProps {
  words: Word[];
  onSelect: (word: Word) => void;
  disabled?: boolean;
}

const WORD_EMOJIS: Record<string, string> = {
  easy: "🟢",
  medium: "🟡",
  hard: "🔴",
};

const CARD_COLORS = [
  "bg-gradient-to-r from-neo-magenta/30 to-neo-orange/30 hover:from-neo-magenta/45 hover:to-neo-orange/45",
  "bg-gradient-to-r from-neo-violet/30 to-neo-blue/30 hover:from-neo-violet/45 hover:to-neo-blue/45",
  "bg-gradient-to-r from-neo-cyan/40 to-neo-lime/40 hover:from-neo-cyan/55 hover:to-neo-lime/55",
];

export function WordSelector({ words, onSelect, disabled = false }: WordSelectorProps) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink/50 backdrop-blur-sm animate-fade-in p-4">
      <div className="relative flex flex-col w-full max-w-md mx-auto space-y-5 p-6 sm:p-8 neo-card border-4 border-ink rounded-3xl shadow-brutal-lg animate-bounce-in">
        {/* Sticker-like emoji decorations around the modal */}
        <span
          aria-hidden="true"
          className="absolute -top-4 -left-3 text-3xl bg-neo-yellow border-2 border-ink rounded-full w-11 h-11 flex items-center justify-center shadow-brutal rotate-[-12deg]"
        >
          🎨
        </span>
        <span
          aria-hidden="true"
          className="absolute -top-4 -right-3 text-2xl bg-neo-magenta text-white border-2 border-ink rounded-full w-10 h-10 flex items-center justify-center shadow-brutal rotate-[12deg]"
        >
          ✨
        </span>

        {/* Fun header */}
        <div className="text-center space-y-2">
          <div className="text-4xl animate-wiggle">✏️</div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-ink tracking-wide"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Pick a word!
          </h2>
          <p className="text-sm font-bold text-ink-muted">
            {disabled ? "⏳ Warming up the AI brain..." : "What do you want to doodle?"}
          </p>
        </div>

        {/* Word cards */}
        <div className="grid grid-cols-1 gap-3.5">
          {words.map((word, i) => (
            <button
              key={word.id}
              disabled={disabled}
              onClick={() => onSelect(word)}
              className={`neo-card neo-card-hover flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r
                transition-all duration-150 cursor-pointer
                active:scale-[0.98]
                disabled:opacity-50 disabled:pointer-events-none disabled:hover:translate-x-0 disabled:hover:translate-y-0
                ${CARD_COLORS[i % CARD_COLORS.length]}`}
            >
              <span
                className="text-2xl font-bold capitalize text-ink"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {word.id}
              </span>
              <span className="neo-badge bg-white text-ink uppercase tracking-wider gap-1.5">
                {WORD_EMOJIS[word.difficulty] || "⚪"} {word.difficulty}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
