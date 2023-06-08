import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinTable,
  BaseEntity,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Challenge } from "./Challenge";

enum InvitationStatus {
  ACCEPTED,
  PENDING,
  REFUSED,
}

@ObjectType()
@Entity({ name: "invitation_challenge" })
export class InvitationChallenge extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email_sender: string;

  @Field()
  @Column()
  email_recipient: string;

  @Field(() => [Challenge])
  @OneToMany(() => Challenge, (challenge) => challenge.id)
  @JoinTable()
  company_id: Challenge;

  @Field()
  @Column()
  invitaion_status_id: InvitationStatus;
}
