import { BaseEntity, Column, ManyToMany, Entity, PrimaryGeneratedColumn } from "typeorm"
import { ObjectType, Field } from "type-graphql"
import { Challenge } from "./Challenge"

@ObjectType()
@Entity({ name: "eco_action" })
export class EcoAction extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number

	@Field()
	@Column()
	label: string

	@Field()
	@Column({ type: "text" })
	description: string

	@Field()
	@Column()
	points: number

	@Field()
	@Column()
	need_proof: boolean

	// challenge_eco_action_list
	@Field(() => [Challenge])
	@ManyToMany(() => Challenge, (challengeId) => challengeId.id)
	authors: Promise<Challenge[]>
}
