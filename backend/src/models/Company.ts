import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Company extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.id)
  @JoinTable()
  ownner: User;
}
