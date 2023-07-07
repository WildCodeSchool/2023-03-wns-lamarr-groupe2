import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ScoresPage from "./pages/scores/ScoresPage";
import ChallengesPage from "./pages/challenges/ChallengesPage";
import NotificationsPage from "./pages/notifications/NotificationsPage";
import SettingsPage from "./pages/settings-account/SettingsPage";
import ChallengePage from "./pages/challenge/ChallengePage";
import CreateChallengePage from "./pages/creation-challenge/CreateChallengePage";
import CompanyGroupsPage from "./pages/company/company-groups/CompanyGroupsPage";
import CompanyDashboardPage from "./pages/company/company-dashboard/CompanyDashboardPage";
import Toggle from "./components/Toggle";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/scores" element={<ScoresPage />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/challenges/creation" element={<CreateChallengePage />} />
        <Route path="/challenges/:id" element={<ChallengePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/notifications   " element={<NotificationsPage />} />
        {/* Admin routes for company accounts */}
        <Route path="/admin/dashboard" element={<CompanyDashboardPage />} />
        <Route path="/admin/challenges" element={<ChallengesPage />} />
        <Route path="/admin/challenges/:id" element={<ChallengePage />} />
        <Route path="/admin/scores" element={<ScoresPage />} />
        <Route path="/admin/teams" element={<CompanyGroupsPage />} />
        <Route
          path="/admin/challenges/creation"
          element={<CreateChallengePage />}
        />
        <Route path="/admin/settings" element={<SettingsPage />} />
      </Routes>
      <Toggle onClick={() => console.log("toggled")} styled={"toggle"} />
    </>
  );
}
