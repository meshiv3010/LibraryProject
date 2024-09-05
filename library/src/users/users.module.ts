import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    forwardRef(() => BooksModule),
  ],
  providers: [UserService],
  controllers: [UserController], 
  exports: [UserService],
})
export class UsersModule {}
