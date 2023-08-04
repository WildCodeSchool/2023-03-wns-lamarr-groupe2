import {
    FC,
    PropsWithChildren,
    createContext,
    useCallback,
    useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { equals } from "remeda";
import axios from 'axios';
import { UserContextType, TUser, LoginInformations, RegisterInformations, UpdatedUser } from "./types";
import { useToaster } from "../hooks/useToaster";


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL ?? ''


const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useLocalStorage("user", {} as TUser);
    const [token, setToken] = useLocalStorage("token", "");
    const { notifyRegister, notifyErrorRegister, notifyErrorConnexion, notifyErrorUpdate , notifyUpdate} = useToaster()
    // Login
    const login = useCallback(async (e: React.FormEvent, loginInformations: LoginInformations) => {
        e.preventDefault();

        try {
            const signInQuery = {
                query: `query ($password: String!, $email: String!) {
                    signIn(password: $password, email: $email)
                  }` ,
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
                query: `query GetProfile {
                  getProfile {
                    id
                    firstname
                    lastname
                    username
                    admin
                    points
                    email
                    picture
                  }
                }`
            };

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const getProfileResponse = await axios.post(BACKEND_URL, getProfileQuery, config);
            setUser(getProfileResponse.data.data.getProfile)
            navigate('/')
        } catch (error) {
            notifyErrorConnexion()
            console.error(error);
        }
    }, [setToken, notifyErrorConnexion, navigate, setUser]);

    // Disconnect
    const disconnect = useCallback(() => {
        setUser({});
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
                mutation SignUp($password: String!, $email: String!, $username: String!, $lastname: String!, $firstname: String!) {
                  signUp(password: $password, email: $email, username: $username, lastname: $lastname, firstname: $firstname) {
                    firstname
                    email
                    lastname
                    password
                    username
                  }
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

    // Update User 
    const updateUser = async (e: React.FormEvent, userInformationsUpdate: UpdatedUser ) => {
        e.preventDefault();
        try {
          const updateUserQuery = {
            query: `
            mutation UpdateUser($username: String, $email: String) {
                updateUser(username: $username, email: $email) {
                  username
                  email
                }
              }
            `,
            variables: {
              username: userInformationsUpdate.username,
              email: userInformationsUpdate.email,
            },
          };

          const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
      
          const updateUserResponse = await axios.post(BACKEND_URL, updateUserQuery, config);
          const responseData = updateUserResponse.data;
      
          if (responseData.errors) {
            notifyErrorUpdate();
          } else {

            const getProfileQuery = {
                query: `query  {
                    getProfile {
                      email
                      firstname
                      lastname
                      admin
                      id
                      username
                    }
                  }`
            };
            const getProfileResponse = await axios.post(BACKEND_URL, getProfileQuery, config);
            setUser(getProfileResponse.data.data.getProfile)
            notifyUpdate();
          }
        } catch (error: any) {
          console.error(error);
         notifyErrorUpdate();
        }
      };

    // Delete UserAccount
    const deleteUserAccount = useCallback(() => {
  try {
      const deleteUserQuery = {
        query: `mutation Mutation {
          deleteUser
        }`
    };
  
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
  
    const postDeleteUser =  axios.post(BACKEND_URL, deleteUserQuery, config);
    console.warn(postDeleteUser)
    setUser({});
    navigate("/");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  } catch (error) {
    console.error(error);
}
    },[setUser, token, navigate]) 

   
    // TO-DO : isValidToken is needed to check if the token is valid, if not => back to login screen


    // TO-DO : It will be needed to check the AdminStatus or Company  to prevent a localhost


    return (
        <UserContext.Provider
            value={{ token, user, login, disconnect, register, updateUser, deleteUserAccount }}
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

