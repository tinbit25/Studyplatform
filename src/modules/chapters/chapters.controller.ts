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

  /**
   * 1. Create Chapter
   * POST /chapters?courseId=...
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Query('courseId') courseId: string, 
    @Body() data: any
  ) {
    if (!courseId) throw new BadRequestException('courseId query parameter is required');
    return this.chaptersService.create(courseId, data);
  }

  /**
   * 2. Get Chapters by Course
   * GET /chapters?courseId=...
   */
  @Get()
  async getByCourse(@Query('courseId') courseId: string) {
    if (!courseId) throw new BadRequestException('courseId query parameter is required');
    return this.chaptersService.findByCourse(courseId);
  }

  /**
   * 3. Get Chapter Details
   * GET /chapters/:chapterId
   */
  @Get(':chapterId')
  async getDetails(@Param('chapterId') chapterId: string) {
    return this.chaptersService.findOne(chapterId);
  }

  /**
   * 4. Create Contents (Upload Doc, VID, TXT, AUDIO)
   * POST /chapters/:chapterId/content
   */
  @Post(':chapterId/content')
  @UseGuards(JwtAuthGuard)
  async uploadContent(@Param('chapterId') chapterId: string, @Request() req: any) {
    // If it's a simple JSON Note (No File)
    if (!req.isMultipart()) {
      return this.chaptersService.addContent(chapterId, req.body);
    }

    const data = await req.file();
    if (!data) throw new BadRequestException('No file provided');

    // Create unique filename and absolute path
    const filename = `${Date.now()}-${data.filename}`;
    const uploadDir = join(process.cwd(), 'uploads');
    const savePath = join(uploadDir, filename);

    // Stream file to disk
    await pump(data.file, fs.createWriteStream(savePath));

    // Prepare database object
    const contentData = {
      contentType: data.fields.contentType?.value || 'doc',
      title: data.fields.title?.value || data.filename,
      url: `/uploads/${filename}`,
      body: data.fields.body?.value || null, // Capture body for text notes
    };

    return this.chaptersService.addContent(chapterId, contentData);
  }

  /**
   * 5. Get Chapter Content
   * GET /chapters/:chapterId/content
   */
  @Get(':chapterId/content')
  async getChapterContent(@Param('chapterId') chapterId: string) {
    return this.chaptersService.getContents(chapterId);
  }
}