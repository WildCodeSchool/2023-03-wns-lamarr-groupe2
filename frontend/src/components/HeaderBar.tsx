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
    <header
      className={`relative  border-b-1 border-tertiary-dark  h-20 ${mobileHeader ? "flex  px-8  " : "hidden"
        }  lg:flex font-titles justify-between items-center lg:px-2`}
    >
      <h1 className="hidden lg:block font-bold text-[3em]">ECHOES OF FUTURE</h1>

      <HeaderElement label="Challenges : " value={3} />
      <HeaderElement
        label={isCompany ? "Mes Employés : " : "Points : "}
        value={user?.points ?? 0}
      />
      <div className="cursor-pointer">
        <ProfilePicture
          size="mediumPic"
          url={user.picture}
          onClick={() => setShowModale((prev) => !prev)}
        />
        {showModale && <HeaderBarModale setShowModale={setShowModale} />}
      </div>
      <HeaderBarNotification />
    </header>
  );
};
