import { useApp } from "../store/AppContext";
import { MoonIcon, SunIcon } from "./icons";

export function ThemeToggle({
  variant = "icon",
  className = "",
}: {
  variant?: "icon" | "full";
  className?: string;
}) {
  const { theme, toggleTheme } = useApp();
  const isDark = theme === "dark";

  if (variant === "full") {
    return (
      <button
        onClick={toggleTheme}
        className={`btn-secondary w-full justify-start text-xs ${className}`}
        aria-pressed={isDark}
      >
        {isDark ? <SunIcon width={16} height={16} /> : <MoonIcon width={16} height={16} />}
        {isDark ? "Light mode" : "Dark mode"}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`rounded-lg p-2 text-ink/60 transition hover:bg-ink/10 hover:text-ink ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? <SunIcon width={18} height={18} /> : <MoonIcon width={18} height={18} />}
    </button>
  );
}
