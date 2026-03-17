import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Field extends Document {
  @Prop({ required: true, unique: true })
  name: string; // e.g., "Accounting & Finance"

  @Prop()
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Course' }] })
  courses: Types.ObjectId[]; // Links to the Courses module

  @Prop({ default: true })
  isActive: boolean;
}

export const FieldSchema = SchemaFactory.createForClass(Field);