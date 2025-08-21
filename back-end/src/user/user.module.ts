import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './services/user.service';
import { UserResolver } from './resolvers/user.resolver';
import { Activity, ActivitySchema } from 'src/activity/schemas/activity.schema';
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
