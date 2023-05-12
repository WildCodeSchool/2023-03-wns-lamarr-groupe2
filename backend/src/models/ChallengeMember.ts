import { Entity, ManyToOne, JoinTable, BaseEntity } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { User, Challenge } from ".";

@ObjectType()
@Entity({ name: "challenge_member" })
export default class ChallengeMember extends BaseEntity {
  @Field(() => [User])
  @ManyToOne(() => User, (user) => user.id)
  @JoinTable()
  user_id: number;

  @Field(() => [Challenge])
  @ManyToOne(() => Challenge, (challenge) => challenge.id)
  @JoinTable()
  challenge_id: number;
}
