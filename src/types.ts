export type Role = "caregiver" | "owner";

export type Theme = "light" | "dark";

export type ApplicationStatus =
  | "pending"
  | "reviewed"
  | "interview"
  | "hired"
  | "declined";

export interface Application {
  id: string;
  jobId: string;
  caregiverId: string;
  caregiverName: string;
  message: string;
  status: ApplicationStatus;
  appliedAt: number; // epoch ms
}

export type JobType = "full-time" | "part-time" | "shift-based";

export type Shift = "Day" | "Evening" | "Overnight" | "Weekend";

export interface AFH {
  id: string;
  name: string;
  location: string;
  city: string;
  beds: number;
  specialties: string[];
  blurb: string;
  rating: number; // derived/cached average
  reviewCount: number;
  accentColor: string; // tailwind-friendly hex used for avatars
  ownerName: string;
}

export interface Job {
  id: string;
  afhId: string;
  title: string;
  description: string;
  payRate: number; // hourly USD
  hours: string; // human readable, e.g. "Mon–Fri, 7a–3p"
  jobType: JobType;
  shift: Shift;
  urgent: boolean;
  postedAt: number; // epoch ms
}

export interface Review {
  id: string;
  afhId: string;
  authorName: string;
  authorRole: string; // e.g. "Certified CNA"
  rating: number; // 1-5
  text: string;
  date: number; // epoch ms
}

export interface Caregiver {
  id: string;
  name: string;
  title: string; // e.g. "Certified Nursing Assistant (CNA)"
  yearsExperience: number;
  certifications: string[];
  skills: string[];
  bio: string;
  city: string;
  availability: JobType[];
  rating: number;
  reviewCount: number;
  accentColor: string;
  verified: boolean;
}

export type CaregiverProfileUpdate = Pick<
  Caregiver,
  | "name"
  | "title"
  | "yearsExperience"
  | "certifications"
  | "skills"
  | "bio"
  | "city"
  | "availability"
>;

export interface Message {
  id: string;
  applicationId: string;
  senderRole: Role;
  senderName: string;
  text: string;
  sentAt: number;
}

/** Tracks "last seen" timestamps for notification badges. */
export interface ReadState {
  caregiverJobsSeenAt: number;
  ownerApplicantsSeenAt: number;
  /** applicationId → last message read at (per role, stored separately in persisted state) */
  caregiverThreadReadAt: Record<string, number>;
  ownerThreadReadAt: Record<string, number>;
}
