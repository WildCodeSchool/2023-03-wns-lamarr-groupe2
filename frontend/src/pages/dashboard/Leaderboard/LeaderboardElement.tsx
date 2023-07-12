import { FC } from "react"
import ProfilePicture from "../../../components/ProfilePicture"
import { me } from './data';

export type LeaderboardElement = {
    id: number,
    username: string,
    picture: string,
    position: number,
    score: number
    mode?: "header"
}

const LeaderboardElement: FC<LeaderboardElement> = ({ id, username, picture, score, position, mode }) => {
    const isUser = me.id === id // user context && user id

    return (
        <div className={`mx-3 flex justify-between  items-center  ${isUser && !mode && 'border-y-1 bg-primary-attention'} ${mode && 'mb-5'}`}>

            <div className="w-1/12 text-secondary-title font-bold">{position}</div>

            <div className={`w-8/12 ml-3 flex items-center`}>
                <ProfilePicture size='smallPic' url={picture} />
                <p className={`ml-1 truncate ${mode && ' text-secondary-title'}`}>{isUser ? 'MOI' : username}</p>
            </div>

            <div className="w-2/12 flex mr-5 ">
                <p className=" text-secondary-title font-bold">{score}</p>
                <p className=" flex items-center text-small-p ">pts</p>
            </div>
        </div>
    )
}

export default LeaderboardElement