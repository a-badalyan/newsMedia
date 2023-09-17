import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Author } from './author.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  authorId: number;

  @ManyToOne(() => Author, (author) => author.articles)
  author: Author;
}
