import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Notification extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.receivedNotifications)
  receivers: User[];

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.sentNotifications)
  sender: User;

  @Field(() => Number)
  @Column({ type: "int" })
  type: number;

  @Field(() => Boolean, { nullable: true })
  @Column({ type: "boolean", nullable: true })
  status?: boolean;

  @Field()
  @Column({ default: false })
  isUnread: boolean;

  @Field()
  @Column({
    type: "timestamptz",
    default: new Date(new Date().getTime() + 2 * 3600 * 1000),
  })
  send_date: Date;
}
