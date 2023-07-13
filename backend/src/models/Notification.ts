import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { ObjectType, Field } from "type-graphql"
import { User } from "./User"

export enum Status {
	LU = "LU",
	NONLU = "NONLU",
	ATTENTE = "ATTENTE",
	REFUSE = "REFUSE",
	ACCEPTE = "ACCEPTE",
}

export enum Type {
	INFORMATION = "INFORMATION",
	CHALLENGE = "CHALLENGE",
	AMI = "AMI",
}

@ObjectType()
@Entity()
export class Notification extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.receivedNotifications)
	receivers: User

	@Field()
	@Column({ nullable: false })
	message: string

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.sentNotifications)
	sender: User

	@Field()
	@Column({ type: "enum", enum: Type })
	type: Type

	@Field()
	@Column({ type: "enum", enum: Status })
	status: Status

	@Field()
	@Column({
		type: "timestamptz",
		default: new Date(new Date().getTime() + 2 * 3600 * 1000),
	})
	send_date: Date
}
