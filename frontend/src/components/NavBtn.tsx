import { FC, useState } from 'react'
import leftArrow from "../assets/icons/return/left-arrow-dark.svg"
import leftArrowLight from "../assets/icons/return/left-arrow-light.svg"
import { useNavigate } from 'react-router-dom'

type NavBtnProps = {
    type: 'return' | 'specific'
    link?: string
}

const NavBtn: FC<NavBtnProps> = ({ type, link }) => {
    const [isHovered, setIsHovered] = useState(false)

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
        <div onMouseEnter={handleMouseEvent} onMouseLeave={handleMouseEvent} className='btnAttention customBorder rounded-full cursor-pointer h-10 w-10' onClick={road}>
            <img alt='navigation icon' src={isHovered ? leftArrowLight : leftArrow} className={` ${link && 'rotate-180'}`} />
        </div>
    )
}

export default NavBtn