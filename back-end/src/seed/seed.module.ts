import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityService } from 'src/activity/services/activity.service';
import { Activity, ActivitySchema } from 'src/activity/schemas/activity.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/services/user.service';
import { ActivityModule } from '../activity/activity.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Activity.name, schema: ActivitySchema },
    ]),
    UserModule,
    ActivityModule,
  ],
  providers: [UserService, ActivityService],
})
export class SeedModule {}
