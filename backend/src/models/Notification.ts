import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  JoinTable,
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

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.id)
  @JoinTable()
  recipient: User;

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.id)
  @JoinTable()
  sender: User[];

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
