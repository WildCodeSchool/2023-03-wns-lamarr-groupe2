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

  @Field({ nullable: true })
  status?: boolean;
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

@Resolver()
export class NotificationResolver {
  // Mutation to insert a notification in the database
  @Mutation(() => [Notification])
  async newNotification(
    @Ctx() context: { user: User },
    @Arg("input") input: NotificationInput
  ): Promise<Notification[]> {
    const sender = context.user;

    if (!sender) throw new Error("The user is not connected!");

    const receivers = await User.findBy({ id: In(input.recipientUserIds) });

    if (!receivers || receivers.length === 0)
      throw new Error("The users do not exist!");

    const notifications: Notification[] = [];

    for (const receiver of receivers) {
      const newNotif = new Notification();
      newNotif.sender = sender;
      newNotif.receivers = [receiver];
      newNotif.type = input.type;

      if (input.status !== undefined) {
        newNotif.status = input.status;
      }

      await newNotif.save();
      notifications.push(newNotif);
    }

    return notifications;
  }

  @Mutation(() => Notification)
  async updateNotificationStatus(
    @Ctx() context: { user: User },
    @Arg("input") input: UpdateNotificationStatus
  ): Promise<Notification> {
    const notification = await Notification.findOne({
      where: {
        id: input.id,
        receivers: {
          id: context.user.id,
        },
      },
    });

    if (!notification) throw new Error("Invalid notification id");

    if (input.status !== undefined) {
      notification.status = input.status;
      notification.isUnread = input.isUnread;
      await notification.save();
    }

    return notification;
  }

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
}
