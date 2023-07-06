import { FC, useState } from "react";

type BtnBasicProps = {
  onClick: () => void;
  styled: "btnDanger" | "btnAttention" | "btnGood";
  text: string;
};

const BtnBasic: FC<BtnBasicProps> = ({ onClick, styled, text }) => {
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

export default BtnBasic;
