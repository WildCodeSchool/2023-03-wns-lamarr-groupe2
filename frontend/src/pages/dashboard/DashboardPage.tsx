import FriendsLeaderboard from "./Leaderboard/FriendsLeaderboard";
import MyChallenges from "./MyChallenges";
import MyTeams from "./MyTeams";

export default function DashboardPage() {
  const isUserGotTeams = true // userContext check


  return <section className="flex gap-10 w-full ">
    <div className="border rounded-medium hidden w-[35%] max-w-[328px]  lg:flex"><FriendsLeaderboard /></div>
    <div className="flex justify-center w-full lg:block lg:w-5/12 "><MyChallenges /></div>
    {isUserGotTeams && <div className=" hidden w-5/12 lg:flex"><MyTeams /></div>}
  </section>;
}
