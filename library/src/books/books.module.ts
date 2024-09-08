import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookService } from './books.service';
import { BookSchema } from './book.schema';
import { AuthorsModule } from '../authors/authors.module';
import { UsersModule } from '../users/users.module';
import { BookController } from './books.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
    forwardRef(() => AuthorsModule), // שימוש ב-forwardRef
    forwardRef(() => UsersModule),  // שימוש ב-forwardRef
  ],
  providers: [BookService],
  controllers: [BookController], 
  exports: [BookService],
})
export class BooksModule {}
