import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../store/AppContext";
import { Brand } from "../components/Layout";
import { ThemeToggle } from "../components/ThemeToggle";
import type { Role } from "../types";
import { BriefcaseIcon, HomeIcon } from "../components/icons";

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("caregiver");
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
    navigate(role === "owner" ? "/owner/jobs" : "/caregiver/jobs");
  };

  const roles: { id: Role; label: string; sub: string; icon: React.ReactNode }[] = [
    {
      id: "caregiver",
      label: "Caregiver",
      sub: "Find shifts & homes",
      icon: <BriefcaseIcon width={22} height={22} />,
    },
    {
      id: "owner",
      label: "Home Owner",
      sub: "Post jobs & hire",
      icon: <HomeIcon width={22} height={22} />,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5">
        <Link to="/">
          <Brand />
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link to="/" className="text-sm font-medium text-ink/60 hover:text-ink">
            &larr; Back home
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-8">
        <div className="card w-full max-w-md p-7 sm:p-8">
          <h1 className="font-display text-2xl font-bold text-ink">Welcome back</h1>
          <p className="mt-1 text-sm text-ink/60">
            Choose how you'd like to sign in to CareConnect.
          </p>

          {/* Role toggle */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {roles.map((r) => {
              const active = role === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  aria-pressed={active}
                  className={`flex flex-col items-start gap-2 rounded-2xl border-2 p-4 text-left transition ${
                    active
                      ? r.id === "owner"
                        ? "border-warm-500 bg-warm-50 dark:bg-warm-500/10"
                        : "border-brand-500 bg-brand-50 dark:bg-brand-500/10"
                      : "border-line/10 bg-surface hover:border-ink/20"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-white ${
                      r.id === "owner" ? "bg-warm-500" : "bg-brand-600"
                    }`}
                  >
                    {r.icon}
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">{r.label}</span>
                    <span className="block text-xs text-ink/55">{r.sub}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="input"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className={`${role === "owner" ? "btn-warm" : "btn-primary"} w-full`}
            >
              Continue as {role === "owner" ? "Home Owner" : "Caregiver"}
            </button>
          </form>

          <p className="mt-5 rounded-xl bg-ink/5 px-3 py-2.5 text-center text-xs text-ink/55">
            Demo mode — no real credentials needed. Just pick a role and continue.
          </p>
        </div>
      </main>
    </div>
  );
}
