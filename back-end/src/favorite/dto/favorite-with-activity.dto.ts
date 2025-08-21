import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { Activity } from 'src/activity/schemas/activity.schema';

@ObjectType()
export class UserFavoriteWithActivity {
  @Field(() => ID)
  id!: string;

  @Field(() => Activity)
  activity!: Activity;

  @Field(() => Int)
  order!: number;

  @Field()
  createdAt!: Date;
}