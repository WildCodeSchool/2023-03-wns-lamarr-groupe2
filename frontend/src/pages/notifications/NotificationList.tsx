import { isEmpty } from "remeda"
import useNotificationContext from "../../features/contexts/NotificationContext"
import Notification from "./Notification"
import { useState } from "react"


const NotificationList = () => {
    const { notifications } = useNotificationContext()
    const [isFiletered, setIsFiltered] = useState(false)

    const filtredNotifications = isFiletered ? notifications.filter((notification) => notification.isUnread) : notifications


    return (
        <div className="xxl:px-24">

            <div className="flex gap-3 items-center w-full justify-end mb-2">
                <button onClick={() => setIsFiltered(false)} className={`${isFiletered ? 'text-tertiary-dark' : 'text-primary-good'}`}>Tout</button>
                <button onClick={() => setIsFiltered(true)} className={`${isFiletered ? 'text-primary-good' : 'text-tertiary-dark'}`}>Non lu</button>
            </div>
            <div className="">{isEmpty(filtredNotifications) ? <p> Aucune notification </p> : filtredNotifications.slice(0, 10).map((notification) => <Notification key={notification.id} id={notification.id} type={notification.type} sender={notification.sender} isUnread={notification.isUnread} status={notification.status} />)}</div>
        </div>)
}

export default NotificationList