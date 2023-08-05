import React from "react";
import FriendsBoard from "./FriendsBoard";
import BtnCustom from "../../components/BtnCustom";

function ScoresPage() {
  return <div>
    <section>
      {/* Profile */}
      <div>
        Mon Profil
      </div>
      {/* Add Friend */}
      <div>
        <BtnCustom addMode text='Ajouter des amis' styled="btnAttention" onClick={() => console.warn('Add')} />
      </div>
    </section>

    <FriendsBoard />
  </div>;

}

export default ScoresPage;
