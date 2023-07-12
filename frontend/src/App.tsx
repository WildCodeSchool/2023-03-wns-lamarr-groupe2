import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ScoresPage from "./pages/scores/ScoresPage";
import ChallengesPage from "./pages/challenges/ChallengesPage";
import NotificationsPage from "./pages/notifications/NotificationsPage";
import SettingsPage from "./pages/settings-account/SettingsPage";
import ChallengePage from "./pages/challenge/ChallengePage";
import CreateChallengePage from "./pages/creation-challenge/CreateChallengePage";
import CompanyGroupsPage from "./pages/company/company-groups/CompanyGroupsPage";
import CompanyDashboardPage from "./pages/company/company-dashboard/CompanyDashboardPage";
import { isEmpty } from "remeda";
import { useEffect, useState } from "react";
import { HeaderBar } from "./components/HeaderBar";
import NavBtn from "./components/NavBtn";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { ErrorPage } from "./pages/homepage/ErrorPage";
import Homepage from "./pages/homepage/Homepage";
import useUserContext from "./features/contexts/UserContext";

const AuthRoutes = () => {
  return (
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
  );
};

export default App;
