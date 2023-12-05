import { FC, useState } from "react";
import BtnCustom from "../../components/BtnCustom";
import Toggle from "../../components/Toggle";
import { SettingsPageParameters } from "./Profile";
import ProfileModale from "./ProfileModale";

const NotificationsParameters: FC<SettingsPageParameters> = () => {
  const [isOpenModale, setIsOpenModale] = useState(false);

  return (
    <div className="">
      <div className="w-fit gap-9 flex pr-1">
        <h3 className="font-bold text-primary-good uppercase">
          <span className="hidden lg:inline">Paramètres </span>Notifications
        </h3>
      </div>
      <p className="underline italic text-lg">
        Rétablir les paramètres par défaut
      </p>
      <ul className="flex flex-col gap-6 mt-7">
        <li className="flex gap-5">
          <Toggle
            value={false}
            styled="toggle"
            onClick={() => console.log("TO DO - toggle")}
          />
          <p>invitations aux challenges</p>
        </li>
        <li className="flex  gap-5">
          <Toggle
            value={false}
            styled="toggle"
            onClick={() => console.log("TO DO - toggle toggle")}
          />
          <p>nouveau commentaire</p>
        </li>
        <li className="flex  gap-5">
          <Toggle
            value={true}
            styled="toggle"
            onClick={() => console.log("TO DO - toggle toggle")}
          />
          <p>invitation d'un(e) ami(e) accepté(e)</p>
        </li>
      </ul>
      <div className="flex justify-center mt-5 lg:hidden ">
        <BtnCustom
          styled="btnDanger"
          text="SUPPRIMER COMPTE"
          onClick={() => setIsOpenModale(true)}
        />
        <div
          onClick={() => console.log("TO - DO : Supprimer le cache")}
          className=" hidden lg:block underline  font-normal text-small-p mt-6 ml-1"
        >
          Paramètres avancés
        </div>
      </div>
      {isOpenModale ? (
        <ProfileModale setIsOpenModale={setIsOpenModale} />
      ) : null}
    </div>
  );
};

export default NotificationsParameters;
