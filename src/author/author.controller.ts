import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from 'src/database/entities/author.entity';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorService.create(createAuthorDto);
  }

  @Get()
  async findAll(): Promise<Array<Author>> {
    return this.authorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Author> {
    const author = await this.authorService.findOne(+id);
    if (!author) throw new NotFoundException();

    return author;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    const author = await this.authorService.update(+id, updateAuthorDto);
    if (!author) throw new NotFoundException();

    return author;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ id: number }> {
    const deleteResult = await this.authorService.remove(+id);

    if (!deleteResult) throw new NotFoundException();

    return { id: deleteResult };
  }
}
