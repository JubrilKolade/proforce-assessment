"use client";

const sidebarLinks = [
  { id: 1, name: "Dashboard", href: "/dashboard", icon: "/dashboard.svg" },
  { id: 2, name: "Users", href: "/users", icon: "/users.svg", active: true },
  { id: 3, name: "Vouchers", href: "/vouchers", icon: "/vouchers.svg" },
  { id: 4, name: "Analytics", href: "/analytics", icon: "/analytics.svg" },
  { id: 5, name: "Spotlight", href: "/spotlight", icon: "/spotlight.svg" },
];

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div className="fixed inset-0 z-30 bg-black/60 md:hidden" onClick={onClose} aria-hidden="true" />
      )}

      <aside
        className={[
          "flex w-[220px] shrink-0 flex-col bg-[#1e1e1e] px-4 py-6 transition-transform duration-200",
          "fixed inset-y-0 left-0 z-40 md:static md:z-auto md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="mb-9 flex items-center px-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="useID" className="h-6 w-auto" />
        </div>

        <nav className="space-y-1">
          {sidebarLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={onClose}
              className={[
                "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                link.active
                  ? "bg-[#2b2b2b] text-white"
                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200",
              ].join(" ")}
            >
              {link.active && (
                <span
                  aria-hidden="true"
                  className="absolute -left-4 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-[#3B82F6]"
                />
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={link.icon} alt="" aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
              {link.name}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
