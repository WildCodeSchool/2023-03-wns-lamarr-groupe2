import {
  BaseEntity,
  Column,
  ManyToMany,
  Entity,
  JoinTable,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Challenge } from "./Challenge";

@ObjectType()
@Entity({ name: "eco_action" })
export class EcoAction extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: number;

  @Field()
  @Column({ type: "text" })
  description: string;

  @Field()
  @Column()
  points: number;

  @Field()
  @Column()
  need_proof: boolean;

  // challenge_eco_action_list
  @ManyToMany(() => Challenge, (challengeId) => challengeId.id, { lazy: true })
  @JoinTable({
    name: "challenge_eco_action_list", // table name for the junction table of this relation
    joinColumn: {
      name: "ecoActionId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "challengeId",
      referencedColumnName: "id",
    },
  })
  @Field(() => [Challenge])
  authors: Promise<Challenge[]>;
}
