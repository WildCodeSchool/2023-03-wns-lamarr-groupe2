import { Arg, Mutation, Query } from "type-graphql";
import { User } from "../models/User";

export class AuthResolver {
	// Mutation to insert a user in database
	@Mutation(() => String)
	async signUp(
		@Arg("firstname") firstname: string,
		@Arg("lastname") lastname: string,
		@Arg("username") username: string,
		@Arg("email") email: string,
		@Arg("password") password: string
	): Promise<User> {
		const newUser = await User.create({
			firstname,
			lastname,
			username,
			email,
			password,
		}).save();
		console.log("newUser:", newUser);
		return newUser;
	}

	@Query(() => String)
	async signIn(
		@Arg("email") email: string,
		@Arg("password") password: string
	): Promise<string> {
		return "You're signed id !";
	}
}
