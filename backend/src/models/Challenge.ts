import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	JoinTable,
	ManyToOne,
	BaseEntity,
	ManyToMany,
	OneToMany,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { User } from "./User";
import { ChallengeStatus } from "./ChallengeStatus";

@ObjectType()
@Entity()
export class Challenge extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	name: string;

	@Field()
	@Column({ type: "text" })
	description: string;

	@Field()
	@Column({ type: "date" })
	startAt: Date;

	@Field()
	@Column({ type: "date" })
	endAt: Date;

	@Field(() => [ChallengeStatus])
	@ManyToOne(() => ChallengeStatus, (challengeStatus) => challengeStatus.id)
	@JoinTable()
	challenge_status: ChallengeStatus;

	@Field(() => [User])
	@OneToMany(() => User, (user) => user.id)
	@JoinTable()
	creator: number;

	// challenge_member
	@ManyToMany(() => User, (userId) => userId.id, { lazy: true })
	@JoinTable({
		name: "challenge_member", // table name for the junction table of this relation
		joinColumn: {
			name: "challengeId",
			referencedColumnName: "id",
		},
		inverseJoinColumn: {
			name: "userId",
			referencedColumnName: "id",
		},
	})
	@Field(() => [User])
	authors: Promise<User[]>;
}
