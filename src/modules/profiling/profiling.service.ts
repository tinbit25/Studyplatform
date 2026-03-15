import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudyProfile } from './schemas/study-profile.schema';
import { EventsService } from '../events/events.service'; // Import the new service

@Injectable()
export class ProfilingService {
  constructor(
    @InjectModel(StudyProfile.name) private profileModel: Model<StudyProfile>,
    private readonly eventsService: EventsService, // Inject the Global EventsService
  ) {}

  async createProfile(userId: string, data: any) {
    // 1. Persist the profile data
    const profile = await this.profileModel.create({ userId, ...data });

    // 2. Emit event for AI Analytics (Behavioral Tracking)
    // This satisfies Section 14 & 15 of your Architecture Doc
    await this.eventsService.emit(userId, 'USER_PROFILE_CREATED', {
      learningStyle: data.learningStyle,
      interests: data.interests,
      availability: data.availability,
    });

    return profile;
  }

  async getProfileByUserId(userId: string) {
    return this.profileModel.findOne({ userId }).exec();
  }
}