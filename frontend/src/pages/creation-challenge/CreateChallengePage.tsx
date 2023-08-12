import { FC, PropsWithChildren, SetStateAction, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles for the rich text editor
import InputCustom from "../../components/InputCustom";
import DatePickers from "./DatePickers";

const CreateChallengePage: FC<PropsWithChildren> = () => {
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDescriptionChange = (value: SetStateAction<string>) => {
    setDescription(value);
  };


  return (
    <div className="border-1 md:border-primary-good lg:border-primary-danger xl:border-y-primary-attention flex flex-col md:flex-row gap-3 w-full">
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
        <label title="description">DESCRIPTION</label>
        <ReactQuill
          className="mt-[-18px] max-w-[100%] "
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Be creative ! "
          preserveWhitespace
        />


        {/*  DATE PICKER */}
        <DatePickers setStartDate={setStartDate} startDate={startDate} setEndDate={setEndDate} endDate={endDate} />

      </section>
      {/* second part desktop */}
      <section className=" flex-1 border-1 border-primary-danger w-full"></section>
    </div>
  );
}

export default CreateChallengePage;
