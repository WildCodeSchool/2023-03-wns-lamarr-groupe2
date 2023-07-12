import {
    FC,
    PropsWithChildren,
    createContext,
    useCallback,
    useContext,
    useState,
} from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { equals } from "remeda";
import axios from 'axios';
import { UserContextType, TUser, LoginInformations, RegisterInformations } from "./types";


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL ?? ''


const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useLocalStorage("user", {} as TUser);
    const [token, setToken] = useLocalStorage("token", "");
    // TO-DO : Delete isUser when we will recieve user from backend
    const [isUser, setIsUser] = useState(false)

    // Login
    const login = useCallback(async (e: React.FormEvent, loginInformations: LoginInformations) => {
        e.preventDefault();

        try {
            // Sign in to obtain the token
            const signInQuery = {
                "query": "query ($password: String!, $email: String!) { signIn(password: $password, email: $email) }",
                "variables": {
                    "email": `${loginInformations.email}`,
                    "password": `${loginInformations.password}`
                }
            }
            const signInResponse = await axios.post(BACKEND_URL, signInQuery);
            const { data } = signInResponse.data;
            const token = data.signIn;

            setToken(token);

            const getProfileQuery = {
                query: `query GetProfile {getProfile }`
            };

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const getProfileResponse = await axios.post(BACKEND_URL, getProfileQuery, config);
            console.log("Profile Response : ", getProfileResponse.data.data.getProfile)
            setIsUser(getProfileResponse.data.data.getProfile)


        } catch (error) {
            console.error(error);
        }
    }, [setToken, setIsUser, isUser]);


    // Disconnect
    const disconnect = useCallback(() => {
        setUser({});
        setIsUser(prev => !prev)
        navigate("/");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }, [user, navigate, setUser, isUser]);

    // Register
    const register = (
        e: React.FormEvent,
        registerInformations: RegisterInformations
    ) => {
        e.preventDefault();

    };

    // TO-DO : isValidToken is needed to check if the token is valid, if not => back to login screen


    // TO-DO : It will be needed to check the AdminStatus or Company  to prevent a localhost


    return (
        <UserContext.Provider
            value={{ token, user, login, disconnect, isUser }}
        >
            {children}
        </UserContext.Provider>
    );
};

const useUserContext = () => {
    const context = useContext(UserContext);
    if (equals(context, {})) {
        throw new Error("useMyContext must be used within a MyContextProvider");
    }
    return context;
};

export default useUserContext;