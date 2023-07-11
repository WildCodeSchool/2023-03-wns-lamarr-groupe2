import { Ctx, Arg, Mutation, Query, InputType, Field, Int } from "type-graphql";
import { In } from "typeorm";
import { Notification } from "../models/Notification";
import { User } from "../models/User";
import { IsNumber } from "class-validator";

@InputType()
export class NotificationInput {
  @Field(() => [Int])
  @IsNumber({}, { each: true })
  recipientIds: number[];

  @Field()
  type: string;
}

export class NotificationResolver {
  // Mutation to insert a user in database
  @Mutation(() => Notification)
  async newNotification(
    @Ctx() context: { user: User },
    @Arg("input") input: NotificationInput
  ): Promise<Notification> {
    const sender = context.user;

    if (sender === null) throw new Error(`The user is not connected!`);

    const receivers = await User.findBy({ id: In(input.recipientIds) });

    if (receivers === null) throw new Error(`The users does not exist!`);

    const type = input.type;

    const notification = await Notification.create({
      sender,
      receivers,
      type,
    }).save();

    return notification;
  }

  @Query(() => [Notification])
  async userNotifications(
    @Ctx() context: { user: User }
  ): Promise<Notification[]> {
    if (context.user === null) throw new Error(`The user is not connected!`);

    const receiver = await User.findOne({
      relations: {
        receivedNotifications: true,
      },
      where: {
        id: context.user.id,
      },
    });

    if (receiver === null) throw new Error(`The user does not exist!`);

    const notification = receiver.receivedNotifications;

    if (notification === null)
      throw new Error(`User doesn't have any notifications`);

    return notification;
  }
}
