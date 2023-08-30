import { Ctx, Arg, Mutation, InputType, Query, Field } from "type-graphql";
import { User } from "../models/User";
import { IsInt, IsNumber } from "class-validator";

@InputType()
export class NewFriendInput {
  @Field()
  @IsNumber()
  @IsInt()
  friendid: number;
}

export class FriendResolver {
  // Mutation to insert a user in database
  @Mutation(() => User)
  async newFriend(
    @Ctx() context: { user: User },
    @Arg("input") input: NewFriendInput
  ): Promise<User> {
    const user = context.user;

    if (user.id === input.friendid)
      throw new Error(`User and friend are the same`);

    if (!user) throw new Error(`The user is not connected`);

    const userFriends = await User.findOne({
      relations: {
        friend: true,
      },
      where: {
        id: user.id,
      },
    });

    if (!userFriends) throw new Error(`The user is not connected`);

    const friend = await User.findOne({
      relations: {
        friend: true,
      },
      where: { id: input.friendid },
    });

    if (!friend)
      throw new Error(`The user with id: ${input.friendid} does not exist!`);

    if (!userFriends.friend) {
      userFriends.friend = []; // Initialisez la liste d'amis si elle est undefined
    }

    if (!friend.friend) {
      friend.friend = []; // Initialisez la liste d'amis de l'ami si elle est undefined
    }

    const alreadyFriends = userFriends.friend.some((f) => f.id === friend.id);
    if (alreadyFriends) {
      throw new Error(`The user is already a friend`);
    }

    userFriends.friend.push(friend);
    friend.friend.push(user);

    await userFriends.save();
    await friend.save();

    return userFriends;
  }

  @Mutation(() => User)
  async deleteFriend(
    @Ctx() context: { user: User },
    @Arg("input") input: NewFriendInput
  ): Promise<User> {
    const user = context.user;

    if (user === null) throw new Error(`The user is not connected!`);

    const userFriends = await User.findOne({
      where: { id: user.id },
      relations: ["friend"],
    });

    if (userFriends === null) throw new Error(`The user doesn't exist!`);

    let friends = userFriends.friend;

    friends = friends.filter((item) => item.id !== input.friendid);
    userFriends.friend = friends;

    await userFriends.save();

    const targetUser = await User.findOne({
      where: { id: input.friendid },
      relations: ["friend"],
    });
    if (targetUser) {
      targetUser.friend = targetUser.friend.filter(
        (item) => item.id !== user.id
      );
      await targetUser.save();
    }

    return userFriends;
  }

  @Query(() => [User])
  async getFriends(@Ctx() context: { user: User }): Promise<User[]> {
    const user = context.user;
    if (!user) {
      throw new Error("User not authenticated");
    }

    const profile = await User.findOne({
      relations: ["friend"],
      where: {
        id: user.id,
      },
    });

    if (!profile) {
      throw new Error("User profile not found");
    }

    const friends = profile.friend;

    if (!friends) {
      return [];
    }

    return friends;
  }
}
