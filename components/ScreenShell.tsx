"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHouse, FaTrophy } from "react-icons/fa6";

interface ScreenShellProps {
  children: ReactNode;
  showLogo?: boolean;
  className?: string;
}

export function ScreenShell({ children, showLogo = true, className = "" }: ScreenShellProps) {
  const pathname = usePathname();
  const isLeaderboard = pathname === "/leaderboard";

  return (
    <div className={`flex min-h-dvh flex-col bg-neo-yellow text-ink antialiased ${className}`}>
      {showLogo && (
        <header className="flex items-center justify-between border-b-3 border-ink px-3 sm:px-8 py-2.5 bg-neo-yellow sticky top-0 z-30 shadow-brutal gap-2">
          <Link href="/" className="group flex items-center gap-2 sm:gap-3 min-w-0 shrink">
            <img
              src="/images/icon.png"
              alt="TLC Logo"
              className="h-7 sm:h-9 w-auto shrink-0 object-contain transition-transform group-hover:scale-105"
            />
            <span
              className="font-bold text-ink text-base sm:text-xl leading-none tracking-tight shrink-0 group-hover:text-neo-magenta transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              DoodleBot 🤖
            </span>
          </Link>

          {isLeaderboard ? (
            <Link
              href="/"
              className="inline-flex h-11 min-w-[140px] items-center justify-center gap-2 px-5 text-sm font-bold bg-neo-cyan text-ink hover:brightness-95 rounded-xl border-3 border-ink shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg transition-all active:scale-95 shrink-0 whitespace-nowrap"
            >
              <FaHouse aria-hidden="true" className="text-ink" />
              <span>Home</span>
            </Link>
          ) : (
            <Link
              href="/leaderboard"
              className="inline-flex h-11 min-w-[140px] items-center justify-center gap-2 px-5 text-sm font-bold bg-neo-magenta text-white hover:bg-neo-magenta-dark rounded-xl border-3 border-ink shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg transition-all active:scale-95 shrink-0 whitespace-nowrap"
            >
              <FaTrophy aria-hidden="true" className="text-neo-yellow" />
              <span>Leaderboard</span>
            </Link>
          )}
        </header>
      )}
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
