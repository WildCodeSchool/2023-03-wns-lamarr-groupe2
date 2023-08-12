import { FC, PropsWithChildren, SetStateAction, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles for the rich text editor
import InputCustom from "../../components/InputCustom";
import DatePickers from "./DatePickers";
import { tasks } from "./data";
import DropDownSelectors, { OptionType } from "./DropDownSelectors";

const CreateChallengePage: FC<PropsWithChildren> = () => {
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  const handleDescriptionChange = (value: SetStateAction<string>) => {
    setDescription(value);
  };

  return (
    <div className="px-2 border-1 md:border-primary-good lg:border-primary-danger xl:border-y-primary-attention flex flex-col md:flex-row gap-3 w-full">
      {/* first part desktop */}
      <section className=" md:max-w-[50%] flex-1 border-1 border-primary-danger flex flex-col gap-5  w-full">
        <InputCustom
          type="text"
          name="title"
          value=""
          placeholder="Be creative ! "
          onChange={() => console.log("onChange")}
          label="TITRE"
        />
        {/* Using the rich text editor for the description */}
        <label className="uppercase" title="description">
          DESCRIPTION
        </label>
        <ReactQuill
          className="mt-[-18px] max-w-[100%] "
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Be creative ! "
          preserveWhitespace
        />

        {/*  DATE PICKER */}
        <DatePickers
          setStartDate={setStartDate}
          startDate={startDate}
          setEndDate={setEndDate}
          endDate={endDate}
        />

        {/* Task To dDo */}
        <label className="uppercase" title="todotask">
          Tâches à accomplir
        </label>
        <div className=" flex justify-between gap-6 flex-col lg:flex-row items-center -mt-3 ">
          {/* Drop down */}

          <div className="flex-1 w-full  max-w-[490px]">
            <DropDownSelectors
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              isDisabled={isDisabled}
            />
          </div>

          {/*  */}
          <div className="flex gap-6 items-center">
            <div className="flex-1">level difficulty</div>
            <div className=" w-24">
              <InputCustom
                onChange={() => console.log("points")}
                type="text"
                name="points"
                value=""
                placeholder="Points"
              />
            </div>
          </div>
        </div>
      </section>
      {/* second part desktop */}
      <section className=" flex-1 border-1 border-primary-danger w-full"></section>
    </div>
  );
};

export default CreateChallengePage;
