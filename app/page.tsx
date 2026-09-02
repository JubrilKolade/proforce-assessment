import { Header } from "./components/shared/header";
import { Sidebar } from "./components/shared/sidebar";
import { UserCard } from "./components/shared/user-card";

const users = [
  {
    name: "Alex Morgan",
    email: "alex.morgan@company.com",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    accent: "from-[#f1d08a] via-[#d98c4a] to-[#7d4b2d]",
  },
  {
    name: "Jordan Lee",
    email: "jordan.lee@company.com",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    accent: "from-[#f7c4b3] via-[#d8a695] to-[#7a5f74]",
  },
  {
    name: "Alex Morgan",
    email: "alex.morgan@company.com",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    accent: "from-[#7de8d4] via-[#4ca4bb] to-[#2f5d7d]",
  },
  {
    name: "Taylor Smith",
    email: "taylor.smith@company.com",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    accent: "from-[#ffd088] via-[#f59e6a] to-[#af5a45]",
  },
  {
    name: "Morgan Riley",
    email: "morgan.riley@company.com",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    accent: "from-[#c0f5d7] via-[#7cc2b8] to-[#4e7d7c]",
  },
  {
    name: "Jamie Wilson",
    email: "jamie.wilson@company.com",
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=400&q=80",
    accent: "from-[#e2d5ff] via-[#a67dcf] to-[#5b4d7d]",
  },
  {
    name: "Jamie Wilson",
    email: "jamie.wilson@company.com",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    accent: "from-[#9fe7cf] via-[#52b9bb] to-[#2d5967]",
  },
  {
    name: "Avery Thomas",
    email: "avery.thomas@company.com",
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=400&q=80",
    accent: "from-[#f9d8b5] via-[#db8d5e] to-[#755e7b]",
  },
  {
    name: "Alex Morgan",
    email: "alex.morgan@company.com",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    accent: "from-[#bba7ff] via-[#7d7dd9] to-[#3f4c8a]",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0d12] px-6 py-6 text-white">
      <div className="mx-auto flex h-[calc(100vh-3rem)] max-w-[1300px] overflow-hidden rounded-[28px] border border-white/10 bg-[#11161d] shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
        <Sidebar />

        <section className="flex min-w-0 flex-1 flex-col bg-[#131a22]">
          <Header />

          <div className="flex-1 overflow-y-auto px-8 pb-8 pt-5">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-white">
                  User directory
                </h1>
                <p className="mt-2 text-sm text-zinc-400">Find a lot of users below</p>
              </div>

              <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#1a212b] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#202a34]">
                <span className="text-lg leading-none">+</span>
                Add new
              </button>
            </div>

            <div className="mb-6 flex w-full max-w-[360px] items-center gap-3 rounded-xl border border-white/10 bg-[#191e26] px-4 py-3 text-sm text-zinc-400 shadow-inner shadow-black/20">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="6" />
                <path d="m16 16 5 5" />
              </svg>
              <input
                aria-label="Search user by name"
                placeholder="Search user by name"
                className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {users.map((user, index) => (
                <UserCard key={`${user.name}-${index}`} {...user} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

