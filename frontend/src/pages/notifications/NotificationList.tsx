import { isEmpty } from "remeda"
import useNotificationContext from "../../features/contexts/NotificationContext"
import Notification from "./Notification"


const NotificationList = () => {
    const { notifications } = useNotificationContext()

    return (
        <div className="">{isEmpty(notifications) ? <p> Aucune notification </p> : notifications.map((notification) => <Notification key={notification.id} id={notification.id} type={notification.type} sender={notification.sender} isUnread={notification.isUnread} status={notification.status} />)}</div>
    )
}

export default NotificationList