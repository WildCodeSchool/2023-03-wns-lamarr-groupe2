import { FC, useState } from "react";

type BtnCustomProps = {
  onClick: () => void;
  styled: "btnDanger" | "btnAttention" | "btnGood";
  size?: "small";
  text: string;
};

const BtnCustom: FC<BtnCustomProps> = ({ onClick, styled, text, size }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleButtonClick = () => {
    setIsPressed((prevState) => !prevState);
    onClick();
  };

  return (
    <button
      className={`${isPressed ? "drop-shadow-none" : ""}
      ${
        size && "small"
      } drop-shadow-custom border customBorder ${styled} hover:text-white hover:border-black`}
      onMouseDown={handleButtonClick}
      onMouseUp={() => setIsPressed(false)}
    >
      {text}
    </button>
  );
};

export default BtnCustom;
