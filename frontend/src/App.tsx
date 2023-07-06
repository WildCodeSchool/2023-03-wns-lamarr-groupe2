import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ScoresPage from "./pages/scores/ScoresPage";
import ChallengesPage from "./pages/challenges/ChallengesPage";
import NotificationsPage from "./pages/notifications/NotificationsPage";
import SettingsPage from "./pages/settings-account/SettingsPage";
import ChallengePage from "./pages/challenge/ChallengePage";
import CreateChallengePage from "./pages/creation-challenge/CreateChallengePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/classement" element={<ScoresPage />} />
      <Route path="/eco-challenges" element={<ChallengesPage />} />
      <Route
        path="/eco-challenges/creation"
        element={<CreateChallengePage />}
      />
      <Route path="/eco-challenges/:id" element={<ChallengePage />} />
      <Route path="/parametres" element={<SettingsPage />} />
      <Route path="/notifications   " element={<NotificationsPage />} />
    </Routes>
  );
}
