import { FC, useState } from 'react';

type ToggleProps = {
  onClick: () => void;
  styled: "toggle";
  value: boolean;
};

const Toggle: FC<ToggleProps> = ({ onClick, styled, value }) => {
  const [isToggled, setIsToggled] = useState(value || false);

  const handleToggleClick = () => {
    setIsToggled((prevState) => !prevState);
    onClick();
  };

  return (
    <div className={`relative w-12 h-6 rounded-full border-1 ${isToggled ? 'bg-primary-good' : 'bg-primary-danger'} transition-colors duration-300`} onClick={handleToggleClick}>
      <div className={`absolute border left-[-1px] top-[-1px] w-6 h-6 rounded-full bg-primary-attention transform transition-transform ${isToggled ? 'translate-x-full' : ''}`}></div>
    </div>
  );
};

export default Toggle;
