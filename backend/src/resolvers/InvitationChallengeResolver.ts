import {
  Ctx,
  Arg,
  Mutation,
  Resolver,
  InputType,
  Field,
  Int,
} from "type-graphql";
import { In } from "typeorm";
import { User } from "../models/User";
import { IsNumber } from "class-validator";
import { InvitationChallenge } from "../models/InvitationChallenge";
import { Challenge } from "../models/Challenge";
import { ChallengeEcoActionsListProof } from "../models/ChallengeEcoActionsListProof";

@InputType()
export class InvitationChallengeInput {
  @Field(() => [Int])
  @IsNumber({}, { each: true })
  recipientUserIds: number[];

  @Field()
  challenge: number;
}

// Add
@Resolver()
export class InvitationChallengeResolver {
  // Mutation to insert a notification in the database
  @Mutation(() => [InvitationChallenge])
  async newInvitationChallenge(
    @Ctx() context: { user: User },
    @Arg("input") input: InvitationChallengeInput
  ): Promise<InvitationChallenge[]> {
    const sender = context.user;
    if (!sender) {
      throw new Error("The user is not connected!");
    }
    const { recipientUserIds, challenge } = input;

    const challengeId = await Challenge.findOneBy({ id: challenge });

    if (!challengeId) {
      throw new Error("Challenge doesn't exist");
    }

    const receivers = await User.findBy({
      id: In(recipientUserIds),
    });

    if (!receivers || receivers.length !== recipientUserIds.length) {
      throw new Error("Not all users exist!");
    }

    const invitationChallenge: InvitationChallenge[] = [];

    for (const receiver of receivers) {
      const newInvitation = InvitationChallenge.create({
        sender,
        receiver,
        type: 3,
        isUnread: true,
        challenge: challengeId,
      });

      await newInvitation.save();
      invitationChallenge.push(newInvitation);
    }

    return invitationChallenge;
  }

  // Update Notification Status
  @Mutation(() => InvitationChallenge)
  async updateChallengeInvitationStatus(
    @Ctx() context: { user: User },
    @Arg("id", () => Int) id: number,
    @Arg("status", () => Boolean, { nullable: true }) status: boolean | null,
    @Arg("isUnread", () => Boolean) isUnread: boolean
  ): Promise<InvitationChallenge> {
    const user = context.user;

    if (!user) throw new Error("The user is not connected!");

    const invitation = await InvitationChallenge.findOne({
      relations: {
        challenge: {
          contenders: true,
          ecoActions: true,
        },
      },
      where: {
        id: id,
        receiver: {
          id: context.user.id,
        },
      },
    });

    if (!invitation) throw new Error("Invalid notification id");

    if (status !== null) {
      invitation.status = status;
    }

    invitation.isUnread = isUnread;
    await invitation.save();

    // Mise a jour du challenge et des ecoAction du user
    if (status === true) {
      const challenge = invitation.challenge;

      if (!challenge.contenders.includes(user)) {
        challenge.contenders.push(user);
        challenge.save();

        for (const ecoAction of challenge.ecoActions) {
          const entry = new ChallengeEcoActionsListProof();
          entry.user = user;
          entry.challenge = challenge;
          entry.ecoAction = ecoAction;
          entry.ecoActionIsSelected = false; // Set the initial state
          await entry.save();
        }
      }
    }

    return invitation;
  }
}
