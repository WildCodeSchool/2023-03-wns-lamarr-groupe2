import {
  BaseEntity,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { EcoAction, User } from ".";

@ObjectType()
@Entity()
export default class Proof extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.id)
  @JoinTable()
  user_id: number;

  @Field(() => [EcoAction])
  @ManyToOne(() => EcoAction, (ecoAction) => ecoAction.id)
  @JoinTable()
  eco_action_id: number;
}
