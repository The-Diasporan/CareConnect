export function NavBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  const label = count > 99 ? "99+" : String(count);
  return (
    <span
      className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-warm-500 px-1.5 text-[10px] font-bold text-white"
      aria-label={`${count} notifications`}
    >
      {label}
    </span>
  );
}
