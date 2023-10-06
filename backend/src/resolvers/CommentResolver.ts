import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { Comment } from "../models/Comment"
import { User } from "../models/User"

@Resolver()
export class CommentResolver {
	// get all comments of a user
	@Query(() => [Comment])
	async getCommentsOfUser(
		@Arg("userId") userId: number
	): Promise<Comment[]> {
		const comments = await Comment.find({
			relations: ["sender", "challenge_id"],
			where: {
				sender: {
					id: userId,
				},
			},
		})
		return comments
	}

	// get all comments of a challenge
	@Query(() => [Comment])
	async getCommentsOfChallenge(
		@Arg("challengeId") challengeId: number
	): Promise<Comment[]> {
		const comments = await Comment.find({
			relations: ["sender", "challenge_id"],
			where: {
				challenge_id: {
					id: challengeId,
				},
			},
		})
		return comments
	}

	// get all comments
	@Query(() => [Comment])
	async getAllComments(): Promise<Comment[]> {
		const comments = await Comment.find({
			relations: ["sender", "challenge_id"],
		})
		return comments
	}

	// create a comment
	// TO FIX: challenge_id is not being saved
	@Mutation(() => Comment)
	async createComment(
		@Ctx() userContext: { user: User },
		@Arg("content") content: string
	): Promise<Comment> {
		if (!userContext.user)
			throw new Error(
				"You have to be authenticated to post a comment!"
			)

		const comment = new Comment()
		comment.content = content
		comment.sender = userContext.user

		await comment.save()

		return comment
	}

	// update a comment
	@Mutation(() => Comment)
	async updateComment(
		@Arg("id") id: number,
		@Arg("content") content: string
	): Promise<Comment> {
		const comment = await Comment.findOne({ where: { id } })
		if (!comment) throw new Error("Comment not found!")

		comment.content = content
		await comment.save()

		return comment
	}

	// delete a comment
	@Mutation(() => Boolean)
	async deleteComment(@Arg("id") id: number): Promise<boolean> {
		await Comment.delete(id)
		return true
	}
}
