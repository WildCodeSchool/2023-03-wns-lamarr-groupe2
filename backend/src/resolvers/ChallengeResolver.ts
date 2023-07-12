import { Ctx, Arg, Mutation, Query, Int } from "type-graphql"
import { FindOneOptions, In } from "typeorm"
import { Challenge, Tags, ChallengeStatus } from "../models/Challenge"
import { EcoAction } from "../models/EcoAction"
import { User } from "../models/User"

export class ChallengeResolver {
	@Query(() => [Challenge]) // Updated return type to an array of Challenge
	async getAllChallenges(): Promise<Challenge[]> {
		// Added return type Promise<Challenge[]>
		const challenges = await Challenge.find({
			relations: { creator: true, ecoActions: true }, // Ajoutez la relation "creator" pour récupérer le créateur du challenge
		})

		return challenges
	}

	// create a mutation to create a challenge (the creator is the user who is logged in) and we can insert the name, description, startAt, endAt, a list of eco actions ,challengeStatus and tags
	@Mutation(() => Challenge)
	async createChallenge(
		@Ctx() context: { user: User },
		@Arg("title") title: string,
		@Arg("description") description: string,
		@Arg("startAt") startAt: string,
		@Arg("endAt") endAt: string,
		@Arg("ecoActions", () => [Int], { validate: false }) ecoActions: number[],
		@Arg("challengeStatus") challengeStatus: ChallengeStatus,
		@Arg("tags") tags: Tags
	): Promise<Challenge> {
		const user = context.user

		// we find all the eco actions from the list of eco actions ids
		const ecoActionList = await EcoAction.find({
			where: { id: In(ecoActions) },
		})

		// TODO: change this const with a create method
		const challenge = new Challenge()
		challenge.title = title
		challenge.description = description
		challenge.startAt = new Date(startAt)
		challenge.endAt = new Date(endAt)
		challenge.creator = user
		challenge.challenge_status = challengeStatus
		challenge.tags = tags
		challenge.ecoActions = ecoActionList

		await challenge.save()

		return challenge
	}

	// create a mutation to update a challenge and we can update only the name, description, startAt, endAt, challengeStatus and tags
	@Mutation(() => Challenge)
	async updateChallenge(
		@Ctx() context: { user: User },
		@Arg("id")
		id: number,
		@Arg("title", { nullable: true }) title?: string,
		@Arg("description", { nullable: true }) description?: string,
		@Arg("startAt", { nullable: true }) startAt?: string,
		@Arg("endAt", { nullable: true }) endAt?: string,
		@Arg("challengeStatus", { nullable: true }) challengeStatus?: ChallengeStatus,
		@Arg("tags", { nullable: true }) tags?: Tags
	): Promise<Challenge> {
		// we use the context to get the user who is logged in
		const user = context.user
		const options: FindOneOptions<Challenge> = { where: { id }, relations: ["creator"] }
		const challenge = await Challenge.findOne(options)

		// we check if the challenge exists
		if (challenge == null) throw new Error("Challenge not found!")

		// we check if the user who is logged in is the creator of the challenge
		if (challenge.creator.id !== user.id)
			throw new Error("You are not the creator of this challenge!")
		if (title !== null && title !== undefined) {
			challenge.title = title
		}
		if (description !== null && description !== undefined) {
			challenge.description = description
		}
		if (startAt !== null && startAt !== undefined) {
			challenge.startAt = new Date(startAt)
		}
		if (endAt !== null && endAt !== undefined) {
			challenge.endAt = new Date(endAt)
		}
		if (challengeStatus !== null && challengeStatus !== undefined) {
			challenge.challenge_status = challengeStatus
		}
		if (tags !== null && tags !== undefined) {
			challenge.tags = tags
		}

		await challenge.save()

		return challenge
	}

	// create a mutation to delete a challenge and only the creator of the challenge or an admin can delete it. If the creator is not the user who is logged in, we throw an error

	@Mutation(() => Boolean)
	async deleteChallenge(@Ctx() context: { user: User }, @Arg("id") id: number): Promise<boolean> {
		const user = context.user
		const options: FindOneOptions<Challenge> = { where: { id }, relations: ["creator"] }
		const challenge = await Challenge.findOne(options)

		if (challenge == null) throw new Error("Challenge not found!")

		if (challenge.creator.id !== user.id || !user.admin) {
			await challenge.remove()
		} else {
			throw new Error("You are not authorized to delete this challenge!")
		}

		return true
	}
}
