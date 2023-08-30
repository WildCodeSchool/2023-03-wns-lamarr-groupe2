import { Arg, Ctx, Mutation, Query } from "type-graphql";
import { EcoAction } from "../models/EcoAction";
import { User } from "../models/User";

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
    if (!user.admin) {
      throw new Error("Only admins can delete eco actions");
    }
    const options = { where: { id } };
    const ecoAction = await EcoAction.findOne(options);

    if (ecoAction == null) throw new Error("EcoAction not found!");

    await ecoAction.remove();

    return true;
  }
}
