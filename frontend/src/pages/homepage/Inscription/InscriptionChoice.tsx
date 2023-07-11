import { Dispatch, FC, SetStateAction } from "react"
import BtnCustom from "../../../components/BtnCustom"

type InscriptionChoiceProps = {
    setIsChoiceDone: Dispatch<SetStateAction<boolean>>,
    setIsCompany: Dispatch<SetStateAction<boolean>>
}

const InscriptionChoice: FC<InscriptionChoiceProps> = ({ setIsChoiceDone, setIsCompany }) => {

    const handleChoice = (entity: string) => {
        setIsCompany(entity === 'company' ? true : false)
        setIsChoiceDone(true)
    }

    return (
        <>
            <h2 className="text-center font-titles font-bold text-2xl mb-7">S'INSCRIRE</h2>
            <h2 className="text-center font-titles  text-2xl mb-7">VOUS ÊTES :</h2>
            <div className=" gap-4 flex justify-center flex-col w-[273px]">
                <BtnCustom onClick={() => handleChoice('user')} styled="btnAttention" text="UN PARTICULIER" />
                <BtnCustom onClick={() => handleChoice('company')} styled="btnDanger" text="UNE ENTREPRISE" />
            </div>
        </>
    )
}

export default InscriptionChoice