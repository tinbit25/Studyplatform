import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssessmentController } from './assessment.controller';
import { AssessmentService } from './assessment.service';
import { Assessment, AssessmentSchema } from './schemas/assessment.schema';
import { Course, CourseSchema } from '../courses/schemas/course.schema'; 
import { EventsModule } from '../events/events.module';
import { ProfilingModule } from '../profiling/profiling.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Assessment.name, schema: AssessmentSchema },
      { name: Course.name, schema: CourseSchema }, 
    ]),
    EventsModule,
    ProfilingModule,
  ],
  controllers: [AssessmentController],
  providers: [AssessmentService],
})
export class AssessmentModule {}