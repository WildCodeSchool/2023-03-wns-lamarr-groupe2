import { FC, useEffect, useState } from "react";
import DropDownSelectors, { OptionType } from "./DropDownSelectors";
import DifficultyLevel from "../../components/DifficultyLevel";
import InputCustom from "../../components/InputCustom";
import useUserContext from "../../features/contexts/UserContext";

const TaskToDo: FC<{ isDisabled: boolean; updateTask: any }> = ({
  isDisabled,
  updateTask,
}) => {
  const { user } = useUserContext();
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  /* Update the task automatically when the selectedOption has required values (difficulty add auto points and description is supposed to be useless for the moment) */
  useEffect(() => {
    if (
      selectedOption &&
      selectedOption.label &&
      selectedOption.difficulty !== undefined
    ) {
      updateTask(selectedOption);
    } else if (!selectedOption) {
      // Update the task when selectedOption becomes null
      updateTask({});
    }
    // eslint bug with dependencies
    // eslint-disable-next-line
  }, [selectedOption]);

  const handleDifficulty = (value: number) => {
    // @ts-ignore
    // Don't know how to give the good type because the selected Option can be undefined or null when a task is created
    setSelectedOption((prevOption) => ({
      ...prevOption,
      difficulty: value,
      points: value * 20,
    }));
  };

  const isDifficultyClickFree =
    user?.company_id && selectedOption?.value !== undefined;

  return (
    <div className=" flex justify-between gap-6 flex-col lg:flex-row items-end -mt-3 ">
      <div className="flex-1 w-full  max-w-[490px]">
        <DropDownSelectors
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          isDisabled={isDisabled}
        />
      </div>

      <div className="flex gap-6 items-center">
        <div className="flex-1">
          <DifficultyLevel
            handleDifficulty={isDifficultyClickFree && handleDifficulty}
            selectedOption={selectedOption}
          />
        </div>
        <div className=" w-24">
          <InputCustom
            readOnly
            type="text"
            name="points"
            value={
              selectedOption?.points !== undefined
                ? selectedOption?.points?.toString() + " pts" ?? ""
                : ""
            }
            placeholder="Points"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskToDo;
