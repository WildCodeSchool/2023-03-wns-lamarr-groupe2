const primaryAttention = `#FFCB66`;
/* const primaryGood = `#96B9A0`;
const primaryDanger = `#CE7677`; */

export const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? primaryAttention : "white",
    color: state.isFocused ? "white" : "black",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "black",
  }),
  multiValueLabel: (provided: any, color: any) => {
    // We can add colors if we want, but not sure, maybe too much information
    /* const hermesColor = {
      hermesG: primaryGood,
      hermesY: primaryAttention,
      hermesR: primaryDanger,
    }; */
    return {
      ...provided,
      //@ts-ignore
      backgroundColor: "transparent" /* hermesColor[color.data?.picture] */,
      borderTop: "1px solid black",
      borderBottom: "1px solid black",
      borderLeft: "1px solid black",
      borderTopRightRadius: "0px",
      borderBottomRightRadius: "0px",
      borderRadius: "6px",
      color: "black",
    };
  },
  multiValueRemove: (provided: any) => ({
    ...provided,
    backgroundColor: "white",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    borderRight: "1px solid black",
    borderTopLeftRadius: "0px",
    borderBottomLeftRadius: "0px",
    borderRadius: "6px",
  }),
  control: (provided: any) => ({
    ...provided,
    border: "2px solid black",
    borderRadius: 6,
    "&:hover": {
      border: "2px solid #FFCB66",
    },
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    overflowX: "auto",
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    overflow: "visible",
  }),
};
