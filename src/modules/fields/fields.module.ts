import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Fixes "Cannot find name MongooseModule"
import { FieldsService } from './fields.service';
import { FieldsController } from './fields.controller';
import { Field, FieldSchema } from './schemas/field.schema'; // Fixes "Field" and "FieldSchema"

import { UsersModule } from '../users/users.module'; // Import UsersModule to fix "Cannot find name UsersService"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Field.name, schema: FieldSchema }]),
    UsersModule,
  ],
  controllers: [FieldsController],
  providers: [FieldsService],
  exports: [FieldsService], 
})
export class FieldsModule {}