import { FC, PropsWithChildren, useState } from "react";
import InputCustom from "../../../components/InputCustom";
import useUserContext, { LoginInformations } from "../../../features/contexts/UserContext";


const ConnexionPage: FC<PropsWithChildren> = () => {
    const { login } = useUserContext()
    // TO-DO : Import UserContext login function
    const [userInformations, setUserInformations] = useState<LoginInformations>({
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
        <form onSubmit={(e) => login(e, userInformations)}>
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
            <button type='submit' > click </button>
        </form>
    )
}

export default ConnexionPage