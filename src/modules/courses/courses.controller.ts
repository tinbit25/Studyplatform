import { Controller, Post, Get, UseGuards, Request,Body, Param } from '@nestjs/common';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get('field/:fieldId')
  async getByField(@Param('fieldId') fieldId: string) {
    return this.coursesService.findByField(fieldId);
  }
  @Get('my-courses')
@UseGuards(JwtAuthGuard)
async getMyCourses(@Request() req) {
  return this.coursesService.findMyCourses(req.user.userId);
}
}