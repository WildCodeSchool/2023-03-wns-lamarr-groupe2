import { FC, useState } from "react";

type RadioProps = {
  onClick: () => void;
  styled: "radio";
};

const Radio: FC<RadioProps> = ({ onClick, styled }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleRadioClick = () => {
    setIsSelected((prevState) => !prevState);
    onClick();
  };

  return (
    <button
      className={`radio drop-shadow-customSmall ${
        isSelected && "bg-primary-good"
      } ${styled}`}
      onClick={handleRadioClick}
    />
  );
};

export default Radio;
