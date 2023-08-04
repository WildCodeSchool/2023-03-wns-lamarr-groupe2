import { FC, PropsWithChildren } from "react";
import Member from "./Member";
import { teamMembers } from "./data";

const TeamMembers: FC<PropsWithChildren> = () => {
  const teamsLength = teamMembers?.length;
  return (
    <>
      {teamMembers?.map((member, index) => (
        <Member
          key={index}
          index={index}
          member={member}
          teamsLength={teamsLength}
        />
      ))}
    </>
  );
};

export default TeamMembers;
