import { Navigate, Route, Routes } from "react-router-dom";
import type { ReactNode } from "react";
import { useApp } from "./store/AppContext";
import type { Role } from "./types";
import { Layout } from "./components/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import JobBoard from "./pages/caregiver/JobBoard";
import Homes from "./pages/caregiver/Homes";
import HomeDetail from "./pages/caregiver/HomeDetail";
import Activity from "./pages/caregiver/Activity";
import Profile from "./pages/caregiver/Profile";
import CaregiverMessages from "./pages/caregiver/Messages";
import PostJobs from "./pages/owner/PostJobs";
import OwnerCaregivers from "./pages/owner/Caregivers";
import OwnerReviews from "./pages/owner/Reviews";
import Applicants from "./pages/owner/Applicants";
import OwnerMessages from "./pages/owner/Messages";

function RequireRole({ role, children }: { role: Role; children: ReactNode }) {
  const { session } = useApp();
  if (!session) return <Navigate to="/login" replace />;
  if (session.role !== role) {
    return <Navigate to={session.role === "owner" ? "/owner/jobs" : "/caregiver/jobs"} replace />;
  }
  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* Caregiver (User 1) */}
      <Route
        path="/caregiver/jobs"
        element={
          <RequireRole role="caregiver">
            <JobBoard />
          </RequireRole>
        }
      />
      <Route
        path="/caregiver/homes"
        element={
          <RequireRole role="caregiver">
            <Homes />
          </RequireRole>
        }
      />
      <Route
        path="/caregiver/homes/:afhId"
        element={
          <RequireRole role="caregiver">
            <HomeDetail />
          </RequireRole>
        }
      />
      <Route
        path="/caregiver/saved"
        element={
          <RequireRole role="caregiver">
            <Activity />
          </RequireRole>
        }
      />
      <Route
        path="/caregiver/messages"
        element={
          <RequireRole role="caregiver">
            <CaregiverMessages />
          </RequireRole>
        }
      />
      <Route
        path="/caregiver/profile"
        element={
          <RequireRole role="caregiver">
            <Profile />
          </RequireRole>
        }
      />

      {/* AFH Owner (User 2) */}
      <Route
        path="/owner/jobs"
        element={
          <RequireRole role="owner">
            <PostJobs />
          </RequireRole>
        }
      />
      <Route
        path="/owner/applicants"
        element={
          <RequireRole role="owner">
            <Applicants />
          </RequireRole>
        }
      />
      <Route
        path="/owner/messages"
        element={
          <RequireRole role="owner">
            <OwnerMessages />
          </RequireRole>
        }
      />
      <Route
        path="/owner/caregivers"
        element={
          <RequireRole role="owner">
            <OwnerCaregivers />
          </RequireRole>
        }
      />
      <Route
        path="/owner/reviews"
        element={
          <RequireRole role="owner">
            <OwnerReviews />
          </RequireRole>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
