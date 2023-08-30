// User

import { UserGlobal } from "../../../pages/scores/UsersList";

export type TUser = {
  score: number;
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  admin: boolean;
  points: number;
  siret?: number;
  company_id?: number;
  company_group_id?: number;
  creationDate?: string;
  picture: string;
};

export type LoginInformations = {
  email: string;
  password: string;
};

export type UpdatedUser = {
  email: string;
  username: string;
};

export type RegisterInformations = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
};

export type RegisterCompanyInformations = RegisterInformations & {
  siret: number;
};

export type UserContextType = {
  user: TUser;
  token: string;
  login: (e: React.FormEvent, value: LoginInformations) => void;
  disconnect: () => void;
  register: (e: React.FormEvent, value: RegisterInformations) => void;
  updateUser: (e: React.FormEvent, value: UpdatedUser) => void;
  deleteUserAccount: () => void;
  updatePicture: (pictureChoice: string) => void;
  users: UserGlobal[];
};

// Friends
export type Friend = Pick<
  TUser,
  "id" | "username" | "firstname" | "lastname" | "picture" | "points" | "email"
>;

export type AddFriendProp = {
  friendId: number;
  isFromNotification?: boolean;
};
export type FriendContextType = {
  friends: Friend[];
  addFriend: (value: AddFriendProp) => void;
  removeFriend: (friendId: number) => void;
};

export type TNotification = {
  id: number;
  send_date: Date;
  receivers: Pick<TUser, "id" | "lastname">;
  sender: Pick<TUser, "id" | "firstname">;
  type: 1 | 2 | 3;
  isUnread: boolean;
  status?: boolean;
};

export type UpdateFriendProps = {
  notificationId: number;
  type: number;
  isAccepted: boolean;
  senderId: number;
};
export type NotificationContextType = {
  notifications: TNotification[];
  updateNotificationIsRead: (notificationId: number) => void;
  updateFriendInvitation: (updateFriendProps: UpdateFriendProps) => void;
  sendFriendInvitation: (friendsIds: number[]) => void;
  waitingFriendList: Record<"id", number>[];
};
//Api Response
export interface ApiReponse<ResponseType, Key extends string> {
  data: { viewer: Record<Key, { hits: ResponseType[] }> };
}
