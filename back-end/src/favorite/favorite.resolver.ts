import { Resolver, Mutation, Query, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { UserFavorite } from './favorite.schema';
import { Activity } from '../activity/activity.schema';
import {
  AddToFavoritesInput,
  RemoveFromFavoritesInput,
  ReorderFavoritesInput,
} from './favorite.inputs.dto';

@Resolver(() => UserFavorite)
export class FavoriteResolver {
  constructor(private readonly favoriteService: FavoriteService) {}

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

  @Query(() => [Activity])
  @UseGuards(AuthGuard)
  async getUserFavorites(@CurrentUser() jwtPayload: any): Promise<Activity[]> {
    return this.favoriteService.getUserFavorites(jwtPayload.id);
  }

  @Query(() => Boolean)
  @UseGuards(AuthGuard)
  async isFavorite(
    @Args('activityId', { type: () => ID }) activityId: string,
    @CurrentUser() jwtPayload: any,
  ): Promise<boolean> {
    return this.favoriteService.isFavorite(jwtPayload.id, activityId);
  }
}
