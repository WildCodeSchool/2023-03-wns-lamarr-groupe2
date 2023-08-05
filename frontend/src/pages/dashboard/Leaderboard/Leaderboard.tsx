import { FC } from "react";
import LeaderboardElement, { TLeaderboardElement } from "./LeaderboardElement";
import { Friend } from "../../../features/contexts/utils/types";


const Leaderboard: FC<{ sortedLeaderboard: Friend[] }> = ({ sortedLeaderboard }) => {
  /*   const sortedLeaderboard = leaderBoardData?.sort((a, b) => b.score - a.score);
   */
  return (
    <div className="w-full flex flex-col h-full gap-3 overflow-scroll">
      {sortedLeaderboard?.map((member, index) => (
        <LeaderboardElement
          id={member.id}
          username={member.username}
          score={member.points}
          picture={member.picture}
          key={index}
          position={index + 1}
        />
      ))}
    </div>
  );
};

export default Leaderboard;
