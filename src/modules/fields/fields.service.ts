import { Injectable, NotFoundException } from '@nestjs/common'; // Fixes NotFoundException
import { UsersService } from '../users/users.service'; // Adjust path as needed
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Field } from './schemas/field.schema';

@Injectable()
export class FieldsService {
  constructor(
    @InjectModel(Field.name) private fieldModel: Model<Field>,
    private usersService: UsersService, // <--- Add this line to fix the error
  ) {}

  async createField(data: any) {
    return this.fieldModel.create(data);
  }

  async getAllFields() {
    return this.fieldModel.find({ isActive: true }).exec();
  }

  async findOne(id: string) {
  const field = await this.fieldModel.findById(id).exec();
  if (!field) throw new NotFoundException('Field not found');
  return field;
}

// This method will be used by the controller to link the user to the field
async selectField(userId: string, fieldId: string) {
  // First, verify the field actually exists
  const field = await this.findOne(fieldId);
  
  // We update the User document with this fieldId
  // You'll need to inject UsersService or use the User model here
  return this.usersService.update(userId, { fieldId: field._id });
}
}