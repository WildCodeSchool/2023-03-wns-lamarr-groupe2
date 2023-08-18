import { Dispatch, FC, SetStateAction, useState } from "react";
import Select, { ActionMeta } from "react-select";
import CreatableSelect from "react-select/creatable";
import { tasks } from "./data";
import useUserContext from "../../features/contexts/UserContext";

export type OptionType = {
  id?: number;
  description?: string;
  label: string;
  need_proof?: boolean;
  points?: number;
  difficulty: number | undefined;
  value?: string;
};

type DropDownProps = {
  isDisabled: boolean;
  selectedOption: OptionType | null;
  setSelectedOption: Dispatch<SetStateAction<OptionType | null>>;
};

const DropDownSelectors: FC<DropDownProps> = ({
  isDisabled,
  selectedOption,
  setSelectedOption,
}) => {
  const { user } = useUserContext();
  const [isClearable] = useState(true);
  const handleSelectChange = (
    option: OptionType | null,
    action: ActionMeta<OptionType>
  ) => {
    setSelectedOption(option !== null ? option : null);
  };

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#FFCB66" : "white",
      color: state.isFocused ? "white" : "black",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "black",
    }),
    control: (provided: any) => ({
      ...provided,
      border: "2px solid black",
      borderRadius: 6,
      "&:hover": {
        border: "2px solid #FFCB66",
      },
    }),
  };

  return (
    <>
      {user.company_id ? (
        <CreatableSelect
          theme={(theme) => ({
            ...theme,
            borderRadius: 6,
            colors: {
              ...theme.colors,
              primary25: "#FFCB66",
              primary: "#FFCB66",
            },
          })}
          styles={customStyles}
          isDisabled={isDisabled}
          placeholder={
            isDisabled
              ? "Renseignez les champs précédents"
              : "Créez ou sélectionnez"
          }
          isClearable
          options={tasks}
          onChange={handleSelectChange}
        />
      ) : (
        <Select
          theme={(theme) => ({
            ...theme,
            borderRadius: 6,
            colors: {
              ...theme.colors,
              primary25: "#FFCB66",
              primary: "#FFCB66",
            },
          })}
          className="basic-single"
          classNamePrefix="select"
          isDisabled={isDisabled}
          isClearable={isClearable}
          name="todotask"
          options={tasks.length > 0 ? tasks : []}
          placeholder={
            isDisabled
              ? "Renseignez les champs précédents"
              : "Sélectionnez une action"
          }
          value={selectedOption}
          onChange={handleSelectChange}
          styles={customStyles}
          menuPlacement="top"
          noOptionsMessage={() => "Pas d'action disponible"}
        />
      )}
    </>
  );
};

export default DropDownSelectors;
