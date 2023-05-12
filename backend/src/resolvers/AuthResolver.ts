import { Arg, Mutation, Query } from "type-graphql";
import { User } from "../models";

export class AuthResolver {
  // Mutation to insert a user in database
  @Mutation(() => String)
  async signUp(
    @Arg("firstname") firstname: string,
    @Arg("lastname") lastname: string,
    @Arg("username") username: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<string> {
    await User.create({
      firstname,
      lastname,
      username,
      email,
      password,
    }).save();
    return "Account created !";
  }

  @Query(() => String)
  async signIn(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<string> {
    return "You're signed id !";
  }
}
