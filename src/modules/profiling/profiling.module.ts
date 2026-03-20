import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfilingService } from './profiling.service';
import { ProfilingController } from './profiling.controller';
import { StudyProfile, StudyProfileSchema } from './schemas/study-profile.schema';
import { EventsModule } from '../events/events.module'; // Add this import
import { CoursesModule } from '../courses/courses.module'; // Add this import

@Module({
  imports: [
    MongooseModule.forFeature([{ name: StudyProfile.name, schema: StudyProfileSchema }]),
    EventsModule, // Register here
    forwardRef(() => CoursesModule),
  ],
  controllers: [ProfilingController],
  providers: [ProfilingService],
  exports: [ProfilingService],
})
export class ProfilingModule {}