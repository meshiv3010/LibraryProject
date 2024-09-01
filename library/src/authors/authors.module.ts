import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from './author.schema';
import { AuthorService } from './authors.service';
import { AuthorController } from './author.controller';
import { BooksModule } from 'src/books/books.module';
import { UsersModule } from 'src/users/users.module'; // Import the UsersModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
    BooksModule, 
    UsersModule, 
  ],
  providers: [AuthorService],
  controllers: [AuthorController],
  exports: [AuthorService],
})
export class AuthorsModule {}
