import { Arg, Mutation, Query } from "type-graphql";
import { FindOneOptions } from "typeorm";
import { Challenge, Tags, ChallengeStatus } from "../models/Challenge";

export class ChallengeResolver {
	@Query(() => [Challenge]) // Updated return type to an array of Challenge
	async getAllChallenges(): Promise<Challenge[]> {
		// Added return type Promise<Challenge[]>
		const challenges = await Challenge.find({
			relations: ["creator"], // Ajoutez la relation "creator" pour récupérer le créateur du challenge
		});

		return challenges;
	}

	// create a mutation to create a challenge (the creator is the user who is logged in)
	@Mutation(() => Challenge)
	async createChallenge(
		@Arg("name") name: string,
		@Arg("description") description: string,
		@Arg("startAt") startAt: string,
		@Arg("endAt") endAt: string,
		@Arg("challengeStatus") challengeStatus: ChallengeStatus,
		@Arg("tags") tags: Tags,
		@Arg("creatorId") creatorId: number
	): Promise<Challenge> {
		const challenge = await Challenge.create({
			name,
			description,
			startAt: new Date(startAt),
			endAt: new Date(endAt),
			challenge_status: challengeStatus,
			tags,
			creator: { id: creatorId }, // Utilisez l'objet avec la propriété "id" pour lier le créateur au challenge
		}).save();
		return challenge;
	}

	// create a mutation to update a challenge and we can update only the name, description, startAt, endAt, challengeStatus and tags
	@Mutation(() => Challenge)
	async updateChallenge(
		@Arg("id") id: number,
		@Arg("name", { nullable: true }) name?: string,
		@Arg("description", { nullable: true }) description?: string,
		@Arg("startAt", { nullable: true }) startAt?: string,
		@Arg("endAt", { nullable: true }) endAt?: string,
		@Arg("challengeStatus", { nullable: true }) challengeStatus?: ChallengeStatus,
		@Arg("tags", { nullable: true }) tags?: Tags
	): Promise<Challenge> {
		const options: FindOneOptions<Challenge> = { where: { id } };
		const challenge = await Challenge.findOne(options);
		if (challenge == null) throw new Error("Challenge not found!");

		if (name !== null && name !== undefined) {
			challenge.name = name;
		}
		if (description !== null && description !== undefined) {
			challenge.description = description;
		}
		if (startAt !== null && startAt !== undefined) {
			challenge.startAt = new Date(startAt);
		}
		if (endAt !== null && endAt !== undefined) {
			challenge.endAt = new Date(endAt);
		}
		if (challengeStatus !== null && challengeStatus !== undefined) {
			challenge.challenge_status = challengeStatus;
		}
		if (tags !== null && tags !== undefined) {
			challenge.tags = tags;
		}

		await challenge.save();

		return challenge;
	}

	// create a mutation to delete a challenge
	@Mutation(() => Boolean)
	async deleteChallenge(@Arg("id") id: number): Promise<boolean> {
		const options: FindOneOptions<Challenge> = { where: { id } };
		const challenge = await Challenge.findOne(options);
		if (challenge == null) throw new Error("Challenge not found!");

		await challenge.remove();
		return true;
	}
}
