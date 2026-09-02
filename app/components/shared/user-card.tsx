"use client";

import { Avatar } from "@/app/components/shared/avatar";
import type { User } from "@/lib/types/user";

type UserCardProps = {
  user: User;
  onSelect: (user: User) => void;
};

export function UserCard({ user, onSelect }: UserCardProps) {
  return (
    <article className="h-full rounded-[22px] border border-white/10 bg-[#171d24] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
      <button
        type="button"
        onClick={() => onSelect(user)}
        className="flex w-full flex-col items-center rounded-2xl p-1 text-left transition hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        aria-haspopup="dialog"
      >
        <div className="mb-4 flex items-center justify-center">
          <Avatar name={user.name} src={user.avatar} size={96} />
        </div>

        <div className="w-full text-center">
          <h2 className="truncate text-[1.15rem] font-semibold text-white">{user.name}</h2>
          <p className="mt-1 truncate text-xs text-zinc-400">{user.email ?? "No email on file"}</p>
        </div>
      </button>
    </article>
  );
}
