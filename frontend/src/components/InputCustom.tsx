import { ChangeEvent, FC } from 'react'
import search from "../assets/icons/search.svg"


type InputCustomProps = {
    mode?: 'search',
    type: 'text' | 'email' | 'password',
    name: string,
    value: string,
    label?: string,
    placeholder?: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const searchStyle: React.CSSProperties = {
    backgroundImage: `url(${search})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left'
}

const InputCustom: FC<InputCustomProps> = ({ type, label, name, value, onChange, placeholder, mode }) => {

    return (
        <div className='flex flex-col'>
            <label title={label}>{label}</label>
            <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className='p-2 border-primary-dark border-2  rounded-medium bg-element-bg' style={mode && searchStyle} />
        </div>
    )
}

export default InputCustom