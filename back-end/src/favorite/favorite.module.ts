import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserFavorite, UserFavoriteSchema } from './favorite.schema';
import { Activity, ActivitySchema } from '../activity/activity.schema';
import { User, UserSchema } from '../user/user.schema';
import { FavoriteService } from './favorite.service';
import { FavoriteResolver } from './favorite.resolver';

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
