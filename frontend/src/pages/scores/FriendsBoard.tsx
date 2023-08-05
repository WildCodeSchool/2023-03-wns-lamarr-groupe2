import { useMemo, useState } from 'react';
import InputCustom from '../../components/InputCustom';
import BoardRow, { EmptyRow } from './BoardRow';
import { filter, isEmpty, pipe, prop, sortBy } from 'remeda';
import useFriendContext from '../../features/contexts/FriendContext';



const FriendsBoard = () => {
    const { friends } = useFriendContext()
    const [friendSearch, setFriendSearch] = useState<string>('')

    const handleFriendSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFriendSearch(e.target.value);
    };
    const tokens: string[] = useMemo(() => friendSearch.split(" "), [friendSearch]);

    const inclusiveText = (text: string): string =>
        text
            ?.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f+.]/g, "");

    const filteredFriendList = useMemo(() => {
        return pipe(
            friends,
            sortBy([prop('points'), 'desc']),
            filter((friend) => tokens.every((token) =>
                inclusiveText(friend.username).includes(inclusiveText(token))
                || inclusiveText(friend.lastname).includes(inclusiveText(token)) ||
                inclusiveText(friend.firstname).includes(inclusiveText(token))
            ))
        )
    }, [tokens, friends])


    const [currentPage, setCurrentPage] = useState(1);
    const friendsPerPage = 5;

    const indexOfLastFriend = currentPage * friendsPerPage;
    const indexOfFirsFriend = indexOfLastFriend - friendsPerPage;

    const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(friends.length / friendsPerPage); i += 1) {
        pageNumbers.push(i);
    }


    return (
        <div className=' w-full overflow-y-scroll'>
            <table className="table-fixed w-full  h-[529px]">
                <thead>
                    <tr className=' h-32'>
                        <th className='w-7/12' > <InputCustom mode='search' type="text" name='' value={friendSearch} onChange={handleFriendSearch} /> </th >
                        <th className='w-2/12 xl:w-3/12 font-thin text-[24px] hidden  md:table-cell'>CHALLENGES RÉALISÉS</th>
                        <th className='w-2/12 xl:w-2/12 font-thin text-[24px] md:text-left'>POINTS</th>
                        <th className='w-1/12'></th>
                    </tr >
                </thead >
                <tbody className=''>
                    {isEmpty(filteredFriendList) ? <EmptyRow /> : filteredFriendList.slice(indexOfFirsFriend, indexOfLastFriend).map((friend, index) => (
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
