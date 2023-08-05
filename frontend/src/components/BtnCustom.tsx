import { FC, FormEvent, useState } from "react";
import plusCrossDark from '../assets/icons/plusCrossBlack.svg'
import plusCrossLight from '../assets/icons/plusCross.svg'

type BtnCustomProps = {
  onClick: (e?: FormEvent<Element>) => void;
  styled: "btnDanger" | "btnAttention" | "btnGood";
  size?: "small";
  text: string;
  addMode?: true
};

const BtnCustom: FC<BtnCustomProps> = ({ onClick, styled, text, size, addMode }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEvent = () => {
    setIsHovered((prev) => !prev);
  };

  return (
    <button
      onMouseEnter={addMode && handleMouseEvent}
      onMouseLeave={addMode && handleMouseEvent}
      className={`$
      ${size && "small"} customBorder ${styled} ${addMode && 'flex items-center'}`}
      onClick={onClick}
    >
      {addMode && <img src={isHovered ? plusCrossLight : plusCrossDark} alt="Add" />}
      {text}
    </button>
  )
};

export default BtnCustom;
