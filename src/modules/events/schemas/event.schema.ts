import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class EventLog extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  eventType: string; // e.g., 'USER_REGISTERED', 'PROFILE_UPDATED', 'QUIZ_SUBMITTED'

  @Prop({ type: Object })
  metadata: any; // Flexible object to store context (e.g., scores, search terms)

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const EventLogSchema = SchemaFactory.createForClass(EventLog);