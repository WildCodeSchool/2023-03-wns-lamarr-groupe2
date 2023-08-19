import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ChallengeContextType,
  ChallengeInformations,
  TChallenge,
} from "./utils/types";
import useUserContext from "./UserContext";
import axios from "axios";
import { mutationCreateChallenge, queryChallenges } from "./utils/queries";
import { isEmpty } from "remeda";
import { useToaster } from "../hooks/useToaster";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL ?? "";

const ChallengeContext = createContext<ChallengeContextType>(
  {} as ChallengeContextType
);

export const ChallengeContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const { token, user } = useUserContext();
  const [challenges, setChallenges] = useState<TChallenge[]>([]);
  const { notifyCreate } = useToaster();
  const getChallenges = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.post(
        BACKEND_URL,
        { query: queryChallenges },
        config
      );
      const challengesData = response.data.data.getAllChallenges;
      setChallenges(challengesData);
    } catch (error) {
      setChallenges([]);
    }
  };

  const createAChallenge = async (
    challengeInformations: ChallengeInformations
  ) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const createChallenge = {
        query: mutationCreateChallenge,
        variables: challengeInformations,
      };
      const response = await axios.post(BACKEND_URL, createChallenge, config);
      console.warn(response);
      notifyCreate();
      getChallenges();
    } catch (error) {
      console.error("Error creating challenge", error);
    }
  };

  useEffect(() => {
    setChallenges([]);
    /* react-hooks/exhaustive-deps bug ? he wants to make infinite loop */
    /* eslint-disable-next-line */
  }, [user]);

  useEffect(() => {
    if (isEmpty(user)) {
      return;
    }
    getChallenges();
    /* react-hooks/exhaustive-deps bug ? he wants to make infinite loop */
    /* eslint-disable-next-line */
  }, [user, token]);

  return (
    <ChallengeContext.Provider
      value={{
        challenges,
        createAChallenge,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};

const useChallengeContext = () => {
  const context = useContext(ChallengeContext);
  if (!context) {
    throw new Error(
      "useChallengeContext must be used within a ChallengeContextProvider"
    );
  }
  return context;
};

export default useChallengeContext;
