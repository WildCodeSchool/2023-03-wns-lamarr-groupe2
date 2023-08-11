import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { FriendContextType, Friend, AddFriendProp } from "./utils/types";
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

  const getFriends = async () => {
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
  };


  const addFriend =
    async (addFriendsProps: AddFriendProp) => {
      try {
        const addQuery = {
          query: addfriendQuery,
          variables: {
            input: {
              friendid: addFriendsProps.friendId,
            },
          },
        };
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.post(BACKEND_URL, addQuery, config);
        console.warn(response);
        !addFriendsProps.isFromNotification && notifyFriendAdd();
        getFriends();
      } catch (error) {
        console.error("Error fetching friends:", error);
        notifyErrorGlobal();
      }
    }

  useEffect(() => {
    setFriends([]);
  }, [user]);

  useEffect(() => {
    if (isEmpty(user)) {
      return;
    }
    getFriends()
  }, [user, token]);


  // Remove a friend
  const removeFriend =
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
    }

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
