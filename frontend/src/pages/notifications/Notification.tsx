import { FC } from "react";
import { TUser } from "../../features/contexts/utils/types";
import BtnCustom from "../../components/BtnCustom";
import NavBtn from "../../components/NavBtn";
import useNotificationContext from "../../features/contexts/NotificationContext";

type NotificationChallenge = {
  title: string;
  id: number;
};
export type TNotification = {
  id: number;
  sender: Pick<TUser, "firstname" | "id">;
  receivers?: Pick<TUser, "firstname" | "id">;
  send_date?: Date;
  type: number;
  isUnread: boolean;
  status?: boolean;
  challenge?: NotificationChallenge;
};

const Notification: FC<TNotification> = ({
  id,
  sender,
  type,
  isUnread,
  status,
}) => {
  const { updateNotificationIsRead, updateFriendInvitation } =
    useNotificationContext();

  const typeLabel =
    type === 1 ? "Commentaire" : type === 2 ? "Invitation Ami" : "Challenge";

  const isActionnable = type === 2 || type === 3;

  const messageFromType = () => {
    if (type === 1)
      return `${sender.firstname} a commenté le challenge Planter un arbre`; // will need to get the challenge id and title
    if (type === 2) return `${sender.firstname} t'a ajouté à sa liste d'amis`;
    if (type === 3) return `Tu as reçu une invitation au challenge`;
  };

  const handleNewNotification = () => {
    updateNotificationIsRead(id);
  };

  const handleNotificationStatus = (isAccepted: boolean) => {
    const updateFriendProps = {
      isAccepted,
      type,
      senderId: sender?.id,
      notificationId: id,
    };
    updateFriendInvitation(updateFriendProps);
  };

  return (
    <div
      onClick={handleNewNotification}
      className={`${
        isUnread && "bg-primary-attention"
      } px-3 flex flex-col md:flex-row gap-3 py-2 md:py-0 justify-between md:h-20 border-b-1 items-center`}
    >
      <div className="hidden lg:block md:w-2/12 font-bold">{typeLabel}</div>
      <div className="md:w-6/12 text-left lg:text-left w-full">
        {messageFromType()}
      </div>
      <div className="md:w-4/12 flex justify-end w-full">
        {(isActionnable && status) === null ? (
          <div className="flex gap-3">
            <BtnCustom
              onClick={() => handleNotificationStatus(true)}
              styled="btnGood"
              text="accepter"
            />
            <BtnCustom
              onClick={() => handleNotificationStatus(false)}
              styled="btnDanger"
              text="refuser"
            />
          </div>
        ) : type === 1 ? null : (
          <div
            className={`uppercase ${
              status
                ? "md:btnGood text-primary-good font-bold"
                : "md:btnDanger text-primary-danger font-bold"
            } md:text-white flex items-end md:border justify-center w-36 gap-2  md:rounded-customBtn border-black drop-shadow-none`}
          >
            {status ? "ACCEPTÉ" : "REFUSÉE"}
          </div>
        )}
      </div>
      <div className=" ml-3 flex justify-end">
        {" "}
        {type !== 2 && <NavBtn type="specific" link={`/challenges`} />}{" "}
      </div>
    </div>
  );
};

export default Notification;
