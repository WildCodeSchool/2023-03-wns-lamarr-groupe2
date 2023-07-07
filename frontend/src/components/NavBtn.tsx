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
        <div onMouseEnter={handleMouseEvent} onMouseLeave={handleMouseEvent} className='cursor-pointer' /* onClick={() => navigate(-1)}  */>
            <img alt='navigation icon' src={isHovered ? leftArrowLight : leftArrow} className='btnAttention customBorder rounded-full' />
        </div>
    )
}

export default NavBtn