import { Ctx, Arg, Int, Mutation, Query } from "type-graphql";
import { In } from "typeorm";
import { Notification } from "../models/Notification";
import { User } from "../models/User";

export class NotificationResolver {
  // Mutation to insert a user in database
  @Mutation(() => Notification)
  async newNotification(
    @Ctx() context: { user: User },
    @Arg("recipientIds", () => [Int], { validate: false })
    recipientIds: number[],
    @Arg("type") type: string
  ): Promise<Notification> {
    const sender = context.user;

    if (sender === null) throw new Error(`The user is not connected!`);

    const receivers = await User.findBy({ id: In(recipientIds) });

    if (receivers === null) throw new Error(`The users does not exist!`);

    const notification = await Notification.create({
      sender,
      receivers,
      type,
    }).save();

    return notification;
  }

  @Query(() => [Notification])
  async userNotifications(
    @Arg("receiverId") receiverId: number
  ): Promise<Notification[]> {
    const receiver = await User.findOne({
      relations: {
        receivedNotifications: true,
      },
      where: {
        id: receiverId,
      },
    });

    if (receiver === null)
      throw new Error(`The user with id: ${receiverId} does not exist!`);

    const notification = receiver.receivedNotifications;

    if (notification === null)
      throw new Error(`User doesn't have any notifications`);

    return notification;
  }
}
