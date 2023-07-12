
import leaderboardIcon from '../../../assets/icons/leaderboard.svg'
import Leaderboard from './Leaderboard';
import LeaderboardElement from './LeaderboardElement';
import { me } from './data';

const FriendsLeaderboard = () => {
  // get user from context (position => order from request ?)

  return <div className="h-full flex flex-col w-full">
    <div className="flex items-center px-5 pt-6 w-full justify-center lg:gap-6 mb-4">
      <h3 >CLASSEMENT</h3>
      <img src={leaderboardIcon} alt='leaderboard' />
    </div>
    <div className='w-full justify-center'>
      <div className='border-b-1 mb-5'>
        <LeaderboardElement id={me.id} username={me.username} score={me.score} position={1} picture={me.picture} mode="header" /></div>
    </div>
    <Leaderboard />
  </div>;
};

export default FriendsLeaderboard;
