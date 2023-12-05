import { Dispatch, SetStateAction, FC } from "react";
import BtnCustom from "../../components/BtnCustom";
import attention from "../../assets/icons/attention.svg";

type ModaleProps = {
  setIsOpenModale: Dispatch<SetStateAction<boolean>>;
};

const ChallengeLeaveModale: FC<ModaleProps> = ({ setIsOpenModale }) => {
  //TO-DO : Mutation to delete user from challenge

  const handleLeaveChallenge = () => {
    //TO-DO : leaveChallenge(id)
    setIsOpenModale((prev) => !prev);
  };

  return (
    <dialog
      className="relative z-10"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div className="fixed inset-0  bg-secondary-dark bg-opacity-75 transition-opacity" />

      <div className="fixed inset-0 z-10 overflow-y-auto ">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg border-[1px] border-main-white bg-main-dark text-main-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-main-bg px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex  items-center  justify-center">
                <div
                  onClick={() => setIsOpenModale((prev) => !prev)}
                  className="bg-light mx-3 md:mx-0 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-main-white"
                >
                  <img
                    src={attention}
                    alt="attention modale"
                    className="border rounded-full bg-main-bg drop-shadow-progressbar w-12 h-12 p-1 "
                  />
                </div>
                <div className=" w-full mt-3  mr-12 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className=" text-secondary-title font-bold  text-center"
                    id="modal-title"
                  >
                    ABANDONNER
                  </h3>
                </div>
              </div>
              <div className="mt-2 text-center">
                <p className="text-sm text-main-white">
                  Souhaitez-vous quitter le challenge ?
                  <br />
                  Cette action est irréversible, vos tâches accomplies seront
                  supprimées.
                  <br />
                </p>
              </div>
            </div>
            <div className="bg-main-bg  flex justify-center  items-center w-full pt-3 pb-10 gap-3">
              <BtnCustom
                onClick={handleLeaveChallenge}
                text="Abandonner "
                styled="btnGood"
              />
              <BtnCustom
                onClick={() => setIsOpenModale((prev) => !prev)}
                text="ANNULER"
                styled="btnAttention"
              />
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};
export default ChallengeLeaveModale;
