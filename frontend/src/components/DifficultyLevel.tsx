import { FC } from "react";
import { OptionType } from "../pages/creation-challenge/DropDownSelectors";

export type DifficultyLevelProps = {
  selectedOption?: OptionType | null;
  handleDifficulty?: any;
  difficulty?: number
  small?: boolean
};

const Level: FC<{
  filled?: boolean;
  onClick?: () => void;
  difficulty?: number;
  small?: boolean
}> = ({ filled, onClick, difficulty, small }) => {
  return (
    <span
      className={onClick ? "cursor-pointer" : "pointer-events-none"}
      onClick={onClick}
    >
      {filled && difficulty ? (
        <div
          className={`${small ? 'h-6 w-2' : 'h-11 w-3'} rounded-[4px] ${difficulty <= 2
            ? "bg-primary-good"
            : difficulty > 2 && difficulty <= 3
              ? "bg-primary-attention"
              : "bg-primary-danger"
            } transition duration-300 ease-in-out hover:bg-hover-color`}
        />
      ) : (
        <div className={`${small ? 'h-6 w-2' : 'h-11 w-3'} rounded-[4px] bg-main-grey`} />
      )}
    </span>
  );
};

const DifficultyLevel: FC<DifficultyLevelProps> = ({
  selectedOption,
  handleDifficulty,
  small
}) => {
  return (
    <div className={`flex ${small ? 'gap-1' : 'gap-2'}`}>
      {[1, 2, 3, 4, 5].map((level) => (
        <Level small={small}
          onClick={handleDifficulty ? () => handleDifficulty(level) : undefined}
          difficulty={selectedOption?.difficulty}
          key={level}
          filled={
            selectedOption?.difficulty !== undefined
              ? selectedOption.difficulty >= level
              : false
          }
        />
      ))}
    </div>
  );
};

export default DifficultyLevel;
