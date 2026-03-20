import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsMongoId() 
  @IsNotEmpty()
  fieldId: string;

  @IsString()
  description: string;
}