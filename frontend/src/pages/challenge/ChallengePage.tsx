import useUserContext from "../../features/contexts/UserContext";
import pencil from "../../assets/icons/penciel-square.svg";
import { useState } from "react";
import InputCustom from "../../components/InputCustom";
import RadioBtn from "../../components/RadioBtn";
import DifficultyLevel from "../../components/DifficultyLevel";
const challenge = {
  id: 7,
  title: "Ut aspernatur unde veniam amet.",
  description:
    "Ut odio voluptate cum id quisquam dolore. Corporis quia similique.Ut odio voluptate cum id quisquam dolore. Corporis quia similique.Ut odio voluptate cum id quisquam dolore. Corporis quia similique.Ut odio voluptate cum id quisquam dolore. Corporis quia similique.Ut odio voluptate cum id quisquam dolore. Corporis quia similique.Ut odio voluptate cum id quisquam dolore. Corporis quia similique.Ut odio voluptate cum id quisquam dolore. Corporis quia similique.Ut odio voluptate cum id quisquam dolore. Corporis quia similique.",
  ecoActions: [
    {
      id: 8,
      label: "Réduire le plastique",
      points: 40,
      need_proof: false,
      difficulty: 2,
    },
    {
      id: 9,
      label: "Soutenir les fermes bio",
      points: 80,
      need_proof: false,
      difficulty: 4,
    },
  ],
  creatorId: 3,
  tags: [
    {
      id: 1,
      label: "consommation",
    },
    { id: 2, label: "environnement" },
  ],
  contenders: [1, 3, 4, 5],
};

const ChallengePage = () => {
  //TO-DO : Query the challenge (maybe add some property to the queyr to get exactly parameters we need (example contenders : id + image))
  //TO-DO : Calculate user score and remaining points
  //TO-DO : Select a task will create or update the user score
  //TO-DO : Contenders : query contenders by their ID and replace pictures
  //TO-DO : Replace values
  //TO-DO : Remove fake Challenge const when done
  const { user } = useUserContext();
  const isUserChallengeCreator = user.id === challenge.creatorId;
  const [isShowingMore, setIsShowingMore] = useState(false);
  const nbrTask = challenge?.ecoActions?.length;
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const handleTask = (task: number) => {
    const isTaskSelected = selectedTasks?.includes(task);
    if (isTaskSelected) {
      return setSelectedTasks(
        selectedTasks?.filter((allTasks) => allTasks !== task)
      );
    } else {
      return setSelectedTasks([...selectedTasks, task]);
    }
  };

  return (
    <div className="border-2 flex justify-center max-w-full w-full">
      <div className="border-1 flex flex-col gap-12 max-w-[1139px] w-full p-6 md:p-12">
        {/* Challenge informations */}
        <section className="flex flex-col gap-2">
          <div className="flex flex-col md:flex-row md:space-x-6 md:items-center">
            <h2
              className={`uppercase ${isUserChallengeCreator ? "-mr-4" : ""} `}
            >
              titre du challenge
            </h2>
            {isUserChallengeCreator ? (
              <>
                <p className="text-small-p md:hidden">
                  Le challenge n'est pas modifiable sur petit écran
                </p>
                <img src={pencil} className="h-6 w-6 hidden md:block" />{" "}
              </>
            ) : null}
            <div className="hidden md:flex justify-center items-center bg-primary-attention w-24 h-12 rounded-small font-bold text-secondary-title">
              <p>
                (64) <span className="font-thin text-small-p">pts</span>
              </p>
            </div>
            <p className="italic font-thin text-small-p hidden md:block">
              encore (46) pts à obtenir
            </p>
          </div>
          <div className="hidden md:flex gap-6 mb-6">{challenge?.tags.slice(0, 4).map((tag) => <div className={`bg-primary-attention  px-2 customBorder rounded-none gap-4 flex justify-center items-center `}>
            {tag?.label} </div>)}</div>

          <h2 className="uppercase text-primary-good">description</h2>
          <p>
            {isShowingMore
              ? challenge?.description
              : challenge?.description?.slice(0, 150) + "…"}
            <span
              className="font-bold"
              onClick={() => setIsShowingMore((prev) => !prev)}
            >
              {isShowingMore ? "voir moins" : "voir plus"}
            </span>
          </p>
        </section>
        {/* Challenge tasks */}
        <section className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <h2 className="uppercase text-primary-good">Étapes</h2>{" "}
            <span>{selectedTasks?.length + "/" + nbrTask}</span>
          </div>
          <ul className="flex flex-col gap-6 py-4">
            {challenge.ecoActions?.map((ecoAction) => (
              <li
                key={ecoAction.id}
                className="flex"
                onClick={() => handleTask(ecoAction.id)}
              >
                <RadioBtn isChoose={selectedTasks?.includes(ecoAction.id)} />
                <div className="relative flex flex-col md:flex-row md:gap-6 md:items-center w-2/3">

                  <p>{ecoAction?.label}</p>
                  <div className="md:absolute right-0 flex gap-6"> <DifficultyLevel selectedOption={ecoAction} small /> <div><span className="font-bold">{ecoAction?.points}</span> <span className="font-thin text-small-p">pts</span></div></div>
                </div>
              </li>
            ))}
          </ul>
        </section>
        {/* Commentary section */}
      </div >
    </div >
  );
};

export default ChallengePage;
