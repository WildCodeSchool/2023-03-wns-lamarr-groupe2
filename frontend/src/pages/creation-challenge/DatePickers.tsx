import { Dispatch, FC, SetStateAction, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calendarIcon from "../../assets/icons/calendar.svg";
import RadioBtn from "../../components/RadioBtn";

export type DatePickersProps = {
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  setEndDate: Dispatch<SetStateAction<Date | null>>;
  startDate: null | Date;
  endDate: null | Date;
};
const DatePickers: FC<DatePickersProps> = ({
  setEndDate,
  setStartDate,
  endDate,
  startDate,
}) => {
  const [useTodayAsStartDate, setUseTodayAsStartDate] = useState(false);
  const [useTodayAsEndDate, setUseTodayAsEndDate] = useState(false);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    if (useTodayAsStartDate) {
      setUseTodayAsStartDate(false);
    }
  };

  const handleEndDateChange = (date: Date | null) => {
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
      setStartDate(new Date());
    } else {
      setEndDate(null);
    }
  };
  return (
    <div className="flex items-center justify-evenly xl:justify-start xl:gap-8">
      <img src={calendarIcon} alt="Calendar" className="h-12 w-12" />

      <div className=" flex gap-1 items-center pt-3">
        <p className="hidden lg:block">DU :</p>
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
            className="border-2 rounded-md w-32  lg:w-34 xl:w-48 py-2  px-2 flex justify-center"
          />
          <div className="flex w-full justify-end items-center gap-2 h-6 pt-1">

          </div>
        </div>
      </div>

      <div className="flex gap-1  items-center  pt-3 xl:gap-6">
        <p>AU :</p>
        <div className=" flex flex-col  items-center pt-3">
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
            className="border-2 rounded-md w-32 lg:w-34 xl:w-48  py-2  px-2 flex justify-center"
            isClearable
            clearButtonClassName="custom-calendar-btn"
            filterDate={(date) => !disabledDate(date)}
            dayClassName={(date) => (disabledDate(date) ? "disabled-date" : "")}
          />
          <div onClick={handleUseTodayAsEndDate} className="flex w-full justify-end items-center gap-2 pt-1">
            <label htmlFor="endToday" className="text-small-p">
              aujourd'hui
            </label>
            <RadioBtn isChoose={useTodayAsEndDate} small />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePickers;
