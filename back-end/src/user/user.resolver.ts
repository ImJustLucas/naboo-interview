import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from './user.schema';
import { UserService } from './user.service';
import { ContextWithJWTPayload } from 'src/auth/types/context';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

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
}
