import { FC } from 'react';
import { OptionType } from '../pages/creation-challenge/DropDownSelectors';

export type DifficultyLevelProps = {
    selectedOption: OptionType | null;
    handleDifficulty?: any;
};

const Level: FC<{ filled?: boolean; onClick?: () => void; difficulty?: number }> = ({
    filled,
    onClick,
    difficulty,
}) => {
    return (
        <span className={onClick ? 'cursor-pointer' : 'pointer-events-none'} onClick={onClick}>
            {filled && difficulty ? (
                <div
                    className={`h-11 w-3 rounded-[4px] ${difficulty <= 2
                        ? 'bg-primary-good'
                        : difficulty > 2 && difficulty <= 3
                            ? 'bg-primary-attention'
                            : 'bg-primary-danger'
                        } transition duration-300 ease-in-out hover:bg-hover-color`}
                />
            ) : (
                <div className={`h-11 w-3 rounded-[4px] bg-main-grey`} />
            )}
        </span>
    );
};

const DifficultyLevel: FC<DifficultyLevelProps> = ({ selectedOption, handleDifficulty }) => {
    return (
        <div className='flex gap-2'>
            {[1, 2, 3, 4, 5].map((level) => (
                <Level
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
