"use client";

import { SearchIcon } from "@/app/components/icons";

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#11161d] px-4 py-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Toggle navigation menu"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-[#1A212A] text-zinc-200 transition hover:bg-[#212b34] md:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        </button>
        <div className="hidden h-8 w-8 items-center justify-center rounded-full bg-[#151b23] text-sm font-semibold text-[#a9f6d4] sm:flex">
          u
        </div>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-center px-2 sm:px-6">
        <label className="flex w-full max-w-[530px] items-center gap-3 rounded-full border border-white/10 bg-[#1A212A] px-4 py-2.5 text-sm text-zinc-400 shadow-inner shadow-black/20">
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
          className="relative grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-[#1A212A] text-zinc-200 transition hover:bg-[#212b34]"
          aria-label="Notifications"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M10.5 3.5a3.5 3.5 0 0 1 3 0m-3 0a3.5 3.5 0 0 0-3 3V9a5 5 0 0 1-2 4l-1 1h17l-1-1a5 5 0 0 1-2-4V6.5a3.5 3.5 0 0 0-3-3m-3 0 3 0m3 0 3 0M9.5 18a2.5 2.5 0 0 0 5 0" />
          </svg>
          <span className="absolute right-2 top-1.5 h-2.5 w-2.5 rounded-full bg-[#80d6c8] ring-2 ring-[#11161d]" />
        </button>
        <div className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-[#f7d4b5] via-[#d7967c] to-[#6157b2] text-sm font-semibold text-[#10151a]">
          A
        </div>
      </div>
    </header>
  );
}
