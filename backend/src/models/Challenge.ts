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
import { Comment } from "./Comment";
import { ChallengeEcoActionsListProof } from "./ChallengeEcoActionsListProof";

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

  @Field()
  @Column({ nullable: false })
  isPublic: boolean;

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
  @OneToMany(() => InvitationChallenge, (invitation) => invitation.challenge, {
    cascade: true,
  })
  invitation: InvitationChallenge[];

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.challenge_id, {
    cascade: true,
  })
  comments: Comment[];

  @Field(() => String)
  get status(): string {
    const now = new Date();
    if (now > this.endAt) return "finished";
    if (now < this.startAt) return "incoming";
    return "ongoing";
  }

  @Field(() => [ChallengeEcoActionsListProof])
  @OneToMany(
    () => ChallengeEcoActionsListProof,
    (challengeEcoActionsListProof) => challengeEcoActionsListProof.challenge
  )
  challengeEcoActionsListProof: ChallengeEcoActionsListProof[];

  @Field()
  @Column({ default: 0 })
  progress: number;
}
