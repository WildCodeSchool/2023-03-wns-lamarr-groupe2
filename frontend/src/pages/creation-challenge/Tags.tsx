import { Dispatch, FC, SetStateAction, useState } from "react";
import Select from "react-select";
import { customStyles } from "./customStyles";
import { isEmpty } from "remeda";

const tags = [
  {
    id: 1,
    label: "recyclage",
    color: "primary-good",
  },
  {
    id: 2,
    label: "conso",
    color: "primary-attention",
  },
  {
    id: 3,
    label: "alimentation",
    color: "primary-good",
  },
  {
    id: 4,
    label: "transport",
    color: "primary-danger",
  },
  {
    id: 5,
    label: "lifestyle",
    color: "primary-attention",
  },
];

export type TTags = {
  id: number;
  label: string;
  color: string;
};

export type TagsProps = {
  isDisabledContenders: boolean;
  selectedTags: TTags[];
  setSelectedTags: Dispatch<SetStateAction<TTags[]>>;
};

const Tags: FC<TagsProps> = ({
  isDisabledContenders,
  setSelectedTags,
  selectedTags,
}) => {
  const [isShowAll, setIsShowAll] = useState(false);

  const handleChange = (selectedOptions: any) => {
    setSelectedTags(selectedOptions);
  };

  const getOptionValue = (option: any) => option.label;

  const handleSelectedContenders = (tagId: number) => {
    setSelectedTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId));
  };

  const primaryAttention = `#FFCB66`;

  return (
    <div className="mt-12 w-full">
      <label className="uppercase" title="visibility">
        TAGS
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
        className="basic-single   w-11/12"
        classNamePrefix="select"
        isDisabled={isDisabledContenders}
        name="todotask"
        options={tags}
        placeholder={
          isDisabledContenders
            ? "Renseignez les champs précédents"
            : "Sélectionnez des tags"
        }
        value={selectedTags}
        onChange={handleChange}
        isMulti
        getOptionValue={getOptionValue}
        styles={customStyles}
        required
        menuPlacement="top"
      />
      {!isEmpty(selectedTags) && <button
        className=" hidden md:block font-content  underline text-small-p  pr-16"
        onClick={() => setIsShowAll((prev) => !prev)}
      >
        {isShowAll ? "réduire" : `voir tous (${selectedTags.length})`}
      </button>
      }
      <div className="hidden : md:flex flex-wrap gap-3 mt-2">
        {selectedTags
          .slice(0, isShowAll ? selectedTags.length : 0)
          .map((tag) => (
            <div
              key={tag.id}
              className={`bg-${tag.color}  px-2 customBorder rounded-none gap-4 flex justify-center items-center `}
            >
              <p>{tag.label}</p>
              <button
                onClick={() => handleSelectedContenders(tag.id)}
                className="font-content "
              >
                X
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Tags;
