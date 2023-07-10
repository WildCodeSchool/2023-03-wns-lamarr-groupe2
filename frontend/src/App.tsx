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
import ContextProvider from "./features/contexts/AppProvider";


export default function App() {
  return (
    <ContextProvider >
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
        <Route path="/company/dashboard" element={<CompanyDashboardPage />} />
        <Route path="/company/challenges" element={<ChallengesPage />} />
        <Route path="/company/challenges/:id" element={<ChallengePage />} />
        <Route path="/company/scores" element={<ScoresPage />} />
        <Route path="/company/teams" element={<CompanyGroupsPage />} />
        <Route
          path="/company/challenges/creation"
          element={<CreateChallengePage />}
        />
        <Route path="/company/settings" element={<SettingsPage />} />
      </Routes>
    </ContextProvider>
  );
}
