import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common'; // ודא ייבוא Inject ו-forwardRef
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Author } from './author.schema';
import { BookService } from '../books/books.service';
import { UserService } from '../users/users.service';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<Author>,
    @Inject(forwardRef(() => BookService)) private readonly bookService: BookService,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService // הזרקת UserService עם forwardRef
  ) {}


  async getAllAuthors(): Promise<Author[]> {
    return this.authorModel
      .find()
      .populate({
        path: 'books',
      })
      .exec();
  }

  async getBooksByAuthor(authorId: Types.ObjectId): Promise<Types.ObjectId[]> {
    const author = await this.authorModel
      .findById(authorId)
      .populate({
        path: 'books',
      })
      .exec();

      return author.books
  }

  async getAllAuthorsNameWithNumber(): Promise<{ name: string; authorNumber: number }[] > {
    return this.authorModel.find({}, { name: 1, writerNumber: 1 }).exec();
  }

  async deleteAuthor(authorId: Types.ObjectId): Promise<void> {
    const author = await this.authorModel.findById(authorId).exec();
    if (!author) {
        throw new NotFoundException('Author not found');
    }
    for (const bookId of author.books) {
        await this.bookService.deleteBook(bookId);
        await this.userService.removeBookFromAllUsers(bookId);
    }
    await this.authorModel.findByIdAndDelete(authorId).exec();
    console.log(`Deleted author ${authorId}.`);
}
async removeBookFromAuthor(authorId: Types.ObjectId, bookId: Types.ObjectId): Promise<void> {
  await this.authorModel.findByIdAndUpdate(
    authorId,
    { $pull: { books: { $eq: bookId } } }, 
    { new: true }
  ).exec();
  console.log(`Book ${bookId} has been removed from author's books.`);
}
}
