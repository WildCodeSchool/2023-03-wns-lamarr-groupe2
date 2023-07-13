import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, BaseEntity, ManyToOne } from "typeorm"
import { ObjectType, Field } from "type-graphql"
import { Challenge } from "./Challenge"
import { User } from "./User"

export enum InvitationStatus {
	ATTENTE = "ATTENTE",
	REFUSE = "REFUSE",
	ACCEPTE = "ACCEPTE",
}

@ObjectType()
@Entity({ name: "invitation_challenge" })
export class InvitationChallenge extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number

	@Field(() => [User])
	@ManyToMany(() => User, (user) => user.receivedChallengeInvitation)
	receivers: User[]

	@Field(() => Challenge)
	@ManyToOne(() => Challenge, (challenge) => challenge.id)
	challenge_id: Challenge

	@Field()
	@Column({ type: "enum", enum: InvitationStatus })
	invitation_status_id: InvitationStatus
}
