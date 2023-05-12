import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinTable,
  BaseEntity,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import Challenge from "./Challenge";

@ObjectType()
@Entity()
export default class Comment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  sender_id: string;

  @Field()
  @Column({ type: "timestamp", default: () => "now()" })
  creationDate: Date;

  @Field(() => [Challenge])
  @OneToMany(() => Challenge, (challenge) => challenge.id)
  @JoinTable()
  company_id: number;

  @Field()
  @Column()
  content: string;
}
