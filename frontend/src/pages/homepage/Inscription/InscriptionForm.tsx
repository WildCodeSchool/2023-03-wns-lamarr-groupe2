import { FC, useState } from "react";
import { Link } from "react-router-dom";
import BtnCustom from "../../../components/BtnCustom";
import InputCustom from "../../../components/InputCustom";
import useUserContext from "../../../features/contexts/UserContext";

export type UserInformations = {
  username: string;
  email: string;
  lastname: string;
  firstname: string;
  password: string;
  siret?: string;
  picture?: string;
};

const InscriptionForm: FC<{ isCompany: boolean }> = ({ isCompany }) => {
  const { register } = useUserContext();
  // TO-DO : Import UserContext register function

  const [userInformations, setUserInformations] = useState<UserInformations>({
    username: "",
    email: "",
    lastname: "",
    firstname: "",
    password: "",
    siret: "",
  });

  const handleInputChange =
    (fieldName: string) => (event: { target: { value: string } }) => {
      const { value } = event.target;
      setUserInformations((prevUserInformations: UserInformations) => ({
        ...prevUserInformations,
        [fieldName]: value,
      }));
    };

  const { email, username, lastname, firstname, password, siret } =
    userInformations;

  return (
    <>
      <h2 className="text-center font-titles font-bold text-2xl mb-7">
        S'INSCRIRE
      </h2>
      <form>
        <InputCustom
          type="text"
          label="Nom"
          name="lastname"
          value={lastname}
          onChange={handleInputChange("lastname")}
        />
        <InputCustom
          type="text"
          label="Prénom"
          name="firstname"
          value={firstname}
          onChange={handleInputChange("firstname")}
        />
        <InputCustom
          type="text"
          label={isCompany ? "Nom de société" : "Pseudo"}
          name="username"
          value={username}
          onChange={handleInputChange("username")}
        />
        {isCompany && (
          <InputCustom
            type="text"
            label="Siret"
            name="siret"
            value={siret ?? ""}
            onChange={handleInputChange("siret")}
          />
        )}
        <InputCustom
          type="email"
          label="Email"
          name="email"
          value={email}
          onChange={handleInputChange("email")}
        />
        <InputCustom
          type="password"
          label="Mot de passe"
          name="password"
          value={password}
          onChange={handleInputChange("password")}
        />
        <div className=" my-9 flex justify-center">
          <BtnCustom
            text="CRÉER"
            size="small"
            onClick={(e) => register(e!, userInformations)}
            styled="btnGood"
          />
        </div>
      </form>
      <div className="text-tertiary-dark  text-xl font-content text-center gap-3">
        <p>Déjà un compte ?</p>
        <Link to="/login" className="underline">
          Se connecter
        </Link>
      </div>
    </>
  );
};

export default InscriptionForm;
