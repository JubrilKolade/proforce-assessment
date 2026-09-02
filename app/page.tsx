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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return users;
    return users.filter((user) => user.name.toLowerCase().includes(query));
  }, [users, search]);

  return (
    <main className="min-h-screen bg-[#0a0d12] px-0 py-0 text-white sm:px-6 sm:py-6">
      <div className="mx-auto flex h-screen max-w-[1300px] overflow-hidden border border-white/10 bg-[#11161d] shadow-[0_20px_80px_rgba(0,0,0,0.5)] sm:h-[calc(100vh-3rem)] sm:rounded-[28px]">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <section className="flex min-w-0 flex-1 flex-col bg-[#131a22]">
          <Header onMenuClick={() => setSidebarOpen((prev) => !prev)} />

          <div className="flex min-h-0 flex-1 flex-col px-4 pb-6 pt-5 sm:px-8 sm:pb-8">
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
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#1a212b] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#202a34]"
              >
                <PlusIcon className="h-4 w-4" />
                Add new
              </button>
            </div>

            <SearchUsers value={search} onChange={setSearch} />

            <UserGrid
              users={filteredUsers}
              isLoading={isLoading}
              isError={isError}
              isSearching={search.trim().length > 0}
              onSelect={setSelectedUser}
              onRetry={refetch}
            />

            {isFetching && !isLoading && (
              <p className="mt-3 text-center text-xs text-zinc-500" role="status">
                Refreshing…
              </p>
            )}
          </div>
        </section>
      </div>

      <AddUserModal open={isAddOpen} onClose={() => setIsAddOpen(false)} />
      <UserDetailsModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </main>
  );
}
