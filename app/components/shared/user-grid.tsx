"use client";

import { UserCard } from "@/app/components/shared/user-card";
import { AlertIcon, SearchIcon, UserOffIcon } from "@/app/components/icons";
import type { User } from "@/lib/types/user";

type UserGridProps = {
  users: User[];
  isLoading: boolean;
  isError: boolean;
  isSearching: boolean;
  viewMode?: "grid" | "list";
  onSelect: (user: User) => void;
  onRetry: () => void;
};

export function UserGrid({ users, isLoading, isError, isSearching, viewMode = "grid", onSelect, onRetry }: UserGridProps) {
  const isListView = viewMode === "list";

  if (isError) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-2xl bg-[#1e1e1e] px-6 py-16 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-rose-500/10 text-rose-400">
          <AlertIcon className="h-6 w-6" />
        </span>
        <div>
          <p className="font-semibold text-white">We couldn&apos;t load the user directory</p>
          <p className="mt-1 text-sm text-zinc-400">Check your connection and try again.</p>
        </div>
        <button
          type="button"
          onClick={onRetry}
          className="rounded-xl bg-[#2b2b2b] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#333333]"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3" aria-busy="true" aria-label="Loading users">
        {Array.from({ length: 9 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl bg-[#1e1e1e] px-6 py-16 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-white/5 text-zinc-400">
          {isSearching ? <SearchIcon className="h-6 w-6" /> : <UserOffIcon className="h-6 w-6" />}
        </span>
        <div>
          <p className="font-semibold text-white">{isSearching ? "No matching users" : "No users yet"}</p>
          <p className="mt-1 text-sm text-zinc-400">
            {isSearching ? "Try a different name." : "Add your first user to get started."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pr-1">
      {isListView ? (
        <div className="space-y-4" role="list" aria-label="User directory list view">
          {users.map((user) => (
            <div key={user.id} role="listitem">
              <UserCard user={user} onSelect={onSelect} compact />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3" role="list" aria-label="User directory">
          {users.map((user) => (
            <div key={user.id} role="listitem">
              <UserCard user={user} onSelect={onSelect} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-[22px] bg-[#1e1e1e] p-4">
      <div className="mb-4 flex items-center justify-center">
        <div className="h-24 w-24 rounded-full bg-white/5" />
      </div>
      <div className="mx-auto mb-2 h-4 w-2/3 rounded bg-white/5" />
      <div className="mx-auto h-3 w-1/2 rounded bg-white/5" />
    </div>
  );
}
