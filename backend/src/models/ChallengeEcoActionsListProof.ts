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
@Entity({ name: "user_challenge_eco_action_list" })
export class ChallengeEcoActionsListProof extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [User])
  @ManyToOne(() => User, (user) => user.challengeEcoActionsListProof)
  user: User;

  @Field(() => [Challenge])
  @ManyToOne(
    () => Challenge,
    (challenge) => challenge.challengeEcoActionsListProof
  )
  challenge: Challenge;

  @Field(() => [EcoAction])
  @ManyToOne(
    () => EcoAction,
    (ecoAction) => ecoAction.challengeEcoActionsListProof
  )
  ecoAction: EcoAction;

  @Field()
  @Column({ default: false })
  ecoActionIsSelected: boolean;
}
