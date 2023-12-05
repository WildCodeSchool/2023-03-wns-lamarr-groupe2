import { useLocation } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";
import { HeaderBarModale } from "./HeaderBarModale";
import { useState } from "react";
import useUserContext from "../features/contexts/UserContext";
import HeaderBarNotification from "./HeaderBarNotification";

export const HeaderBar = () => {
  const [showModale, setShowModale] = useState(false);
  const { user } = useUserContext();
  const isCompany = false; // from userContext
  const location = useLocation();
  const mobileHeader =
    location.pathname === "/" ||
    location.pathname === "/dashboard" ||
    location.pathname === "/company/dashboard";

  const HeaderElement = ({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) => (
    <div
      className={`${label === "Challenges : " && "hidden"
        } lg:flex items-center`}
    >
      <p className="inline-block">{label}</p>
      <span className="font-bold text-[1.1em] pl-1">{value}</span>
    </div>
  );

  return (
    <header className="xxl:absolute  xxl:z-10 xxl:right-48">
      <div className="cursor-pointer">
        <ProfilePicture
          size="mediumPic"
          url={user.picture}
          onClick={() => setShowModale((prev) => !prev)}
        />
        {showModale && <HeaderBarModale setShowModale={setShowModale} />}
      </div>
    </header>
  );
};
