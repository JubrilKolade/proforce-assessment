"use client";

const sidebarLinks = [
  { id: 1, name: "Dashboard", href: "/dashboard", icon: "grid" },
  { id: 2, name: "Users", href: "/users", icon: "users", active: true },
  { id: 3, name: "Vouchers", href: "/vouchers", icon: "voucher" },
  { id: 4, name: "Analytics", href: "/analytics", icon: "analytics" },
  { id: 5, name: "Spotlight", href: "/spotlight", icon: "spark" },
];

function Icon({ type }: { type: string }) {
  const common = "h-4 w-4";

  if (type === "grid") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="4" rx="1.5" />
        <rect x="14" y="11" width="7" height="10" rx="1.5" />
        <rect x="3" y="12" width="7" height="9" rx="1.5" />
      </svg>
    );
  }

  if (type === "users") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <path d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" />
        <circle cx="10" cy="7" r="3" />
        <path d="M22 19v-1a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }

  if (type === "voucher") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H20v14H6.5A2.5 2.5 0 0 1 4 16.5v-9Z" />
        <path d="M8 9h8M8 12h8M8 15h5" />
      </svg>
    );
  }

  if (type === "analytics") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <path d="M4 18h16" />
        <path d="M7 15V9" />
        <path d="M12 15V5" />
        <path d="M17 15v-7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  );
}

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={[
          "flex w-[220px] shrink-0 flex-col border-r border-white/10 bg-[#0d1218] px-4 py-5 transition-transform duration-200",
          "fixed inset-y-0 left-0 z-40 md:static md:z-auto md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#1D2530] text-sm font-bold text-white">
            u
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">useID</span>
        </div>

        <nav className="mt-2 space-y-1">
          {sidebarLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={onClose}
              className={[
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                link.active
                  ? "bg-[#1b2430] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]"
                  : "text-zinc-400 hover:bg-[#121a23] hover:text-zinc-200",
              ].join(" ")}
            >
              <span className={link.active ? "text-[#9ee7d3]" : "text-zinc-500"}>
                <Icon type={link.icon} />
              </span>
              {link.name}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
