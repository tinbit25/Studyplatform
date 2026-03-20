import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; 
import { FieldsService } from './fields.service';
import { FieldsController } from './fields.controller';
import { Field, FieldSchema } from './schemas/field.schema'; 

import { UsersModule } from '../users/users.module'; 

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