import { FC, useState } from "react";

type BtnCustomProps = {
  onClick: () => void;
  styled: "btnDanger" | "btnAttention" | "btnGood";
  size?: "small";
  text: string;
};

const BtnCustom: FC<BtnCustomProps> = ({ onClick, styled, text, size }) => {

  return (
    <button
      className={`$
      ${size && "small"
        } customBorder ${styled}`}
      onClick={onClick}>
      {text}
    </button>
  );
};

export default BtnCustom;
