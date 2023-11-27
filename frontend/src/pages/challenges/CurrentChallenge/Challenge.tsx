import { FC } from "react";
import { ProgressionBar } from "../../../components/ProgressionBar";
import NavBtn from "../../../components/NavBtn";
import edit from "../../../assets/icons/edit.svg";
import ProfilePicture from "../../../components/ProfilePicture";
import { TChallenge } from "../../../features/contexts/utils/types";
import useUserContext from "../../../features/contexts/UserContext";
import { TimeLeft } from "../../challenge/TimeLeft";

export const Challenge: FC<{
  challenge: TChallenge;
}> = ({ challenge }) => {
  const challMember = [1, 2, 3]; // TO-DO : Get the list of chall members (not only teams)
  const { user } = useUserContext();
  const userId = user.id;
  const isOwner = challenge?.creator?.id === userId;
  const numberOfEcoActions = challenge.ecoActions?.length;
  // Calculate progress for the current challenge

  return (
    <div className="border-1 h-full max-h-[228px] md:min-w-[572px] lg:min-w-fit max-w-[572px] p-3 rounded-medium">
      <div className=" flex h-full justify-between ">
        <div className="flex flex-col  w-9/12">
          <div className="flex-grow">
            <h4 className="uppercase text-main-p font-bold truncate">
              {challenge?.title}
            </h4>
            <ProgressionBar value={0} />
            <p className="text-main-p my-2 text-primary-dark">
              Nb d'éco-gestes : {numberOfEcoActions ?? 0}
            </p>
          </div>
          <TimeLeft challenge={challenge} />
        </div>

        <div className=" flex flex-col  lg:flex lg:flex-col  w-3/12 justify-between  items-end lg:items-end lg:justify-between">
          <div className="lg:flex">
            {isOwner && (
              <img
                src={edit}
                alt="edit"
                onClick={() =>
                  console.log("TO-DO : Add edit navigation and edit logic")
                }
                className="m-2"
              />
            )}
            <NavBtn type="specific" link={`/challenges/${challenge?.id}`} />
          </div>

          {/* TO-DO : make simething like the maquet */}
          <div className="flex">
            {challMember?.slice(0, 3)?.map((member, index) => (
              <div key={index} className="mr-[-10px]">
                <ProfilePicture /* url={member.picture} */ size="smallPic" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
