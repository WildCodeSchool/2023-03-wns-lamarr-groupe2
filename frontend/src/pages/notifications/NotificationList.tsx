import Notification from "./Notification"
import { notificationData } from "./notificationData"

const NotificationList = () => {

    return (
        <div className="">{notificationData.map((notification) => <Notification id={notification.id} type={notification.type} sender={notification.sender} isNew={notification.isNew} status={notification.status} />)}</div>
    )
}

export default NotificationList