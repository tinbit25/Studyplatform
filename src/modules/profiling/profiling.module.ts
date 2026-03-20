import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfilingService } from './profiling.service';
import { ProfilingController } from './profiling.controller';
import { StudyProfile, StudyProfileSchema } from './schemas/study-profile.schema';
import { EventsModule } from '../events/events.module'; 
import { CoursesModule } from '../courses/courses.module'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: StudyProfile.name, schema: StudyProfileSchema }]),
    EventsModule, 
    forwardRef(() => CoursesModule),
  ],
  controllers: [ProfilingController],
  providers: [ProfilingService],
  exports: [ProfilingService],
})
export class ProfilingModule {}