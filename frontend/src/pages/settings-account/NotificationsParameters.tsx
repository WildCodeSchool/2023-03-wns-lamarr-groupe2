import { FC } from "react"
import BtnCustom from "../../components/BtnCustom"
import Toggle from "../../components/Toggle"
import { SettingsPageParameters } from "./Profile"

const NotificationsParameters : FC<SettingsPageParameters> = ({user,isEdit, handleModifications, username, email, handleInputChange, setIsEdit}) => {
    return (
        <div className="flex-1">
            
                <div className="w-fit gap-9 flex pr-1">
                    <h3 className="font-bold text-primary-good uppercase"><span className="hidden lg:inline">Paramètres </span>Notifications</h3>
                </div>
                <p className="underline italic text-lg">Rétablir les paramètres par défaut</p>
               <ul className="flex flex-col gap-6 mt-7">
                <li className="flex gap-5">
                <Toggle  styled="toggle" onClick={() => console.log('toggle')}/> 
                <p>invitations aux challenges</p>
                </li>
                <li className="flex  gap-5">
                <Toggle  styled="toggle" onClick={() => console.log('toggle')}/> 
                <p>nouveau commentaire</p>
                </li>
                <li className="flex  gap-5">
                <Toggle  styled="toggle" onClick={() => console.log('toggle')}/>
                <p>invitation d'un(e) ami(e) accepté(e)</p>
                </li>
                </ul>
                <div className="flex justify-center mt-5 lg:hidden ">
                 <BtnCustom styled="btnDanger" text="SUPPRIMER COMPTE" onClick={() => console.log('TO-DO : delete account')} />
                    <div onClick={() => console.log('TO - DO : Supprimer le cache')} className=" hidden lg:block underline  font-normal text-small-p mt-6 ml-1">Paramètres avancés</div>
                </div>
        </div>
   
    )
}

export default NotificationsParameters