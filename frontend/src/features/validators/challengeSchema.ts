import { OptionType } from "../../pages/creation-challenge/DropDownSelectors";

const yup = require("yup");

// Documentation about multiple value validation : https://stackoverflow.com/questions/57863852/yup-validation-on-multiple-values
export const challengeSchema = yup.object().shape({
  title: yup
    .string()
    .required("Le titre est obligatoire")
    .min(5, "Le titre doit être supérieur à 5 caractères")
    .max(150, "Un maximum de 150 caractères est autorisé"),
  description: yup
    .string()
    .required("La description doit faire entre 100 et 1000 caractères.")
    .min(100, "La description doit être supérieure à 100 caractères.")
    .max(1000, "La description doit être inférieure à 1000 caractères."),
  startDate: yup.date().nullable().required("Une date est manquante"),
  endDate: yup.date().nullable().required("Une date est manquante"),
  tasksToDo: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number().required(),
        label: yup.string().required(),
      })
    )
    .required()
    .min(1, "Ajoutez des tâches à accomplir")
    .test(
      "Doublon",
      "Il existe des doublons dans vos tâches",
      (tasks: OptionType[]) => {
        const labels = new Set();
        // check if task got a label and if labels already got this task => if not it throws an error
        return tasks.every((task) => {
          if (!task.label || labels.has(task.label)) {
            return false;
          }
          labels.add(task.label);
          return true;
        });
      }
    ),
  selectedContenders: yup.array().required(),
  selectedTags: yup
    .array()
    .required("Au moins un tag requis")
    .min(1, "Au moins un tag requis"),
});
