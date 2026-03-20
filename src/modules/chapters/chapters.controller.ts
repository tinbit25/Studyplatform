import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Post() // This handler MUST exist to stop the 404
  async create(@Body() createChapterDto: CreateChapterDto) {
    return this.chaptersService.create(createChapterDto);
  }

  @Get('course/:courseId')
  async getByCourse(@Param('courseId') courseId: string) {
    return this.chaptersService.findAllByCourse(courseId);
  }
  @Get('my-content')
@UseGuards(JwtAuthGuard)
async getMyContent(@Request() req) {
  return this.chaptersService.findMyChapters(req.user.userId);
}
}