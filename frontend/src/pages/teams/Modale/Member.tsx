import { FC } from "react"
import ProfilePicture from "../../../components/ProfilePicture"
import cross from '../../../assets/icons/x.svg'

export type Member = {
    id: number,
    username: string,
}
const Member: FC<{ member: Member, teamsLength: number, index: number }> = ({ member, index, teamsLength }) => {
    const isCompanyOwner = false // Role and Company Id from User + Company id s 
    const isLastMember = teamsLength === index + 1

    // TO-DO : add remove member logic (team context)

    return (
        <div className={`flex items-center justify-between w-full pb-5 pt-9 ${!isLastMember && 'border-b-1'} `}>
            <div className="flex "><ProfilePicture size="smallPic" />
                <p className="ml-5">{member.username}</p>
            </div>
            {isCompanyOwner && <img src={cross} alt='delete' className="cursor-pointer" onClick={() => console.log('TO-DO : delete')} />}
        </div>

    )
}

export default Member