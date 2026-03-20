import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChaptersController } from './chapters.controller';
import { ChaptersService } from './chapters.service';
import { Chapter, ChapterSchema } from './schemas/chapter.schema';
import { Course, CourseSchema } from '../courses/schemas/course.schema'; 
import { ProfilingModule } from '../profiling/profiling.module'; 
@Module({
  imports: [
   MongooseModule.forFeature([
      { name: Chapter.name, schema: ChapterSchema },
      { name: Course.name, schema: CourseSchema }, 
    ]),
    ProfilingModule,
  ],
  controllers: [ChaptersController],
  providers: [ChaptersService],

})
export class ChaptersModule {}