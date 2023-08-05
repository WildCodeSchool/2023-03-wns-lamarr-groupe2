import { FC, PropsWithChildren, useState } from "react";
import FriendsBoard from "./FriendsBoard";
import BtnCustom from "../../components/BtnCustom";
import ProfilePicture from "../../components/ProfilePicture";
import useUserContext from "../../features/contexts/UserContext";
import challenges from "../../assets/icons/challenges.svg"

const ScoresPage: FC<PropsWithChildren> = () => {
  // TO-DO : Find number of finished challenges 
  const { user } = useUserContext()
  const calculateInscriptionTime = (inscriptionDate: string) => {
    const currentDate = new Date();
    const inscDate = new Date(inscriptionDate);
    const timeDifference = currentDate.getTime() - inscDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    if (daysDifference < 1) return `inscrit depuis moins d'un jour`
    return `inscrit depuis ${daysDifference} j.`;
  };



  return <div className="w-full flex flex-col gap-24 px-1 md:px-6 lg:px-6 py-6">
    <section className="flex  items-center">
      {/* Profile */}
      <div className="hidden md:flex gap-5 md:flex-1">
        <ProfilePicture size="xlargePic" />
        <div className="">
          <h2>{user.firstname} {user.lastname}</h2>
          <p className="italic text-small-p md:text-main-p">{calculateInscriptionTime(user?.creationDate ?? '')}</p>
          <div className="flex gap-10 mt-8">
            <div className="flex gap-4 items-center bg-primary-attention px-5  rounded-small"><div className="font-bold  text-secondary-title">{user.score ?? 0}</div>
              <div className="text-small-p">pts</div>
            </div>
            <div className="flex justify-center items-center gap-2">
              <img src={challenges} alt='Challenges' />
              <p className="font-bold text-secondary-title">0</p>
            </div>
          </div>
        </div>

      </div>
      {/* Add Friend */}
      <div className="flex-1  flex justify-center">
        <BtnCustom addMode text='Ajouter des amis' styled="btnAttention" onClick={() => console.warn('Add')} />
      </div>
    </section>
    <section className="overflow-y-scroll">
      <FriendsBoard />
    </section>
  </div>;

}

export default ScoresPage;
