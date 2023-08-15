import { Dispatch, FC, SetStateAction, useState } from "react";
import Select from "react-select";
import { friendListData } from "../scores/data";
import ProfilePicture from "../../components/ProfilePicture";
import { customStyles } from "./customStyles";
import { isEmpty } from "remeda";

export type TContender = {
  id: number;
  username: string;
  picture: string;
};
export type ContendersProps = {
  isDisabledContenders: boolean;
  selectedContenders: TContender[];
  setSelectedContenders: Dispatch<SetStateAction<TContender[]>>;
};

const Contenders: FC<ContendersProps> = ({
  isDisabledContenders,
  selectedContenders,
  setSelectedContenders,
}) => {
  const [isShowAll, setIsShowAll] = useState(false);
  //TO-DO : Add company group
  //TO-DO : Add friends
  const friendListDataWithAll = [
    { id: -1, username: "Tous", picture: "" },
    ...friendListData,
  ];
  const handleChange = (selectedContenders: any) => {
    if (selectedContenders.some((option: any) => option.id === -1)) {
      setSelectedContenders(friendListData);
    } else {
      setSelectedContenders(selectedContenders);
    }
  };

  const getOptionLabel = (option: any) => option.username;
  const getOptionValue = (option: any) => option.username;

  const handleSelectedContenders = (contenderId: number) =>
    setSelectedContenders(selectedContenders.filter((contender) => contender.id !== contenderId))


  const primaryAttention = `#FFCB66`;
  return (
    <div className="mt-12 w-full ">
      <label className="uppercase" title="visibility">
        PARTICIPANTS
      </label>

      <Select
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary25: primaryAttention,
            primary: primaryAttention,
          },
        })}
        isSearchable
        className="basic-single  w-11/12"
        classNamePrefix="select"
        isDisabled={isDisabledContenders}
        name="todotask"
        options={friendListDataWithAll}
        placeholder={
          isDisabledContenders
            ? "Renseignez les champs précédents"
            : "Sélectionnez dans la liste"
        }
        value={selectedContenders}
        onChange={handleChange}
        isMulti
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        styles={customStyles}
        required
      />
      {!isEmpty(selectedContenders) && <button
        className="hidden md:block font-content underline text-small-p "
        onClick={() => setIsShowAll((prev) => !prev)}
      >
        {isShowAll ? "réduire" : `voir tous (${selectedContenders.length})`}
      </button>}

      <div className="hidden : md:flex flex-wrap  w-full gap-5 mt-2">
        {selectedContenders
          .slice(0, isShowAll ? selectedContenders.length : 0)
          .map((contender) => (
            <div
              key={contender.id}
              className="relative bg-primary-attention w-20 h-20 rounded-b-full   flex justify-center items-center rounded-tl-full hover:bg-white border-1 transition-colors duration-200  "
            >
              <ProfilePicture url={contender.picture} size="mediumPic" border />
              <button
                onClick={() => handleSelectedContenders(contender.id)}
                className="absolute top-[-3px] right-1 font-content"
              >
                X
              </button>
              <p className=" drop-shadow-none absolute  text-small-p  bottom-[-16px]">
                {contender.username}{" "}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Contenders;
