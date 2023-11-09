import { Dispatch, FC, SetStateAction, useState } from "react";
import edit from "../../assets/icons/edit.svg";
import ProfilePicture from "../../components/ProfilePicture";
import BtnCustom from "../../components/BtnCustom";
import InputCustom from "../../components/InputCustom";
import { TUser } from "../../features/contexts/utils/types";
import ProfileModale from "./ProfileModale";
import modifyPic from "../../assets/icons/modifyPic.svg";
import { ModalePictureChoice } from "./ModalePictureChoice";
import useUserContext from "../../features/contexts/UserContext";

export type SettingsPageParameters = {
  user: TUser;
  isEdit: boolean;
  isEditPassword: boolean;
  handleModifications: (e: React.FormEvent | undefined) => Promise<void>;
  handlePasswordModification: (e: React.FormEvent | undefined) => Promise<void>;
  username: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  handleInputChange: (
    fieldName: string
  ) => (event: { target: { value: string } }) => void;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setIsEditPassword: Dispatch<SetStateAction<boolean>>;
};

const Profile: FC<SettingsPageParameters> = ({
  user,
  isEdit,
  //isEditPassword,
  handleModifications,
  handlePasswordModification,
  username,
  email,
  oldPassword,
  newPassword,
  confirmPassword,
  handleInputChange,
  setIsEdit,
  isEditPassword,
  setIsEditPassword,
}) => {
  const { errorMsg } = useUserContext();
  const [isOpenModale, setIsOpenModale] = useState(false);
  const [isOpenPictureChoice, setOpenPictureChoice] = useState(false);
  const formattedString = (string: string, size: number) => {
    // size : 14 and for md screen only
    if (string.length < size) {
      return string;
    }

    if (string.length > size) {
      const tokens = string.split(/[ -]/);
      if (tokens.length <= 1) {
        return tokens[0].slice(0, size - 1) + "…";
      }
      if (tokens.length === 2) {
        const joinTokens = `${tokens[0]} ${tokens[1]}`;
        if (joinTokens.length < size) {
          return joinTokens;
        } else {
          return `${tokens[0]} ${tokens[1].slice(0, 1)}.`;
        }
      }
      if (tokens.length > 2) {
        const joinTokens = `${tokens[0]} ${tokens[1]}  ${tokens[2].slice(
          0,
          1
        )}. `;
        return joinTokens;
      }
    }
  };

  return (
    <section className="lg:flex-1 w-full lg:w-max lg:max-w-[457px]">
      {/* Mobile Header */}
      <div className="lg:hidden  flex w-full justify-center pr-5">
        <div className="w-fit pr-4 relative">
          <ProfilePicture url={user.picture} size="largePic" />
          <img
            src={modifyPic}
            alt="Modify Profile"
            className="absolute right-4 bottom-0 h-6 w-6 cursor-pointer"
            onClick={() => setOpenPictureChoice(true)}
          />
        </div>

        <div className="flex flex-col  w-9/12 justify-center md:hidden">
          <h2 className="w-full  "> {formattedString(user?.firstname, 14)}</h2>
          <h2 className="w-full "> {formattedString(user.lastname, 14)}</h2>
        </div>

        <div className="hidden md:flex flex-col  w-9/12 justify-center">
          <h2 className="w-full  "> {formattedString(user?.firstname, 14)}</h2>
          <h2 className="w-full  "> {formattedString(user.lastname, 14)}</h2>
        </div>

        {!isEdit && (
          <img
            className="w-1/12 h-8 pb-2 cursor-pointer self-end "
            src={edit}
            alt="edit profile"
            onClick={() => setIsEdit(true)}
          />
        )}
      </div>
      <div className="flex justify-center w-full lg:hidden">
        <div className="border-b-1 w-11/12 my-9 " />
      </div>
      {/* Desktop Header */}
      <div className="hidden lg:flex flex-col w-full justify-between">
        <div className="w-fit gap-9 flex pr-1 mb-14">
          <h3 className="font-bold text-primary-good">PROFIL</h3>
          {!isEdit ? (
            <img
              className="w-6 self-end pb-2  cursor-pointer"
              src={edit}
              alt="edit profile"
              onClick={() => {
                setIsEdit(true);
                setIsEditPassword(false);
              }}
            />
          ) : null}
        </div>
        <div className="w-fit pr-4 relative">
          <ProfilePicture url={user.picture} size="xlargePic" />
          <img
            src={modifyPic}
            alt="Modify Profile "
            className="absolute right-6 bottom-2 h-8 w-8 cursor-pointer"
            onClick={() => setOpenPictureChoice(true)}
          />
        </div>
        <div className="flex flex-col  w-9/12 justify-center mt-12">
          <h2 className="w-full ">
            {" "}
            {user?.firstname} {formattedString(user.lastname, 14)}
          </h2>
        </div>
      </div>

      {/* Informations */}
      <div className="px-3 lg:p-0">
        <form
          className="flex flex-col gap-4 text-button mb-5 lg:mb-12"
          onSubmit={async (e) => {
            try {
              await handleModifications(e);
              console.log("handleModifications complete");
            } catch (err) {
              console.error(err);
            }
          }}
        >
          {isEdit && !isEditPassword && (
            <>
              <div className="flex items-center gap-3 lg:mt-5">
                <p className="block">pseudo: </p>
                <InputCustom
                  label="Pseudo"
                  name="username"
                  type="text"
                  value={username}
                  onChange={handleInputChange("username")}
                />
              </div>
              <div className="flex items-center gap-7 lg:mt-5">
                <p className="block">email: </p>
                <InputCustom
                  label="Email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleInputChange("email")}
                />
              </div>
            </>
          )}
          <div className="flex justify-center lg:hidden">
            {isEdit && !isEditPassword ? (
              <BtnCustom
                styled="btnGood"
                text="ENREGISTRER"
                onClick={handleModifications}
              />
            ) : null}
          </div>
        </form>

        <form
          className="flex flex-col gap-4 text-button mb-5 lg:mb-12"
          onSubmit={async (e) => {
            try {
              await handlePasswordModification(e);
              console.log("handlePasswordModification complete");
            } catch (err) {
              console.error(err);
            }
          }}
        >
          {isEditPassword && (
            <>
              <p className="font-bold mb-5">Modifier mot de passe</p>
              <InputCustom
                label="Mot de passe actuel"
                type="password"
                name="oldPassword"
                placeholder="*******"
                value={oldPassword}
                onChange={handleInputChange("oldPassword")}
              />
              <InputCustom
                label="Nouveau mot de passe"
                type="password"
                name="newPassword"
                placeholder="*******"
                value={newPassword}
                onChange={handleInputChange("newPassword")}
              />
              <InputCustom
                label="Confirmation nouveau mot de passe"
                type="password"
                name="confirmPassword"
                placeholder="*******"
                value={confirmPassword}
                onChange={handleInputChange("confirmPassword")}
              />
              {errorMsg && (
                <div className="text-color-red font-normal text-small-p mt-6 ml-1">
                  {errorMsg}
                </div>
              )}
            </>
          )}
          <div className="flex justify-center lg:hidden">
            {isEditPassword ? (
              <BtnCustom
                styled="btnGood"
                text="ENREGISTRER CHANGEMENT MOT DE PASSE"
                onClick={handlePasswordModification}
              />
            ) : null}
          </div>
        </form>

        <div className="hidden lg:block ">
          {isEdit && !isEditPassword ? (
            <BtnCustom
              styled="btnGood"
              text="ENREGISTRER"
              onClick={handleModifications}
            />
          ) : isEditPassword ? (
            <BtnCustom
              styled="btnGood"
              text="ENREGISTRER CHANGEMENTS"
              onClick={handlePasswordModification}
            />
          ) : (
            <BtnCustom
              styled="btnDanger"
              text="SUPPRIMER COMPTE"
              onClick={() => setIsOpenModale(true)}
            />
          )}
          <div
            onClick={() => setIsEditPassword(true)}
            className="underline font-normal text-small-p mt-6 ml-1"
          >
            Modifier le mot de passe
          </div>
          <div
            onClick={() => console.log("TO - DO : Supprimer le cache")}
            className="underline font-normal text-small-p mt-6 ml-1"
          >
            Paramètres avancés
          </div>
        </div>
      </div>
      {isOpenModale ? (
        <ProfileModale setIsOpenModale={setIsOpenModale} />
      ) : null}
      {isOpenPictureChoice ? (
        <ModalePictureChoice setOpenPictureChoice={setOpenPictureChoice} />
      ) : null}
    </section>
  );
};

export default Profile;
