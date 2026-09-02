"use client";

import { SearchIcon } from "@/app/components/icons";

type SearchUsersProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchUsers({ value, onChange }: SearchUsersProps) {
  return (
    <label className="mb-6 flex w-full max-w-[360px] items-center gap-3 rounded-xl border border-white/10 bg-[#191e26] px-4 py-3 text-sm text-zinc-400 shadow-inner shadow-black/20 focus-within:border-white/25">
      <SearchIcon className="h-4 w-4 shrink-0" />
      <input
        aria-label="Search user by name"
        placeholder="Search user by name"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
      />
    </label>
  );
}
