import * as Yup from "yup";

export const userInformationsSchema = Yup.object().shape({
  username: Yup.string().required("Le nom d'utilisateur est requis"),
  email: Yup.string()
    .required("L'adresse e-mail est requise")
    .email("L'adresse e-mail doit être valide"),
});
