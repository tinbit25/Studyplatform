import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chapter } from './schemas/chapter.schema';
import { Course } from '../courses/schemas/course.schema'; // Add this
import { ProfilingService } from '../profiling/profiling.service'; // Add this
import { CreateChapterDto } from './dto/create-chapter.dto';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectModel(Chapter.name) private chapterModel: Model<Chapter>,
    @InjectModel(Course.name) private courseModel: Model<Course>, // Inject Course
    private readonly profilingService: ProfilingService, // Inject Profiling
  ) {}

  async create(createChapterDto: CreateChapterDto) {
    const newChapter = new this.chapterModel(createChapterDto);
    return newChapter.save();
  }

  async findAllByCourse(courseId: string) {
    return this.chapterModel.find({ courseId }).sort({ order: 1 }).exec();
  }
// src/modules/chapters/chapters.service.ts

async findMyChapters(userId: string) {
  // 1. Get the user's field from the profile
  const fieldId = await this.profilingService.getFieldIdByUserId(userId);

  // 2. Find all courses belonging to that field
  const courses = await this.courseModel.find({ fieldId }).select('_id').exec();
  const courseIds = courses.map(course => course._id);

  // 3. Find chapters and POPULATE the course details
  return this.chapterModel
    .find({ courseId: { $in: courseIds } })
    .populate('courseId', 'title') // 👈 This adds the Course Title to the result
    .sort({ order: 1 }) // Keep them in order
    .exec();
}}