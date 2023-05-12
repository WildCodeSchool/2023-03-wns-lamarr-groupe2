import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity({ name: "eco_action" })
export default class EcoAction extends BaseEntity {
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
}
