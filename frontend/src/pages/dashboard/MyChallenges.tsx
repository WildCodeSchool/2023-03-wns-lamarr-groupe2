import { FC, PropsWithChildren } from "react";
import AddBtn from "../../components/AddBtn";
import { Link, useNavigate } from "react-router-dom";
import ChallengeList from "../challenges/CurrentChallenge/ChallengeList";

const MyChallenges: FC<PropsWithChildren> = () => {
  const navigate = useNavigate()

  return (
    <div className="h-full flex flex-col w-full">
      <h3 className="flex gap-4 mb-4">MES CHALLENGES<AddBtn onClick={() => navigate("/challenges/creation")} /></h3>
      <ChallengeList />
      <Link to='/challenges' className="text-tertiary-dark pt-2 text-main-p">voir plus</Link>
    </div>
  );
};

export default MyChallenges;
