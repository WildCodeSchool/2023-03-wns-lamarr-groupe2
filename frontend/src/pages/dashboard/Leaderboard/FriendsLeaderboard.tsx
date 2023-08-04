import leaderboardIcon from "../../../assets/icons/leaderboard.svg";
import useUserContext from "../../../features/contexts/UserContext";
import Leaderboard from "./Leaderboard";
import LeaderboardElement from "./LeaderboardElement";

const FriendsLeaderboard = () => {
  const { user } = useUserContext();

  return (
    <div className="h-full flex flex-col w-full">
      <div className="flex items-center px-5 pt-6 w-full justify-center lg:gap-6 mb-4">
        <h3>CLASSEMENT</h3>
        <img src={leaderboardIcon} alt="leaderboard" />
      </div>
      <div className="w-full justify-center">
        <div className="border-b-1 mb-5">
          {/* TO-DO : calculate position */}
          <LeaderboardElement
            id={user.id}
            username={user.username}
            score={user.points ?? 0}
            position={1}
            picture={user?.picture}
            mode="header"
          />
        </div>
      </div>
      <Leaderboard />
    </div>
  );
};

export default FriendsLeaderboard;
