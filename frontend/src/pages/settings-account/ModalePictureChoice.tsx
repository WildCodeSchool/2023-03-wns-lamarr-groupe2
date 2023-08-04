import { Dispatch, FC, SetStateAction, useState } from "react";
import PictureChoice from "./PictureChoice";
import close from "../../assets/icons/close.svg";
import useUserContext from "../../features/contexts/UserContext";

export const ModalePictureChoice: FC<{
  setOpenPictureChoice: Dispatch<SetStateAction<boolean>>;
}> = ({ setOpenPictureChoice }) => {
  const { user, updatePicture } = useUserContext();
  const [selectedOption, setSelectedOption] = useState<string | "hermesG">(
    user?.picture || "hermesG"
  );

  const handleSelect = (option: string) => {
    console.log("Selected Option : ", selectedOption);
    setSelectedOption((prevOption) =>
      prevOption === option ? "hermesG" : option
    );
    updatePicture(option);
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0  bg-secondary-dark bg-opacity-75 transition-opacity" />

      <div className="fixed inset-0 z-10 overflow-y-auto w-full ">
        <div className="flex min-h-full items-end  w-full justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform  w-full overflow-hidden rounded-lg border-[1px] border-main-white bg-main-dark text-main-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-main-bg h-full  px-0 w-full pt-2 pb-4 sm:p-6 sm:pb-4 ">
              <div className=" w-full mt-3  mr-12 ">
                <div className="flex  justify-center">
                  <div
                    onClick={() => setOpenPictureChoice((prev) => !prev)}
                    className="absolute  left-5 bg-light  h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-main-white sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <img
                      src={close}
                      alt="close modale"
                      className="cursor-pointer"
                    />
                  </div>

                  <h3
                    className="text-secondary-title font-bold  text-center"
                    id="modal-title"
                  >
                    AVATAR
                  </h3>
                </div>
                <div className="mt-2 w-full">
                  <ul className="flex w-full justify-center">
                    {["hermesG", "hermesR", "hermesY"].map((choice, index) => (
                      <PictureChoice
                        key={index}
                        hermesChoice={choice}
                        last={index}
                        handleSelect={handleSelect}
                        selectedOption={selectedOption}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
