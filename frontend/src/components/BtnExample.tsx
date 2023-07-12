import { FC, useState } from "react";

type BtnExampleProps = {
  onClick: () => void;
  styled: "btnDanger" | "btnAttention" | "btnGood";
  text: string;
};

const BtnExample: FC<BtnExampleProps> = ({ onClick, styled, text }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleButtonClick = () => {
    setIsPressed((prevState) => !prevState);
    onClick();
  };

  return (
    <button
      className={`${
        isPressed ? "text-white" : ""
      } hover:bg-primary-danger ${styled}`}
      onMouseDown={handleButtonClick}
      onMouseUp={() => setIsPressed(false)}
    >
      {text}
    </button>
  );
};

export default BtnExample;
