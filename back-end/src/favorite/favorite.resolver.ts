import {
  Resolver,
  Mutation,
  Query,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { UserFavorite } from './favorite.schema';
import { Activity } from '../activity/activity.schema';
import { UserFavoriteWithActivity } from './favorite-with-activity.dto';
import {
  AddToFavoritesInput,
  RemoveFromFavoritesInput,
  ReorderFavoritesInput,
} from './favorite.inputs.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Resolver(() => UserFavorite)
export class FavoriteResolver {
  constructor(
    private readonly favoriteService: FavoriteService,
    @InjectModel(Activity.name) private activityModel: Model<Activity>,
  ) {}

  @Mutation(() => UserFavorite)
  @UseGuards(AuthGuard)
  async addToFavorites(
    @Args('input') input: AddToFavoritesInput,
    @CurrentUser() jwtPayload: any,
  ): Promise<UserFavorite> {
    return this.favoriteService.addToFavorites(jwtPayload.id, input.activityId);
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async removeFromFavorites(
    @Args('input') input: RemoveFromFavoritesInput,
    @CurrentUser() jwtPayload: any,
  ): Promise<boolean> {
    await this.favoriteService.removeFromFavorites(
      jwtPayload.id,
      input.activityId,
    );
    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async reorderFavorites(
    @Args('input') input: ReorderFavoritesInput,
    @CurrentUser() jwtPayload: any,
  ): Promise<boolean> {
    await this.favoriteService.reorderFavorites(
      jwtPayload.id,
      input.activityIds,
    );
    return true;
  }

  @Query(() => [UserFavoriteWithActivity])
  @UseGuards(AuthGuard)
  async getUserFavorites(@CurrentUser() jwtPayload: any): Promise<UserFavoriteWithActivity[]> {
    return this.favoriteService.getUserFavoritesWithOrder(jwtPayload.id);
  }

  @Query(() => Boolean)
  @UseGuards(AuthGuard)
  async isFavorite(
    @Args('activityId', { type: () => ID }) activityId: string,
    @CurrentUser() jwtPayload: any,
  ): Promise<boolean> {
    return this.favoriteService.isFavorite(jwtPayload.id, activityId);
  }

  @ResolveField(() => Activity)
  async activity(@Parent() userFavorite: UserFavorite): Promise<Activity> {
    const activity = await this.activityModel
      .findById(userFavorite.activity)
      .exec();
    if (!activity) {
      throw new Error(`Activity with ID ${userFavorite.activity} not found`);
    }
    return activity;
  }
}
