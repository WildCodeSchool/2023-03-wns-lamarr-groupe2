import { FC, PropsWithChildren, useState } from "react";
import InputCustom from "../../../components/InputCustom";

export type UserInformations = {
    username: string;
    email: string;
    lastname: string;
    firstname: string;
    password: string;
}

const InscriptionPage: FC<PropsWithChildren> = () => {

    // TO-DO : Import UserContext register function
    // TO-DO : When submitting, give a random hermes picture : 
    /*  import hermesG from "../assets/hermes/green-hermes.svg"
        import hermesY from "../assets/hermes/yellow-hermes.svg"
        import hermesR from "../assets/hermes/red-hermes.svg" */

    const [userInformations, setUserInformations] = useState<UserInformations>({
        username: '',
        email: '',
        lastname: '',
        firstname: '',
        password: ''
    });

    const handleInputChange = (fieldName: string) => (event: { target: { value: string }; }) => {
        const { value } = event.target;
        setUserInformations((prevUserInformations) => ({
            ...prevUserInformations,
            [fieldName]: value
        }));
    };

    const { email, username, lastname, firstname, password } = userInformations;


    return (
        <form>
            <InputCustom
                type="email"
                label="Email"
                name='email'
                value={email}
                onChange={handleInputChange('email')}
            />
            <InputCustom
                type="text"
                label="Pseudo"
                name='username'
                value={username}
                onChange={handleInputChange('username')}
            />
            <InputCustom
                type="text"
                label="Nom"
                name='lastname'
                value={lastname}
                onChange={handleInputChange('lastname')}
            />
            <InputCustom
                type="text"
                label="Prénom"
                name='firstname'
                value={firstname}
                onChange={handleInputChange('firstname')}
            />
            <InputCustom
                type="password"
                label="Mot de passe"
                name='password'
                value={password}
                onChange={handleInputChange('password')}
            />
        </form>
    )
}

export default InscriptionPage