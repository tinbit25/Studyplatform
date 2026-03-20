import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { StudyProfile } from './schemas/study-profile.schema';
import { EventsService } from '../events/events.service';
import { CoursesService } from '../courses/courses.service'; // 1. Ensure this is imported

@Injectable()
export class ProfilingService {
  constructor(
    @InjectModel(StudyProfile.name) private profileModel: Model<StudyProfile>,
    private readonly eventsService: EventsService,
    private readonly coursesService: CoursesService, // 2. Ensure this is injected
  ) {}

  // ... createProfile and getProfileByUserId remain the same ...
async getFullUserData(userId: string) {
  // 1. Fetch profile and populate the field details
  const profile = await this.profileModel
    .findOne({ userId })
    .populate('fieldId')
    .exec();

  // 2. Safety check: If no profile exists, stop here
  if (!profile) {
    throw new NotFoundException('Profile not found. Please complete onboarding.');
  }

  // 3. Safety check for the Field: Handle the '_id' error
  // We check if fieldId exists before trying to access ._id
  const profileData = profile as any;
  if (!profileData.fieldId) {
    return {
      profile: profileData,
      courses: [],
      message: "Profile exists, but no field has been selected yet."
    };
  }

  // 4. Extract the ID safely (works if populated or if it's just a string)
  const targetFieldId = profileData.fieldId._id || profileData.fieldId;

  // 5. Fetch the curriculum
  const courses = await this.coursesService.findByField(targetFieldId);

  return {
    profile: profileData,
    courses,
    message: `Successfully fetched curriculum for ${profileData.learningStyle} learners.`
  };
}
  async createProfile(userId: string, data: any) { // Ensure this name is correct
    return await this.profileModel.create({ userId, ...data });
  }
// src/modules/profiling/profiling.service.ts

async createOrUpdate(userId: string, createDto: any) {
  try {
    return await this.profileModel.findOneAndUpdate(
      { userId }, 
      { ...createDto, userId }, 
      { 
        upsert: true,   
        runValidators: true,
        returnDocument: 'after', // 👈 Modern way to return the updated doc
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

// Add this method to your existing ProfilingService
async getFieldIdByUserId(userId: string): Promise<Types.ObjectId> {
  const profile = await this.profileModel.findOne({ userId }).exec();
  if (!profile || !profile.fieldId) {
    throw new NotFoundException('Profile or selected field not found');
  }
  return profile.fieldId;
}

}