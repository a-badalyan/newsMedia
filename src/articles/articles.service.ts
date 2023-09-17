import { Body, Inject, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Repository } from 'typeorm';
import { Article } from 'src/database/entities/article.entity';
import { Author } from 'src/database/entities/author.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @Inject('ARTICLES_REPOSITORY')
    private articlesRepository: Repository<Article>,

    @Inject('AUTHOR_REPOSITORY')
    private authorRepository: Repository<Author>,
  ) {}

  async create(
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<Article | undefined> {
    const author = await this.authorRepository.findOneBy({
      id: createArticleDto.authorId,
    });

    if (!author) return;

    const article = new Article();
    article.authorId = author.id;
    article.title = createArticleDto.title;
    article.content = createArticleDto.content;

    const newArticle = await this.articlesRepository.save(article);

    return this.articlesRepository.findOne({
      select: ['id', 'title', 'content'],
      where: { id: newArticle.id },
      relations: ['author'],
    });
  }

  async findAll(): Promise<Array<Article>> {
    return this.articlesRepository.find({
      select: ['id', 'title', 'content'],
      relations: ['author'],
    });
  }

  async findOne(id: number): Promise<Article | undefined> {
    return this.articlesRepository.findOne({
      select: ['id', 'title', 'content'],
      where: { id },
      relations: ['author'],
    });
  }

  async update(
    id: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const article = await this.articlesRepository.findOneBy({ id });
    if (!article) return;

    const updatedArticle = await this.articlesRepository.save({
      id,
      content: updateArticleDto.content,
      title: updateArticleDto.title,
    });

    return this.articlesRepository.findOne({
      select: ['id', 'title', 'content'],
      where: { id: updatedArticle.id },
      relations: ['author'],
    });
  }

  async remove(id: number): Promise<number | undefined> {
    const article = await this.articlesRepository.findOneBy({ id });
    if (!article) return;

    await this.articlesRepository.delete(article);
    return id;
  }
}
