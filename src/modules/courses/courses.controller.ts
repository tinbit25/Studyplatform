import { Controller, Post, Get, Body, Query, Param, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // 1. Create Course: POST /courses?fieldId=...
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Query('fieldId') fieldId: string, 
    @Body() data: any
  ) {
    return this.coursesService.create(fieldId, data);
  }

  // 2. Get Courses by Field: GET /courses?fieldId=...
  @Get()
  async getByField(@Query('fieldId') fieldId: string) {
    return this.coursesService.findByField(fieldId);
  }

  // 3. Get Course Details: GET /courses/:courseId
  @Get(':courseId')
  async getDetails(@Param('courseId') courseId: string) {
    return this.coursesService.findOne(courseId);
  }
}