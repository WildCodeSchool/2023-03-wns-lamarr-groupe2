import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ChallengeContextType,
  ChallengeInformations,
  TChallenge,
  TEcoActionsSelectionStatus,
} from "./utils/types";
import useUserContext from "./UserContext";
import axios from "axios";
import {
  mutationCreateChallenge,
  queryChallenge,
  queryChallenges,
  queryTags,
  queryTasks,
  queryEcoActionSelectionStatus,
  mutationEcoActionSelectionStatus,
  queryMyChallenges,
  mutationMyChallengeProgress,
} from "./utils/queries";
import { isEmpty } from "remeda";
import { useToaster } from "../hooks/useToaster";
import { OptionType } from "../../pages/creation-challenge/DropDownSelectors";
import { TTags } from "../../pages/creation-challenge/Tags";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL ?? "";

const ChallengeContext = createContext<ChallengeContextType>(
  {} as ChallengeContextType
);

export const ChallengeContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const { token, user } = useUserContext();
  const [challenges, setChallenges] = useState<TChallenge[]>([]);
  const [myChallenges, setMyChallenges] = useState<TChallenge[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState<TChallenge>();
  const [tasks, setTasks] = useState<OptionType[]>([]);
  const [tags, setTags] = useState<TTags[]>([]);
  const [ecoActionSelectionStatus, setEcoActionSelectionStatus] = useState<
    TEcoActionsSelectionStatus[]
  >([]);
  const { notifyCreate } = useToaster();
  const config = useMemo(
    () => ({
      headers: { Authorization: `Bearer ${token}` },
    }),
    [token]
  );

  const getChallenges = useCallback(async () => {
    try {
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
  }, [config]);

  const getMyChallenges = useCallback(async () => {
    try {
      const response = await axios.post(
        BACKEND_URL,
        { query: queryMyChallenges },
        config
      );
      const challengesData = response.data.data.getMyChallenges;
      setMyChallenges(challengesData);
    } catch (error) {
      setMyChallenges([]);
    }
  }, [config]);

  const updateMyChallengeProgress = useCallback(
    async (challengeId: number, progress: number) => {
      try {
        const options = {
          query: mutationMyChallengeProgress,
          variables: {
            challengeId: challengeId,
            progress: progress,
          },
        };
        await axios.post(BACKEND_URL, options, config);

        getMyChallenges();
      } catch (error) {
        console.error("Error Updating challenge:", error);
      }
    },
    [config, getMyChallenges]
  );

  const getChallenge = useCallback(
    async (challengeId: number) => {
      try {
        const response = await axios.post(
          BACKEND_URL,
          {
            query: queryChallenge,
            variables: { challengeId },
          },
          config
        );

        const challengeData = response.data.data.getChallengeById;

        setCurrentChallenge(challengeData);
      } catch (error) {
        console.warn(error);
      }
    },
    [config]
  );

  const getTasks = async () => {
    try {
      const response = await axios.post(
        BACKEND_URL,
        { query: queryTasks },
        config
      );
      const tasksData = response.data.data.getAllEcoActions;
      setTasks(tasksData);
    } catch (error) {
      setTasks([]);
    }
  };

  const getTags = async () => {
    try {
      const response = await axios.post(
        BACKEND_URL,
        { query: queryTags },
        config
      );
      const tagsData = response.data.data.getAllTags;
      setTags(tagsData);
    } catch (error) {
      setTags([]);
    }
  };

  const getEcoActionSelectionStatus = useCallback(
    async (challengeId: number) => {
      try {
        const response = await axios.post(
          BACKEND_URL,
          {
            query: queryEcoActionSelectionStatus,
            variables: { challengeId },
          },
          config
        );
        const EcoActionSelectionStatusData =
          response.data.data.getEcoActionSelectionStatus;

        setEcoActionSelectionStatus(EcoActionSelectionStatusData);
      } catch (error) {
        setEcoActionSelectionStatus([]);
      }
    },
    [config]
  );

  const createAChallenge = useCallback(
    async (challengeInformations: ChallengeInformations) => {
      try {
        const createChallenge = {
          query: mutationCreateChallenge,
          variables: challengeInformations,
        };
        const response = await axios.post(BACKEND_URL, createChallenge, config);
        console.warn(response);
        notifyCreate();
        getChallenges();
        getMyChallenges();
      } catch (error) {
        console.error("Error creating challenge", error);
      }
    },
    [config, getChallenges, getMyChallenges, notifyCreate]
  );

  // Update ecoAction selection status
  const updateEcoActionSelectionStatus = useCallback(
    async (ecoActionId: number, challengeId: number, isSelected: boolean) => {
      try {
        const updateEcoActionSelectionStatus = {
          query: mutationEcoActionSelectionStatus,
          variables: {
            ecoActionId: ecoActionId,
            challengeId: challengeId,
            isSelected: isSelected,
          },
        };
        await axios.post(BACKEND_URL, updateEcoActionSelectionStatus, config);

        getEcoActionSelectionStatus(challengeId);
      } catch (error) {
        console.error("Error Updating ecoActionSelectionStatus:", error);
      }
    },
    [config, getEcoActionSelectionStatus]
  );

  useEffect(() => {
    setTasks([]);
    setTags([]);
    setChallenges([]);
    setMyChallenges([]);
    /* react-hooks/exhaustive-deps bug ? he wants to make infinite loop */
    /* eslint-disable-next-line */
  }, [user]);

  useEffect(() => {
    if (isEmpty(user)) {
      return;
    }
    getChallenges();
    getTasks();
    getTags();
    getMyChallenges();
    /* react-hooks/exhaustive-deps bug ? he wants to make infinite loop */
    /* eslint-disable-next-line */
  }, [user, token]);

  return (
    <ChallengeContext.Provider
      value={{
        challenges,
        currentChallenge,
        getChallenge,
        createAChallenge,
        tags,
        tasks,
        ecoActionSelectionStatus,
        getEcoActionSelectionStatus,
        updateEcoActionSelectionStatus,
        myChallenges,
        updateMyChallengeProgress,
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
