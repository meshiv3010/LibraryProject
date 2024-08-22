import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './users/users.controller';
import { UserService } from './users/users.service';
import { BookController } from './books/books.controller';
import { BookService } from './books/books.service';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import {AuthorsModule} from './authors/authors.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/library'),
    UsersModule,BooksModule,AuthorsModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
