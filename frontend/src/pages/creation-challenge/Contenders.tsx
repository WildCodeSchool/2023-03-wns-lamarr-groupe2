import { FC, useState } from "react";
import Select from 'react-select';
import { friendListData } from "../scores/data";


type TContender = {
    id: number,
    username: string,
    picture: string,
}
export type ContendersProps = {
    isDisabledContenders: boolean
}

const Contenders: FC<ContendersProps> = ({ isDisabledContenders }) => {
    const [selectedOptions, setSelectedOption] = useState([])

    const handleChange = (selectedOptions: any) => {
        setSelectedOption(selectedOptions);
    };

    const getOptionLabel = (option: any) => option.username
    const getOptionValue = (option: any) => option.username

    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#FFCB66" : "white",
            color: state.isFocused ? "white" : "black",
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: "black",
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
        <div>
            <label className="uppercase" title="visibility">
                PARTICIPANTS
            </label>

            <Select
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary25: "#FFCB66",
                        primary: "#FFCB66",
                    },
                })}
                className="basic-single"
                classNamePrefix="select"
                isDisabled={isDisabledContenders}
                name="todotask"
                options={friendListData}
                placeholder={
                    isDisabledContenders
                        ? "Renseignez les champs précédents"
                        : "Sélectionnez une tâche"
                }
                onChange={handleChange}
                isMulti
                getOptionLabel={getOptionLabel}
                getOptionValue={getOptionValue}
                styles={customStyles}
            />

        </div>
    )
}

export default Contenders
