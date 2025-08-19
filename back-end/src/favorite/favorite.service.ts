import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserFavorite } from './favorite.schema';
import { Activity } from '../activity/activity.schema';
import { User } from '../user/user.schema';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(UserFavorite.name)
    private userFavoriteModel: Model<UserFavorite>,
    @InjectModel(Activity.name)
    private activityModel: Model<Activity>,
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async addToFavorites(
    userId: string,
    activityId: string,
  ): Promise<UserFavorite> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const activity = await this.activityModel.findById(activityId);
    if (!activity) {
      throw new NotFoundException('Activity not found');
    }

    const existingFavorite = await this.userFavoriteModel.findOne({
      user: userId,
      activity: activityId,
    });

    if (existingFavorite) {
      throw new ConflictException('Activity is already in favorites');
    }

    const lastFavorite = await this.userFavoriteModel
      .findOne({ user: userId })
      .sort({ order: -1 })
      .limit(1);

    const nextOrder = lastFavorite ? lastFavorite.order + 1 : 1;

    const favorite = new this.userFavoriteModel({
      user: userId,
      activity: activityId,
      order: nextOrder,
    });

    return favorite.save();
  }

  async removeFromFavorites(userId: string, activityId: string): Promise<void> {
    const favorite = await this.userFavoriteModel.findOne({
      user: userId,
      activity: activityId,
    });

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    const removedOrder = favorite.order;

    await this.userFavoriteModel.deleteOne({
      user: userId,
      activity: activityId,
    });

    await this.userFavoriteModel.updateMany(
      {
        user: userId,
        order: { $gt: removedOrder },
      },
      {
        $inc: { order: -1 },
      },
    );
  }

  async getUserFavorites(userId: string): Promise<Activity[]> {
    const favorites = await this.userFavoriteModel
      .find({ user: userId })
      .populate('activity')
      .sort({ order: 1 })
      .exec();

    return favorites.map((favorite) => favorite.activity as Activity);
  }

  async reorderFavorites(userId: string, activityIds: string[]): Promise<void> {
    if (!activityIds || activityIds.length === 0) {
      throw new BadRequestException('Activity IDs array cannot be empty');
    }

    const userFavorites = await this.userFavoriteModel.find({
      user: userId,
      activity: { $in: activityIds },
    });

    if (userFavorites.length !== activityIds.length) {
      throw new BadRequestException(
        'Some activities are not in user favorites',
      );
    }

    const updatePromises = activityIds.map((activityId, index) =>
      this.userFavoriteModel.updateOne(
        { user: userId, activity: activityId },
        { order: index + 1 },
      ),
    );

    await Promise.all(updatePromises);
  }

  async isFavorite(userId: string, activityId: string): Promise<boolean> {
    const favorite = await this.userFavoriteModel.findOne({
      user: userId,
      activity: activityId,
    });

    return !!favorite;
  }

  async getFavoritesCount(userId: string): Promise<number> {
    return this.userFavoriteModel.countDocuments({ user: userId });
  }
}
