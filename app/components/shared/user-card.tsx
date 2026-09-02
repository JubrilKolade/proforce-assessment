"use client";

import { Avatar } from "@/app/components/shared/avatar";
import type { User } from "@/lib/types/user";

type UserCardProps = {
  user: User;
  onSelect: (user: User) => void;
  compact?: boolean;
};

export function UserCard({ user, onSelect, compact = false }: UserCardProps) {
  const isCompact = compact;

  return (
    <article className={isCompact ? "h-full rounded-[22px] bg-[#1e1e1e] p-3" : "h-full rounded-[22px] bg-[#1e1e1e] px-5 py-8"}>
      <button
        type="button"
        onClick={() => onSelect(user)}
        className={[
          "w-full rounded-2xl p-1 text-left transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
          isCompact ? "flex items-center gap-4" : "flex flex-col items-center",
        ].join(" ")}
        aria-haspopup="dialog"
      >
        <div className={isCompact ? "flex shrink-0 items-center justify-center" : "mb-4 flex items-center justify-center"}>
          <Avatar name={user.name} src={user.avatar} size={isCompact ? 72 : 96} />
        </div>

        <div className={isCompact ? "min-w-0 flex-1 text-left" : "w-full text-center"}>
          <h2 className="truncate text-[1.1rem] font-semibold text-white">{user.name}</h2>
          <p className="mt-1 truncate text-xs text-zinc-400">{user.email ?? "No email on file"}</p>
        </div>
      </button>
    </article>
  );
}
