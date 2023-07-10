import {
    FC,
    PropsWithChildren,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { equals, isEmpty } from "remeda";
import jwtDecode from "jwt-decode";
import axios from 'axios';


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL ?? ''



export type TUser = {
    id: number;
    firstname: string;
    lastname: string;
    username: string,
    email: string;
    password: string;
    admin: boolean;
    points?: number,
    siret?: number,
    company_id?: number,
    company_group_id?: number,
    creationDate?: string;
}

export type LoginInformations = {
    email: string;
    password: string;
};
export type RegisterInformations = {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;

};

export type RegisterCompanyInformations = RegisterInformations & { siret: number }


export type UserContextType = {
    user: TUser,
    token: string,
    login: (e: React.FormEvent, value: LoginInformations) => void
};

export interface ApiReponse<ResponseType, Key extends string> {
    data: { viewer: Record<Key, { hits: ResponseType[] }> };
}


const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useLocalStorage("user", {} as TUser);
    const [token, setToken] = useLocalStorage("token", "");

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
            console.log(getProfileResponse.data.data)
        } catch (error) {
            console.error(error);
        }
    }, [navigate, setToken, setUser]);


    // Disconnect
    const disconnect = useCallback(() => {
        setUser({});
        navigate("/");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }, [user]);

    // Register
    const register = (
        e: React.FormEvent,
        registerInformations: RegisterInformations
    ) => {
        e.preventDefault();

    };

    const isValidToken = () => {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            //@ts-ignore
            if (decodedToken?.exp < currentTime) {
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    }

    useEffect(() => {
        const checkAdminStatus = async () => {
        };
        if (!isEmpty(user) && user.admin) {
            checkAdminStatus();
        }
    }, [user.admin, user.id, token]);


    return (
        <UserContext.Provider
            value={{ token, user, login }}
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
