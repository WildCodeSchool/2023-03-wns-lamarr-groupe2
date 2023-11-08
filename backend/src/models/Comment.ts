import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	ManyToOne,
} from "typeorm"
import { ObjectType, Field } from "type-graphql"
import { Challenge } from "./Challenge"
import { User } from "./User"

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.comments)
	sender: User

	@Field(() => Challenge)
	@ManyToOne(() => Challenge, (challenge) => challenge.comments)
	challenge_id: Challenge

	@Field()
	@Column({
		type: "timestamptz",
		default: () => "CURRENT_TIMESTAMP",
	})
	creationDate: Date

	@Field()
	@Column()
	content: string
}
