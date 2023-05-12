import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Company, CompanyGroup } from "./index";

@ObjectType()
@Entity()
export default class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  lastname: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  admin: boolean;

  @Field()
  @Column()
  points: number;

  @Field()
  @Column({ type: "timestamptz" })
  creationDate: Date;

  @Field(() => [Company])
  @ManyToMany(() => Company, { eager: true })
  @JoinTable()
  company_id: number;

  @Field(() => [CompanyGroup])
  @ManyToMany(() => CompanyGroup, { eager: true })
  @JoinTable()
  company_group_id: number;
}
