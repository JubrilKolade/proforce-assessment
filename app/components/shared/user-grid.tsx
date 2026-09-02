"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { UserCard } from "@/app/components/shared/user-card";
import { AlertIcon, SearchIcon, UserOffIcon } from "@/app/components/icons";
import type { User } from "@/lib/types/user";

const ROW_GAP = 20; // matches Tailwind gap-5
const ROW_ESTIMATE = 236;

type UserGridProps = {
  users: User[];
  isLoading: boolean;
  isError: boolean;
  isSearching: boolean;
  onSelect: (user: User) => void;
  onRetry: () => void;
};

/** Number of grid columns based on the *container's* width, mirroring the
 * sm/xl breakpoints of the original static layout but computed from the
 * panel itself so it stays correct regardless of sidebar width. */
function useResponsiveColumns(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? el.clientWidth;
      if (width >= 1024) setColumns(3);
      else if (width >= 640) setColumns(2);
      else setColumns(1);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  return columns;
}

export function UserGrid({ users, isLoading, isError, isSearching, onSelect, onRetry }: UserGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const columns = useResponsiveColumns(scrollRef);

  const rows = useMemo(() => {
    const chunked: User[][] = [];
    for (let i = 0; i < users.length; i += columns) {
      chunked.push(users.slice(i, i + columns));
    }
    return chunked;
  }, [users, columns]);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_ESTIMATE,
    overscan: 4,
    gap: ROW_GAP,
  });

  if (isError) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-2xl border border-white/5 bg-[#141a22] px-6 py-16 text-center">
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
          className="rounded-xl border border-white/10 bg-[#1a212b] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#202a34]"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3" aria-busy="true" aria-label="Loading users">
        {Array.from({ length: 9 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl border border-white/5 bg-[#141a22] px-6 py-16 text-center">
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
    <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto pr-1">
      <div
        style={{ height: rowVirtualizer.getTotalSize(), position: "relative" }}
        role="list"
        aria-label="User directory"
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const rowUsers = rows[virtualRow.index] ?? [];
          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
              }}
              className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
            >
              {rowUsers.map((user) => (
                <div key={user.id} role="listitem">
                  <UserCard user={user} onSelect={onSelect} />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-[22px] border border-white/10 bg-[#171d24] p-4">
      <div className="mb-4 flex items-center justify-center">
        <div className="h-24 w-24 rounded-full bg-white/5" />
      </div>
      <div className="mx-auto mb-2 h-4 w-2/3 rounded bg-white/5" />
      <div className="mx-auto h-3 w-1/2 rounded bg-white/5" />
    </div>
  );
}
