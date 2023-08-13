import { FC, useState } from "react";
import { friendListData } from "../scores/data";
import Select from 'react-select';

type TContender = {
    id: number,
    username: string,
    picture: string,
}
export type ContendersProps = {
    isDisabledContenders: boolean
}

const Contenders: FC<ContendersProps> = ({ isDisabledContenders }) => {
    const [selectedContenders, setSelectedContenders] = useState<TContender[]>([])
    const [selectedOption, setSelectedOption] = useState<TContender>()

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


    const handleSelectChange = () => {

    }

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
                isMulti
                value={selectedOption}
                onChange={handleSelectChange}
                styles={customStyles}
            />

        </div>
    )
}

export default Contenders


/* 
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
        <>
            {user.company_id ? (
                <CreatableSelect
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 6,
                        colors: {
                            ...theme.colors,
                            primary25: "#FFCB66",
                            primary: "#FFCB66",
                        },
                    })}
                    styles={customStyles}
                    isDisabled={isDisabled}
                    placeholder={
                        isDisabled
                            ? "Renseignez les champs précédents"
                            : "Créez ou sélectionnez"
                    }
                    isClearable
                    options={tasks}
                    onChange={handleSelectChange}
                />
            ) : (
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
                    isDisabled={isDisabled}
                    isClearable={isClearable}
                    name="todotask"
                    options={tasks}
                    placeholder={
                        isDisabled
                            ? "Renseignez les champs précédents"
                            : "Sélectionnez une tâche"
                    }
                    value={selectedOption}
                    onChange={handleSelectChange}
                    styles={customStyles}
                />
            )}
        </>
    );
};

export default DropDownSelectors;
 */