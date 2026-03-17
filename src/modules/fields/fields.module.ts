import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Fixes "Cannot find name MongooseModule"
import { FieldsService } from './fields.service';
import { FieldsController } from './fields.controller';
import { Field, FieldSchema } from './schemas/field.schema'; // Fixes "Field" and "FieldSchema"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Field.name, schema: FieldSchema }])
  ],
  controllers: [FieldsController],
  providers: [FieldsService],
  exports: [FieldsService], 
})
export class FieldsModule {}