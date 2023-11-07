import {
  BaseEntity,
  Column,
  ManyToMany,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Challenge } from "./Challenge";
import { ChallengeEcoActionList } from "./ChallengeEcoActionList";

@ObjectType()
@Entity({ name: "eco_action" })
export class EcoAction extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  label: string;

  @Field()
  @Column()
  points: number;

  @Field()
  @Column()
  need_proof: boolean;

  @Field()
  @Column()
  difficulty: number;

  // challenge_eco_action_list
  @Field(() => [Challenge])
  @ManyToMany(() => Challenge, (challengeId) => challengeId.id)
  authors: Promise<Challenge[]>;

  @Field(() => [ChallengeEcoActionList])
  @OneToMany(
    () => ChallengeEcoActionList,
    (challengeEcoActionList) => challengeEcoActionList.ecoActionId,
    { eager: true }
  )
  challengeEcoActionList: ChallengeEcoActionList[];
}
