import { SetStateAction, useMemo, useState, useEffect } from 'react';
import useNotificationContext from '../features/contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';

const HeaderBarNotification = () => {
    const { notifications } = useNotificationContext();

    const isOneNotificationUnread = useMemo(() => {
        return notifications?.some((notification) => notification?.isUnread) || false;
    }, [notifications]);

    const navigate = useNavigate()
    const [isHovered, setIsHovered] = useState<SetStateAction<void> | boolean>(isOneNotificationUnread);

    useEffect(() => {
        setIsHovered(isOneNotificationUnread);
    }, [isOneNotificationUnread]);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`${isHovered ? 'h-44' : 'h-5'
                } ease-in duration-300 w-16 bg-primary-attention border-b border-x drop-shadow-notification rounded-b-[50px] absolute right-40 top-20`}
        >
            <div
                className={`${isHovered ? 'overflow-visible opacity-100' : 'overflow-hidden'
                    } cursor-pointer w-100 rotate-90 pl-7 font-bold transition-opacity duration-500 ease-out opacity-0 h-5`}
                onClick={() => navigate('/notifications')}>
                NOTIFICATIONS
            </div>
        </div>
    );
};

export default HeaderBarNotification;
