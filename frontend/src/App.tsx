import { Routes, Route, useLocation } from "react-router-dom";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ScoresPage from "./pages/scores/ScoresPage";
import ChallengesPage from "./pages/challenges/ChallengesPage";
import NotificationsPage from "./pages/notifications/NotificationsPage";
import SettingsPage from "./pages/settings-account/SettingsPage";
import ChallengePage from "./pages/challenge/ChallengePage";
import CreateChallengePage from "./pages/creation-challenge/CreateChallengePage";
import { HeaderBar } from "./components/HeaderBar";
import NavBtn from "./components/NavBtn";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { ErrorPage } from "./pages/homepage/ErrorPage";
import Homepage from "./pages/homepage/Homepage";
import useUserContext from "./features/contexts/UserContext";
import CompanyGroupsPage from "./pages/teams/CompanyGroupsPage";
import { isEmpty } from "remeda";
import Footer from "./components/Footer";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Homepage />} />
      <Route path="/register" element={<Homepage />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
};

const App = () => {
  const { user } = useUserContext();
  const location = useLocation();
  const isCompany = false; //user.company

  return isEmpty(user) ? (
    <AuthRoutes />
  ) : (
    <div className="flex flex-col-reverse lg:flex-row w-screen min-h-screen max-w-screen">
      {user.username && <NavigationBar />}

      <main className="flex flex-col flex-grow lg:flex-col">
        {user.username && (
          <>
            <HeaderBar />
            {location.pathname !== "/" &&
              location.pathname !== "/dashboard" &&
              location.pathname !== "/company/dashboard" && (
                <NavBtn type="return" />
              )}
          </>
        )}

        <div className="screen flex-grow overflow-y-auto">
          <Routes>
            {isCompany ? (
              <>
                <Route path="/" element={<DashboardPage />} />
                <Route
                  path={"/company/dashboard"}
                  element={<DashboardPage />}
                />
                <Route
                  path="/company/challenges"
                  element={<ChallengesPage />}
                />
                <Route
                  path="/company/challenges/:id"
                  element={<ChallengePage />}
                />
                <Route path="/company/scores" element={<ScoresPage />} />
                <Route path="/company/teams" element={<CompanyGroupsPage />} />
                <Route
                  path="/company/challenges/creation"
                  element={<CreateChallengePage />}
                />
                <Route path="/company/settings" element={<SettingsPage />} />
              </>
            ) : (
              <>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/scores" element={<ScoresPage />} />
                <Route path="/challenges" element={<ChallengesPage />} />
                <Route
                  path="/challenges/creation"
                  element={<CreateChallengePage />}
                />
                <Route path="/challenges/:id" element={<ChallengePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
              </>
            )}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default App;
