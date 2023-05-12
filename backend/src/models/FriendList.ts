import { Entity, ManyToOne, JoinTable, BaseEntity } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { User } from ".";

@ObjectType()
@Entity({ name: "friend_list" })
export default class FriendList extends BaseEntity {
  @Field(() => [User])
  @ManyToOne(() => User, (user) => user.id)
  @JoinTable()
  user_id: number;

  @Field(() => [User])
  @ManyToOne(() => User, (user) => user.id)
  @JoinTable()
  friend_id: number;
}
