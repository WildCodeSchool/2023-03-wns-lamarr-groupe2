import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  JoinTable,
  PrimaryGeneratedColumn,
  ManyToMany,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Notification extends BaseEntity {
  @Field({ nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.receivedNotifications)
  receivers: User[];

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.sentNotifications)
  sender: User;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column({
    type: "timestamptz",
    default: new Date(new Date().getTime() + 2 * 3600 * 1000),
  })
  send_date: Date;
}
