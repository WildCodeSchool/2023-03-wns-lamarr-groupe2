import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  BaseEntity,
  ManyToMany,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { User } from "./User";
import { InvitationChallenge } from "./InvitationChallenge";
import { EcoAction } from "./EcoAction";
import { Tag } from "./Tag";

export enum ChallengeStatus {
  COMING = "COMING",
  PROGRESS = "PROGRESS",
  FINISHED = "FINISHED",
}

@ObjectType()
@Entity()
export class Challenge extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  title: string;

  @Field()
  @Column({ type: "text", nullable: false })
  description: string;

  // create a field for the start and end date
  @Field()
  @Column({
    type: "timestamp",
    nullable: false,
    transformer: {
      from(value: string): Date {
        return new Date(value);
      },
      to(value: string): string {
        return value;
      },
    },
  })
  startAt: Date;

  @Field()
  @Column({
    type: "timestamp",
    nullable: false,
    transformer: {
      from(value: string): Date {
        return new Date(value);
      },
      to(value: string): string {
        return value;
      },
    },
  })
  endAt: Date;

  @Field(() => [EcoAction])
  @ManyToMany(() => EcoAction, (ecoAction) => ecoAction.id)
  @JoinTable({
    name: "challenge_eco_action_list", // table name for the junction table of this relation
    joinColumn: {
      name: "challengeId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "ecoActionId",
      referencedColumnName: "id",
    },
  })
  ecoActions: EcoAction[];

  @Field()
  @Column({ nullable: false, default: ChallengeStatus.COMING })
  challenge_status: ChallengeStatus;

  @Field(() => [Tag], { nullable: true })
  @ManyToMany(() => Tag, (tag) => tag.id)
  @JoinTable({
    name: "challenge_tags_list", // table name for the junction table of this relation
    joinColumn: {
      name: "challengeId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "tagId",
      referencedColumnName: "id",
    },
  })
  tags: Tag[];

  // create a field to join the user table with the challenge table (one user can create many challenges but one challenge can only be created by one user)
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.createdChallenges) // Jeter à l'oeil à la doc de TypeORM
  creator: User;

  // challenge_member
  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (userId) => userId.id)
  @JoinTable({
    name: "challenge_contender", // table name for the junction table of this relation
    joinColumn: {
      name: "challengeId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "userId",
      referencedColumnName: "id",
    },
  })
  contenders: User[];

  @Field(() => [InvitationChallenge])
  @OneToMany(() => InvitationChallenge, (invitation) => invitation.id)
  invitation: InvitationChallenge[];
}
