import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Company } from "./Company";
import { Challenge } from "./Challenge";
import { CompanyGroup } from "./CompanyGroup";

@ObjectType()
@Entity()
export class User extends BaseEntity {
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
  @Column({ unique: true })
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
    type: "timestamptz",
    default: new Date(new Date().getTime() + 2 * 3600 * 1000),
  })
  creationDate: Date;

  @Field(() => Company)
  @OneToMany(() => Company, (company) => company.id)
  @JoinTable()
  company?: Company;

  @Field(() => [CompanyGroup])
  @OneToMany(() => CompanyGroup, (companyGroup) => companyGroup.id)
  @JoinTable()
  company_group_id: CompanyGroup;

  // friend_list
  @ManyToMany(() => User, (friendId) => friendId.id)
  @JoinTable({
    name: "friend_list", // table name for the junction table of this relation
    joinColumn: {
      name: "userId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "friendId",
      referencedColumnName: "id",
    },
  })
  @Field(() => [User])
  friend: User[];

  // challenge_member
  @ManyToMany(() => Challenge, (challengeId) => challengeId.id)
  @Field(() => [Challenge])
  challenge: Challenge[];
}
