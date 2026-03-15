import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ unique: true, required: true })
  email: string;

  @Exclude() // Security: Prevents password from being returned in JSON
  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ type: [String], default: ['read:profile'] })
  permissions: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);