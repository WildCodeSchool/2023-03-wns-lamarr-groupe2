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
import { InvitationStatus } from "./InvitationStatus";

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
  company_id: number;

  @Field(() => [InvitationStatus])
  @OneToMany(() => InvitationStatus, (invitationStatus) => invitationStatus.id)
  @JoinTable()
  invitaion_status_id: number;
}
