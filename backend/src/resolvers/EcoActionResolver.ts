import { Arg, Ctx, Mutation, Query } from "type-graphql";
import { EcoAction } from "../models/EcoAction";
import { User } from "../models/User";
import { Challenge } from "../models/Challenge";

export class EcoActionResolver {
  @Query(() => [EcoAction]) // Updated return type to an array of EcoAction
  async getAllEcoActions(): Promise<EcoAction[]> {
    // Added return type Promise<EcoAction[]>
    const ecoActions = await EcoAction.find();
    return ecoActions;
  }

  // Query to get one or many eco actions by id
  @Query(() => [EcoAction])
  async getEcoActionById(@Arg("id") id: number): Promise<EcoAction[]> {
    const ecoAction = await EcoAction.find({
      where: { id },
    });

    return ecoAction;
  }

  @Mutation(() => EcoAction)
  async createEcoAction(
    @Arg("label") label: string,
    @Arg("points") points: number,
    @Arg("difficulty") difficulty: number,
    @Arg("need_proof") needProof: boolean
  ): Promise<EcoAction> {
    const ecoAction = await EcoAction.create({
      label,
      points,
      difficulty,
      need_proof: needProof,
    }).save();

    return ecoAction;
  }

  @Mutation(() => EcoAction)
  async updateEcoAction(
    @Arg("id") id: number,
    @Arg("label", { nullable: true }) label?: string,
    @Arg("points", { nullable: true }) points?: number,
    @Arg("difficulty", { nullable: true }) difficulty?: number,
    @Arg("need_proof", { nullable: true }) needProof?: boolean
  ): Promise<EcoAction> {
    const options = { where: { id } };
    const ecoAction = await EcoAction.findOne(options);

    if (ecoAction == null) throw new Error("EcoAction not found!");

    if (label != null) ecoAction.label = label;
    if (points != null) ecoAction.points = points;
    if (difficulty != null) ecoAction.difficulty = difficulty;
    if (needProof != null) ecoAction.need_proof = needProof;

    await ecoAction.save();

    return ecoAction;
  }

  @Mutation(() => Boolean)
  async deleteEcoAction(
    @Ctx() context: { user: User },
    @Arg("id") id: number
  ): Promise<boolean> {
    const user = context.user;

    if (!user) throw new Error(`The user is not connected`);

    if (!user.admin) {
      throw new Error("Only admins can delete eco actions");
    }
    const options = { where: { id } };
    const ecoAction = await EcoAction.findOne(options);

    if (ecoAction == null) throw new Error("EcoAction not found!");

    await ecoAction.remove();

    return true;
  }

  @Query(() => Boolean)
  async getEcoActionSelectionStatus(
    @Ctx() context: { user: User },
    @Arg("challengeId") challengeId: number,
    @Arg("ecoActionId") ecoActionId: number
  ): Promise<boolean> {
    const user = context.user;

    const challenge = await Challenge.findOne({
      relations: { challengeEcoActionsListProof: true },
      where: { id: challengeId },
    });

    if (!challenge) {
      throw new Error("Challenge not found!");
    }

    // Find the selection proof entry for the user and ecoAction concerned
    const entry = challenge.challengeEcoActionsListProof.find(
      (entry) => entry.user.id === user.id && entry.ecoAction.id === ecoActionId
    );

    if (!entry) {
      throw new Error("Entry not found!");
    }

    return entry.ecoActionIsSelected;
  }

  @Mutation(() => Boolean)
  async updateEcoActionStatus(
    @Ctx() context: { user: User },
    @Arg("challengeId") challengeId: number,
    @Arg("ecoActionId") ecoActionId: number,
    @Arg("isSelected") isSelected: boolean
  ): Promise<boolean> {
    const user = context.user;

    // See if challenge exists, else return error
    const challenge = await Challenge.findOne({
      relations: { challengeEcoActionsListProof: true },
      where: { id: challengeId },
    });

    if (!challenge) {
      throw new Error("Challenge not found!");
    }

    // Find the current selection proof entry for the user and ecoAction concerned
    const entry = challenge.challengeEcoActionsListProof.find(
      (entry) => entry.user.id === user.id && entry.ecoAction.id === ecoActionId
    );

    if (!entry) {
      throw new Error("Entry not found!");
    }

    // Update the ecoActionIsSelected status with the argument given
    entry.ecoActionIsSelected = isSelected;
    await entry.save();

    return true;
  }
}
