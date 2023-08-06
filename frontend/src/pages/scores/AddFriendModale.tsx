import { Dispatch, FC, SetStateAction } from "react"
import close from '../../assets/icons/close.svg'
import qrCode from "../../assets/qrCode.svg"
import linkCode from "../../assets/icons/Link.svg"
import UsersList from "./UsersList"

type ModaleProps = {
    setIsOpenModale: Dispatch<SetStateAction<boolean>>;
}
const AddFriendModale: FC<ModaleProps> = ({ setIsOpenModale }) => {
    return (
        <>
            <div
                className="relative z-10"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
            >
                <div className="fixed inset-0  bg-secondary-dark bg-opacity-75 transition-opacity" />

                <div className="fixed inset-0 z-10 overflow-y-auto ">
                    <div className="flex min-h-full  items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg border-[1px] border-main-white bg-main-dark text-main-white text-left shadow-xl transition-all sm:my-8 w-full md:w-[80%] lg:w-[60%]">
                            <div className="bg-main-bg   pt-5 pb-4  sm:pb-4">
                                <div className="flex  items-center  justify-center">
                                    <div
                                        onClick={() => setIsOpenModale((prev) => !prev)}
                                        className="bg-light mx-3 md:mx-0 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-main-white"
                                    >
                                        <img
                                            src={close}
                                            alt="close modale"
                                            className="cursor-pointer"
                                        />
                                    </div>
                                    <div className=" w-full mt-3  mr-12 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    </div>
                                </div>
                                <div className="mt-2 md:flex w-full">

                                    {/* List Users */}
                                    <div className="flex-1  px-4">
                                        <UsersList />
                                    </div>
                                    <div className="md:hidden flex justify-center items-center w-full">
                                        <div className="border-b w-full" />
                                        <div className="px-4 text-center font-bold ">OU</div>
                                        <div className="border-b  w-full" />
                                    </div>
                                    {/* Link*/}
                                    <div className="flex-1  px-4  flex md:flex-col gap-24 justify-around py-4 md:justify-center items-center md:border-l md:mb-12">
                                        {/* TO-DO : Make a Link*/}
                                        <img src={qrCode} alt="QR Code" className="h-24 w-24" />
                                        <img src={linkCode} alt="QR Code" className="h-24 w-24" />
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddFriendModale