import { FC } from 'react'
import ProfilePicture from '../../components/ProfilePicture'
import trash from "../../assets/icons/trash.svg"
import { TLeaderboardElement } from '../dashboard/Leaderboard/LeaderboardElement'

export type BoardRowProps = {
    index: number
    friend: TLeaderboardElement
}
const BoardRow: FC<BoardRowProps> = ({ index, friend }) => {
    return (
        <tr className='border-b-2 border-b-secondary-dark '>
            <td className='h-20'>
                <div className='flex items-center gap-6'>
                    <p className='font-bold  text-[24px]'>{index + 1}</p>
                    <ProfilePicture size='mediumPic' url={friend.picture} />
                    <p>{friend.username}</p>
                </div>
            </td>
            <td className='text-center hidden md:table-cell font-bold'>5</td>
            <td className='text-center'>
                <div className="flex gap-2 items-center mr-6 justify-center lg:w-3/5   xxl:w-2/5 xl:w-2/5 bg-primary-attention rounded-small ">
                    <div className="font-bold  text-[25px]">{friend.score}</div>
                    <div className="text-small-p">pts</div>
                </div>
            </td>
            <td className=''>
                <div className="flex items-center lg:w-3/5 xl:w-3/5  xxl:w-2/5 justify-center bg-primary-danger py-2 px-1 rounded-md">
                    <img src={trash} alt='delete' />
                </div>
            </td>
        </tr>
    )
}

export default BoardRow