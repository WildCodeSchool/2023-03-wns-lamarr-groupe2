import NotificationList from "./NotificationList";
import { Toaster } from "react-hot-toast";

const NotificationsPage = () => {
  return (
    <div className="px-12 w-full">
      <Toaster reverseOrder={false} position="top-center" />
      <h3 className="font-bold text-primary-good">NOTIFICATIONS</h3>
      <NotificationList />
    </div>
  );
};

export default NotificationsPage;
