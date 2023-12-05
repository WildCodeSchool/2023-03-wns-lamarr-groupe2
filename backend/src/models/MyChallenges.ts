import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Challenge } from "./Challenge";
import { User } from "./User";

@ObjectType()
@Entity({ name: "user_challenge" })
export class MyChallenges extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.myChallenges)
  user: User;

  @Field(() => Challenge)
  @ManyToOne(() => Challenge, (challenge) => challenge.myChallenges)
  challenge: Challenge;

  @Field()
  @Column({ default: 0 })
  progress: number;
}
