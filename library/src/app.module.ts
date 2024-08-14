import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { UsersModule } from './users/users.module';
//import { UsersModule } from './users/users.module';



@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/library'),
    // UsersModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
