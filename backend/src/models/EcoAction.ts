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
import { ChallengeEcoActionsList } from "./ChallengeActionsList";

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

  @Field(() => [ChallengeEcoActionsList])
  @OneToMany(
    () => ChallengeEcoActionsList,
    (challengeEcoActionsList) => challengeEcoActionsList.ecoActionId,
    { eager: true }
  )
  challengeEcoActionsList: ChallengeEcoActionsList[];
}
