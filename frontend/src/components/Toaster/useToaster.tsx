import { useMemo } from "react";
import { toast } from "react-hot-toast";

export const useToaster = () => {
  const s = useMemo(() => {
    const toastStyle = {
      border: "1px solid black",
      paddingTop: "16px",
      paddingBottom: "16px",
      paddingLeft: "40px",
      paddingRight: "40px",
      color: 'white',
      backgroundColor: "#96B9A0",
      boxShadow: "5px 6px 0px rgba(0, 0, 0, 1)",
      fontFamily: 'Montserrat',
      fontWeight: 600
    };

    return toastStyle;
  }, []);

  const showToast = (message: string, options?: {
    error: boolean;
  }) => {
    const mergedStyle = {
      ...s,
      backgroundColor: options?.error ? "#CE7677" : s.backgroundColor
    };

    return toast(message, { style: mergedStyle });
  };

  const notifyProfileChange = () => showToast("Changements sauvegardés");

  const notifyImage = () => showToast("Photo de profil mise à jour !");

  const notifyPost = () => showToast("Challenge créé !");

  const notifyPostError = () =>
    showToast("La création du challenge a échoué", { error: true });

  const notifyRegister = () => showToast("Votre compte est créé 🎉");

  const notifyErrorRegister = () =>
    showToast("Un problème est survenu", { error: true });

  const notifyErrorConnexion = () =>
    showToast("Connexion refusée", { error: true });

  return {
    notifyErrorConnexion,
    notifyErrorRegister,
    notifyRegister,
    notifyPostError,
    notifyProfileChange,
    notifyImage,
    notifyPost,
  };
};
