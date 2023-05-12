import { Entity, ManyToOne, JoinTable, BaseEntity } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Challenge } from ".";

@ObjectType()
@Entity({ name: "challenge_eco_action_list" })
export default class ChallengeEcoActionList extends BaseEntity {
  @Field(() => [Challenge])
  @ManyToOne(() => Challenge, (challenge) => challenge.id)
  @JoinTable()
  challenge_id: number;

  @Field(() => [Challenge])
  @ManyToOne(() => Challenge, (challenge) => challenge.id)
  @JoinTable()
  eco_action_id: number;
}
