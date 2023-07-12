import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  BaseEntity,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { User } from "./User";
import { InvitationChallenge } from "./InvitationChallenge";

enum ChallengeStatus {
  COMING,
  PROGRESS,
  FINISHED,
}

enum Tags {
  ALIMENTATION,
  ACTIVITE,
}

@ObjectType()
@Entity()
export class Challenge extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ type: "text" })
  description: string;

  @Field()
  @Column({ type: "date" })
  startAt: Date;

  @Field()
  @Column({ type: "date" })
  endAt: Date;

  @Field()
  @Column()
  challenge_status_id: ChallengeStatus;

  @Field()
  @Column()
  tag: Tags;

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.id)
  @JoinTable()
  creator: User[];

  // challenge_member
  @ManyToMany(() => User, (userId) => userId.id)
  @JoinTable({
    name: "challenge_member", // table name for the junction table of this relation
    joinColumn: {
      name: "challengeId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "userId",
      referencedColumnName: "id",
    },
  })
  @Field(() => [User])
  member: Promise<User[]>;

  @Field(() => [InvitationChallenge])
  @OneToMany(() => InvitationChallenge, (invitation) => invitation.id)
  invitation: InvitationChallenge[];
}
