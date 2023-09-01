import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
@TableInheritance({ column: { type: "varchar", name: "notification_type" } })
export class Notification extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.receivedNotifications)
  receiver: User;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.sentNotifications)
  sender: User;

  // 1 : Commentaire, 2 : Invitation d'ami, 3 : Challenge
  @Field(() => Number)
  @Column({ type: "int" })
  type: number;

  @Field(() => Boolean, { nullable: true })
  @Column({ type: "boolean", nullable: true })
  status?: boolean;

  @Field()
  @Column({ default: true })
  isUnread: boolean;

  @Field()
  @Column({
    type: "timestamptz",
    default: new Date(new Date().getTime() + 2 * 3600 * 1000),
  })
  send_date: Date;
}
