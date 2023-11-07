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
import { User } from "./User";

@ObjectType()
@Entity({ name: "challenge_eco_action_list" })
export class ChallengeEcoActionList extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [User])
  @ManyToOne(() => User, (user) => user.challengeEcoActionList)
  userId: User[];

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
