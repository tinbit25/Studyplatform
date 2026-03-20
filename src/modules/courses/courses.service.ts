import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProfilingService } from '../profiling/profiling.service';
import { Model } from 'mongoose';
import { Course } from './schemas/course.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @Inject(forwardRef(() => ProfilingService))
    private readonly profilingService: ProfilingService, // Inject Profiling here
  ) {}

  async create(data: any) {
    return this.courseModel.create(data);
  }

  async findByField(fieldId: string) {
    return this.courseModel.find({ fieldId, isActive: true }).exec();
  }
  // Inject ProfilingService in the constructor first
async findMyCourses(userId: string) {
  const fieldId = await this.profilingService.getFieldIdByUserId(userId);
  return this.courseModel.find({ fieldId }).exec();
}
}