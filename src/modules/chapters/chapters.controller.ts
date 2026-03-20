import { 
  Controller, Post, Get, Body, Param, Query, 
  Request, UseGuards, BadRequestException 
} from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import * as fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { join } from 'path';

const pump = promisify(pipeline);

@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}


  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Query('courseId') courseId: string, 
    @Body() data: any
  ) {
    if (!courseId) throw new BadRequestException('courseId query parameter is required');
    return this.chaptersService.create(courseId, data);
  }

  @Get()
  async getByCourse(@Query('courseId') courseId: string) {
    if (!courseId) throw new BadRequestException('courseId query parameter is required');
    return this.chaptersService.findByCourse(courseId);
  }

 
  @Get(':chapterId')
  async getDetails(@Param('chapterId') chapterId: string) {
    return this.chaptersService.findOne(chapterId);
  }

 
  @Post(':chapterId/content')
  @UseGuards(JwtAuthGuard)
  async uploadContent(@Param('chapterId') chapterId: string, @Request() req: any) {
   
    if (!req.isMultipart()) {
      return this.chaptersService.addContent(chapterId, req.body);
    }

    const data = await req.file();
    if (!data) throw new BadRequestException('No file provided');

  
    const filename = `${Date.now()}-${data.filename}`;
    const uploadDir = join(process.cwd(), 'uploads');
    const savePath = join(uploadDir, filename);

    await pump(data.file, fs.createWriteStream(savePath));

    const contentData = {
      contentType: data.fields.contentType?.value || 'doc',
      title: data.fields.title?.value || data.filename,
      url: `/uploads/${filename}`,
      body: data.fields.body?.value || null, 
    };

    return this.chaptersService.addContent(chapterId, contentData);
  }


  @Get(':chapterId/content')
  async getChapterContent(@Param('chapterId') chapterId: string) {
    return this.chaptersService.getContents(chapterId);
  }
}