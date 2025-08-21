import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserFavorite, UserFavoriteSchema } from './schemas/favorite.schema';
import { Activity, ActivitySchema } from '../activity/schemas/activity.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { FavoriteService } from './services/favorite.service';
import { FavoriteResolver } from './resolvers/favorite.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserFavorite.name, schema: UserFavoriteSchema },
      { name: Activity.name, schema: ActivitySchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [FavoriteService, FavoriteResolver],
  exports: [FavoriteService],
})
export class FavoriteModule {}
