import React, { FC } from 'react';
import Team, { TTeam } from './Team';

interface TeamListProps {
    teams: TTeam[];
    view: "company" | 'user'
}

const TeamList: FC<TeamListProps> = ({ teams, view }) => {
    const uniqCol = teams.length === 1;
    const userView = `justify-items-center grid  ${uniqCol ? 'grid-cols-flow ' : 'grid-cols-2'} gap-6 `
    const companyView = ``

    return (
        <div className={`${view === 'user' ? userView : companyView} md:flex md:flex-wrap md:flex-shrink md:justify-center xl:justify-start overflow-hidden  `}>
            {teams?.slice(0, 4).map((team, index) => (
                <Team key={index} team={team} />
            ))}
        </div>
    );
}

export default TeamList;