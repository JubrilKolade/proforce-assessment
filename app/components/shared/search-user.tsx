"use client";

import { SearchIcon } from "@/app/components/icons";

type SearchUsersProps = {
  value: string;
  onChange: (value: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
};

export function SearchUsers({ value, onChange, viewMode, onViewModeChange }: SearchUsersProps) {
  return (
    <div className="mb-6 flex w-full items-center gap-3 rounded-2xl bg-[#1e1e1e] px-3 py-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
      <label className="flex min-w-0 flex-1 items-center gap-3 rounded-xl bg-[#1e1e1e] px-3 py-2.5 text-sm text-zinc-400 focus-within:ring-1 focus-within:ring-white/20">
        <SearchIcon className="h-4 w-4 shrink-0" />
        <input
          aria-label="Search user by name"
          placeholder="Search user by name"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
        />
      </label>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="List view"
          onClick={() => onViewModeChange("list")}
          className={[
            "grid h-9 w-9 place-items-center rounded-lg border transition",
            viewMode === "list"
              ? "border-white/20 bg-white/5 text-white"
              : "border-transparent bg-transparent text-zinc-500 hover:border-white/10 hover:text-zinc-300",
          ].join(" ")}
        >
          <img src="/list.svg" alt="" aria-hidden="true" className="h-4 w-4" />
        </button>

        <button
          type="button"
          aria-label="Grid view"
          onClick={() => onViewModeChange("grid")}
          className={[
            "grid h-9 w-9 place-items-center rounded-lg border transition",
            viewMode === "grid"
              ? "border-white/20 bg-white/5 text-white"
              : "border-transparent bg-transparent text-zinc-500 hover:border-white/10 hover:text-zinc-300",
          ].join(" ")}
        >
          <img src="/grid.svg" alt="" aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
