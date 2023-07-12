import { useNavigate } from "react-router-dom"
import modale from "../assets/modaleProfile.svg"
import { Dispatch, FC, SetStateAction, useEffect } from "react"
import useUserContext from "../features/contexts/UserContext"

type HeaderBarModaleProps = {
    setShowModale: Dispatch<SetStateAction<boolean>>
}
export const HeaderBarModale: FC<HeaderBarModaleProps> = ({ setShowModale }) => {
    const { disconnect } = useUserContext()
    const isCompany = false // user.company
    const navigate = useNavigate()
    // TO-DO : disconnect by userContext

    const modaleStyle: React.CSSProperties = {
        backgroundImage: `url(${modale})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: "contain"
    }

    const handleClick = (value: 'settings' | 'disconnect') => {
        if (value === "settings") {
            navigate(isCompany ? '/company/settings' : 'settings')
        }
        if (value === 'disconnect') {
            console.log('test')
            disconnect()
        }
        setShowModale((prev => !prev))
    }

    return (
        <div onMouseLeave={() => setShowModale(false)} className="absolute right-10 top-20  w-60 h-28" style={modaleStyle}>
            <div className=" flex w-44 flex-col justify-center h-full">
                <div className="pl-3 font-bold ">
                    <div onClick={() => handleClick('settings')} className="pt-3   hover:text-element-bg">paramètres</div>
                    <div className="border-1 w-full" />
                    <div onClick={() => handleClick('disconnect')} className="uppercase hover:text-element-bg">déconnexion</div></div>
            </div>
        </div>
    )
}
