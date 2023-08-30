import { Ctx, Arg, Mutation, Resolver, Query } from "type-graphql";
import { FindOneOptions } from "typeorm";
import { User } from "../models/User";

@Resolver()
export class UserResolver {
  // Query to get all Users list
  @Query(() => [User])
  async getUsers(@Ctx() context: { user: User }): Promise<User[]> {
    const user = context.user;
    if (!user) {
      throw new Error("User not authenticated");
    }
    const users = await User.find();
    const usersExceptCurrentUser = users.filter(
      (user) => user.id !== context.user.id
    );

    return usersExceptCurrentUser;
  }

  // Mutation to update user's username and email
  @Mutation(() => User)
  async updateUser(
    @Ctx() context: { user: User },
    @Arg("username", { nullable: true }) username?: string,
    @Arg("email", { nullable: true }) email?: string
  ): Promise<User> {
    const user = context.user;

    // We check if the user exists
    const options: FindOneOptions<User> = { where: { id: user.id } };
    const existingUser = await User.findOne(options);

    if (!existingUser) throw new Error("User not found!");

    // Update username and email if provided
    if (username !== null && username !== undefined) {
      existingUser.username = username;
    }
    if (email !== null && email !== undefined) {
      existingUser.email = email;
    }

    await existingUser.save();

    return existingUser;
  }

  @Mutation(() => User)
  async updatePicture(
    @Ctx() context: { user: User },
    @Arg("picture", { nullable: true }) picture?: string
  ): Promise<User> {
    const user = context.user;

    // We check if the user exists
    const options: FindOneOptions<User> = { where: { id: user.id } };
    const existingUser = await User.findOne(options);

    if (!existingUser) throw new Error("User not found!");

    // Update username and email if provided
    if (picture !== null && picture !== undefined) {
      existingUser.picture = picture;
    }

    await existingUser.save();

    return existingUser;
  }

  // Mutation to delete a user
  @Mutation(() => Boolean)
  async deleteUser(@Ctx() context: { user: User }): Promise<boolean> {
    const user = context.user;
    const options: FindOneOptions<User> = { where: { id: user.id } };
    const existingUser = await User.findOne(options);

    if (!existingUser) throw new Error("User not found!");

    // Perform any additional checks here if needed
    // For example, only allow deletion if the user is an admin

    await existingUser.remove();

    return true;
  }
}
