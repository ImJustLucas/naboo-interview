import { Field, InputType, ID } from '@nestjs/graphql';
import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';

@InputType()
export class AddToFavoritesInput {
  @Field(() => ID)
  @IsString()
  activityId!: string;
}

@InputType()
export class RemoveFromFavoritesInput {
  @Field(() => ID)
  @IsString()
  activityId!: string;
}

@InputType()
export class ReorderFavoritesInput {
  @Field(() => [ID])
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  activityIds!: string[];
}
