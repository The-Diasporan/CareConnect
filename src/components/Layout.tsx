import type { ReactNode } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../store/AppContext";
import { Avatar } from "./ui";
import { ThemeToggle } from "./ThemeToggle";
import { NavBadge } from "./NavBadge";
import {
  BookmarkIcon,
  BriefcaseIcon,
  ChatIcon,
  HeartHandIcon,
  HomeIcon,
  InboxIcon,
  LogoutIcon,
  SendIcon,
  UserIcon,
  UsersIcon,
} from "./icons";

interface NavItem {
  to: string;
  label: string;
  icon: (p: { width?: number; height?: number; className?: string }) => ReactNode;
}

const caregiverNav: NavItem[] = [
  { to: "/caregiver/jobs", label: "Job Board", icon: BriefcaseIcon },
  { to: "/caregiver/homes", label: "Homes", icon: HomeIcon },
  { to: "/caregiver/saved", label: "Saved", icon: BookmarkIcon },
  { to: "/caregiver/messages", label: "Messages", icon: ChatIcon },
  { to: "/caregiver/profile", label: "Profile", icon: UserIcon },
];

const ownerNav: NavItem[] = [
  { to: "/owner/jobs", label: "My Jobs", icon: BriefcaseIcon },
  { to: "/owner/applicants", label: "Applicants", icon: InboxIcon },
  { to: "/owner/messages", label: "Messages", icon: SendIcon },
  { to: "/owner/caregivers", label: "Caregivers", icon: UsersIcon },
  { to: "/owner/reviews", label: "Reviews", icon: ChatIcon },
];

function NavItemLink({
  item,
  badge,
  compact = false,
}: {
  item: NavItem;
  badge: number;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <NavLink
        to={item.to}
        className={({ isActive }) =>
          `relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition ${
            isActive ? "text-brand-600 dark:text-brand-400" : "text-ink/50"
          }`
        }
      >
        <span className="relative">
          <item.icon width={22} height={22} />
          {badge > 0 && (
            <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-warm-500 px-0.5 text-[9px] font-bold text-white">
              {badge > 9 ? "9+" : badge}
            </span>
          )}
        </span>
        {item.label}
      </NavLink>
    );
  }

  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
          isActive
            ? "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
            : "text-ink/70 hover:bg-ink/5"
        }`
      }
    >
      <item.icon width={20} height={20} />
      <span className="flex-1">{item.label}</span>
      <NavBadge count={badge} />
    </NavLink>
  );
}

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-soft">
        <HeartHandIcon width={20} height={20} />
      </span>
      {!compact && (
        <span className="font-display text-lg font-bold text-ink">
          Care<span className="text-brand-600 dark:text-brand-400">Connect</span>
        </span>
      )}
    </div>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const { session, logout, switchRole, navBadgeFor, myCaregiverProfile } =
    useApp();
  const navigate = useNavigate();

  if (!session) return null;

  const isOwner = session.role === "owner";
  const navItems = isOwner ? ownerNav : caregiverNav;
  const profile = !isOwner ? myCaregiverProfile() : undefined;

  const handleSwitch = () => {
    const next = isOwner ? "caregiver" : "owner";
    switchRole(next);
    navigate(next === "owner" ? "/owner/jobs" : "/caregiver/jobs");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const subtitle = isOwner
    ? "AFH Owner"
    : profile?.title?.includes("CNA")
      ? "Certified CNA"
      : profile?.title ?? "Caregiver";

  return (
    <div className="min-h-screen bg-cream">
      {/* Sidebar — desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-line/5 bg-surface px-4 py-6 dark:border-line/10 lg:flex">
        <div className="px-2">
          <Brand />
        </div>

        <div className="mt-8 px-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">
            {isOwner ? "Home Owner" : "Caregiver"}
          </p>
        </div>

        <nav className="mt-3 flex flex-1 flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavItemLink
              key={item.to}
              item={item}
              badge={navBadgeFor(item.to)}
            />
          ))}
        </nav>

        <div className="mt-auto space-y-3 border-t border-line/5 pt-4 dark:border-line/10">
          <ThemeToggle variant="full" />
          <button
            onClick={handleSwitch}
            className="btn-secondary w-full text-xs"
          >
            Switch to {isOwner ? "Caregiver" : "Owner"} view
          </button>
          <div className="flex items-center gap-3 px-1">
            {!isOwner ? (
              <Link to="/caregiver/profile" className="shrink-0">
                <Avatar
                  name={session.name}
                  color={profile?.accentColor ?? "#0d9488"}
                  size={38}
                />
              </Link>
            ) : (
              <Avatar
                name={session.name}
                color="#ea580c"
                size={38}
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">
                {session.name}
              </p>
              <p className="truncate text-xs text-ink/50">{subtitle}</p>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-lg p-2 text-ink/50 hover:bg-ink/5 hover:text-ink"
              aria-label="Log out"
              title="Log out"
            >
              <LogoutIcon width={18} height={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Top bar — mobile */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line/5 bg-surface/90 px-4 py-3 backdrop-blur dark:border-line/10 lg:hidden">
        <Brand />
        <div className="flex items-center gap-1">
          <ThemeToggle />
          {!isOwner && (
            <Link
              to="/caregiver/profile"
              className="rounded-lg p-2 text-ink/50 hover:bg-ink/5"
              aria-label="Edit profile"
            >
              <UserIcon width={18} height={18} />
            </Link>
          )}
          <button onClick={handleSwitch} className="btn-ghost px-2.5 py-1.5 text-xs">
            {isOwner ? "Caregiver" : "Owner"} view
          </button>
          <button
            onClick={handleLogout}
            className="rounded-lg p-2 text-ink/50 hover:bg-ink/5"
            aria-label="Log out"
          >
            <LogoutIcon width={18} height={18} />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="px-4 pb-28 pt-5 sm:px-6 lg:ml-64 lg:px-10 lg:pb-12 lg:pt-10">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>

      {/* Bottom nav — mobile */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-line/5 bg-surface/95 backdrop-blur dark:border-line/10 lg:hidden">
        {navItems.map((item) => (
          <NavItemLink
            key={item.to}
            item={item}
            badge={navBadgeFor(item.to)}
            compact
          />
        ))}
      </nav>
    </div>
  );
}
