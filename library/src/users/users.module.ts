import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { BooksModule } from 'src/books/books.module'; // Import the BooksModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    BooksModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, MongooseModule], 
})
export class UsersModule {}
