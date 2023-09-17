import { DataSource } from 'typeorm';
import { Provider } from '@nestjs/common';
import { Author } from 'src/database/entities/author.entity';

export const AuthorProvider: Provider = {
  provide: 'AUTHOR_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Author),
  inject: ['DATA_SOURCE'],
};
