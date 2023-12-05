import { FC, FormEvent, useState } from "react";
import plusCrossDark from "../assets/icons/plusCrossBlack.svg";
import plusCrossLight from "../assets/icons/plusCross.svg";

type BtnCustomProps = {
  onClick: (e?: FormEvent<Element>) => void;
  styled: "btnDanger" | "btnAttention" | "btnGood";
  size?: "small";
  text: string;
  addMode?: true;
  isDisabled?: boolean;
};

const BtnCustom: FC<BtnCustomProps> = ({
  onClick,
  styled,
  text,
  size,
  addMode,
  isDisabled,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEvent = () => {
    setIsHovered((prev) => !prev);
  };

  return (
    <button
      onMouseEnter={addMode && handleMouseEvent}
      onMouseLeave={addMode && handleMouseEvent}
      className={` uppercase customBorder ${styled} ${addMode && "flex items-center gap-2 rounded-full"} 
       ${size && "small"} ${isDisabled && " pointer-events-none grayscale"}`}
      onClick={onClick}
    >
      {addMode && (
        <img src={isHovered ? plusCrossLight : plusCrossDark} alt="Add" />
      )}
      {text}
    </button>
  );
};

export default BtnCustom;
