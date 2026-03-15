import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfilingService } from './profiling.service';
import { ProfilingController } from './profiling.controller';
import { StudyProfile, StudyProfileSchema } from './schemas/study-profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: StudyProfile.name, schema: StudyProfileSchema }]),
  ],
  controllers: [ProfilingController],
  providers: [ProfilingService],
})
export class ProfilingModule {}