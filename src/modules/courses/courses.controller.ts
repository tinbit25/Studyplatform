import { Controller, Post, Get, Body, Query, Param, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

 
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Query('fieldId') fieldId: string, 
    @Body() data: any
  ) {
    return this.coursesService.create(fieldId, data);
  }

  @Get()
  async getByField(@Query('fieldId') fieldId: string) {
    return this.coursesService.findByField(fieldId);
  }

  @Get(':courseId')
  async getDetails(@Param('courseId') courseId: string) {
    return this.coursesService.findOne(courseId);
  }
}