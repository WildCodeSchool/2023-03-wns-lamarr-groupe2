import { Arg, Mutation, Query } from "type-graphql";
import { Notification } from "../models/Notification";
import { User } from "../models/User";

export class NotificationResolver {
  // Mutation to insert a user in database
  @Mutation(() => Notification)
  async newNotification(
    @Arg("sender_id") senderId: number,
    @Arg("recipient_id") recipientId: number,
    @Arg("type") type: string
  ): Promise<Notification> {
    const sender = await User.findOneBy({ id: senderId });

    if (sender === null) {
      throw new Error(`The user with id: ${senderId} does not exist!`);
    }

    const recipient = await User.findOneBy({ id: recipientId });

    if (recipient === null) {
      throw new Error(`The user with id: ${recipientId} does not exist!`);
    }

    const newNotification = await Notification.create({
      sender: [sender],
      recipient: recipient,
      type,
    }).save();

    return newNotification;
  }

  @Query(() => Notification)
  async userNotifications(
    @Arg("recipient_id") recipientId: number
  ): Promise<Notification[]> {
    const recipient = await User.findOneBy({ id: recipientId });

    if (recipient === null) {
      throw new Error(`The user with id: ${recipientId} does not exist!`);
    }

    const notification = await Notification.findBy({
      recipient: { id: recipientId },
    });

    if (notification === null) {
      throw new Error(`User doesn't have any notifications`);
    }

    return notification;
  }
}
