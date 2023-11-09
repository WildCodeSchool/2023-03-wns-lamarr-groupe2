import Profile from "./Profile";
import NotificationsParameters from "./NotificationsParameters";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { UserInformations } from "../homepage/Inscription/InscriptionForm";
import { userInformationsSchema } from "../../features/validators/userSchema";
import { useToaster } from "../../features/hooks/useToaster";
import useUserContext from "../../features/contexts/UserContext";
import { passwordUpdateSchema } from "../../features/validators/passwordUpdateSchema";

const SettingsPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { user, updateUser, updatePassword } = useUserContext();
  const { notifyErrorUpdate } = useToaster();

  const [userInformations, setUserInformations] = useState({
    username: user?.username,
    email: user?.email,
  });
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleInputChange =
    (fieldName: string) => (event: { target: { value: string } }) => {
      const { value } = event.target;
      switch (fieldName) {
        case "username":
        case "email":
          setUserInformations(
            (
              prevUserInformations: Pick<UserInformations, "username" | "email">
            ) => ({
              ...prevUserInformations,
              [fieldName]: value,
            })
          );
          break;
        case "oldPassword":
          setOldPassword(value);
          break;
        case "newPassword":
          setNewPassword(value);
          break;
        case "confirmPassword":
          setConfirmPassword(value);
          break;
      }
    };

  const { email, username } = userInformations;

  const handleModifications = async (e: React.FormEvent | undefined) => {
    try {
      await userInformationsSchema.validate(userInformations, {
        abortEarly: false,
      });
      const userInformationsUpdate = {
        ...userInformations,
        oldPassword,
        newPassword,
      };
      updateUser(e!, userInformationsUpdate);
      setIsEdit((prev) => !prev);
    } catch {
      notifyErrorUpdate();
      setUserInformations({ username: user?.username, email: user?.email });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const handlePasswordModification = async (e: React.FormEvent | undefined) => {
    try {
      await passwordUpdateSchema.validate({
        oldPassword,
        newPassword,
        confirmPassword,
      });

      updatePassword(e!, { oldPassword, newPassword, confirmPassword });
    } catch (error) {
      console.error(error);
      notifyErrorUpdate();
    }
  };

  return (
    <div
      className="flex flex-col lg:flex-row w-full lg:gap-28  justify-start lg:px-10 p-3
  "
    >
      <Toaster reverseOrder={false} position="top-center" />

      <Profile
        user={user}
        username={username}
        email={email}
        handleInputChange={handleInputChange}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
        handleModifications={handleModifications}
        handlePasswordModification={handlePasswordModification}
        oldPassword={oldPassword}
        newPassword={newPassword}
        confirmPassword={confirmPassword}
      />
      <NotificationsParameters
        user={user}
        username={username}
        email={email}
        handleInputChange={handleInputChange}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
        handleModifications={handleModifications}
        handlePasswordModification={handlePasswordModification}
        oldPassword={oldPassword}
        newPassword={newPassword}
        confirmPassword={confirmPassword}
      />
    </div>
  );
};

export default SettingsPage;
