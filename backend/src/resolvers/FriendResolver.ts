import { Arg, Mutation } from "type-graphql";
import { User } from "../models/User";

export class FriendResolver {
  // Mutation to insert a user in database
  @Mutation(() => User)
  async newFriend(
    @Arg("userid") userid: number,
    @Arg("friendid") friendid: number
  ): Promise<User> {
    // const user = await User.find({ id: userid, friend: true });

    if (userid === friendid) {
      throw new Error(`User and friend are the same`);
    }

    const user = await User.findOne({
      relations: {
        friend: true,
      },
      where: {
        id: userid,
      },
    });

    if (user === null) {
      throw new Error(`The user with id: ${userid} does not exist!`);
    }

    const friend = await User.findOneBy({ id: friendid });

    if (friend === null) {
      throw new Error(`The user with id: ${friendid} does not exist!`);
    }

    user.friend.push(friend);

    return await user.save();
  }
}
