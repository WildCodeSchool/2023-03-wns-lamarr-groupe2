import { TChallenge } from "./Challenge";

export const challenges: TChallenge[] = [
  {
    id: 1,
    name: "Arrêtons de niquer nos mers et défendons nos grands pères mêmes s'ils sont vieux, dégoutants et vraiment tout moisi ",
    actions: [
      {
        id: 1,
        name: "Arrêtons de niquer nos mers et défendons nos grands pères",
        description: "Arrêtons de niquer nos mers",
        points: 10,
        need_proof: false,
      },
      {
        id: 2,
        name: "string",
        description: "string",
        points: 5,
        need_proof: false,
      },
    ],
    startAt: "2018-07-22T15:00:0",
    endAt: "2018-07-22T19:00:0",
    challenge_status_id: 0,
    creator: 1,
  },
  {
    id: 2,
    name: "Feu follets dans nos forêts",
    actions: [
      {
        id: 1,
        name: "string",
        description: "string",
        points: 10,
        need_proof: false,
      },
      {
        id: 2,
        name: "string",
        description: "string",
        points: 5,
        need_proof: false,
      },
      {
        id: 3,
        name: "string",
        description: "string",
        points: 15,
        need_proof: true,
      },
    ],
    startAt: "2018-09-22T15:00:0",
    endAt: "2018-09-23T15:00:0",
    challenge_status_id: 0,
    creator: 1,
  },
  {
    id: 3,
    name: "Moins de desserts pour le désert !",
    actions: [
      {
        id: 1,
        name: "string",
        description: "string",
        points: 2,
        need_proof: false,
      },
      {
        id: 2,
        name: "string",
        description: "string",
        points: 5,
        need_proof: false,
      },
      {
        id: 3,
        name: "string",
        description: "string",
        points: 20,
        need_proof: false,
      },
      {
        id: 4,
        name: "string",
        description: "string",
        points: 12,
        need_proof: false,
      },
    ],
    startAt: "2018-09-22T15:00:0",
    endAt: "2018-09-22T15:30:0",
    challenge_status_id: 1,
    creator: 2,
  },
];
