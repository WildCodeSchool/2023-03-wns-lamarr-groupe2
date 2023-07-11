import { Routes, Route, useLocation } from "react-router-dom";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ScoresPage from "./pages/scores/ScoresPage";
import ChallengesPage from "./pages/challenges/ChallengesPage";
import NotificationsPage from "./pages/notifications/NotificationsPage";
import SettingsPage from "./pages/settings-account/SettingsPage";
import ChallengePage from "./pages/challenge/ChallengePage";
import CreateChallengePage from "./pages/creation-challenge/CreateChallengePage";
import CompanyGroupsPage from "./pages/company/company-groups/CompanyGroupsPage";
import CompanyDashboardPage from "./pages/company/company-dashboard/CompanyDashboardPage";
import ConnexionPage from "./pages/homepage/Connexion/ConnexionPage";
import InscriptionPage from "./pages/homepage/Inscription/InscriptionPage";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { HeaderBar } from "./components/HeaderBar";
import { ErrorPage } from "./pages/homepage/ErrorPage";
import NavBtn from "./components/NavBtn";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<ConnexionPage />} />
      <Route path="/register" element={<InscriptionPage />} />
      <Route path="/" element={<ConnexionPage />} />
    </Routes>
  );
}

const App = () => {
  const location = useLocation();
  console.log(location)
  const isUserEmpty = false; //isEmpty(user);
  const isCompany = false; //user.company

  return isUserEmpty ? <AuthRoutes /> : (
    <div className="flex flex-col-reverse min-h-screen lg:flex lg:flex-row w-screen lg:h-screen">
      {!isUserEmpty && <NavigationBar />}
      <main className="flex flex-grow lg:flex-col w-full">
        {!isUserEmpty && <><HeaderBar /> {(location.pathname !== '/' && location.pathname !== '/dashboard') && <NavBtn type="return" />} </>}

        <Routes>
          {isCompany ? (
            <>
              <Route path="/" element={<CompanyDashboardPage />} />
              <Route path={"/company/dashboard"} element={<CompanyDashboardPage />} />
              <Route path="/company/challenges" element={<ChallengesPage />} />
              <Route path="/company/challenges/:id" element={<ChallengePage />} />
              <Route path="/company/scores" element={<ScoresPage />} />
              <Route path="/company/teams" element={<CompanyGroupsPage />} />
              <Route
                path="/company/challenges/creation"
                element={<CreateChallengePage />}
              />
              <Route path="/company/settings" element={<SettingsPage />} />
            </>
          ) :
            <>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/scores" element={<ScoresPage />} />
              <Route path="/challenges" element={<ChallengesPage />} />
              <Route path="/challenges/creation" element={<CreateChallengePage />} />
              <Route path="/challenges/:id" element={<ChallengePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
            </>}
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </main>
    </div>)
}

export default App