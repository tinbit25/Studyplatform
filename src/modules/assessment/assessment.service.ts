import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Assessment } from './schemas/assessment.schema';
import { Course } from '../courses/schemas/course.schema'; 
import { EventsService } from '../events/events.service';
import { ProfilingService } from '../profiling/profiling.service';

@Injectable()
export class AssessmentService {
  constructor(
    @InjectModel(Assessment.name) private assessmentModel: Model<Assessment>,
    @InjectModel(Course.name) private courseModel: Model<Course>, 
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
    courseId: data.courseId, 
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

 
async findMyExams(userId: string) {
  const fieldId = await this.profilingService.getFieldIdByUserId(userId);

  const courses = await this.courseModel.find({ fieldId }).select('_id').exec();
  
  const courseIds = courses.map(course => course._id.toString());

  return this.assessmentModel
    .find({ courseId: { $in: courseIds } })
    .sort({ createdAt: -1 }) 
    .populate('courseId', 'title') 
    .exec();
}}