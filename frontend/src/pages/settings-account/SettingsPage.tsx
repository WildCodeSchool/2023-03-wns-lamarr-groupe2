import Profile from "./Profile";
import NotificationsParameters from "./NotificationsParameters";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { UserInformations } from "../homepage/Inscription/InscriptionForm";
import { userInformationsSchema } from "../../features/validators/userSchema";
import { useToaster } from "../../features/hooks/useToaster";
import useUserContext from "../../features/contexts/UserContext";

const SettingsPage = () => {
  const [isEdit, setIsEdit] = useState(false)
  const { user, updateUser } = useUserContext()
  const {notifyErrorUpdate} = useToaster()


  const [userInformations, setUserInformations] = useState({ username: user?.username, email: user?.email})

  const handleInputChange = (fieldName: string) => (event: { target: { value: string }; }) => {
      const { value } = event.target;
      setUserInformations((prevUserInformations: Pick<UserInformations, 'username' | 'email' >) => ({
          ...prevUserInformations,
          [fieldName]: value
      }));
  };

  const { email, username } = userInformations;

  const handleModifications = async (e :React.FormEvent | undefined) => {
      try {await userInformationsSchema.validate(userInformations, { abortEarly: false });
      const userInformationsUpdate = userInformations
      updateUser(e!, userInformationsUpdate)        
      setIsEdit(prev => !prev)
  } catch {
      notifyErrorUpdate()
      setUserInformations({username: user?.username, email: user?.email})
  }
  }


  return <div className="flex flex-col lg:flex-row w-full lg:gap-28  justify-start lg:px-10 p-3
  ">
    <Toaster reverseOrder={false} position="top-center" />

    <Profile  user={user} username={username} email={email} handleInputChange={handleInputChange} setIsEdit={setIsEdit} isEdit={isEdit} handleModifications={handleModifications} />
    <NotificationsParameters user={user} username={username} email={email} handleInputChange={handleInputChange} setIsEdit={setIsEdit} isEdit={isEdit} handleModifications={handleModifications} />
  </div>;
}

export default SettingsPage;
