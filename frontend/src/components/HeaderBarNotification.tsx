import { SetStateAction, useMemo, useState, useEffect } from "react";
import useNotificationContext from "../features/contexts/NotificationContext";
import { useNavigate } from "react-router-dom";

const HeaderBarNotification = () => {
  const { notifications } = useNotificationContext();

  const isOneNotificationUnread = useMemo(() => {
    return (
      notifications?.some((notification) => notification?.isUnread) || false
    );
  }, [notifications]);

  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState<SetStateAction<void> | boolean>(
    isOneNotificationUnread
  );
  const [isTextVisible, setIsTextVisible] = useState(false);

  useEffect(() => {
    setIsHovered(isOneNotificationUnread);
  }, [isOneNotificationUnread]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setTimeout(() => setIsTextVisible(true), 400);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsTextVisible(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${
        isHovered ? "h-44" : "h-5"
      } cursor-pointer ease-in duration-300 w-16 bg-primary-attention border-b border-x drop-shadow-notification rounded-b-[10px] absolute right-40 top-[4.5rem] hidden lg:block`}
    >
      <div
        className={`${
          isTextVisible ? "overflow-visible opacity-100" : "overflow-hidden"
        } cursor-pointer w-100 rotate-90 pl-7 ml-1 font-bold transition-opacity duration-0 ease-out opacity-0 h-5`}
        onClick={() => navigate("/notifications")}
      >
        NOTIFICATIONS
      </div>
    </div>
  );
};

export default HeaderBarNotification;
