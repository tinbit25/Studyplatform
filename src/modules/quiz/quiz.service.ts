import { Injectable } from '@nestjs/common';
import { EventsService } from '../events/events.service';

@Injectable()
export class QuizService {
  constructor(private readonly eventsService: EventsService) {}

  async submitResult(userId: string, quizId: string, score: number) {
    
    
    
    await this.eventsService.emit(userId, 'QUIZ_COMPLETED', {
      quizId,
      score,
      timestamp: new Date()
    });

    return { success: true, message: 'Result captured for AI analysis' };
  }
}