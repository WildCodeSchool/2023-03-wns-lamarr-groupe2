import { FC } from "react";
import { ProgressionBar } from "../../../components/ProgressionBar";
import NavBtn from "../../../components/NavBtn";
import edit from "../../../assets/icons/edit.svg";
import ProfilePicture from "../../../components/ProfilePicture";
import { TChallenge } from "../../../features/contexts/utils/types";
import useUserContext from "../../../features/contexts/UserContext";
import { TimeLeft } from "../../challenge/TimeLeft";
import useChallengeContext from "../../../features/contexts/ChallengeContext";
import { formattedTimeLeft } from "./time";

export const Challenge: FC<{
  challenge: TChallenge;
}> = ({ challenge }) => {
  const challMember = [1, 2, 3]; // TO-DO : Get the list of chall members (not only teams)
  const { user } = useUserContext();
  const { myChallenges } = useChallengeContext();
  const userId = user.id;
  const isOwner = challenge?.creator?.id === userId;
  const numberOfEcoActions = challenge.ecoActions?.length;

  const currentChallengeProgress = myChallenges.find(
    (myChallenge) => myChallenge.challenge.id === challenge.id
  )?.progress;

  const timeLeft = formattedTimeLeft(challenge?.endAt);

  return (
    <div
      className={`border-1 w-full p-3 rounded-medium h-48 max-h-48 ${
        timeLeft.done && "grayscale pointer-events-none"
      }`}
    >
      <div className=" flex h-full justify-between ">
        <div className="flex flex-col  w-9/12">
          <div className="flex-grow">
            <h4 className="uppercase text-main-p font-bold truncate lg:max-w-[500px] xl:max-w-[800px]">
              {challenge?.title}
            </h4>
            {challenge.contenders
              .map((contender) => contender.id)
              .includes(user.id) && (
              <ProgressionBar value={currentChallengeProgress ?? 0} />
            )}

            <p className="text-main-p my-2 text-primary-dark">
              Nb d'éco-gestes : {numberOfEcoActions ?? 0}
            </p>
          </div>
          <TimeLeft challenge={challenge} />
        </div>

        <div>
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
              <div key={index} className="mr-[-10px] py-8">
                <ProfilePicture /* url={member.picture} */ size="smallPic" />
              </div>
            ))}
          </div>
          {isOwner && <div className="text-primary-good">Créateur</div>}
        </div>
      </div>
    </div>
  );
};
