import {
  BaseEntity,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { EcoAction } from "./EcoAction";
import { User } from "./User";

@ObjectType()
@Entity()
export class Proof extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.id)
  @JoinTable()
  user_id: User[];

  @Field(() => EcoAction)
  @ManyToOne(() => EcoAction, (ecoAction) => ecoAction.id)
  @JoinTable()
  eco_action_id: EcoAction;
}
