import { useMemo, useState } from "react";
import InputCustom from "../../components/InputCustom";
import useUserContext from "../../features/contexts/UserContext";
import { filter, isEmpty, pipe } from "remeda";
import ProfilePicture from "../../components/ProfilePicture";
import RadioBtn from "../../components/RadioBtn";
import BtnCustom from "../../components/BtnCustom";
import useFriendContext from "../../features/contexts/FriendContext";

export type UserGlobal = {
  username: string;
  id: number;
  picture: string;
  isSelected?: boolean;
};

const UsersList = () => {
  const { users } = useUserContext();
  const { addFriend, friends } = useFriendContext();
  const [selectedUserIds, setSelectedUserIds] = useState<
    number | undefined /* [] */
  >(/* [] */);
  const [searchUser, setSearchUser] = useState<string>("");
  const handleToggleSelection = (user: UserGlobal) => {
    setSelectedUserIds((prevId) => (prevId === user.id ? undefined : user?.id));
  };

  const handleAddFriend = (friendId: number) => {
    if (selectedUserIds === undefined) {
      return;
    }
    addFriend(selectedUserIds);
  };
  /* To add multiple users :  
     const handleToggleSelection = (user: UserGlobal) => {
         setSelectedUserIds((prevSelectedUserIds) => {
             const isSelected = prevSelectedUserIds.includes(user.id);
 
             if (isSelected) {
                 return prevSelectedUserIds.filter((id) => id !== user.id);
             } else {
                 return [...prevSelectedUserIds, user.id];
             }
         });
     }; */

  const handleSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUser(e.target.value);
  };
  const tokens: string[] = useMemo(() => searchUser.split(" "), [searchUser]);

  const inclusiveText = (text: string): string =>
    text
      ?.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f+.]/g, "");

  const usersWithoutFriends = useMemo(() => {
    return pipe(
      users,
      filter((user) => !friends.some((friend) => friend.id === user.id))
    );
  }, [users, friends]);

  const filteredUsers = useMemo(() => {
    return pipe(
      usersWithoutFriends,
      filter((user) =>
        tokens.every((token) =>
          inclusiveText(user.username).includes(inclusiveText(token))
        )
      )
    );
  }, [tokens, usersWithoutFriends]);

  return (
    <>
      <div className="mb-3">
        <InputCustom
          mode="search"
          type="text"
          name=""
          value={searchUser}
          onChange={handleSearchUser}
        />
      </div>
      <div className="py-10 h-60 overflow-y-auto">
        {isEmpty(filteredUsers) ? (
          <p>Aucun utilisateur trouvé</p>
        ) : (
          filteredUsers?.map((user, index) => (
            <div
              key={index}
              className="border-b flex justify-between"
              onClick={() => handleToggleSelection(user)}
            >
              <div className="flex gap-2">
                <ProfilePicture url={user.picture} size="smallPic" />
                <p>{user.username}</p>
              </div>
              <RadioBtn isChoose={selectedUserIds === user?.id} />
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center h-20 items-center mb-6">
        {selectedUserIds && (
          <BtnCustom
            text="AJOUTER"
            styled="btnGood"
            onClick={() => handleAddFriend(selectedUserIds)}
          />
        )}
      </div>{" "}
    </>
  );
};

export default UsersList;
