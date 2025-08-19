import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { Activity, ActivitySchema } from 'src/activity/activity.schema';
import { FavoriteModule } from '../favorite/favorite.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Activity.name, schema: ActivitySchema },
    ]),
    FavoriteModule,
  ],
  exports: [UserService],
  providers: [UserService, UserResolver],
})
export class UserModule {}
