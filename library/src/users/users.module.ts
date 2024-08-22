import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schema/user.schema';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { BooksModule } from 'src/books/books.module';
import { Book, BookSchema } from '../schema/book.schema'

@Module({
    imports: [MongooseModule.forFeature([
        {name: User.name, schema: UserSchema },
        { name: Book.name, schema: BookSchema  }]),
        BooksModule],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UsersModule {}
