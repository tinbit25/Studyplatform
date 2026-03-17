import { Controller, Post, Get, Body, Param } from '@nestjs/common';
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
}