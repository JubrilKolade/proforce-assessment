"use client";

import { useState } from "react";

const GRADIENTS = [
  "from-[#f1d08a] via-[#d98c4a] to-[#7d4b2d]",
  "from-[#f7c4b3] via-[#d8a695] to-[#7a5f74]",
  "from-[#7de8d4] via-[#4ca4bb] to-[#2f5d7d]",
  "from-[#ffd088] via-[#f59e6a] to-[#af5a45]",
  "from-[#c0f5d7] via-[#7cc2b8] to-[#4e7d7c]",
  "from-[#e2d5ff] via-[#a67dcf] to-[#5b4d7d]",
];

function gradientFor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return GRADIENTS[hash % GRADIENTS.length];
}

function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
}

type AvatarProps = {
  name: string;
  src?: string;
  size?: number;
  ringWidth?: number;
  className?: string;
};

export function Avatar({ name, src, size = 96, ringWidth = 3, className = "" }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;
  const gradient = gradientFor(name || "user");

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br ${gradient} ${className}`}
      style={{ width: size, height: size, padding: ringWidth }}
    >
      {showImage ? (
        <img
          src={src}
          alt={name}
          className="h-full w-full rounded-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="grid h-full w-full place-items-center rounded-full bg-[#1e1e1e] text-sm font-semibold text-white">
          {initialsFor(name)}
        </div>
      )}
    </div>
  );
}
