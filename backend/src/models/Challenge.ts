import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { ChallengeStatus, User } from "./index";

@ObjectType()
@Entity()
export default class Challenge extends BaseEntity {
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

  @Field(() => [ChallengeStatus])
  @ManyToOne(() => ChallengeStatus, (challengeStatus) => challengeStatus.id)
  @JoinTable()
  challenge_status_id: number;

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.id)
  @JoinTable()
  creator: number;
}
