import LeaderboardElement from "./LeaderboardElement"
import { leaderBoardData } from "./data"


const Leaderboard = () => {
    return (
        <div className="w-full flex flex-col h-full gap-3 overflow-scroll">{leaderBoardData?.map((member, index) => <LeaderboardElement id={member.id} username={member.username} score={member.score} picture={member.picture} key={index} position={index + 1} />)}</div>
    )
}

export default Leaderboard