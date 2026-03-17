import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post() // Admin creates a course
  async create(@Body() body: { title: string, fieldId: string, description: string }) {
    return this.coursesService.create(body);
  }

  @Get('field/:fieldId') // User views courses in their chosen field
  async getByField(@Param('fieldId') fieldId: string) {
    return this.coursesService.findByField(fieldId);
  }
}