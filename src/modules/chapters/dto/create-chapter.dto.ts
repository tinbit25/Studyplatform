import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional, Matches } from 'class-validator';

export class CreateChapterDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()

  @Matches(/^[0-9a-fA-F]{24}$/, {
    message: 'courseId must be a valid 24-character hexadecimal string',
  })
  courseId: string;

  @IsNumber()
  @IsOptional()
  order: number;

  @IsArray()
  @IsOptional()
  content: any[];
}