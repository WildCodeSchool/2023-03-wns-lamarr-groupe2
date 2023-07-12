import React, { useState } from 'react'
import modale from "../../assets/modale-dashboard.svg"
import check from "../../assets/icons/high5Thin.svg"
import checkbold from "../../assets/icons/high5Bold.svg"

const DashboardPageModale = () => {
    const username = 'Hermès' // get username
    const [isPressed, setIsPressed] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const modaleStyle: React.CSSProperties = {
        backgroundImage: `url(${modale})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: "contain"
    }
    const handleMouseEvent = () => {
        setIsHovered(prev => !prev)
    }

    return isPressed ? <></> : <div className="absolute right-10 bottom-20  w-60 h-28" style={modaleStyle}>
        <div className=" flex w-full h-full justify-center  pb-10 items-center  gap-10"
            onMouseEnter={handleMouseEvent}
            onMouseLeave={handleMouseEvent}>
            <div className="pl-3 ">
                <p>Bonjour</p>
                {username}
            </div>
            <img alt='check icon' src={isHovered ? check : checkbold} onClick={() => setIsPressed(prev => !prev)} className='cursor-pointer' />

        </div>
    </div>

}

export default DashboardPageModale