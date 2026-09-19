import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ReactNode, TouchEvent as ReactTouchEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Brand } from "../components/Layout";
import { ThemeToggle } from "../components/ThemeToggle";
import {
  toneBar,
  toneChip,
  toneText,
  toneTile,
  type Tone,
} from "../components/theme";
import {
  decks,
  getDeck,
  type BulletPoint,
  type Deck,
  type FeatureCard,
  type SidePanel,
  type Slide,
  type SlideIcon,
  type StatBlock,
} from "../data/slideData";
import {
  ArrowRightIcon,
  BoltIcon,
  BookmarkIcon,
  BriefcaseIcon,
  CalendarIcon,
  ChatIcon,
  CheckBadgeIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  CollapseIcon,
  DollarIcon,
  ExpandIcon,
  GlobeIcon,
  GridIcon,
  HeartHandIcon,
  HomeIcon,
  InboxIcon,
  MapPinIcon,
  NoteIcon,
  PauseIcon,
  PlayIcon,
  SearchIcon,
  SendIcon,
  ShieldIcon,
  SlidesIcon,
  SparkleIcon,
  StarIcon,
  SyncIcon,
  TargetIcon,
  TrendingUpIcon,
  UserIcon,
  UsersIcon,
  XIcon,
} from "../components/icons";

type IconComponent = (p: {
  width?: number;
  height?: number;
  className?: string;
}) => ReactNode;

/** Resolves the icon names used by `slideData.ts` to components. */
const slideIcons: Record<SlideIcon, IconComponent> = {
  bolt: BoltIcon,
  shield: ShieldIcon,
  users: UsersIcon,
  home: HomeIcon,
  briefcase: BriefcaseIcon,
  chat: ChatIcon,
  star: StarIcon,
  check: CheckIcon,
  checkBadge: CheckBadgeIcon,
  clock: ClockIcon,
  dollar: DollarIcon,
  calendar: CalendarIcon,
  search: SearchIcon,
  inbox: InboxIcon,
  send: SendIcon,
  user: UserIcon,
  heart: HeartHandIcon,
  trending: TrendingUpIcon,
  target: TargetIcon,
  globe: GlobeIcon,
  sparkle: SparkleIcon,
  sync: SyncIcon,
  mapPin: MapPinIcon,
  bookmark: BookmarkIcon,
  slides: SlidesIcon,
};

function SlideIconGlyph({
  name,
  size = 22,
  className = "",
}: {
  name: SlideIcon;
  size?: number;
  className?: string;
}) {
  const Glyph = slideIcons[name];
  return <Glyph width={size} height={size} className={className} />;
}

/** Entrance delay so grouped content staggers in behind the heading. */
function stagger(index: number, base = 120): CSSProperties {
  return { animationDelay: `${base + index * 70}ms` };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function formatClock(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

/* ------------------------------------------------------------------ */
/* Shared slide pieces                                                 */
/* ------------------------------------------------------------------ */

function SlideHeading({ slide, accent }: { slide: Slide; accent: Tone }) {
  return (
    <header className="max-w-4xl animate-rise-in">
      <p className={`slide-eyebrow ${toneText[accent]}`}>{slide.eyebrow}</p>
      <h2 className="slide-title mt-2.5 text-ink">{slide.title}</h2>
      {slide.subtitle && (
        <p className="slide-subtitle mt-3 text-ink/65">{slide.subtitle}</p>
      )}
    </header>
  );
}

function StatFigure({
  stat,
  fallback,
  index,
}: {
  stat: StatBlock;
  fallback: Tone;
  index: number;
}) {
  const tone = stat.tone ?? fallback;
  return (
    <div
      className="card animate-rise-in flex flex-col justify-center p-5 sm:p-6"
      style={stagger(index)}
    >
      <p className={`slide-stat ${toneText[tone]}`}>{stat.value}</p>
      <p className="slide-lead mt-2 text-ink">{stat.label}</p>
      {stat.detail && (
        <p className="slide-fine mt-1.5 text-ink/55">{stat.detail}</p>
      )}
    </div>
  );
}

function BulletList({
  points,
  accent,
  baseDelay = 160,
}: {
  points: BulletPoint[];
  accent: Tone;
  baseDelay?: number;
}) {
  return (
    <ul className="space-y-4">
      {points.map((point, i) => (
        <li
          key={point.title}
          className="animate-rise-in flex items-start gap-3.5"
          style={stagger(i, baseDelay)}
        >
          <span
            className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
              toneTile[accent]
            }`}
          >
            {point.icon ? (
              <SlideIconGlyph name={point.icon} size={18} />
            ) : (
              <CheckIcon width={18} height={18} />
            )}
          </span>
          <div className="min-w-0">
            <p className="slide-lead text-ink">{point.title}</p>
            <p className="slide-body mt-1 text-ink/65">{point.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function PanelCard({ panel }: { panel: SidePanel }) {
  return (
    <aside
      className="card animate-rise-in flex flex-col justify-center gap-4 p-6 sm:p-7"
      style={stagger(0, 260)}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${
            toneTile[panel.tone]
          }`}
        >
          <SparkleIcon width={18} height={18} />
        </span>
        <h3 className="slide-lead text-ink">{panel.heading}</h3>
      </div>

      <dl className="space-y-3">
        {panel.highlights.map((highlight) => (
          <div
            key={highlight.label}
            className="flex items-baseline justify-between gap-4 border-b border-line/5 pb-3 last:border-0 last:pb-0 dark:border-line/10"
          >
            <dt className="slide-body text-ink/60">{highlight.label}</dt>
            <dd
              className={`slide-body shrink-0 text-right font-semibold ${
                toneText[panel.tone]
              }`}
            >
              {highlight.value}
            </dd>
          </div>
        ))}
      </dl>

      {panel.footnote && (
        <p className="slide-fine text-ink/45">{panel.footnote}</p>
      )}
    </aside>
  );
}

function Footnote({ children }: { children: ReactNode }) {
  return (
    <p
      className="slide-fine animate-rise-in mt-auto pt-4 text-ink/45"
      style={stagger(0, 460)}
    >
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Layout renderers                                                    */
/* ------------------------------------------------------------------ */

function SlideBody({ slide, deck }: { slide: Slide; deck: Deck }) {
  const accent: Tone = deck.accent;

  switch (slide.layout) {
    case "hero":
      return (
        <div className="flex flex-1 flex-col justify-center">
          <div className="animate-rise-in flex items-center gap-3">
            <Brand />
            <span className={`chip ${toneChip[accent]}`}>{slide.eyebrow}</span>
          </div>

          <h1 className="slide-hero-title mt-7 text-ink">
            Care<span className={toneText[accent]}>Connect</span>
          </h1>
          <p
            className="slide-subtitle animate-rise-in mt-4 max-w-3xl text-ink/70"
            style={stagger(0, 140)}
          >
            {slide.subtitle}
          </p>

          <div
            className="animate-rise-in mt-6 flex flex-wrap gap-2"
            style={stagger(1, 140)}
          >
            {slide.badges.map((badge) => (
              <span key={badge} className={`chip ${toneChip.neutral}`}>
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {slide.stats.map((stat, i) => (
              <div
                key={stat.label}
                className="animate-rise-in border-l-2 border-line/10 pl-4 dark:border-line/15"
                style={stagger(i, 280)}
              >
                <p className={`slide-stat ${toneText[stat.tone ?? accent]}`}>
                  {stat.value}
                </p>
                <p className="slide-body mt-1.5 text-ink/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case "split":
      return (
        <div className="flex flex-1 flex-col">
          <SlideHeading slide={slide} accent={accent} />
          <div className="mt-7 grid flex-1 items-center gap-7 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
            <BulletList points={slide.points} accent={accent} />
            <PanelCard panel={slide.panel} />
          </div>
        </div>
      );

    case "grid":
      return (
        <div className="flex flex-1 flex-col">
          <SlideHeading slide={slide} accent={accent} />
          <div className="mt-7 grid flex-1 content-center gap-5 md:grid-cols-3">
            {slide.cards.map((card: FeatureCard, i) => (
              <article
                key={card.title}
                className="card animate-rise-in flex flex-col p-6"
                style={stagger(i, 160)}
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                    toneTile[card.tone ?? accent]
                  }`}
                >
                  <SlideIconGlyph name={card.icon} size={22} />
                </span>
                <h3 className="slide-lead mt-4 text-ink">{card.title}</h3>
                <p className="slide-body mt-2 text-ink/65">{card.body}</p>
                <span
                  className={`mt-5 h-1 w-12 rounded-full ${
                    toneBar[card.tone ?? accent]
                  }`}
                  aria-hidden
                />
              </article>
            ))}
          </div>
          {slide.footnote && <Footnote>{slide.footnote}</Footnote>}
        </div>
      );

    case "stats":
      return (
        <div className="flex flex-1 flex-col">
          <SlideHeading slide={slide} accent={accent} />
          <div className="mt-7 flex flex-1 flex-col justify-center gap-7">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {slide.stats.map((stat, i) => (
                <StatFigure key={stat.label} stat={stat} fallback={accent} index={i} />
              ))}
            </div>
            {slide.points && (
              <div className="grid gap-5 md:grid-cols-3">
                {slide.points.map((point, i) => (
                  <div
                    key={point.title}
                    className="animate-rise-in border-t-2 border-line/10 pt-4 dark:border-line/15"
                    style={stagger(i, 300)}
                  >
                    <p className="slide-lead text-ink">{point.title}</p>
                    <p className="slide-body mt-1.5 text-ink/65">{point.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          {slide.footnote && <Footnote>{slide.footnote}</Footnote>}
        </div>
      );

    case "flow":
      return (
        <div className="flex flex-1 flex-col">
          <SlideHeading slide={slide} accent={accent} />
          <div className="mt-7 grid flex-1 content-center gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {slide.steps.map((step, i) => (
              <article
                key={step.title}
                className="card animate-rise-in relative flex flex-col p-5"
                style={stagger(i, 160)}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                      toneTile[step.tone ?? accent]
                    }`}
                  >
                    <SlideIconGlyph name={step.icon} size={18} />
                  </span>
                  <span className="slide-fine font-bold text-ink/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="slide-lead mt-3.5 text-ink">{step.title}</h3>
                <p className="slide-body mt-1.5 text-ink/65">{step.body}</p>
                {i < slide.steps.length - 1 && (
                  <span
                    className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-ink/20 xl:block"
                    aria-hidden
                  >
                    <ChevronRightIcon width={18} height={18} />
                  </span>
                )}
              </article>
            ))}
          </div>
          {slide.footnote && <Footnote>{slide.footnote}</Footnote>}
        </div>
      );

    case "closing":
      return (
        <div className="flex flex-1 flex-col">
          <SlideHeading slide={slide} accent={accent} />
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {slide.stats.map((stat, i) => (
              <div
                key={stat.label}
                className="animate-rise-in border-l-2 border-line/10 pl-4 dark:border-line/15"
                style={stagger(i, 160)}
              >
                <p className={`slide-stat ${toneText[stat.tone ?? accent]}`}>
                  {stat.value}
                </p>
                <p className="slide-body mt-1.5 text-ink/60">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 grid flex-1 content-center gap-5 md:grid-cols-3">
            {slide.asks.map((ask, i) => (
              <div
                key={ask.title}
                className="animate-rise-in flex items-start gap-3"
                style={stagger(i, 300)}
              >
                <span
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                    toneTile[accent]
                  }`}
                >
                  {ask.icon ? (
                    <SlideIconGlyph name={ask.icon} size={18} />
                  ) : (
                    <CheckIcon width={18} height={18} />
                  )}
                </span>
                <div>
                  <p className="slide-lead text-ink">{ask.title}</p>
                  <p className="slide-body mt-1 text-ink/65">{ask.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`animate-rise-in mt-auto flex flex-wrap items-center justify-between gap-4 rounded-2xl px-6 py-5 text-white ${
              accent === "warm" ? "bg-warm-500" : "bg-brand-600"
            }`}
            style={stagger(0, 460)}
          >
            <p className="slide-lead">{slide.cta}</p>
            <Link
              to="/"
              className="btn bg-white/15 text-white ring-1 ring-inset ring-white/30 hover:bg-white/25"
            >
              Open CareConnect
              <ArrowRightIcon width={18} height={18} />
            </Link>
          </div>
        </div>
      );
  }
}

/* ------------------------------------------------------------------ */
/* Overlays                                                            */
/* ------------------------------------------------------------------ */

function SlidePicker({
  deck,
  current,
  onPick,
  onClose,
}: {
  deck: Deck;
  current: number;
  onPick: (index: number) => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-cream/95 backdrop-blur"
      role="dialog"
      aria-modal="true"
      aria-label="Slide picker"
    >
      <div className="flex items-center justify-between border-b border-line/5 px-5 py-4 dark:border-line/10">
        <div>
          <p className={`slide-eyebrow ${toneText[deck.accent]}`}>
            {deck.name}
          </p>
          <p className="text-sm text-ink/55">
            {deck.slides.length} slides · click any slide to jump
          </p>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-2 text-ink/60 transition hover:bg-ink/10 hover:text-ink"
          aria-label="Close slide picker"
        >
          <XIcon width={20} height={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {deck.slides.map((slide, i) => {
            const isCurrent = i === current;
            return (
              <button
                key={slide.id}
                onClick={() => onPick(i)}
                aria-current={isCurrent ? "true" : undefined}
                className={`card flex aspect-video flex-col p-4 text-left transition hover:-translate-y-0.5 hover:shadow-soft ${
                  isCurrent
                    ? "ring-2 ring-brand-500"
                    : "ring-1 ring-transparent"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`slide-eyebrow ${toneText[deck.accent]}`}>
                    {slide.eyebrow}
                  </span>
                  <span className="text-[11px] font-bold text-ink/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-2 line-clamp-3 font-display text-sm font-semibold leading-snug text-ink">
                  {slide.title}
                </p>
                <span
                  className={`mt-auto chip w-fit ${toneChip.neutral}`}
                >
                  {slide.layout}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function NotesDrawer({
  slide,
  nextSlide,
  elapsed,
  running,
  onToggleTimer,
  onResetTimer,
  onClose,
}: {
  slide: Slide;
  nextSlide?: Slide;
  elapsed: number;
  running: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onClose: () => void;
}) {
  return (
    <aside
      className="fixed inset-x-0 bottom-0 z-40 max-h-[62vh] overflow-y-auto border-t border-line/10 bg-surface/95 px-5 py-4 shadow-card backdrop-blur sm:inset-x-auto sm:right-4 sm:bottom-20 sm:max-h-[70vh] sm:w-[26rem] sm:rounded-2xl sm:border"
      aria-label="Presenter notes"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <NoteIcon width={18} height={18} className="text-ink/50" />
          <h2 className="text-sm font-semibold text-ink">Presenter mode</h2>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-mono text-sm font-semibold tabular-nums text-ink/70">
            {formatClock(elapsed)}
          </span>
          <button
            onClick={onToggleTimer}
            className="rounded-lg p-1.5 text-ink/60 transition hover:bg-ink/10 hover:text-ink"
            aria-label={running ? "Pause timer" : "Start timer"}
          >
            {running ? (
              <PauseIcon width={16} height={16} />
            ) : (
              <PlayIcon width={16} height={16} />
            )}
          </button>
          <button
            onClick={onResetTimer}
            className="rounded-lg p-1.5 text-ink/60 transition hover:bg-ink/10 hover:text-ink"
            aria-label="Reset timer"
          >
            <SyncIcon width={16} height={16} />
          </button>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-ink/60 transition hover:bg-ink/10 hover:text-ink"
            aria-label="Close presenter notes"
          >
            <XIcon width={16} height={16} />
          </button>
        </div>
      </div>

      <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-ink/40">
        Talk track
      </p>
      <ul className="mt-2 space-y-2">
        {slide.notes.map((note) => (
          <li key={note} className="flex gap-2 text-sm leading-relaxed text-ink/75">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
            {note}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-ink/40">
        Visual cue
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{slide.visual}</p>

      {nextSlide && (
        <div className="mt-4 rounded-xl bg-ink/5 px-3.5 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">
            Up next
          </p>
          <p className="mt-1 text-sm font-semibold text-ink">{nextSlide.title}</p>
        </div>
      )}
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const SWIPE_THRESHOLD = 48;

export default function SlideDeck() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rootRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const [direction, setDirection] = useState<1 | -1>(1);
  const [notesOpen, setNotesOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  // Deck and slide live in the URL so a deck position is linkable and the
  // browser's back button steps through the presentation.
  const deck = getDeck(searchParams.get("deck"));
  const lastIndex = deck.slides.length - 1;
  const requested = Number(searchParams.get("slide"));
  const index = clamp(
    Number.isFinite(requested) && requested >= 1 ? Math.trunc(requested) - 1 : 0,
    0,
    lastIndex,
  );
  const slide = deck.slides[index];

  const goTo = useCallback(
    (next: number, deckId = deck.id) => {
      const target = getDeck(deckId);
      const bounded = clamp(next, 0, target.slides.length - 1);
      setDirection(bounded >= index ? 1 : -1);
      setSearchParams(
        { deck: deckId, slide: String(bounded + 1) },
        { replace: true },
      );
    },
    [deck.id, index, setSearchParams],
  );

  const next = useCallback(() => {
    if (index < lastIndex) goTo(index + 1);
  }, [goTo, index, lastIndex]);

  const previous = useCallback(() => {
    if (index > 0) goTo(index - 1);
  }, [goTo, index]);

  const selectDeck = useCallback(
    (deckId: string) => {
      setDirection(1);
      setSearchParams({ deck: deckId, slide: "1" }, { replace: true });
    },
    [setSearchParams],
  );

  const toggleFullscreen = useCallback(() => {
    const element = rootRef.current;
    if (!element) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen?.();
      return;
    }
    if (typeof element.requestFullscreen === "function") {
      void element.requestFullscreen().catch(() => {
        /* Fullscreen can be refused (permissions, iframes) — stay inline. */
      });
    }
  }, []);

  useEffect(() => {
    const sync = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  useEffect(() => {
    if (!timerRunning) return;
    const id = window.setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [timerRunning]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target?.isContentEditable ||
        (target && /^(input|textarea|select)$/i.test(target.tagName))
      ) {
        return;
      }

      switch (event.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
          event.preventDefault();
          next();
          break;
        case "ArrowLeft":
        case "PageUp":
          event.preventDefault();
          previous();
          break;
        case "Home":
          event.preventDefault();
          goTo(0);
          break;
        case "End":
          event.preventDefault();
          goTo(lastIndex);
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        case "n":
        case "N":
          setNotesOpen((open) => !open);
          break;
        case "g":
        case "G":
          setPickerOpen((open) => !open);
          break;
        case "d":
        case "D": {
          const other = decks.find((d) => d.id !== deck.id);
          if (other) selectDeck(other.id);
          break;
        }
        case "Escape":
          if (pickerOpen) setPickerOpen(false);
          else if (notesOpen) setNotesOpen(false);
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    deck.id,
    goTo,
    lastIndex,
    next,
    notesOpen,
    pickerOpen,
    previous,
    selectDeck,
    toggleFullscreen,
  ]);

  const onTouchStart = (event: ReactTouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: ReactTouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? start) - start;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    if (delta < 0) next();
    else previous();
  };

  const progress = useMemo(
    () => ((index + 1) / deck.slides.length) * 100,
    [deck.slides.length, index],
  );

  const accentBar = deck.accent === "warm" ? "bg-warm-500" : "bg-brand-600";
  const transition =
    direction === 1 ? "animate-slide-in-right" : "animate-slide-in-left";

  return (
    <div
      ref={rootRef}
      className="flex h-[100dvh] flex-col overflow-hidden bg-cream text-ink"
    >
      {/* Control bar */}
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-line/5 px-4 py-3 dark:border-line/10 sm:px-6">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg px-1 py-1 text-ink/60 transition hover:text-ink"
            aria-label="Back to CareConnect"
          >
            <ChevronLeftIcon width={18} height={18} />
            <span className="hidden text-sm font-medium sm:inline">Back to app</span>
          </Link>

          <div
            className="flex rounded-xl bg-ink/5 p-1"
            role="tablist"
            aria-label="Choose a deck"
          >
            {decks.map((option) => {
              const active = option.id === deck.id;
              return (
                <button
                  key={option.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => selectDeck(option.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition sm:text-sm ${
                    active
                      ? "bg-surface text-ink shadow-card"
                      : "text-ink/55 hover:text-ink"
                  }`}
                >
                  {option.shortName}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <span className="mr-2 hidden text-xs text-ink/40 lg:inline">
            ← → navigate · F fullscreen · N notes · G grid
          </span>
          <ThemeToggle />
          <button
            onClick={() => setNotesOpen((open) => !open)}
            aria-pressed={notesOpen}
            className={`rounded-lg p-2 transition hover:bg-ink/10 ${
              notesOpen ? "bg-ink/10 text-ink" : "text-ink/60 hover:text-ink"
            }`}
            title="Presenter notes (N)"
            aria-label="Toggle presenter notes"
          >
            <NoteIcon width={18} height={18} />
          </button>
          <button
            onClick={() => setPickerOpen((open) => !open)}
            aria-pressed={pickerOpen}
            className={`rounded-lg p-2 transition hover:bg-ink/10 ${
              pickerOpen ? "bg-ink/10 text-ink" : "text-ink/60 hover:text-ink"
            }`}
            title="Slide grid (G)"
            aria-label="Toggle slide grid"
          >
            <GridIcon width={18} height={18} />
          </button>
          <button
            onClick={toggleFullscreen}
            aria-pressed={isFullscreen}
            className="rounded-lg p-2 text-ink/60 transition hover:bg-ink/10 hover:text-ink"
            title="Fullscreen (F)"
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? (
              <CollapseIcon width={18} height={18} />
            ) : (
              <ExpandIcon width={18} height={18} />
            )}
          </button>
        </div>
      </header>

      {/* Slide viewer */}
      <main
        className="relative flex-1 overflow-y-auto"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          key={`${deck.id}-${slide.id}`}
          className={`mx-auto flex min-h-full w-full max-w-7xl flex-col px-5 py-7 sm:px-8 sm:py-9 lg:px-12 lg:py-11 ${transition}`}
        >
          <SlideBody slide={slide} deck={deck} />
        </div>
      </main>

      <p className="sr-only" aria-live="polite">
        {`Slide ${index + 1} of ${deck.slides.length}: ${slide.title}`}
      </p>

      {/* Navigation bar */}
      <footer className="shrink-0 border-t border-line/5 dark:border-line/10">
        <div
          className="h-1 w-full bg-ink/5"
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={deck.slides.length}
          aria-label="Presentation progress"
        >
          <div
            className={`h-full rounded-r-full transition-all duration-300 ${accentBar}`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-ink/70 sm:text-sm">
              {deck.name}
            </p>
            <p className="truncate text-xs text-ink/40">
              {deck.audience} · ~{deck.durationMinutes} min
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={previous}
              disabled={index === 0}
              className="btn-secondary px-3 py-2"
              aria-label="Previous slide"
            >
              <ChevronLeftIcon width={18} height={18} />
            </button>
            <span className="min-w-[4.5rem] text-center text-sm font-semibold tabular-nums text-ink/70">
              {index + 1} / {deck.slides.length}
            </span>
            <button
              onClick={next}
              disabled={index === lastIndex}
              className="btn-primary px-3 py-2"
              aria-label="Next slide"
            >
              <ChevronRightIcon width={18} height={18} />
            </button>
          </div>
        </div>
      </footer>

      {notesOpen && (
        <NotesDrawer
          slide={slide}
          nextSlide={deck.slides[index + 1]}
          elapsed={elapsed}
          running={timerRunning}
          onToggleTimer={() => setTimerRunning((running) => !running)}
          onResetTimer={() => {
            setElapsed(0);
            setTimerRunning(false);
          }}
          onClose={() => setNotesOpen(false)}
        />
      )}

      {pickerOpen && (
        <SlidePicker
          deck={deck}
          current={index}
          onPick={(i) => {
            goTo(i);
            setPickerOpen(false);
          }}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </div>
  );
}
