import useUserContext from "../../features/contexts/UserContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfilePicture from "../../components/ProfilePicture";
import BtnCustom from "../../components/BtnCustom";
import ChallengeLeaveModale from "./ChallengeLeaveModal";
import { isEmpty } from "remeda";
import send from "../../assets/icons/sendmessage.svg";
import trash from "../../assets/icons/trash.svg";
import edit from "../../assets/icons/edit.svg";
import InputCustom from "../../components/InputCustom";
import useChallengeContext from "../../features/contexts/ChallengeContext";
import ReactQuill from "react-quill";
import moment from "moment";
import DifficultyLevel from "../../components/DifficultyLevel";
import RadioBtn from "../../components/RadioBtn";

const challenge = {
  comments: [
    {
      id: 1,
      userId: 3,
      firstname: "Jean-Eudes",
      publication: "2023-10-02 08:18:05.086",
      content:
        "trop bien ce challenge, même si ça gratte de ne pas se laver. Ca gratte juste un peu sous les aisselles !",
    },
    {
      id: 2,
      userId: 567,
      firstname: "Quentin",
      publication: "2023-14-02 00:00:00",
      content: "Grâce aux bactéries, les laborantins seront ravis",
    },
  ],
};

const ChallengePage = () => {
  /* Later */
  //TO-DO : Get comments
  //TO-DO : Remove fake Challenge const when done
  //TO-DO : Logic edit / delete commentary

  const { user } = useUserContext();
  const {
    currentChallenge,
    getChallenge,
    getEcoActionSelectionStatus,
    ecoActionSelectionStatus,
    updateEcoActionSelectionStatus,
    updateMyChallengeProgress,
  } = useChallengeContext();
  const isUserChallengeCreator = user.id === currentChallenge?.creator.id;
  const [isShowingMore, setIsShowingMore] = useState(false);
  const [comment, setComment] = useState<string>("");
  const [isOpenModale, setIsOpenModale] = useState(false);
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const formatDate = (date: string) => {
    return moment(date).format("LL");
  };

  //Calculate progress
  const numberOfEcoActions = currentChallenge?.ecoActions?.length;
  const selectedEcoActions = ecoActionSelectionStatus.filter(
    (item) => item.ecoActionIsSelected
  );
  const progress = Math.round(
    (selectedEcoActions.length / numberOfEcoActions!) * 100
  );

  //init page with data
  useEffect(() => {
    const fetchData = async () => {
      await getChallenge(parseInt(params.id!));
      await getEcoActionSelectionStatus(parseInt(params.id!));
      updateMyChallengeProgress(currentChallenge?.id!, progress);
      setIsLoading(false);
    };

    fetchData();
  }, [
    currentChallenge?.id,
    getChallenge,
    getEcoActionSelectionStatus,
    params.id,
    progress,
    updateMyChallengeProgress,
  ]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  //Calculate user score and points
  const totalPoints = ecoActionSelectionStatus
    ?.map((ecoAction) =>
      ecoAction.ecoAction?.id ? ecoAction.ecoAction.points : 0
    )
    .reduce((a, b) => a! + b!, 0);
  const successPoints = (ecoActionSelectionStatus?.map((ecoAction) =>
    ecoAction?.ecoActionIsSelected ? ecoAction?.ecoAction?.points : 0
  ))
    .flatMap((task) => task)
    .reduce((a, b) => a! + b!, 0);

  const nbrTask = currentChallenge?.ecoActions?.length;
  const nbrTaskSelected = ecoActionSelectionStatus?.filter(
    (ecoAction) => ecoAction.ecoActionIsSelected
  ).length;

  //Update selectedEcoAction & challenge progress
  const updateData = async (item: {
    id?: number;
    ecoAction: any;
    ecoActionIsSelected: boolean;
  }) => {
    await updateEcoActionSelectionStatus(
      item.ecoAction.id!,
      currentChallenge?.id!,
      !item.ecoActionIsSelected
    );
    getEcoActionSelectionStatus(parseInt(params.id!));
    await updateMyChallengeProgress(currentChallenge?.id!, progress);
  };

  /*  const handleComment = (e: any) => {
     e.preventDefault();
     //TO-DO : send comment(comment)
     //TO-D0 : error if "" or length <2 ?
   }; */

  return (
    <div className="flex max-w-full w-full">
      <div className=" flex flex-col gap-12 max-w-[1139px] w-full p-6 md:p-12">
        {/* Challenge informations */}
        <section className="flex flex-col gap-2">
          <div className=" flex md:hidden justify-center items-center bg-primary-attention w-24 h-12 rounded-small font-bold text-secondary-title">
            <p>
              {successPoints}
              <span className="font-thin text-small-p">pts</span>
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-6 md:items-center">
            <h2
              className={`uppercase ${isUserChallengeCreator ? "-mr-4" : ""} `}
            >
              {currentChallenge?.title}
            </h2>

            {isUserChallengeCreator ? (
              <>
                <p className="text-small-p md:hidden">
                  Le challenge n'est pas modifiable sur petit écran
                </p>
                <img
                  src={edit}
                  alt="edit comment"
                  className="h-6 w-6 hidden md:block"
                />
              </>
            ) : null}

            <div className="hidden md:flex justify-center items-center bg-primary-attention w-24 h-12 rounded-small font-bold text-secondary-title">
              <p>
                {successPoints}
                <span className="font-thin text-small-p">pts</span>
              </p>
            </div>
            <p className="italic font-thin text-small-p hidden md:block">
              encore {totalPoints! - successPoints!} pts à obtenir
            </p>
          </div>
          <p className="font-thin text-small-p">
            Début: {formatDate(currentChallenge?.startAt!)} Fin :
            {formatDate(currentChallenge?.endAt!)}
          </p>

          <div className="hidden md:flex gap-6 mb-6">
            {currentChallenge?.tags.slice(0, 4).map((tag, index) => (
              <div
                key={tag.id}
                className={`bg-primary-attention  px-2 customBorder rounded-none gap-4 flex justify-center items-center `}
              >
                {tag?.label}
              </div>
            ))}
          </div>

          <div className=" w-full md:flex  gap-16">
            <div className="w-2/3 ">
              <h2 className="uppercase text-primary-good">description</h2>

              <p>
                {!isShowingMore &&
                currentChallenge?.description.length! > 150 ? (
                  <ReactQuill
                    value={currentChallenge?.description?.slice(0, 150) + "…"}
                    readOnly={true}
                    theme={"bubble"}
                  />
                ) : (
                  <ReactQuill
                    value={currentChallenge?.description}
                    readOnly={true}
                    theme={"bubble"}
                  />
                )}
                {currentChallenge?.description.length! > 150 && (
                  <span
                    className="font-bold"
                    onClick={() => setIsShowingMore((prev) => !prev)}
                  >
                    {isShowingMore ? "voir moins" : "voir plus"}
                  </span>
                )}
              </p>
            </div>

            <div className="hidden md:block w-1/3">
              <h2 className="uppercase text-primary-good">Participants</h2>
              <div className="flex mt-2">
                {currentChallenge?.contenders
                  ?.slice(0, 5)
                  ?.map((member, index) => (
                    <div key={member.id} className="mr-[-15px]">
                      <ProfilePicture url={member.picture} size="smallPic" />
                    </div>
                  ))}
                {currentChallenge?.contenders.length! > 5 && "voir tous"}
              </div>
            </div>
          </div>
        </section>
        {/* Challenge tasks */}
        <section className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <h2 className="uppercase text-primary-good">Étapes</h2>
            <span>{nbrTaskSelected + "/" + nbrTask}</span>
          </div>
          <ul className="flex flex-col gap-6 py-4">
            {ecoActionSelectionStatus?.map((ecoAction, index) => (
              <li
                key={ecoAction.id}
                className="flex"
                onClick={() => updateData(ecoAction)}
              >
                <RadioBtn isChoose={ecoAction.ecoActionIsSelected} />
                <div className="relative flex flex-col md:flex-row md:gap-6 md:items-center w-2/3">
                  <p>{ecoAction.ecoAction.label}</p>
                  <div className="md:absolute right-0 flex gap-6">
                    <DifficultyLevel
                      selectedOption={ecoAction.ecoAction}
                      small
                    />
                    <div>
                      <span className="font-bold">
                        {ecoAction.ecoAction?.points}
                      </span>
                      <span className="font-thin text-small-p">pts</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
        {/* Commentary section */}
        <section className="">
          <h2 className="uppercase text-primary-good">Commentaires</h2>
          <ul className=" md:hidden flex flex-col gap-6 pt-2">
            {!isEmpty(challenge?.comments)
              ? challenge.comments?.map((comment, index) => (
                  <div
                    className={`${
                      index + 1 === challenge.comments.length ? "" : "border-b"
                    }`}
                    key={comment?.id}
                  >
                    <div className="w-full flex">
                      <div>
                        <span className="font-bold">{comment.firstname} </span>
                        <span>, le (20/09/23)</span>
                      </div>
                      {comment?.userId === user.id ? (
                        <div className="flex">
                          <button type="button">
                            <img src={edit} alt="modify comment" />
                          </button>
                          <button type="button">
                            <img src={trash} alt="delete comment" />
                          </button>
                        </div>
                      ) : null}
                    </div>
                    <p className="italic py-1">{comment.content}</p>
                  </div>
                ))
              : null}
          </ul>
          <form /* onSubmit={handleComment} */ className="relative mt-6">
            <InputCustom
              sendMessage
              type="text"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit" className="absolute right-2 top-3">
              <img src={send} alt="Send comment" className="w-6 h-6" />
            </button>
          </form>
          <ul className=" hidden md:flex flex-col gap-6 pt-2">
            {!isEmpty(challenge?.comments)
              ? challenge.comments?.map((comment, index) => (
                  <div
                    className={`${
                      index + 1 === challenge.comments.length ? "" : "border-b"
                    }`}
                    key={comment?.id}
                  >
                    <div className="w-full ">
                      <span className="font-bold">{comment.firstname} </span>
                      <span>, le (20/09/23)</span>
                    </div>
                    <p className="italic py-1">{comment.content}</p>
                  </div>
                ))
              : null}
          </ul>
        </section>
        {/* Leave Challenge */}
        <div className="flex w-full justify-center">
          <BtnCustom
            styled="btnDanger"
            text="Abandonner"
            onClick={() => setIsOpenModale((prev) => !prev)}
          />
        </div>
      </div>
      {isOpenModale ? (
        <ChallengeLeaveModale setIsOpenModale={setIsOpenModale} />
      ) : null}
    </div>
  );
};

export default ChallengePage;
