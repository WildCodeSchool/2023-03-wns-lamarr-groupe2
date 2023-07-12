import { FC, PropsWithChildren } from "react";
import { Challenge } from "./Challenge";
import AddBtn from "../../../components/AddBtn";

const MyChallenges: FC<PropsWithChildren> = () => {
  const challenges: Challenge[] = [
    {
      id: 1,
      name: "Arrêtons de niquer nos mers",
      actions: [{
        id: 1,
        name: "Arrêtons de niquer nos mers",
        description: "Arrêtons de niquer nos mers",
        points: 10,
        need_proof: false
      }, {
        id: 2,
        name: "string",
        description: "string",
        points: 5,
        need_proof: false
      }],
      startAt: '2018-07-22T15:00:0',
      endAt: '2018-07-22T19:00:0',
      challenge_status_id: 0,
      creator: 1
    }
    ,
    {
      id: 2,
      name: "Feu follets dans nos forêts",
      actions: [{
        id: 1,
        name: "string",
        description: "string",
        points: 10,
        need_proof: false
      }, {
        id: 2,
        name: "string",
        description: "string",
        points: 5,
        need_proof: false
      }, {
        id: 3,
        name: "string",
        description: "string",
        points: 15,
        need_proof: true
      }],
      startAt: '2018-09-22T15:00:0',
      endAt: '2018-09-23T15:00:0',
      challenge_status_id: 0,
      creator: 1
    },
    {
      id: 3,
      name: "Moins de desserts pour le désert !",
      actions: [{
        id: 1,
        name: "string",
        description: "string",
        points: 2,
        need_proof: false
      }, {
        id: 2,
        name: "string",
        description: "string",
        points: 5,
        need_proof: false
      },
      {
        id: 3,
        name: "string",
        description: "string",
        points: 20,
        need_proof: false
      },
      {
        id: 4,
        name: "string",
        description: "string",
        points: 12,
        need_proof: false
      }],
      startAt: '2018-09-22T15:00:0',
      endAt: '2018-09-22T15:30:0',
      challenge_status_id: 1,
      creator: 2
    }];

  return (
    <div className="h-full flex flex-col">
      <h3 className="flex gap-4 mb-4">MES CHALLENGES : <AddBtn onClick={() => console.log('TO-DO : Add the add logic')} /></h3>
      <div className="h-full flex flex-col justify-around gap-4">
        {challenges ? challenges?.map((challenge, index) => <Challenge key={index} challenge={challenge} />) : 'Aucun challenge'}
      </div>
    </div>
  );
};

export default MyChallenges;
