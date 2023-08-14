import { FC, useState } from "react";
import Select from 'react-select';
import { friendListData } from "../scores/data";
import ProfilePicture from "../../components/ProfilePicture";


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
    console.log(selectedOptions)
    const handleChange = (selectedOptions: any) => {
        setSelectedOption(selectedOptions);
    };

    const getOptionLabel = (option: any) => option.username
    const getOptionValue = (option: any) => option.username

    const handleSelectedContenders = (contenderId: number) => {
        setSelectedOption((prevContender) =>
            prevContender.filter((contender) => contender.id !== contenderId)
        );
    }

    const primaryAttention = `#FFCB66`

    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isFocused ? primaryAttention : "white",
            color: state.isFocused ? "white" : "black",
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: "black",
        }),
        multiValueLabel: (provided: any) => ({
            ...provided,
            backgroundColor: primaryAttention,
            borderTop: "1px solid black",
            borderBottom: "1px solid black",
            borderLeft: "1px solid black",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            borderRadius: '6px',
            color: "black"

        }),
        multiValueRemove: (provided: any) => ({
            ...provided,
            backgroundColor: 'white',
            borderTop: "1px solid black",
            borderBottom: "1px solid black",
            borderRight: "1px solid black",
            borderTopLeftRadius: "0px",
            borderBottomLeftRadius: "0px",
            borderRadius: '6px'

        }),
        control: (provided: any) => ({
            ...provided,
            border: "2px solid black",
            borderRadius: 6,
            "&:hover": {
                border: "2px solid #FFCB66",
            },
        }),
    };

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
                className="basic-single w-1/2 h-20 overflow-auto"
                classNamePrefix="select"
                isDisabled={isDisabledContenders}
                name="todotask"
                options={friendListData}
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
            />

            <div className="flex flex-wrap gap-3 mt-10">
                {selectedOptions.map((contender) => (
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
