"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRobot, FaTrophy } from "react-icons/fa6";
import { Button } from "../components/Button";
import { ScreenShell } from "../components/ScreenShell";
import { createParticipant } from "../lib/data";
import { isCleanName } from "../lib/profanityFilter";
import { MAX_NAME_LENGTH, SESSION_STORAGE_KEY } from "../lib/constants";

export default function LandingPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if session already exists
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.name) {
            setName(parsed.name);
          }
        } catch (_) { }
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      setError("Please enter your name to start");
      return;
    }

    if (trimmed.length > MAX_NAME_LENGTH) {
      setError(`Name must be ${MAX_NAME_LENGTH} characters or less`);
      return;
    }

    if (!isCleanName(trimmed)) {
      setError("Please choose a appropriate name");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const participantId = await createParticipant(trimmed);
      sessionStorage.setItem(
        SESSION_STORAGE_KEY,
        JSON.stringify({ participantId, name: trimmed })
      );
      router.push("/play");
    } catch (err) {
      console.error(err);
      setError("Failed to initialize session. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <ScreenShell showLogo={false} className="justify-center relative bg-neo-yellow overflow-hidden">
      {/* Subtle neo-pattern background overlay */}
      <div className="absolute inset-0 neo-pattern pointer-events-none" />

      {/* Floating decorative neo-max doodle elements across random positions */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        <span className="absolute top-6 left-4 sm:left-8 text-3xl sm:text-4xl animate-float rotate-[-12deg]" style={{ animationDelay: "0s" }}>🎨</span>
        <span className="absolute top-10 left-1/4 text-2xl sm:text-3xl animate-float rotate-[15deg]" style={{ animationDelay: "1.1s" }}>✏️</span>
        <span className="absolute top-6 right-1/4 text-2xl sm:text-3xl animate-float rotate-[-8deg]" style={{ animationDelay: "0.5s" }}>⭐</span>
        <span className="absolute top-12 right-5 sm:right-10 text-3xl sm:text-4xl animate-float rotate-[18deg]" style={{ animationDelay: "0.7s" }}>⚡</span>

        <span className="absolute top-1/4 left-3 sm:left-12 text-2xl sm:text-4xl animate-float rotate-[10deg]" style={{ animationDelay: "1.4s" }}>🔥</span>
        <span className="absolute top-[28%] right-3 sm:right-12 text-2xl sm:text-4xl animate-float rotate-[-14deg]" style={{ animationDelay: "0.9s" }}>🖍️</span>

        <span className="absolute top-[45%] left-2 sm:left-8 text-3xl sm:text-4xl animate-float rotate-[-18deg]" style={{ animationDelay: "1.6s" }}>🎯</span>
        <span className="absolute top-[48%] right-2 sm:right-8 text-3xl sm:text-4xl animate-float rotate-[12deg]" style={{ animationDelay: "0.3s" }}>👾</span>

        <span className="absolute bottom-[28%] left-4 sm:left-14 text-2xl sm:text-3xl animate-float rotate-[20deg]" style={{ animationDelay: "1.8s" }}>💡</span>
        <span className="absolute bottom-[30%] right-4 sm:right-14 text-2xl sm:text-3xl animate-float rotate-[-10deg]" style={{ animationDelay: "1.0s" }}>🌈</span>

        <span className="absolute bottom-20 left-6 sm:left-10 text-2xl sm:text-4xl animate-float rotate-[-12deg]" style={{ animationDelay: "1.2s" }}>✨</span>
        <span className="absolute bottom-8 left-1/3 text-2xl sm:text-3xl animate-float rotate-[8deg]" style={{ animationDelay: "0.6s" }}>🕹️</span>
        <span className="absolute bottom-10 right-1/3 text-2xl sm:text-3xl animate-float rotate-[-15deg]" style={{ animationDelay: "1.5s" }}>🏆</span>
        <span className="absolute bottom-14 right-6 sm:right-10 text-3xl sm:text-4xl animate-float rotate-[14deg]" style={{ animationDelay: "0.4s" }}>🚀</span>

        <span className="hidden md:block absolute top-[18%] left-[18%] text-3xl animate-float rotate-[-6deg]" style={{ animationDelay: "2.0s" }}>💥</span>
        <span className="hidden md:block absolute top-[20%] right-[18%] text-3xl animate-float rotate-[16deg]" style={{ animationDelay: "1.3s" }}>🪄</span>
        <span className="hidden md:block absolute bottom-[18%] left-[20%] text-3xl animate-float rotate-[12deg]" style={{ animationDelay: "0.8s" }}>🌟</span>
        <span className="hidden md:block absolute bottom-[22%] right-[20%] text-3xl animate-float rotate-[-16deg]" style={{ animationDelay: "1.7s" }}>🎉</span>
      </div>

      <div className="relative z-10 flex h-dvh flex-col items-center justify-between p-6 max-w-md lg:max-w-xl mx-auto w-full text-center">
        {/* Header Branding Lockup */}
        <div className="pt-4 sm:pt-8 space-y-4 animate-bounce-in">
          <div className="relative inline-flex items-center justify-center neo-card px-6 py-3 bg-white">
            <span
              aria-hidden="true"
              className="absolute -top-3 -right-3 text-lg bg-neo-magenta text-white border-2 border-ink rounded-full w-8 h-8 flex items-center justify-center shadow-brutal rotate-[14deg]"
            >
              ✨
            </span>
            <img
              src="/images/icon.png"
              alt="TLC Logo"
              className="h-14 sm:h-20 w-auto object-contain"
            />
          </div>

          <div className="space-y-2 pt-2">
            <h1
              className="text-4xl sm:text-6xl font-bold text-ink tracking-wide drop-shadow-[3px_3px_0px_#FFFFFF]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              DoodleBot{" "}
              <FaRobot
                aria-hidden="true"
                className="inline align-[-0.125em] text-neo-magenta hover:rotate-12 transition-transform drop-shadow-[2px_2px_0px_#1A1A2E]"
              />
            </h1>
            <p className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-neo-magenta to-neo-violet bg-clip-text text-transparent text-balance">
              Draw it. Beat the AI. Top the board.
            </p>
          </div>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="relative w-full space-y-4 my-auto neo-card bg-white p-6 rounded-2xl shadow-brutal-lg"
        >
          <span
            aria-hidden="true"
            className="absolute -top-4 -left-3 text-xl bg-neo-cyan border-2 border-ink rounded-full w-9 h-9 flex items-center justify-center shadow-brutal rotate-[-12deg]"
          >
            🖍️
          </span>
          <span
            aria-hidden="true"
            className="absolute -bottom-3 -right-3 text-xl bg-neo-orange border-2 border-ink rounded-full w-9 h-9 flex items-center justify-center shadow-brutal rotate-[12deg]"
          >
            ⚡
          </span>

          <div className="space-y-2 text-left">
            <label
              htmlFor="name-input"
              className="text-xs font-extrabold text-neo-magenta uppercase tracking-wider block"
            >
              Enter Your Name / Alias
            </label>
            <input
              id="name-input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. Alex"
              maxLength={MAX_NAME_LENGTH}
              className="w-full h-14 px-4 text-lg font-bold rounded-xl border-3 border-ink focus:border-neo-magenta focus:ring-2 focus:ring-neo-magenta/30 focus:outline-none transition-all bg-neo-surface-muted/40 text-ink shadow-inner"
              autoFocus
            />
            {error && <p className="text-xs font-bold text-urgent text-left">{error}</p>}
          </div>

          <div className="flex flex-col gap-3 pt-1">
            <Button type="submit" variant="primary" fullWidth isLoading={isSubmitting}>
              Start Playing 🚀
            </Button>

            <Link
              href="/leaderboard"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-bold bg-neo-cyan text-ink border-3 border-ink shadow-brutal hover:brightness-95 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg transition-all active:scale-[0.95] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <FaTrophy aria-hidden="true" className="text-ink" />
              <span>Leaderboard</span>
            </Link>
          </div>
        </form>

        {/* Footer info */}
        <div className="pb-4 space-y-1">
          <p className="neo-badge bg-white text-ink shadow-brutal gap-1.5">
            <span className="font-extrabold text-neo-magenta">TLC</span>
            <span className="text-neo-violet font-black">•</span>
            <span>ODS AI Futures</span>
          </p>
        </div>
      </div>
    </ScreenShell>
  );
}
