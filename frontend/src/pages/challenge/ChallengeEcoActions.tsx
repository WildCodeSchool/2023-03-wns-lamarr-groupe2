import React from "react";
import RadioBtn from "../../components/RadioBtn";
import DifficultyLevel from "../../components/DifficultyLevel";
import useChallengeContext from "../../features/contexts/ChallengeContext";

export const ChallengeEcoActions = () => {
  const {
    currentChallenge,
    ecoActionSelectionStatus,
    getEcoActionSelectionStatus,
    updateEcoActionSelectionStatus,
  } = useChallengeContext();

  getEcoActionSelectionStatus(currentChallenge?.id!);
  const nbrTask = currentChallenge?.ecoActions?.length;
  const nbrTaskSelected = ecoActionSelectionStatus?.filter(
    (ecoAction) => ecoAction.ecoActionIsSelected
  ).length;

  return (
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
            onClick={() =>
              updateEcoActionSelectionStatus(
                ecoAction.ecoAction.id!,
                currentChallenge?.id!,
                !ecoAction.ecoActionIsSelected
              )
            }
          >
            <RadioBtn isChoose={ecoAction.ecoActionIsSelected} />
            <div className="relative flex flex-col md:flex-row md:gap-6 md:items-center w-2/3">
              <p>{ecoAction.ecoAction.label}</p>
              <div className="md:absolute right-0 flex gap-6">
                <DifficultyLevel selectedOption={ecoAction.ecoAction} small />
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
  );
};
