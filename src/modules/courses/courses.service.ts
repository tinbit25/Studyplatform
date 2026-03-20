import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './schemas/course.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
  ) {}

  // POST /courses?fieldId=...
  async create(fieldId: string, data: any) {
    return this.courseModel.create({ ...data, fieldId });
  }

  // GET /courses?fieldId=...
  async findByField(fieldId: string) {
    return this.courseModel.find({ fieldId, isActive: true }).exec();
  }

  // GET /courses/:courseId
  async findOne(id: string) {
    const course = await this.courseModel.findById(id).exec();
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }
}