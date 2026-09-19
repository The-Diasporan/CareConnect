import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useApp } from "../../store/AppContext";
import { JobCard, ReviewCard } from "../../components/cards";
import { Avatar, Chip, EmptyState, StarRating } from "../../components/ui";
import { HomeIcon, MapPinIcon, StarIcon } from "../../components/icons";

export default function HomeDetail() {
  const { afhId } = useParams();
  const navigate = useNavigate();
  const { getAfh, reviewsForAfh, jobsForAfh, addReview, session } = useApp();

  const afh = afhId ? getAfh(afhId) : undefined;
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  if (!afh) {
    return (
      <EmptyState
        icon={<HomeIcon width={24} height={24} />}
        title="Home not found"
        description="This Adult Family Home may no longer be listed."
      />
    );
  }

  const reviews = reviewsForAfh(afh.id);
  const openJobs = jobsForAfh(afh.id);

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addReview({
      afhId: afh.id,
      authorName: session?.name ?? "Caregiver",
      authorRole: "Certified CNA",
      rating,
      text: text.trim(),
    });
    setText("");
    setRating(5);
  };

  return (
    <div className="space-y-7">
      <button
        onClick={() => navigate(-1)}
        className="text-sm font-medium text-ink/60 hover:text-ink"
      >
        &larr; Back to homes
      </button>

      {/* Header */}
      <div className="card overflow-hidden">
        <div
          className="h-24 w-full"
          style={{
            background: `linear-gradient(135deg, ${afh.accentColor}, ${afh.accentColor}cc)`,
          }}
        />
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4">
            {/* Only the avatar overlaps the banner — pulling the whole row up
                drags the heading onto the accent gradient, where dark `text-ink`
                loses contrast in light mode. */}
            <span className="-mt-8 rounded-2xl ring-4 ring-surface">
              <Avatar name={afh.name} color={afh.accentColor} size={64} />
            </span>
            <div className="pb-1">
              <h1 className="font-display text-2xl font-bold text-ink">{afh.name}</h1>
              <p className="flex items-center gap-1 text-sm text-ink/60">
                <MapPinIcon width={14} height={14} /> {afh.location} &middot; {afh.city}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-2">
              <StarRating value={afh.rating} showValue size={18} />
              <span className="text-sm text-ink/50">({afh.reviewCount} reviews)</span>
            </span>
            <span className="text-sm text-ink/55">{afh.beds} beds</span>
            <span className="text-sm text-ink/55">Owner: {afh.ownerName}</span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-ink/70">{afh.blurb}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {afh.specialties.map((s) => (
              <Chip key={s} tone="brand">
                {s}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      {/* Open roles */}
      {openJobs.length > 0 && (
        <section>
          <h2 className="mb-3 font-display text-lg font-semibold text-ink">
            Open roles at this home
          </h2>
          <div className="grid gap-4">
            {openJobs.map((job) => (
              <JobCard key={job.id} job={job} afh={afh} showActions />
            ))}
          </div>
        </section>
      )}

      {/* Reviews */}
      <section>
        <h2 className="mb-3 font-display text-lg font-semibold text-ink">
          Caregiver reviews
        </h2>

        {/* Leave a review */}
        <form onSubmit={submitReview} className="card mb-4 p-5">
          <p className="mb-2 text-sm font-medium text-ink/80">Leave a review</p>
          <div className="mb-3 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                aria-label={`${n} star${n > 1 ? "s" : ""}`}
                className="transition hover:scale-110"
              >
                <StarIcon
                  width={26}
                  height={26}
                  className={n <= rating ? "text-amber-400" : "text-ink/15"}
                />
              </button>
            ))}
          </div>
          <textarea
            className="input min-h-[80px] resize-y"
            placeholder="Share your experience working with this home…"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="mt-3 flex justify-end">
            <button type="submit" className="btn-primary" disabled={!text.trim()}>
              Post review
            </button>
          </div>
        </form>

        {reviews.length > 0 ? (
          <div className="grid gap-4">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No reviews yet"
            description="Be the first caregiver to share your experience."
          />
        )}
      </section>

      <p className="text-center text-sm text-ink/50">
        Looking for more? <Link to="/caregiver/jobs" className="font-medium text-brand-600 dark:text-brand-400">Back to the job board</Link>
      </p>
    </div>
  );
}
