import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Company } from "./Company";
import { Challenge } from "./Challenge";
import { CompanyGroup } from "./CompanyGroup";
import { Notification } from "./Notification";
import { InvitationChallenge } from "./InvitationChallenge";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  lastname: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({ default: false })
  admin: boolean;

  @Field()
  @Column({ nullable: true, default: 0 })
  points: number;

  @Field()
  @Column({ nullable: false, default: "hermesG" })
  picture: string;

  @Field()
  @Column({
    type: "timestamptz",
    default: new Date(new Date().getTime() + 2 * 3600 * 1000),
  })
  creationDate: Date;

  @Field(() => Company)
  @OneToMany(() => Company, (company) => company.id)
  @JoinTable()
  company?: Company[];

  @Field(() => [CompanyGroup])
  @OneToMany(() => CompanyGroup, (companyGroup) => companyGroup.id)
  @JoinTable()
  company_group?: CompanyGroup[];

  // friend_list
  @ManyToMany(() => User, (friendId) => friendId.id)
  @JoinTable({
    name: "friend_list", // table name for the junction table of this relation
    joinColumn: {
      name: "userId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "friendId",
      referencedColumnName: "id",
    },
  })
  @Field(() => [User])
  friend: User[];

  // challenge_member
  @Field(() => [Challenge])
  @ManyToMany(() => Challenge, (challenge) => challenge.member)
  challenge: Challenge[];

  // creator
  @Field(() => Challenge)
  @OneToMany(() => Challenge, (challengeId) => challengeId.creator)
  createdChallenges: Challenge;

  @Field(() => [Notification])
  @ManyToMany(() => Notification, (notification) => notification.receivers, {
    cascade: true,
  })
  @JoinTable()
  receivedNotifications: Notification[];

  @Field(() => [Notification])
  @OneToMany(() => Notification, (notification) => notification.sender, {
    cascade: true,
  })
  @JoinTable()
  sentNotifications: Notification[];

  @Field(() => InvitationChallenge)
  @ManyToMany(() => InvitationChallenge, (invitation) => invitation.receivers, {
    cascade: true,
  })
  @JoinTable({
    name: "received_invitation", // table name for the junction table of this relation
    joinColumn: {
      name: "userId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "challenge_invitation",
      referencedColumnName: "id",
    },
  })
  receivedChallengeInvitation: InvitationChallenge[];
}
