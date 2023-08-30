import { Arg, Ctx, Mutation, Query } from "type-graphql";
import { User } from "../models/User";
import { Tag } from "../models/Tag";

export class TagResolver {
  @Query(() => [Tag]) // Updated return type to an array of EcoAction
  async getAllTags(): Promise<Tag[]> {
    // Added return type Promise<EcoAction[]>
    const tags = await Tag.find();
    return tags;
  }

  // Query to get one or many eco actions by id
  @Query(() => [Tag])
  async getTagById(@Arg("id") id: number): Promise<Tag[]> {
    const tag = await Tag.find({
      where: { id },
    });

    return tag;
  }

  @Mutation(() => Tag)
  async createTag(@Arg("label") label: string): Promise<Tag> {
    const tag = await Tag.create({
      label,
    }).save();

    return tag;
  }

  @Mutation(() => Tag)
  async updateTag(
    @Arg("id") id: number,
    @Arg("label", { nullable: true }) label?: string
  ): Promise<Tag> {
    const options = { where: { id } };
    const tag = await Tag.findOne(options);

    if (tag == null) throw new Error("Tag not found!");

    if (label != null) tag.label = label;

    await tag.save();

    return tag;
  }

  @Mutation(() => Boolean)
  async deleteTag(
    @Ctx() context: { user: User },
    @Arg("id") id: number
  ): Promise<boolean> {
    const user = context.user;
    if (!user.admin) {
      throw new Error("Only admins can delete eco actions");
    }
    const options = { where: { id } };
    const tag = await Tag.findOne(options);

    if (tag == null) throw new Error("EcoAction not found!");

    await tag.remove();

    return true;
  }
}
