import { FC, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useNotificationContext from "../../features/contexts/NotificationContext";

export type NavigationBarElementProps = {
  link: string;
  index: number;
  title: string
};

export const NavigationBarElement: FC<NavigationBarElementProps> = ({
  link,
  index,
  title
}) => {
  const isCompany = false; // import userContext
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname.slice(1);
  const activeRoute = pathName === link;
  const { notifications } = useNotificationContext();
  const [url, setUrl] = useState<string | undefined>(undefined);
  const notificationsUnreadNumber = notifications.filter(
    (notification) => notification?.isUnread
  ).length;

  useEffect(() => {
    const importImage = async () => {
      try {
        const image = await import(
          `../../assets/icons/navigation/${link}-${activeRoute ? "light" : "dark"
          }.svg`
        );
        setUrl(image.default);
      } catch (error) {
        console.error(error);
      }
    };

    importImage();
  }, [link, activeRoute]);

  return (
    <div className="relative">
      <img
        src={url}
        alt={link}
        onClick={() => navigate(isCompany ? `/company/${link}` : `/${link}`)}
        className={`h-9 w-9 cursor-pointer  md:hidden`}
      />
      <li onClick={() => navigate(isCompany ? `/company/${link}` : `/${link}`)} className={`hidden md:block font-bold  text-xl cursor-pointer hover:text-element-bg ${activeRoute && 'text-element-bg'}`}>{title}</li>
      {link === "notifications" && notificationsUnreadNumber !== 0 && (
        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-[14px] font-bold text-white  border-2 border-primary-dark rounded-full bottom-5 left-5  bg-primary-danger">
          {notificationsUnreadNumber}
        </div>
      )}
    </div>
  );
};
