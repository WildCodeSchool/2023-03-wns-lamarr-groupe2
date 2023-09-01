import { ChildEntity, ManyToOne } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Challenge } from "./Challenge";
import { Notification } from "./Notification";

@ObjectType()
@ChildEntity()
export class InvitationChallenge extends Notification {
  @Field(() => Challenge)
  @ManyToOne(() => Challenge, (challenge) => challenge.id)
  challenge: Challenge;
}
