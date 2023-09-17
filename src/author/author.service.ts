import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Author } from 'src/database/entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @Inject('AUTHOR_REPOSITORY')
    private authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = new Author();
    author.name = createAuthorDto.name;
    author.avatarUrl = createAuthorDto.avatarUrl;

    return this.authorRepository.save(author);
  }

  async findAll(): Promise<Array<Author>> {
    return this.authorRepository.find();
  }

  async findOne(id: number): Promise<Author | undefined> {
    return this.authorRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author | undefined> {
    const author = await this.authorRepository.findOneBy({ id });
    if (!author) return;

    return this.authorRepository.save({ id, ...updateAuthorDto });
  }

  async remove(id: number): Promise<number | undefined> {
    const author = await this.authorRepository.findOneBy({ id });

    if (author) {
      await this.authorRepository.delete(author);
      return id;
    }

    return;
  }
}
