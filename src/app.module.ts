import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './author/author.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [AuthorModule, ArticlesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
