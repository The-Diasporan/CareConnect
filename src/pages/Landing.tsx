import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../store/AppContext";
import { Brand } from "../components/Layout";
import { ThemeToggle } from "../components/ThemeToggle";
import {
  ArrowRightIcon,
  BoltIcon,
  BriefcaseIcon,
  ChatIcon,
  HeartHandIcon,
  HomeIcon,
  ShieldIcon,
  StarIcon,
  UsersIcon,
} from "../components/icons";

function RoleCard({
  tone,
  icon,
  title,
  pitch,
  points,
  cta,
  onClick,
}: {
  tone: "brand" | "warm";
  icon: React.ReactNode;
  title: string;
  pitch: string;
  points: string[];
  cta: string;
  onClick: () => void;
}) {
  const brand = tone === "brand";
  return (
    <div className="card flex flex-col p-7">
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-soft ${
          brand ? "bg-brand-600" : "bg-warm-500"
        }`}
      >
        {icon}
      </span>
      <h3 className="mt-4 font-display text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{pitch}</p>
      <ul className="mt-4 space-y-2">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2 text-sm text-ink/75">
            <span
              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                brand ? "bg-brand-500" : "bg-warm-500"
              }`}
            />
            {p}
          </li>
        ))}
      </ul>
      <button
        onClick={onClick}
        className={`mt-6 ${brand ? "btn-primary" : "btn-warm"} w-full`}
      >
        {cta}
        <ArrowRightIcon width={18} height={18} />
      </button>
    </div>
  );
}

export default function Landing() {
  const { login } = useApp();
  const navigate = useNavigate();

  const enter = (role: "caregiver" | "owner") => {
    login(role);
    navigate(role === "owner" ? "/owner/jobs" : "/caregiver/jobs");
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <Brand />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/login" className="btn-secondary text-sm">
            Sign in
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-24 top-40 h-80 w-80 rounded-full bg-warm-200/40 blur-3xl"
          aria-hidden
        />
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 text-center sm:pt-16">
          <span className="chip mx-auto mb-5 w-fit bg-surface text-brand-700 shadow-card ring-1 ring-brand-100 dark:text-brand-300 dark:ring-brand-500/30">
            <HeartHandIcon width={14} height={14} /> Trusted by Adult Family Homes across WA
          </span>
          <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-tight text-ink sm:text-5xl md:text-6xl">
            Where great caregivers meet{" "}
            <span className="text-brand-600">caring homes</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink/65 sm:text-lg">
            CareConnect is the dedicated marketplace for the senior care
            community. Caregivers find meaningful shifts. Adult Family Home
            owners fill openings fast &mdash; even urgent ones.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button onClick={() => enter("caregiver")} className="btn-primary w-full sm:w-auto">
              <BriefcaseIcon width={18} height={18} /> I'm a Caregiver
            </button>
            <button onClick={() => enter("owner")} className="btn-warm w-full sm:w-auto">
              <HomeIcon width={18} height={18} /> I'm a Home Owner
            </button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ink/55">
            <span className="flex items-center gap-1.5">
              <StarIcon width={16} height={16} className="text-amber-400" /> 4.8 avg home rating
            </span>
            <span className="flex items-center gap-1.5">
              <UsersIcon width={16} height={16} className="text-brand-500" /> 600+ verified caregivers
            </span>
            <span className="flex items-center gap-1.5">
              <BoltIcon width={16} height={16} className="text-warm-500" /> Urgent shifts filled in hours
            </span>
          </div>
        </div>
      </section>

      {/* Two audiences */}
      <section className="mx-auto max-w-5xl px-5 pb-14">
        <div className="grid gap-5 md:grid-cols-2">
          <RoleCard
            tone="brand"
            icon={<BriefcaseIcon width={24} height={24} />}
            title="For Caregivers"
            pitch="Browse real openings from local homes, see honest reviews, and pick shifts that fit your life."
            points={[
              "Scrollable job board with full-time, part-time & shift filters",
              "Urgent shift alerts so you never miss high-pay openings",
              "Read reviews & star ratings before you apply",
            ]}
            cta="Find caregiving jobs"
            onClick={() => enter("caregiver")}
          />
          <RoleCard
            tone="warm"
            icon={<HomeIcon width={24} height={24} />}
            title="For AFH Owners"
            pitch="Post a role in seconds, flag urgent fills, and browse a directory of qualified, certified caregivers."
            points={[
              "Post jobs instantly — mark them URGENT for priority reach",
              "Browse caregiver profiles with certifications & experience",
              "Track reviews of your home to manage your reputation",
            ]}
            cta="Post a job opening"
            onClick={() => enter("owner")}
          />
        </div>
      </section>

      {/* Value props */}
      <section className="mx-auto max-w-5xl px-5 pb-20">
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            {
              icon: <BoltIcon width={22} height={22} />,
              title: "Fill urgent shifts fast",
              body: "Urgent postings jump to the top of every caregiver's feed with a high-visibility banner.",
            },
            {
              icon: <ShieldIcon width={22} height={22} />,
              title: "Verified & certified",
              body: "Caregiver profiles surface CNA, HCA, CPR and specialty certifications up front.",
            },
            {
              icon: <ChatIcon width={22} height={22} />,
              title: "Transparent reviews",
              body: "Real feedback from caregivers helps everyone make confident, informed decisions.",
            },
          ].map((f) => (
            <div key={f.title} className="card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                {f.icon}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-ink">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-line/5 py-8 dark:border-line/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 sm:flex-row">
          <Brand />
          <p className="text-sm text-ink/50">
            &copy; {new Date().getFullYear()} CareConnect. Made for the senior care community.
          </p>
        </div>
      </footer>
    </div>
  );
}
