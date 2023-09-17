import { IsNumber, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsNumber()
  authorId: number;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
