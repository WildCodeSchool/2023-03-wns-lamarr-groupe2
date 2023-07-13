import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import close from "../../../assets/icons/close.svg"
import TeamMembers from "./TeamMembers";
import InputCustom from "../../../components/InputCustom";

type ModaleProps = {
    setIsOpenModale: Dispatch<SetStateAction<boolean>>,
    companyName: string,
    companyId: number
};
const TeamMembersModale: FC<ModaleProps> = ({
    setIsOpenModale, companyName, companyId
}) => {
    // To-Do : Fetch company members by companyId
    const isCompanyOwner = false // Role and Company Id from User + Company id 
    const [searchValue, setSearchValue] = useState<string>('')
    const handleMember = (e: any) => {
        setSearchValue(e.target.value)
        // TO-DO : Search and Add Member Logic
        // TO-DO  : Add delete member logic
    }

    return (
        <div className="z-40">
            <div
                className="relative z-10"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
            >
                <div className="fixed inset-0  bg-secondary-dark  bg-opacity-75 transition-opacity" />

                <div className="  fixed inset-0 z-10 overflow-y-auto ">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-scroll rounded-lg border-[1px] border-main-white bg-main-bg text-main-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-primary z-50  min-h-[60vh] max-h-[60vh] h-max px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className=" sm:flex sm:items-start">
                                    <div onClick={() => setIsOpenModale(prev => !prev)} className="bg-light  mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-main-white sm:mx-0 sm:h-10 sm:w-10">
                                        <img src={close} alt='close modale' className="cursor-pointer" />
                                    </div>
                                    <div className=" w-full mt-3  mr-12 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3
                                            className=" text-secondary-title font-bold  text-center"
                                            id="modal-title"
                                        >
                                            {companyName}
                                        </h3>
                                        <div className="mt-2 ">
                                            {isCompanyOwner && <InputCustom mode="search" name='' type="text" value={searchValue} onChange={(e) => handleMember(e)} />}
                                            <TeamMembers />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-primary px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamMembersModale;