import { FC, PropsWithChildren, SetStateAction, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import InputCustom from "../../components/InputCustom";
import DatePickers from "./DatePickers";
import { isEmpty } from "remeda";
import useUserContext from "../../features/contexts/UserContext";
import TaskToDo from "./TaskToDo";
import { OptionType } from "./DropDownSelectors";
import plus from '../../assets/icons/plus-task.svg'
import Toggle from "../../components/Toggle";
import Contenders, { TContender } from "./Contenders";
import Tags, { TTags } from "./Tags";
import BtnCustom from "../../components/BtnCustom";

const CreateChallengePage: FC<PropsWithChildren> = () => {
  const { user } = useUserContext()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabledContenders, setIsDisabledContenders] = useState(false)
  const [tasksToDo, setTasksToDo] = useState<any>([{}])
  const [isPublicMode, setIsPublicMode] = useState(false)
  const [selectedContenders, setSelectedContenders] = useState<TContender[]>([])
  const [selectedTags, setSelectedTags] = useState<TTags[]>([])

  /*   console.log('Title :', title,
      '\nDescription :', description,
      '\nStartDate :', startDate,
      '\nEndDate :', endDate,
      '\nTasks to do :', tasksToDo,
      '\nIs public :', isPublicMode,
      '\nContenders :', selectedContenders,
      '\nTags :', selectedTags) */

  const handleDescriptionChange = (value: SetStateAction<string>) => {
    setDescription(value);
  };
  useEffect(() => {
    if (isEmpty(description) || isEmpty(title) || startDate === null || endDate === null) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [title, description, startDate, endDate]);

  useEffect(() => {
    if ((tasksToDo[0].id === undefined) || isDisabled) {
      setIsDisabledContenders(true);
    } else {
      setIsDisabledContenders(false);
    }
  }, [tasksToDo, isDisabled]);

  /* To add a new task */
  const handleTaskList = (newTaskData?: OptionType) => {
    if (tasksToDo.length > 2 && !user.company_id) {
      return;
    }
    if (tasksToDo.length > 4) {
      return;
    }
    /* Add a new task without value because it was more easy to update later */
    setTasksToDo([...tasksToDo, {}]);
  }

  /* Update a task with his index */
  const updateTask = (index: number, updatedTask: OptionType) => {
    const updatedTasks = [...tasksToDo];
    updatedTasks[index] = updatedTask;
    setTasksToDo(updatedTasks);
  };

  return (
    <div className="border-2 lg:border-primary-good md:border-primary-danger px-2 py-3 flex flex-col md:gap-10  lg:flex-row  xl:gap-24 w-full">
      {/* first part desktop */}
      <section className=" lg:max-w-[50%] flex-1  flex flex-col gap-5  w-full">
        <InputCustom
          type="text"
          name=""
          value={title}
          placeholder="Be creative ! "
          onChange={(e) => setTitle(e.target.value)}
          label="TITRE"
        />
        {/* Using the rich text editor for the description */}
        <label className="uppercase" title="description">
          DESCRIPTION
        </label>
        <ReactQuill
          className="mt-[-18px] max-w-[100%] "
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Be creative ! "
          preserveWhitespace
        />

        {/*  DATE PICKER */}
        <DatePickers
          setStartDate={setStartDate}
          startDate={startDate}
          setEndDate={setEndDate}
          endDate={endDate}
        />

        {/* Task To dDo */}
        <label className="uppercase" title="todotask">
          Tâches à accomplir
        </label>

        {tasksToDo.map((task: any, index: number) => (
          <TaskToDo updateTask={(updatedTask: OptionType) => updateTask(index, updatedTask)} key={index} isDisabled={isDisabled} />
        ))}

        {(tasksToDo.length > 2 && !user.company_id) ? null : tasksToDo.length === 5 ? null : <button onClick={() => handleTaskList(undefined)} className="flex gap-2 font-content">
          <img src={plus} alt='Create a task' className="h-6 w-6" />
          ajouter une tâche </button>}
      </section>
      {/* second part desktop */}
      <section className=" flex-1  lg:max-w-md xl:max-w-lg xxl:max-w-full">
        <label className="uppercase" title="visibility">
          VISIBILITÉ
        </label>
        <div className="flex gap-6 mt-2">
          <Toggle value={isPublicMode} onClick={() => setIsPublicMode(prev => !prev)} styled='toggle' />
          <p> {isPublicMode ? 'publique' : 'privée'}</p>
        </div>

        {/* Contenders */}
        <Contenders isDisabledContenders={isDisabledContenders} selectedContenders={selectedContenders} setSelectedContenders={setSelectedContenders} />
        {/* Tags */}
        <Tags isDisabledContenders={isDisabledContenders} setSelectedTags={setSelectedTags} selectedTags={selectedTags} />

        <div className="my-6 md:mt-24 lg:pr-24  flex gap-6 w-full justify-center lg:justify-end">
          <button onClick={() => console.log('preview')} className="text-primary-attention uppercase">aperçu</button>
          <BtnCustom onClick={() => console.log('challenge info')} text="Publier" styled="btnGood" />

        </div>
      </section>
    </div>
  );
};

export default CreateChallengePage;
