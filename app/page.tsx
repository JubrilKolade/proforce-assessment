"use client";

import { useMemo, useState } from "react";
import { Header } from "@/app/components/shared/header";
import { Sidebar } from "@/app/components/shared/sidebar";
import { SearchUsers } from "@/app/components/shared/search-user";
import { UserGrid } from "@/app/components/shared/user-grid";
import { AddUserModal } from "@/app/components/shared/add-user-modal";
import { UserDetailsModal } from "@/app/components/shared/user-details-modal";
import { PlusIcon } from "@/app/components/icons";
import { useGetUsersQuery } from "@/lib/store/api/usersApi";
import type { User } from "@/lib/types/user";

export default function Home() {
  const { data: users = [], isLoading, isFetching, isError, refetch } = useGetUsersQuery();

  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return users;
    return users.filter((user) => user.name.toLowerCase().includes(query));
  }, [users, search]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#121212] text-white">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenuClick={() => setSidebarOpen((prev) => !prev)} />

        <main className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 pb-6 pt-6 sm:px-8 sm:pt-8 lg:px-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                User directory
              </h1>
              <p className="mt-2 text-sm text-zinc-400">Find a list of users below</p>
            </div>

            <button
              type="button"
              onClick={() => setIsAddOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-[#121212] transition hover:bg-zinc-200"
            >
              <PlusIcon className="h-4 w-4" />
              Add new
            </button>
          </div>

          <SearchUsers
            value={search}
            onChange={setSearch}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          <UserGrid
            users={filteredUsers}
            isLoading={isLoading}
            isError={isError}
            isSearching={search.trim().length > 0}
            viewMode={viewMode}
            onSelect={setSelectedUser}
            onRetry={refetch}
          />

          {isFetching && !isLoading && (
            <p className="mt-3 text-center text-xs text-zinc-500" role="status">
              Refreshing…
            </p>
          )}
        </main>
      </div>

      <AddUserModal open={isAddOpen} onClose={() => setIsAddOpen(false)} />
      <UserDetailsModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
}
