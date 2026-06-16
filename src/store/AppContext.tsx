import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  AFH,
  Application,
  ApplicationStatus,
  Caregiver,
  CaregiverProfileUpdate,
  Job,
  Message,
  ReadState,
  Review,
  Role,
  Theme,
} from "../types";
import {
  DEMO_CAREGIVER_ID,
  DEMO_OWNER_AFH_IDS,
  DEMO_OWNER_NAME,
  seedAFHs,
  seedApplications,
  seedCaregivers,
  seedJobs,
  seedMessages,
  seedReadState,
  seedReviews,
} from "../data/seed";

interface Session {
  role: Role;
  name: string;
  ownedAfhIds: string[];
  caregiverId: string | null;
}

interface AppState {
  session: Session | null;
  jobs: Job[];
  afhs: AFH[];
  reviews: Review[];
  caregivers: Caregiver[];
  applications: Application[];
  savedJobIds: string[];
  messages: Message[];
  readState: ReadState;
}

interface AppContextValue extends AppState {
  theme: Theme;
  login: (role: Role) => void;
  logout: () => void;
  switchRole: (role: Role) => void;
  addJob: (job: Omit<Job, "id" | "postedAt">) => void;
  deleteJob: (jobId: string) => void;
  addReview: (review: Omit<Review, "id" | "date">) => void;
  getAfh: (id: string) => AFH | undefined;
  getCaregiver: (id: string) => Caregiver | undefined;
  myCaregiverProfile: () => Caregiver | undefined;
  updateMyProfile: (update: CaregiverProfileUpdate) => void;
  reviewsForAfh: (id: string) => Review[];
  jobsForAfh: (id: string) => Job[];
  applyToJob: (jobId: string, message: string) => void;
  withdrawApplication: (jobId: string) => void;
  hasApplied: (jobId: string) => boolean;
  myApplications: () => Application[];
  applicationsForOwner: () => Application[];
  applicationsForJob: (jobId: string) => Application[];
  getApplication: (id: string) => Application | undefined;
  updateApplicationStatus: (appId: string, status: ApplicationStatus) => void;
  toggleSaveJob: (jobId: string) => void;
  isSaved: (jobId: string) => boolean;
  // Messaging
  myThreads: () => Application[];
  messagesForApplication: (applicationId: string) => Message[];
  sendMessage: (applicationId: string, text: string) => void;
  markThreadRead: (applicationId: string) => void;
  // Notifications
  markJobsSeen: () => void;
  markApplicantsSeen: () => void;
  unreadUrgentJobCount: () => number;
  unreadApplicantCount: () => number;
  unreadMessageCount: () => number;
  navBadgeFor: (path: string) => number;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const STORAGE_KEY = "careconnect.state.v3";
const THEME_KEY = "careconnect.theme";

const AppContext = createContext<AppContextValue | null>(null);

function loadPersisted(): Partial<AppState> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<AppState>) : null;
  } catch {
    return null;
  }
}

function averageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

let idCounter = 0;
function uid(prefix: string) {
  idCounter += 1;
  return `${prefix}-${Date.now().toString(36)}-${idCounter}`;
}

function readTheme(): Theme {
  try {
    const t = localStorage.getItem(THEME_KEY);
    if (t === "dark" || t === "light") return t;
    if (window.matchMedia?.("(prefers-color-scheme: dark)").matches)
      return "dark";
  } catch {
    /* ignore */
  }
  return "light";
}

export function AppProvider({ children }: { children: ReactNode }) {
  const persisted = loadPersisted();

  const [session, setSession] = useState<Session | null>(
    persisted?.session ?? null,
  );
  const [jobs, setJobs] = useState<Job[]>(persisted?.jobs ?? seedJobs);
  const [reviews, setReviews] = useState<Review[]>(
    persisted?.reviews ?? seedReviews,
  );
  const [caregivers, setCaregivers] = useState<Caregiver[]>(
    persisted?.caregivers ?? seedCaregivers,
  );
  const [applications, setApplications] = useState<Application[]>(
    persisted?.applications ?? seedApplications,
  );
  const [savedJobIds, setSavedJobIds] = useState<string[]>(
    persisted?.savedJobIds ?? [],
  );
  const [messages, setMessages] = useState<Message[]>(
    persisted?.messages ?? seedMessages,
  );
  const [readState, setReadState] = useState<ReadState>(
    persisted?.readState ?? seedReadState(),
  );
  const [theme, setThemeState] = useState<Theme>(readTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const afhs = useMemo<AFH[]>(() => {
    const base = persisted?.afhs ?? seedAFHs;
    return base.map((afh) => {
      const afhReviews = reviews.filter((r) => r.afhId === afh.id);
      return {
        ...afh,
        rating: afhReviews.length ? averageRating(afhReviews) : afh.rating,
        reviewCount: afhReviews.length,
      };
    });
  }, [reviews, persisted?.afhs]);

  useEffect(() => {
    const snapshot: AppState = {
      session,
      jobs,
      reviews,
      afhs,
      caregivers,
      applications,
      savedJobIds,
      messages,
      readState,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
    } catch {
      /* ignore quota errors */
    }
  }, [
    session,
    jobs,
    reviews,
    afhs,
    caregivers,
    applications,
    savedJobIds,
    messages,
    readState,
  ]);

  const login = useCallback(
    (role: Role) => {
      if (role === "owner") {
        setSession({
          role,
          name: DEMO_OWNER_NAME,
          ownedAfhIds: DEMO_OWNER_AFH_IDS,
          caregiverId: null,
        });
      } else {
        const cg = caregivers.find((c) => c.id === DEMO_CAREGIVER_ID);
        setSession({
          role,
          name: cg?.name ?? "Dana Whitfield",
          ownedAfhIds: [],
          caregiverId: DEMO_CAREGIVER_ID,
        });
      }
    },
    [caregivers],
  );

  const switchRole = useCallback((role: Role) => login(role), [login]);

  const logout = useCallback(() => setSession(null), []);

  const addJob = useCallback((job: Omit<Job, "id" | "postedAt">) => {
    setJobs((prev) => [
      { ...job, id: uid("job"), postedAt: Date.now() },
      ...prev,
    ]);
  }, []);

  const deleteJob = useCallback((jobId: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
  }, []);

  const addReview = useCallback((review: Omit<Review, "id" | "date">) => {
    setReviews((prev) => [
      { ...review, id: uid("rev"), date: Date.now() },
      ...prev,
    ]);
  }, []);

  const getAfh = useCallback(
    (id: string) => afhs.find((a) => a.id === id),
    [afhs],
  );

  const getCaregiver = useCallback(
    (id: string) => caregivers.find((c) => c.id === id),
    [caregivers],
  );

  const myCaregiverProfile = useCallback(
    () =>
      session?.caregiverId
        ? caregivers.find((c) => c.id === session.caregiverId)
        : undefined,
    [caregivers, session],
  );

  const updateMyProfile = useCallback(
    (update: CaregiverProfileUpdate) => {
      if (!session?.caregiverId) return;
      setCaregivers((prev) =>
        prev.map((c) =>
          c.id === session.caregiverId ? { ...c, ...update } : c,
        ),
      );
      setSession((s) => (s ? { ...s, name: update.name } : s));
      setApplications((prev) =>
        prev.map((a) =>
          a.caregiverId === session.caregiverId
            ? { ...a, caregiverName: update.name }
            : a,
        ),
      );
    },
    [session],
  );

  const reviewsForAfh = useCallback(
    (id: string) =>
      reviews
        .filter((r) => r.afhId === id)
        .sort((a, b) => b.date - a.date),
    [reviews],
  );

  const jobsForAfh = useCallback(
    (id: string) =>
      jobs.filter((j) => j.afhId === id).sort((a, b) => b.postedAt - a.postedAt),
    [jobs],
  );

  const getApplication = useCallback(
    (id: string) => applications.find((a) => a.id === id),
    [applications],
  );

  const applyToJob = useCallback(
    (jobId: string, message: string) => {
      if (!session?.caregiverId) return;
      setApplications((prev) => {
        if (
          prev.some(
            (a) => a.jobId === jobId && a.caregiverId === session.caregiverId,
          )
        ) {
          return prev;
        }
        return [
          {
            id: uid("app"),
            jobId,
            caregiverId: session.caregiverId as string,
            caregiverName: session.name,
            message,
            status: "pending",
            appliedAt: Date.now(),
          },
          ...prev,
        ];
      });
    },
    [session],
  );

  const withdrawApplication = useCallback(
    (jobId: string) => {
      if (!session?.caregiverId) return;
      const removed = applications.find(
        (a) => a.jobId === jobId && a.caregiverId === session.caregiverId,
      );
      setApplications((prev) =>
        prev.filter(
          (a) =>
            !(a.jobId === jobId && a.caregiverId === session.caregiverId),
        ),
      );
      if (removed) {
        setMessages((prev) =>
          prev.filter((m) => m.applicationId !== removed.id),
        );
      }
    },
    [session, applications],
  );

  const hasApplied = useCallback(
    (jobId: string) =>
      !!session?.caregiverId &&
      applications.some(
        (a) => a.jobId === jobId && a.caregiverId === session.caregiverId,
      ),
    [applications, session],
  );

  const myApplications = useCallback(
    () =>
      session?.caregiverId
        ? applications
            .filter((a) => a.caregiverId === session.caregiverId)
            .sort((a, b) => b.appliedAt - a.appliedAt)
        : [],
    [applications, session],
  );

  const applicationsForOwner = useCallback(() => {
    const owned = new Set(session?.ownedAfhIds ?? []);
    const ownedJobIds = new Set(
      jobs.filter((j) => owned.has(j.afhId)).map((j) => j.id),
    );
    return applications
      .filter((a) => ownedJobIds.has(a.jobId))
      .sort((a, b) => b.appliedAt - a.appliedAt);
  }, [applications, jobs, session]);

  const applicationsForJob = useCallback(
    (jobId: string) =>
      applications
        .filter((a) => a.jobId === jobId)
        .sort((a, b) => b.appliedAt - a.appliedAt),
    [applications],
  );

  const updateApplicationStatus = useCallback(
    (appId: string, status: ApplicationStatus) => {
      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status } : a)),
      );
    },
    [],
  );

  const toggleSaveJob = useCallback((jobId: string) => {
    setSavedJobIds((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [jobId, ...prev],
    );
  }, []);

  const isSaved = useCallback(
    (jobId: string) => savedJobIds.includes(jobId),
    [savedJobIds],
  );

  const myThreads = useCallback(() => {
    if (session?.role === "caregiver" && session.caregiverId) {
      return applications
        .filter((a) => a.caregiverId === session.caregiverId)
        .sort((a, b) => b.appliedAt - a.appliedAt);
    }
    if (session?.role === "owner") {
      const owned = new Set(session.ownedAfhIds);
      const ownedJobIds = new Set(
        jobs.filter((j) => owned.has(j.afhId)).map((j) => j.id),
      );
      return applications
        .filter((a) => ownedJobIds.has(a.jobId))
        .sort((a, b) => b.appliedAt - a.appliedAt);
    }
    return [];
  }, [applications, jobs, session]);

  const messagesForApplication = useCallback(
    (applicationId: string) =>
      messages
        .filter((m) => m.applicationId === applicationId)
        .sort((a, b) => a.sentAt - b.sentAt),
    [messages],
  );

  const sendMessage = useCallback(
    (applicationId: string, text: string) => {
      if (!session || !text.trim()) return;
      const msg: Message = {
        id: uid("msg"),
        applicationId,
        senderRole: session.role,
        senderName: session.name,
        text: text.trim(),
        sentAt: Date.now(),
      };
      setMessages((prev) => [...prev, msg]);
      // Mark own thread as read up to now
      const key =
        session.role === "caregiver"
          ? "caregiverThreadReadAt"
          : "ownerThreadReadAt";
      setReadState((rs) => ({
        ...rs,
        [key]: { ...rs[key], [applicationId]: Date.now() },
      }));
    },
    [session],
  );

  const markThreadRead = useCallback(
    (applicationId: string) => {
      if (!session) return;
      const key =
        session.role === "caregiver"
          ? "caregiverThreadReadAt"
          : "ownerThreadReadAt";
      setReadState((rs) => ({
        ...rs,
        [key]: { ...rs[key], [applicationId]: Date.now() },
      }));
    },
    [session],
  );

  const markJobsSeen = useCallback(() => {
    setReadState((rs) => ({ ...rs, caregiverJobsSeenAt: Date.now() }));
  }, []);

  const markApplicantsSeen = useCallback(() => {
    setReadState((rs) => ({ ...rs, ownerApplicantsSeenAt: Date.now() }));
  }, []);

  const unreadUrgentJobCount = useCallback(() => {
    return jobs.filter(
      (j) => j.urgent && j.postedAt > readState.caregiverJobsSeenAt,
    ).length;
  }, [jobs, readState.caregiverJobsSeenAt]);

  const unreadApplicantCount = useCallback(() => {
    const owned = new Set(session?.ownedAfhIds ?? []);
    const ownedJobIds = new Set(
      jobs.filter((j) => owned.has(j.afhId)).map((j) => j.id),
    );
    return applications.filter(
      (a) =>
        ownedJobIds.has(a.jobId) &&
        a.appliedAt > readState.ownerApplicantsSeenAt,
    ).length;
  }, [applications, jobs, readState.ownerApplicantsSeenAt, session]);

  const unreadMessageCount = useCallback(() => {
    if (!session) return 0;
    const threads = myThreads();
    const threadIds = new Set(threads.map((t) => t.id));
    const readMap =
      session.role === "caregiver"
        ? readState.caregiverThreadReadAt
        : readState.ownerThreadReadAt;
    const otherRole: Role = session.role === "caregiver" ? "owner" : "caregiver";

    return messages.filter((m) => {
      if (!threadIds.has(m.applicationId)) return false;
      if (m.senderRole !== otherRole) return false;
      const lastRead = readMap[m.applicationId] ?? 0;
      return m.sentAt > lastRead;
    }).length;
  }, [messages, myThreads, readState, session]);

  const navBadgeFor = useCallback(
    (path: string) => {
      if (!session) return 0;
      if (session.role === "caregiver") {
        if (path === "/caregiver/jobs") return unreadUrgentJobCount();
        if (path === "/caregiver/messages") return unreadMessageCount();
      }
      if (session.role === "owner") {
        if (path === "/owner/applicants") return unreadApplicantCount();
        if (path === "/owner/messages") return unreadMessageCount();
      }
      return 0;
    },
    [
      session,
      unreadUrgentJobCount,
      unreadApplicantCount,
      unreadMessageCount,
    ],
  );

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);
  const toggleTheme = useCallback(
    () => setThemeState((t) => (t === "dark" ? "light" : "dark")),
    [],
  );

  const value: AppContextValue = {
    session,
    jobs,
    afhs,
    reviews,
    caregivers,
    applications,
    savedJobIds,
    messages,
    readState,
    theme,
    login,
    logout,
    switchRole,
    addJob,
    deleteJob,
    addReview,
    getAfh,
    getCaregiver,
    myCaregiverProfile,
    updateMyProfile,
    reviewsForAfh,
    jobsForAfh,
    applyToJob,
    withdrawApplication,
    hasApplied,
    myApplications,
    applicationsForOwner,
    applicationsForJob,
    getApplication,
    updateApplicationStatus,
    toggleSaveJob,
    isSaved,
    myThreads,
    messagesForApplication,
    sendMessage,
    markThreadRead,
    markJobsSeen,
    markApplicantsSeen,
    unreadUrgentJobCount,
    unreadApplicantCount,
    unreadMessageCount,
    navBadgeFor,
    toggleTheme,
    setTheme,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within an AppProvider");
  return ctx;
}
