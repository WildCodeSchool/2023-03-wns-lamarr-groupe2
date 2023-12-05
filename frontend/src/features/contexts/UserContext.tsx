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
import axios from "axios";
import {
  UserContextType,
  TUser,
  LoginInformations,
  RegisterInformations,
  UpdatedUser,
  PasswordUpdateInputs,
} from "./utils/types";
import { useToaster } from "../hooks/useToaster";
import {
  querySignIn,
  queryProfile,
  updateQuery,
  deleteQuery,
  updatePictureQuery,
  queryUsers,
  updatePasswordQuery,
} from "./utils/queries";
import { handleInputChange } from "react-select/dist/declarations/src/utils";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL ?? "";

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [user, setUser] = useLocalStorage("user", {} as TUser);
  const [token, setToken] = useLocalStorage("token", "");
  const [users, setUsers] = useState<TUser[]>([]);
  const {
    notifyRegister,
    notifyErrorRegister,
    notifyErrorConnexion,
    notifyErrorUpdate,
    notifyUpdate,
    notifyPasswordChanged,
  } = useToaster();
  // Login
  const login = useCallback(
    async (e: React.FormEvent, loginInformations: LoginInformations) => {
      e.preventDefault();

      try {
        const signInQuery = {
          query: querySignIn,
          variables: {
            email: loginInformations.email,
            password: loginInformations.password,
          },
        };
        const signInResponse = await axios.post(BACKEND_URL, signInQuery);
        const { data } = signInResponse.data;
        const token = data.signIn;

        setToken(token);

        const getProfileQuery = {
          query: queryProfile,
        };

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const getProfileResponse = await axios.post(
          BACKEND_URL,
          getProfileQuery,
          config
        );
        setUser(getProfileResponse.data.data.getProfile);
        navigate("/");
      } catch (error) {
        notifyErrorConnexion();
        console.error(error);
      }
    },
    [setToken, notifyErrorConnexion, navigate, setUser]
  );

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
        notifyErrorRegister();
        // TO-DO  : Custom error message
      } else {
        notifyRegister();
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error: any) {
      console.error(error);
      notifyErrorRegister();
    }
  };

  // Update User
  const updateUser = async (
    e: React.FormEvent,
    userInformationsUpdate: UpdatedUser
  ) => {
    e.preventDefault();
    try {
      const updateUserQuery = {
        query: updateQuery,
        variables: {
          username: userInformationsUpdate.username,
          email: userInformationsUpdate.email,
        },
      };

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const updateUserResponse = await axios.post(
        BACKEND_URL,
        updateUserQuery,
        config
      );
      const responseData = updateUserResponse.data;

      if (responseData.errors) {
        notifyErrorUpdate();
      } else {
        const getProfileQuery = {
          query: queryProfile,
        };
        const getProfileResponse = await axios.post(
          BACKEND_URL,
          getProfileQuery,
          config
        );
        const updatedUser = getProfileResponse.data.data.getProfile;
        setUser(updatedUser);
        console.log(`Username was updated: ${updatedUser.username}`);
        notifyUpdate();
      }
    } catch (error: any) {
      console.error(error);
      notifyErrorUpdate();
    }
  };

  const updatePassword = async (
    e: any,
    passwordUpdateInputs: PasswordUpdateInputs,
    reset: () => void
  ) => {
    setErrorMsg(null);
    console.log("updatePassword function called");
    e.preventDefault();

    try {
      const updatePassword = {
        query: updatePasswordQuery,

        variables: {
          oldPassword: passwordUpdateInputs.oldPassword,
          newPassword: passwordUpdateInputs.newPassword,
          confirmPassword: passwordUpdateInputs.confirmPassword,
        },
      };

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.post(BACKEND_URL, updatePassword, config);
      const responseData = response.data;
      console.log(responseData);
      if (responseData.errors) {
        setErrorMsg(
          responseData.errors
            .map((error: { message: string }) => error.message)
            .join(",")
        );
      } else {
        const getProfileQuery = {
          query: queryProfile,
        };

        const getProfileResponse = await axios.post(
          BACKEND_URL,
          getProfileQuery,
          config
        );
        setUser(getProfileResponse.data.data.getProfile);
        notifyPasswordChanged();
        reset();
      }
    } catch (error: any) {
      console.error("error when updating the password", errorMsg);
    }
  };

  // UpdatePicture
  const updatePicture = async (pictureChoice: string) => {
    try {
      const updateUserQuery = {
        query: updatePictureQuery,
        variables: {
          picture: pictureChoice,
        },
      };

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const updateUserResponse = await axios.post(
        BACKEND_URL,
        updateUserQuery,
        config
      );
      const responseData = updateUserResponse.data;

      if (responseData.errors) {
        notifyErrorUpdate();
      } else {
        const getProfileQuery = {
          query: queryProfile,
        };
        const getProfileResponse = await axios.post(
          BACKEND_URL,
          getProfileQuery,
          config
        );
        setUser(getProfileResponse.data.data.getProfile);
      }
    } catch (error: any) {
      notifyErrorUpdate();
    }
  };

  // Delete UserAccount
  const deleteUserAccount = useCallback(() => {
    try {
      const deleteUserQuery = {
        query: deleteQuery,
      };

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const postDeleteUser = axios.post(BACKEND_URL, deleteUserQuery, config);
      console.warn(postDeleteUser);
      setUser({});
      navigate("/");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } catch (error) {
      console.error(error);
    }
  }, [setUser, token, navigate]);

  // Get all Users
  const getUsers = useCallback(async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.post(
        BACKEND_URL,
        { query: queryUsers },
        config
      );
      const usersData = response.data.data.getUsers;
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  }, [token]);

  useEffect(() => {
    if (isEmpty(user)) {
      return;
    }
    getUsers();
  }, [getUsers, user, token]);
  // TO-DO : isValidToken is needed to check if the token is valid, if not => back to login screen

  // TO-DO : It will be needed to check the AdminStatus or Company  to prevent a localhost

  return (
    <UserContext.Provider
      value={{
        token,
        user,
        login,
        disconnect,
        register,
        updateUser,
        deleteUserAccount,
        updatePicture,
        users,
        updatePassword,
        errorMsg,
      }}
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
