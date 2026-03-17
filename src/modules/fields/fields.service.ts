import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Field } from './schemas/field.schema';

@Injectable()
export class FieldsService {
  constructor(@InjectModel(Field.name) private fieldModel: Model<Field>) {}

  async createField(data: any) {
    return this.fieldModel.create(data);
  }

  async getAllFields() {
    return this.fieldModel.find({ isActive: true }).exec();
  }
}