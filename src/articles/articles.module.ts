import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { ArticlesProvider } from './articles.provider';
import { DatabaseModule } from 'src/database/database.module';
import { AuthorProvider } from 'src/author/author.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticlesProvider, AuthorProvider],
})
export class ArticlesModule {}
