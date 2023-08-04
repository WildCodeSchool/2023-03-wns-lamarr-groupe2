import { FC, useState } from "react"
import radioSelect from '../assets/icons/radioSelect.svg'
import radioUnSelect from '../assets/icons/radioUnselect.svg'

type RadioBtnProps = {
    isChoose : boolean
}

const RadioBtn: FC<RadioBtnProps> = ({ isChoose }) => {

    return (
        <div className='cursor-pointer'>
            <img alt='add icon' src={isChoose ? radioSelect : radioUnSelect} className="m-3" />
        </div>
    )
}

export default RadioBtn