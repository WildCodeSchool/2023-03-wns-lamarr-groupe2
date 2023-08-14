import { FC, useState } from "react";
import Select, { StylesConfig } from 'react-select';
import { friendListData } from "../scores/data";
import ProfilePicture from "../../components/ProfilePicture";
import { customStyles } from "./customStyles";


type TContender = {
    id: number,
    username: string,
    picture: string,
}
export type ContendersProps = {
    isDisabledContenders: boolean
}

const Contenders: FC<ContendersProps> = ({ isDisabledContenders }) => {
    const [selectedOptions, setSelectedOption] = useState<TContender[]>([])
    const [isShowAll, setIsShowAll] = useState(false)
    const friendListDataWithAll = [
        { id: -1, username: "Tous", picture: "" },
        ...friendListData,
    ];
    const handleChange = (selectedOptions: any) => {
        if (selectedOptions.some((option: any) => option.id === -1)) {
            setSelectedOption(friendListData)
        } else { setSelectedOption(selectedOptions) }

    };

    const getOptionLabel = (option: any) => option.username
    const getOptionValue = (option: any) => option.username

    const handleSelectedContenders = (contenderId: number) => {
        setSelectedOption((prevContender) =>
            prevContender.filter((contender) => contender.id !== contenderId)
        );
    }

    const primaryAttention = `#FFCB66`

    return (
        <div className="mt-12 w-full">
            <label className="uppercase" title="visibility">
                PARTICIPANTS
            </label>

            <Select
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary25: primaryAttention,
                        primary: primaryAttention,
                    },
                })}
                isSearchable
                className="basic-single  w-1/2 max-w-1/2"
                classNamePrefix="select"
                isDisabled={isDisabledContenders}
                name="todotask"
                options={friendListDataWithAll}
                placeholder={
                    isDisabledContenders
                        ? "Renseignez les champs précédents"
                        : "Sélectionnez une tâche"
                }
                value={selectedOptions}
                onChange={handleChange}
                isMulti
                getOptionLabel={getOptionLabel}
                getOptionValue={getOptionValue}
                styles={customStyles}
                required
            />
            <button className=' font-content  underline text-small-p justify-end w-full pr-16' onClick={() => setIsShowAll(prev => !prev)}>{isShowAll ? 'réduire' : `voir tous (${selectedOptions.length})`}</button>

            <div className="flex flex-wrap gap-3 mt-10">
                {selectedOptions.slice(0, isShowAll ? selectedOptions.length : 5).map((contender) => (
                    <div key={contender.id} className="relative bg-primary-attention w-20 h-20 rounded-b-full   flex justify-center items-center rounded-tl-full">
                        <ProfilePicture url={contender.picture} size="mediumPic" border />
                        <button onClick={() => handleSelectedContenders(contender.id)} className="absolute top-[-3px] right-1 font-content">X</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Contenders
