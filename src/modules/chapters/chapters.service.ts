import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chapter } from './schemas/chapter.schema';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectModel(Chapter.name) private chapterModel: Model<Chapter>,
  ) {}

  async create(courseId: string, data: any) {
    return this.chapterModel.create({ ...data, courseId });
  }

  async findByCourse(courseId: string) {
    return this.chapterModel.find({ courseId }).sort({ order: 1 }).exec();
  }

  async findOne(id: string) {
    const chapter = await this.chapterModel.findById(id).populate('courseId', 'title').exec();
    if (!chapter) throw new NotFoundException('Chapter not found');
    return chapter;
  }

async addContent(chapterId: string, contentData: any) {
  const updated = await this.chapterModel.findByIdAndUpdate(
    chapterId,
    { $push: { content: contentData } },
    { returnDocument: 'after' }
  );
  if (!updated) throw new NotFoundException('Chapter not found');
  return updated.content;
}

async getContents(chapterId: string) {
  const chapter = await this.chapterModel.findById(chapterId).select('content').exec();
  if (!chapter) throw new NotFoundException('Chapter not found');
  return chapter.content;
}

}