import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Company } from "./Company";
import { Challenge } from "./Challenge";

@ObjectType()
@Entity({ name: "company_group" })
export class CompanyGroup extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Challenge])
  @OneToMany(() => Challenge, (challenge) => challenge.id)
  @JoinTable()
  challenge_id: number;

  @Field(() => [Company])
  @OneToMany(() => Company, (company) => company.id)
  @JoinTable()
  company_id: number;
}
