import { FC, PropsWithChildren, useState } from "react";
import InscriptionForm from "./InscriptionForm";
import InscriptionChoice from "./InscriptionChoice";



const InscriptionPage: FC<PropsWithChildren> = () => {
    const [isCompany, setIsCompany] = useState(false)
    const [isChoiceDone, setIsChoiceDone] = useState(false)

    return (
        <div className="relative lg:w-5/12 w-full h-screen items-center flex justify-center">
            <div className="max-w-[276px]  w-full flex flex-col">

                {!isChoiceDone && <InscriptionChoice setIsCompany={setIsCompany} setIsChoiceDone={setIsChoiceDone} />}
                {isChoiceDone && <InscriptionForm isCompany={isCompany} />}

                <p className="absolute bottom-8 text-tertiary-dark text-sm">©2023, Echoes of Future. Tous droits réservés</p>

            </div>
        </div>
    )
}

export default InscriptionPage