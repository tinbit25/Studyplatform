import { IsString, IsNotEmpty, IsMongoId, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateChapterDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsMongoId()
  @IsNotEmpty()
  courseId: string;

  @IsNumber()
  @IsOptional()
  order: number;

  @IsArray()
  @IsOptional()
  content: any[];
}