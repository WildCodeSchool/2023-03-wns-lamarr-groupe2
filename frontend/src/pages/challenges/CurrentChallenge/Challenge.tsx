import { FC, useEffect, useState } from "react";
import { ProgressionBar } from "../../../components/ProgressionBar";
import NavBtn from "../../../components/NavBtn";
import { formattedTimeLeft } from "./time";
import edit from "../../../assets/icons/edit.svg";
import ProfilePicture from "../../../components/ProfilePicture";
import { TChallenge } from "../../../features/contexts/utils/types";
import useChallengeContext from "../../../features/contexts/ChallengeContext";

export const Challenge: FC<{ challenge: TChallenge }> = ({ challenge }) => {
  const challMember = [1, 2, 3]; // TO-DO : Get the list of chall members (not only teams)
  const userId = 1; // UserContext user.id
  const isOwner = challenge?.creator?.id === userId;
  const { selectedTasks } = useChallengeContext();
  const numberOfEcoActions = challenge.ecoActions?.length;
  const numberOfSelectedEcoActions = selectedTasks.length;
  const progress = Math.round(numberOfSelectedEcoActions / numberOfEcoActions); //TO-DO : Calculate progression (actions done / nbr of actions)
  const timeLeft = formattedTimeLeft(challenge?.startAt, challenge?.endAt);

  const TimeLeft = () => {
    const [url, setUrl] = useState<string | undefined>(undefined);

    const colorIndicator = (timeLeft: any, type?: "clock") => {
      if (Object.keys(timeLeft)[0] === "done") {
        return type ? "done" : "text-black";
      }
      if (Object.keys(timeLeft)[0] === "H") {
        return type ? "danger" : "text-primary-danger";
      }
      if (Object.keys(timeLeft)[0] === "M") {
        return type ? "attention" : "text-primary-attention";
      }
      return type ? "good" : "text-primary-good";
    };

    useEffect(() => {
      const importImage = async () => {
        try {
          const image = await import(
            `../../../assets/icons/clock/clock-${colorIndicator(
              timeLeft,
              "clock"
            )}.svg`
          );
          setUrl(image.default);
        } catch (error) {
          console.error(error);
        }
      };

      importImage();
    }, [timeLeft]);

    return (
      <span className={`${colorIndicator(timeLeft)} flex gap-3`}>
        <img src={url} alt="clock" /> {Object.values(timeLeft)}{" "}
        {Object.keys(timeLeft)}{" "}
      </span>
    );
  };

  return (
    <div className="border-1 h-full w-full p-3 rounded-medium" >
      <div className=" flex h-full justify-between " >
        <div className="flex flex-col  w-9/12">
          <div className="flex-grow">
            <h4 className="uppercase text-main-p font-bold truncate lg:max-w-[500px] xl:max-w-[800px]">
              {challenge?.title}
            </h4>
            <ProgressionBar value={progress} />
            <p className="text-main-p my-2 text-primary-dark">
              Nb d'éco-gestes : {challenge?.ecoActions.length}
            </p>
          </div>
          <TimeLeft />
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
        </div>
      </div>
    </div>
  );
};
