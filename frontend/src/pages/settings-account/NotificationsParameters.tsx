import Toggle from "../../components/Toggle"

const NotificationsParameters = () => {
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
        </div>
   
    )
}

export default NotificationsParameters