import { useState } from "react"
import edit from "../../assets/icons/edit.svg"
import ProfilePicture from "../../components/ProfilePicture"
import useUserContext from "../../features/contexts/UserContext"
import BtnCustom from "../../components/BtnCustom"
import InputCustom from "../../components/InputCustom"
import { UserInformations } from "../homepage/Inscription/InscriptionForm"

const Profile = () => {
    const { user, updateUser } = useUserContext()
    const [isEdit, setIsEdit] = useState(false)

    const [userInformations, setUserInformations] = useState({ username: user?.username, email: user?.email/* , password: user?.password  */})

    const handleInputChange = (fieldName: string) => (event: { target: { value: string }; }) => {
        const { value } = event.target;
        setUserInformations((prevUserInformations: Pick<UserInformations, 'username' | 'email' /* | 'password' */>) => ({
            ...prevUserInformations,
            [fieldName]: value
        }));
    };

    const { email, username/* , password */ } = userInformations;

    const handleModifications = (e :React.FormEvent | undefined) => {
        const userInformationsUpdate = userInformations
        updateUser(e!, userInformationsUpdate)        
        setIsEdit(prev => !prev)

    }
    const formattedString = (string: string, size: number) => {
        // size : 14 and for md screen only
        if (string.length < size) {
            return string
        }

        if (string.length > size) {
            const tokens = string.split(/[ -]/)
            if (tokens.length <= 1) {
                return tokens[0].slice(0, size - 1) + '…'
            }
            if (tokens.length === 2) {
                const joinTokens = `${tokens[0]} ${tokens[1]}`
                if (joinTokens.length < size) {
                    return joinTokens
                } else {
                    return `${tokens[0]} ${tokens[1].slice(0, 1)}.`
                }
            }
            if (tokens.length > 2) {
                const joinTokens = `${tokens[0]} ${tokens[1]}  ${tokens[2].slice(0, 1)}. `
                return joinTokens
            }
        }

    }

    return (
        <section className="lg:flex-1 w-full lg:w-max lg:max-w-[457px]">
            {/* Mobile Header */}
            <div className="lg:hidden  flex w-full justify-center pr-5">
                <div className="w-fit pr-4">
                    <ProfilePicture size="largePic" />
                </div>

                <div className="flex flex-col  w-9/12 justify-center md:hidden">
                    <h2 className="w-full  "> {formattedString(user?.firstname, 14)}
                    </h2>
                    <h2 className="w-full "> {formattedString(user.lastname, 14)}
                    </h2>
                </div>

                <div className="hidden md:flex flex-col  w-9/12 justify-center">
                    <h2 className="w-full  "> {formattedString(user?.firstname, 14)}
                    </h2>
                    <h2 className="w-full  "> {formattedString(user.lastname, 14)}
                    </h2>
                </div>

                <img className="w-1/12 h-8 pb-2 cursor-pointer self-end " src={edit} alt='edit profile' onClick={() => setIsEdit(prev => !prev)} />
            </div>
            <div className="flex justify-center w-full lg:hidden">
                <div className="border-b-1 w-11/12 my-9 " />
            </div>
            {/* Desktop Header */}
            <div className="hidden lg:flex flex-col w-full justify-between">
                <div className="w-fit gap-9 flex pr-1 mb-14">
                    <h3 className="font-bold text-primary-good">PROFIL</h3>
                    <img className="w-6 self-end pb-2  cursor-pointer" src={edit} alt='edit profile' onClick={() => setIsEdit(prev => !prev)} />
                </div>
                <div>
                    <ProfilePicture size="xlargePic" />
                </div>
                <div className="flex flex-col  w-9/12 justify-center mt-12">
                    <h2 className="w-full "> {user?.firstname}  {formattedString(user.lastname, 14)}
                    </h2> 
                </div>
            </div>

            {/* Informations */}
            <div className="px-3 lg:p-0">
                <form className="flex flex-col gap-4 text-button mb-5 lg:mb-12">
                <div className={`${isEdit ? '' : 'flex'} items-center gap-3`}>
                        <p  className={`${isEdit ? 'hidden' : 'block'}`}>pseudo: </p>
                        {isEdit ? <InputCustom label="" name="username" type='text' value={username} onChange={handleInputChange('username')} /> : user.username}
                    </div>
                    <div className={`${isEdit ? '' : 'flex'} items-center gap-3`}>
                        <p className={`${isEdit ? 'hidden' : 'block'}`}>email: </p>
                        {isEdit ? <InputCustom label="" name="email" type='email' value={email} onChange={handleInputChange('email')} /> : user.email}
                    </div>
                  {/* TO-DO : Vérifier sécurité si PWD à modifier
                    <div className={`${isEdit ? '' : 'flex'} items-center gap-3`}>
                        <p  className={`${isEdit ? 'hidden' : 'block'}`}>mot de passe: </p>
                        {isEdit ? <InputCustom label="" name="password" type='password' value={password} onChange={handleInputChange('password')} /> : <span className="font-bold">*********</span>}
                    </div>
                */}
                </form>

                <div className="hidden lg:block ">
                    {isEdit ? <BtnCustom styled="btnGood" text='ENREGISTRER' onClick={handleModifications} /> : <BtnCustom styled="btnDanger" text="SUPPRIMER COMPTE" onClick={() => console.log('TO-DO : delete account')} />}
                    <div onClick={() => console.log('TO - DO : Supprimer le cache')} className=" hidden lg:block underline  font-normal text-small-p mt-6 ml-1">Paramètres avancés</div>
                </div>
            </div>
        </section >
    )
}

export default Profile