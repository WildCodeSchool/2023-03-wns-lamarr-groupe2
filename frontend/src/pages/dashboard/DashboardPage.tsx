import useChallengeContext from "../../features/contexts/ChallengeContext";
import DashboardPageModale from "./DashboardPageModale";
import FriendsLeaderboard from "./Leaderboard/FriendsLeaderboard";
import MyChallenges from "./MyChallenges";
//import MyTeams from "./MyTeams"; -> Waiting for company add

export default function DashboardPage() {
  //  const isUserGotTeams = true; // userContext check need comany be not null back
  const { isLoading } = useChallengeContext();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="mainScreen">
      <div className="flex justify-center gap-20 w-full">
        <MyChallenges />
        {/*   {isUserGotTeams && (
        <div className="  hidden w-5/12 lg:flex max-w-[328px] xl:max-w-full">
          <MyTeams />
        </div>
      )} */}
        <DashboardPageModale />
        <div className="border rounded-medium hidden h-3/4  lg:flex ">
          <FriendsLeaderboard />
        </div>
      </div>
    </section>
  );
}
