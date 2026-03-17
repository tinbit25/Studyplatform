import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Question extends Document {
  @Prop({ required: true })
  text: string;

  @Prop({ type: [String], required: true })
  options: string[];

  @Prop({ required: true })
  correctAnswer: string;

  @Prop({ default: 'medium' })
  difficulty: 'easy' | 'medium' | 'hard';

  @Prop()
  topic: string; 
}
export const QuestionSchema = SchemaFactory.createForClass(Question);