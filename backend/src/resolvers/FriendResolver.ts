import { Ctx, Arg, Mutation, InputType, Field } from "type-graphql";
import { User } from "../models/User";
import { IsInt, IsNumber } from "class-validator";

@InputType()
export class NewFriendInput {
  @Field()
  @IsNumber()
  @IsInt()
  friendid: number;
}

/*

mutation NewFriend($input: NewFriendInput!) {
  newFriend(input: $input) {
    id
    name
    email
    friend {
      id
    }
}

// X (plus vrai)
{
  "friendid": 2,
  "userid": 1
}

// Vrai
{
  "input": {
    "friendid": 2,
    "userid": 1
  }
}

*/

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

    if (user === null) throw new Error(`The user is not connected`);

    const userFriends = await User.findOne({
      relations: {
        friend: true,
      },
      where: {
        id: user.id,
      },
    });

    if (userFriends === null) throw new Error(`The user is not connected`);

    userFriends.friend.forEach((check) => {
      if (check.id === input.friendid)
        throw new Error(`The user is already friend`);
    });

    const friend = await User.findOneBy({ id: input.friendid });

    if (friend === null)
      throw new Error(`The user with id: ${input.friendid} does not exist!`);

    userFriends.friend.push(friend);

    return await userFriends.save();
  }

  @Mutation(() => User)
  async deleteFriend(
    @Ctx() context: { user: User },
    @Arg("input") input: NewFriendInput
  ): Promise<User> {
    const user = context.user;

    if (user === null) {
      throw new Error(`The user is not connected!`);
    }

    const userFriends = await User.findOne({
      relations: {
        friend: true,
      },
      where: {
        id: user.id,
      },
    });

    if (userFriends === null) {
      throw new Error(`The user doesn't exist!`);
    }

    let friends = userFriends.friend;

    friends = friends.filter((item) => item.id !== input.friendid);
    userFriends.friend = friends;

    return await userFriends.save();
  }
}
