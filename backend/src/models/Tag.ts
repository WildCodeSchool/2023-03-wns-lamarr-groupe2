import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Challenge } from "./Challenge";

@ObjectType()
@Entity({ name: "tag" })
export class Tag extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  label: string;

  @Field(() => [Challenge])
  @ManyToMany(() => Challenge, (challengeId) => challengeId.id)
  authors: Promise<Challenge[]>;
}
