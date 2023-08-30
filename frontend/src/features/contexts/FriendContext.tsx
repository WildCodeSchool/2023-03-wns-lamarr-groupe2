import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { FriendContextType, Friend } from "./utils/types";
import useUserContext from "./UserContext";
import axios from "axios";
import { addfriendQuery, deleteFriend, queryFriends } from "./utils/queries";
import { isEmpty } from "remeda";
import { useToaster } from "../hooks/useToaster";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL ?? "";

const FriendContext = createContext<FriendContextType>({} as FriendContextType);

export const FriendContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { notifyFriendAdd, notifyErrorGlobal } = useToaster();
  const { user, token } = useUserContext();
  const [friends, setFriends] = useState<Friend[]>([]);
  const getFriends = useCallback(async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.post(
        BACKEND_URL,
        { query: queryFriends },
        config
      );
      const friendsData = response.data.data.getFriends;
      setFriends(friendsData);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  }, [token]);

  const addFriend = useCallback(
    async (friendId: number) => {
      try {
        const addQuery = {
          query: addfriendQuery,
          variables: {
            input: {
              friendid: friendId,
            },
          },
        };
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.post(BACKEND_URL, addQuery, config);
        console.warn(response);
        notifyFriendAdd();
        getFriends();
      } catch (error) {
        console.error("Error fetching friends:", error);
        notifyErrorGlobal();
      }
    },
    [token, getFriends, notifyErrorGlobal, notifyFriendAdd]
  );

  useEffect(() => {
    if (isEmpty(user)) {
      return;
    }
    getFriends();
  }, [getFriends, user, token, addFriend]);

  // Remove a friend
  const removeFriend = useCallback(
    async (friendId: number) => {
      try {
        const removeQuery = {
          query: deleteFriend,
          variables: {
            input: {
              friendid: friendId,
            },
          },
        };
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.post(BACKEND_URL, removeQuery, config);
        console.warn(response);
        setFriends((prevFriends) =>
          prevFriends.filter((friend) => friend.id !== friendId)
        );
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    },
    [token]
  );

  return (
    <FriendContext.Provider value={{ friends, addFriend, removeFriend }}>
      {children}
    </FriendContext.Provider>
  );
};

const useFriendContext = () => {
  const context = useContext(FriendContext);
  if (!context) {
    throw new Error(
      "useFriendContext must be used within a FriendContextProvider"
    );
  }
  return context;
};

export default useFriendContext;
