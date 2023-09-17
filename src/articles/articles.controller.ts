import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from 'src/database/entities/article.entity';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    const article = await this.articlesService.create(createArticleDto);
    if (!article) throw new BadRequestException();

    return article;
  }

  @Get()
  async findAll(): Promise<Array<Article>> {
    return this.articlesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Article> {
    const article = await this.articlesService.findOne(+id);
    if (!article) throw new NotFoundException();

    return article;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const article = await this.articlesService.update(+id, updateArticleDto);
    if (!article) throw new NotFoundException();

    return article;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ id: number }> {
    const deleteResult = await this.articlesService.remove(+id);

    if (!deleteResult) throw new NotFoundException();

    return { id: deleteResult };
  }
}
