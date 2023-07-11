import { FC, PropsWithChildren, useState } from "react";
import InputCustom from "../../../components/InputCustom";
import { UserInformations } from "../Inscription/InscriptionPage";
import BtnCustom from "../../../components/BtnCustom";
import { Link } from "react-router-dom";

const ConnexionPage: FC<PropsWithChildren> = () => {

    // TO-DO : Import UserContext login function
    const [userInformations, setUserInformations] = useState<Partial<UserInformations>>({
        email: '',
        password: ''
    });

    const handleInputChange = (fieldName: string) => (event: { target: { value: string }; }) => {
        const { value } = event.target;
        setUserInformations((prevUserInformations) => ({
            ...prevUserInformations,
            [fieldName]: value
        }));
    };

    const { email, password } = userInformations;

    return (
        <div className="relative lg:w-5/12 w-full h-screen items-center flex justify-center">
            <div className="max-w-[276px]  w-full flex flex-col">
                <h2 className="text-center font-titles font-bold text-2xl mb-7">S'IDENTIFIER</h2>
                <form>
                    <InputCustom
                        label="Email"
                        type="email"
                        name='email'
                        value={email ?? ''}
                        onChange={handleInputChange('email')}
                    />
                    <InputCustom
                        label="Mot de passe"
                        type="password"
                        name='password'
                        value={password ?? ''}
                        onChange={handleInputChange('password')}
                    />
                    <div className=" my-9 flex justify-center">
                        <BtnCustom text="CONNEXION" onClick={() => console.log('connexion')} styled="btnGood" />
                    </div>
                </form>
                <div className="text-tertiary-dark  text-xl font-content text-center gap-3">
                    <p>Mot de passe oublié ?</p>
                    <Link to='/register' className="underline">S'inscrire</Link>
                </div>

            </div>
            <p className="absolute bottom-8 text-tertiary-dark text-sm">©2023, Echoes of Future. Tous droits réservés</p>
        </div>
    )
}

export default ConnexionPage