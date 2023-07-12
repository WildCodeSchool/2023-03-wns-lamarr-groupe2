import DashboardPageModale from "./DashboardPageModale";
import FriendsLeaderboard from "./Leaderboard/FriendsLeaderboard";
import MyChallenges from "./MyChallenges";
import MyTeams from "./MyTeams";

export default function DashboardPage() {
  const isUserGotTeams = true // userContext check

  return <section className="gap-10  xl:gap-20 flex justify-center lg:justify-start w-full  h-full">

    <div className="border rounded-medium hidden w-5/12 max-w-[328px]  lg:flex xl:max-w-[500px]"><FriendsLeaderboard /></div>
    <div className="lg:flex lg:w-5/12 xl:w-3/12  "><MyChallenges /></div>
    {isUserGotTeams && <div className="  hidden w-5/12 lg:flex max-w-[328px] xl:max-w-full"><MyTeams /></div>}
    <DashboardPageModale />

  </section>;
}
