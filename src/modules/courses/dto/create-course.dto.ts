import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsMongoId() // Ensures it's a valid MongoDB ID
  @IsNotEmpty()
  fieldId: string;

  @IsString()
  description: string;
}