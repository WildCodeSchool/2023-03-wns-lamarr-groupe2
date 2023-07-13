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
import { useToaster } from "../../components/Toaster/useToaster";



const BACKEND_URL = process.env.REACT_APP_BACKEND_URL ?? ''


const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useLocalStorage("user", {} as TUser);
    const [token, setToken] = useLocalStorage("token", "");
    // TO-DO : Delete isUser when we will recieve user from backend
    const [isUser, setIsUser] = useState(false)
    const { notifyRegister, notifyErrorRegister, notifyErrorConnexion } = useToaster()

    // Login
    const login = useCallback(async (e: React.FormEvent, loginInformations: LoginInformations) => {
        e.preventDefault();

        try {
            const signInQuery = {
                query: `query (
                    $password: String!,
                    $email: String!
                ) { 
                signIn(
                    password: $password,
                    email: $email
                    )}` ,
                variables: {
                    email: loginInformations.email,
                    password: loginInformations.password
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
            console.log("Profile Response : TO-DO // Set User ", getProfileResponse.data.data.getProfile)
            setIsUser(getProfileResponse.data.data.getProfile)
            navigate('/')

        } catch (error) {
            notifyErrorConnexion()
            console.error(error);
        }
    }, [setToken, setIsUser, notifyErrorConnexion, navigate]);

    // Disconnect
    const disconnect = useCallback(() => {
        setUser({});
        setIsUser(prev => !prev)
        navigate("/");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }, [navigate, setUser]);

    // Register
    const register = async (
        e: React.FormEvent,
        registerInformations: RegisterInformations
    ) => {
        e.preventDefault();
        try {
            const signUpQuery = {
                query: `
              mutation SignUp(
                $password: String!,
                $email: String!,
                $username: String!,
                $lastname: String!,
                $firstname: String!
              ) {
                signUp(
                  password: $password,
                  email: $email,
                  username: $username,
                  lastname: $lastname,
                  firstname: $firstname
                )
              }
            `,
                variables: {
                    password: registerInformations.password,
                    email: registerInformations.email,
                    username: registerInformations.username,
                    lastname: registerInformations.lastname,
                    firstname: registerInformations.firstname,
                },
            };

            const signUpResponse = await axios.post(BACKEND_URL, signUpQuery);
            const responseData = signUpResponse.data;

            if (responseData.errors) {
                notifyErrorRegister()
                // TO-DO  : Custom error message
            } else {
                notifyRegister();
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }
        } catch (error: any) {
            console.error(error);
            notifyErrorRegister()
        }
    };
    // TO-DO : isValidToken is needed to check if the token is valid, if not => back to login screen


    // TO-DO : It will be needed to check the AdminStatus or Company  to prevent a localhost


    return (
        <UserContext.Provider
            value={{ token, user, login, disconnect, isUser, register }}
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
