import { DataSource } from 'typeorm';
import { Provider } from '@nestjs/common';
import { Article } from 'src/database/entities/article.entity';

export const ArticlesProvider: Provider = {
  provide: 'ARTICLES_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Article),
  inject: ['DATA_SOURCE'],
};
