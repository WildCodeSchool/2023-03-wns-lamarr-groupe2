import { FC, PropsWithChildren, useState } from 'react'
import leftArrow from "../assets/icons/return/left-arrow-dark.svg"
import leftArrowLight from "../assets/icons/return/left-arrow-light.svg"

const NavBtn: FC<PropsWithChildren> = () => {
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEvent = () => {
        setIsHovered(prev => !prev)
    }
    // const navigate = useNavigate()

    return (
        <div onMouseEnter={handleMouseEvent} onMouseLeave={handleMouseEvent} /* onClick={() => navigate(-1)}  */>
            <img src={isHovered ? leftArrowLight : leftArrow} className='w-6 h-6' />
        </div>
    )
}

export default NavBtn