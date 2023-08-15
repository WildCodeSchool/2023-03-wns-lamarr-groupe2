import { FC, PropsWithChildren, useEffect, useReducer, useState } from "react";
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
import ConfirmCreationModale from "./ConfirmCreationModale";
import { challengeSchema } from "./challengeSchema";
import { useToaster } from "../../features/hooks/useToaster";
import { error } from "console";
import { Toaster } from "react-hot-toast";


const CreateChallengePage: FC<PropsWithChildren> = () => {
  const { notifyCreateError } = useToaster()
  const { user } = useUserContext()
  /* Reducer for challenge states */
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isOpenModale, setIsOpenModale] = useState(false)
  const [isDisabled, setIsDisable] = useState(false);
  const [isDisabledContenders, setIsDisableContenders] = useState(false);
  const [isDisabledButton, setIsDisabledButton] = useState(false)


  const publishChallenge = () => {
    const cleanedTasksToDo = state.tasksToDo.filter(task => task.label);

    challengeSchema.validate({ ...state, tasksToDo: cleanedTasksToDo })
      .then((validData: any) => {
        console.log('Validation successful:', validData);
        setIsOpenModale(prev => !prev);
      })
      .catch((validationError: { errors: any; }) => {
        console.error('Validation failed:', validationError.errors);
        notifyCreateError(validationError.errors);
      });
    console.log('Title :', state.title,
      '\nDescription :', state.description,
      '\nStartDate :', state.startDate,
      '\nEndDate :', state.endDate,
      '\nTasks to do :', state.tasksToDo,
      '\nIs public :', state.isPublicMode,
      '\nContenders :', state.selectedContenders,
      '\nTags :', state.selectedTags)
  }



  useEffect(() => {
    const { description, title, startDate, endDate } = state;
    if (isEmpty(description) || isEmpty(title) || startDate === null || endDate === null) {
      setIsDisable(true)
    } else {
      setIsDisable(false)
    }
  }, [state.description, state.title, state.startDate, state.endDate]);

  useEffect(() => {
    if ((state.tasksToDo[0].id === undefined) || isDisabled) {
      setIsDisableContenders(true)
    } else {
      setIsDisableContenders(false)
    }
  }, [state.tasksToDo, isDisabled]);

  useEffect(() => {
    if (isEmpty(state.selectedContenders) || isEmpty(state.selectedTags) || isDisabled) {
      setIsDisabledButton(true)
    } else {
      setIsDisabledButton(false)
    }
  }, [state, state.selectedContenders, state.selectedTags, isDisabled]);



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
    <div className="px-2 py-3 flex flex-col md:gap-10  lg:flex-row  xl:gap-24 w-full">
      <Toaster reverseOrder={false} position="top-center" />

      {/* first part desktop */}
      <section className=" max-w-5xl  flex-1  flex flex-col gap-5  w-full">
        <div className=" max-w-5xl ">
          <InputCustom
            type="text"
            name=""
            value={state.title}
            placeholder="Be creative ! "
            onChange={(e) => dispatch({ type: "SET_TITLE", payload: e.target.value })}
            label="TITRE"
          /></div>
        {/* Using the rich text editor for the description */}
        <label className="uppercase" title="description">
          DESCRIPTION
        </label>
        <ReactQuill
          className="mt-[-18px] w-full max-w-5xl"
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
          <TaskToDo updateTask={(updatedTask: OptionType) => updateTask(index, updatedTask)} key={index} isDisabled={isDisabled} />
        ))}

        {(state.tasksToDo.length > 2 && !user.company_id) ? null : state.tasksToDo.length === 5 ? null : <button onClick={() => handleTaskList(undefined)} className="flex gap-2 font-content">
          <img src={plus} alt='Create a task' className="h-6 w-6" />
          ajouter une tâche </button>}
      </section>
      {/* second part desktop */}
      <section className=" flex-1  lg:max-w-[47%] xl:max-w-lg xxl:max-w-full">
        <div className="lg:max-w-md">
          <label className="uppercase" title="visibility">
            VISIBILITÉ
          </label>
          <div className="flex gap-6 mt-2">
            <Toggle value={state.isPublicMode} onClick={() => dispatch({ type: "SET_PUBLIC_MODE", payload: !state.isPublicMode })} styled='toggle' />
            <p> {state.isPublicMode ? 'publique' : 'privée'}</p>
          </div>

          {/* Contenders */}
          <Contenders isDisabledContenders={isDisabledContenders} selectedContenders={state.selectedContenders} setSelectedContenders={(contenders) => dispatch({ type: "SET_SELECTED_CONTENDERS", payload: contenders as TContender[] })} />
          {/* Tags */}
          <Tags isDisabledContenders={isDisabledContenders} setSelectedTags={(tags) => dispatch({ type: "SET_SELECTED_TAGS", payload: tags as TTags[] })} selectedTags={state.selectedTags} />

          <div className="my-6 md:mt-24 lg:pr-24  flex gap-6 w-full justify-center lg:justify-end">
            <button onClick={() => console.log('preview')} className=" text-tertiary-dark uppercase hover:text-primary-attention">aperçu</button>
            {!isDisabledButton && <BtnCustom onClick={publishChallenge} text="Publier" styled="btnGood" />}

          </div></div>
      </section>
      {isOpenModale && <ConfirmCreationModale setIsOpenModale={setIsOpenModale} />}
    </div>
  );
};

export default CreateChallengePage;
