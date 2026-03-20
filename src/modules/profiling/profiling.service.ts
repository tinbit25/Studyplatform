import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { StudyProfile } from './schemas/study-profile.schema';
import { EventsService } from '../events/events.service';
import { CoursesService } from '../courses/courses.service'; 

@Injectable()
export class ProfilingService {
  constructor(
    @InjectModel(StudyProfile.name) private profileModel: Model<StudyProfile>,
    private readonly eventsService: EventsService,
    private readonly coursesService: CoursesService, 
  ) {}

 
async getFullUserData(userId: string) {
  const profile = await this.profileModel
    .findOne({ userId })
    .populate('fieldId')
    .exec();


  if (!profile) {
    throw new NotFoundException('Profile not found. Please complete onboarding.');
  }


  const profileData = profile as any;
  if (!profileData.fieldId) {
    return {
      profile: profileData,
      courses: [],
      message: "Profile exists, but no field has been selected yet."
    };
  }

  const targetFieldId = profileData.fieldId._id || profileData.fieldId;

  const courses = await this.coursesService.findByField(targetFieldId);

  return {
    profile: profileData,
    courses,
    message: `Successfully fetched curriculum for ${profileData.learningStyle} learners.`
  };
}
  async createProfile(userId: string, data: any) { 
    return await this.profileModel.create({ userId, ...data });
  }

async createOrUpdate(userId: string, createDto: any) {
  try {
    return await this.profileModel.findOneAndUpdate(
      { userId }, 
      { ...createDto, userId }, 
      { 
        upsert: true,   
        runValidators: true,
        returnDocument: 'after', 
        setDefaultsOnInsert: true 
      }
    ).exec();
  } catch (error) {
    if (error.code === 11000) {
      return this.profileModel.findOne({ userId }).exec();
    }
    throw error;
  }
}

async getFieldIdByUserId(userId: string): Promise<Types.ObjectId> {
  const profile = await this.profileModel.findOne({ userId }).exec();
  if (!profile || !profile.fieldId) {
    throw new NotFoundException('Profile or selected field not found');
  }
  return profile.fieldId;
}

}