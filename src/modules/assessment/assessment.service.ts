import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Assessment } from './schemas/assessment.schema';
import { EventsService } from '../events/events.service';

@Injectable()
export class AssessmentService {
  constructor(
    @InjectModel(Assessment.name) private assessmentModel: Model<Assessment>,
    private readonly eventsService: EventsService
  ) {}

  async processDiagnostic(userId: string, data: any) {
    // Logic: Mark chapters with score < 60 as 'weak'
    const diagnosticResults = data.scores.map(item => ({
      chapterId: item.chapterId,
      score: item.score,
      status: item.score < 60 ? 'weak' : 'strong'
    }));

    const assessment = await this.assessmentModel.create({
      userId,
      dailyStudyHours: data.dailyStudyHours,
      examDate: data.examDate,
      diagnosticResults
    });

    // EMIT EVENT: This tells the Scheduling Module to start working
    await this.eventsService.emit(userId, 'DIAGNOSTIC_COMPLETED', {
      assessmentId: assessment._id,
      weakChapters: diagnosticResults.filter(r => r.status === 'weak').map(r => r.chapterId)
    });

    return assessment;
  }
}