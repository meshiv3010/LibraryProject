import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from '../schema/author.schema';
import { AuthorService } from './authors.service';
import { AuthorController } from './author.controller';
import { BooksModule } from 'src/books/books.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
    BooksModule],
    providers: [AuthorService],
    controllers: [AuthorController],
    exports: [AuthorService],
})
export class AuthorsModule {}
