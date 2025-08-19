import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../user/user.schema';
import { Activity } from '../activity/activity.schema';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema({ timestamps: true })
export class UserFavorite extends Document {
  @Field(() => ID)
  id!: string;

  @Field(() => User)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user!: User;

  @Field(() => Activity)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity',
    required: true,
  })
  activity!: Activity;

  @Field()
  @Prop({ required: true })
  order!: number;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

export const UserFavoriteSchema = SchemaFactory.createForClass(UserFavorite);

UserFavoriteSchema.index({ user: 1, activity: 1 }, { unique: true });

UserFavoriteSchema.index({ user: 1, order: 1 });
