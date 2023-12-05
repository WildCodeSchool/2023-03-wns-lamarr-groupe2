import { Ctx, Arg, Mutation, Resolver, Query } from "type-graphql";
import { FindOneOptions } from "typeorm";
import { User } from "../models/User";
import * as argon2 from "argon2";

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

    if (!user) throw new Error(`The user is not connected`);

    // We check if the user exists
    const options: FindOneOptions<User> = { where: { id: user.id } };
    const existingUser = await User.findOne(options);
    if (!existingUser) throw new Error("User not found!");
console.log(existingUser);
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
 if (!user) throw new Error(`The user is not connected`);

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

  // Mutation to delete an User

  @Mutation(() => Boolean)
  async deleteUser(@Ctx() context: { user: User }): Promise<boolean> {
    const user = context.user;

    if (!user) throw new Error(`The user is not connected`);

    const options: FindOneOptions<User> = { where: { id: user.id } };
    const existingUser = await User.findOne(options);

    if (!existingUser) throw new Error("User not found!");

    // Perform any additional checks here if needed
    // For example, only allow deletion if the user is an admin

    await existingUser.remove();
    return true;
  }

  // Mutation to update user's password
  @Mutation(() => User)
  async updatePassword(
      @Ctx() context: { user: User },
      @Arg("oldPassword") oldPassword: string,
      @Arg("newPassword") newPassword: string,
      @Arg("confirmPassword") confirmPassword: string,
  ): Promise<User> {
    const user = context.user

    if(!user) throw new Error(`Utilisateur non connecté`);

    // Check if the user exists
    const options: FindOneOptions<User> = { where: { id: user.id } };
    const existingUser = await User.findOne(options);


    if(!existingUser) throw new Error(`L'utilisateur n'existe pas`);


    //Verify old password with user's current password
    const valid = await argon2.verify(user.password, oldPassword);
    const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{7,}$/
    if(!valid) {
      throw new Error("Mot de passe actuel incorrect");
    }
    if(!newPassword.match(passwordRules)){

      throw new Error("Pour être valide,votre mot de passe doit contenir 7 charactères, une majuscule, une minuscule et un chiffre")

    }
    if(newPassword === oldPassword) {
      throw new Error("Le nouveau mot de passe doit être différent de l'actuel");
    }
    if(newPassword !== confirmPassword) {
      throw new Error("Le nouveau mot de passe et sa confirmation doivent être identiques");
    }

    existingUser.password = await argon2.hash(newPassword);

    await existingUser.save();
    return existingUser;
  }

}
