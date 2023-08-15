import { OptionType } from "./DropDownSelectors";

const yup = require("yup");

export const challengeSchema = yup.object().shape({
  title: yup.string().required().min(5).max(150),
  description: yup.string().required().min(100).max(1000),
  startDate: yup.date().nullable().required(),
  endDate: yup.date().nullable().required(),
  tasksToDo: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number().required(),
        label: yup.string().required(),
      })
    )
    .required()
    .test(
      "unique labels",
      "Les tâches doivent être unique",
      (tasks: OptionType[]) => {
        const labels = new Set();
        return tasks.every((task) => {
          if (!task.label || labels.has(task.label)) {
            return false;
          }
          labels.add(task.label);
          return true;
        });
      }
    ),
  selectedContenders: yup.array().min(1).required(),
  selectedTags: yup.array().min(1).required(),
});
