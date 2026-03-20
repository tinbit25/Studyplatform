import { Injectable, NotFoundException } from '@nestjs/common'; 
import { UsersService } from '../users/users.service'; 
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Field } from './schemas/field.schema';

@Injectable()
export class FieldsService {
  constructor(
    @InjectModel(Field.name) private fieldModel: Model<Field>,
    private usersService: UsersService, 
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


async selectField(userId: string, fieldId: string) {
 
  const field = await this.findOne(fieldId);
 
  return this.usersService.update(userId, { fieldId: field._id });
}
}