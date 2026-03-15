import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudyProfile } from './schemas/study-profile.schema';

@Injectable()
export class ProfilingService {
  constructor(@InjectModel(StudyProfile.name) private profileModel: Model<StudyProfile>) {}

  async createProfile(userId: string, data: any) {
    const profile = new this.profileModel({ userId, ...data });
    return profile.save();
  }

  async getProfileByUserId(userId: string) {
    return this.profileModel.findOne({ userId }).exec();
  }
}