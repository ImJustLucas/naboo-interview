import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from './user.schema';
import { UserService } from './user.service';
import { FavoriteService } from '../favorite/favorite.service';
import { Activity } from '../activity/activity.schema';
import { ContextWithJWTPayload } from 'src/auth/types/context';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly favoriteService: FavoriteService,
  ) {}

  @ResolveField(() => Boolean, { nullable: true })
  async debugModeEnabled(
    @Parent() user: User,
    @Context() context?: ContextWithJWTPayload,
  ): Promise<boolean | null> {
    if (!context) return null;

    try {
      const currentUser = await this.userService.getById(context.jwtPayload.id);

      return currentUser.role === 'admin' ? user.debugModeEnabled : null;
    } catch {
      return null;
    }
  }

  @ResolveField(() => [Activity])
  async favorites(@Parent() user: User): Promise<Activity[]> {
    return this.favoriteService.getUserFavorites(user.id);
  }

  @ResolveField(() => Number)
  async favoritesCount(@Parent() user: User): Promise<number> {
    return this.favoriteService.getFavoritesCount(user.id);
  }
}
