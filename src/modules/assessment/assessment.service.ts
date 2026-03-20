import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Assessment } from './schemas/assessment.schema';
import { Course } from '../courses/schemas/course.schema'; // 👈 Import Course Schema
import { EventsService } from '../events/events.service';
import { ProfilingService } from '../profiling/profiling.service';

@Injectable()
export class AssessmentService {
  constructor(
    @InjectModel(Assessment.name) private assessmentModel: Model<Assessment>,
    @InjectModel(Course.name) private courseModel: Model<Course>, // 👈 Inject this!
    private readonly eventsService: EventsService,
    private readonly profilingService: ProfilingService,
  ) {}


async processDiagnostic(userId: string, data: any) {
  const diagnosticResults = data.scores.map(item => ({
    chapterId: item.chapterId,
    score: item.score,
    status: item.score < 60 ? 'weak' : 'strong'
  }));

  const assessment = await this.assessmentModel.create({
    userId,
    courseId: data.courseId, // 👈 THIS IS THE MISSING LINK
    dailyStudyHours: data.dailyStudyHours,
    examDate: data.examDate,
    diagnosticResults
  });

  await this.eventsService.emit(userId, 'DIAGNOSTIC_COMPLETED', {
    assessmentId: assessment._id,
    weakChapters: diagnosticResults.filter(r => r.status === 'weak').map(r => r.chapterId)
  });

  return assessment;
}

 // src/modules/assessment/assessment.service.ts
// TEMPORARY DEBUG CODE
async findMyExams(userId: string) {
  // 1. Get the fieldId from the user's profile
  const fieldId = await this.profilingService.getFieldIdByUserId(userId);

  // 2. Find all courses tied to that field
  const courses = await this.courseModel.find({ fieldId }).select('_id').exec();
  
  // 3. Map to strings to prevent TypeScript errors
  const courseIds = courses.map(course => course._id.toString());

  // 4. Return exams for those specific courses, sorted by most recent
  return this.assessmentModel
    .find({ courseId: { $in: courseIds } })
    .sort({ createdAt: -1 }) // 👈 Bonus: Shows newest exams first
    .populate('courseId', 'title') 
    .exec();
}}