import NotificationList from "./NotificationList";
import { Toaster } from "react-hot-toast";

const NotificationsPage = () => {
  return (
    <div className="mainScreen">
      <div className="px-12 w-full">
        <Toaster reverseOrder={false} position="top-center" />
        <h3 className="font-bold text-primary-good">NOTIFICATIONS</h3>
        <NotificationList />
      </div>
    </div>
  );
};

export default NotificationsPage;
