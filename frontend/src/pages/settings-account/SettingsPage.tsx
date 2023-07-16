import Profile from "./Profile";
import NotificationsParameters from "./NotificationsParameters";

function SettingsPage() {
  return <div className="flex flex-col lg:flex-row w-full  gap-10 lg:gap-28  justify-start lg:px-10 border-4 sm:border-secondary-dark md:border-tertiary-dark lg:border-primary-danger xl:border-primary-attention xxl:border-primary-good 

  ">
    <Profile />
    <NotificationsParameters />
  </div>;
}

export default SettingsPage;
