import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { ChallengeStatus } from "./index";

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
  @Column({ type: "timestamp" })
  startAt: Date;

  @Field()
  @Column({ type: "timestamp" })
  endAt: Date;

  @Field()
  @Column()
  creator: number;

  @Field(() => [ChallengeStatus])
  @ManyToOne(() => ChallengeStatus, (challengeStatus) => challengeStatus.id)
  @JoinTable()
  challenge_status_id: number;
}
