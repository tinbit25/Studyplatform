import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chapter } from './schemas/chapter.schema';
import { CreateChapterDto } from './dto/create-chapter.dto';

@Injectable()
export class ChaptersService {
  constructor(@InjectModel(Chapter.name) private chapterModel: Model<Chapter>) {}

  async create(createChapterDto: CreateChapterDto) {
    const newChapter = new this.chapterModel(createChapterDto);
    return newChapter.save();
  }

  async findAllByCourse(courseId: string) {
    return this.chapterModel.find({ courseId }).sort({ order: 1 }).exec();
  }
}