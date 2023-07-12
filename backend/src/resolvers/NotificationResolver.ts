import { Ctx, Arg, Mutation, Query, InputType, Field, Int } from "type-graphql";
import { In } from "typeorm";
import { Notification } from "../models/Notification";
import { User } from "../models/User";
import { IsEnum, IsNumber } from "class-validator";

enum Status {
  LU = "LU",
  NONLU = "NONLU",
  ATTENTE = "ATTENTE",
  REFUSE = "REFUSE",
  ACCEPTE = "ACCEPTE",
}

enum Type {
  INFORMATION = "INFORMATION",
  CHALLENGE = "CHALLENGE",
  AMI = "AMI",
}

@InputType()
export class NotificationInput {
  @Field(() => [Int])
  @IsNumber({}, { each: true })
  recipientIds: number[];

  @Field()
  @IsEnum(Type)
  type: Type;

  @Field()
  @IsEnum(Status)
  status: Status;
}

@InputType()
export class NotificationStatus {
  @Field()
  id: number;

  @Field()
  status: Status;
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

    const status = input.status;

    const notification = await Notification.create({
      sender,
      receivers,
      type,
      status,
    }).save();

    return notification;
  }

  @Mutation(() => Notification)
  async updateNotificationStatus(
    @Ctx() context: { user: User },
    @Arg("input") input: NotificationStatus
  ): Promise<Notification> {
    const notification = await Notification.findOne({
      where: {
        id: input.id,
        sender: {
          id: context.user.id,
        },
      },
    });

    if (notification === null) throw new Error(`Notification id invalid`);

    notification.status = input.status;

    return notification.save();
  }

  @Query(() => [Notification])
  async userNotifications(
    @Ctx() context: { user: User }
  ): Promise<Notification[]> {
    if (context.user === null) throw new Error(`The user is not connected!`);

    const notification = await Notification.find({
      relations: {
        sender: true,
        receivers: true,
      },
      where: {
        receivers: {
          id: context.user.id,
        },
      },
    });

    if (notification === null)
      throw new Error(`User doesn't have any notifications`);

    return notification;
  }
}
