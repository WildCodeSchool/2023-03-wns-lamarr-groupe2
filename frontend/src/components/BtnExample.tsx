import { FC } from "react";

type BtnProps = {
  onClick: () => void;
  styled: "btnDanger" | "btnAttention" | "btnGood";
  text: string;
};

const BtnExample: FC<BtnProps> = ({ onClick, styled, text }) => {
  return (
    <button className={` hover:bg-primary-danger ${styled}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default BtnExample;
