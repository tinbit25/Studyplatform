import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './schemas/course.schema';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async create(data: any) {
    return this.courseModel.create(data);
  }

  async findByField(fieldId: string) {
    return this.courseModel.find({ fieldId, isActive: true }).exec();
  }
}