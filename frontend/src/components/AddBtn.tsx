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
        <div onMouseEnter={handleMouseEvent} onMouseLeave={handleMouseEvent} onClick={onClick}>
            <img src={isHovered ? addIconLight : addIcon} className='w-6 h-6' />
        </div>
    )
}

export default AddBtn