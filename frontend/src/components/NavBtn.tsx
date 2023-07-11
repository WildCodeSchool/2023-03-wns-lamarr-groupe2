import { FC, useState } from 'react'
import leftArrow from "../assets/icons/navArrow/left-arrow-dark.svg"
import leftArrowLight from "../assets/icons/navArrow/left-arrow-light.svg"
import rightArrow from "../assets/icons/navArrow/right-arrow-dark.svg"
import rightArrowLight from "../assets/icons/navArrow/right-arrow-light.svg"
import { useNavigate } from 'react-router-dom'

type NavBtnProps = {
    type: 'return' | 'specific'
    link?: string
}

const NavBtn: FC<NavBtnProps> = ({ type, link }) => {
    const [isHovered, setIsHovered] = useState(false)
    const arrowType = link ? rightArrow : leftArrow
    const arrowLight = link ? rightArrowLight : leftArrowLight

    const handleMouseEvent = () => {
        setIsHovered(prev => !prev)
    }
    const navigate = useNavigate()

    const road = () => {
        if (type === 'return') {
            navigate(-1)
        } else {
            navigate(link ?? '')
        }
    }

    return (
        <div onMouseEnter={handleMouseEvent} onMouseLeave={handleMouseEvent} className={`btnAttention customBorder rounded-full cursor-pointer h-9 w-10 ${type === 'return' && 'm-2'}`} onClick={road}>
            <img alt='navigation icon' src={isHovered ? arrowLight : arrowType} />
        </div>
    )
}

export default NavBtn