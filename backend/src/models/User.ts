import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
  BaseEntity,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Company, CompanyGroup } from "./index";

@ObjectType()
@Entity()
export default class User extends BaseEntity {
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
  @Column({ default: false })
  admin: boolean;

  @Field()
  @Column({ nullable: true, default: 0 })
  points: number;

  @Field()
  @Column({
    type: "timestamp",
    default: new Date(new Date().getTime() + 2 * 3600 * 1000),
  })
  creationDate: Date;

  // @Field(() => [Company])
  // @OneToMany(() => Company, (company) => company.id)
  // @JoinTable()
  // company_id: number;

  // @Field(() => [CompanyGroup])
  // @OneToMany(() => CompanyGroup, (company_group) => company_group.id)
  // @JoinTable()
  // company_group_id: number;
}
