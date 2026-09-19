import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../store/AppContext";
import { Avatar, Chip } from "../../components/ui";
import { CheckIcon } from "../../components/icons";
import type { JobType } from "../../types";

const jobTypes: JobType[] = ["full-time", "part-time", "shift-based"];
const jobTypeLabel: Record<JobType, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  "shift-based": "Shift-based",
};

function parseList(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function Profile() {
  const { myCaregiverProfile, updateMyProfile } = useApp();
  const profile = myCaregiverProfile();

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [yearsExperience, setYearsExperience] = useState("0");
  const [certifications, setCertifications] = useState("");
  const [skills, setSkills] = useState("");
  const [availability, setAvailability] = useState<JobType[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setName(profile.name);
    setTitle(profile.title);
    setBio(profile.bio);
    setCity(profile.city);
    setYearsExperience(String(profile.yearsExperience));
    setCertifications(profile.certifications.join(", "));
    setSkills(profile.skills.join(", "));
    setAvailability([...profile.availability]);
  }, [profile]);

  if (!profile) {
    return (
      <p className="text-sm text-ink/60">
        No profile found.{" "}
        <Link to="/caregiver/jobs" className="text-brand-600 dark:text-brand-400">
          Back to jobs
        </Link>
      </p>
    );
  }

  const toggleAvailability = (type: JobType) => {
    setAvailability((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMyProfile({
      name: name.trim(),
      title: title.trim(),
      bio: bio.trim(),
      city: city.trim(),
      yearsExperience: Math.max(0, Number(yearsExperience) || 0),
      certifications: parseList(certifications),
      skills: parseList(skills),
      availability,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          Caregiver dashboard
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">
          Edit your profile
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Keep your public profile up to date so home owners can find you.
        </p>
      </div>

      <div className="card flex items-center gap-4 p-5">
        <Avatar name={name || profile.name} color={profile.accentColor} size={56} />
        <div>
          <p className="font-display text-lg font-semibold text-ink">
            {name || profile.name}
          </p>
          <p className="text-sm text-ink/60">{title || profile.title}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {profile.verified && (
              <Chip tone="brand">
                Verified
              </Chip>
            )}
            <Chip>
              {profile.rating.toFixed(1)} ★ · {profile.reviewCount} reviews
            </Chip>
          </div>
        </div>
      </div>

      <form onSubmit={submit} className="card space-y-4 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="title">
              Professional title
            </label>
            <input
              id="title"
              className="input"
              placeholder="Certified Nursing Assistant (CNA)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="city">
              City
            </label>
            <input
              id="city"
              className="input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="years">
              Years of experience
            </label>
            <input
              id="years"
              type="number"
              min={0}
              className="input"
              value={yearsExperience}
              onChange={(e) => setYearsExperience(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="label" htmlFor="bio">
            Bio
          </label>
          <textarea
            id="bio"
            className="input min-h-[100px] resize-y"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="label" htmlFor="certs">
            Certifications
          </label>
          <input
            id="certs"
            className="input"
            placeholder="CNA, CPR/First Aid, Dementia Specialist"
            value={certifications}
            onChange={(e) => setCertifications(e.target.value)}
          />
          <p className="mt-1 text-xs text-ink/45">Separate with commas</p>
        </div>

        <div>
          <label className="label" htmlFor="skills">
            Skills
          </label>
          <input
            id="skills"
            className="input"
            placeholder="Memory Care, Hoyer Lift, Medication Reminders"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <p className="mt-1 text-xs text-ink/45">Separate with commas</p>
        </div>

        <div>
          <p className="label">Availability</p>
          <div className="flex flex-wrap gap-2">
            {jobTypes.map((type) => {
              const active = availability.includes(type);
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleAvailability(type)}
                  aria-pressed={active}
                  className={`chip px-3 py-2 transition ${
                    active
                      ? "bg-brand-600 text-white"
                      : "bg-surface text-ink/70 ring-1 ring-inset ring-line/10 hover:bg-ink/5"
                  }`}
                >
                  {jobTypeLabel[type]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
          <Link to="/caregiver/jobs" className="btn-ghost text-center">
            Cancel
          </Link>
          <button type="submit" className="btn-primary">
            Save profile
          </button>
        </div>

        {saved && (
          <p className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-50 py-2.5 text-sm font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
            <CheckIcon width={16} height={16} /> Profile saved
          </p>
        )}
      </form>
    </div>
  );
}
