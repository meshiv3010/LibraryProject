import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './book.schema';
import { BookService } from './books.service';
import { BookController } from './books.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])],
    providers: [BookService],
    controllers: [BookController],
    exports: [BookService,MongooseModule],
})
export class BooksModule {}
