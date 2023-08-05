import InputCustom from '../../components/InputCustom';
import BoardRow from './BoardRow';

const FriendsBoard = () => {
    return (
        <div className=' w-full overflow-y-scroll'>
            <table className="table-auto w-full">
                <thead>
                    <tr className=' h-32'>
                        < th className='' > <InputCustom mode='search' type="text" name='' value='' onChange={() => console.warn('text')} /> </th >
                        <th className='font-thin text-[24px] hidden  md:table-cell'>CHALLENGES RÉALISÉS</th>
                        <th className='font-thin text-[24px] md:text-left'>POINTS</th>
                        <th></th>
                    </tr >
                </thead >
                <tbody className=''>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].slice(0, 7).map((row, index) => (
                        <BoardRow key={index} index={index} />
                    ))}
                </tbody>
            </table >
        </div >
    );
};

export default FriendsBoard;
