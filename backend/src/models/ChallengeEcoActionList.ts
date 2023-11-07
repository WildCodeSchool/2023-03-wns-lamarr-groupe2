import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Challenge } from "./Challenge";
import { EcoAction } from "./EcoAction";

@ObjectType()
@Entity({ name: "challenge_eco_action_list" })
export class ChallengeEcoActionList extends BaseEntity {
  @Field(() => [Challenge])
  @ManyToOne(() => Challenge, (challenge) => challenge.challengeEcoActionList)
  challengeId: Challenge[];

  @Field(() => [EcoAction])
  @ManyToOne(() => EcoAction, (ecoAction) => ecoAction.challengeEcoActionList)
  ecoActionId: EcoAction[];

  @Field()
  @Column({ default: false })
  ecoActionIsSelected: boolean;
}
