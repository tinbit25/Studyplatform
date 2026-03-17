import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './modules/app/app.controller';
import { AppService } from './modules/app/app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module'; 
import { ProfilingModule } from './modules/profiling/profiling.module'; 
import { EventsModule } from './modules/events/events.module';
import { QuizModule } from './modules/quiz/quiz.module';
import { FieldsModule } from './modules/fields/fields.module';
import { CoursesModule } from './modules/courses/courses.module';
import { ChaptersModule } from './modules/chapters/chapters.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    AuthModule,
    UsersModule,
    ProfilingModule,
    EventsModule,
    QuizModule,
    FieldsModule,
    CoursesModule,
    ChaptersModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}