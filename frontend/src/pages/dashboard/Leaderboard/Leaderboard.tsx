import { FC } from "react";
import LeaderboardElement from "./LeaderboardElement";
import { Friend } from "../../../features/contexts/utils/types";
import { isEmpty } from "remeda";


const Leaderboard: FC<{ sortedLeaderboard: Friend[] }> = ({ sortedLeaderboard }) => {

  return (
    <div className="w-full flex flex-col h-full gap-3 overflow-scroll">
      {isEmpty(sortedLeaderboard) ? <p>Ajoutez des amis pour vous challengez !</p> : sortedLeaderboard?.map((member, index) => (
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
