import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema({ timestamps: true })
export class StudyProfile extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  learningStyle: string; 

  @Prop({ type: [String] })
  interests: string[];

  @Prop({ type: Object })
  availability: {
    weekdays: number; 
    weekends: number;
  };

  // Change 'selectedFieldId' to 'fieldId' to match your populate() call
  @Prop({ type: Types.ObjectId, ref: 'Field', required: true })
  fieldId: Types.ObjectId; 
}
export const StudyProfileSchema = SchemaFactory.createForClass(StudyProfile);