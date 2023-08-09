import React, {
    FC,
    PropsWithChildren,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { NotificationContextType, TNotification, UpdateFriendProps } from "./utils/types";
import useUserContext from "./UserContext";
import axios from "axios";
import { mutationIsRead, queryNotifications, sendNotifications } from "./utils/queries";
import { isEmpty } from "remeda";
import useFriendContext from "./FriendContext";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL ?? "";

// Context Creation
const NotificationContext = createContext<NotificationContextType>(
    {} as NotificationContextType
);

// Provider Component
export const NotificationContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const { token, user } = useUserContext()
    const { addFriend } = useFriendContext()
    const [notifications, setNotifications] = useState<TNotification[]>([]);

    // Get Notifications
    const getNotifications = useCallback(async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            const response = await axios.post(
                BACKEND_URL,
                { query: queryNotifications },
                config
            );
            const notificationsData = response.data.data.userNotifications;
            setNotifications(notificationsData);
        } catch (error) {
            setNotifications([])
            console.error("Error fetching notifications:", error);
        }
    }, [token, user]);

    // Update is Read
    const updateNotificationIsRead = useCallback(async (notificationId: number) => {
        try {
            const updateNotificationRead = {
                query: mutationIsRead,
                variables: {
                    input: {
                        id: notificationId,
                        status: null,
                        isUnread: false
                    }
                }
            };
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const response = await axios.post(BACKEND_URL, updateNotificationRead, config);
            console.warn(response)
            getNotifications()
        } catch (error) {
            console.error("Error Updating Notification:", error);
        }
    }, [token, getNotifications])

    useEffect(() => {
        if (isEmpty(user)) {
            return;
        }
        getNotifications();
    }, [getNotifications, user, token]);

    // Accept or Decline Friend Invitation
    const updateFriendInvitation = useCallback(async (updateFriendProps: UpdateFriendProps) => {
        try {
            if (updateFriendProps.type !== 2) {
                throw Error
            }
            const upateFriendInvitation = {
                query: mutationIsRead,
                variables: {
                    input: {
                        id: updateFriendProps.notificationId,
                        isUnread: false,
                        status: updateFriendProps.isAccepted
                    }
                }
            };
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const response = await axios.post(BACKEND_URL, upateFriendInvitation, config);
            console.warn(response)
            getNotifications()

            if (updateFriendProps.isAccepted) {
                const addFriendsProps = {
                    isFromNotification: true,
                    friendId: updateFriendProps.senderId
                }
                addFriend(addFriendsProps)
            }
        } catch (error) {
            console.error("Error Updating Notification:", error);
        }
    }, [token, getNotifications, user])

    // Send Friend Invitation
    const sendFriendInvitation = useCallback(async (friendsIds: number[]) => {
        try {
            const sendInvitations = {
                query: sendNotifications,
                variables: {
                    input: {
                        recipientUserIds: friendsIds,
                        type: 2,
                        status: null
                    }
                }
            }
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const response = await axios.post(BACKEND_URL, sendInvitations, config);
            console.warn(response)
        } catch (error) {
            console.error("Error sending invitations")
        }
    }, [])

    return (
        <NotificationContext.Provider value={{ notifications, updateNotificationIsRead, updateFriendInvitation, sendFriendInvitation }}>
            {children}
        </NotificationContext.Provider>
    );
};

// Custom Hook
const useNotificationContext = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error(
            "useNotificationContext must be used within a NotificationContextProvider"
        );
    }
    return context;
};

export default useNotificationContext;
