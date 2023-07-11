import { FC, PropsWithChildren, useState } from "react";
import InputCustom from "../../../components/InputCustom";
import { UserInformations } from "../Inscription/InscriptionPage";

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
        <div>
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
        </div>
    )
}

export default ConnexionPage