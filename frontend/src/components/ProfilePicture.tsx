import { FC } from "react"
import hermesG from "../assets/hermes/green-hermes.svg"

type ProfilePictureProps = {
    size: 'smallPic' | 'mediumPic' | 'largePic' | 'xlargePic',
    url?: string,
    onClick?: () => void
}
const ProfilePicture: FC<ProfilePictureProps> = ({ size, url, onClick }) => {
    // A user has default profile pic when signing up (hermes head with a random color)
    // but if the user decides to remove it, the original hermes head will be displayed by default
    const customPic: React.CSSProperties = {
        backgroundImage: `url(${url ? url : hermesG})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'

    }

    return (
        <div className={`${!url && 'bg-primary-good'} rounded-full ${size} `} style={customPic} onClick={onClick} />
    )
}

export default ProfilePicture