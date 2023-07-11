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
import useUserContext, { UserContextProvider } from "./features/contexts/UserContext";
import { useEffect } from "react";
import InscriptionPage from "./pages/homepage/Inscription/InscriptionPage";
import { HeaderBar } from "./components/HeaderBar";
import NavBtn from "./components/NavBtn";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import ConnexionPage from "./pages/homepage/Connexion/ConnexionPage";
import { ErrorPage } from "./pages/homepage/ErrorPage";

const AppLayout = () => {

  const App = () => {
    const location = useLocation();
    const { disconnect, user, isUser } = useUserContext()
    const isUserEmpty = !isUser; //isEmpty(user);
    const isCompany = false; //user.company

    console.log(isUser)
    const AuthRoutes = () => {
      return (
        <Routes>
          <Route path="/login" element={<ConnexionPage />} />
          <Route path="/register" element={<InscriptionPage />} />
          <Route path="/" element={<ConnexionPage />} />
        </Routes>
      );
    }

    return isUserEmpty ? <AuthRoutes /> : (
      <div className="flex flex-col-reverse min-h-screen lg:flex lg:flex-row w-screen lg:h-screen">
        {!isUserEmpty && <NavigationBar />}
        <main className="flex flex-col flex-grow lg:flex-col w-full">
          {!isUserEmpty && <><HeaderBar /> {(location.pathname !== '/' && location.pathname !== '/dashboard' && location.pathname !== '/company/dashboard') && <NavBtn type="return" />} </>}

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
  return (
    <UserContextProvider>
      <App />
    </UserContextProvider>
  )
}

export default AppLayout