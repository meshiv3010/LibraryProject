import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorService } from './authors.service';
import { AuthorSchema } from './author.schema';
import { AuthorController } from './author.controller';
import { BooksModule } from '../books/books.module';
import { UsersModule } from '../users/users.module'; // ודא שהמודול מיובא

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }]),
    forwardRef(() => BooksModule),  // שימוש ב-forwardRef אם יש תלות מעגלית
    forwardRef(() => UsersModule)   // ייבוא UsersModule
  ],
  providers: [AuthorService],
  controllers: [AuthorController],
  exports: [AuthorService],
})
export class AuthorsModule {}
