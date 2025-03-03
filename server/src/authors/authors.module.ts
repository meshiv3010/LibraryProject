import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorService } from './authors.service';
import { AuthorSchema } from './author.schema';
import { AuthorController } from './author.controller';
import { BooksModule } from '../books/books.module';
import { UsersModule } from '../users/users.module'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }]),
    forwardRef(() => BooksModule),  // Using forwardRef if there is a circular dependency
    forwardRef(() => UsersModule)   // Import UsersModule
  ],
  providers: [AuthorService],
  controllers: [AuthorController],
  exports: [AuthorService],
})
export class AuthorsModule {}
