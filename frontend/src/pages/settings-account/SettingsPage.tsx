import Profile from "./Profile";
import NotificationsParameters from "./NotificationsParameters";
import { Toaster } from "react-hot-toast";

const SettingsPage = () => {

  return <div className="flex flex-col lg:flex-row w-full lg:gap-28  justify-start lg:px-10 p-3
  ">
    <Toaster reverseOrder={false} position="top-center" />

    <Profile />
    <NotificationsParameters />
  </div>;
}

export default SettingsPage;
