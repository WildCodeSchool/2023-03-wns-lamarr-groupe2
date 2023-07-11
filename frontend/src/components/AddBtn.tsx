import { FC, useState } from "react"
import addIconLight from "../assets/icons/add/add-light.svg"
import addIcon from "../assets/icons/add/add-dark.svg"

type AddBtnProps = {
    onClick: () => void
}

const AddBtn: FC<AddBtnProps> = ({ onClick }) => {
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEvent = () => {
        setIsHovered(prev => !prev)
    }

    return (
        <div onMouseEnter={handleMouseEvent} onMouseLeave={handleMouseEvent} onClick={onClick} className='cursor-pointer'>
            <img alt='add icon' src={isHovered ? addIconLight : addIcon} className="btnAttention customBorder  rounded-rounder" />
        </div>
    )
}

export default AddBtn