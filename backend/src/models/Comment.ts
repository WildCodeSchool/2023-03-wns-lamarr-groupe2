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
import { User } from "./User";

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.id)
  @JoinTable()
  sender_id: number;

  @Field()
  @Column({
    type: "timestamptz",
    default: new Date(new Date().getTime() + 2 * 3600 * 1000),
  })
  creationDate: Date;

  @Field(() => [Challenge])
  @OneToMany(() => Challenge, (challenge) => challenge.id)
  @JoinTable()
  company_id: Challenge;

  @Field()
  @Column()
  content: string;
}
