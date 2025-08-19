import { Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../../user/user.service';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { User } from 'src/user/user.schema';
import { ContextWithJWTPayload } from 'src/auth/types/context';

@Resolver('Me')
export class MeResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @UseGuards(AuthGuard)
  async getMe(@Context() context: ContextWithJWTPayload): Promise<User> {
    // the AuthGard will add the user to the context
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.userService.getById(context.jwtPayload.id);
  }

  @Mutation(() => User)
  @UseGuards(AuthGuard)
  async toggleDebugMode(
    @Context() context: ContextWithJWTPayload,
  ): Promise<User> {
    const currentUser = await this.userService.getById(context.jwtPayload.id);

    if (currentUser.role !== 'admin') {
      throw new ForbiddenException('Only admins can toggle debug mode');
    }

    return this.userService.setDebugMode({
      userId: context.jwtPayload.id,
      enabled: !currentUser.debugModeEnabled,
    });
  }
}
