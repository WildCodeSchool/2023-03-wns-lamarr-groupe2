import { FC, useState } from 'react'
import Modale from './Modale/Modale'

export type TTeam = {
    id: number,
    company_name: string,
    color: string
    challenge_id?: number,
    company_id: number
}

const Team: FC<{ team: TTeam }> = ({ team }) => {
    const [isOpenModale, setIsOpenModale] = useState(false)

    const acronymGenerator = (companyLabel: string) => {
        const tokens = companyLabel.split(' ')
        if (tokens.length < 2) {
            return companyLabel?.slice(0, 3)
        }
        const firstLetterToken = tokens.map((token) => token.slice(0, 1))
        return firstLetterToken.join('').slice(0, 3)
    }

    return (
        <>
            <div className={`h-16 w-16 md:h-20 md:w-20 lg:h-28 cursor-pointer lg:w-28 flex justify-center items-center uppercase rounded-full border-1 ${team?.color}`} onClick={() => setIsOpenModale(prev => !prev)}>{acronymGenerator(team?.company_name)}</div>
            {isOpenModale && <Modale setIsOpenModale={setIsOpenModale} companyName={team.company_name} companyId={team.id} />}
        </>
    )
}

export default Team