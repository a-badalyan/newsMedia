import { Module } from '@nestjs/common';
import { AuthorModule } from './author/author.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [AuthorModule, ArticlesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
