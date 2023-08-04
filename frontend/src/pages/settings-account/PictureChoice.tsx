import { FC } from "react";
import hermesG from "../../assets/hermes/green-hermes.svg";
import hermesR from "../../assets/hermes/red-hermes.svg";
import hermesY from "../../assets/hermes/yellow-hermes.svg";
import RadioBtn from "../../components/RadioBtn";

const pictureMap = {
  hermesG: hermesG,
  hermesR: hermesR,
  hermesY: hermesY,
};

type PictureChoiceProps = {
  hermesChoice: string;
  last: number;
  handleSelect: (option: string) => void;
  selectedOption: string;
};

const PictureChoice: FC<PictureChoiceProps> = ({
  hermesChoice,
  last,
  handleSelect,
  selectedOption,
}) => {
  const isOptionChoose = selectedOption === hermesChoice;

  return (
    <li className={`${last !== 2 ? "border-r-1" : ""} py-2`}>
      <div
        className="flex flex-col items-cente m-3 items-center"
        onClick={() => handleSelect(hermesChoice)}
      >
        {/*         <RadioBtn isChoose={isOptionChoose} />
         */}{" "}
        {/* @ts-ignore */}
        <img
          src={pictureMap[hermesChoice]}
          alt={hermesChoice}
          className="h-20"
        />
        <RadioBtn isChoose={isOptionChoose} />
      </div>
    </li>
  );
};

export default PictureChoice;
