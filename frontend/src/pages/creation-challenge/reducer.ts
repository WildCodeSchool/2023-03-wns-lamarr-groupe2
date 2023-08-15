// Documentation about useReducer and TS : https://www.sumologic.com/blog/react-hook-typescript/

import { OptionType } from "dayjs";
import { TContender } from "./Contenders";
import { TTags } from "./Tags";

export type State = {
  title: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  tasksToDo: any[]; // Update the type as needed
  isPublicMode: boolean;
  selectedContenders: TContender[];
  selectedTags: TTags[];
};

export type Action =
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_DESCRIPTION"; payload: string }
  | { type: "SET_START_DATE"; payload: Date | null }
  | { type: "SET_END_DATE"; payload: Date | null }
  | { type: "ADD_TASK"; payload?: OptionType }
  | { type: "UPDATE_TASK"; payload: { index: number; task: OptionType } }
  | { type: "SET_PUBLIC_MODE"; payload: boolean }
  | { type: "SET_SELECTED_CONTENDERS"; payload: TContender[] }
  | { type: "SET_SELECTED_TAGS"; payload: TTags[] };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "SET_START_DATE":
      return { ...state, startDate: action.payload };
    case "SET_END_DATE":
      return { ...state, endDate: action.payload };
    case "ADD_TASK":
      return { ...state, tasksToDo: [...state.tasksToDo, {}] };
    case "UPDATE_TASK":
      const updatedTasks = [...state.tasksToDo];
      updatedTasks[action.payload.index] = action.payload.task;
      return { ...state, tasksToDo: updatedTasks };
    case "SET_PUBLIC_MODE":
      return { ...state, isPublicMode: action.payload };
    case "SET_SELECTED_CONTENDERS":
      return { ...state, selectedContenders: action.payload };
    case "SET_SELECTED_TAGS":
      return { ...state, selectedTags: action.payload };
    default:
      return state;
  }
};

export const initialState: State = {
  title: "",
  description: "",
  startDate: null,
  endDate: null,
  tasksToDo: [{}],
  isPublicMode: false,
  selectedContenders: [],
  selectedTags: [],
};
