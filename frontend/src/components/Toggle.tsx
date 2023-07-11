import { FC, useState } from "react";

type ToggleProps = {
  onClick: () => void;
  styled: "toggle";
};

const Toggle: FC<ToggleProps> = ({ onClick, styled }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggleClick = () => {
    setIsToggled((prevState) => !prevState);
    onClick();
  };

  return (
    <div>
      <input type="checkbox" id="toggle" className="toggle-checkbox hidden" />

      <button
        className={` toggle-label cursor-pointer small customBorder ${
          isToggled ? "toggle" : "justify-end bg-primary-danger"
        } ${styled}`}
        onClick={handleToggleClick}
      >
        <span className={`toggleSpan`}></span>
      </button>
    </div>
  );
};

export default Toggle;
