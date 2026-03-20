import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Chapter extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true, index: true })
  courseId: Types.ObjectId;

  @Prop({ default: 0 })
  order: number;

  @Prop({
    type: [
      {
        contentType: { type: String, enum: ['video', 'note', 'quiz'], required: true },
        title: String,
        url: String,   // For video links
        body: String,  // For markdown text notes
      },
    ],
  })
  content: any[];
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);