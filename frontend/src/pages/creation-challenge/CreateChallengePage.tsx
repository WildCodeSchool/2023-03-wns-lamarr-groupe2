import { SetStateAction, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles for the rich text editor
import InputCustom from "../../components/InputCustom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calendarIcon from "../../assets/icons/calendar.svg"


function CreateChallengePage() {
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [useTodayAsStartDate, setUseTodayAsStartDate] = useState(false);
  const [useTodayAsEndDate, setUseTodayAsEndDate] = useState(false);

  const handleDescriptionChange = (value: SetStateAction<string>) => {
    setDescription(value);
  };

  const handleStartDateChange = (date: Date | null) => { // Assurez-vous de spécifier le type Date | null
    setStartDate(date);
    if (useTodayAsStartDate) {
      setUseTodayAsStartDate(false);
    }
  };

  const handleEndDateChange = (date: Date | null) => { // Assurez-vous de spécifier le type Date | null
    setEndDate(date);
    if (useTodayAsEndDate) {
      setUseTodayAsEndDate(false);
    }
  };

  const disabledDate = (date: number | Date) => {
    const today = new Date();
    return date < today;
  };

  const handleUseTodayAsStartDate = () => {
    setUseTodayAsStartDate(!useTodayAsStartDate);
    if (!useTodayAsStartDate) {
      setStartDate(new Date());
    } else {
      setStartDate(null);
    }
  };

  const handleUseTodayAsEndDate = () => {
    setUseTodayAsEndDate(!useTodayAsEndDate);
    if (!useTodayAsEndDate) {
      setEndDate(new Date());
    } else {
      setEndDate(null);
    }
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
        <div className="flex  gap-2 xl:px-10  items-center justify-around md:justify-between lg:justify-start lg:gap-20">
          <img src={calendarIcon} alt='Calendar' className="h-12 w-12" />
          <p>DU :</p>
          <div className=" flex flex-col  items-center pt-3">

            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="01/01/2023"
              dateFormat="dd/MM/yyyy"
              calendarClassName="custom-calendar"
              isClearable
              clearButtonClassName="custom-calendar-btn"
              minTime={new Date()}
              className="border-2 rounded-md w-32  lg:w-34 xl:w-48 py-2 flex justify-center"
            />   <div className="flex w-full justify-end items-center gap-2">
              <label htmlFor="startToday" className="text-small-p">aujourd'hui</label>
              <input
                type="checkbox"
                id="startToday"
                checked={useTodayAsStartDate}
                onChange={handleUseTodayAsStartDate}
              />
            </div>
          </div>

          <p>AU :</p>

          <div className="flex  flex-col  items-center  pt-3">

            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              placeholderText="01/01/2024"
              minDate={startDate}
              dateFormat="dd/MM/yyyy"
              calendarClassName="custom-calendar"
              minTime={new Date()}
              className="border-2 rounded-md w-32 lg:w-34 xl:w-48  py-2  flex justify-center"
              isClearable
              clearButtonClassName="custom-calendar-btn"
              filterDate={date => !disabledDate(date)}
              dayClassName={date => (disabledDate(date) ? 'disabled-date' : '')}
            />
            <div className="flex w-full justify-end items-center gap-2">
              <label htmlFor="endToday" className="text-small-p">aujourd'hui</label>
              <input
                type="checkbox"
                id="endToday"
                checked={useTodayAsEndDate}
                onChange={handleUseTodayAsEndDate}
              />

            </div>
          </div>
        </div>
      </section>
      {/* second part desktop */}
      <section className=" flex-1 border-1 border-primary-danger w-full"></section>
    </div>
  );
}

export default CreateChallengePage;
