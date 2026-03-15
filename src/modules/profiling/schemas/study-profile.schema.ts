import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class StudyProfile extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId; // Link to User entity

  @Prop({ required: true })
  learningStyle: string; 
  @Prop({ type: [String] })
  interests: string[];

  @Prop({ type: Object })
  availability: {
    weekdays: number; 
    weekends: number;
  };
}

export const StudyProfileSchema = SchemaFactory.createForClass(StudyProfile);