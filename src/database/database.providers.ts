import { DataSource } from 'typeorm';
import { Author } from './entities/author.entity';
import { Article } from './entities/article.entity';
import { Provider } from '@nestjs/common';

export const databaseProviders: Array<Provider> = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        url: 'postgres://postgres:postgres@postgres/newsMedia',
        entities: [Author, Article],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
