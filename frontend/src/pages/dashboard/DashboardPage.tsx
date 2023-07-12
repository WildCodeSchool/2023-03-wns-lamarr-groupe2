import FriendsLeaderboard from "./FriendsLeaderboard";
import MyChallenges from "./MyChallenges";
import MyTeams from "./MyTeams";

export default function DashboardPage() {


  return <section className="flex gap-10 w-full">
    <div className="border-2 border-primary-danger hidden w-3/12   lg:flex"><FriendsLeaderboard /></div>
    <div className="flex justify-center w-full lg:block lg:w-5/12 "><MyChallenges /></div>
    <div className="border-2 border-primary-attention hidden w-4/12 lg:flex"><MyTeams /></div>
  </section>;
}
