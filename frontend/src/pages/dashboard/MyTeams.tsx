import TeamList from "../teams/TeamList";
import { teamsExample } from "../teams/data";

const MyTeams = () => {
  return <div className="h-full flex flex-col w-full mr-10 ">
    <h3 className="flex gap-4 mb-14">GROUPES </h3>
    <TeamList view="user" teams={teamsExample} />
  </div>
};

export default MyTeams;
