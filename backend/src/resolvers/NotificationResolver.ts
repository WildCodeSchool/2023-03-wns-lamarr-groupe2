import {
  Ctx,
  Arg,
  Mutation,
  Query,
  Resolver,
  InputType,
  Field,
  Int,
} from "type-graphql";
import { In } from "typeorm";
import { Notification } from "../models/Notification";
import { User } from "../models/User";
import { IsBoolean, IsNumber } from "class-validator";

@InputType()
export class NotificationInput {
  @Field(() => [Int])
  @IsNumber({}, { each: true })
  recipientUserIds: number[];

  @Field()
  type: 1 | 2 | 3;
}

@InputType()
export class UpdateNotificationStatus {
  @Field()
  id: number;

  @Field({ nullable: true })
  @IsBoolean()
  status?: boolean;

  @Field()
  @IsBoolean()
  isUnread: boolean;
}

@InputType()
export class DeleteNotificationInput {
  @Field(() => [Int])
  @IsNumber({}, { each: true })
  ids: number[];
}

// Add
@Resolver()
export class NotificationResolver {
  // Mutation to insert a notification in the database
  @Mutation(() => [Notification])
  async newNotification(
    @Ctx() context: { user: User },
    @Arg("input") input: NotificationInput
  ): Promise<Notification[]> {
    const sender = context.user;
    if (!sender) {
      throw new Error("The user is not connected!");
    }
    const { recipientUserIds, type } = input;

    const receivers = await User.findBy({
      id: In(recipientUserIds),
    });

    if (!receivers || receivers.length !== recipientUserIds.length) {
      throw new Error("Not all users exist!");
    }

    const notifications: Notification[] = [];

    for (const receiver of receivers) {
      const newNotif = new Notification();
      newNotif.sender = sender;
      newNotif.receivers = [receiver];
      newNotif.type = type;
      newNotif.isUnread = true;

      await newNotif.save();
      notifications.push(newNotif);
    }

    return notifications;
  }

  // Update Notification Status
  @Mutation(() => Notification)
  async updateNotificationStatus(
    @Ctx() context: { user: User },
    @Arg("id", () => Int) id: number,
    @Arg("status", () => Boolean, { nullable: true }) status: boolean | null,
    @Arg("isUnread", () => Boolean) isUnread: boolean
  ): Promise<Notification> {
    const notification = await Notification.findOne({
      where: {
        id: id,
        receivers: {
          id: context.user.id,
        },
      },
    });
    if (!notification) {
      throw new Error("Invalid notification id");
    }

    if (status !== null) {
      notification.status = status;
    }

    notification.isUnread = isUnread;
    await notification.save();
    return notification;
  }

  // Query All
  @Query(() => [Notification])
  async userNotifications(
    @Ctx() context: { user: User }
  ): Promise<Notification[]> {
    if (!context.user) throw new Error("The user is not connected!");
    const notifications = await Notification.find({
      relations: ["sender", "receivers"],
      where: {
        receivers: {
          id: context.user.id,
        },
      },
    });
    if (!notifications || notifications.length === 0) {
      throw new Error("User doesn't have any notifications");
    }

    return notifications;
  }

  //Delete
  @Mutation(() => Boolean)
  async deleteNotification(
    @Arg("input") input: DeleteNotificationInput
  ): Promise<boolean> {
    const notifications = await Notification.findBy({ id: In(input.ids) });

    if (!notifications || notifications.length === 0) {
      throw new Error("Notifications not found");
    }

    await Notification.remove(notifications);
    return true;
  }
}
