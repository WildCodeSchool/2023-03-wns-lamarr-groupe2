import { useState } from 'react';
import InputCustom from '../../components/InputCustom';
import BoardRow from './BoardRow';
import { friendListData } from './data';



const FriendsBoard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    /* Pagination */
    const friendsPerPage = 5;

    const indexOfLastFriend = currentPage * friendsPerPage;
    const indexOfFirsFriend = indexOfLastFriend - friendsPerPage;

    const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(friendListData.length / friendsPerPage); i += 1) {
        pageNumbers.push(i);
    }


    return (
        <div className=' w-full overflow-y-scroll'>
            <table className="table-auto w-full  h-[529px]">
                <thead>
                    <tr className=' h-32'>
                        < th className='' > <InputCustom mode='search' type="text" name='' value='' onChange={() => console.warn('text')} /> </th >
                        <th className='font-thin text-[24px] hidden  md:table-cell'>CHALLENGES RÉALISÉS</th>
                        <th className='font-thin text-[24px] md:text-left'>POINTS</th>
                        <th></th>
                    </tr >
                </thead >
                <tbody className=''>
                    {friendListData?.slice(indexOfFirsFriend, indexOfLastFriend).map((friend, index) => (
                        <BoardRow key={index} index={index + indexOfFirsFriend} friend={friend} />
                    ))}
                </tbody>
            </table >
            <div className=" static bottom-0 flex  justify-center gap-3 mt-3 mb-6">




                {pageNumbers.length > 1 && <div className="flex gap-12">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={currentPage === 1 ? ' text-tertiary-dark' : 'text-primary-good'}>
                        ⬅ PRÉCÉDENT
                    </button>

                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pageNumbers.length} className={` ${currentPage === pageNumbers.length ? ' text-tertiary-dark' : 'text-primary-good'}`}>
                        SUIVANT </button>
                </div>}


            </div>
        </div >
    );
};

export default FriendsBoard;
