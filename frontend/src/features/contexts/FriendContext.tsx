import { FC, PropsWithChildren, createContext, useCallback, useContext, useEffect, useState } from "react";
import { FriendContextType, Friend, AddFriendData } from "./utils/types";
import useUserContext from "./UserContext";
import axios from "axios";
import { queryFriends } from "./utils/queries";
import { isEmpty } from "remeda";


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL ?? "";

const FriendContext = createContext<FriendContextType>({} as FriendContextType);

export const FriendContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const { user, token } = useUserContext()
    const [friends, setFriends] = useState<Friend[]>([]);

    const getFriends = useCallback(async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            const response = await axios.post(BACKEND_URL, { query: queryFriends }, config);
            const friendsData = response.data.data.getFriends;
            setFriends(friendsData);
        } catch (error) {
            console.error("Error fetching friends:", error);
        }
    }, []);

    useEffect(() => {
        if (isEmpty(user)) {
            return;
        }
        getFriends();

    }, []);


    const addFriend = useCallback((friendData: AddFriendData) => {

    }, []);

    // Remove a friend
    const removeFriend = useCallback((friendId: number) => {

        setFriends((prevFriends) => prevFriends.filter((friend) => friend.id !== friendId));
    }, []);

    return (
        <FriendContext.Provider value={{ friends, addFriend, removeFriend }}>
            {children}
        </FriendContext.Provider>
    );
};

const useFriendContext = () => {
    const context = useContext(FriendContext);
    if (!context) {
        throw new Error("useFriendContext must be used within a FriendContextProvider");
    }
    return context;
};

export default useFriendContext;
