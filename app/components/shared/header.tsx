"use client";

import { SearchIcon } from "@/app/components/icons";

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3 bg-[#121212] px-4 py-4 sm:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Toggle navigation menu"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#1e1e1e] text-zinc-200 transition hover:bg-[#2a2a2a] md:hidden"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
        </svg>
      </button>

      <div className="flex min-w-0 flex-1 items-center justify-start px-2 sm:px-6">
        <label className="flex w-full max-w-[420px] items-center gap-3 rounded-full bg-[#1e1e1e] px-4 py-2.5 text-sm text-zinc-400">
          <SearchIcon className="h-4 w-4 shrink-0" />
          <input
            aria-label="Search"
            placeholder="Search"
            className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
          />
        </label>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          className="relative grid h-9 w-9 place-items-center rounded-full bg-[#1e1e1e] text-zinc-200 transition hover:bg-[#2a2a2a]"
          aria-label="Notifications"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/bell.svg" alt="" aria-hidden="true" className="h-4 w-4" />
          <span className="absolute right-2 top-1.5 h-2.5 w-2.5 rounded-full bg-[#80d6c8] ring-2 ring-[#121212]" />
        </button>
        <div className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-[#f7d4b5] via-[#d7967c] to-[#6157b2] text-sm font-semibold text-[#10151a]">
          A
        </div>
      </div>
    </header>
  );
}