"use client";

import React, { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  interactive?: boolean;
}

export function Card({
  children,
  selected = false,
  interactive = false,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`neo-card p-5 transition-all ${
        interactive ? "cursor-pointer neo-card-hover active:scale-[0.98]" : ""
      } ${
        selected ? "ring-4 ring-neo-magenta/40 border-neo-magenta bg-neo-magenta/5" : "border-ink"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
