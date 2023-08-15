import { FC, PropsWithChildren, useEffect, useReducer } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import InputCustom from "../../components/InputCustom";
import DatePickers from "./DatePickers";
import { isEmpty } from "remeda";
import useUserContext from "../../features/contexts/UserContext";
import TaskToDo from "./TaskToDo";
import plus from '../../assets/icons/plus-task.svg'
import Toggle from "../../components/Toggle";
import Contenders, { TContender } from "./Contenders";
import Tags, { TTags } from "./Tags";
import BtnCustom from "../../components/BtnCustom";
import { initialState, reducer } from "./reducer";
import { OptionType } from "./DropDownSelectors";


const CreateChallengePage: FC<PropsWithChildren> = () => {
  const { user } = useUserContext()
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log('Title :', state.title,
    '\nDescription :', state.description,
    '\nStartDate :', state.startDate,
    '\nEndDate :', state.endDate,
    '\nTasks to do :', state.tasksToDo,
    '\nIs public :', state.isPublicMode,
    '\nContenders :', state.selectedContenders,
    '\nTags :', state.selectedTags)


  useEffect(() => {
    const { description, title, startDate, endDate } = state;
    if (isEmpty(description) || isEmpty(title) || startDate === null || endDate === null) {
      dispatch({ type: "SET_IS_DISABLED", payload: true });
    } else {
      dispatch({ type: "SET_IS_DISABLED", payload: false });
    }
  }, [state.description, state.title, state.startDate, state.endDate]);

  useEffect(() => {
    if ((state.tasksToDo[0].id === undefined) || state.isDisabled) {
      dispatch({ type: "SET_IS_DISABLED_CONTENDERS", payload: true });
    } else {
      dispatch({ type: "SET_IS_DISABLED_CONTENDERS", payload: false });
    }
  }, [state.tasksToDo, state.isDisabled]);

  const handleTaskList = (newTaskData?: OptionType) => {
    if (state.tasksToDo.length > 2 && !user.company_id) {
      return;
    }
    if (state.tasksToDo.length > 4) {
      return;
    }
    dispatch({ type: "ADD_TASK" });
  };

  const updateTask = (index: number, updatedTask: OptionType | undefined) => {
    // @ts-ignore - I don't know how to fix the payload ts error
    dispatch({ type: "UPDATE_TASK", payload: { index: index, task: updatedTask as OptionType } });
  };

  return (
    <div className="border-2 lg:border-primary-good md:border-primary-danger px-2 py-3 flex flex-col md:gap-10  lg:flex-row  xl:gap-24 w-full">
      {/* first part desktop */}
      <section className=" lg:max-w-[50%] flex-1  flex flex-col gap-5  w-full">
        <InputCustom
          type="text"
          name=""
          value={state.title}
          placeholder="Be creative ! "
          onChange={(e) => dispatch({ type: "SET_TITLE", payload: e.target.value })}
          label="TITRE"
        />
        {/* Using the rich text editor for the description */}
        <label className="uppercase" title="description">
          DESCRIPTION
        </label>
        <ReactQuill
          className="mt-[-18px] max-w-[100%] "
          value={state.description}
          onChange={(value) => dispatch({ type: "SET_DESCRIPTION", payload: value })}
          placeholder="Be creative ! "
          preserveWhitespace
        />

        {/*  DATE PICKER */}
        <DatePickers
          setStartDate={(date) => dispatch({ type: "SET_START_DATE", payload: date as Date | null })}
          startDate={state.startDate}
          setEndDate={(date) => dispatch({ type: "SET_END_DATE", payload: date as Date | null })}
          endDate={state.endDate}
        />

        {/* Task To dDo */}
        <label className="uppercase" title="todotask">
          Tâches à accomplir
        </label>

        {state.tasksToDo.map((task: any, index: number) => (
          <TaskToDo updateTask={(updatedTask: OptionType) => updateTask(index, updatedTask)} key={index} isDisabled={state.isDisabled} />
        ))}

        {(state.tasksToDo.length > 2 && !user.company_id) ? null : state.tasksToDo.length === 5 ? null : <button onClick={() => handleTaskList(undefined)} className="flex gap-2 font-content">
          <img src={plus} alt='Create a task' className="h-6 w-6" />
          ajouter une tâche </button>}
      </section>
      {/* second part desktop */}
      <section className=" flex-1  lg:max-w-md xl:max-w-lg xxl:max-w-full">
        <label className="uppercase" title="visibility">
          VISIBILITÉ
        </label>
        <div className="flex gap-6 mt-2">
          <Toggle value={state.isPublicMode} onClick={() => dispatch({ type: "SET_PUBLIC_MODE", payload: !state.isPublicMode })} styled='toggle' />
          <p> {state.isPublicMode ? 'publique' : 'privée'}</p>
        </div>

        {/* Contenders */}
        <Contenders isDisabledContenders={state.isDisabledContenders} selectedContenders={state.selectedContenders} setSelectedContenders={(contenders) => dispatch({ type: "SET_SELECTED_CONTENDERS", payload: contenders as TContender[] })} />
        {/* Tags */}
        <Tags isDisabledContenders={state.isDisabledContenders} setSelectedTags={(tags) => dispatch({ type: "SET_SELECTED_TAGS", payload: tags as TTags[] })} selectedTags={state.selectedTags} />

        <div className="my-6 md:mt-24 lg:pr-24  flex gap-6 w-full justify-center lg:justify-end">
          <button onClick={() => console.log('preview')} className="text-primary-attention uppercase">aperçu</button>
          <BtnCustom onClick={() => console.log('challenge info')} text="Publier" styled="btnGood" />

        </div>
      </section>
    </div>
  );
};

export default CreateChallengePage;
