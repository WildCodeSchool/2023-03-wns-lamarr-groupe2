import { FC } from "react";
import radioSelect from "../assets/icons/radioSelect.svg";
import radioUnSelect from "../assets/icons/radioUnselect.svg";

type RadioBtnProps = {
  isChoose: boolean;
  small?: boolean;
};

const RadioBtn: FC<RadioBtnProps> = ({ isChoose, small }) => {
  return (
    <div className={`cursor-pointer ${small && "w-4"}`}>
      <img
        alt="add icon"
        src={isChoose ? radioSelect : radioUnSelect}
        className={small ? "" : "m-3"}
      />
    </div>
  );
};

export default RadioBtn;
