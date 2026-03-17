import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssessmentService } from './assessment.service';
import { AssessmentController } from './assessment.controller';
import { Assessment, AssessmentSchema } from './schemas/assessment.schema';
import { EventsModule } from '../events/events.module'; // Added this

@Module({
  imports: [
    // 1. Register the Schema so "AssessmentModel" is available
    MongooseModule.forFeature([{ name: Assessment.name, schema: AssessmentSchema }]),
    // 2. Import EventsModule so AssessmentService can use EventsService
    EventsModule 
  ],
  controllers: [AssessmentController],
  providers: [AssessmentService],
})
export class AssessmentModule {}