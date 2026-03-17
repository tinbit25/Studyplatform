import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Assessment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  dailyStudyHours: number;

  @Prop({ required: true })
  examDate: Date;

  @Prop({
    type: [
      {
        chapterId: { type: Types.ObjectId, ref: 'Chapter' },
        score: Number,
        status: { type: String, enum: ['strong', 'weak'], default: 'weak' }
      }
    ]
  })
  diagnosticResults: any[];
}

export const AssessmentSchema = SchemaFactory.createForClass(Assessment);