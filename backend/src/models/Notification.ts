import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export default class Notification extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  sender_id: number;

  @Field()
  @Column()
  recipient_id: number;

  @Field()
  @Column()
  type: number;

  @Field()
  @Column({ type: "timestamp", default: () => "now()" })
  send_date: Date;
}
