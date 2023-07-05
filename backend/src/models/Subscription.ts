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

@ObjectType()
@Entity()
export class Subscription extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [Company])
  @OneToMany(() => Company, (company) => company.id)
  @JoinTable()
  company_id: Company[];

  @Field()
  @Column()
  paid: boolean;

  @Field()
  @Column({ type: "date" })
  startAt: Date;

  @Field()
  @Column({ type: "date" })
  endAt: Date;
}
