import { FC, useState } from "react";

type BtnSmallProps = {
  onClick: () => void;
  styled: "btnSmallGood" | "btnSmallDanger" | "btnSmallAttention";
  text: string;
};

const BtnSmall: FC<BtnSmallProps> = ({ onClick, styled, text }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleButtonClick = () => {
    setIsPressed((prevState) => !prevState);
    onClick();
  };

  return (
    <button
      className={`${
        isPressed ? "drop-shadow-none" : ""
      } drop-shadow-custom border border-color-black ${styled} hover:text-white hover:border-black`}
      onMouseDown={handleButtonClick}
      onMouseUp={() => setIsPressed(false)}
    >
      {text}
    </button>
  );
};
export default BtnSmall;
