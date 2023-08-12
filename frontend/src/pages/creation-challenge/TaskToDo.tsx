import React, { FC, useEffect, useState } from 'react'
import DropDownSelectors, { OptionType } from './DropDownSelectors'
import DifficultyLevel from '../../components/DifficultyLevel'
import InputCustom from '../../components/InputCustom'
import useUserContext from '../../features/contexts/UserContext'

const TaskToDo: FC<{ isDisabled: boolean, updateTask: any }> = ({ isDisabled, updateTask }) => {
    const { user } = useUserContext()
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
    console.log(selectedOption)

    useEffect(() => {
        if (selectedOption && selectedOption.label && selectedOption.difficulty !== undefined) {
            updateTask(selectedOption)
        }
    }, [selectedOption]);


    const handleDifficulty = (value: number) => {
        /* @ts-ignore */
        setSelectedOption(prevOption => ({
            ...prevOption,
            difficulty: value,
            points: value * 20
        }));
    }

    const isDifficultyClickFree = user?.company_id && selectedOption?.value !== undefined

    return (

        <div className=" flex justify-between gap-6 flex-col lg:flex-row items-center -mt-3 ">

            <div className="flex-1 w-full  max-w-[490px]">
                <DropDownSelectors
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    isDisabled={isDisabled}
                />
            </div>

            <div className="flex gap-6 items-center">
                <div className="flex-1"><DifficultyLevel handleDifficulty={isDifficultyClickFree && handleDifficulty} selectedOption={selectedOption} /></div>
                <div className=" w-24">
                    <InputCustom
                        readOnly
                        type="text"
                        name="points"
                        value={selectedOption?.points !== undefined ? selectedOption?.points?.toString() + ' pts' ?? "" : ''}
                        placeholder="Points"
                    />
                </div>
            </div>
        </div>
    )
}

export default TaskToDo