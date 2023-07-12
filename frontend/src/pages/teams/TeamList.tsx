import React, { FC } from 'react';
import Team, { TTeam } from './Team';

interface TeamListProps {
    teams: TTeam[];
    view: "company" | 'user'
}

const TeamList: FC<TeamListProps> = ({ teams, view }) => {
    const uniqCol = teams.length === 1;
    const userView = `justify-items-center grid ${uniqCol ? 'grid-cols-flow' : 'grid-cols-2'} gap-8`
    const companyView = ``

    return (
        <div className={`${view === 'user' ? userView : companyView}`}>
            {teams?.slice(0, 6).map((team, index) => (
                <Team key={index} team={team} />
            ))}
        </div>
    );
}

export default TeamList;